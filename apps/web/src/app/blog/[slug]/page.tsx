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
  };
}

export function generateStaticParams() {
  return getPosts().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.metadata.title,
  };
}

export default function Page({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

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
