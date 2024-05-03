import { useLocale } from "@utaka/i18n/utils/react";
import { getProjects } from "@utaka/mdx/utils/fs";
import { Suspense } from "react";
import {
  ProjectList,
  ProjectListSkeleton,
} from "~/components/projects/project-list";

export default function Page() {
  const locale = useLocale();
  const projects = getProjects(locale);

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
