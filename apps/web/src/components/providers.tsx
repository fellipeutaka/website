"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@utaka/ui/toast";
import { useState } from "react";
import { TRPCProvider, reactClient } from "~/lib/api/react";
import { trpcLinks } from "~/lib/api/shared";

export function Providers(props: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    reactClient.createClient({
      links: trpcLinks,
    }),
  );

  return (
    <TRPCProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <Toaster />
      </QueryClientProvider>
    </TRPCProvider>
  );
}
