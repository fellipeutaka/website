import { type Locale, locales } from "@utaka/i18n/shared";
import { getPostBySlug, getPosts } from "@utaka/mdx/utils/fs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommentSection } from "~/components/blog/comment-section";
import { PostContent } from "~/components/blog/post-content";
import { PostFooter } from "~/components/blog/post-footer";
import { PostHeader } from "~/components/blog/post-header";

const filePath = (slug: string) => `apps/web/src/content/blog/${slug}.mdx`;

interface PageProps {
  params: {
    slug: string;
    locale: Locale;
  };
}

export function generateStaticParams() {
  return locales.map((locale) =>
    getPosts(locale).map((post) => ({
      slug: post.slug,
      locale,
    })),
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.locale, params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.metadata.title,
  };
}

export default function Page({ params }: PageProps) {
  const post = getPostBySlug(params.locale, params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container my-20">
      <PostHeader
        title={post.metadata.title}
        date={post.metadata.date}
        slug={params.slug}
      />
      <PostContent content={post.content} />
      <PostFooter filePath={filePath(params.slug)} />

      <CommentSection slug={params.slug} />
    </main>
  );
}
