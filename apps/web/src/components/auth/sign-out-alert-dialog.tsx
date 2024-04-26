import { AlertDialog, DropdownMenuItem, Icons } from "@utaka/ui";

interface SignOutAlertDialogProps {
  children: React.ReactNode;
}

export function SignOutAlertDialog({ children }: SignOutAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Icons.LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action will sign you out of your account. Make sure you have
            saved all your work before continuing.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          {children}
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
