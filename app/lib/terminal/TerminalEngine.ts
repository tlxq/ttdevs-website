import { ITerminalCommand, CommandResult } from "./types";
import { HelpCommand } from "./commands/HelpCommand";
import { AboutCommand } from "./commands/AboutCommand";
import { SkillsCommand } from "./commands/SkillsCommand";
import { ProjectsCommand } from "./commands/ProjectsCommand";
import { StartCommand } from "./commands/StartCommand";
import { ClearCommand } from "./commands/ClearCommand";
import { PulseCommand } from "./commands/PulseCommand";
import { GitHubRepo } from "../github/fetchRepos";
import { SystemStatus } from "../pulse/PulseContext";

export class TerminalEngine {
  private commands = new Map<string, ITerminalCommand>();

  constructor(repos: GitHubRepo[] = [], pulseNodes: SystemStatus[] = []) {
    this.registerCommand(new AboutCommand());
    this.registerCommand(new SkillsCommand());
    this.registerCommand(new ProjectsCommand(repos));
    this.registerCommand(new PulseCommand(pulseNodes));
    this.registerCommand(new StartCommand());
    this.registerCommand(new ClearCommand());
    this.registerCommand(new HelpCommand(this.commands));
  }

  registerCommand(cmd: ITerminalCommand) {
    this.commands.set(cmd.name.toLowerCase(), cmd);
  }

  process(input: string): CommandResult {
    const [cmdName, ...args] = input.trim().split(/\s+/);
    if (!cmdName) return { lines: [] };

    const command = this.commands.get(cmdName.toLowerCase());
    if (command) {
      return command.execute(args);
    }

    return {
      lines: [
        { text: `Command not found: "${cmdName}". Type "help" for available commands.`, type: "error" },
        { text: "", type: "blank" }
      ]
    };
  }
}
