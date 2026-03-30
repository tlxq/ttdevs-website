import { ITerminalCommand, CommandResult } from "../types";
import { SystemStatus } from "../../pulse/PulseContext";

export class UptimeCommand implements ITerminalCommand {
  name = "uptime";
  description = "View the total studio uptime.";

  constructor(private nodes: SystemStatus[] = []) {}

  execute(): CommandResult {
    const totalUptime = "124 days, 14 hours, 22 minutes"; // Mocked or calculated from first node
    
    return {
      lines: [
        { text: "Studio Network Uptime Status:", type: "accent" },
        { text: `Current Uptime: ${totalUptime}`, type: "cyan" },
        { text: `Nodes Online: ${this.nodes.length} stations.`, type: "output" },
        { text: "Continuous grinding since deployment.", type: "secondary" },
      ],
    };
  }
}
