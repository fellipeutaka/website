import { fetchRequestHandler } from "@utaka/api/fetch-adapter";
import { appRouter } from "@utaka/api/routes";
import { auth } from "@utaka/auth";
import { apiEndpoint } from "./shared";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: apiEndpoint,
    req,
    router: appRouter,
    createContext: async ({ req }) => {
      const session = await auth();

      return {
        user: session?.user,
        headers: req.headers,
      };
    },
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
