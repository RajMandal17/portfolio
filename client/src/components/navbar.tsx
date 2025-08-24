import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { fetchGitHubRepos } from "@/lib/github-api";
import { Moon, Sun, Menu, ChevronDown, ExternalLink, Github } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const { data: repos, isLoading } = useQuery({
    queryKey: ['github', 'repos'],
    queryFn: () => fetchGitHubRepos('rajkumarmandal17'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: "home", label: "Home" },
    { href: "resume", label: "Resume" },
    { href: "skills", label: "Skills" },
    { href: "contributions", label: "Contributions" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 dark:bg-background/95 backdrop-blur-sm border-b border-border shadow-sm' 
        : 'bg-background/80 dark:bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            data-testid="logo-button"
          >
            Rajkumar Mandal
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                data-testid={`nav-link-${link.href}`}
              >
                {link.label}
              </button>
            ))}
            
            {/* GitHub Repositories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400"
                  data-testid="github-dropdown-trigger"
                >
                  GitHub
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" data-testid="github-dropdown-content">
                {isLoading ? (
                  <DropdownMenuItem disabled>Loading repositories...</DropdownMenuItem>
                ) : repos?.length ? (
                  <>
                    {repos.slice(0, 10).map((repo) => (
                      <DropdownMenuItem key={repo.id} asChild>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full"
                          data-testid={`repo-link-${repo.name}`}
                        >
                          <span className="truncate">{repo.name}</span>
                          <ExternalLink className="h-3 w-3 ml-2 flex-shrink-0" />
                        </a>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a
                        href="https://github.com/rajkumarmandal17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-brand-600 dark:text-brand-400"
                        data-testid="view-all-repos-link"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View All Repositories
                      </a>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem disabled>Failed to load repositories</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400"
              data-testid="theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground"
              data-testid="mobile-theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  data-testid="mobile-menu-trigger"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" data-testid="mobile-menu-content">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      data-testid={`mobile-nav-link-${link.href}`}
                    >
                      {link.label}
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">GitHub Repositories</h4>
                    {isLoading ? (
                      <p className="text-sm text-muted-foreground">Loading...</p>
                    ) : repos?.length ? (
                      <div className="space-y-2">
                        {repos.slice(0, 5).map((repo) => (
                          <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                            data-testid={`mobile-repo-link-${repo.name}`}
                          >
                            {repo.name}
                          </a>
                        ))}
                        <a
                          href="https://github.com/rajkumarmandal17"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-600 dark:text-brand-400 font-medium"
                          data-testid="mobile-view-all-repos"
                        >
                          View All →
                        </a>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Unable to load</p>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
