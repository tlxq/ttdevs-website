"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed full-screen background layer.
 * A large amber orb slowly drifts upward as the user scrolls, giving the
 * impression of warmth building through the page without hard section breaks.
 */
export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  const amberY     = useTransform(scrollYProgress, [0, 1], ["90%", "10%"]);
  const amberOpacity = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [0.06, 0.16, 0.22, 0.12]);
  const amberScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const goldY      = useTransform(scrollYProgress, [0, 1], ["15%", "70%"]);
  const goldOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.04, 0.09, 0.06]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Primary amber orb — rises as page is scrolled */}
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

      {/* Secondary gold orb — drifts down */}
      <motion.div
        style={{
          top: goldY,
          opacity: goldOpacity,
          background: "radial-gradient(circle, #FCD34D 0%, transparent 65%)",
          filter: "blur(110px)",
        }}
        className="absolute left-[-15%] h-[55vw] w-[55vw] rounded-full"
      />

      {/* Top edge vignette — keeps the void color from bleeding */}
      <div className="tt-ambient-vignette-top" />
      {/* Bottom edge vignette */}
      <div className="tt-ambient-vignette-bottom" />
    </div>
  );
}
