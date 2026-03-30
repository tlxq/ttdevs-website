import { ITerminalCommand, CommandResult } from "../types";

export class PetCommand implements ITerminalCommand {
  name = "pet";
  description = "Give the guardians some attention. Usage: pet texas | pet gosta";

  execute(args: string[]): CommandResult {
    const target = args[0]?.toLowerCase();

    if (target === "texas") {
      return {
        lines: [
          { text: "Texas leans into your hand, purring at a low frequency.", type: "secondary" },
          { text: "He seems more focused on the studio's security now.", type: "output" },
        ],
      };
    }

    if (target === "gosta" || target === "gösta") {
      return {
        lines: [
          { text: "Gösta chirps and does a little flip! He's thrilled.", type: "cyan" },
          { text: "He starts batting at a stray semicolon in the code.", type: "output" },
        ],
      };
    }

    return {
      lines: [
        { text: "Usage: pet texas | pet gosta", type: "error" },
      ],
    };
  }
}
