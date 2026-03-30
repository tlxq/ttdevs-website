import { ITerminalCommand, CommandResult } from "../types";

export class StartCommand implements ITerminalCommand {
  name = "start";
  description = "Enter the portfolio";

  execute(): CommandResult {
    return {
      lines: [
        { text: "Accessing tt family's Dev Studio...", type: "accent" },
        { text: "Syncing with Texas & Gösta... [  OK  ]", type: "cyan" },
        { text: "Welcome to the studio. Human access granted.", type: "secondary" },
      ],
      action: "START",
    };
  }
}
