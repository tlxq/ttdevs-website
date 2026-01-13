import UXPageLayout from "../components/UXPageLayout";

export default function DeliverablesPage() {
  return (
    <UXPageLayout
      title="UX Deliverables"
      intro="Här samlar jag förklaringar och exempel på vanliga UX deliverables och designdokument,
samt varför de är viktiga i en designprocess."
    >
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Vad är en UX deliverable?</h2>
        <p className="text-gray-700">
          En UX deliverable är ett “resultat” (artefakt) från UX-arbetet som hjälper teamet att
          förstå användare, problem och lösning. Det kan vara research, analys eller design.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Vad är ett designdokument?</h2>
        <p className="text-gray-700">
          Ett designdokument beskriver ofta den tänkta lösningen mer konkret: krav, flöden,
          skisser/wireframes, komponenter och designbeslut. Syftet är att skapa samsyn och
          underlätta implementation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Samma sak eller olika?</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>
            <span className="font-medium">Likhet:</span> båda kommunicerar och dokumenterar arbete
            så att fler kan förstå och samarbeta.
          </li>
          <li>
            <span className="font-medium">Skillnad:</span> deliverables kan vara mer research/analys
            (t.ex. persona, journey), medan designdokument ofta är mer “hur vi bygger lösningen”.
          </li>
          <li>
            <span className="font-medium">Överlapp:</span> en wireframe kan vara både deliverable
            och del av ett designdokument.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Exempel på UX deliverables</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            "Personas / proto-personas",
            "Empathy map",
            "User journey map",
            "User flows",
            "Sitemap / informationsarkitektur",
            "Wireframes",
            "Prototyper",
            "Usability test-plan & test-rapport",
            "Heuristic evaluation",
            "Content inventory",
          ].map((item) => (
            <li key={item} className="rounded border border-gray-200 bg-white px-3 py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Reflektion</h2>
        <p className="text-gray-700">
          Jag upplever att deliverables framför allt handlar om att göra “osynligt tänk” synligt:
          insikter, prioriteringar och designbeslut. De gör det lättare att motivera varför vi
          bygger något på ett visst sätt.
        </p>
      </section>
    </UXPageLayout>
  );
}
