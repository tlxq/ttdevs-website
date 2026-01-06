import RevealOnScroll from "../../lib/RevealOnScroll";

export default function Footer() {
  return (
    <section data-snap className="min-h-screen flex flex-col px-4">
      {/* centered content */}
      <div className="flex-1 flex items-center justify-center pb-24">
        <RevealOnScroll className="w-full max-w-2xl">
          <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-10 text-white">
            <h2 className="text-3xl font-bold mb-3">More content</h2>
            <p className="text-white/80">
              Stay tuned. More to come. In progress.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* footer at bottom of last screen */}
      <footer className="mt-auto py-10 text-xs text-neutral-200/80 text-center">
        © 2025 TTdevs. All rights reserved.
      </footer>
    </section>
  );
}
