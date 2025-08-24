import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGitHubRepos, fetchGitHubUser } from "@/lib/github-api";
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Code, 
  Calendar,
  Users
} from "lucide-react";

export default function GitHub() {
  const { data: repos, isLoading: reposLoading, error: reposError } = useQuery({
    queryKey: ['github', 'repos'],
    queryFn: () => fetchGitHubRepos('rajkumarmandal17'),
    staleTime: 1000 * 60 * 2, // 2 minutes - more frequent updates
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch on component mount
    refetchInterval: 1000 * 60 * 5, // Auto-refetch every 5 minutes
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['github', 'user'],
    queryFn: () => fetchGitHubUser('rajkumarmandal17'),
    staleTime: 1000 * 60 * 2, // 2 minutes - more frequent updates
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch on component mount
    refetchInterval: 1000 * 60 * 10, // Auto-refetch every 10 minutes
  });

  const featuredRepos = repos?.slice(0, 6) || [];

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Java': 'bg-orange-500',
      'C++': 'bg-red-500',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-600',
      'PHP': 'bg-purple-500',
    };
    return colors[language] || 'bg-gray-500';
  };

  if (reposError) {
    return (
      <section id="github" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">GitHub Projects</h2>
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <Github className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Unable to load GitHub data. Please check your internet connection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">GitHub Projects</h2>
          <p className="text-lg text-muted-foreground">Featured repositories and open source contributions</p>
        </div>
        
        {/* GitHub Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <Code className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              {userLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <h3 className="text-3xl font-bold text-foreground mb-2" data-testid="total-commits">
                  {user?.public_repos || 0}
                </h3>
              )}
              <p className="text-muted-foreground">Public Repositories</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-800 dark:to-slate-700 border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              {reposLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <h3 className="text-3xl font-bold text-foreground mb-2" data-testid="total-stars">
                  {repos?.reduce((total, repo) => total + repo.stargazers_count, 0) || 0}
                </h3>
              )}
              <p className="text-muted-foreground">GitHub Stars</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-slate-800 dark:to-slate-700 border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              {userLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <h3 className="text-3xl font-bold text-foreground mb-2" data-testid="total-followers">
                  {user?.followers || 0}
                </h3>
              )}
              <p className="text-muted-foreground">Followers</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Featured Repositories */}
        <div className="animate-slide-up">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Featured Repositories</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {reposLoading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="border-border shadow-lg">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : featuredRepos.length > 0 ? (
              featuredRepos.map((repo) => (
                <Card 
                  key={repo.id} 
                  className="border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  data-testid={`repo-card-${repo.name}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-foreground mb-2 flex items-center">
                          <Github className="w-5 h-5 mr-2" />
                          {repo.name}
                        </CardTitle>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {repo.description || "No description available"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-muted-foreground hover:text-brand-500"
                        data-testid={`repo-link-${repo.name}`}
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {repo.language && (
                          <span className="flex items-center">
                            <span className={`w-3 h-3 rounded-full mr-2 ${getLanguageColor(repo.language)}`}></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center" data-testid={`repo-stars-${repo.name}`}>
                          <Star className="w-4 h-4 mr-1" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center" data-testid={`repo-forks-${repo.name}`}>
                          <GitFork className="w-4 h-4 mr-1" />
                          {repo.forks_count}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <Github className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No repositories found.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 shadow-lg hover:shadow-xl transition-all duration-300"
            data-testid="view-all-repos-button"
          >
            <a
              href="https://github.com/rajkumarmandal17"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View All Repositories
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
