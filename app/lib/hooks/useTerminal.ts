"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type LineType = "boot" | "input" | "output" | "error" | "blank";

export interface OutputLine {
  id: number;
  text: string;
  type: LineType;
}

type RawLine = { text: string; type: LineType };

const BOOT_SEQUENCE: { text: string; delay: number }[] = [
  { text: "TTdevs OS v2.0.0 — booting...", delay: 180 },
  { text: "Loading kernel modules.............. [  OK  ]", delay: 480 },
  { text: "Mounting developer profiles......... [  OK  ]", delay: 820 },
  { text: "Establishing secure connection...... [  OK  ]", delay: 1140 },
  { text: "Running environment checks.......... [  OK  ]", delay: 1440 },
  { text: "System ready.", delay: 1780 },
  { text: "", delay: 2000 },
  { text: "▌ TTdevs — Tom & Therese, full-stack developers.", delay: 2200 },
  { text: 'Type "help" for available commands.', delay: 2580 },
  { text: "", delay: 2720 },
];

function processCommand(cmd: string): RawLine[] {
  switch (cmd.trim().toLowerCase()) {
    case "help":
      return [
        { text: "Available commands:", type: "output" },
        { text: "  start    — Enter the portfolio", type: "output" },
        { text: "  about    — About TTdevs", type: "output" },
        { text: "  skills   — Tech stack overview", type: "output" },
        { text: "  projects — Browse projects", type: "output" },
        { text: "  clear    — Clear terminal", type: "output" },
        { text: "", type: "blank" },
      ];

    case "about":
      return [
        { text: "TTdevs is Tom & Therese — a two-person dev duo.", type: "output" },
        { text: "  Tom     → Frontend  (React, Next.js, TypeScript)", type: "output" },
        { text: "  Therese → Backend   (APIs, databases, architecture)", type: "output" },
        { text: 'Type "start" to explore the full portfolio.', type: "output" },
        { text: "", type: "blank" },
      ];

    case "skills":
      return [
        { text: "[ Frontend ]  React · Next.js · TypeScript · Tailwind CSS", type: "output" },
        { text: "[ Backend  ]  Node.js · REST APIs · PostgreSQL · Redis", type: "output" },
        { text: "[ Tools    ]  Git · Docker · Vercel · Figma", type: "output" },
        { text: "", type: "blank" },
      ];

    case "projects":
      return [
        { text: "→ TTdevs Portfolio  — The site you're looking at", type: "output" },
        { text: "→ EPA-appen         — Mobile app for EPA car enthusiasts", type: "output" },
        { text: 'Type "start" to see full project details.', type: "output" },
        { text: "", type: "blank" },
      ];

    case "start":
    case "clear":
    case "":
      return [];

    default:
      return [
        {
          text: `Command not found: "${cmd}". Type "help" for available commands.`,
          type: "error",
        },
        { text: "", type: "blank" },
      ];
  }
}

export function useTerminal(onStart: () => void) {
  const [bootLines, setBootLines] = useState<OutputLine[]>([]);
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  const idCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const cmd = input.trim();

    const inputLine: OutputLine = {
      id: nextId(),
      text: `guest@ttdevs:~$ ${cmd}`,
      type: "input",
    };

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd.toLowerCase() === "start") {
      setHistory((prev) => [
        ...prev,
        inputLine,
        { id: nextId(), text: "Launching portfolio...", type: "output" },
      ]);
      setInput("");
      setTransitioning(true);
      setTimeout(onStart, 900);
      return;
    }

    const responseLines = processCommand(cmd).map((line) => ({ ...line, id: nextId() }));
    setHistory((prev) => [...prev, inputLine, ...responseLines]);
    setInput("");
  }, [input, onStart]);

  return { bootLines, booting, history, input, setInput, submit, inputRef, outputRef, transitioning };
}
