import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type RecipientKey = "tom" | "therese";

type ContactPayload = {
  recipientKey: RecipientKey;
  name: string;
  email: string;
  message: string;

  // honeypot - must remain empty
  company?: string;
};

// Minimal in-memory rate limit (baseline; resets on cold starts)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // per IP per window
const ipHits = new Map<string, { count: number; windowStart: number }>();

function getClientIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (!xff) return "unknown";
  return xff.split(",")[0]?.trim() || "unknown";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return { ok: true as const };
  }

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return { ok: true as const };
  }

  if (entry.count >= RATE_LIMIT_MAX) return { ok: false as const };

  entry.count += 1;
  ipHits.set(ip, entry);
  return { ok: true as const };
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getRecipientEmail(key: RecipientKey) {
  if (key === "tom") return process.env.CONTACT_TO_TOM_EMAIL;
  if (key === "therese") return process.env.CONTACT_TO_THERESE_EMAIL;
  return undefined;
}

function getRecipientName(key: RecipientKey) {
  return key === "tom" ? "Tom" : "Therese";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const limited = rateLimit(ip);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Partial<ContactPayload>;

    // Honeypot: if filled, silently accept (spam)
    if ((body.company ?? "").trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const recipientKey = body.recipientKey;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!recipientKey || !name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Server not configured (missing RESEND_API_KEY)" },
        { status: 500 }
      );
    }

    const from = process.env.RESEND_FROM_EMAIL;
    if (!from) {
      return NextResponse.json(
        { error: "Server not configured (missing RESEND_FROM_EMAIL)" },
        { status: 500 }
      );
    }

    const to = getRecipientEmail(recipientKey);
    if (!to) {
      return NextResponse.json(
        {
          error:
            recipientKey === "tom"
              ? "Server not configured (missing CONTACT_TO_TOM_EMAIL)"
              : "Server not configured (missing CONTACT_TO_THERESE_EMAIL)",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const recipientName = getRecipientName(recipientKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const sendResult = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New message for ${recipientName} from ${name}`,
      html: `
<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px; margin: 0 auto; padding: 20px; }
      .box { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; background: #f9fafb; }
      .label { font-weight: 700; margin-top: 12px; }
      .value { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
      a { color: #2563eb; text-decoration: none; }
      .muted { color: #6b7280; font-size: 12px; margin-top: 14px; }
    </style>
  </head>
  <body>
    <h2>New Contact Form Submission</h2>
    <div class="box">
      <div class="label">To</div>
      <div class="value">${escapeHtml(recipientName)} &lt;${escapeHtml(
        to
      )}&gt;</div>

      <div class="label">From</div>
      <div class="value">${safeName} &lt;<a href="mailto:${safeEmail}">${safeEmail}</a>&gt;</div>

      <div class="label">Message</div>
      <div class="value">${safeMessage}</div>
    </div>

    <div class="muted">Sent from ttdevs.com • Client IP (approx): ${escapeHtml(
      ip
    )}</div>
  </body>
</html>
      `,
    });

    if (sendResult.error) {
      console.error("Resend send error:", sendResult.error);
      return NextResponse.json(
        { error: "Failed to send email", details: sendResult.error },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        id: sendResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to send email", details: error?.message ?? "Unknown" },
      { status: 500 }
    );
  }
}
