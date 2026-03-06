"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * A thin amber gradient bar fixed at the very top of the page that grows
 * from 0 → full width as the user scrolls. Uses `scaleX` (compositor-only)
 * to avoid layout thrashing.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="tt-scroll-progress"
      style={{ scaleX: reduced ? 1 : scaleX }}
    />
  );
}
