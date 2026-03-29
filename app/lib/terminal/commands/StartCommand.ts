import { ITerminalCommand, CommandResult } from "../types";

export class StartCommand implements ITerminalCommand {
  name = "start";
  description = "Enter the portfolio";

  execute(): CommandResult {
    return {
      lines: [
        { text: "Launching portfolio...", type: "output" },
      ],
      action: "START",
    };
  }
}
