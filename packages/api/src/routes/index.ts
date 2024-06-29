import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../trpc";
import { authRoute } from "./auth";
import { commentRoute } from "./comment";
import { postRoute } from "./post";

export const appRouter = createTRPCRouter({
  auth: authRoute,
  comment: commentRoute,
  post: postRoute,
});

export type AppRouter = typeof appRouter;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs["example"]["hello"]
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs["example"]["hello"]
 */
export type RouterOutput = inferRouterOutputs<AppRouter>;
