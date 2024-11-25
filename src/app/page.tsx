import { AboutSection } from "./_components/about-me";
import { BlogSection } from "./_components/blog-section";
import { ExperienceSection } from "./_components/experience-section";
import { FeaturedProjectsSection } from "./_components/featured-projects";
import { HeroSection } from "./_components/hero-section";

export default function Home() {
  return (
    <main className="space-y-20">
      <HeroSection />
      <FeaturedProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <BlogSection />
    </main>
  );
}
