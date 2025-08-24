import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { skillsData } from "@/data/skills-data";
import { Code, Database, Cloud, Gavel } from "lucide-react";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming':
        return <Code className="h-6 w-6" />;
      case 'databases':
        return <Database className="h-6 w-6" />;
      case 'cloud':
        return <Cloud className="h-6 w-6" />;
      default:
        return <Gavel className="h-6 w-6" />;
    }
  };

  const getIconColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming':
        return 'text-orange-500';
      case 'databases':
        return 'text-blue-500';
      case 'cloud':
        return 'text-green-500';
      case 'frameworks':
        return 'text-purple-500';
      case 'tools':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground">Technologies and tools I work with</p>
        </div>
        
        {/* Skill Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-brand-500 text-white'
                  : 'bg-background text-muted-foreground hover:bg-brand-50 dark:hover:bg-brand-950'
              }`}
              data-testid="filter-all"
            >
              All Skills
            </button>
            {skillsData.categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-brand-500 text-white'
                    : 'bg-background text-muted-foreground hover:bg-brand-50 dark:hover:bg-brand-950'
                }`}
                data-testid={`filter-${category.name.toLowerCase()}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
          {skillsData.categories
            .filter(category => !selectedCategory || category.name === selectedCategory)
            .flatMap(category => 
              category.skills.map(skill => ({ ...skill, category: category.name }))
            )
            .map((skill, index) => (
              <Card 
                key={`${skill.category}-${skill.name}-${index}`} 
                className="group border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className={`${getIconColor(skill.category)} group-hover:scale-110 transition-transform`}>
                      {skill.icon ? (
                        <i className={`${skill.icon} text-3xl`} />
                      ) : (
                        getIcon(skill.category)
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{skill.name}</h4>
                  <div className="space-y-2">
                    <Progress 
                      value={skill.proficiency} 
                      className="h-2" 
                      data-testid={`skill-progress-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{skill.proficiency}%</span>
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                        data-testid={`skill-category-${skill.category.toLowerCase()}`}
                      >
                        {skill.category}
                      </Badge>
                    </div>
                  </div>
                  {skill.yearsOfExperience && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {skill.yearsOfExperience} years experience
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center animate-slide-up">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Skills Summary</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-brand-500 mb-2">
                    {skillsData.categories.reduce((total, cat) => total + cat.skills.length, 0)}+
                  </div>
                  <p className="text-muted-foreground">Technical Skills</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-500 mb-2">5+</div>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-500 mb-2">
                    {skillsData.categories.length}
                  </div>
                  <p className="text-muted-foreground">Skill Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
