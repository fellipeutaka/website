import { useLocale } from "@utaka/i18n/utils/react";
import { getPosts } from "@utaka/mdx/utils/fs";
import { Suspense } from "react";
import {
  PostCardList,
  PostCardListSkeleton,
} from "~/components/blog/post-card-list";

export default function Page() {
  const locale = useLocale();
  const posts = getPosts(locale).sort((a, b) => {
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
