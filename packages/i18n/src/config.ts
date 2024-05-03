import { getRequestConfig as getRequestConfigRaw } from "next-intl/server";
import { defaultLocale } from "./shared";

const locales = ["en", "pt-BR"];

const getRequestConfig: ReturnType<typeof getRequestConfigRaw> =
  getRequestConfigRaw(async ({ locale }) => {
    if (!locales.includes(locale)) {
      return {
        messages: (await import(`../messages/${defaultLocale}.json`)).default,
      };
    }

    return {
      messages: (await import(`../messages/${locale}.json`)).default,
    };
  });

// biome-ignore lint/style/noDefaultExport: This is required for next-intl
export default getRequestConfig;
