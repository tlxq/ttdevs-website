"use client";

import type Lenis from "lenis";
import Link from "next/link";

interface HeaderProps {
  lenis: Lenis | null;
}

export default function Header({ lenis }: HeaderProps) {
  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.querySelector<HTMLElement>("#contact");
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -80, // adjust to match your header height
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="#contact"
            onClick={handleContactClick}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Contact us
          </Link>
        </nav>
      </div>
    </header>
  );
}
