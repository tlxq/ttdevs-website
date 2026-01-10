import RevealOnScroll from "../../lib/RevealOnScroll";

export default function Hero() {
  return (
    <section data-snap className="relative flex min-h-screen items-center justify-center px-4">
      {/* Subtle orbiting blobs using your palette */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-72 w-72 animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-[#0F4C75]/40 blur-3xl" />
        <div className="absolute right-0 -bottom-40 h-80 w-80 animate-[pulse_12s_ease-in-out_infinite] rounded-full bg-[#3282B8]/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 animate-[pulse_14s_ease-in-out_infinite] rounded-full bg-[#BBE1FA]/20 blur-3xl" />
      </div>

      <RevealOnScroll className="relative w-full max-w-4xl text-center">
        {/* Pill badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#BBE1FA]/30 bg-[#1B262C]/70 px-4 py-1 text-xs font-medium text-[#BBE1FA]/80 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-[#BBE1FA] shadow-[0_0_12px_#BBE1FA]" />
          TTdevs · Fullstack Studio · Frontend · Backend
        </div>

        {/* Main heading with animated gradient text */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-balance md:text-6xl lg:text-7xl">
          <span className="relative inline-block animate-[heroGradient_6s_ease-in-out_infinite] bg-gradient-to-r from-[#BBE1FA] via-[#3282B8] to-[#BBE1FA] bg-[length:200%_auto] bg-clip-text text-transparent">
            Building thoughtful digital experiences from idea to launch.
          </span>
        </h1>

        {/* Subcopy */}
        <p className="mx-auto max-w-2xl text-lg text-balance text-[#BBE1FA]/80 md:text-xl">
          We combine clean architecture with polished interfaces to ship fast, reliable web products
          — without sacrificing craft.
        </p>

        {/* Tiny scroll hint */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-xs text-[#BBE1FA]/60">
            <div className="h-9 w-5 rounded-full border border-[#BBE1FA]/40 p-1">
              <div className="h-full w-full animate-bounce rounded-full bg-[#BBE1FA]/70" />
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
