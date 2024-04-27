"use client";

import { nativeClient } from "@utaka/api/client/native";
import { reactClient } from "@utaka/api/client/react";
import {
  Button,
  type ButtonProps,
  Icons,
  Tabs,
  Textarea,
  toast,
} from "@utaka/ui";
import { useState } from "react";
import { useFormStatus } from "react-dom";
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
  const clientUtils = reactClient.useUtils();

  const postCommentHandler = async () => {
    if (comment.length > MAX_COMMENT_LENGTH) {
      toast.error("Comment must contain at most 140 characters");
      return;
    }

    const toastId = toast.loading("Creating a message...");

    try {
      const { serialize } = await import("@utaka/mdx/serialize");
      const { compiledSource } = await serialize(comment);

      await nativeClient.comment.create.mutate({
        slug,
        comment: compiledSource,
        parentId,
      });

      clientUtils.comment.getBySlug.invalidate();
      setComment("");
      toast.success("Message created!", { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while creating the message",
        { id: toastId },
      );
    }
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
      <form action={postCommentHandler}>
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

            <SubmitButton disabled={isCommentEmpty}>
              {parentId ? "Reply" : "Comment"}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Tabs>
  );
}

function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || props.disabled}>
      {pending && <Icons.Loader className="mr-2 size-4 animate-spin" />}
      {props.children}
    </Button>
  );
}
