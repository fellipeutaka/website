import { TRPCError } from "@trpc/server";
import { and, db, eq, isNotNull, schema } from "@utaka/db";
import { ulid } from "@utaka/utils";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentRoute = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.string().min(1, "Slug is required"))
    .query(async ({ input }) => {
      const slug = input;

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
    }),
  create: protectedProcedure
    .input(
      z.object({
        comment: z.string().min(1, "Comment is required."),
        slug: z.string().min(1, "Slug is required."),
        parentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { comment, slug, parentId } = input;
      const { user } = ctx;

      const commentId = ulid();

      await db.insert(schema.comments).values({
        id: commentId,
        body: comment,
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
    }),
  deleteById: protectedProcedure
    .input(z.string().regex(/[0-7][0-9A-HJKMNP-TV-Z]{25}/, "Invalid ID"))
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
        }
      }
    }),
  upvoteById: protectedProcedure
    .input(z.string().regex(/[0-7][0-9A-HJKMNP-TV-Z]{25}/, "Invalid ID"))
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