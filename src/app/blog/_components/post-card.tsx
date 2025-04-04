import Link from "next/link";
import { BlurImage } from "~/components/ui/blur-image";
import { formatDate } from "~/utils/date";
import type { StripNonSerializable } from "~/utils/strip-non-serializable";

type Post = StripNonSerializable<
  NonNullable<
    Awaited<ReturnType<typeof import("~/lib/source").postsSource.getPage>>
  >
>;

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const postDate = new Date(post.data.lastModified ?? new Date());

  return (
    <Link href={post.url} className="group block rounded-xl border px-2 py-4">
      <BlurImage
        src={post.data.cover.src}
        width={post.data.cover.width}
        height={post.data.cover.height}
        blurDataURL={post.data.cover.blurDataURL}
        containerClassName="rounded-lg"
        className="transition-transform group-hover:scale-105"
        alt={post.data.title}
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
