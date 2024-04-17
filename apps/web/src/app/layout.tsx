import { cn } from "@utaka/tailwind";
import type { Metadata } from "next";
import { Providers } from "~/components/providers";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { fonts } from "~/config/fonts";
import { siteConfig } from "~/config/site";
import "~/styles/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="motion-safe:scroll-smooth">
      <body
        className={cn(
          "grid bg-cover bg-gradient-to-bl from-background to-background/95 bg-no-repeat font-sans",
          fonts.sans.variable,
          fonts.mono.variable,
        )}
      >
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
