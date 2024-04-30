import { getProjects } from "@utaka/mdx/utils/fs";
import { ProjectList } from "~/components/projects/project-list";

export default function Page() {
  const projects = getProjects();

  return (
    <main className="container my-20">
      <h1 className="animate-fade-up font-semibold text-2xl md:text-3xl">
        Projects
      </h1>
      <ProjectList projects={projects} />
    </main>
  );
}
