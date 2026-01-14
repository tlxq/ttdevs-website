import UXPageLayout from "../components/UXPageLayout";
import Quiz from "./Quiz";

export default function QuizPage() {
  return (
    <UXPageLayout
      title="UX-Quiz"
      intro="Testa dina UX-kunskaper! Skriv ditt namn och svara på frågorna. Kan du ta en plats på highscore-listan?"
    >
      <Quiz />
    </UXPageLayout>
  );
}
