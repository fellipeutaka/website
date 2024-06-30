import type { RouterOutput } from "@utaka/api/routes";
import type { User } from "@utaka/auth";
import type { CommentDB, UserDB } from "@utaka/db";
import { cn } from "@utaka/tailwind";
import { Avatar } from "@utaka/ui/avatar";
import { Badge } from "@utaka/ui/badge";
import { DropdownMenu } from "@utaka/ui/dropdown-menu";
import { Icons } from "@utaka/ui/icons";
import { Tooltip } from "@utaka/ui/tooltip";
import { getUserInitials } from "@utaka/utils/avatar";
import { formatCommentDate, formatTimeAgo } from "@utaka/utils/date";
import { formatUpvotes } from "@utaka/utils/upvotes";
import type React from "react";
import { forwardRef, useState } from "react";
import { siteConfig } from "~/config/site";
import { useAuth } from "~/hooks/use-auth";
import { reactClient } from "~/lib/api/react";
import { SignInDialog } from "../auth/sign-in-dialog";
import { CommentBox } from "./comment-box";
import { DeleteCommentAlertDialog } from "./delete-comment-alert-dialog";
import { EditCommentDialog } from "./edit-comment-dialog";
import { MarkdownPreview } from "./markdown-preview";

interface CommentProps {
  slug: string;
  comment: RouterOutput["comment"]["getBySlug"]["data"][number];
}

export const Comment = forwardRef<React.ComponentRef<"div">, CommentProps>(
  function Comment(props, ref) {
    const { slug, comment } = props;
    const { user } = useAuth();

    const isCurrentUserUpvotedComment = comment.upvotes.some(
      (upvote) => upvote.userId === user?.id,
    );

    const clientUtils = reactClient.useUtils();
    const upvoteMutation = reactClient.comment.upvoteById.useMutation({
      // TODO: Implement optimistic updates
      // onMutate: async (commentId) => {
      //   await clientUtils.comment.getBySlug.cancel();
      //   const previousComments = clientUtils.comment.getBySlug.getData();
      //   clientUtils.comment.getBySlug.setData({ slug }, (old) => {
      //     if (isCurrentUserUpvotedComment) {
      //       return {
      //         data:
      //           old?.data.map((c) => {
      //             if (c.id === commentId) {
      //               return {
      //                 ...c,
      //                 upvotes: c.upvotes.filter((u) => u.userId !== user?.id),
      //               };
      //             }
      //             return c;
      //           }) ?? [],
      //         meta: { lastCursor: old?.meta?.lastCursor as string },
      //       };
      //     }

      //     return {
      //       data:
      //         old?.data.map((c) => {
      //           if (c.id === commentId) {
      //             return {
      //               ...c,
      //               upvotes: [
      //                 {
      //                   id: c.upvotes.length + 1,
      //                   userId: user?.id ?? crypto.randomUUID(),
      //                   commentId: comment.id,
      //                 },
      //               ],
      //             };
      //           }
      //           return c;
      //         }) ?? [],
      //       meta: { lastCursor: old?.meta?.lastCursor as string },
      //     };
      //   });
      //   return { previousComments };
      // },
      // onError: (err, _commentId, context) => {
      //   toast.error(err.message);
      //   clientUtils.comment.getBySlug.setData(
      //     { slug },
      //     context?.previousComments,
      //   );
      // },
      onSettled: () => {
        clientUtils.comment.getBySlug.invalidate();
      },
    });

    const [isReplying, setIsReplying] = useState(false);

    return (
      <div
        ref={ref}
        className="scroll-mt-20 overflow-hidden rounded-lg border dark:bg-input/30"
      >
        <div className="border-b p-2 sm:px-4">
          <CommentContent user={user ?? null} comment={comment} />

          {!comment.deletedAt ? (
            <MarkdownPreview className="p-4" compiledSource={comment.body} />
          ) : (
            <p className="p-4 text-muted-foreground text-sm italic">
              {comment.body}
            </p>
          )}

          {user ? (
            <UpvoteButton
              isCurrentUserUpvotedComment={isCurrentUserUpvotedComment}
              upvotesAmount={comment.upvotes.length}
              onClick={() => upvoteMutation.mutate(comment.id)}
            />
          ) : (
            <SignInDialog>
              <UpvoteButton
                isCurrentUserUpvotedComment={isCurrentUserUpvotedComment}
                upvotesAmount={comment.upvotes.length}
              />
            </SignInDialog>
          )}
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
          ) : user ? (
            <ReplyButton onClick={() => setIsReplying(true)} />
          ) : (
            <SignInDialog>
              <ReplyButton />
            </SignInDialog>
          )}
        </div>
      </div>
    );
  },
);

interface UpvoteButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isCurrentUserUpvotedComment: boolean;
  upvotesAmount: number;
}

function UpvoteButton({
  isCurrentUserUpvotedComment,
  upvotesAmount,
  ...props
}: UpvoteButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "flex gap-2 rounded-xl border px-2 py-1 text-muted-foreground text-xs tabular-nums transition-colors",
        isCurrentUserUpvotedComment
          ? "border-destructive bg-destructive/10 text-destructive dark:brightness-200"
          : "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <Icons.ArrowUp className="size-3.5" />
      {formatUpvotes(upvotesAmount)}
    </button>
  );
}

function ReplyButton(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      type="button"
      className="w-full cursor-text rounded-lg border px-2 py-1 text-left text-muted-foreground text-sm"
    >
      Write a reply
    </button>
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

export interface CommentContentProps {
  user: User | null;
  comment: CommentDB & {
    user: UserDB;
  };
}

export function CommentContent(props: CommentContentProps) {
  const { user, comment } = props;
  const formattedDate = formatTimeAgo(comment.createdAt);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function closeDropdown() {
    setIsDropdownOpen(false);
  }

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
                {comment.modifiedAt && " (edited)"}
              </Tooltip.Trigger>
              <Tooltip.Content>
                {formatCommentDate(comment.modifiedAt ?? comment.createdAt)}
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </div>

        {comment.user.email === siteConfig.email && (
          <Badge className="max-sm:-order-1 w-max">Author</Badge>
        )}
      </div>
      <Tooltip.Provider delayDuration={300}>
        {user?.email === comment.user.email && !comment.deletedAt && (
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <Tooltip>
              <DropdownMenu.Trigger asChild>
                <Tooltip.Trigger>
                  <Icons.Ellipsis className="size-4" />
                  <span className="sr-only">More</span>
                </Tooltip.Trigger>
              </DropdownMenu.Trigger>
              <Tooltip.Content>More</Tooltip.Content>
            </Tooltip>
            <DropdownMenu.Content align="end">
              <EditCommentDialog
                comment={props.comment}
                user={props.user}
                closeDropdown={closeDropdown}
              />
              <DeleteCommentAlertDialog commentId={comment.id} />
            </DropdownMenu.Content>
          </DropdownMenu>
        )}
      </Tooltip.Provider>
    </div>
  );
}
