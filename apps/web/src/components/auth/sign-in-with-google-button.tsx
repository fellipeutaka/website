"use client";

import { Button } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import { useFormStatus } from "react-dom";

export function SignInWithGoogleButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="outline"
      className="w-full"
    >
      {pending ? (
        <Icons.Loader className="mr-2 size-4 animate-spin" />
      ) : (
        <Icons.Google className="mr-2 size-4" />
      )}
      Continue with Google
    </Button>
  );
}
