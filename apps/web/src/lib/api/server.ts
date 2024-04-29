import { createCallerFactory, createTRPCContext } from "@utaka/api";
import { appRouter } from "@utaka/api/routes";

export const serverClient = createCallerFactory(appRouter)(createTRPCContext);
