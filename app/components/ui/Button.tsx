"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const VARIANT_MAP: Record<Variant, string> = {
  primary:   "bg-gradient-to-r from-nebula-accent to-nebula-secondary text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
  secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
  outline:   "border border-white/10 bg-transparent hover:border-nebula-accent/50 hover:bg-nebula-accent/5 text-zinc-100",
  ghost:     "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-100",
  link:      "bg-transparent text-zinc-400 hover:text-zinc-100 underline-offset-4 hover:underline p-0 h-auto",
};

const SIZE_MAP = {
  sm: "h-9 px-4 text-xs font-mono tracking-widest uppercase",
  md: "h-11 px-8 text-sm font-medium",
  lg: "h-14 px-10 text-base font-bold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const motionProps = props as HTMLMotionProps<"button">;

    return (
      <motion.button
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nebula-accent disabled:pointer-events-none disabled:opacity-50",
          VARIANT_MAP[variant],
          SIZE_MAP[size],
          className
        )}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
