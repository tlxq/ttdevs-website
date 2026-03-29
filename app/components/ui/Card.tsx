"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({ hover = true, className, children }: CardProps) {
  const styles = cn(
    "glass relative overflow-hidden rounded-3xl p-6 transition-all duration-500",
    className
  );

  if (hover) {
    return (
      <motion.div
        whileHover={{ 
          y: -5, 
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: "rgba(255,255,255,0.05)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={styles}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-nebula-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }

  return <div className={styles}>{children}</div>;
}
