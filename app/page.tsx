import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgress from "@/components/ScrollProgress"
import Footer from "@/components/Footer"


export default function Home() {
  return (
    <>
    {/* <NavbarDemo /> */}
      <ScrollProgress />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    <Footer/>
    </>
  );
}