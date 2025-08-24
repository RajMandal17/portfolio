import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Resume from "@/components/resume";
import Skills from "@/components/skills";
import GitHub from "@/components/github";
import Contributions from "@/components/contributions";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Resume />
      <Skills />
      <GitHub />
      <Contributions />
      <Contact />
      <Footer />
    </div>
  );
}
