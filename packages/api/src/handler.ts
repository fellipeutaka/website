import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./routes";
import { apiEndpoint } from "./shared";
import { createTRPCContext } from "./trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: apiEndpoint,
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
