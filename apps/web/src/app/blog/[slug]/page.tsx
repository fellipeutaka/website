import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostHeader } from "~/components/blog/post-header";
import { TableOfContents } from "~/components/blog/table-of-contents";
import { Mdx } from "~/components/mdx/mdx";
import { posts } from "~/content";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostFromParams(params.slug);

  return {
    title: post?.title,
  };
}

function getPostFromParams(slug: string) {
  return posts.find((p) => p.slugAsParams === slug);
}

export default function Page({ params }: PageProps) {
  const post = getPostFromParams(params.slug);

  if (!post) {
    notFound();
  }

  const toc = post.toc;

  return (
    <main className="container my-20">
      <PostHeader title={post.title} date={post.date} slug={post.slug} />
      <div className="mt-8 flex flex-col justify-between gap-16 lg:flex-row">
        <article>
          <Mdx code={post.body} />
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
