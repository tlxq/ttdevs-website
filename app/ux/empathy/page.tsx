import UXPageLayout from "../components/UXPageLayout";

export default function EmpathyPage() {
  return (
    <UXPageLayout
      title="Empatisering"
      intro="Här empatiserar jag med användare inom en vald domän och beskriver användartyper, behov och pain points som påverkar designbeslut."
    >
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Vald domän / verktyg</h2>
        <p className="text-gray-700">
          <span className="font-medium">Domän:</span> (fyll i)
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Tänkt verktyg/portal:</span> (fyll i: vad ska portalen
          hjälpa användaren att göra?)
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Användartyper</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>Primär användare: (fyll i)</li>
          <li>Sekundär användare: (fyll i)</li>
          <li>Admin/Personal: (fyll i)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Behov & mål</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>Behov 1: (fyll i)</li>
          <li>Behov 2: (fyll i)</li>
          <li>Behov 3: (fyll i)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Pain points (frustrationer)</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>Problem 1: (fyll i)</li>
          <li>Problem 2: (fyll i)</li>
          <li>Problem 3: (fyll i)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Kort reflektion</h2>
        <p className="text-gray-700">
          (Skriv 3–6 meningar: vad lärde du dig? vilka antaganden kändes osäkra? vad skulle du vilja
          intervjua/testa för att veta mer?)
        </p>
      </section>
    </UXPageLayout>
  );
}
