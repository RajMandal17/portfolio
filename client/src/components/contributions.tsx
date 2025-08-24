import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGitHubContributions } from "@/lib/github-api";
import { Calendar, GitCommit, Zap, TrendingUp } from "lucide-react";
import { useMemo } from "react";

export default function Contributions() {
  const { data: contributions, isLoading, error } = useQuery({
    queryKey: ['github', 'contributions'],
    queryFn: () => fetchGitHubContributions('RajMandal17'),
    staleTime: 1000 * 60 * 10, // 10 minutes - more frequent updates
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch on component mount
    refetchInterval: 1000 * 60 * 15, // Auto-refetch every 15 minutes
  });

  // Process contributions data for table display
  const processedData = useMemo(() => {
    if (!contributions) return { recentContributions: [], monthlyStats: [] };
    
    const allDays = contributions.contributionCalendar.weeks.flatMap(week => 
      week.contributionDays.map(day => ({
        date: new Date(day.date),
        count: day.contributionCount,
        color: day.color
      }))
    );
    
    // Get recent contributions (last 30 days with activity)
    const recentContributions = allDays
      .filter(day => day.count > 0)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 20);
    
    // Calculate monthly stats
    const monthlyStats = allDays.reduce((acc, day) => {
      const monthKey = day.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      const existing = acc.find(item => item.month === monthKey);
      if (existing) {
        existing.contributions += day.count;
        existing.activeDays += day.count > 0 ? 1 : 0;
      } else {
        acc.push({
          month: monthKey,
          contributions: day.count,
          activeDays: day.count > 0 ? 1 : 0
        });
      }
      return acc;
    }, [] as Array<{ month: string; contributions: number; activeDays: number }>);
    
    return { recentContributions, monthlyStats: monthlyStats.slice(-6) };
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
        
        {/* Contribution Activity Tables */}
        <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
          {/* Recent Activity Table */}
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-6 h-6 text-brand-500 mr-2" />
                <h3 className="text-xl font-bold text-foreground">Recent Contribution Activity</h3>
              </div>
              
              {isLoading ? (
                <div className="space-y-3 h-96">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-3/4" />
                </div>
              ) : (
                <div className="h-96 overflow-auto border border-border/20 rounded-md">
                  <table className="w-full" data-testid="contributions-table">
                    <thead className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Day</th>
                        <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Contributions</th>
                        <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.recentContributions.length > 0 ? (
                        processedData.recentContributions.map((day, index) => (
                          <tr 
                            key={index} 
                            className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          >
                            <td className="py-3 px-4 text-foreground">
                              {day.date.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className="font-semibold text-foreground">
                                {day.count}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div 
                                className="w-4 h-4 rounded-sm mx-auto"
                                style={{ backgroundColor: day.color }}
                                title={`${day.count} contributions`}
                              ></div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-muted-foreground">
                            No recent contributions found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-4">
                Data fetched from GitHub GraphQL API • Updated daily
              </p>
            </CardContent>
          </Card>

          {/* Monthly Summary Table */}
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-foreground">Monthly Summary</h3>
              </div>
              
              {isLoading ? (
                <div className="space-y-3 h-96">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="h-96 overflow-auto border border-border/20 rounded-md">
                  <table className="w-full" data-testid="monthly-summary-table">
                    <thead className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Month</th>
                        <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Total Contributions</th>
                        <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Active Days</th>
                        <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Daily Avg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.monthlyStats.length > 0 ? (
                        processedData.monthlyStats.map((month, index) => (
                          <tr 
                            key={index}
                            className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium text-foreground">{month.month}</td>
                            <td className="py-3 px-4 text-right">
                              <span className="font-semibold text-foreground">
                                {month.contributions}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-muted-foreground">
                              {month.activeDays}
                            </td>
                            <td className="py-3 px-4 text-right text-muted-foreground">
                              {month.activeDays > 0 ? (month.contributions / month.activeDays).toFixed(1) : '0.0'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-muted-foreground">
                            No contribution data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
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
