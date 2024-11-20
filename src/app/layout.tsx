import "~/styles/globals.css";
import "~/styles/mdx.css";

import type { Metadata, Viewport } from "next";
import { Providers } from "~/components/providers";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { fonts } from "~/config/fonts";
import { siteConfig } from "~/config/site";
import { cx } from "~/lib/cva";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  authors: {
    name: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    creator: "@fellipeutaka",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cx(
        "motion-safe:scroll-smooth",
        fonts.sans.variable,
        fonts.mono.variable,
      )}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <style>
            {/* biome-ignore lint/nursery/useConsistentCurlyBraces: */}
            {".motion { opacity: 1 !important; transform: none !important }"}
          </style>
        </noscript>

        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
