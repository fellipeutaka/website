import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "../routes";
import { trpcLinks } from "../shared";

export const nativeClient = createTRPCClient<AppRouter>({
  links: trpcLinks,
});
