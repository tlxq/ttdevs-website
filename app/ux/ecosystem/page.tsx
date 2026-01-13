type EcosystemItem = {
  concept: string;
  description: string;
  resource?: { label: string; href: string };
};

const ecosystemItems: EcosystemItem[] = [
  {
    concept: "UX (User Experience)",
    description:
      "Helhetsupplevelsen en person har när den använder en produkt eller tjänst. Inkluderar användbarhet, känsla, förtroende och hur väl produkten hjälper användaren att nå sitt mål.",
    resource: {
      label: "YT: What is UX/UI",
      href: "https://www.youtube.com/watch?v=zHAa-m16NGk",
    },
  },
  {
    concept: "UI (User Interface)",
    description:
      "Det användaren ser och interagerar med: layout, knappar, typografi, färger och komponenter. UI är en del av UX, men UX omfattar mer än bara gränssnittet.",
    resource: {
      label: "Interaction Design Foundation: UI Design",
      href: "https://www.interaction-design.org/literature/topics/ui-design",
    },
  },
  {
    concept: "Målgrupp",
    description:
      "Den grupp människor man designar för. Ofta definierad av behov, beteenden och kontext (inte bara demografi). Att förstå målgruppen hjälper oss prioritera rätt funktioner och innehåll.",
    resource: {
      label: "Make it clear",
      href: "https://makeitclear.com/understanding-your-ux-target-audience/",
    },
  },
  {
    concept: "Empati",
    description:
      "Förmågan att förstå användarens perspektiv, känslor och situation. I UX betyder det att ta beslut baserat på användarens verklighet – inte antaganden.",
    resource: {
      label: "Uxplanet",
      href: "https://uxplanet.org/empathy-in-ux-design-what-it-is-and-why-its-important-3f6a8919ef10",
    },
  },
  {
    concept: "Empatisera",
    description:
      "Ett aktivt steg i designprocessen där man samlar insikter om användare genom t.ex. intervjuer, observationer och testning. Syftet är att hitta behov, mål och pain points.",
    /* resource: {
      label: "Medium",
      href: "https://uxplanet.org/empathy-in-ux-design-what-it-is-and-why-its-important-3f6a8919ef10",
    }, */
  },
  {
    concept: "Perception (Perception)",
    description:
      "Hur människor uppfattar och tolkar det de ser/hör/känner. Påverkar hur vi läser gränssnitt, upptäcker knappar, förstår hierarki och gör misstag.",
    resource: {
      label: "UX: Visual Perception",
      href: "https://uxdesign.cc/visual-perception-in-user-experience-design-7943c97b14f4",
    },
  },
  {
    concept: "Emotional Design",
    description:
      "Att designa för känslor: trygghet, glädje, kontroll och förtroende. Känslor påverkar hur användare bedömer kvalitet och om de vill fortsätta använda produkten.",
    resource: {
      label: "YT: Don Norman: Emotional Design",
      href: "https://www.youtube.com/watch?v=fwr4AIpvQ5o",
    },
  },
  {
    concept: "Emotional Intelligence",
    description:
      "Förmågan att identifiera, förstå och hantera känslor (egna och andras). I UX-sammanhang hjälper det i intervjuer, feedback, samarbete och när man tolkar användarbehov.",
    resource: {
      label: "YT: What Is Emotional Intelligence? | Business: Explained",
      href: "https://www.youtube.com/watch?v=tbKr0EuiVjc",
    },
  },
  {
    concept: "UX Deliverables",
    description:
      "Artefakter som dokumenterar research, analys eller design, t.ex. personas, user journeys, wireframes och testrapporter. Används för att skapa samsyn och stödja beslut.",
    resource: {
      label: "YT: Choosing the Right UX Deliverable Template",
      href: "https://www.youtube.com/watch?v=CeLD36Zso_U",
    },
  },
  {
    concept: "User Persona",
    description:
      "En fiktiv men evidensbaserad användarprofil som representerar en viktig användartyp. Hjälper teamet fatta designbeslut med användarens mål och behov i fokus.",
    resource: {
      label: "YT: What is a Persona?",
      href: "https://www.youtube.com/watch?v=aF7vesj_YTM",
    },
  },
  {
    concept: "Empathy Map",
    description:
      "Ett verktyg för att sammanfatta vad en användare säger, tänker, gör och känner. Hjälper att synliggöra motiv, osäkerheter och pain points.",
    resource: {
      label: "YT: When to Empathy Map",
      href: "https://www.youtube.com/watch?v=ZtFgXMBtNcY",
    },
  },
];

export default function EcosystemPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold">UX-ekosystem</h1>
        <p className="text-gray-600">
          Tabellen nedan är baserad på Ekosystem UX F25. Den efterliknar ett kalkylblad för att göra
          begrepp, förklaringar och resurser överskådliga och lätta att jämföra.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Begrepp / koncept
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Förklaring
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Resurs</th>
            </tr>
          </thead>

          <tbody>
            {ecosystemItems.map((item, index) => (
              <tr key={item.concept} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-3 py-2 font-medium">{item.concept}</td>
                <td className="border border-gray-300 px-3 py-2 text-gray-700">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {item.resource ? (
                    <a
                      href={item.resource.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline-offset-2 hover:underline"
                    >
                      {item.resource.label}
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Reflektion</h2>
        <p className="text-gray-700">
          Genom att presentera UX-ekosystemet i tabellform blir det tydligt hur olika begrepp
          relaterar till varandra. Strukturen gör det också enkelt att komplettera med egna
          förklaringar och externa resurser.
        </p>
      </section>
    </article>
  );
}
