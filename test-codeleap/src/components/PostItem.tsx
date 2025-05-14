import React, { useState } from "react";
import type { Post } from "../types/post";


import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import EditIcon from "@/assets/bx_bx-edit.svg";
import DeleteIcon from "@/assets/ic_baseline-delete-forever.svg";
import DeletePost from "./post/DeletePost";
import EditPost from "./post/EditPost";
interface PostItemProps {
  post: Post;
  isOwnPost: boolean;
  onDeletePost?: (id: number) => void;
  onEditPost?: (id: number, title: string, content: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, isOwnPost }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  };

  return (
    <div className="bg-white rounded-2xl border border-border mb-6 overflow-hidden">
      <div className="bg-codeleap-blue text-white flex justify-between items-center">
        <h3 className="font-bold text-lg truncate p-6 leading-[22px]">
          {post.title}
        </h3>
        {isOwnPost && post.id && (
          <div className="flex space-x-6 pr-6">
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-[30px] w-[31px] text-white hover:bg-blue-600"
                >
                  <img src={DeleteIcon} className="size-full" alt="Edit" />
                </Button>
              </DialogTrigger>

              <DialogContent className="md:min-w-[660px] w-[660px]">
                <DeletePost postId={post.id} onClose={() => setDeleteOpen(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-[30px] w-[31px] text-white hover:bg-blue-600"
                >
                  <img src={EditIcon} className="size-full" alt="Edit" />
                </Button>
              </DialogTrigger>

              <DialogContent className="md:min-w-[660px] w-[660px]">
                <EditPost
                  postId={post.id}
                  initialTitle={post.title}
                  initialContent={post.content}
                  onClose={() => setEditOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <div className="px-6 py-6">
        <div className="flex justify-between text-gray-500 text-lg mb-4 leading-[18px]">
          <span className="font-bold">@{post.username}</span>
          <span>
            {post.created_datetime && formatDate(post.created_datetime)}
          </span>
        </div>
        <p className="whitespace-pre-line">{post.content}</p>
      </div>
    </div>
  );
};

export default PostItem;
