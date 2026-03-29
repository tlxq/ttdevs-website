"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Profile } from "../../lib/data/profiles";
import { SystemStatusBar } from "../ui/SystemStatusBar";

interface HeroProps {
  profile: Profile;
  scrollToSection: (id: string) => void;
}

export function ProfileHero({ profile, scrollToSection }: HeroProps) {
  return (
    <section className="relative flex min-h-[95vh] items-center justify-center px-4 overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SystemStatusBar />
          
          <motion.span 
            className="mb-6 inline-block px-6 py-2 rounded-full border border-nebula-accent/20 bg-nebula-accent/5 text-[10px] font-bold tracking-[0.3em] uppercase text-nebula-accent font-mono backdrop-blur-sm"
            animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.2)", "0 0 20px rgba(139,92,246,0)"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {profile.role}
          </motion.span>
          
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-white leading-none text-balance">
            {profile.id === "joint" ? (
              <>TT<span className="text-gradient">DEVS</span></>
            ) : (
              <span className="text-gradient">{profile.name}</span>
            )}
          </h1>
          
          <p className="mx-auto max-w-xl text-lg md:text-2xl text-slate-400 leading-relaxed mb-12 font-light text-balance">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button 
              onClick={() => scrollToSection("projects")}
              size="lg"
              variant="primary"
            >
              Explore Portfolio
            </Button>
            <Button 
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-nebula-accent/10 blur-[160px] -z-10 rounded-full" />
    </section>
  );
}
