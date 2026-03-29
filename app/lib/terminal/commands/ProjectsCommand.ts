import { ITerminalCommand, CommandResult } from "../types";
import { GitHubRepo } from "../../github/fetchRepos";

export class ProjectsCommand implements ITerminalCommand {
  name = "projects";
  description = "Browse our live GitHub ecosystem";

  constructor(private repos: GitHubRepo[] = []) {}

  execute(): CommandResult {
    if (this.repos.length === 0) {
      return {
        lines: [
          { text: "Fetching live ecosystem data...", type: "output" },
          { text: "No active repositories found in current scope.", type: "error" },
          { text: "", type: "blank" },
        ],
      };
    }

    const lines: CommandResult["lines"] = [
      { text: "LIVE ECOSYSTEM // GITHUB REPOS", type: "output" },
      { text: "──────────────────────────────────────────────", type: "output" },
    ];

    this.repos.forEach((repo) => {
      const owner = repo.owner.login.padEnd(8, " ");
      const stars = `★ ${repo.stargazers_count}`.padEnd(6, " ");
      const lang = (repo.language || "N/A").padEnd(12, " ");
      
      lines.push({ 
        text: `→ ${repo.name.padEnd(20, " ")} [${lang}] ${stars} [by ${owner}]`, 
        type: "output" 
      });
    });

    lines.push({ text: "──────────────────────────────────────────────", type: "output" });
    lines.push({ text: 'Type "start" to see the visual portfolio.', type: "output" });
    lines.push({ text: "", type: "blank" });

    return { lines };
  }
}
