"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const navItems = [
  { href: "/ux", label: "Översikt" },
  { href: "/ux/ecosystem", label: "Ekosystem" },
  { href: "/ux/domains", label: "Kunskapsdomäner" },
  { href: "/ux/empathy", label: "Empatisering" },
  { href: "/ux/theory", label: "UX & Empati" },
  { href: "/ux/deliverables", label: "Deliverables" },
];

export default function UXSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 h-screen w-56 shrink-0 self-start border-r border-gray-200 bg-white">
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

        <div className="mt-auto pt-6">
          <Footer variant="sidebar" />
        </div>
      </div>
    </nav>
  );
}
