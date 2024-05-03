import { createCallerFactory } from "@utaka/api";
import { appRouter } from "@utaka/api/routes";
import { auth } from "@utaka/auth";
import { defaultLocale } from "@utaka/i18n/shared";
import { cookies } from "next/headers";

export const serverClient = createCallerFactory(appRouter)(async () => {
  const session = await auth();
  const language = cookies().get("NEXT_LOCALE")?.value ?? defaultLocale;

  return {
    user: session?.user ?? null,
    language,
  };
});
