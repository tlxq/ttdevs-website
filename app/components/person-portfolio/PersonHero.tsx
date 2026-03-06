"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RecipientKey } from "../../lib/types";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PersonData {
  name: string;
  role: string;
  initials: string;
  title: string;
  subtitle: string;
  gradient: string;
  recipientKey: RecipientKey;
}

const PERSON_DATA: Record<"tom" | "therese", PersonData> = {
  tom: {
    name: "Tom",
    role: "Frontend Developer",
    initials: "T",
    title: "Building pixel-perfect interfaces with React and Next.js.",
    subtitle:
      "I combine clean architecture with polished UI to create fast, accessible web experiences that users love.",
    gradient: "tt-gradient-tom",
    recipientKey: "tom",
  },
  therese: {
    name: "Therese",
    role: "Backend Developer",
    initials: "T",
    title: "Designing robust APIs and scalable system architectures.",
    subtitle:
      "I build the backbone of digital products — reliable, efficient, and engineered to last.",
    gradient: "tt-gradient-therese",
    recipientKey: "therese",
  },
};

interface PersonHeroProps {
  person: "tom" | "therese";
  scrollToSection: (id: string) => void;
}

export default function PersonHero({ person, scrollToSection }: PersonHeroProps) {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const data = PERSON_DATA[person];
  const isTom = person === "tom";

  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -140]);
  const opacity = useTransform(scrollY, [0, 500], [1, reduced ? 1 : 0]);

  const words = data.title.split(" ");

  return (
    <section id="hero" data-snap className="tt-hero">
      <motion.div style={{ y, opacity }} className="tt-hero-inner">

        {/* Avatar with rotating ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative mx-auto mb-8 w-fit"
        >
          {!reduced && (
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className={`absolute -inset-3 rounded-[24px] opacity-60 ${data.gradient}`}
              style={{ filter: "blur(14px)" }}
            />
          )}
          {/* Avatar circle */}
          <div
            className={`relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-2xl text-4xl font-bold text-tt-void shadow-xl ${data.gradient}`}
            aria-hidden="true"
          >
            {data.initials}
          </div>
        </motion.div>

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          className="mb-4 flex justify-center"
        >
          <span
            className={[
              "inline-block rounded-full border px-3 py-0.5 text-xs font-semibold",
              isTom ? "tt-person-role-badge-tom" : "tt-person-role-badge-therese",
            ].join(" ")}
          >
            {data.role}
          </span>
        </motion.div>

        {/* Animated headline */}
        <h1 aria-label={data.title} className="tt-hero-title">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.8, ease: EASE }}
              className={i % 4 === 0 || i % 4 === 3 ? "tt-hero-word-accent" : "tt-hero-word"}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
          className="tt-hero-subtitle"
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.9, type: "spring", stiffness: 120, damping: 22 }}
          className="tt-hero-ctas"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("projects")}
          className={isTom ? "tt-btn-primary" : "tt-btn-primary-therese"}
          >
            View My Work
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
        transition={{ delay: 2.6, duration: 1.1 }}
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
