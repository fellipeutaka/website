import type { User } from "@utaka/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@utaka/ui";
import { logOut } from "./actions";
import { SignOutAlertDialog } from "./sign-out-alert-dialog";
import { SignOutButton } from "./sign-out-button";

type UserDropdownMenuProps = {
  user: User;
};

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOutAlertDialog>
          <form action={logOut}>
            <SignOutButton />
          </form>
        </SignOutAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
