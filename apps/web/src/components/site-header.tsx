import { auth } from "@utaka/auth";
import { Button, Icons } from "@utaka/ui";
import Link from "next/link";
import { siteConfig } from "~/config/site";
import { SignInDialog } from "./auth/sign-in-dialog";
import { UserDropdownMenu } from "./auth/user-dropdown-menu";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export async function SiteHeader() {
  const session = await auth();

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
          {session ? (
            <UserDropdownMenu user={session.user!} />
          ) : (
            <SignInDialog>
              <Button size="sm" variant="outline">
                Log In
              </Button>
            </SignInDialog>
          )}
        </nav>
      </div>
    </header>
  );
}
