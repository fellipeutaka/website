import "~/styles/mdx.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "~/components/mdx/post-content";
import { PostFooter } from "~/components/mdx/post-footer";
import { PostHeader } from "~/components/mdx/post-header";
import { getItemIds } from "~/utils/get-item-ids";
import { getPostBySlug, getPosts } from "~/utils/mdx";

const filePath = (slug: string) => `src/content/${slug}/index.mdx`;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const itemIds = getItemIds(post.toc);

  return (
    <main className="container my-20">
      <PostHeader
        title={post.title}
        date={new Date(post.date)}
        cover={post.cover}
      />
      <PostContent itemIds={itemIds} toc={post.toc} content={post.content} />
      <PostFooter filePath={filePath(post.slug)} />
    </main>
  );
}
