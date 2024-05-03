import { type Locale, locales } from "@utaka/i18n/shared";
import { getProjectBySlug, getProjects } from "@utaka/mdx/utils/fs";
import { ButtonStyles } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "~/components/blog/post-content";
import { PostFooter } from "~/components/blog/post-footer";

const filePath = (slug: string) => `apps/web/src/content/projects/${slug}.mdx`;

interface PageProps {
  params: {
    slug: string;
    locale: Locale;
  };
}

export function generateStaticParams() {
  return locales.map((locale) =>
    getProjects(locale).map((project) => ({
      slug: project.slug,
      locale,
    })),
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getProjectBySlug(params.locale, params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.metadata.name,
  };
}

export default function Page({ params }: PageProps) {
  const project = getProjectBySlug(params.locale, params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="container my-20">
      <h1 className="mt-16 mb-4 text-balance text-center font-bold text-4xl md:text-5xl md:leading-[64px]">
        {project.metadata.name}
      </h1>
      <div className="mb-16 flex items-center justify-center gap-4">
        {project.metadata.previewUrl && (
          <a
            href={project.metadata.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ButtonStyles({
              variant: "outline",
              class: "rounded-full",
              size: "sm",
            })}
          >
            <Icons.Eye className="mr-2 size-4" />
            Preview
          </a>
        )}
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
