"use client";

import { useRouter } from "next/navigation";
import Terminal from "../terminal/Terminal";
import { GitHubRepo } from "../../lib/github/fetchRepos";
import { PulseProvider } from "../../lib/pulse/PulseContext";

interface HomePageClientProps {
  repos: GitHubRepo[];
}

export default function HomePageClient({ repos }: HomePageClientProps) {
  const router = useRouter();

  const handleStart = () => {
    router.push("/portfolio");
  };

  return (
    <PulseProvider>
      <main className="bg-zinc-950 min-h-screen">
        <Terminal onStart={handleStart} repos={repos} />
      </main>
    </PulseProvider>
  );
}
