"use server";

import { and, db, eq, isNotNull, schema } from "@utaka/db";
import { createId, getErrorMessage } from "@utaka/utils";
import { revalidatePath } from "next/cache";

import { z } from "zod";

import type { getCommentsBySlug } from "~/queries/comments";
import { privateAction } from "./private-action";

type PostCommentProps = {
  slug: string;
  comment: string;
  parentId?: string;
};

export const postComment = (input: PostCommentProps) =>
  privateAction(async (user) => {
    const postCommentSchema = z.object({
      comment: z.string().min(1, "Comment is required."),
      slug: z.string().min(1, "Slug is required."),
      parentId: z.string().optional(),
    });

    const parsed = postCommentSchema.safeParse(input);

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0].message,
        error: true,
      };
    }

    const {
      comment: parsedComment,
      slug: parsedSlug,
      parentId: parsedParentId,
    } = parsed.data;

    await new Promise((resolve) => setTimeout(resolve, 4000));

    try {
      const commentId = createId();

      await db.insert(schema.comments).values({
        id: commentId,
        body: parsedComment,
        userId: user.id!,
        postId: parsedSlug,
        ...(parsedParentId && {
          parentId: parsedParentId,
        }),
      });

      if (!parsedParentId) {
        await db.insert(schema.commentUpvotes).values({
          id: createId(),
          userId: user.id!,
          commentId,
        });
      }
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true,
      };
    }

    revalidatePath("/blog/[slug]", "page");
    return {
      message: "Posted a comment.",
    };
  });

export const deleteComment = (id: string) =>
  privateAction(async (user) => {
    const deleteCommentSchema = z.object({
      id: z.string().min(1, "ID is required."),
    });

    const parsed = deleteCommentSchema.safeParse({
      id,
    });

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0].message,
        error: true,
      };
    }

    const { id: parsedId } = parsed.data;

    const comment = await db.query.comments.findFirst({
      where: eq(schema.comments.id, parsedId),
      with: {
        user: true,
        replies: true,
        parent: true,
      },
    });

    if (!comment) {
      return {
        message: "Comment not found",
        error: true,
      };
    }

    if (comment.user.email !== user.email) {
      return {
        message: "Unauthorized",
        error: true,
      };
    }

    try {
      // If the comment has replies, just mark it as deleted.
      if (comment.replies.length > 0) {
        await db
          .update(schema.comments)
          .set({
            body: "[This comment has been deleted]",
            deletedAt: new Date(),
          })
          .where(eq(schema.comments.id, parsedId));
      } else {
        await db
          .delete(schema.comments)
          .where(eq(schema.comments.id, parsedId));

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
      }
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true,
      };
    }

    revalidatePath("/blog/[slug]", "page");
    return {
      message: "Deleted a comment.",
    };
  });

export const upvoteComment = (id: string) =>
  privateAction(async (user) => {
    const UpvoteCommentSchema = z.object({
      id: z.string().min(1, "ID is required."),
    });

    const parsed = UpvoteCommentSchema.safeParse({
      id,
    });

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0].message,
        error: true,
      };
    }

    const { id: parsedId } = parsed.data;

    const comment = await db.query.comments.findFirst({
      where: eq(schema.comments.id, parsedId),
      with: {
        upvotes: {
          where: eq(schema.commentUpvotes.userId, user.id!),
        },
      },
    });

    if (!comment) {
      return {
        message: "Comment not found",
        error: true,
      };
    }

    if (comment.upvotes.length > 0) {
      await db
        .delete(schema.commentUpvotes)
        .where(eq(schema.commentUpvotes.id, comment.upvotes[0]!.id));

      revalidatePath("/blog/[slug]", "page");
      return {
        message: "Removed an upvote.",
      };
    }

    try {
      await db.insert(schema.commentUpvotes).values({
        id: createId(),
        userId: user.id!,
        commentId: parsedId,
      });
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true,
      };
    }

    revalidatePath("/blog/[slug]", "page");
    return {
      message: "Upvoted a comment.",
    };
  });

export type Comment = Awaited<ReturnType<typeof getCommentsBySlug>>[0];
export type Reply = schema.CommentDB & {
  user: schema.UserDB;
};
