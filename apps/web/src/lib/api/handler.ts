import { createTRPCContext } from "@utaka/api";
import { fetchRequestHandler } from "@utaka/api/fetch-adapter";
import { appRouter } from "@utaka/api/routes";
import { apiEndpoint } from "./shared";

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
