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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projectsSource.generateParams().map(({ slug }) => slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsSource.getPage([slug]);

  if (!project) {
    notFound();
  }

  return {
    title: project.data.name,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = projectsSource.getPage([slug]);

  if (!project) {
    notFound();
  }

  const { body, toc } = await project.data.load();

  return (
    <main className="container my-20">
      <h1 className="mt-16 mb-4 text-balance text-center font-bold text-4xl md:text-5xl md:leading-[64px]">
        {project.data.name}
      </h1>
      <div className="mb-16 flex items-center justify-center gap-4">
        {project.data.previewUrl &&
          (project.data.previewUrl === siteConfig.url ? (
            <PreviewRecursiveButton />
          ) : (
            <LinkButton
              variant="outline"
              size="sm"
              className="rounded-full"
              href={project.data.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.Eye className="mr-2 size-4" />
              Preview
            </LinkButton>
          ))}
        <LinkButton
          className="rounded-full"
          size="sm"
          variant="secondary"
          href={project.data.sourceCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.GitHub className="mr-2 size-4" />
          Source code
        </LinkButton>
      </div>
      <PostContent toc={toc}>
        <MDXContent body={body} />
      </PostContent>
      <PostFooter filePath={project.file.path} />
    </main>
  );
}
