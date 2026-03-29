import { ITerminalCommand, CommandResult } from "../types";

export class AboutCommand implements ITerminalCommand {
  name = "about";
  description = "About TTdevs";

  execute(): CommandResult {
    return {
      lines: [
        { text: "TTdevs is Tom & Therese — a two-person dev duo.", type: "output" },
        { text: "  Tom     → Frontend  (React, Next.js, TypeScript)", type: "output" },
        { text: "  Therese → Backend   (APIs, databases, architecture)", type: "output" },
        { text: 'Type "start" to explore the full portfolio.', type: "output" },
        { text: "", type: "blank" },
      ],
    };
  }
}
