"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import { usePulse } from "../../lib/pulse/PulseContext";

interface HeaderProps {
  backHref?: string;
  scrollToSection?: (id: string) => void;
}

export default function Header({ backHref, scrollToSection }: HeaderProps) {
  const { tom, therese, nodes, isLoading } = usePulse();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:text-zinc-400 transition-colors">
            TTDEVS
          </Link>
        </div>

        {/* System Status Display */}
        {!isLoading && (
          <div className="hidden lg:flex items-center gap-3 text-[9px] font-mono tracking-[0.15em] uppercase text-zinc-500">
            <span className="text-nebula-accent font-bold opacity-80">System Status:</span>
            
            <div className="flex items-center gap-1.5">
              <span className={tom.isOnline ? "text-emerald-500/90" : "text-zinc-700"}>
                TOM [{tom.isOnline ? `ONLINE (${tom.activeNodes})` : "OFFLINE"}]
              </span>
            </div>

            <span className="opacity-20">|</span>

            <div className="flex items-center gap-1.5">
              <span className={therese.isOnline ? "text-emerald-500/90" : "text-zinc-700"}>
                THERESE [{therese.isOnline ? `ACTIVE (${therese.activeNodes})` : "AWAY"}]
              </span>
            </div>

            <span className="opacity-20">|</span>

            <div className="flex items-center gap-1.5">
              <span className={nodes.some(n => n.isOnline) ? "text-emerald-500/90" : "text-zinc-700"}>
                NODES [{nodes.filter(n => n.isOnline).length} ACTIVE]
              </span>
            </div>
          </div>
        )}

        <nav className="hidden md:flex items-center gap-8">
          {scrollToSection ? (
            <>
              <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</button>
              <button onClick={() => scrollToSection("projects")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Projects</button>
              <button onClick={() => scrollToSection("skills")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Skills</button>
              <Button size="sm" onClick={() => scrollToSection("contact")}>Contact</Button>
            </>
          ) : (
            backHref && (
              <Link href={backHref}>
                <Button variant="ghost" size="sm">← Back</Button>
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
