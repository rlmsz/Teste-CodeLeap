import { createPost, deletePost, editPost, fetchPosts, ServerPost } from '@/api/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export function usePostsData() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}


export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('Post created successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create post');
    }
  });
}


export function useDeletePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success('Post deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete post');
    }
  });
}

export function useEditPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { 
      id: number, 
      data: Partial<Pick<ServerPost, 'title' | 'content'>> 
    }) => editPost(id, data),
    onSuccess: () => {
      toast.success('Post updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update post');
    }
  });
}

