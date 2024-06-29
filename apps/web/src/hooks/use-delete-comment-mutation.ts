import { reactClient } from "~/lib/api/react";

export function useDeleteCommentMutation() {
  const clientUtils = reactClient.useUtils();
  return reactClient.comment.deleteById.useMutation({
    onSuccess: async () => {
      await Promise.all([
        clientUtils.comment.getBySlug.invalidate(),
        clientUtils.post.getMetadata.invalidate(),
      ]);
    },
  });
}
