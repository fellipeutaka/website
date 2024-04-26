"use client";

import { reactClient } from "@utaka/api/client/react";
import { Avatar, Button, Icons, Sheet } from "@utaka/ui";
import { getUserInitials } from "@utaka/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { signInWithGithub, signInWithGoogle } from "~/actions/auth";
import { navLinks } from "~/config/site";
import { useSignOutMutation } from "~/hooks/use-sign-out-mutation";
import { SignInWithGithubButton } from "./auth/sign-in-with-github-button";
import { SignInWithGoogleButton } from "./auth/sign-in-with-google-button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: user } = reactClient.auth.me.useQuery();
  const signOutMutation = useSignOutMutation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Sheet.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto size-8 rounded-full md:hidden"
        >
          <Icons.Menu className="size-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content className="px-10 pt-4" side="right">
        <div className="flex items-center justify-between">
          <MobileLink href="/" className="block w-max" onOpenChange={setOpen}>
            <Icons.Logo className="size-6" />
          </MobileLink>

          <Sheet.Close asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-full"
            >
              <Icons.X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </Sheet.Close>
        </div>

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
            <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
              {item.label}
            </MobileLink>
          ))}
        </div>
      </Sheet.Content>
    </Sheet>
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
