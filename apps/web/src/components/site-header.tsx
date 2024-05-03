import { Button } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import Link from "next/link";
import { siteConfig } from "~/config/site";
import { UserDropdownMenu } from "./auth/user-dropdown-menu";
import { LanguageDropdownMenu } from "./language-dropdown-menu";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full animate-delay-1000 animate-fade-down border-border/40 border-b bg-background backdrop-blur dark:bg-background/95 supports-[backdrop-filter]:dark:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/">
          <Icons.Logo className="size-6" />
          <span className="sr-only">Fellipe Utaka</span>
        </Link>
        <MainNav />
        <MobileNav />
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Button asChild variant="ghost" size="icon">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.GitHub className="size-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.Twitter className="size-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <LanguageDropdownMenu />
          <UserDropdownMenu />
        </nav>
      </div>
    </header>
  );
}
