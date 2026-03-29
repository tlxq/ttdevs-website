"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 py-12 text-center">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-mono text-zinc-600 uppercase tracking-widest">
          © {new Date().getFullYear()} TTDEVS // MINIMALIST STUDIO
        </p>
      </div>
    </footer>
  );
}
