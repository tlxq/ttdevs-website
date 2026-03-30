"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalEngine } from "../../lib/terminal/TerminalEngine";
import { GitHubRepo } from "../../lib/github/fetchRepos";
import { usePulse } from "../../lib/pulse/PulseContext";
import { useRouter } from "next/navigation";
import { Maximize2, Minimize2, X, Terminal as TerminalIcon } from "lucide-react";

interface GhostTerminalProps {
  repos: GitHubRepo[];
}

export function GhostTerminal({ repos }: GhostTerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ text: string; type: string }[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; type: string }[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { nodes, tom } = usePulse();
  const router = useRouter();

  const engine = useRef(new TerminalEngine(repos, nodes));

  useEffect(() => {
    engine.current = new TerminalEngine(repos, nodes);
  }, [repos, nodes]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, feedback, isOpen, isMaximized]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmdInput = input.trim();
    if (!cmdInput) return;
    
    const cmd = cmdInput.toLowerCase();
    
    if (cmd === "exit" || cmd === "close") {
      setIsOpen(false);
      setIsMaximized(false);
      setInput("");
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      setFeedback(null);
      setInput("");
      return;
    }

    if (cmd === "maximize" || cmd === "full") {
      setIsMaximized(true);
      setIsOpen(true);
      setInput("");
      return;
    }

    if (cmd === "minimize") {
      setIsMaximized(false);
      setInput("");
      return;
    }

    const inputLine = { text: `guest@ttdevs:~$ ${cmdInput}`, type: "input" };
    const result = engine.current.process(cmdInput);

    if (isMaximized) {
      setHistory(prev => [...prev, inputLine, ...result.lines]);
      setFeedback(null);
    } else {
      setFeedback(result.lines.map(l => ({ text: l.text, type: l.type })));
    }

    if (cmd.startsWith("goto ")) {
      const target = cmd.replace("goto ", "").trim();
      const validSections = ["about", "projects", "skills", "contact"];
      if (validSections.includes(target)) {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (target === "home") {
        setTimeout(() => router.push("/"), 800);
      }
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
      if (isMaximized) setIsMaximized(false);
      else setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] flex justify-center p-4 pointer-events-none font-mono transition-all duration-500 ${isMaximized ? "inset-0 items-center bg-black/60 backdrop-blur-md" : ""}`}>
      <motion.div 
        className={`w-full pointer-events-auto transition-all duration-500 ${isMaximized ? "max-w-5xl h-[85vh]" : "max-w-3xl"}`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className={`glass rounded-2xl overflow-hidden transition-all duration-500 border border-white/10 flex flex-col ${isMaximized ? "h-full shadow-[0_0_100px_rgba(139,92,246,0.3)] bg-zinc-950/90" : isOpen ? "h-64 shadow-[0_-20px_50px_rgba(139,92,246,0.15)]" : "h-14 shadow-2xl"}`}>
          <div className="absolute inset-0 -z-10 nebula-gradient opacity-10" />
          
          {/* Header */}
          <div className="flex items-center h-14 px-5 gap-4 shrink-0 border-b border-white/5">
            <TerminalIcon className={`w-4 h-4 ${isMaximized ? "text-nebula-accent" : "text-zinc-600"}`} />
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                placeholder={isOpen ? "Type a command..." : "Press for terminal..."}
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600 caret-nebula-accent"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 hover:bg-white/5 rounded-md text-zinc-500 hover:text-nebula-cyan transition-all"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              {isMaximized && (
                <button 
                  onClick={() => { setIsMaximized(false); setIsOpen(false); }}
                  className="p-1.5 hover:bg-white/5 rounded-md text-zinc-500 hover:text-rose-500 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${tom?.isOnline ? "bg-emerald-500 shadow-emerald-500/50" : "bg-zinc-700 shadow-transparent"}`} />
            </div>
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div 
                key={isMaximized ? "max" : "min"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={scrollRef}
                className="flex-1 overflow-y-auto scrollbar-hide p-5 text-[12px] leading-relaxed bg-black/20"
              >
                {isMaximized ? (
                  <div className="space-y-2 pb-4">
                    <div className="text-nebula-accent/40 uppercase tracking-[0.3em] text-[10px] mb-4 border-b border-white/5 pb-2">
                      Nebula OS v2.0 // Active Session // guest@ttdevs
                    </div>
                    {history.map((line, idx) => (
                      <div key={idx} className={line.type === "input" ? "text-white font-bold mt-4" : ""}>
                        <TypewriterLine text={line.text} type={line.type} speed={1} />
                      </div>
                    ))}
                    {!history.length && (
                      <div className="text-zinc-600 italic">Terminal ready. Type 'help' to see all guardian commands.</div>
                    )}
                  </div>
                ) : (
                  <div className="pt-1">
                    {feedback ? (
                      <div className="space-y-1">
                        {feedback.map((line, idx) => (
                          <TypewriterLine key={idx} text={line.text} type={line.type} />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-nebula-accent/40 text-[10px] uppercase tracking-widest">
                          <span>Quick Access</span>
                          <span>[TAB] complete</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-zinc-500">
                          <span className="text-nebula-cyan">goto [section]</span>
                          <span className="text-nebula-secondary">cat</span>
                          <span className="text-nebula-cyan">pulse</span>
                          <span className="text-zinc-400">help</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function TypewriterLine({ text, type, speed }: { text: string; type: string; speed?: number }) {
  const [len, setLen] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLen(0);
    setDone(false);
    let i = 0;
    const s = speed || (text.length > 100 ? 1 : 10);
    const id = setInterval(() => {
      i++;
      setLen(i);
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, s);
    return () => clearInterval(id);
  }, [text, speed]);

  const colorClass =
    type === "error"     ? "text-rose-500" :
    type === "accent"    ? "text-nebula-accent" :
    type === "secondary" ? "text-nebula-secondary" :
    type === "cyan"      ? "text-nebula-cyan" :
    type === "input"     ? "text-white font-bold" :
                           "text-slate-300";

  return (
    <div className={`whitespace-pre-wrap break-words ${colorClass}`}>
      {text.slice(0, len)}
      {!done && <span className="inline-block w-1.5 h-3.5 bg-nebula-accent/40 animate-blink ml-1" />}
    </div>
  );
}
