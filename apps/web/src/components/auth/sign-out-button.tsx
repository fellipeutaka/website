"use client";

import { AlertDialogAction, Icons } from "@utaka/ui";
import { useFormStatus } from "react-dom";

export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <AlertDialogAction type="submit" disabled={pending} variant="destructive">
      {pending && <Icons.Loader className="mr-2 size-4 animate-spin" />}
      Continue
    </AlertDialogAction>
  );
}
