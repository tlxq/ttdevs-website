import PersonPortfolioLayout from "../components/person-portfolio/PersonPortfolioLayout";

export const metadata = {
  title: "Therese — Backend Developer | TTdevs",
  description: "Therese's developer portfolio. Node.js, REST APIs, PostgreSQL, system architecture.",
};

export default function TheresePage() {
  return <PersonPortfolioLayout person="therese" />;
}
