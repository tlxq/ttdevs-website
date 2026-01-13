import UXPageLayout from "./components/UXPageLayout";

export default function UXPage() {
  return (
    <UXPageLayout
      title="ÖVERSIKT"
      intro="Denna sida samlar mitt arbete inom UX, inklusive övningar, reflektioner och UX deliverables."
    >
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Om projektet</h2>
        <p>
          Målet med detta projekt är att förstå användaren, arbeta användarcentrerat och tillämpa
          UX-processen i praktiken.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Innehåll</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Kunskapsdomäner</li>
          <li>Empatisering & användarbehov</li>
          <li>Jämförelser: hemsida vs plattform</li>
          <li>UX deliverables</li>
          <li>Reflektioner</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Kommande arbete</h2>
        <p>
          Här kommer jag successivt att fylla på med dokumentation, exempel och slutsatser från
          kursens övningar.
        </p>
      </section>
    </UXPageLayout>
  );
}
