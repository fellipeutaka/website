import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@utaka/api/routes";

export const reactClient = createTRPCReact<AppRouter>();

export const TRPCProvider = reactClient.Provider;
