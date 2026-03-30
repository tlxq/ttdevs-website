import { ITerminalCommand, CommandResult } from "../types";

export class CoffeeCommand implements ITerminalCommand {
  name = "coffee";
  description = "A necessary studio resource.";

  execute(): CommandResult {
    const isTherese = Math.random() > 0.5;
    const blend = isTherese 
      ? "Brewing 'Studio Latte'... (Therese's Choice: with milk)." 
      : "Brewing 'Dark Roast'... (Tom's Choice: strictly black).";

    return {
      lines: [
        { text: "      )  (  ", type: "accent" },
        { text: "     (   ) ", type: "accent" },
        { text: "   ._____.", type: "output" },
        { text: "   |     |~~|", type: "output" },
        { text: "   `-----'  |", type: "output" },
        { text: "    `---'---'", type: "output" },
        { text: blend, type: "cyan" },
        { text: "Energy levels restored.", type: "secondary" },
      ],
    };
  }
}
