import RevealOnScroll from "../../lib/RevealOnScroll";

export default function Footer() {
  return (
    <section data-snap className="flex min-h-screen flex-col px-4">
      {/* centered content */}
      <div className="flex flex-1 items-center justify-center pb-24">
        <RevealOnScroll className="w-full max-w-2xl">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-10 text-white backdrop-blur-md">
            <h2 className="mb-3 text-3xl font-bold">More content</h2>
            <p className="text-white/80">Stay tuned. More to come. In progress.</p>
          </div>
        </RevealOnScroll>
      </div>

      {/* footer at bottom of last screen */}
      <footer className="mt-auto py-10 text-center text-xs text-neutral-200/80">
        © 2025 TTdevs. All rights reserved.
      </footer>
    </section>
  );
}
