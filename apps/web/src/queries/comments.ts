import { db, eq, schema } from "@utaka/db";
import { unstable_cache } from "next/cache";

export const getCommentsBySlug = unstable_cache(
  async (slug: string) => {
    return await db.query.comments.findMany({
      where: eq(schema.comments.postId, slug),
      with: {
        user: true,
        upvotes: true,
        replies: {
          with: {
            user: true,
          },
        },
      },
      orderBy({ createdAt }, { desc }) {
        return desc(createdAt);
      },
    });
  },
  ["get-comments-by-slug"],
  {
    tags: ["comments"],
  },
);
