"use client";

import { signOut, useSession } from "@utaka/auth/react";
import { AlertDialogAction, Avatar, Button, DropdownMenu } from "@utaka/ui";
import { SignInDialog } from "./sign-in-dialog";
import { SignOutAlertDialog } from "./sign-out-alert-dialog";

export function UserDropdownMenu() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <SignInDialog>
        <Button size="sm" variant="outline">
          Log In
        </Button>
      </SignInDialog>
    );
  }

  const { user } = session;

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="size-8 rounded-full">
          <Avatar className="size-8">
            <Avatar.Image src={user.image ?? ""} alt={user.name ?? ""} />
            <Avatar.Fallback>SC</Avatar.Fallback>
          </Avatar>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Label className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <SignOutAlertDialog>
          <AlertDialogAction onClick={() => signOut()} variant="destructive">
            Continue
          </AlertDialogAction>
        </SignOutAlertDialog>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
