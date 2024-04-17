"use client";

import { useFormStatus } from "react-dom";

import { Button, Icons } from "@utaka/ui";

export function SignInWithGithubButton() {
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
        <Icons.GitHub className="mr-2 size-4" />
      )}
      Continue with GitHub
    </Button>
  );
}
