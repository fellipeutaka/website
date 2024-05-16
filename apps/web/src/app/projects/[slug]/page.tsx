import { getProjectBySlug, getProjects } from "@utaka/mdx/utils/fs";
import { Button, ButtonStyles } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "~/components/blog/post-content";
import { PostFooter } from "~/components/blog/post-footer";
import { PreviewRecursiveButton } from "~/components/projects/preview-recursive-button";
import { siteConfig } from "~/config/site";

const filePath = (slug: string) => `apps/web/src/content/projects/${slug}.mdx`;

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getProjects().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getProjectBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.metadata.name,
  };
}

export default function Page({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="container my-20">
      <h1 className="mt-16 mb-4 text-balance text-center font-bold text-4xl md:text-5xl md:leading-[64px]">
        {project.metadata.name}
      </h1>
      <div className="mb-16 flex items-center justify-center gap-4">
        {project.metadata.previewUrl &&
          (project.metadata.previewUrl === siteConfig.url ? (
            <PreviewRecursiveButton />
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              asChild
            >
              <a
                href={project.metadata.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.Eye className="mr-2 size-4" />
                Preview
              </a>
            </Button>
          ))}
        <a
          href={project.metadata.sourceCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={ButtonStyles({
            class: "rounded-full",
            size: "sm",
            variant: "secondary",
          })}
        >
          <Icons.GitHub className="mr-2 size-4" />
          Source code
        </a>
      </div>
      <PostContent content={project.content} />
      <PostFooter filePath={filePath(params.slug)} />
    </main>
  );
}
