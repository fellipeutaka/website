import { reactClient } from "@utaka/api/client/react";

export function useDeleteCommentMutation() {
  const clientUtils = reactClient.useUtils();
  return reactClient.comment.deleteById.useMutation({
    onSuccess() {
      clientUtils.comment.getBySlug.invalidate();
    },
  });
}
