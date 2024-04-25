"use client";

import { Button, Icons, Tabs, Textarea, toast } from "@utaka/ui";
import { useState } from "react";
import { postComment } from "~/actions/comment";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.length > MAX_COMMENT_LENGTH) {
      return toast.error("Comment must contain at most 140 characters");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating a message...");

    const { serialize } = await import("@utaka/mdx/serialize");
    const { compiledSource: processedComment } = await serialize(comment);

    const result = await postComment({
      slug,
      comment: processedComment,
      parentId,
    });

    toast.dismiss(toastId);

    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      setComment("");
    }

    setIsSubmitting(false);
  };

  return (
    <Tabs defaultValue="write">
      <Tabs.List>
        <Tabs.Trigger value="write">Write</Tabs.Trigger>
        <Tabs.Trigger disabled={comment.trim().length < 1} value="preview">
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
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
