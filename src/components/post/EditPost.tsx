import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditPost } from "@/hooks/api";

type EditPostProps = {
  postId: number;
  initialTitle: string;
  initialContent: string;
  onClose?: () => void; 
};

const EditPost = ({
  postId,
  initialTitle,
  initialContent,
  onClose,
}: EditPostProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const isValid = title.trim() !== "" && content.trim() !== "";
  const editPostMutation = useEditPost();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      editPostMutation.mutate(
        {
          id: postId,
          data: { title, content }
        },
        {
          onSuccess: () => {
            if (onClose) onClose();
          }
        }
      );
    }
  };

  return (
    <>
      <DialogTitle>Edit Item</DialogTitle>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="mb-2 block text-base font-normal">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hello world"
            className="text-[16px] font-normal"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="mb-2 block text-base font-normal">
            Content
          </label>
          <Textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content here"
            className="min-h-[74px]"
          />
        </div>

        {editPostMutation.isError && (
          <div className="text-red-500 text-sm mb-4">
            Failed to update post. Please try again.
          </div>
        )}

        <div className="mt-6 flex flex-row justify-end gap-4">
          <DialogClose asChild>
            <Button 
              className="h-8 w-[120px] rounded-lg border border-black shadow-none"
              disabled={editPostMutation.isPending}
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="save"
            disabled={!isValid || editPostMutation.isPending}
            className="h-8 w-[120px] rounded-lg border border-border shadow-none"
          >
            {editPostMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditPost;