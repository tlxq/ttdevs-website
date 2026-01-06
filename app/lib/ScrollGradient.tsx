"use client";

import Lenis from "lenis";
import { useEffect } from "react";

type Stop = {
  at: number; // 0..1
  a: [number, number, number];
  b: [number, number, number];
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpRgb(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}
function rgbToCss(c: [number, number, number]) {
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

function colorAt(stops: Stop[], p: number) {
  const t = clamp01(p);

  let i = 0;
  for (; i < stops.length - 1; i++) {
    if (t >= stops[i].at && t <= stops[i + 1].at) break;
  }

  const left = stops[i];
  const right = stops[Math.min(i + 1, stops.length - 1)];
  const span = Math.max(1e-6, right.at - left.at);
  const localT = clamp01((t - left.at) / span);

  return {
    a: lerpRgb(left.a, right.a, localT),
    b: lerpRgb(left.b, right.b, localT),
  };
}

export default function ScrollGradient({ lenis }: { lenis: Lenis | null }) {
  useEffect(() => {
    const stops: Stop[] = [
      { at: 0.0, a: [47, 7, 67], b: [65, 41, 90] }, // purple
      { at: 0.33, a: [15, 32, 39], b: [44, 83, 100] }, // teal/blue
      { at: 0.66, a: [58, 28, 113], b: [255, 175, 123] }, // warm
      { at: 1.0, a: [10, 10, 10], b: [40, 40, 40] }, // dark
    ];

    const setFromScrollY = (scrollY: number) => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = clamp01(scrollY / max);

      const { a, b } = colorAt(stops, progress);
      doc.style.setProperty("--bg-a", rgbToCss(a));
      doc.style.setProperty("--bg-b", rgbToCss(b));
    };

    // initial
    setFromScrollY(lenis ? lenis.scroll : window.scrollY);

    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) =>
        setFromScrollY(scroll);
      // Lenis supports .on("scroll", fn)
      lenis.on("scroll", handler);

      return () => {
        // Lenis "off" typings vary; destroy is handled in SmoothScroll cleanup.
      };
    } else {
      const onScroll = () => setFromScrollY(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [lenis]);

  return null;
}
