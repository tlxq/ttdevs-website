export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

// 20 exempel-frågor (SV)
export const allQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Vad betyder UX?",
    options: ["User X-perience", "User Experience", "Unified Experience", "Usability Experience"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Vilken metod används för att förstå användarens känslor?",
    options: ["Wireframes", "Empatikarta", "User flows", "Sitemap"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Vad fokuserar usability testing på?",
    options: ["Användarvänlighet", "Designtrender", "Kodkvalitet", "Antal buggar"],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "Vilket är ett UX-deliverable?",
    options: ["Wireframe", "GitHub-repo", "API-dokumentation", "Färdig produkt"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "Vad är en persona?",
    options: ["Funktion", "Fiktiv användare", "Testverktyg", "Designtypografi"],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "Vilket verktyg används ofta för prototyping?",
    options: ["Figma", "Excel", "Python", "Wordpress"],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "Vad betyder heuristic evaluation?",
    options: [
      "Analys av heuristiker",
      "Kvalitativ kodgranskning",
      "Bedömning mot etablerade riktlinjer",
      "Automatiska tester av design",
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "Vad innebär A/B-testning?",
    options: [
      "Två designers arbetar tillsammans",
      "Att testa två versioner mot varandra",
      "Att analysera buggrapporter",
      "Att mäta laddtider",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "Vad är en customer journey map?",
    options: [
      "Projektplan",
      "Flödesschema för kod",
      "Visualisering av användarens resa",
      "Ett menydesign-verktyg",
    ],
    correctIndex: 2,
  },
  {
    id: 10,
    question: "Vad står MVP ofta för inom produktutveckling?",
    options: [
      "Most Valuable Page",
      "Minimal Viable Product",
      "Maximum Variable Parameters",
      "Mean Value Problem",
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    question: "Vad handlar accessibility främst om?",
    options: [
      "Säkerhet på webben",
      "Att alla kan använda produkten",
      "Färgtrender",
      "Prestandaoptimera mobilappar",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    question: "Vad är en wireframe?",
    options: ["Kodmall", "Enkel skiss över gränssnitt", "API-specifikation", "Bildmanus"],
    correctIndex: 1,
  },
  {
    id: 13,
    question: "Vad av följande stämmer bäst för design thinking?",
    options: [
      "Linjära steg utan återkoppling",
      "Vattenfallsmodell",
      "Iterativ process och empati",
      "Endast utvecklare involverade",
    ],
    correctIndex: 2,
  },
  {
    id: 14,
    question: "Vilken av följande är en UX-metod för användarinvolvering?",
    options: ["A/B-test", "Persona", "Brainstorming", "Alla ovan"],
    correctIndex: 3,
  },
  {
    id: 15,
    question: "Vad gör ett ‘card sorting’-test?",
    options: ["Sorterar buggar", "Testar menystruktur", "Rensar databasen", "Prioriterar CSS"],
    correctIndex: 1,
  },
  {
    id: 16,
    question: "Vad är syftet med en prototyp?",
    options: [
      "Visa kodarkitektur",
      "Testa idéer snabbt och billigt",
      "Skapa färdig produkt direkt",
      "Versionhantera",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    question: "Vilket av dessa är en typisk UX-mätbarhet?",
    options: [
      "Antal användare",
      "Användarens nöjdhetsgrad",
      "Produktsidans sidladdningstid",
      "Kodraders längd",
    ],
    correctIndex: 1,
  },
  {
    id: 18,
    question: "Vad är en empathy map till för?",
    options: [
      "Visa känslor och tankar hos användaren",
      "Testa prestanda",
      "Planera databasstruktur",
      "Designa knappar",
    ],
    correctIndex: 0,
  },
  {
    id: 19,
    question: "Vilket påstående passar bäst för User Flow?",
    options: [
      "En stark back-end struktur",
      "En linjär sekvens av kodsteg",
      "Visualisering av stegen en användare tar",
      "Ett testverktyg för kodare",
    ],
    correctIndex: 2,
  },
  {
    id: 20,
    question: "Vad av följande är ett UX-begrepp?",
    options: ["Component rerender", "User Feedback", "React Reconciliation", "Database Migration"],
    correctIndex: 1,
  },
];

// 🔥 Hjälpfunktion för att slumpa ut 10 frågor per quiz
export function getRandomQuizQuestions(count = 10): QuizQuestion[] {
  // Fisher–Yates shuffle
  const questions = allQuizQuestions.slice();
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions.slice(0, count);
}
