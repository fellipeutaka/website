"use client";

import { SessionProvider } from "@utaka/auth/react";
import { Toaster } from "@utaka/ui";

export function Providers(props: React.PropsWithChildren) {
  return (
    <SessionProvider>
      {props.children}
      <Toaster />
    </SessionProvider>
  );
}
