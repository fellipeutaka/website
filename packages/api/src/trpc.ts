import { TRPCError, initTRPC } from "@trpc/server";
import { auth } from "@utaka/auth";
import { ZodError } from "zod";
import { transformer } from "./shared";

export const createTRPCContext = async () => {
  const session = await auth();

  return {
    user: session?.user,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `user` as non-nullable
      user: { ...ctx.user },
    },
  });
});

export const {
  router: createTRPCRouter,
  procedure: publicProcedure,
  createCallerFactory,
  middleware,
  mergeRouters,
} = t;
