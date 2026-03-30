import { ITerminalCommand, CommandResult } from "../types";

export class SudoCommand implements ITerminalCommand {
  name = "sudo";
  description = "Trying to get root access?";

  execute(): CommandResult {
    return {
      lines: [
        { text: "Nice try, Human.", type: "secondary" },
        { text: "Only Texas (the Bengal) has root access in this studio.", type: "output" },
        { text: "This incident will be reported. Purrrr.", type: "error" },
      ],
    };
  }
}
