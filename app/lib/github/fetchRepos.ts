export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  owner: {
    login: string;
  };
}

interface RawGitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  owner: {
    login: string;
  };
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos for ${username}`);
    }

    const repos: RawGitHubRepo[] = await response.json();
    
    // Filter out profile READMEs (repo name same as username) and map to our interface
    return repos
      .filter(repo => repo.name.toLowerCase() !== username.toLowerCase())
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
        owner: {
          login: repo.owner.login
        }
      }));
  } catch (error) {
    console.error("GitHub API error:", error);
    return [];
  }
}
