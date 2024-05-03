import middleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./shared";

export const createMiddleware: ReturnType<typeof middleware> = middleware({
  locales,
  defaultLocale,
  localePrefix,
});
