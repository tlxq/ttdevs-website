"use client";

import Lenis from "lenis";
import { useCallback, useEffect, useState } from "react";

export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const l = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(l);

    let raf = 0;
    const loop = (t: number) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
    };
  }, []);

  const scrollToSection = useCallback(
    (id: string, offset = -72) => {
      const el = document.getElementById(id);
      if (!el) return;
      lenis
        ? lenis.scrollTo(el, { offset })
        : el.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  return { lenis, scrollToSection };
}
