"use client";

import Lenis from "lenis";
import { useEffect } from "react";

function getSections(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("section[data-snap]")
  );
}

function nearestSectionIndex(sections: HTMLElement[], y: number) {
  let best = 0;
  let bestDist = Infinity;

  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].offsetTop;
    const dist = Math.abs(top - y);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

export function useScrollSnap(lenis: Lenis | null) {
  useEffect(() => {
    if (!lenis) return;

    const sections = getSections();
    if (sections.length === 0) return;

    let locked = false;
    let unlockTimer: number | null = null;

    const lockFor = (ms: number) => {
      locked = true;
      if (unlockTimer) window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, ms);
    };

    const onWheel = (e: WheelEvent) => {
      // Only snap for deliberate wheel moves; trackpads often send tiny deltas
      if (Math.abs(e.deltaY) < 12) return;
      if (locked) return;

      const currentY = lenis.scroll;
      const idx = nearestSectionIndex(sections, currentY);

      const goingDown = e.deltaY > 0;
      const nextIdx = Math.max(
        0,
        Math.min(sections.length - 1, idx + (goingDown ? 1 : -1))
      );

      if (nextIdx === idx) return;

      lockFor(900);
      lenis.scrollTo(sections[nextIdx], {
        duration: 1.0,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (unlockTimer) window.clearTimeout(unlockTimer);
    };
  }, [lenis]);
}
