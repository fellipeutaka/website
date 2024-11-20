import Link from "next/link";
import { BlurImage } from "~/components/ui/blur-image";
import { formatDate } from "~/utils/date";
import type { Post } from "~/utils/mdx";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={post.slug} className="group block rounded-xl border px-2 py-4">
      <BlurImage
        src={post.cover.src}
        width={post.cover.width}
        height={post.cover.height}
        containerClassName="rounded-lg"
        className="transition-transform group-hover:scale-105"
        alt={post.title}
      />
      <div className="flex items-center justify-between gap-2 px-2 pt-4 text-muted-fg text-sm">
        <time dateTime={new Date(post.date).toISOString()}>
          {formatDate(post.date, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <div className="flex flex-col px-2 py-4">
        <h3 className="font-bold font-title text-2xl">{post.title}</h3>
        <p className="mt-2 text-muted-fg">{post.description}</p>
      </div>
    </Link>
  );
}
