import { ITerminalCommand, CommandResult } from "../types";

export class CatFactCommand implements ITerminalCommand {
  name = "catfact";
  description = "Random facts about our guardians and their kind.";

  private facts = [
    "Bengals (Texas) have a unique pelt that can have a 'glitter' effect under the right light.",
    "Devon Rex cats (Gösta) are known as 'Pixie cats' due to their oversized ears and wavy fur.",
    "Bengals are highly intelligent and often enjoy playing in water.",
    "Devon Rex cats are often called 'dogs in cat suits' because they follow their humans everywhere.",
    "Texas once guarded a 48-hour build session without taking a single nap. Mostly.",
    "Gösta is the lead barista in the studio; he prefers light roasts and heavy logs.",
    "Devon Rex fur is so thin that they often seek out the warmest spots, like on top of a server rack."
  ];

  execute(): CommandResult {
    return {
      lines: [
        { text: `Did you know? ${this.facts[Math.floor(Math.random() * this.facts.length)]}`, type: "cyan" }
      ],
    };
  }
}
