import Link from "next/link";
import { BlurImage } from "~/components/ui/blur-image";
import type { PostSource } from "~/lib/source";
import { formatDate } from "~/utils/date";

interface PostCardProps {
  post: PostSource;
}

export function PostCard({ post }: PostCardProps) {
  const postDate = post.data.lastModified ?? new Date();

  return (
    <Link className="group block rounded-xl border px-2 py-4" href={post.url}>
      <BlurImage
        alt={post.data.title}
        blurDataURL={post.data.cover.blurDataURL}
        className="transition-transform group-hover:scale-105"
        containerClassName="rounded-lg"
        height={post.data.cover.height}
        src={post.data.cover.src}
        width={post.data.cover.width}
      />
      <div className="flex items-center justify-between gap-2 px-2 pt-4 text-muted-fg text-sm">
        <time dateTime={postDate.toISOString()}>
          {formatDate(postDate, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <div className="flex flex-col px-2 py-4">
        <h3 className="font-bold font-title text-2xl">{post.data.title}</h3>
        <p className="mt-2 text-muted-fg">{post.data.description}</p>
      </div>
    </Link>
  );
}
