import UXPageLayout from "../components/UXPageLayout";
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
  {
    concept: "flödesdiagram",
    description:
      "En visuell representation av processer och flöden inom en system, användarflöde eller arbetsprocess. Hjälper till att visualisera steg, beslut och alternativ i en process.",
  },
  {
    concept: "wireframe",
    description:
      "En grundläggande visuell representation av en webbplats eller app. Inkluderar layout, struktur och placering av element utan färg eller detaljer.",
  },
  {
    concept: "mockup",
    description:
      "En visuell representation av en webbplats eller app med färg, typografi och layout. Många gånger används för att visa hur produkten kommer att se ut i slutänden.",
  },
  {
    concept: "prototyp",
    description:
      "En fungerande modell av en produkt eller tjänst. Kan vara en enkel skiss eller en interaktiv version som simulerar användarflöden.",
  },
  {
    concept: "user journey map",
    description:
      "En visuell representation av en användares upplevelse när de interagerar med en produkt eller tjänst. Inkluderar olika steg, känslor och kontext.",
  },
  {
    concept: "moodboard",
    description:
      "En visuell sammanfattning av en designkampagn eller projekt. Inkluderar färger, bilder, text och andra visuella element som inspirerar till en visuell identitet.",
  },
  {
    concept: "färgtema",
    description:
      "En samling färger som används i en design. Färgtema hjälper till att skapa en konsistent och harmonisk visuell identitet.",
  },
  {
    concept: "designsystem",
    description:
      "En samling komponenter, regler och principer som används för att skapa en konsistent och skalbar design. Inkluderar färg, typografi, layout och komponenter.",
  },
  {
    concept: "grafisk profil",
    description:
      "En samling visuella element som representerar en organisation eller produkt. Inkluderar logotyp, färg, typografi och bildspråk.",
  },
  {
    concept: "gestalt principles",
    description:
      "Designprinciper som hjälper till att skapa en intuitiv och logisk upplevelse. Inkluderar principer som proximitet, likhet och fokus.",
  },
];
export default function EcosystemPage() {
  return (
    <UXPageLayout
      title="Ekosystem"
      intro="Tabellen nedan är baserad på begrepp som vi bör känna till."
    >
      <article className="space-y-8">
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
          <p className="text-gray-700">Kommer snart.</p>
        </section>
      </article>
    </UXPageLayout>
  );
}
