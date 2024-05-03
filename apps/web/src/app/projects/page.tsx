import { getProjects } from "@utaka/mdx/utils/fs";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ProjectList,
  ProjectListSkeleton,
} from "~/components/projects/project-list";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects that I have worked on.",
};

export default function Page() {
  const projects = getProjects();

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
