"use client";

import { domMax, LazyMotion } from "motion/react";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "./ui/toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <NuqsAdapter>
        <LazyMotion features={domMax}>{props.children}</LazyMotion>
      </NuqsAdapter>
      <Toaster />
    </ThemeProvider>
  );
}
