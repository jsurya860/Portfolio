export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export const FEATURED_REPOS = [
  'Fake-filler',
  'mobiletestautomation',
  'Manual-Testing-Project',
  'Attendance-Management-System'
];

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    const repos: GithubRepo[] = await response.json();
    
    // CASE-INSENSITIVE FILTER: Match repos regardless of capitalization
    const featuredLower = FEATURED_REPOS.map(r => r.toLowerCase());
    const filtered = repos
      .filter(repo => featuredLower.includes(repo.name.toLowerCase()))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    return filtered;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export const GITHUB_LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  React: '#61dafb',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
};
