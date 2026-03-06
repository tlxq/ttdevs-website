"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, SlideIn } from "../../lib/components/FadeIn";
import SectionTag from "../../lib/components/SectionTag";

// ─── Person data ──────────────────────────────────────────────────────────────

interface PersonAboutData {
  sectionTag: string;
  heading: string;
  subtext: string;
  name: string;
  role: string;
  gradient: string;
  bioParas: string[];
  highlights: { label: string; value: string }[];
  tags: string[];
}

const DATA: Record<"tom" | "therese", PersonAboutData> = {
  tom: {
    sectionTag: "Who I am",
    heading: "About Me",
    subtext: "Frontend developer crafting interfaces that are fast, accessible, and a joy to use.",
    name: "Tom",
    role: "Frontend Developer",
    gradient: "tt-gradient-tom",
    bioParas: [
      "I've been building for the web since my first \"Hello World\" in JavaScript, and the excitement has never worn off. I'm driven by the belief that great interfaces are the result of both engineering discipline and genuine craft — you can feel the difference.",
      "My focus is on the React ecosystem: Next.js, TypeScript, and Tailwind CSS are my everyday tools. I care deeply about performance, accessibility, and the small details that elevate a product from functional to delightful. Clean animation, smooth scroll, keyboard navigation — none of it is an afterthought for me.",
      "When I'm not coding, I'm thinking about design systems, obsessing over font choices, or trying to convince Therese that the backend can wait until the animations are perfect.",
    ],
    highlights: [
      { label: "Focus", value: "React / Next.js" },
      { label: "Strength", value: "UI & Animations" },
      { label: "Approach", value: "Accessibility-first" },
      { label: "Stack", value: "TypeScript + Tailwind" },
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WCAG", "Figma", "Lenis"],
  },
  therese: {
    sectionTag: "Who I am",
    heading: "About Me",
    subtext: "Backend developer building the reliable, scalable systems that make products work at any scale.",
    name: "Therese",
    role: "Backend Developer",
    gradient: "tt-gradient-therese",
    bioParas: [
      "I love the invisible work — the APIs, the data models, the infrastructure decisions that nobody sees but everyone depends on. A product is only as good as the system beneath it, and I take that responsibility seriously.",
      "My toolkit centres on Node.js, PostgreSQL, and Redis. I design REST APIs with developer experience in mind: consistent, predictable, and well-documented. I care about data integrity, query performance, and building things that hold up under real-world load.",
      "I enjoy the puzzle of system design: what to cache, when to use a queue, how to model a complex domain cleanly. When I'm not designing schemas, I'm reviewing Tom's animations and making sure none of them cause a layout reflow.",
    ],
    highlights: [
      { label: "Focus", value: "APIs & Architecture" },
      { label: "Strength", value: "Data Modelling" },
      { label: "Approach", value: "Reliability-first" },
      { label: "Stack", value: "Node.js + PostgreSQL" },
    ],
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "REST APIs", "Docker", "Prisma", "Railway"],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { person: "tom" | "therese" }

export default function PersonAboutSection({ person }: Props) {
  const d = DATA[person];
  const isTom = person === "tom";

  return (
    <section id="about" data-snap className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>{d.sectionTag}</SectionTag>
          <h2 className="tt-heading">{d.heading}</h2>
          <p className="tt-subtext">{d.subtext}</p>
        </FadeIn>

        {/* Main content card */}
        <SlideIn from="up" delay={0.1}>
          <div className="tt-about-person-card group">
            <div className="tt-card-glow" />

            {/* Top: avatar + identity + highlights */}
            <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <PersonAvatar initial={d.name[0]} gradient={d.gradient} reduced={false} />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="mb-1 text-2xl font-bold text-tt-cream">{d.name}</h3>
                <span className={`tt-role-badge ${isTom ? "" : "tt-role-badge-therese"}`}>
                  {d.role}
                </span>

                {/* Quick stats */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {d.highlights.map((h) => (
                    <div key={h.label} className="tt-about-stat">
                      <span className="tt-about-stat-label">{h.label}</span>
                      <span className="tt-about-stat-value">{h.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio paragraphs */}
            <div className="mb-8 space-y-4 border-t border-white/6 pt-8">
              {d.bioParas.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="leading-relaxed text-tt-muted"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Tech tags */}
            <div className="tt-tags-row">
              {d.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="tt-tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.45 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

function PersonAvatar({
  initial,
  gradient,
}: {
  initial: string;
  gradient: string;
  reduced: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="relative mx-auto shrink-0 sm:mx-0"
      whileHover={reduced ? {} : { scale: 1.06, rotate: -3 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {!reduced && (
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className={`absolute -inset-2 rounded-2xl opacity-40 ${gradient}`}
          style={{ filter: "blur(10px)" }}
        />
      )}
      <div
        className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl text-4xl font-bold text-tt-void shadow-xl ${gradient}`}
        aria-hidden="true"
      >
        {initial}
      </div>
    </motion.div>
  );
}
