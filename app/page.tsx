import { fetchGitHubRepos } from "./lib/github/fetchRepos";
import HomePageClient from "./components/features/HomePageClient";

export default async function HomePage() {
  // Fetch repos for both developers to inject into Terminal
  const [reposTom, reposTherese] = await Promise.all([
    fetchGitHubRepos("tlxq"),
    fetchGitHubRepos("thjox")
  ]);

  const allRepos = [...reposTom, ...reposTherese].sort((a, b) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return <HomePageClient repos={allRepos} />;
}
