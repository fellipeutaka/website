import type { Metadata } from "next";
import { Suspense } from "react";
import { postsSource } from "~/lib/source";
import { stripNonSerializable } from "~/utils/strip-non-serializable";
import {
  PostCardList,
  PostCardListSkeleton,
} from "./_components/post-card-list";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "A collection of blog posts about software development, web development, and other topics.",
};

export default function Page() {
  const posts = stripNonSerializable(postsSource.getPages());

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
