import { reactClient } from "~/lib/api/react";

export function useAuth(
  options?: Omit<Parameters<typeof reactClient.auth.me.useQuery>[1], "trpc">,
) {
  const { data: user, ...rest } = reactClient.auth.me.useQuery(
    undefined,
    options,
  );

  return {
    user,
    ...rest,
  };
}
