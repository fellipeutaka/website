import { useLocale as useLocalePrimitive } from "next-intl";
import { usePathname, useRouter } from "../navigation";
import type { Locale } from "../shared";

export function useLocale() {
  return useLocalePrimitive() as Locale;
}

export function useChangeLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (locale: Locale) =>
    locale !== currentLocale ? router.push(pathname, { locale }) : undefined;
}
