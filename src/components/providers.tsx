"use client";

import { Toaster } from "./ui/toast";

export function Providers(props: React.PropsWithChildren) {
  return (
    <>
      {props.children}
      <Toaster />
    </>
  );
}
