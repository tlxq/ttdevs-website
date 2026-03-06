"use client";

import { motion } from "framer-motion";

interface CardProps {
  /** Rendered element — defaults to article for semantic landmark cards */
  as?: "article" | "div";
  /** Enable Framer Motion lift + shadow on hover */
  hover?: boolean;
  /** Extra CSS classes */
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable surface card.
 * Uses `tt-card` by default; pass `className="tt-card-lg"` for the larger variant.
 */
export function Card({ as = "article", hover = true, className = "tt-card", children }: CardProps) {
  const Tag = as;

  if (hover) {
    return (
      <motion.article
        whileHover={{ y: -4, boxShadow: "var(--shadow-card-hover)" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`${className} group`}
      >
        {children}
      </motion.article>
    );
  }

  return <Tag className={className}>{children}</Tag>;
}
