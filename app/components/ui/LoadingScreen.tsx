"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing systems...");

  useEffect(() => {
    const statuses = [
      "Initializing systems...",
      "Loading kernel modules...",
      "Establishing neural links...",
      "Fetching developer profiles...",
      "Optimizing interface...",
      "Ready."
    ];

    let currentStatusIdx = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        // Update status text based on progress
        const statusIdx = Math.floor((next / 100) * statuses.length);
        if (statusIdx !== currentStatusIdx && statusIdx < statuses.length) {
          currentStatusIdx = statusIdx;
          setStatus(statuses[statusIdx]);
        }
        
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-zinc-950 font-mono"
    >
      <div className="w-64 space-y-4">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <span>{status}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        <div className="h-[1px] w-full bg-zinc-900 overflow-hidden">
          <motion.div 
            className="h-full bg-nebula-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="flex justify-center">
          <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 animate-pulse">
            TTDEVS // EST. 2024
          </span>
        </div>
      </div>
    </motion.div>
  );
}
