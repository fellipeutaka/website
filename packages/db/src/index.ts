import { drizzle } from "drizzle-orm/postgres-js";

import { env } from "@utaka/env";
import postgres from "postgres";
import * as schema from "./schema";

const connection = postgres(env.DATABASE_URL);

export const db = drizzle(connection, { schema });

export * from "drizzle-orm";
export { schema };

export type {
  AccountDB,
  CommentDB,
  CommentUpvoteDB,
  NewAccountDB,
  NewCommentDB,
  NewCommentUpvoteDB,
  NewPostDB,
  NewUserDB,
  PostDB,
  UserDB,
} from "./schema";
