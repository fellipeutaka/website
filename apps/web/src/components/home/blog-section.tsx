import { Button } from "@utaka/ui/button";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { getPostsWithViews } from "~/utils/posts";
import { PostCard } from "../blog/post-card";

export async function BlogSection() {
  const posts = (await getPostsWithViews()).slice(0, 2);

  return (
    <motion.section
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

      <Button className="mx-auto my-8 flex w-max" variant="outline" asChild>
        <Link href="/blog">See all posts</Link>
      </Button>
    </motion.section>
  );
}
