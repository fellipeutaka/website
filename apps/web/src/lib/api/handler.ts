import { fetchRequestHandler } from "@utaka/api/fetch-adapter";
import { appRouter } from "@utaka/api/routes";
import { auth } from "@utaka/auth";
import { defaultLocale } from "@utaka/i18n/shared";
import type { NextRequest } from "next/server";
import { apiEndpoint } from "./shared";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: apiEndpoint,
    req,
    router: appRouter,
    createContext: async () => {
      const session = await auth();
      const language = req.cookies.get("NEXT_LOCALE")?.value ?? defaultLocale;

      return {
        user: session?.user ?? null,
        language,
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
