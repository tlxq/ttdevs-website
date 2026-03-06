"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed full-screen background layer.
 * Three scroll-driven orbs provide depth and colour variation across sections.
 * Respects prefers-reduced-motion by skipping animations.
 */
export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  // ── Primary amber orb — rises as page is scrolled ──────────────────────────
  const amberY       = useTransform(scrollYProgress, [0, 1], ["90%", "10%"]);
  const amberOpacity = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [0.07, 0.17, 0.23, 0.13]);
  const amberScale   = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // ── Secondary gold orb — drifts gently downward ────────────────────────────
  const goldY       = useTransform(scrollYProgress, [0, 1], ["15%", "65%"]);
  const goldOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.04, 0.10, 0.06]);

  // ── Tertiary rose orb — materialises in the lower half (contact area) ──────
  const roseY       = useTransform(scrollYProgress, [0.4, 1], ["130%", "55%"]);
  const roseOpacity = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 0.08, 0.05]);
  const roseScale   = useTransform(scrollYProgress, [0.4, 1], [0.7, 1.3]);

  if (reduced) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="tt-ambient-vignette-top" />
        <div className="tt-ambient-vignette-bottom" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Primary amber orb */}
      <motion.div
        style={{
          top: amberY,
          opacity: amberOpacity,
          scale: amberScale,
          background: "radial-gradient(circle, #F59E0B 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
        className="absolute right-[-20%] h-[70vw] w-[70vw] rounded-full"
      />

      {/* Secondary gold orb */}
      <motion.div
        style={{
          top: goldY,
          opacity: goldOpacity,
          background: "radial-gradient(circle, #FCD34D 0%, transparent 65%)",
          filter: "blur(110px)",
        }}
        className="absolute left-[-15%] h-[55vw] w-[55vw] rounded-full"
      />

      {/* Tertiary rose orb — visible in contact / footer region */}
      <motion.div
        style={{
          top: roseY,
          opacity: roseOpacity,
          scale: roseScale,
          background: "radial-gradient(circle, #fb7185 0%, transparent 65%)",
          filter: "blur(120px)",
        }}
        className="absolute left-[15%] h-[50vw] w-[50vw] rounded-full"
      />

      <div className="tt-ambient-vignette-top" />
      <div className="tt-ambient-vignette-bottom" />
    </div>
  );
}
