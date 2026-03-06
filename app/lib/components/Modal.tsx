"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  /** Called when the overlay or ESC key is pressed */
  onClose: () => void;
  children: React.ReactNode;
  /** Extra CSS classes for the inner panel — defaults to tt-modal-panel */
  panelClassName?: string;
}

/**
 * Accessible modal overlay + panel.
 * - Closes on Escape or overlay click.
 * - Focuses the panel on mount for keyboard users.
 * - Adds aria-modal + role="dialog" for screen readers.
 * - Framer Motion handles enter/exit animations.
 */
export function Modal({ onClose, children, panelClassName = "tt-modal-panel" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="tt-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          className={panelClassName}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
