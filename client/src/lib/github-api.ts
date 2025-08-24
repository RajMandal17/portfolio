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
  const token = getGitHubToken();
  console.log('GitHub Token exists:', !!token);
  
  try {
    const headers = createHeaders();
    console.log('Request headers:', headers);
    
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&direction=desc&per_page=30`,
      { headers }
    );
    
    console.log('GitHub API Response status:', response.status);
    console.log('GitHub API Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error Response:', errorText);
      
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    console.log('Successfully fetched', repos.length, 'repositories');
    
    // Filter out forks and sort by stars + recent activity
    return repos
      .filter(repo => !repo.fork) // Use proper fork property
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
  const token = getGitHubToken();
  console.log('Fetching user data with token:', !!token);
  
  try {
    const headers = createHeaders();
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}`,
      { headers }
    );
    
    console.log('User API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('User API Error Response:', errorText);
      
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
    }
    
    const userData = await response.json();
    console.log('Successfully fetched user data for:', userData.login);
    return userData;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
}

export async function fetchGitHubContributions(username: string): Promise<ContributionsData> {
  const token = getGitHubToken();
  console.log('Fetching contributions with token:', !!token);
  
  if (!token) {
    console.error('No GitHub token available for GraphQL API');
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
    
    console.log('Contributions API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Contributions API Error Response:', errorText);
      
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      throw new Error(`GitHub GraphQL API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('GraphQL Response:', data);
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(`GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')}`);
    }
    
    if (!data.data || !data.data.user) {
      throw new Error('No user data found in GraphQL response');
    }
    
    console.log('Successfully fetched contributions data');
    return data.data.user.contributionsCollection;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
}
