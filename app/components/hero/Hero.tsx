"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const TITLE = "Building thoughtful digital experiences from idea to launch.";
const EASE  = [0.22, 1, 0.36, 1] as const;

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const { scrollY } = useScroll();
  const reduced     = useReducedMotion();
  const y           = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -160]);
  const opacity     = useTransform(scrollY, [0, 500], [1, reduced ? 1 : 0]);
  const words       = TITLE.split(" ");

  return (
    <section id="hero" data-snap className="tt-hero">
      <motion.div style={{ y, opacity }} className="tt-hero-inner">

        {/* Logo with rotating ambient ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative mx-auto mb-8 w-fit"
        >
          {/* Rotating gradient ring — purely decorative */}
          {!reduced && (
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-[28px] bg-gradient-to-r from-tt-amber/40 via-tt-gold/20 to-tt-rose/20"
              style={{ filter: "blur(10px)" }}
            />
          )}
          <Image
            src="/android-chrome-192x192.png"
            alt="TTdevs logo"
            width={88}
            height={88}
            priority
            className="tt-hero-logo relative z-10"
          />
        </motion.div>

        {/* Animated headline — words stagger in */}
        <h1 aria-label={TITLE} className="tt-hero-title">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: EASE }}
              className={i % 5 === 0 || i % 5 === 4 ? "tt-hero-word-accent" : "tt-hero-word"}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
          className="tt-hero-subtitle"
        >
          We combine clean architecture with polished interfaces to ship fast, reliable web
          products — without sacrificing craft.
        </motion.p>

        {/* CTAs — spring entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9, type: "spring", stiffness: 120, damping: 22 }}
          className="tt-hero-ctas"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("projects")}
            className="tt-btn-primary"
          >
            View Our Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("contact")}
            className="tt-btn-outline"
          >
            Get in touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.1 }}
        aria-hidden="true"
        className="tt-scroll-indicator"
      >
        <motion.div
          animate={reduced ? {} : { scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="tt-scroll-line"
        />
        <span className="tt-scroll-label">scroll</span>
      </motion.div>
    </section>
  );
}

