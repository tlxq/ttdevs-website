"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTerminal, type OutputLine } from "../../lib/hooks/useTerminal";
import { GitHubRepo } from "../../lib/github/fetchRepos";

interface TerminalProps {
  onStart: () => void;
  repos?: GitHubRepo[];
}

export default function Terminal({ onStart, repos = [] }: TerminalProps) {
  const { 
    bootLines, booting, history, input, setInput, submit, 
    inputRef, outputRef, transitioning, getCommandNames 
  } = useTerminal(onStart, repos);

  const allLines = [...bootLines, ...history];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = getCommandNames();
      const match = commands.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div
      role="region"
      aria-label="Interactive terminal. Type help for available commands."
      className={["fixed inset-0 z-50 flex flex-col bg-nebula-950 font-mono transition-opacity duration-700", transitioning ? "opacity-0" : "opacity-100"].join(" ")}
    >
      <div className="fixed inset-0 -z-10 nebula-gradient opacity-20" />
      
      <div className="relative z-10 flex h-full flex-col p-6 text-sm md:p-12 md:text-base max-w-5xl mx-auto w-full">
        {/* Chrome dots */}
        <div className="mb-8 flex items-center justify-between" aria-hidden="true">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-nebula-accent/40" />
            <div className="h-3 w-3 rounded-full bg-nebula-secondary/40" />
            <div className="h-3 w-3 rounded-full bg-nebula-cyan/40" />
            <span className="ml-4 text-[10px] uppercase tracking-[0.3em] text-nebula-accent/60">TTDEVS // NEBULA_OS</span>
          </div>
          
          {!booting && (
            <button 
              onClick={onStart}
              className="text-[10px] uppercase tracking-[0.2em] text-nebula-cyan/40 hover:text-nebula-cyan transition-colors border border-nebula-cyan/20 px-3 py-1 rounded-full backdrop-blur-sm"
            >
              Enter Studio →
            </button>
          )}
        </div>

        <div ref={outputRef} className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
          {allLines.map((line) => (
            <Line
              key={line.id}
              line={line}
              typewrite={line.type !== "input" && line.type !== "blank"}
            />
          ))}
          {booting && (
            <div className="text-nebula-accent/50" aria-hidden="true">
              <span className="inline-block w-2 h-5 bg-nebula-accent animate-blink" />
            </div>
          )}
        </div>

        {!booting && !transitioning && (
          <div className="flex items-center gap-3 border-t border-white/5 pt-8">
            <span className="shrink-0 select-none text-nebula-accent font-bold" aria-hidden="true">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent text-white outline-none caret-nebula-accent"
              aria-label="Terminal command input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              autoFocus
            />
            <span className="text-[10px] text-white/20 uppercase tracking-widest hidden md:block">
              [TAB] to complete
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Line renderer ────────────────────────────────────────────────────────────

interface LineProps {
  line: OutputLine;
  typewrite?: boolean;
}

function Line({ line, typewrite = false }: LineProps) {
  if (line.type === "blank") return <div className="h-4" aria-hidden="true" />;

  const colorClass =
    line.type === "error"     ? "text-rose-500" :
    line.type === "input"     ? "text-white font-bold" :
    line.type === "boot"      ? "text-nebula-accent/60" :
    line.type === "accent"    ? "text-nebula-accent" :
    line.type === "secondary" ? "text-nebula-secondary" :
    line.type === "cyan"      ? "text-nebula-cyan" :
                                "text-slate-300";

  if (typewrite) {
    return <TypewriterLine text={line.text} colorClass={colorClass} />;
  }

  return <div className={`leading-relaxed whitespace-pre-wrap break-words ${colorClass}`}>{line.text}</div>;
}

// ─── Typewriter line ────────────────────────────────────

function TypewriterLine({ text, colorClass }: { text: string; colorClass: string }) {
  const reduced = useReducedMotion();
  const [len, setLen] = useState(reduced ? text.length : 0);
  const [done, setDone] = useState(reduced || text.length === 0);

  useEffect(() => {
    if (reduced || text.length === 0) {
      setLen(text.length);
      setDone(true);
      return;
    }

    setLen(0);
    setDone(false);

    let i = 0;
    const speed = text.length > 100 ? 2 : 8; 
    const id = setInterval(() => {
      i++;
      setLen(i);
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, reduced]);

  return (
    <div className={`leading-relaxed whitespace-pre-wrap break-words ${colorClass}`}>
      {text.slice(0, len)}
      {!done && <span className="inline-block w-2 h-5 bg-nebula-accent/40 animate-blink ml-1" aria-hidden="true" />}
    </div>
  );
}
