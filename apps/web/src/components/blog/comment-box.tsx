import { nativeClient } from "~/lib/api/native";
import { reactClient } from "~/lib/api/react";

import { MAX_COMMENT_LENGTH } from "@utaka/dto/comment";
import { useTranslations } from "@utaka/i18n";
import { cn } from "@utaka/tailwind";
import { Button, type ButtonProps } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import { Tabs } from "@utaka/ui/tabs";
import { Textarea, type TextareaProps } from "@utaka/ui/textarea";
import { toast } from "@utaka/ui/toast";
import { isEmptyString } from "@utaka/utils/string";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useAuth } from "~/hooks/use-auth";
import { SignInDialog } from "../auth/sign-in-dialog";
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

export function CommentBox({ slug, parentId, onCancel }: CommentBoxProps) {
  const [comment, setComment] = useState("");
  const clientUtils = reactClient.useUtils();
  const { user } = useAuth();
  const t = useTranslations("components.blog.comment-box");

  async function postCommentHandler() {
    if (comment.length > MAX_COMMENT_LENGTH) {
      // TODO: use `t` for translation
      toast.error(
        `Comment must contain at most ${MAX_COMMENT_LENGTH} characters`,
      );
      return;
    }

    const toastId = toast.loading(t("toast.loading"));

    try {
      const { serialize } = await import("@utaka/mdx/serialize");
      const { compiledSource } = await serialize(comment);

      const { message } = await nativeClient.comment.create.mutate({
        slug,
        parentId,
        comment: compiledSource,
        rawComment: comment,
      });

      clientUtils.comment.getBySlug.invalidate();
      setComment("");
      toast.success(message, { id: toastId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("toast.error"), {
        id: toastId,
      });
    }
  }

  if (!user) {
    return (
      <Tabs defaultValue="write">
        <Tabs.List>
          <Tabs.Trigger value="write">{t("write")}</Tabs.Trigger>
          <Tabs.Trigger disabled={isEmptyString(comment)} value="preview">
            {t("preview")}
          </Tabs.Trigger>
        </Tabs.List>
        <SignInDialog>
          <div>
            <CommentBoxTabContent
              comment={comment}
              setComment={setComment}
              parentId={parentId}
            >
              <div className="mt-4 flex items-center justify-between">
                <MarkdownLink />
                <div>
                  {parentId && (
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={onCancel}
                    >
                      {t("cancel")}
                    </Button>
                  )}

                  <SubmitButton type="button" disabled={isEmptyString(comment)}>
                    {parentId ? t("reply") : t("comment")}
                  </SubmitButton>
                </div>
              </div>
            </CommentBoxTabContent>
          </div>
        </SignInDialog>
      </Tabs>
    );
  }

  return (
    <Tabs defaultValue="write">
      <Tabs.List>
        <Tabs.Trigger value="write">{t("write")}</Tabs.Trigger>
        <Tabs.Trigger disabled={isEmptyString(comment)} value="preview">
          {t("preview")}
        </Tabs.Trigger>
      </Tabs.List>
      <form action={postCommentHandler}>
        <CommentBoxTabContent
          comment={comment}
          setComment={setComment}
          parentId={parentId}
        >
          <div className="mt-4 flex items-center justify-between">
            <MarkdownLink />
            <div>
              {parentId && (
                <Button variant="outline" className="mr-2" onClick={onCancel}>
                  {t("cancel")}
                </Button>
              )}

              <SubmitButton disabled={isEmptyString(comment)}>
                {parentId ? t("reply") : t("comment")}
              </SubmitButton>
            </div>
          </div>
        </CommentBoxTabContent>
      </form>
    </Tabs>
  );
}

interface CommentBoxTabContentProps extends TextareaProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  parentId?: string;
}

export function CommentBoxTabContent({
  comment,
  setComment,
  parentId,
  children,
  className,
  ...props
}: CommentBoxTabContentProps) {
  const t = useTranslations("components.blog.comment-box");

  const replyPlaceholder = t("reply-placeholder");
  const commentPlaceholder = t("comment-placeholder");

  return (
    <>
      <Tabs.Content value="write" tabIndex={-1}>
        <Textarea
          className={cn("max-h-full [field-sizing:content]", className)}
          maxLength={MAX_COMMENT_LENGTH}
          placeholder={parentId ? replyPlaceholder : commentPlaceholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          {...props}
        />
      </Tabs.Content>
      <Tabs.Content className="bg-background" value="preview" tabIndex={-1}>
        <MarkdownPreview
          className="min-h-20 rounded-lg border px-3 py-2"
          source={comment}
        />
      </Tabs.Content>
      {children}
    </>
  );
}

export function MarkdownLink() {
  const t = useTranslations("components.blog.comment-box");

  return (
    <a
      href="https://guides.github.com/features/mastering-markdown/"
      className="text-muted-foreground"
      title={t("md-support")}
      aria-label={t("md-support")}
    >
      <Icons.Md className="size-5" />
    </a>
  );
}

function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type={props.type || "submit"} disabled={pending || props.disabled}>
      {pending && <Icons.Loader className="mr-2 size-4 animate-spin" />}
      {props.children}
    </Button>
  );
}
