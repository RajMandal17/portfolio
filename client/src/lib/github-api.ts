const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

// Get GitHub token from environment variables
const getGitHubToken = () => {
  return import.meta.env.VITE_GITHUB_TOKEN || 
         import.meta.env.VITE_GITHUB_API_TOKEN || 
         process.env.GITHUB_TOKEN || 
         process.env.GITHUB_API_TOKEN || 
         '';
};

const createHeaders = () => {
  const token = getGitHubToken();
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Website'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  size: number;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  id: number;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
  firstDay: string;
}

export interface ContributionCalendar {
  totalContributions: number;
  colors: string[];
  weeks: ContributionWeek[];
}

export interface ContributionsData {
  contributionCalendar: ContributionCalendar;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&direction=desc&per_page=30`,
      { headers: createHeaders() }
    );
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      if (response.status === 404) {
        throw new Error(`GitHub user '${username}' not found`);
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and sort by stars + recent activity
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => {
        const aScore = a.stargazers_count * 2 + a.forks_count;
        const bScore = b.stargazers_count * 2 + b.forks_count;
        return bScore - aScore;
      });
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}`,
      { headers: createHeaders() }
    );
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      if (response.status === 404) {
        throw new Error(`GitHub user '${username}' not found`);
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
}

export async function fetchGitHubContributions(username: string): Promise<ContributionsData> {
  const token = getGitHubToken();
  
  if (!token) {
    throw new Error('GitHub token is required for GraphQL API');
  }
  
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            colors
            weeks {
              contributionDays {
                date
                contributionCount
                color
                weekday
              }
              firstDay
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      throw new Error(`GitHub GraphQL API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`User '${username}' not found or GraphQL errors occurred`);
    }
    
    if (!data.data || !data.data.user) {
      throw new Error(`GitHub user '${username}' not found`);
    }
    
    return data.data.user.contributionsCollection;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
}
