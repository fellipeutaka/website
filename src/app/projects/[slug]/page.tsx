import "~/styles/mdx.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "~/components/mdx/post-content";
import { PostFooter } from "~/components/mdx/post-footer";
import { LinkButton } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { siteConfig } from "~/config/site";
import { getItemIds } from "~/utils/get-item-ids";
import { getProjectBySlug, getProjects } from "~/utils/mdx";
import { PreviewRecursiveButton } from "../_components/preview-recursive-button";

const filePath = (slug: string) => `src/content/projects/${slug}.mdx`;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.name,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const itemIds = getItemIds(project.toc);

  return (
    <main className="container my-20">
      <h1 className="mt-16 mb-4 text-balance text-center font-bold text-4xl md:text-5xl md:leading-[64px]">
        {project.name}
      </h1>
      <div className="mb-16 flex items-center justify-center gap-4">
        {project.previewUrl &&
          (project.previewUrl === siteConfig.url ? (
            <PreviewRecursiveButton />
          ) : (
            <LinkButton
              variant="outline"
              size="sm"
              className="rounded-full"
              href={project.previewUrl}
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
          href={project.sourceCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.GitHub className="mr-2 size-4" />
          Source code
        </LinkButton>
      </div>
      <PostContent
        itemIds={itemIds}
        toc={project.toc}
        content={project.content}
      />
      <PostFooter filePath={filePath(slug)} />
    </main>
  );
}
