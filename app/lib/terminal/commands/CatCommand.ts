import { ITerminalCommand, CommandResult } from "../types";

export class CatCommand implements ITerminalCommand {
  name = "cat";
  description = "Meet the studio guardians.";

  execute(): CommandResult {
    return {
      lines: [
        { text: "─── STUDIO GUARDIANS ──────────────────────────────────────────", type: "accent" },
        { text: "", type: "blank" },
        { text: "      |\\__/,|   (`\\          |\\__/,|   (`\\", type: "secondary" },
        { text: "    _.|o o  |_   ) )       _.|x x  |_   ) )", type: "secondary" },
        { text: "  -(((---(((--------     -(((---(((--------", type: "secondary" },
        { text: "      TEXAS                    GÖSTA", type: "accent" },
        { text: "", type: "blank" },
        { text: "Texas (Bengal) & Gösta (Devon Rex) live together in the studio.", type: "output" },
        { text: "While Texas guards the workstations, Gösta ensures the coffee", type: "output" },
        { text: "is never cold and the developer is never lonely.", type: "output" },
        { text: "", type: "blank" },
        { text: "Bengal energy meets Devon Rex curiosity.", type: "cyan" },
        { text: "────────────────────────────────────────────────────────────────", type: "accent" },
      ],
    };
  }
}
