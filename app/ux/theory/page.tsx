import UXPageLayout from "../components/UXPageLayout";

export default function TheoryPage() {
  return (
    <UXPageLayout
      title="UX & Empati"
      intro="Här sammanfattar jag varför det är viktigt att förstå användaren, varför vi empatiserar och hur man kan göra det i praktiken."
    >
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Varför ska vi förstå användaren?</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>Minskar risken att bygga fel sak (sparar tid och pengar).</li>
          <li>Gör prioriteringar tydligare: vad skapar värde för användaren?</li>
          <li>Förbättrar användbarhet, tillgänglighet och förtroende.</li>
          <li>Tar hänsyn till kontext: stress, mobil, vana/ovana, begränsad tid.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Varför ska vi empatisera?</h2>
        <p className="text-gray-700">
          Empati hjälper oss att utgå från användarens verklighet istället för våra antaganden. Det
          gör att designbeslut baseras på riktiga behov, och att vi kan skapa lösningar som känns
          trygga, tydliga och relevanta.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Hur gör man?</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>Intervjuer (för att förstå mål, motiv och språk).</li>
          <li>Observationer (för att se vad användare faktiskt gör).</li>
          <li>Enkäter (för bredd och mönster).</li>
          <li>Usability testing (testa prototyp eller sida tidigt och ofta).</li>
          <li>Sammanfatta i deliverables: personas, journeys, flows, testrapporter.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Reflektion</h2>
        <p className="text-gray-700">
          För mig är den största nyttan att empati gör prioriteringar enklare: när användarens mål
          är tydliga blir det också tydligt vad som är “viktigt” och vad som bara är “kul att ha”.
        </p>
      </section>
    </UXPageLayout>
  );
}
