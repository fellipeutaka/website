import { z } from "zod";

const ulidRegex = /[0-7][0-9A-HJKMNP-TV-Z]{25}/;

export const MAX_COMMENT_LENGTH = 3_200;

export const commentIdSchema = z.string().regex(ulidRegex, "Invalid ID");

export const slugSchema = z.string().min(1, "Slug is required");

export const getCommentPaginatedSchema = z.object({
  slug: slugSchema,
  cursor: commentIdSchema.nullish(),
});

export const createCommentSchema = z.object({
  rawComment: z
    .string()
    .min(1, "Comment is required.")
    .max(MAX_COMMENT_LENGTH, "Comment is too long."),
  comment: z.string().min(1, "Comment is required."),
  slug: slugSchema,
  parentId: z.string().optional(),
});

export const editCommentSchema = z.object({
  commentId: commentIdSchema,
  rawComment: z.string().min(1, "Comment is required."),
  comment: z.string().min(1, "Comment is required."),
  slug: slugSchema,
});
