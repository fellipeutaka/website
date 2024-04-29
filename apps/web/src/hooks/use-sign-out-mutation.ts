import { reactClient } from "~/lib/api/react";

export function useSignOutMutation() {
  const clientUtils = reactClient.useUtils();
  return reactClient.auth.signOut.useMutation({
    onSuccess() {
      clientUtils.auth.me.setData(undefined, null);
    },
  });
}
