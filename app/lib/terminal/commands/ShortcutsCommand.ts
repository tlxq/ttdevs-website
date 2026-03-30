import { ITerminalCommand, CommandResult } from "../types";

export class ShortcutsCommand implements ITerminalCommand {
  name = "shortcuts";
  description = "View terminal keyboard shortcuts.";

  execute(): CommandResult {
    return {
      lines: [
        { text: "─── SHORTCUTS ────────────────────────────────────────────────", type: "accent" },
        { text: "  [TAB]      Auto-complete command", type: "cyan" },
        { text: "  [ENTER]    Submit command", type: "cyan" },
        { text: "  [ESC]      Blur/Close terminal (Ghost mode)", type: "cyan" },
        { text: "  [CTRL+L]   Clear screen", type: "cyan" },
        { text: "", type: "blank" },
        { text: "Optimized for high-speed terminal interaction.", type: "secondary" },
      ],
    };
  }
}
