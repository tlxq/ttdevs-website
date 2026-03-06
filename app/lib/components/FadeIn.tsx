"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

// ─── Shared easing ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Shared variants ─────────────────────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
};

// ─── Base props ───────────────────────────────────────────────────────────────
interface BaseProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
/** Fades + slides up when entering the viewport. Respects prefers-reduced-motion. */
export function FadeIn({ children, className, delay = 0 }: BaseProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger ──────────────────────────────────────────────────────────────────
/** Wrapper that staggers its direct StaggerItem children on scroll. */
export function Stagger({ children, className }: Omit<BaseProps, "delay">) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

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

/** Direct child of Stagger — inherits stagger timing from parent variants. */
export function StaggerItem({ children, className }: Omit<BaseProps, "delay">) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}

// ─── SlideIn ──────────────────────────────────────────────────────────────────
type Direction = "left" | "right" | "up" | "down";

const SLIDE_INITIAL: Record<Direction, { x?: number; y?: number; opacity: number }> = {
  left:  { x: -64, opacity: 0 },
  right: { x:  64, opacity: 0 },
  up:    { y:  56, opacity: 0 },
  down:  { y: -56, opacity: 0 },
};

interface SlideInProps extends BaseProps {
  /** Direction the element slides in from. Default: "up" */
  from?: Direction;
}

/** Slides in from a direction when entering the viewport. */
export function SlideIn({ children, className, from = "up", delay = 0 }: SlideInProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={SLIDE_INITIAL[from]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.0, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── ZoomIn ───────────────────────────────────────────────────────────────────
/** Scales up from 0.85 → 1 when entering the viewport. */
export function ZoomIn({ children, className, delay = 0 }: BaseProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealOnScroll ───────────────────────────────────────────────────────────
interface RevealProps extends BaseProps {
  /** Custom Framer Motion variants for full control over hidden/visible states */
  variants?: Variants;
}

/** Generic scroll-triggered reveal. Pass custom variants for full control. */
export function RevealOnScroll({ children, className, delay = 0, variants }: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const defaultVariants: Variants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay } },
  };

  return (
    <motion.div
      className={className}
      variants={variants ?? defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

// ─── ParallaxLayer ────────────────────────────────────────────────────────────
interface ParallaxProps extends Omit<BaseProps, "delay"> {
  /**
   * Speed multiplier relative to scroll. Range 0–1.
   * 0.15 = gentle depth shift. 0.4 = strong separation.
   * Positive = moves up as page scrolls down (distant layer feel).
   */
  speed?: number;
}

/**
 * Moves at a different speed than the rest of the page as the user scrolls,
 * creating a sense of depth. Powered by Framer Motion's useScroll.
 */
export function ParallaxLayer({ children, className, speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -120}px`, `${speed * 120}px`]);

  if (reduced) return <div ref={ref} className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
