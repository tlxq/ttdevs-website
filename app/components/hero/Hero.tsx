import RevealOnScroll from "../../lib/RevealOnScroll";

export default function Hero() {
  return (
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
  );
}
