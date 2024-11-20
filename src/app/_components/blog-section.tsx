import * as m from "framer-motion/m";
import { LinkButton } from "~/components/ui/button";
import { getPosts } from "~/utils/mdx";
import { PostCard } from "../blog/_components/post-card";

export async function BlogSection() {
  const posts = (await getPosts()).slice(0, 2);

  return (
    <m.section
      animate={{
        y: 40,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
    >
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">Latest posts</h2>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <LinkButton
        className="mx-auto my-8 flex w-max"
        variant="outline"
        href="/blog"
      >
        See all posts
      </LinkButton>
    </m.section>
  );
}
