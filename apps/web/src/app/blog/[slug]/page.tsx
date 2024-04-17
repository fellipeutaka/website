import { getTOC } from "@utaka/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostHeader } from "~/components/blog/post-header";
import { TableOfContents } from "~/components/blog/table-of-contents";
import { Mdx } from "~/components/mdx/mdx";
import { getPostBySlug, getPosts } from "~/lib/mdx";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({
    params: {
      slug,
    },
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

export default async function Page({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const toc = await getTOC(post.content);

  return (
    <main className="container my-20">
      <PostHeader
        title={post.metadata.title}
        date={post.metadata.date}
        slug={post.metadata.slug}
      />
      <div className="mt-8 flex flex-col justify-between gap-16 lg:flex-row">
        <article>
          <Mdx code={post.content} />
        </article>
        <aside className="lg:min-w-72">
          <div className="sticky top-24 will-change-[transform,opacity]">
            {toc && toc.length > 0 && <TableOfContents toc={toc} />}
          </div>
        </aside>
      </div>
    </main>
  );
}
