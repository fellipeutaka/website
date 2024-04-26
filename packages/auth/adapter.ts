import type { Adapter } from "next-auth/adapters";

import { and, eq, schema } from "@utaka/db";
import type { db as DB } from "@utaka/db";

export const DrizzleAdapter = (db: typeof DB): Adapter => {
  return {
    createUser: async (user) => {
      const id = crypto.randomUUID();

      return await db
        .insert(schema.users)
        .values({ ...user, id })
        .returning()
        .then((res) => res[0]!);
    },
    getUser: async (id) => {
      return await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .then((res) => res[0] ?? null);
    },
    getUserByEmail: async (email) => {
      return await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .then((res) => res[0] ?? null);
    },
    updateUser: async (user) => {
      if (!user.id) {
        throw new Error("User must have an id.");
      }

      await db
        .update(schema.users)
        .set(user)
        .where(eq(schema.users.id, user.id));

      return await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, user.id))
        .then((res) => res[0]);
    },
    linkAccount: async (account) => {
      await db.insert(schema.accounts).values(account);
    },
    getUserByAccount: async (account) => {
      const dbAccount = await db
        .select()
        .from(schema.accounts)
        .where(
          and(
            eq(schema.accounts.providerAccountId, account.providerAccountId),
            eq(schema.accounts.provider, account.provider),
          ),
        )
        .leftJoin(schema.users, eq(schema.accounts.userId, schema.users.id))
        .then((res) => res[0] ?? null);

      if (!dbAccount) {
        return null;
      }

      return dbAccount.user;
    },
    deleteUser: async (id) => {
      const user = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .then((res) => res[0] ?? null);

      await db.delete(schema.users).where(eq(schema.users.id, id));

      return user;
    },
    unlinkAccount: async (account) => {
      await db
        .delete(schema.accounts)
        .where(
          and(
            eq(schema.accounts.providerAccountId, account.providerAccountId),
            eq(schema.accounts.provider, account.provider),
          ),
        );
    },
  };
};
