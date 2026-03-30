import { ITerminalCommand, CommandResult } from "../types";

export class ContactCommand implements ITerminalCommand {
  name = "contact";
  description = "Get our contact information.";

  execute(): CommandResult {
    return {
      lines: [
        { text: "─── CONTACT ──────────────────────────────────────────────────", type: "accent" },
        { text: "  EMAIL:    hi@ttdevs.com", type: "cyan" },
        { text: "  GITHUB:   github.com/thjox | github.com/tlxq", type: "cyan" },
        { text: "  WEB:      ttdevs.com", type: "cyan" },
        { text: "", type: "blank" },
        { text: "For urgent matters, send a signal to the studio guardians.", type: "secondary" },
      ],
    };
  }
}
