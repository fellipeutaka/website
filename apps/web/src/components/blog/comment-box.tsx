"use client";

import { nativeClient } from "@utaka/api/client/native";
import { TRPCClientError, reactClient } from "@utaka/api/client/react";
import { Button, Icons, Tabs, Textarea, toast } from "@utaka/ui";
import { useState, useTransition } from "react";
import { MarkdownPreview } from "./markdown-preview";

type CommentBoxProps = {
  slug: string;
} & (
  | {
      parentId?: never;
      onCancel?: never;
    }
  | {
      parentId: string;
      onCancel: () => void;
    }
);

const MAX_COMMENT_LENGTH = 3_200;

export function CommentBox({ slug, parentId, onCancel }: CommentBoxProps) {
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();
  const clientUtils = reactClient.useUtils();

  const postCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.length > MAX_COMMENT_LENGTH) {
      return toast.error("Comment must contain at most 140 characters");
    }

    async function postComment() {
      const { serialize } = await import("@utaka/mdx/serialize");
      const { compiledSource } = await serialize(comment);

      await nativeClient.comment.create.mutate({
        slug,
        comment: compiledSource,
        parentId,
      });

      clientUtils.comment.getBySlug.invalidate();
      setComment("");
    }

    toast.promise(postComment, {
      loading: "Creating a message...",
      success: "Message created!",
      error(error) {
        if (error instanceof TRPCClientError) {
          return toast.error(error.message);
        }

        return error.message || "An error occurred while creating the message";
      },
    });

    startTransition(async () => {
      try {
        await postComment();
      } catch {
        // The toast will handle the error
      }
    });
  };

  const isCommentEmpty = comment.trim().length < 1;

  return (
    <Tabs defaultValue="write">
      <Tabs.List>
        <Tabs.Trigger value="write">Write</Tabs.Trigger>
        <Tabs.Trigger disabled={isCommentEmpty} value="preview">
          Preview
        </Tabs.Trigger>
      </Tabs.List>
      <form onSubmit={postCommentHandler}>
        <Tabs.Content value="write" tabIndex={-1}>
          <Textarea
            className="max-h-full [field-sizing:content]"
            maxLength={MAX_COMMENT_LENGTH}
            aria-label={`Write your ${parentId ? "reply" : "comment"} here`}
            placeholder={`Write your ${parentId ? "reply" : "comment"} here...`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Tabs.Content>
        <Tabs.Content className="bg-background" value="preview" tabIndex={-1}>
          <MarkdownPreview
            className="min-h-20 rounded-lg border px-3 py-2"
            source={comment}
          />
        </Tabs.Content>
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
            {parentId && (
              <Button variant="outline" className="mr-2" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending || isCommentEmpty}>
              {isPending && (
                <Icons.Loader className="mr-2 size-4 animate-spin" />
              )}
              {parentId ? "Reply" : "Comment"}
            </Button>
          </div>
        </div>
      </form>
    </Tabs>
  );
}
