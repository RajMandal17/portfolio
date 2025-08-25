import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { href: "home", label: "Home" },
    { href: "resume", label: "Resume" },
    { href: "skills", label: "Skills" },
    { href: "contributions", label: "Contributions" },
    { href: "contact", label: "Contact" },
  ];

  const technologies = [
    "Java & Spring Boot",
    "Apache Kafka",
    "Microservices",
    "Docker & Kubernetes",
    "AWS Cloud",
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Rajkumar Mandal</h3>
            <p className="text-slate-400 mb-4">
              Java Backend Developer specializing in microservices and distributed systems. 
              Passionate about building scalable, high-performance applications.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="footer-github"
              >
                <a
                  href="https://https://github.com/RajMandal17"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="footer-linkedin"
              >
                <a
                  href="https://linkedin.com/in/rajkumarmandal17"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="footer-email"
              >
                <a href="mailto:Rajmandal14792@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                    data-testid={`footer-link-${link.href}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Technologies</h3>
            <ul className="space-y-2">
              {technologies.map((tech) => (
                <li key={tech} className="text-slate-400">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-center md:text-left">
              &copy; 2024 Rajkumar Mandal. All rights reserved.
            </p>
            <div className="flex items-center text-slate-400 mt-4 md:mt-0">
              <span>Built with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
