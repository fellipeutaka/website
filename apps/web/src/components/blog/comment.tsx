import type { RouterOutput } from "@utaka/api/routes";
import type { User } from "@utaka/auth";
import type { CommentDB, UserDB } from "@utaka/db";
import { cn } from "@utaka/tailwind";
import { AlertDialog } from "@utaka/ui/alert-dialog";
import { Avatar } from "@utaka/ui/avatar";
import { Badge } from "@utaka/ui/badge";
import { Button } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import { toast } from "@utaka/ui/toast";
import { Tooltip } from "@utaka/ui/tooltip";
import { getUserInitials } from "@utaka/utils/avatar";
import { formatTimeAgo } from "@utaka/utils/date";
import { formatUpvotes } from "@utaka/utils/upvotes";
import type React from "react";
import { useState } from "react";
import { siteConfig } from "~/config/site";
import { useAuth } from "~/hooks/use-auth";
import { useDeleteCommentMutation } from "~/hooks/use-delete-comment-mutation";
import { reactClient } from "~/lib/api/react";
import { CommentBox } from "./comment-box";
import { MarkdownPreview } from "./markdown-preview";

interface CommentProps {
  slug: string;
  comment: RouterOutput["comment"]["getBySlug"][number];
}

export function Comment(props: CommentProps) {
  const { slug, comment } = props;
  const { user } = useAuth();

  const isCurrentUserUpvotedComment = comment.upvotes.some(
    (upvote) => upvote.userId === user?.id,
  );

  const clientUtils = reactClient.useUtils();
  const upvoteMutation = reactClient.comment.upvoteById.useMutation({
    onMutate: async (commentId) => {
      await clientUtils.comment.getBySlug.cancel();
      const previousComments = clientUtils.comment.getBySlug.getData();
      clientUtils.comment.getBySlug.setData(slug, (old) => {
        if (isCurrentUserUpvotedComment) {
          return old?.map((c) => {
            if (c.id === commentId) {
              return {
                ...c,
                upvotes: c.upvotes.filter((u) => u.userId !== user?.id),
              };
            }
            return c;
          });
        }

        return old?.map((c) => {
          if (c.id === commentId) {
            return {
              ...c,
              upvotes: [
                {
                  id: c.upvotes.length + 1,
                  userId: user?.id ?? crypto.randomUUID(),
                  commentId: comment.id,
                },
              ],
            };
          }
          return c;
        });
      });
      return { previousComments };
    },
    onError: (err, _commentId, context) => {
      toast.error(err.message);
      clientUtils.comment.getBySlug.setData(slug, context?.previousComments);
    },
    onSettled: () => {
      clientUtils.comment.getBySlug.invalidate();
    },
  });

  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="scroll-mt-20 overflow-hidden rounded-lg border dark:bg-input/30">
      <div className="border-b p-2 sm:px-4">
        <CommentContent user={user ?? null} comment={comment} />

        {!comment.deletedAt ? (
          <MarkdownPreview className="p-4" compiledSource={comment.body} />
        ) : (
          <p className="p-4 text-muted-foreground text-sm italic">
            {comment.body}
          </p>
        )}

        <button
          type="button"
          disabled={!user}
          className={cn(
            "flex gap-2 rounded-xl border px-2 py-1 text-muted-foreground text-xs tabular-nums transition-colors disabled:cursor-not-allowed",
            isCurrentUserUpvotedComment
              ? "border-destructive bg-destructive/10 text-destructive dark:brightness-200"
              : "hover:bg-accent hover:text-accent-foreground",
          )}
          onClick={() => upvoteMutation.mutate(comment.id)}
        >
          <Icons.ArrowUp className="size-3.5" />
          {formatUpvotes(comment.upvotes.length)}
        </button>
      </div>

      <div>
        {comment.replies.length > 0 &&
          comment.replies.map((reply) => (
            <Reply key={reply.id} user={user ?? null} reply={reply} />
          ))}
      </div>

      <div className="p-2 dark:bg-input/30 sm:px-3">
        {isReplying ? (
          <CommentBox
            slug={slug}
            parentId={comment.id}
            onCancel={() => setIsReplying(false)}
          />
        ) : (
          <button
            type="button"
            disabled={!user}
            className="w-full cursor-text rounded-lg border px-2 py-1 text-left text-muted-foreground text-sm disabled:cursor-not-allowed"
            onClick={() => user && setIsReplying(true)}
          >
            Write a reply
          </button>
        )}
      </div>
    </div>
  );
}

interface ReplyProps {
  reply: CommentDB & {
    user: UserDB;
  };
  user: User | null;
}

function Reply(props: ReplyProps) {
  const { user, reply } = props;

  return (
    <div className="relative overflow-hidden rounded-lg before:absolute before:inset-y-0 first-of-type:before:top-3 before:left-8 before:w-0.5 before:bg-border dark:bg-input/30 first-of-type:pt-2">
      <div className="px-2 sm:px-4">
        <CommentContent user={user} comment={reply} />
        <MarkdownPreview
          className="py-4 pr-4 pl-10"
          compiledSource={reply.body}
        />
      </div>
    </div>
  );
}

interface CommentContentProps {
  user: User | null;
  comment: CommentDB & {
    user: UserDB;
  };
}

export function CommentContent(props: CommentContentProps) {
  const { user, comment } = props;
  const formattedDate = formatTimeAgo(comment.createdAt);

  return (
    <div className="flex items-end justify-between sm:items-center">
      <div className="grid items-center gap-2 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm">
          <Avatar className="size-8">
            <Avatar.Image
              src={comment.user?.image ?? ""}
              alt={comment.user?.name ?? ""}
            />
            <Avatar.Fallback>
              {getUserInitials(comment.user?.name)}
            </Avatar.Fallback>
          </Avatar>

          <p className="font-semibold">{comment.user?.name}</p>
          <Tooltip.Provider>
            <Tooltip>
              <Tooltip.Trigger
                suppressHydrationWarning
                className="text-muted-foreground"
              >
                {formattedDate}
              </Tooltip.Trigger>
              <Tooltip.Content>
                {new Date(comment.createdAt).toString()}
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </div>

        {comment.user.email === siteConfig.email && (
          <Badge className="max-sm:-order-1 w-max">Author</Badge>
        )}
      </div>
      {user?.email === comment.user.email && !comment.deletedAt && (
        <DeleteCommentDialog commentId={comment.id} />
      )}
    </div>
  );
}

interface DeleteCommentDialogProps {
  commentId: string;
}

function DeleteCommentDialog({ commentId }: DeleteCommentDialogProps) {
  const deleteCommentMutation = useDeleteCommentMutation();

  const handleDeleteComment: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();

    toast.promise(deleteCommentMutation.mutateAsync(commentId), {
      loading: "Deleting comment...",
      success: "Comment deleted!",
      error(error) {
        return error.message || "An error occurred while deleting the comment";
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button size="icon" className="size-8" variant="destructive">
          <Icons.Trash className="size-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete a comment</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            disabled={deleteCommentMutation.isPending}
            onClick={handleDeleteComment}
            variant="destructive"
          >
            {deleteCommentMutation.isPending && (
              <Icons.Loader className="mr-2 size-4 animate-spin" />
            )}
            Delete
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
