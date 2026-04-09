import { ProfileView } from "../../components/features/ProfileView";
import { PROFILES } from "../../lib/data/profiles";
import { fetchGitHubRepos } from "../../lib/github/fetchRepos";

export const metadata = {
  title: "Therese | Backend Architect",
};

export default async function TheresePage() {
  const repos = await fetchGitHubRepos("thjox"); // Replace with actual GitHub username
  return <ProfileView profile={PROFILES.therese} backHref="/" repos={repos} />;
}
