import type { Metadata } from "next";
import { Suspense } from "react";
import { projectsSource } from "~/lib/source";
import { stripNonSerializable } from "~/utils/strip-non-serializable";
import { ProjectList, ProjectListSkeleton } from "./_components/project-list";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects that I have worked on.",
};

export default function Page() {
  const projects = stripNonSerializable(projectsSource.getPages());

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
