"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [feedback, setFeedback] = useState<{ text: string; type: string }[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { nodes, tom } = usePulse();
  const router = useRouter();

  const engine = useRef(new TerminalEngine(repos, nodes));

  // Update engine if pulse data or repos change
  useEffect(() => {
    engine.current = new TerminalEngine(repos, nodes);
  }, [repos, nodes]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmdInput = input.trim();
    const cmd = cmdInput.toLowerCase();
    
    if (cmd === "exit" || cmd === "close") {
      setIsOpen(false);
      setInput("");
      return;
    }

    if (cmd === "clear") {
      setFeedback(null);
      setInput("");
      return;
    }

    // Special "goto" command for ghost navigation
    if (cmd.startsWith("goto ")) {
      const target = cmd.replace("goto ", "").trim();
      const validSections = ["about", "projects", "skills", "contact"];
      
      if (validSections.includes(target)) {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setFeedback([{ text: `Navigating to ${target.toUpperCase()}...`, type: "cyan" }]);
        }
      } else if (target === "home") {
        setFeedback([{ text: "Returning to HOME...", type: "accent" }]);
        setTimeout(() => router.push("/"), 800);
      } else {
        setFeedback([{ text: `Section "${target}" not found. Try: ${validSections.join(", ")}`, type: "error" }]);
      }
    } else {
      const result = engine.current.process(input);
      setFeedback(result.lines.map(l => ({ text: l.text, type: l.type })));
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = engine.current.getCommandNames();
      const match = commands.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center p-4 pointer-events-none font-mono">
      <motion.div 
        className="w-full max-w-3xl pointer-events-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className={`glass rounded-2xl overflow-hidden transition-all duration-500 border border-white/10 ${isOpen ? "h-64 shadow-[0_-20px_50px_rgba(139,92,246,0.15)]" : "h-14 shadow-2xl"}`}>
          <div className="fixed inset-0 -z-10 nebula-gradient opacity-10" />
          
          <div className="flex items-center h-14 px-5 gap-4">
            <span className="text-nebula-accent font-bold text-lg animate-pulse">$</span>
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                placeholder={isOpen ? "Type a command... (cat, pulse, goto skills, help)" : "Press for terminal navigation..."}
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600 caret-nebula-accent"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                <div className="w-1 h-1 rounded-full bg-nebula-cyan animate-pulse" />
                <span className="text-[9px] text-nebula-cyan/60 uppercase tracking-widest">GHOST_OS</span>
              </div>
              <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${tom?.isOnline ? "bg-emerald-500 shadow-emerald-500/50" : "bg-zinc-700 shadow-transparent"}`} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-5 pb-5 h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-hide text-[12px] leading-relaxed border-t border-white/5 bg-black/20"
              >
                <div className="pt-3">
                  {feedback ? (
                    <div className="space-y-1">
                      {feedback.map((line, idx) => (
                        <TypewriterLine key={idx} text={line.text} type={line.type} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-nebula-accent/40 text-[10px] uppercase tracking-widest">
                        <span>Terminal Ready</span>
                        <span>[TAB] to complete</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-zinc-500">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-nebula-cyan">goto [section]</span>
                          <span className="text-[10px]">Navigate</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-nebula-cyan">pulse</span>
                          <span className="text-[10px]">Realtime Data</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-nebula-secondary">cat</span>
                          <span className="text-[10px]">The Guardians</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-400">help</span>
                          <span className="text-[10px]">All Commands</span>
                        </div>
                      </div>
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

function TypewriterLine({ text, type }: { text: string; type: string }) {
  const [len, setLen] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLen(0);
    setDone(false);
    let i = 0;
    const speed = text.length > 100 ? 1 : 10;
    const id = setInterval(() => {
      i++;
      setLen(i);
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text]);

  const colorClass =
    type === "error"     ? "text-rose-500" :
    type === "accent"    ? "text-nebula-accent" :
    type === "secondary" ? "text-nebula-secondary" :
    type === "cyan"      ? "text-nebula-cyan" :
                           "text-slate-300";

  return (
    <div className={`whitespace-pre-wrap break-words ${colorClass}`}>
      {text.slice(0, len)}
      {!done && <span className="inline-block w-1.5 h-3.5 bg-nebula-accent/40 animate-blink ml-1" />}
    </div>
  );
}
