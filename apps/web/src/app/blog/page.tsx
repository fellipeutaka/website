import { getPosts } from "@utaka/mdx/utils/fs";
import { PostCard } from "~/components/blog/post-card";

export default function Page() {
  const posts = getPosts().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <main className="container my-20 animate-fade-up">
      <h1 className="font-semibold text-2xl md:text-3xl">Blog</h1>
      <section className="mt-10 grid w-full gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
