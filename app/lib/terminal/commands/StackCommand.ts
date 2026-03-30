import { ITerminalCommand, CommandResult } from "../types";

export class StackCommand implements ITerminalCommand {
  name = "stack";
  description = "Display our development stack.";

  execute(): CommandResult {
    return {
      lines: [
        { text: "─── OUR TECH STACK ──────────────────────────────────────────", type: "accent" },
        { text: "", type: "blank" },
        { text: "  FRONTEND      Next.js, React, Tailwind CSS, Framer Motion", type: "cyan" },
        { text: "  BACKEND       Node.js, Supabase (PostgreSQL), Redis", type: "cyan" },
        { text: "  TOOLS         TypeScript, Docker, Git, CI/CD Pipelines", type: "cyan" },
        { text: "  HOSTING       Vercel, Self-hosted Home-lab", type: "cyan" },
        { text: "", type: "blank" },
        { text: "Focused on high-performance, minimalist architecture.", type: "secondary" },
      ],
    };
  }
}
