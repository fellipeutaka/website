import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "@utaka/api/routes";
import { trpcLinks } from "./shared";

export const nativeClient = createTRPCClient<AppRouter>({
  links: trpcLinks,
});
