import { useDeletePost } from "@/hooks/api";
import { DialogClose, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

type DeletePostProps = {
  postId: number;
  onClose?: () => void; 
};
const DeletePost = ({ postId, onClose }: DeletePostProps) => {
  const deletePostMutation = useDeletePost();
  
  const handleDelete = () => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        if (onClose) onClose();
      }
    });
  };

  return (
    <>
      <DialogTitle>Are you sure you want to delete this item?</DialogTitle>

      <div className="mt-6 flex flex-row justify-end gap-4">
        <DialogClose asChild >
          <Button 
            className="h-8 w-[120px] rounded-lg border border-border shadow-none"
            disabled={deletePostMutation.isPending}
          >
            Cancel
          </Button>
        </DialogClose>

        <Button
          variant="destructive"
          className="h-8 w-[120px] rounded-lg border border-border shadow-none"
          onClick={handleDelete}
          disabled={deletePostMutation.isPending}
        >
          {deletePostMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </>
  );
};

export default DeletePost;