import { ITerminalCommand, CommandResult } from "../types";
import { SystemStatus } from "../../pulse/PulseContext";

export class PulseCommand implements ITerminalCommand {
  name = "pulse";
  description = "View real-time home lab system status";

  constructor(private nodes: SystemStatus[]) {}

  execute(): CommandResult {
    if (this.nodes.length === 0) {
      return {
        lines: [{ text: "NO ACTIVE NODES DETECTED IN HOME LAB.", type: "error" }],
      };
    }

    const lines: CommandResult["lines"] = [
      { text: "TTDEVS // MULTI-NODE PULSE MONITOR", type: "output" },
      { text: "────────────────────────────────────────────────", type: "output" },
    ];

    this.nodes.forEach((node) => {
      const state = node.isOnline ? "ONLINE " : "OFFLINE";
      const cpu = Math.round(node.cpuUsage);
      const barWidth = 10;
      const filled = Math.round((cpu / 100) * barWidth);
      const bar = "█".repeat(filled).padEnd(barWidth, "░");
      
      lines.push({ 
        text: `[${node.nodeName.toUpperCase().padEnd(12)}] ${state} CPU: ${bar} ${cpu}% RAM: ${node.ramUsage}%`, 
        type: "output" 
      });
    });

    lines.push({ text: "────────────────────────────────────────────────", type: "output" });
    lines.push({ text: ` ACTIVE_NODES: ${this.nodes.filter(n => n.isOnline).length} / ${this.nodes.length}`, type: "output" });
    lines.push({ text: " SOURCE: PULSE.TTDEVS.COM (SUPABASE_REALTIME)", type: "output" });
    lines.push({ text: "", type: "blank" });

    return { lines };
  }
}
