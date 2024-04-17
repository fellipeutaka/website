import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified").defaultNow(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type UserDB = InferSelectModel<typeof users>;
export type NewUserDB = InferInsertModel<typeof users>;

export const accounts = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export type AccountDB = InferSelectModel<typeof accounts>;
export type NewAccountDB = InferInsertModel<typeof accounts>;

export const posts = pgTable("post", {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  slug: text("slug").notNull().primaryKey(),
  likes: integer("likes").notNull().default(0),
  views: integer("views").notNull().default(0),
});

export type PostDB = InferSelectModel<typeof posts>;
export type NewPostDB = InferInsertModel<typeof posts>;

export const comments = pgTable("comment", {
  id: text("id").notNull().primaryKey(),
  body: text("body").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  postId: text("post_id").notNull(),
  parentId: text("parent_id"),
  deletedAt: timestamp("deleted_at"),
});

export type CommentDB = InferSelectModel<typeof comments>;
export type NewCommentDB = InferInsertModel<typeof comments>;

export const commentUpvotes = pgTable("comment_upvote", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  commentId: text("comment_id")
    .notNull()
    .references(() => comments.id, { onDelete: "cascade" }),
});

export type CommentUpvoteDB = InferSelectModel<typeof commentUpvotes>;
export type NewCommentUpvoteDB = InferInsertModel<typeof commentUpvotes>;

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  comments: many(comments),
  commentUpvotes: many(commentUpvotes),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.slug],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "comment_replies",
  }),
  replies: many(comments, {
    relationName: "comment_replies",
  }),
  upvotes: many(commentUpvotes),
}));

export const commentUpvotesRelations = relations(commentUpvotes, ({ one }) => ({
  user: one(users, {
    fields: [commentUpvotes.userId],
    references: [users.id],
  }),
  comment: one(comments, {
    fields: [commentUpvotes.commentId],
    references: [comments.id],
  }),
}));
