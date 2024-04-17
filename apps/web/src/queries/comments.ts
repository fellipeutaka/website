import { db, eq, schema } from "@utaka/db";

export async function getCommentsBySlug(slug: string) {
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
}
