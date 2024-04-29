"use client";

import { AlertDialogAction } from "@utaka/ui/alert-dialog";
import { Avatar } from "@utaka/ui/avatar";
import { Button } from "@utaka/ui/button";
import { DropdownMenu } from "@utaka/ui/dropdown-menu";
import { getUserInitials } from "@utaka/utils/avatar";
import { useAuth } from "~/hooks/use-auth";
import { useSignOutMutation } from "~/hooks/use-sign-out-mutation";
import { SignInDialog } from "./sign-in-dialog";
import { SignOutAlertDialog } from "./sign-out-alert-dialog";

export function UserDropdownMenu() {
  const { user } = useAuth();
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
