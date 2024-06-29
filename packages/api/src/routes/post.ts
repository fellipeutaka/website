import { slugSchema } from "@utaka/dto/comment";
import { redis } from "@utaka/redis";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRoute = createTRPCRouter({
  getMetadata: publicProcedure.input(slugSchema).query(async ({ input }) => {
    const slug = input;

    const [views, comments] = await Promise.all([
      redis.pfcount(`post:${slug}:views`),
      redis.get<number | null>(`post:${slug}:comments`),
    ]);

    return {
      views,
      comments,
    };
  }),
  increaseView: publicProcedure
    .input(slugSchema)
    .mutation(async ({ input, ctx }) => {
      const slug = input;
      const { user, headers } = ctx;
      const ip = headers.get("x-forwarded-for");

      await redis.pfadd(`post:${slug}:views`, user?.id ?? ip);
    }),
});
