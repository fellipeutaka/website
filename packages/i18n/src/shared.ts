import type { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "pt-BR"] as const;

export const localePrefix = "never" satisfies NonNullable<
  Parameters<typeof createLocalizedPathnamesNavigation>[0]["localePrefix"]
>;

export type Locale = (typeof locales)[number];

export const defaultLocale = "en" satisfies Locale;
