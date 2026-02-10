"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import styles from "./BottomSheet.module.css";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "bottom-sheet-title" : undefined}
    >
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} aria-hidden="true" />
        
        {title && (
          <div className={styles.header}>
            <h2 id="bottom-sheet-title" className={styles.title}>
              {title}
            </h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Stäng"
            >
              <XMarkIcon className={styles.closeIcon} aria-hidden="true" />
            </button>
          </div>
        )}
        
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
