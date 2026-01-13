import type { Metadata } from "next";
import UXSidebarNav from "./components/UXSidebarNav";

export const metadata: Metadata = {
  title: "UX – Skolarbete | ttdevs",
  description:
    "Samling av mitt UX-skolarbete: ekosystem, kunskapsdomäner, empatisering, teori och UX deliverables.",
  openGraph: {
    title: "UX – Skolarbete | ttdevs",
    description:
      "Samling av mitt UX-skolarbete: ekosystem, kunskapsdomäner, empatisering, teori och UX deliverables.",
    url: "https://www.ttdevs.com/ux",
    siteName: "ttdevs",
    images: [
      {
        url: "https://www.ttdevs.com/og/ux.png",
        width: 1200,
        height: 630,
        alt: "UX – Skolarbete",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UX – Skolarbete | ttdevs",
    description:
      "Samling av mitt UX-skolarbete: ekosystem, kunskapsdomäner, empatisering, teori och UX deliverables.",
    images: ["https://www.ttdevs.com/og/ux.png"],
  },
};

export default function UXLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <UXSidebarNav />

      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 px-10 py-12">
          <div className="max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
