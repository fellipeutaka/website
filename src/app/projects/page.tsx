import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjects } from "~/utils/mdx";
import { ProjectList, ProjectListSkeleton } from "./_components/project-list";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects that I have worked on.",
};

export default async function Page() {
  const projects = await getProjects();

  return (
    <main className="container my-20">
      <h1 className="animate-fade-up font-semibold text-2xl md:text-3xl">
        Projects
      </h1>
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList projects={projects} />
      </Suspense>
    </main>
  );
}
