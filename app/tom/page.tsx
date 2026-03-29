import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";
import { fetchGitHubRepos } from "../lib/github/fetchRepos";

export const metadata = {
  title: "Tom | Frontend Specialist",
};

export default async function TomPage() {
  const repos = await fetchGitHubRepos("tlxq"); // Replace with actual GitHub username
  return <ProfileView profile={PROFILES.tom} backHref="/" repos={repos} />;
}
