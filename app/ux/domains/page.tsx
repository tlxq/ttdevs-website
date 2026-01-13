export default function DomainsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold">Kunskapsdomäner</h1>
        <p className="text-gray-600">
          Här jämför jag vad som krävs om man bygger en vanlig hemsida (information/marknadsföring)
          jämfört med en plattform eller ett verktyg (funktion/arbete) inom en kunskapsdomän.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Vald domän</h2>
        <p className="text-gray-700">
          <span className="font-medium">Domän:</span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Kort beskrivning:</span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Om vi bygger en hemsida behöver vi oftast</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>Grundläggande information (vad, var, när, pris)</li>
          <li>Tydlig struktur och navigation</li>
          <li>Call-to-action (t.ex. kontakt, boka, ansök)</li>
          <li>Förtroendeskapande innehåll (referenser, policy, FAQ)</li>
          <li>Mobilanpassning och tillgänglighet</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Om vi bygger en plattform/verktyg behöver vi oftast
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>Inloggning/konton och behörigheter</li>
          <li>Flöden: skapa, ändra, spara, följa upp</li>
          <li>Data: historik, status, kvitton, dokument</li>
          <li>Edge cases: fel, avbrott, återställning</li>
          <li>Admin-yta och driftfrågor (GDPR, säkerhet, loggning)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Jämförelse</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>
            <span className="font-medium">Vad skiljer dem åt?</span>
          </li>
          <li>
            <span className="font-medium">Varför?</span>
          </li>
          <li>
            <span className="font-medium">Olika designprocesser?</span>
          </li>
          <li>
            <span className="font-medium">Olika tekniska kompetenser?</span>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Reflektion</h2>
        <p className="text-gray-700">Kommer snart...</p>
      </section>
    </article>
  );
}
