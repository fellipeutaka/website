import { type CreateTRPCReact, createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../routes";
import { trpcLinks } from "../shared";
import type { TRPCContext } from "../trpc";

export const reactClient: CreateTRPCReact<AppRouter, TRPCContext> =
  createTRPCReact();

export const TRPCProvider = reactClient.Provider;

export const createTRPCClient = () =>
  reactClient.createClient({
    links: trpcLinks,
  });

export * from "@trpc/react-query";
