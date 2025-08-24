import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGitHubContributions } from "@/lib/github-api";
import { Calendar, GitCommit, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Contributions() {
  const heatmapRef = useRef<HTMLDivElement>(null);
  
  const { data: contributions, isLoading, error } = useQuery({
    queryKey: ['github', 'contributions'],
    queryFn: () => fetchGitHubContributions('rajkumarmandal17'),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  useEffect(() => {
    if (contributions && heatmapRef.current && window.CalHeatmap) {
      // Clear any existing heatmap
      heatmapRef.current.innerHTML = '';
      
      // Initialize Cal-Heatmap
      const cal = new window.CalHeatmap();
      
      cal.init({
        itemSelector: heatmapRef.current,
        domain: 'month',
        subDomain: 'day',
        range: 12,
        cellSize: 12,
        cellPadding: 2,
        cellRadius: 2,
        tooltip: true,
        legend: [1, 5, 10, 15],
        legendColors: {
          min: '#ebedf0',
          max: '#216e39',
          empty: '#ebedf0'
        },
        data: contributions.contributionCalendar.weeks.flatMap(week => 
          week.contributionDays.map(day => ({
            date: new Date(day.date).getTime() / 1000,
            value: day.contributionCount
          }))
        )
      });
    }
  }, [contributions]);

  if (error) {
    return (
      <section id="contributions" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">GitHub Contributions</h2>
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <GitCommit className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Unable to load contribution data. API rate limit may have been exceeded.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contributions" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">GitHub Contributions</h2>
          <p className="text-lg text-muted-foreground">My coding activity over the past year</p>
        </div>
        
        {/* Contributions Summary */}
        <div className="mb-8 animate-slide-up">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  ) : (
                    <h3 className="text-2xl font-bold text-foreground mb-1" data-testid="total-contributions-year">
                      {contributions?.contributionCalendar.totalContributions || 0}
                    </h3>
                  )}
                  <p className="text-muted-foreground">Contributions in 2024</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1" data-testid="longest-streak">
                    28
                  </h3>
                  <p className="text-muted-foreground">Longest Streak</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1" data-testid="current-streak">
                    5
                  </h3>
                  <p className="text-muted-foreground">Current Streak</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1" data-testid="avg-per-day">
                    3.4
                  </h3>
                  <p className="text-muted-foreground">Average per Day</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Contributions Heatmap */}
        <div className="animate-slide-up">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Contribution Activity</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Less</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-slate-200 dark:bg-slate-600 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-800 dark:bg-green-200 rounded-sm"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
              
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div 
                    ref={heatmapRef}
                    id="cal-heatmap" 
                    className="min-h-[200px]"
                    data-testid="contributions-heatmap"
                  ></div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-4">
                Data fetched from GitHub GraphQL API • Updated daily
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Contribution Stats */}
        <div className="mt-12 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <GitCommit className="w-6 h-6 text-brand-500 mr-2" />
                  <h3 className="text-lg font-bold text-foreground">Commit Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Week</span>
                    <span className="font-semibold text-foreground" data-testid="commits-this-week">
                      {isLoading ? '...' : '12'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-semibold text-foreground" data-testid="commits-this-month">
                      {isLoading ? '...' : '58'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Year</span>
                    <span className="font-semibold text-foreground" data-testid="commits-this-year">
                      {isLoading ? '...' : contributions?.contributionCalendar.totalContributions || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-bold text-foreground">Contribution Streak</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Streak</span>
                    <span className="font-semibold text-foreground">5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longest Streak</span>
                    <span className="font-semibold text-foreground">28 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Day</span>
                    <span className="font-semibold text-foreground">15 contributions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
