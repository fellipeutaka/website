import * as m from "motion/react-m";
import { LinkButton } from "~/components/ui/button";
import { mapSourceData, postsSource } from "~/lib/source";
import { PostCard } from "../blog/_components/post-card";

export function BlogSection() {
  const posts = postsSource
    .getPages()
    .slice(0, 2)
    .map((post) => ({
      ...post,
      data: mapSourceData(post.data),
    }));

  return (
    <m.section
      animate={{
        y: 40,
        opacity: 0,
      }}
      className="container max-w-6xl"
      whileInView={{
        y: 0,
        opacity: 1,
      }}
    >
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">Latest posts</h2>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.url} post={post} />
        ))}
      </div>

      <LinkButton
        className="mx-auto my-8 flex w-max"
        href="/blog"
        variant="outline"
      >
        See all posts
      </LinkButton>
    </m.section>
  );
}
