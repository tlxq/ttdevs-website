"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Lenis from "lenis";
import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import ScrollGradient from "./ScrollGradient";
import SmoothScroll from "./SmoothScroll";
import { useScrollSnap } from "./useScrollSnap";

export default function Home() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useScrollSnap(lenis);

  return (
    <SmoothScroll onLenis={setLenis}>
      <ScrollGradient lenis={lenis} />

      <div className="w-full">
        {/* Section 1 */}
        <section
          data-snap
          className="min-h-screen flex items-center justify-center px-4"
        >
          <RevealOnScroll className="w-full max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white text-center drop-shadow-lg">
              We are fullstack
            </h1>
            <p className="text-white/80 text-center text-lg md:text-xl">
              Scroll down — background melts smoothly, and it snaps to sections.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="text-white/60 text-sm">
                Tip: use your mouse wheel for the snap effect.
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Section 2 */}
        <section
          data-snap
          className="min-h-screen flex items-center justify-center px-4"
        >
          <RevealOnScroll className="w-full max-w-lg">
            <main className="bg-white/30 dark:bg-neutral-900/30 rounded-3xl shadow-xl px-8 py-12 w-full border border-white/15 backdrop-blur-md">
              <p className="mb-8 text-lg text-neutral-100/90 text-center tracking-wide">
                Contact us
              </p>
              <div className="flex flex-col gap-6">
                <ContactCard
                  name="Tom"
                  role="Frontend"
                  email="tom@ttdevs.com"
                />
                <ContactCard
                  name="Therese"
                  role="Backend"
                  email="therese@ttdevs.com"
                />
              </div>
            </main>
          </RevealOnScroll>
        </section>

        {/* Section 3 (last page) + footer pinned to bottom */}
        <section data-snap className="min-h-screen flex flex-col px-4">
          {/* centered content */}
          <div className="flex-1 flex items-center justify-center pb-24">
            <RevealOnScroll className="w-full max-w-2xl">
              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-10 text-white">
                <h2 className="text-3xl font-bold mb-3">More content</h2>
                <p className="text-white/80">
                  Add as many sections as you want. The gradient will always
                  morph smoothly across the whole scroll.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* footer at bottom of last screen */}
          <footer className="mt-auto py-10 text-xs text-neutral-200/80 text-center">
            © {new Date().getFullYear()} TTdevs. All rights reserved.
          </footer>
        </section>
      </div>
    </SmoothScroll>
  );
}

function ContactCard({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl p-4 bg-white/25 dark:bg-neutral-800/30 border border-white/15 dark:border-neutral-700/50 shadow-lg backdrop-blur-lg transition transform hover:scale-[1.025] duration-300 group">
      <div className="bg-emerald-500/80 dark:bg-emerald-600/60 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold text-white shadow-md transition group-hover:scale-110">
        {name[0]}
      </div>
      <div>
        <p className="text-lg font-medium text-[var(--foreground)]">{name}</p>
        <p className="text-sm text-emerald-200 font-semibold mb-1">{role}</p>
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1 text-sm text-emerald-100 hover:underline transition duration-200"
        >
          <EnvelopeIcon className="w-5 h-5 inline-block" />
          {email}
        </a>
      </div>
    </div>
  );
}
