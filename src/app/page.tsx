import { FeaturedProjects } from "~/components/home/featured-projects";
import { Hero } from "~/components/home/hero";

export default function Page() {
  return (
    <>
      <Hero />
      <main className="container my-20 max-w-6xl animate-delay-700 animate-fade-up">
        <h2 className="mb-10 font-semibold text-2xl md:text-3xl">
          Featured projects
        </h2>
        <FeaturedProjects />
      </main>
    </>
  );
}
