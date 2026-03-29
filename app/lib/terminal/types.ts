export type LineType = "boot" | "input" | "output" | "error" | "blank";

export interface OutputLine {
  id: number;
  text: string;
  type: LineType;
}

export interface CommandResult {
  lines: { text: string; type: LineType }[];
  action?: "START" | "CLEAR";
}

export interface ITerminalCommand {
  name: string;
  description: string;
  execute(args: string[]): CommandResult;
}
