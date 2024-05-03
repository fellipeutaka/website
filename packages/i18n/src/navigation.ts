import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { type Locale, localePrefix, locales } from "./shared";

const navigation: ReturnType<typeof createSharedPathnamesNavigation<Locale[]>> =
  createSharedPathnamesNavigation({
    locales,
    localePrefix,
  });

type Navigation = typeof navigation;

export const Link: Navigation["Link"] = navigation.Link;

export const permanentRedirect: Navigation["permanentRedirect"] =
  navigation.permanentRedirect;

export const redirect: Navigation["redirect"] = navigation.redirect;

export const usePathname: Navigation["usePathname"] = navigation.usePathname;

export const useRouter: Navigation["useRouter"] = navigation.useRouter;
