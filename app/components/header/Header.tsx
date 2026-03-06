"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useActiveSection } from "../../lib/hooks/useActiveSection";

interface HeaderProps {
  scrollToSection: (id: string) => void;
  /** When provided, the logo area shows a back-link instead of scroll-to-top */
  backHref?: string;
}

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
];

export default function Header({ scrollToSection, backHref }: HeaderProps) {
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id: string) {
    setMenuOpen(false);
    scrollToSection(id);
  }

  return (
    <header className="tt-header">
      <div className="tt-header-inner">
        {/* Logo / back link */}
        {backHref ? (
          <Link href={backHref} className="tt-header-back" aria-label="Back to TTdevs">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            <span>TTdevs</span>
          </Link>
        ) : (
          <button
            onClick={() => scrollTo("hero")}
            className="tt-logo-btn"
            aria-label="Back to top"
          >
            TTdevs
          </button>
        )}

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? "true" : undefined}
              className={activeSection === id ? "tt-nav-link-active" : "tt-nav-link"}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button onClick={() => scrollTo("contact")} className="tt-btn-nav">
            Contact us
          </button>
          <button
            className="tt-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="tt-header-mobile">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? "true" : undefined}
              className={activeSection === id ? "tt-nav-link-mobile-active" : "tt-nav-link-mobile"}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

