"use client";

import type { RouterOutput } from "@utaka/api";
import { reactClient } from "@utaka/api/client/react";
import { Comment } from "./comment";

interface CommentListProps {
  slug: string;
  initialData: RouterOutput["comment"]["getBySlug"];
}

export function CommentList({ slug, initialData }: CommentListProps) {
  const [comments] = reactClient.comment.getBySlug.useSuspenseQuery(slug, {
    initialData,
  });

  return (
    <div className="space-y-8">
      {comments
        .filter((c) => !c.parentId)
        .map((comment) => (
          <Comment key={comment.id} slug={slug} comment={comment} />
        ))}
    </div>
  );
}
