import { appRouter } from "../routes";
import { createCallerFactory, createTRPCContext } from "../trpc";

export const serverClient = createCallerFactory(appRouter)(createTRPCContext);
