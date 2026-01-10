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
      // Top of page: mostly dark #1B262C blending to #0F4C75
      { at: 0.0, a: [27, 38, 44], b: [15, 76, 117] }, // 1B262C -> 0F4C75

      // Middle: move towards #3282B8 and add some BBE1FA tint
      { at: 0.5, a: [15, 76, 117], b: [50, 130, 184] }, // 0F4C75 -> 3282B8

      // Lower-middle: lighter, with a hint of BBE1FA
      { at: 0.8, a: [50, 130, 184], b: [187, 225, 250] }, // 3282B8 -> BBE1FA

      // Bottom: gently darken back towards 0F4C75 so it loops nicely
      { at: 1.0, a: [27, 38, 44], b: [15, 76, 117] }, // 1B262C -> 0F4C75
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
      const handler = ({ scroll }: { scroll: number }) => setFromScrollY(scroll);

      // @ts-ignore – Lenis has an event emitter API
      lenis.on("scroll", handler);

      return () => {
        // Some Lenis builds support off, some don't; it's okay since
        // lenis.destroy() is called in SmoothScroll cleanup
        // @ts-ignore
        lenis.off?.("scroll", handler);
      };
    } else {
      const onScroll = () => setFromScrollY(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [lenis]);

  return null;
}
