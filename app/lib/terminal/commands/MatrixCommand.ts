import { ITerminalCommand, CommandResult } from "../types";

export class MatrixCommand implements ITerminalCommand {
  name = "matrix";
  description = "Wake up, Neo.";

  execute(): CommandResult {
    return {
      lines: [
        { text: "01001001 01110100 00100111 01110011 00100000 01100001 00100000 01101100 01101001 01100101", type: "accent" },
        { text: "Wake up, user. You're in the studio.", type: "cyan" },
        { text: ".....................................", type: "secondary" },
      ],
    };
  }
}
