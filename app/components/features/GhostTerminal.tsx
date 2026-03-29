"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalEngine } from "../../lib/terminal/TerminalEngine";
import { GitHubRepo } from "../../lib/github/fetchRepos";
import { usePulse } from "../../lib/pulse/PulseContext";
import { useRouter } from "next/navigation";

interface GhostTerminalProps {
  repos: GitHubRepo[];
}

export function GhostTerminal({ repos }: GhostTerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { nodes, tom } = usePulse();
  const router = useRouter();

  const engine = useRef(new TerminalEngine(repos, nodes));

  // Update engine if pulse data or repos change
  useEffect(() => {
    engine.current = new TerminalEngine(repos, nodes);
  }, [repos, nodes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (cmd === "exit" || cmd === "close") {
      setIsOpen(false);
      setInput("");
      return;
    }

    // Special "goto" command for ghost navigation
    if (cmd.startsWith("goto ")) {
      const target = cmd.replace("goto ", "");
      if (["about", "projects", "skills", "contact"].includes(target)) {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setFeedback(`Navigating to ${target}...`);
      } else if (target === "home") {
        router.push("/");
      }
    } else {
      const result = engine.current.process(input);
      if (result.action === "START") {
        router.push("/portfolio");
      }
      // Simple feedback for non-nav commands
      setFeedback(result.lines[0]?.text || "Command processed.");
    }

    setInput("");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center p-4 pointer-events-none">
      <motion.div 
        className="w-full max-w-2xl pointer-events-auto"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? "h-32" : "h-12"}`}>
          <div className="flex items-center h-12 px-4 gap-3">
            <span className="text-nebula-accent font-mono text-sm animate-pulse">$</span>
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => !input && setIsOpen(false)}
                placeholder={isOpen ? "Type a command (goto about, pulse, help...)" : "Press for terminal navigation..."}
                className="w-full bg-transparent border-none outline-none text-zinc-100 font-mono text-sm placeholder:text-zinc-600"
              />
            </form>
            <div className="flex items-center gap-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter hidden md:block">
                Ghost_Terminal v1.0
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${tom?.isOnline ? "bg-emerald-500" : "bg-zinc-700"}`} />
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 pb-4 h-20 overflow-y-auto scrollbar-hide font-mono text-[11px]"
              >
                <div className="text-zinc-500 border-t border-white/5 pt-2">
                  {feedback ? (
                    <span className="text-nebula-cyan">{feedback}</span>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <span>Available: goto [section], pulse, help, clear</span>
                      <span className="text-right text-zinc-700 italic">ESC to blur</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
