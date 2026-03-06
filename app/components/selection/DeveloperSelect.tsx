"use client";

import { motion, useReducedMotion } from "framer-motion";
import NeonGrid from "../terminal/NeonGrid";
import DeveloperCard from "./DeveloperCard";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DeveloperSelect() {
  const reduced = useReducedMotion();

  return (
    <div className="tt-selection" role="main" aria-label="Developer selection">
      {/* Reuse the same neon grid background from the terminal */}
      <NeonGrid />

      <div className="relative z-10 flex w-full flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 text-center"
        >
          <p className="tt-selection-eyebrow">// system ready — select developer profile</p>
          <h1 className="tt-selection-title">Choose Your Developer</h1>
          <p className="tt-selection-sub">Two developers. One team. Pick a portfolio.</p>
        </motion.div>

        {/* Cards */}
        <div className="tt-selection-cards" role="list">
          <DeveloperCard
            variant="tom"
            name="Tom"
            role="Frontend Developer"
            description="React · Next.js · TypeScript · Tailwind CSS. Pixel-perfect interfaces and polished user experiences."
            initials="T"
            href="/tom"
            delay={0.25}
          />
          <DeveloperCard
            variant="therese"
            name="Therese"
            role="Backend Developer"
            description="Node.js · REST APIs · PostgreSQL · Redis. Robust architectures and scalable system design."
            initials="T"
            href="/therese"
            delay={0.42}
          />
        </div>

        {/* Footer hint */}
        <motion.p
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 text-center text-xs text-tt-ice/30"
          aria-hidden="true"
        >
          Use keyboard ↑↓ or click to select
        </motion.p>
      </div>
    </div>
  );
}
