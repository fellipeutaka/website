import { siteConfig } from "~/config/site";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeSwitcher } from "./mode-switcher";
import { LinkButton } from "./ui/button";
import { Icons } from "./ui/icons";
import { Link } from "./ui/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full animate-delay-1000 animate-fade-down border-border/40 border-b bg-bg backdrop-blur-sm dark:bg-bg/95 supports-backdrop-filter:dark:bg-bg/60">
      <div className="container flex h-16 max-w-(--breakpoint-2xl) items-center">
        <Link variant="unstyled" href="/">
          <Icons.Logo className="size-6" />
          <span className="sr-only">Fellipe Utaka</span>
        </Link>

        <MainNav />
        <MobileNav />
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <LinkButton
            variant="ghost"
            size="icon"
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.GitHub className="size-4" />
            <span className="sr-only">GitHub</span>
          </LinkButton>

          <LinkButton
            variant="ghost"
            size="icon"
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.Twitter className="size-4" />
            <span className="sr-only">Twitter</span>
          </LinkButton>

          <ModeSwitcher />
        </nav>
      </div>
    </header>
  );
}
