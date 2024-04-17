"use client";

import { Toaster } from "@utaka/ui";

export function Providers(props: React.PropsWithChildren) {
  return (
    <>
      {props.children}
      <Toaster />
    </>
  );
}
