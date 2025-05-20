import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import ScrollProgress from "./components/ui/ScrollProgress"
import Navbar from "./components/Navbar/Navbar"
import MagneticCursor from "./components/ui/MagneticCursor"


export default function Home() {
  return (
    <>
    <Navbar />
      <ScrollProgress />
      <MagneticCursor />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}