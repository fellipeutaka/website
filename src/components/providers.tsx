"use client";

import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { RouterProvider } from "react-aria-components";
import { Toaster } from "./ui/toast";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: ProvidersProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" enableSystem>
      <RouterProvider navigate={router.push}>
        <NuqsAdapter>{props.children}</NuqsAdapter>
        <Toaster />
      </RouterProvider>
    </ThemeProvider>
  );
}
