import { ITerminalCommand, CommandResult } from "../types";

export class HireCommand implements ITerminalCommand {
  name = "hire";
  description = "Want to work with us?";

  execute(): CommandResult {
    return {
      lines: [
        { text: "Initializing Elite Developer Protocol...", type: "cyan" },
        { text: "Checking bandwidth... [ DONE ]", type: "output" },
        { text: "", type: "blank" },
        { text: "We're currently open for interesting projects and consulting.", type: "accent" },
        { text: "Send a signal to hi@ttdevs.com and we'll reply within 24h.", type: "secondary" },
      ],
    };
  }
}
