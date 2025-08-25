import { Button } from "@/components/ui/button";
import TypingAnimation from "@/components/typing-animation";
import { Download, Mail, User } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // In a real implementation, this would download the actual PDF resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be the actual resume PDF path
    link.download = 'Rajkumar_Mandal_Resume.pdf';
    link.click();
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Professional Photo */}
          <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-2xl overflow-hidden">
            <img
              src={import.meta.env.BASE_URL + "rajPic.jpeg"}
              alt="Rajkumar Mandal profile photo"
              className="object-cover w-full h-full"
              data-testid="profile-photo"
              onError={e => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = 'https://drive.google.com/uc?export=view&id=1b2ABqLuhh9b4p9Tu7Pw5ovygtiDWuKvj';
              }}
            />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Rajkumar Mandal
          </h1>
          
          {/* Animated Typing Effect */}
          <div className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 mb-8 h-16 flex items-center justify-center">
            <TypingAnimation 
              texts={[
                'Java Backend Developer',
                'Microservices Architect', 
                'Spring Boot Expert',
                'Apache Kafka Specialist'
              ]}
              className="border-r-2 border-brand-500"
              data-testid="typing-animation"
            />
          </div>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
            Passionate backend developer with expertise in building scalable microservices architectures. 
            Experienced in Spring Boot, Apache Kafka, and cloud-native technologies with a focus on high-performance systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid="get-in-touch-button"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button
              onClick={downloadResume}
              variant="outline"
              className="border-slate-300 dark:border-slate-600 hover:border-brand-500 dark:hover:border-brand-400 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid="download-resume-button"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
