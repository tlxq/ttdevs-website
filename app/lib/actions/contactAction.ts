"use server";

import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";
import { getEnv } from "@/app/lib/config";
import { RecipientKey } from "@/app/lib/types";

// Ensure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in .env
const redis = Redis.fromEnv();
const resend = new Resend(getEnv("RESEND_API_KEY"));

export type ContactState = {
  success: boolean;
  error: string | null;
  message?: string;
};

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "unknown";
  
  // 1. Rate Limiting via Upstash Redis
  try {
    const rateLimitKey = `rate_limit:contact:${ip}`;
    const currentHits = await redis.incr(rateLimitKey);
    if (currentHits === 1) {
      await redis.expire(rateLimitKey, 60); // 1 minute window
    }
    if (currentHits > 5) {
      return { success: false, error: "Too many requests. Please try again shortly." };
    }
  } catch (error) {
    console.error("Redis rate limit error:", error);
    // Allow pass-through if redis fails or isn't configured, or handle strictly
  }

  // 2. Honeypot check
  if (formData.get("company")) {
    return { success: true, error: null, message: "Spam blocked silently" };
  }

  // 3. Extract and Validate
  const recipientKey = formData.get("recipientKey") as RecipientKey;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!recipientKey || !name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // 4. Send Email Logic
  const toEmail = recipientKey === "tom" ? getEnv("CONTACT_TO_TOM_EMAIL") : getEnv("CONTACT_TO_THERESE_EMAIL");
  const fromEmail = getEnv("RESEND_FROM_EMAIL");
  
  if (!toEmail || !fromEmail) {
    return { success: false, error: "Server misconfigured: missing email targets." };
  }
  
  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Message from: ${name} (${email})\n\n${message}`,
    });

    if (error) throw new Error(error.message);
    
    return { success: true, error: null, message: "Email sent successfully!" };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Failed to send email:", errorMessage);
    return { success: false, error: "Failed to send email." };
  }
}
