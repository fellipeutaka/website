import { AlertDialog } from "@utaka/ui/alert-dialog";
import { DropdownMenu } from "@utaka/ui/dropdown-menu";
import { Icons } from "@utaka/ui/icons";
import { toast } from "@utaka/ui/toast";
import { useDeleteCommentMutation } from "~/hooks/use-delete-comment-mutation";

interface DeleteCommentAlertDialogProps {
  commentId: string;
}

export function DeleteCommentAlertDialog({
  commentId,
}: DeleteCommentAlertDialogProps) {
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
        <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
          <Icons.Trash className="mr-2 size-4" />
          Delete
        </DropdownMenu.Item>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete comment</AlertDialog.Title>
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
