import { ITerminalCommand, CommandResult } from "../types";

export class HelpCommand implements ITerminalCommand {
  name = "help";
  description = "Lists available commands.";
  
  constructor(private commands: Map<string, ITerminalCommand>) {}

  execute(): CommandResult {
    const lines: CommandResult["lines"] = [{ text: "Available commands:", type: "output" as const }];
    this.commands.forEach(cmd => {
      lines.push({ text: `  ${cmd.name.padEnd(8, " ")} — ${cmd.description}`, type: "output" as const });
    });
    lines.push({ text: "", type: "blank" as const });
    return { lines };
  }
}
