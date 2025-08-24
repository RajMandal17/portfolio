import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/data/resume-data";
import { ChevronRight, Calendar, MapPin } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">Resume</h2>
          <p className="text-lg text-muted-foreground">My professional journey and experience</p>
        </div>
        
        {/* Professional Summary */}
        <div className="mb-16 animate-slide-up">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                {resumeData.summary}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Work Experience Timeline */}
        <div className="mb-16 animate-slide-up">
          <h3 className="text-2xl font-bold text-foreground mb-8">Work Experience</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-500"></div>
            
            {resumeData.experience.map((job, index) => (
              <div key={index} className="relative pl-12 pb-12" data-testid={`job-${index}`}>
                <div className="absolute left-0 top-2 w-8 h-8 bg-brand-500 rounded-full border-4 border-background shadow-lg"></div>
                <Card className="border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h4 className="text-xl font-bold text-foreground">{job.title}</h4>
                      <Badge variant="secondary" className="bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                        <Calendar className="w-3 h-3 mr-1" />
                        {job.period}
                      </Badge>
                    </div>
                    <div className="flex items-center text-lg text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.company}
                    </div>
                    <ul className="text-muted-foreground space-y-2">
                      {job.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-brand-500 mr-2 mt-1 flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                    {job.technologies && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education */}
        <div className="animate-slide-up">
          <h3 className="text-2xl font-bold text-foreground mb-8">Education</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {resumeData.education.map((edu, index) => (
              <Card key={index} className="border-border shadow-lg" data-testid={`education-${index}`}>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">{edu.degree}</h4>
                  <p className="text-brand-600 dark:text-brand-400 font-semibold mb-2">{edu.field}</p>
                  <p className="text-muted-foreground mb-2">{edu.institution}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{edu.period}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
