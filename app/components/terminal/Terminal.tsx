"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTerminal, type OutputLine } from "../../lib/hooks/useTerminal";
import { GitHubRepo } from "../../lib/github/fetchRepos";

interface TerminalProps {
  onStart: () => void;
  repos?: GitHubRepo[];
}

export default function Terminal({ onStart, repos = [] }: TerminalProps) {
  const { bootLines, booting, history, input, setInput, submit, inputRef, outputRef, transitioning } =
    useTerminal(onStart, repos);

  const allLines = [...bootLines, ...history];

  return (
    <div
      role="region"
      aria-label="Interactive terminal. Type help for available commands."
      className={["fixed inset-0 z-50 flex flex-col bg-zinc-950 font-mono transition-opacity duration-700", transitioning ? "opacity-0" : "opacity-100"].join(" ")}
    >
      <div className="relative z-10 flex h-full flex-col p-6 text-sm md:p-12 md:text-base max-w-5xl mx-auto w-full">
        {/* Chrome dots */}
        <div className="mb-8 flex items-center gap-2" aria-hidden="true">
          <div className="h-3 w-3 rounded-full bg-zinc-800" />
          <div className="h-3 w-3 rounded-full bg-zinc-800" />
          <div className="h-3 w-3 rounded-full bg-zinc-800" />
          <span className="ml-4 text-[10px] uppercase tracking-widest text-zinc-600">TTDEVS // SYSTEM_OS</span>
        </div>

        <div ref={outputRef} className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
          {allLines.map((line, idx) => (
            <Line
              key={line.id}
              line={line}
              typewrite={line.type === "boot" && idx === bootLines.length - 1 && booting}
            />
          ))}
          {booting && (
            <div className="text-zinc-500" aria-hidden="true">
              <span className="inline-block w-2 h-5 bg-zinc-500 animate-blink" />
            </div>
          )}
        </div>

        {!booting && !transitioning && (
          <div className="flex items-center gap-3 border-t border-white/5 pt-8">
            <span className="shrink-0 select-none text-zinc-500" aria-hidden="true">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              className="min-w-0 flex-1 bg-transparent text-zinc-100 outline-none caret-zinc-100"
              aria-label="Terminal command input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              autoFocus
            />
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
    line.type === "error" ? "text-red-500" :
    line.type === "input" ? "text-zinc-100" :
    line.type === "boot"  ? "text-zinc-500"  :
                            "text-zinc-400";

  if (typewrite) {
    return <TypewriterLine text={line.text} colorClass={colorClass} />;
  }

  return <div className={`leading-relaxed whitespace-pre-wrap break-words ${colorClass}`}>{line.text}</div>;
}

// ─── Typewriter line (boot sequence only) ────────────────────────────────────

function TypewriterLine({ text, colorClass }: { text: string; colorClass: string }) {
  const reduced = useReducedMotion();
  const [len, setLen] = useState(reduced ? text.length : 0);
  const [done, setDone] = useState(reduced || text.length === 0);

  useEffect(() => {
    if (reduced || text.length === 0) { setDone(true); return; }
    setLen(0);
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLen(i);
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, 11);
    return () => clearInterval(id);
  }, [text, reduced]);

  return (
    <div className={`leading-relaxed whitespace-pre-wrap break-words ${colorClass}`}>
      {text.slice(0, len)}
      {!done && <span className="inline-block w-2 h-5 bg-zinc-500 animate-blink" aria-hidden="true" />}
    </div>
  );
}
