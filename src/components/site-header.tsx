import { siteConfig } from "~/config/site";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeSwitcher } from "./mode-switcher";
import { Icons } from "./ui/icons";
import { Link } from "./ui/link";
import { LinkButton } from "./ui/link-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full animate-delay-1000 animate-fade-down border-border/40 border-b bg-background backdrop-blur-sm dark:bg-background/95 supports-backdrop-filter:dark:bg-background/60">
      <div className="container flex h-16 max-w-(--breakpoint-2xl) items-center">
        <Link href="/" variant="unstyled">
          <Icons.Logo className="size-6" />
          <span className="sr-only">Fellipe Utaka</span>
        </Link>

        <MainNav />
        <MobileNav />
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <LinkButton
            href={siteConfig.links.github}
            rel="noreferrer"
            size="icon"
            target="_blank"
            variant="ghost"
          >
            <Icons.GitHub className="size-4" />
            <span className="sr-only">GitHub</span>
          </LinkButton>

          <LinkButton
            href={siteConfig.links.twitter}
            rel="noreferrer"
            size="icon"
            target="_blank"
            variant="ghost"
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
