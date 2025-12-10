import "~/styles/mdx.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "~/components/mdx/mdx-content";
import { PostContent } from "~/components/mdx/post-content";
import { PostFooter } from "~/components/mdx/post-footer";
import { LinkButton } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { siteConfig } from "~/config/site";
import { projectsSource } from "~/lib/source";
import { PreviewRecursiveButton } from "../_components/preview-recursive-button";

export function generateStaticParams() {
  return projectsSource.generateParams().map(({ slug }) => slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsSource.getPage([slug]);

  if (!project) {
    notFound();
  }

  return {
    title: project.data.name,
  };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;

  const project = projectsSource.getPage([slug]);

  if (!project) {
    notFound();
  }

  const { body, toc, lastModified } = project.data;

  return (
    <main className="container my-20">
      <h1 className="mt-16 mb-4 text-balance text-center font-bold text-4xl md:text-5xl md:leading-16">
        {project.data.name}
      </h1>
      <div className="mb-16 flex items-center justify-center gap-4">
        {project.data.previewUrl &&
          (project.data.previewUrl === siteConfig.url ? (
            <PreviewRecursiveButton />
          ) : (
            <LinkButton
              className="rounded-full"
              href={project.data.previewUrl}
              rel="noopener noreferrer"
              size="sm"
              target="_blank"
              variant="outline"
            >
              <Icons.Eye className="mr-2 size-4" />
              Preview
            </LinkButton>
          ))}
        <LinkButton
          className="rounded-full"
          href={project.data.sourceCodeUrl}
          rel="noopener noreferrer"
          size="sm"
          target="_blank"
          variant="secondary"
        >
          <Icons.GitHub className="mr-2 size-4" />
          Source code
        </LinkButton>
      </div>
      <PostContent toc={toc}>
        <MDXContent body={body} />
      </PostContent>
      <PostFooter filePath={project.path} modifiedAt={lastModified} />
    </main>
  );
}
