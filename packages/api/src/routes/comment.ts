import { TRPCError } from "@trpc/server";
import { and, db, eq, isNotNull, lt, schema } from "@utaka/db";
import {
  commentIdSchema,
  createCommentSchema,
  editCommentSchema,
  getCommentPaginatedSchema,
} from "@utaka/dto/comment";
import { redis } from "@utaka/redis";
import { ulid } from "@utaka/utils/ulid";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  ratelimitMiddleware,
} from "../trpc";

export const commentRoute = createTRPCRouter({
  getBySlug: publicProcedure
    .input(getCommentPaginatedSchema)
    .query(async ({ input }) => {
      const { cursor, slug } = input;

      const defaultWhere = eq(schema.comments.postId, slug);
      const where = cursor
        ? and(defaultWhere, lt(schema.comments.id, cursor))
        : defaultWhere;

      const data = await db.query.comments.findMany({
        where,
        limit: 20,
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

      const lastCursor = data.at(-1)?.id;

      if (!lastCursor) {
        return {
          data: [],
          meta: {
            lastCursor: null,
          },
        };
      }

      return {
        data,
        meta: {
          lastCursor,
        },
      };
    }),
  create: protectedProcedure
    .use(
      ratelimitMiddleware({
        message: "You are commenting too fast. Please wait a few seconds.",
      }),
    )
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const { rawComment, comment, slug, parentId } = input;
      const { user } = ctx;

      const commentId = ulid();

      await db.insert(schema.comments).values({
        id: commentId,
        body: comment,
        rawBody: rawComment,
        userId: user.id,
        postId: slug,
        ...(parentId && {
          parentId,
        }),
      });

      if (!parentId) {
        await db.insert(schema.commentUpvotes).values({
          userId: user.id,
          commentId,
        });
      }

      await redis.incr(`post:${slug}:comments`);
    }),
  editById: protectedProcedure
    .use(
      ratelimitMiddleware({
        message: "You are commenting too fast. Please wait a few seconds.",
      }),
    )
    .input(editCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const { commentId, rawComment, comment, slug } = input;
      const { user } = ctx;

      const dbComment = await db.query.comments.findFirst({
        where: eq(schema.comments.id, commentId),
        with: {
          user: true,
        },
      });

      if (!dbComment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      if (dbComment.user.email !== user.email) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to edit this comment",
        });
      }

      await db
        .update(schema.comments)
        .set({
          id: commentId,
          body: comment,
          rawBody: rawComment,
          userId: user.id,
          postId: slug,
          modifiedAt: new Date(),
        })
        .where(eq(schema.comments.id, commentId));
    }),
  deleteById: protectedProcedure
    .input(commentIdSchema)
    .mutation(async ({ ctx, input }) => {
      const id = input;
      const { user } = ctx;

      const comment = await db.query.comments.findFirst({
        where: eq(schema.comments.id, id),
        with: {
          user: true,
          replies: true,
          parent: true,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      if (comment.user.email !== user.email) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this comment",
        });
      }

      // If the comment has replies, just mark it as deleted.
      if (comment.replies.length > 0) {
        await db
          .update(schema.comments)
          .set({
            body: "[This comment has been deleted]",
            deletedAt: new Date(),
          })
          .where(eq(schema.comments.id, id));

        return;
      }

      await db.delete(schema.comments).where(eq(schema.comments.id, id));

      await redis.decr(`post:${comment.postId}:comments`);

      if (comment.parentId) {
        const parentComment = await db.query.comments.findFirst({
          where: and(
            eq(schema.comments.id, comment.parentId),
            isNotNull(schema.comments.deletedAt),
          ),
          with: {
            replies: true,
          },
        });

        // If the parent comment (which is marked as deleted) has no replies, delete it also.
        if (parentComment?.replies.length === 0) {
          await db
            .delete(schema.comments)
            .where(eq(schema.comments.id, comment.parentId));

          await redis.decr(`post:${comment.postId}:comments`);
        }
      }
    }),
  upvoteById: protectedProcedure
    .use(
      ratelimitMiddleware({
        message: "You are upvoting too fast. Please wait a few seconds.",
      }),
    )
    .input(commentIdSchema)
    .mutation(async ({ ctx, input }) => {
      const id = input;
      const { user } = ctx;

      const comment = await db.query.comments.findFirst({
        where: eq(schema.comments.id, id),
        with: {
          upvotes: {
            where: eq(schema.commentUpvotes.userId, user.id),
          },
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      if (comment.upvotes.length > 0) {
        await db
          .delete(schema.commentUpvotes)
          .where(eq(schema.commentUpvotes.id, comment.upvotes[0].id));

        return;
      }

      await db.insert(schema.commentUpvotes).values({
        userId: user.id,
        commentId: id,
      });
    }),
});
