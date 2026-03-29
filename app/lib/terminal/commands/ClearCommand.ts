import { ITerminalCommand, CommandResult } from "../types";

export class ClearCommand implements ITerminalCommand {
  name = "clear";
  description = "Clear terminal";

  execute(): CommandResult {
    return {
      lines: [],
      action: "CLEAR",
    };
  }
}
