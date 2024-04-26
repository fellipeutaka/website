import { type TRPCLink, httpBatchLink } from "@trpc/client";
import { SuperJSON } from "superjson";
import type { AppRouter } from "./routes";

export const transformer = SuperJSON;

export const apiEndpoint = "/api/trpc";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl().concat(apiEndpoint);
}

export const trpcLinks: TRPCLink<AppRouter>[] = [
  httpBatchLink({
    url: getUrl(),
    transformer,
  }),
];
