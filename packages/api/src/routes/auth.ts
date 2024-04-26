import { signOut } from "@utaka/auth";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRoute = createTRPCRouter({
  me: publicProcedure.query(({ ctx }) => ctx.user ?? null),
  signOut: protectedProcedure.mutation(async () => {
    await signOut({ redirect: false });
  }),
});
