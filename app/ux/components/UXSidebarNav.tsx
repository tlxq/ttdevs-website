"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile header bar at very top */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">UX</h3>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            // X icon when open
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon when closed
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-30 bg-black md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in menu */}
      <nav
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-6 flex items-center">
            <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">UX</h3>
          </div>

          <div className="flex-1">
            <ul className="space-y-1 text-sm">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
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

          <div className="mt-auto border-t border-gray-200 pt-6">
            <Footer variant="sidebar" />
          </div>
        </div>
      </nav>

      {/* Desktop sidebar */}
      <nav className="sticky top-0 hidden h-screen w-56 shrink-0 self-start border-r border-gray-200 bg-white md:block">
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
    </>
  );
}
