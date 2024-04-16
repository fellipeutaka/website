import Link from "next/link";
import { posts } from "~/content";
import { PostCard } from "../blog/post-card";
import { MotionSection } from "../framer-motion";
import { Button } from "../ui/button";

export function BlogSection() {
  return (
    <MotionSection
      animate={{
        y: 40,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
    >
      <h2 className="font-semibold text-2xl md:text-3xl">Latest posts</h2>

      <div className="mt-10 grid w-full gap-4 md:grid-cols-2">
        {posts.slice(0, 2).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Button className="mx-auto my-8 flex w-max" variant="outline" asChild>
        <Link href="/blog">See all posts</Link>
      </Button>
    </MotionSection>
  );
}
