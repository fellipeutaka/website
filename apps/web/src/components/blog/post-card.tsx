import Link from "next/link";
import type { Post } from "~/lib/mdx";
import { formatDate } from "~/lib/utils";
import { BlurImage } from "../blur-image";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-xl border px-2 py-4"
    >
      <BlurImage
        src={`/images/blog/${post.slug}/cover.png`}
        width={1200}
        height={630}
        containerClassName="rounded-lg"
        className="transition-transform group-hover:scale-105"
        alt={post.title}
      />
      <div className="flex items-center justify-between gap-2 px-2 pt-4 text-muted-foreground text-sm">
        {formatDate(post.date)}
        <div className="flex gap-2">
          <div>{56} likes</div>
          <div>&middot;</div>
          <div>{32} views</div>
        </div>
      </div>
      <div className="flex flex-col px-2 py-4">
        <h3 className="font-bold font-title text-2xl">{post.title}</h3>
        <p className="mt-2 text-muted-foreground">{post.summary}</p>
      </div>
    </Link>
  );
}
