"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

type Variant = "primary" | "outline" | "nav" | "nav-active" | "send" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Wrap the button in a Framer Motion element for scale hover/tap */
  animated?: boolean;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary:    "tt-btn-primary",
  outline:    "tt-btn-outline",
  nav:        "tt-btn-nav",
  "nav-active": "tt-nav-link-active",
  send:       "tt-btn-send",
  ghost:      "tt-nav-link",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", animated = false, className = "", children, ...props }, ref) => {
    const cls = [VARIANT_CLASS[variant], className].filter(Boolean).join(" ");

    if (animated) {
      return (
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={cls}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
