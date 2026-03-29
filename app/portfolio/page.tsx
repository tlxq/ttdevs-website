import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";
import { fetchGitHubRepos } from "../lib/github/fetchRepos";

export const metadata = {
  title: "Portfolio | TTdevs",
  description: "Minimalist full-stack development studio.",
};

export default async function PortfolioPage() {
  // Fetch repos for both developers
  const [reposTom, reposTherese] = await Promise.all([
    fetchGitHubRepos("tlxq"),
    fetchGitHubRepos("thjox")
  ]);

  // Merge and sort by most recently updated
  const allRepos = [...reposTom, ...reposTherese].sort((a, b) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return <ProfileView profile={PROFILES.joint} backHref="/" repos={allRepos} />;
}
