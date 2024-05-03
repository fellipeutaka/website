import { getPosts } from "@utaka/mdx/utils/fs";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  PostCardList,
  PostCardListSkeleton,
} from "~/components/blog/post-card-list";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "A collection of blog posts about software development, web development, and other topics.",
};

export default function Page() {
  const posts = getPosts().sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return (
    <main className="container my-20">
      <h1 className="animate-fade-up font-semibold text-2xl md:text-3xl">
        Blog
      </h1>

      <Suspense fallback={<PostCardListSkeleton />}>
        <PostCardList posts={posts} />
      </Suspense>
    </main>
  );
}
