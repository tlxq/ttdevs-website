import Image from "next/image";
import RevealOnScroll from "../../lib/RevealOnScroll";

export default function Hero() {
  return (
    <section data-snap className="relative flex min-h-screen items-center justify-center px-4">
      {/* Subtle orbiting blobs using shared utilities */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="tt-blob-primary -top-32 -left-32 h-72 w-72 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="tt-blob-secondary right-0 -bottom-40 h-80 w-80 animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="tt-blob-accent top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 animate-[pulse_14s_ease-in-out_infinite]" />
      </div>

      <RevealOnScroll className="relative w-full max-w-4xl text-center">
        <Image
          src="/android-chrome-192x192.png"
          alt="TTdevs logo"
          width={192}
          height={192}
          className="mx-auto mb-6"
          priority
        />

        {/* Main heading with animated gradient text */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-balance md:text-6xl lg:text-7xl">
          <span className="tt-hero-gradient-text">
            Building thoughtful digital experiences from idea to launch.
          </span>
        </h1>

        {/* Subcopy – static color */}
        <p className="text-tt-ice/80 mx-auto max-w-2xl text-lg text-balance md:text-xl">
          We combine clean architecture with polished interfaces to ship fast, reliable web products
          — without sacrificing craft.
        </p>

        {/* Tiny scroll hint */}
        <div className="mt-12 flex justify-center">
          <div className="tt-scroll-hint">
            <div className="tt-scroll-shell">
              <div className="tt-scroll-dot" />
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
