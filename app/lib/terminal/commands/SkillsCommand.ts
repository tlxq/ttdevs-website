import { ITerminalCommand, CommandResult } from "../types";

export class SkillsCommand implements ITerminalCommand {
  name = "skills";
  description = "Tech stack overview";

  execute(): CommandResult {
    return {
      lines: [
        { text: "[ Frontend ]  React · Next.js · TypeScript · Tailwind CSS", type: "output" },
        { text: "[ Backend  ]  Node.js · REST APIs · PostgreSQL · Redis", type: "output" },
        { text: "[ Tools    ]  Git · Docker · Vercel · Figma", type: "output" },
        { text: "", type: "blank" },
      ],
    };
  }
}
