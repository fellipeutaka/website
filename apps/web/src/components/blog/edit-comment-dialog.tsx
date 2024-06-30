import { MAX_COMMENT_LENGTH } from "@utaka/dto/comment";
import { Button, type ButtonProps } from "@utaka/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@utaka/ui/dialog";
import { DropdownMenu } from "@utaka/ui/dropdown-menu";
import { Icons } from "@utaka/ui/icons";
import { Tabs } from "@utaka/ui/tabs";
import { toast } from "@utaka/ui/toast";
import { isEmptyString } from "@utaka/utils/string";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { nativeClient } from "~/lib/api/native";
import { reactClient } from "~/lib/api/react";
import type { CommentContentProps } from "./comment";
import { CommentBoxTabContent } from "./comment-box";

interface EditCommentDialogProps extends CommentContentProps {
  closeDropdown: () => void;
}

export function EditCommentDialog(props: EditCommentDialogProps) {
  const [comment, setComment] = useState(props.comment.rawBody);
  const clientUtils = reactClient.useUtils();

  async function handleEditComment() {
    if (comment.length > MAX_COMMENT_LENGTH) {
      toast.error(
        `Comment must contain at most ${MAX_COMMENT_LENGTH} characters`,
      );
      return;
    }

    const toastId = toast.loading("Editing message...");

    try {
      const { serialize } = await import("@utaka/mdx/serialize");
      const { compiledSource } = await serialize(comment);

      await nativeClient.comment.editById.mutate({
        commentId: props.comment.id,
        slug: props.comment.postId,
        comment: compiledSource,
        rawComment: comment,
      });

      // TODO: Update the comment in the cache
      // clientUtils.comment.getBySlug.setData(
      //   {
      //     slug: props.comment.postId,
      //     cursor: null,
      //   },
      //   (old) => {
      //     return {
      //       data: [],
      //       meta: { lastCursor: old?.meta.lastCursor as string },
      //     };
      //   },
      // );

      clientUtils.comment.getBySlug.invalidate();

      toast.success("Message edited!", { id: toastId });
      props.closeDropdown();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while editing the message",
        { id: toastId },
      );
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
          <Icons.Pencil className="mr-2 size-4" />
          Edit
        </DropdownMenu.Item>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" action={handleEditComment}>
          <Tabs defaultValue="write">
            <Tabs.List>
              <Tabs.Trigger value="write">Write</Tabs.Trigger>
              <Tabs.Trigger disabled={isEmptyString(comment)} value="preview">
                Preview
              </Tabs.Trigger>
            </Tabs.List>
            <CommentBoxTabContent
              className="max-h-96"
              comment={comment}
              setComment={setComment}
            />
          </Tabs>
          <DialogFooter>
            <EditCommentSubmitButton disabled={isEmptyString(comment)} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditCommentSubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={props.disabled || pending}>
      {pending && <Icons.Loader className="mr-2 size-4 animate-spin" />}
      Save changes
    </Button>
  );
}
