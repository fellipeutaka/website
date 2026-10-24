import "~/styles/mdx.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDXContent } from "~/components/mdx/mdx-content";
import { PostContent } from "~/components/mdx/post-content";
import { PostFooter } from "~/components/mdx/post-footer";
import { PostHeader } from "~/components/mdx/post-header";
import { siteConfig } from "~/config/site";
import { postsSource } from "~/lib/source";

export function generateStaticParams() {
  return postsSource.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = postsSource.getPage(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.data.title,
    description: post.data.description,
    alternates: {
      canonical: post.url,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: siteConfig.name,
      title: post.data.title,
      description: post.data.description ?? siteConfig.description,
      url: post.url,
      authors: [siteConfig.name],
      images: [
        {
          url: `/og/${post.slugs.map(encodeURIComponent).join("/")}`,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: post.data.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps<"/blog/[...slug]">) {
  const { slug } = await params;
  const post = postsSource.getPage(slug);

  if (!post) {
    notFound();
  }

  const { body, lastModified, toc } = post.data;

  return (
    <main className="container my-20">
      <PostHeader
        cover={post.data.cover}
        // oxlint-disable-next-line react/purity -- Server component computes the publication fallback at render time.
        date={lastModified ?? new Date()}
        title={post.data.title}
      />
      <PostContent toc={toc}>
        <MDXContent body={body} />
      </PostContent>
      <PostFooter filePath={post.path} modifiedAt={lastModified} />
    </main>
  );
}
