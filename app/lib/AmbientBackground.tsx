"use client";

import { motion } from "framer-motion";
import { usePulse } from "./pulse/PulseContext";

export default function AmbientBackground() {
  const { activityIntensity } = usePulse();

  return (
    <div className="fixed inset-0 -z-10 nebula-gradient overflow-hidden">
      {/* Dynamic Nebula Glows */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-nebula-accent/20 blur-[120px]"
        animate={{
          scale: [1, 1 + activityIntensity * 0.5, 1],
          opacity: [0.3, 0.3 + activityIntensity * 0.4, 0.3],
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{ 
          duration: 15 / (1 + activityIntensity), 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute bottom-[-10%] -right-[5%] w-[60%] h-[60%] rounded-full bg-nebula-secondary/10 blur-[100px]"
        animate={{
          scale: [1, 1 + activityIntensity * 0.3, 1],
          opacity: [0.2, 0.2 + activityIntensity * 0.3, 0.2],
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 18 / (1 + activityIntensity), 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 2 
        }}
      />

      <motion.div
        className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-nebula-cyan/10 blur-[110px]"
        animate={{
          scale: [1, 1 + activityIntensity * 0.4, 1],
          opacity: [0.1, 0.1 + activityIntensity * 0.3, 0.1],
        }}
        transition={{ 
          duration: 20 / (1 + activityIntensity), 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 5 
        }}
      />

      {/* Subtle Star Noise (Overlay) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}
