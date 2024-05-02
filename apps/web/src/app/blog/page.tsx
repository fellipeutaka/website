import { getPosts } from "@utaka/mdx/utils/fs";
import { Suspense } from "react";
import {
  PostCardList,
  PostCardListSkeleton,
} from "~/components/blog/post-card-list";

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
