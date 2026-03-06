"use client";

import { motion, type Variants } from "framer-motion";

// ─── Shared variants ─────────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

// ─── Components ──────────────────────────────────────────────────────────────

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

/** Single element that fades + slides up when it enters the viewport. */
export function FadeIn({ children, className, delay = 0 }: BaseProps & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper that staggers its direct `StaggerItem` children. */
export function Stagger({ children, className }: BaseProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of `Stagger` — inherits stagger timing. */
export function StaggerItem({ children, className }: BaseProps) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}
