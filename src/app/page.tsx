import { BlogSection } from "~/components/home/blog-section";
import { ExperienceSection } from "~/components/home/experience-section";
import { FeaturedProjectsSection } from "~/components/home/featured-projects";
import { HeroSection } from "~/components/home/hero-section";

export default function Page() {
  return (
    <main className="container max-w-6xl [&>*:not(:first-child)]:my-20">
      <HeroSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <BlogSection />
    </main>
  );
}
