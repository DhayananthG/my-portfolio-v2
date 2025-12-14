import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/ui/Navbar";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden bg-background">
        <Navbar />
        <Hero />
        <About />
        
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="experience"><Experience /></div>
        <div id="contact"><Contact /></div>
        
        <Footer />
    </main>
  );
}
