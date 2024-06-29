"use client";

import { getUserInitials } from "@utaka/utils/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@utaka/tailwind";
import { Avatar } from "@utaka/ui/avatar";
import { Button } from "@utaka/ui/button";
import { DialogStyles } from "@utaka/ui/dialog";
import { Icons } from "@utaka/ui/icons";
import { useState } from "react";
import { Drawer } from "vaul";
import { signInWithGithub, signInWithGoogle } from "~/actions/auth";
import { navLinks } from "~/config/site";
import { useAuth } from "~/hooks/use-auth";
import { useSignOutMutation } from "~/hooks/use-sign-out-mutation";
import { SignInWithGithubButton } from "./auth/sign-in-with-github-button";
import { SignInWithGoogleButton } from "./auth/sign-in-with-google-button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const signOutMutation = useSignOutMutation();

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto size-8 rounded-full md:hidden"
          aria-label="Toggle Menu"
        >
          <div
            className={cn(
              "-translate-y-1 absolute h-0.5 w-3.5 bg-muted-foreground transition",
              open && "translate-y-0 rotate-45",
            )}
            aria-hidden
          />
          <div
            className={cn(
              "absolute h-0.5 w-3.5 translate-y-1 bg-muted-foreground transition",
              open && "-rotate-45 translate-y-0",
            )}
            aria-hidden
          />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={DialogStyles.Overlay()} />
        <Drawer.Content className="data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-y-0 top-16 right-0 z-50 h-full w-3/4 gap-4 border-border border-l bg-background p-6 shadow-lg transition ease-in-out sm:max-w-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500">
          <div className="my-6 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center justify-between border-b py-3">
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                  <Avatar className="size-8">
                    <Avatar.Image
                      src={user?.image ?? ""}
                      alt={user?.name ?? ""}
                    />
                    <Avatar.Fallback>
                      {getUserInitials(user?.name)}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
                <Button
                  variant="outline"
                  onClick={() => signOutMutation.mutate()}
                  disabled={signOutMutation.isPending}
                >
                  {signOutMutation.isPending && (
                    <Icons.Loader className="mr-2 size-4 animate-spin" />
                  )}
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="space-y-3">
                <form action={signInWithGithub}>
                  <SignInWithGithubButton />
                </form>
                <form action={signInWithGoogle}>
                  <SignInWithGoogleButton />
                </form>
              </div>
            )}
            {navLinks.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
              >
                {item.label}
              </MobileLink>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

interface MobileLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({ href, onOpenChange, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className="border-b py-3"
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    />
  );
}
