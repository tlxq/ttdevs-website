"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the `<section id="...">` element currently closest to
 * the upper portion of the viewport. Driven by IntersectionObserver.
 */
export function useActiveSection(): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return activeId;
}
