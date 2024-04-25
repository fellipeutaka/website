"use client";

import type { User } from "@utaka/auth";
import { useSession } from "@utaka/auth/react";
import type { CommentUpvoteDB } from "@utaka/db";
import { cn } from "@utaka/tailwind";
import {
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Icons,
  Tooltip,
  toast,
} from "@utaka/ui";
import { formatDate, formatUpvotes, getUserInitials } from "@utaka/utils";
import { startTransition, useOptimistic, useState } from "react";
import {
  type Comment as TComment,
  type Reply as TReply,
  deleteComment,
  upvoteComment,
} from "~/actions/comment";
import { siteConfig } from "~/config/site";
import { CommentBox } from "./comment-box";
import { MarkdownPreview } from "./markdown-preview";

type CommentProps = {
  slug: string;
  comment: TComment;
};

export function Comment(props: CommentProps) {
  const { slug, comment } = props;

  const { data: session } = useSession();
  const user = session?.user;
  const [isReplying, setIsReplying] = useState(false);
  const [optimisticUpvotes, upvoteOptimistic] = useOptimistic<
    CommentUpvoteDB[],
    boolean
  >(comment.upvotes, (state, isCurrentUserUpvotedComment) => {
    if (isCurrentUserUpvotedComment) {
      return state.filter((state) => state.userId !== user!.id);
    }

    return [
      ...state,
      {
        id: crypto.randomUUID(),
        userId: user ? user.id! : crypto.randomUUID(),
        commentId: comment.id,
      },
    ];
  });

  const isCurrentUserUpvotedComment = optimisticUpvotes.some(
    (upvote) => upvote.userId === user?.id,
  );

  const upvoteCommentHandler = async () => {
    if (!user) return;

    startTransition(() => upvoteOptimistic(isCurrentUserUpvotedComment));
    await upvoteComment(comment.id);
  };

  return (
    <div className="scroll-mt-20 overflow-hidden rounded-lg border dark:bg-zinc-900/30">
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
          className={cn(
            "flex gap-2 rounded-xl border px-2 py-1 text-muted-foreground text-xs tabular-nums transition-colors",
            !user && "cursor-not-allowed",
            user &&
              (isCurrentUserUpvotedComment
                ? "border-red-500 bg-red-400/10 text-red-500 dark:bg-red-900/10 dark:hover:bg-red-900/40 hover:bg-red-300/40"
                : "hover:bg-accent hover:text-accent-foreground"),
          )}
          onClick={upvoteCommentHandler}
        >
          <Icons.ArrowUp className="size-3.5" />
          {formatUpvotes(optimisticUpvotes.length)}
        </button>
      </div>

      <div>
        {comment.replies.length > 0 &&
          comment.replies.map((reply) => (
            <Reply key={reply.id} user={user ?? null} reply={reply} />
          ))}
      </div>

      <div className="p-2 dark:bg-zinc-900/30 sm:px-3">
        {isReplying ? (
          <CommentBox
            slug={slug}
            parentId={comment.id}
            onCancel={() => setIsReplying(false)}
          />
        ) : (
          <button
            type="button"
            className={cn(
              "w-full cursor-text rounded-lg border px-2 py-1 text-left text-muted-foreground text-sm",
              !user && "cursor-not-allowed",
            )}
            onClick={() => user && setIsReplying(true)}
          >
            Write a reply
          </button>
        )}
      </div>
    </div>
  );
}

type ReplyProps = {
  reply: TReply;
  user: User | null;
};

function Reply(props: ReplyProps) {
  const { user, reply } = props;

  return (
    <div className="relative overflow-hidden rounded-lg before:absolute before:inset-y-0 first-of-type:before:top-3 before:left-8 before:w-0.5 before:bg-border dark:bg-zinc-900/30 first-of-type:pt-2">
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

async function deleteCommentHandler(id: string) {
  const result = await deleteComment(id);

  if (result.error) {
    toast.error(result.message);
  } else {
    toast.success(result.message);
  }
}

type CommentContentProps = {
  user: User | null;
  comment: TReply;
};

export function CommentContent(props: CommentContentProps) {
  const { user, comment } = props;
  const formattedDate = formatDate(comment.createdAt);

  return (
    <div className="flex items-center justify-between">
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

        <div className="font-semibold">{comment.user?.name}</div>
        <div className="text-muted-foreground">
          <Tooltip.Provider>
            <Tooltip>
              <Tooltip.Trigger>
                <span>{formattedDate}</span>
              </Tooltip.Trigger>
              <Tooltip.Content>
                {new Date(comment.createdAt).toString()}
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </div>
        {comment.user.email === siteConfig.email && <Badge>Author</Badge>}
      </div>
      {user && user.email === comment.user.email && !comment.deletedAt && (
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
                Are you sure you want to delete this comment? This action cannot
                be undone.
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action
                onClick={() => deleteCommentHandler(comment.id)}
                variant="destructive"
              >
                Delete
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      )}
    </div>
  );
}
