"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCProvider, createTRPCClient } from "@utaka/api/client/react";
import { Toaster } from "@utaka/ui";
import { useState } from "react";

export function Providers(props: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createTRPCClient());

  return (
    <TRPCProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <Toaster />
      </QueryClientProvider>
    </TRPCProvider>
  );
}
