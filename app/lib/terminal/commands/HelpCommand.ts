import { ITerminalCommand, CommandResult } from "../types";

export class HelpCommand implements ITerminalCommand {
  name = "help";
  description = "Lists available commands.";
  
  constructor(private commands: Map<string, ITerminalCommand>) {}

  execute(): CommandResult {
    const lines: CommandResult["lines"] = [
      { text: "─── AVAILABLE COMMANDS ────────────────────────────────────────", type: "accent" as const },
      { text: "", type: "blank" as const }
    ];
    this.commands.forEach(cmd => {
      lines.push({ text: `  ${cmd.name.padEnd(10, " ")} — ${cmd.description}`, type: "cyan" as const });
    });
    lines.push({ text: "", type: "blank" as const });
    lines.push({ text: "Tip: Use [TAB] to auto-complete commands.", type: "secondary" as const });
    lines.push({ text: "────────────────────────────────────────────────────────────────", type: "accent" as const });
    return { lines };
  }
}
