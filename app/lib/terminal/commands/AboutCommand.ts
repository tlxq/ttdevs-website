import { ITerminalCommand, CommandResult } from "../types";

export class AboutCommand implements ITerminalCommand {
  name = "about";
  description = "Who We Are";

  execute(): CommandResult {
    return {
      lines: [
        { text: "TTdevs is Tom & Therese — a two-person development collective.", type: "output" },
        { text: "  Tom     → Interface Engineer (UX, React, Motion)", type: "output" },
        { text: "  Therese → Systems Engineer   (Architecture, API, Logic)", type: "output" },
        { text: 'Type "start" to explore the full portfolio.', type: "output" },
        { text: "", type: "blank" },
      ],
    };
  }
}
