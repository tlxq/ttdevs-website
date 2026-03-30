import { ITerminalCommand, CommandResult } from "../types";
import { SystemStatus } from "../../pulse/PulseContext";

export class PulseCommand implements ITerminalCommand {
  name = "pulse";
  description = "View real-time home lab system status";

  constructor(private nodes: SystemStatus[]) {}

  execute(args: string[]): CommandResult {
    const isTop = args[0] === "top";

    if (this.nodes.length === 0) {
      return {
        lines: [{ text: "NO ACTIVE NODES DETECTED IN HOME LAB.", type: "error" }],
      };
    }

    const sortedNodes = isTop 
      ? [...this.nodes].sort((a, b) => (b.cpuUsage + b.ramUsage) - (a.cpuUsage + a.ramUsage)).slice(0, 3)
      : this.nodes;

    const lines: CommandResult["lines"] = [
      { text: `─── TTDEVS // ${isTop ? "TOP RESOURCE CONSUMERS" : "PULSE MONITOR"} ─────────`, type: "accent" },
      { text: "", type: "blank" },
    ];

    sortedNodes.forEach((node) => {
      const state = node.isOnline ? "ONLINE " : "OFFLINE";
      const cpu = Math.round(node.cpuUsage);
      const barWidth = 10;
      const filled = Math.min(10, Math.max(0, Math.round((cpu / 100) * barWidth)));
      const bar = "█".repeat(filled).padEnd(barWidth, "░");
      
      lines.push({ 
        text: `  [${node.nodeName.toUpperCase().padEnd(12)}] ${state} CPU: ${bar} ${cpu}% RAM: ${node.ramUsage}%`, 
        type: "cyan" 
      });
    });

    lines.push({ text: "", type: "blank" });
    lines.push({ text: `  ACTIVE_NODES: ${this.nodes.filter(n => n.isOnline).length} / ${this.nodes.length}`, type: "secondary" });
    lines.push({ text: "  SOURCE: PULSE.TTDEVS.COM", type: "secondary" },
    { text: "────────────────────────────────────────────────────────────────", type: "accent" });

    return { lines };
  }
}
