"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface DeveloperCardProps {
  name: string;
  role: string;
  description: string;
  initials: string;
  href: string;
  variant: "tom" | "therese";
  /** Stagger entrance delay in seconds */
  delay?: number;
}

export default function DeveloperCard({
  name,
  role,
  description,
  initials,
  href,
  variant,
  delay = 0,
}: DeveloperCardProps) {
  const reduced = useReducedMotion();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const isTom = variant === "tom";
  const glowColor = isTom
    ? "0 28px 72px rgba(245,158,11,0.20)"
    : "0 28px 72px rgba(251,146,60,0.20)";

  function handleActivate() {
    if (redirecting) return;
    setRedirecting(true);
    setTimeout(() => router.push(href), reduced ? 0 : 380);
  }

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 52 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay, ease: EASE }}
      whileHover={reduced ? {} : { y: -10, boxShadow: glowColor }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Enter ${name}'s portfolio`}
      className={`tt-dev-card tt-dev-card-${variant} group`}
    >
      {/* Per-person gradient glow overlay */}
      <div className={`tt-dev-card-glow-${variant}`} aria-hidden="true" />

      {/* Avatar */}
      <motion.div
        whileHover={reduced ? {} : { scale: 1.08, rotate: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={`tt-dev-card-avatar ${isTom ? "tt-gradient-tom" : "tt-gradient-therese"}`}
        aria-hidden="true"
      >
        {initials}
      </motion.div>

      {/* Identity */}
      <div>
        <div className="tt-dev-card-name">{name}</div>
        <div className={`tt-dev-card-role tt-dev-card-role-${variant}`}>{role}</div>
      </div>

      {/* Description */}
      <p className="tt-dev-card-desc">{description}</p>

      {/* CTA row */}
      <div className={`tt-dev-card-cta tt-dev-card-cta-${variant}`}>
        <span>{redirecting ? "Entering…" : "Enter portfolio"}</span>
        <motion.span
          animate={reduced ? {} : { x: redirecting ? 8 : 0 }}
          whileHover={reduced ? {} : { x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </div>
    </motion.div>
  );
}
