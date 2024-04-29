"use client";

import { reactClient } from "@utaka/api/client/react";
import {
  Icons,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@utaka/ui";
import { Comment } from "./comment";
import { CommentBox } from "./comment-box";

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  const {
    data: comments,
    isLoading,
    isError,
  } = reactClient.comment.getBySlug.useQuery(slug, {
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <CommentSectionSkeleton />;
  }

  if (isError) {
    return <div>Failed to load comments</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border px-2 py-4 dark:bg-input/30 sm:px-4">
        <CommentBox slug={slug} />
      </div>
      <div className="space-y-8">
        {comments
          ?.filter((c) => !c.parentId)
          .map((comment) => (
            <Comment key={comment.id} slug={slug} comment={comment} />
          ))}
      </div>
    </div>
  );
}

function CommentSectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border px-2 py-4 dark:bg-input/30 sm:px-4">
        <CommentBoxSkeleton />
      </div>
      <CommentListSkeleton />
    </div>
  );
}

function CommentListSkeleton() {
  return (
    <div className="space-y-8">
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
}

function CommentBoxSkeleton() {
  return (
    <Tabs defaultValue="write">
      <TabsList>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview" disabled>
          Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="write" tabIndex={-1}>
        <Skeleton className="h-20 w-full" />
      </TabsContent>
      <div className="mt-4 flex items-center justify-between">
        <a
          href="https://guides.github.com/features/mastering-markdown/"
          className="text-muted-foreground"
          title="Markdown is supported"
          aria-label="Markdown is supported"
        >
          <Icons.Md className="size-5" />
        </a>
        <div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </Tabs>
  );
}

function CommentSkeleton() {
  return (
    <div className="scroll-mt-20 overflow-hidden rounded-lg border dark:bg-input/30">
      <div className="border-b p-2 sm:px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="size-8 rounded-full" />

            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        <Skeleton className="m-4 h-12" />

        <Skeleton className="h-6 w-12 rounded-full" />
      </div>

      <Skeleton className="m-2 h-8 sm:mx-3" />
    </div>
  );
}
