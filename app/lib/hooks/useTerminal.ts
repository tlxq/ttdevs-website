"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { TerminalEngine } from "../terminal/TerminalEngine";
import type { OutputLine } from "../terminal/types";
import { GitHubRepo } from "../github/fetchRepos";
import { usePulse } from "../pulse/PulseContext";

export type { OutputLine };

const BOOT_SEQUENCE: { text: string; delay: number }[] = [
  { text: "TTdevs OS v2.0.0 — booting...", delay: 180 },
  { text: "Loading kernel modules.............. [  OK  ]", delay: 480 },
  { text: "Establishing secure connection...... [  OK  ]", delay: 820 },
  { text: "Fetching live pulse data............ [  OK  ]", delay: 1140 },
  { text: "System ready.", delay: 1440 },
  { text: "", delay: 1600 },
  { text: "▌ TTdevs — Tom & Therese, full-stack developers.", delay: 1800 },
  { text: 'Type "help" for available commands.', delay: 2100 },
  { text: "", delay: 2200 },
];

export function useTerminal(onStart: () => void, repos: GitHubRepo[] = []) {
  const { nodes } = usePulse();
  const [bootLines, setBootLines] = useState<OutputLine[]>([]);
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  const idCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const engine = useMemo(() => new TerminalEngine(repos, nodes), [repos, nodes]);

  const nextId = () => ++idCounter.current;

  // Run boot sequence
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_SEQUENCE.forEach((line, i) => {
      const t = setTimeout(() => {
        setBootLines((prev) => [
          ...prev,
          { id: nextId(), text: line.text, type: line.text === "" ? "blank" : "boot" },
        ]);
        if (i === BOOT_SEQUENCE.length - 1) setBooting(false);
      }, line.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-focus input when boot finishes
  useEffect(() => {
    if (!booting) inputRef.current?.focus();
  }, [booting]);

  // Scroll output to bottom whenever lines change
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  const submit = useCallback(() => {
    const cmdInput = input.trim();

    const inputLine: OutputLine = {
      id: nextId(),
      text: `guest@ttdevs:~$ ${cmdInput}`,
      type: "input",
    };

    const result = engine.process(cmdInput);

    if (result.action === "CLEAR") {
      setHistory([]);
      setInput("");
      return;
    }

    if (result.action === "START") {
      setHistory((prev) => [
        ...prev,
        inputLine,
        ...result.lines.map((l) => ({ ...l, id: nextId() })),
      ]);
      setInput("");
      setTransitioning(true);
      setTimeout(onStart, 900);
      return;
    }

    const responseLines = result.lines.map((line) => ({ ...line, id: nextId() }));
    setHistory((prev) => [...prev, inputLine, ...responseLines]);
    setInput("");
  }, [input, onStart, engine]);

  return { bootLines, booting, history, input, setInput, submit, inputRef, outputRef, transitioning };
}
