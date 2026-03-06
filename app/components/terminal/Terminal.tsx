"use client";

import NeonGrid from "./NeonGrid";
import { useTerminal, type OutputLine } from "../../lib/hooks/useTerminal";

interface TerminalProps {
  onStart: () => void;
}

export default function Terminal({ onStart }: TerminalProps) {
  const { bootLines, booting, history, input, setInput, submit, inputRef, outputRef, transitioning } =
    useTerminal(onStart);

  const allLines = [...bootLines, ...history];

  return (
    <div
      role="region"
      aria-label="Interactive terminal. Type help for available commands."
      className={["tt-terminal", transitioning ? "opacity-0" : "opacity-100"].join(" ")}
    >
      <NeonGrid />

      <div className="tt-terminal-inner">
        <div className="tt-terminal-titlebar" aria-hidden="true">
          <span className="tt-dot-close" />
          <span className="tt-dot-minimize" />
          <span className="tt-dot-maximize" />
          <span className="tt-terminal-title">ttdevs — bash</span>
        </div>

        <div ref={outputRef} className="tt-terminal-output" aria-live="polite" aria-atomic="false">
          {allLines.map((line) => (
            <Line key={line.id} line={line} />
          ))}
        </div>

        {!booting && !transitioning && (
          <div className="tt-terminal-prompt-row">
            <span className="tt-terminal-prompt" aria-hidden="true">
              guest@ttdevs:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              className="tt-terminal-input"
              aria-label="Terminal command input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Line renderer ───────────────────────────────────────────────────────────

function Line({ line }: { line: OutputLine }) {
  if (line.type === "blank") return <div className="tt-terminal-blank" aria-hidden="true" />;

  const colorClass =
    line.type === "error" ? "tt-line-error" :
    line.type === "input" ? "tt-line-input" :
    line.type === "boot"  ? "tt-line-boot"  :
                            "tt-line-output";

  if (line.text.includes("[  OK  ]")) {
    const [before, after] = line.text.split("[  OK  ]");
    return (
      <div className={`tt-terminal-line ${colorClass}`}>
        {before}
        <span className="tt-line-ok">[  OK  ]</span>
        {after}
      </div>
    );
  }

  const parts = line.text.split(/("[\w-]+")/g);
  if (parts.length > 1) {
    return (
      <div className={`tt-terminal-line ${colorClass}`}>
        {parts.map((part, i) =>
          part.startsWith('"') && part.endsWith('"') ? (
            <span key={i} className="tt-terminal-cmd">{part}</span>
          ) : (
            part
          )
        )}
      </div>
    );
  }

  return <div className={`tt-terminal-line ${colorClass}`}>{line.text}</div>;
}
