import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@utaka/ui/dialog";
import { signInWithGithub, signInWithGoogle } from "~/actions/auth";
import { siteConfig } from "~/config/site";
import { SignInWithGithubButton } from "./sign-in-with-github-button";
import { SignInWithGoogleButton } from "./sign-in-with-google-button";

interface SignInDialogProps {
  children: React.ReactNode;
}

export function SignInDialog({ children }: SignInDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl">Sign in</DialogTitle>
          <DialogDescription className="text-left">
            to continue to {siteConfig.name}
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 flex flex-col gap-4">
          <form action={signInWithGithub}>
            <SignInWithGithubButton />
          </form>
          <form action={signInWithGoogle}>
            <SignInWithGoogleButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
