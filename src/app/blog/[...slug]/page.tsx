import "~/styles/mdx.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "~/components/mdx/mdx-content";
import { PostContent } from "~/components/mdx/post-content";
import { PostFooter } from "~/components/mdx/post-footer";
import { PostHeader } from "~/components/mdx/post-header";
import { postsSource } from "~/lib/source";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export function generateStaticParams() {
  return postsSource.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = postsSource.getPage(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.data.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = postsSource.getPage(slug);

  if (!post) {
    notFound();
  }

  const { body, lastModified, toc } = post.data;

  return (
    <main className="container my-20">
      <PostHeader
        title={post.data.title}
        date={new Date(lastModified ?? new Date())}
        cover={post.data.cover}
      />
      <PostContent toc={toc}>
        <MDXContent body={body} />
      </PostContent>
      <PostFooter filePath={post.file.path} />
    </main>
  );
}
