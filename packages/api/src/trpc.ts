import { TRPCError, initTRPC } from "@trpc/server";
import type { User } from "@utaka/auth";
import { Ratelimit, redis } from "@utaka/redis";
import { ZodError } from "zod";
import { transformer } from "./transformer";

export interface TRPCContext {
  user?: User;
  headers: Headers;
}

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

interface RatelimitMiddlewareOptions {
  tokens?: number;
  duration?: Parameters<typeof Ratelimit.slidingWindow>[1];
  message?: string;
}

export function ratelimitMiddleware(options?: RatelimitMiddlewareOptions) {
  return t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const ratelimit = new Ratelimit({
      redis,
      // 15 requests from the same USER in 10 seconds
      limiter: Ratelimit.slidingWindow(
        options?.tokens ?? 15,
        options?.duration ?? "10 s",
      ),
    });

    const { success } = await ratelimit.limit(ctx.user.id);

    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: options?.message ?? "Rate limit exceeded",
      });
    }

    return next();
  });
}

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
