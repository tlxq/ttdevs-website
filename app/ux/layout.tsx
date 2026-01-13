"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";

const navItems = [
  { href: "/ux", label: "Översikt" },
  { href: "/ux/ecosystem", label: "Ekosystem" },
  { href: "/ux/domains", label: "Kunskapsdomäner" },
  { href: "/ux/empathy", label: "Empatisering" },
  { href: "/ux/theory", label: "UX & Empati" },
  { href: "/ux/deliverables", label: "Deliverables" },
];

export default function UXLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <nav className="sticky top-0 h-screen w-56 shrink-0 self-start border-r border-gray-200 bg-white">
        {/* gör nav till flex-col så vi kan lägga footern längst ner */}
        <div className="flex h-full flex-col p-6">
          <div className="flex-1">
            <h3 className="mb-6 text-sm font-semibold tracking-wide text-gray-500 uppercase">UX</h3>

            <ul className="space-y-1 text-sm">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded px-2 py-1 ${
                        isActive
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* mt-auto trycker ner footern längst ner */}
          <div className="mt-auto pt-6">
            <Footer variant="sidebar" />
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 px-10 py-12">
          <div className="max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
