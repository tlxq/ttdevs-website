import PersonPortfolioLayout from "../components/person-portfolio/PersonPortfolioLayout";

export const metadata = {
  title: "Tom — Frontend Developer | TTdevs",
  description: "Tom's developer portfolio. React, Next.js, TypeScript, Tailwind CSS.",
};

export default function TomPage() {
  return <PersonPortfolioLayout person="tom" />;
}
