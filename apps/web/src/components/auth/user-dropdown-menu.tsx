"use client";

import { reactClient } from "@utaka/api/client/react";
import { AlertDialogAction, Avatar, Button, DropdownMenu } from "@utaka/ui";
import { getUserInitials } from "@utaka/utils";
import { useSignOutMutation } from "~/hooks/use-sign-out-mutation";
import { SignInDialog } from "./sign-in-dialog";
import { SignOutAlertDialog } from "./sign-out-alert-dialog";

export function UserDropdownMenu() {
  const { data: user } = reactClient.auth.me.useQuery();
  const signOutMutation = useSignOutMutation();

  if (!user) {
    return (
      <SignInDialog>
        <Button size="sm" variant="outline">
          Log In
        </Button>
      </SignInDialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="size-8 rounded-full">
          <Avatar className="size-8">
            <Avatar.Image src={user.image ?? ""} alt={user.name ?? ""} />
            <Avatar.Fallback>{getUserInitials(user.name)}</Avatar.Fallback>
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
          <AlertDialogAction
            onClick={() => signOutMutation.mutate()}
            variant="destructive"
            disabled={signOutMutation.isPending}
          >
            Continue
          </AlertDialogAction>
        </SignOutAlertDialog>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
