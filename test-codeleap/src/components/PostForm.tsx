import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from '@/hooks/api';
import { useUser } from '@/contexts/UserContext';


export const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(title.trim() !== '' && content.trim() !== '');
  }, [title, content]);

  const { username } = useUser();
  const createPostMutation = useCreatePost();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    createPostMutation.mutate(
      { username, title, content },
      {
        onSuccess: () => {
          setTitle('');
          setContent('');
        }
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-border mb-6">
      <h2 className="text-[22px] font-semibold leading-[22px] mb-6">What's on your mind?</h2>
      
      <form 
        onSubmit={handleSubmit} 
        className={createPostMutation.isPending ? 'opacity-80 pointer-events-none' : ''}
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-base font-normal mb-2">
            Title
          </label>
          <Input
            className='font-normal text-[16px]' 
            id="title"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="content" className="block text-base font-normal mb-2">
            Content
          </label>
          <Textarea
            id="content"
            placeholder="Content here"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[74px]"
          />
        </div>
        
        {createPostMutation.isError && (
          <div className="text-red-500 text-sm mb-4">
            Failed to create post. Please try again.
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            type="submit"
            className={`bg-codeleap-blue text-white px-10 h-[32px] ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={!isFormValid || createPostMutation.isPending}
          >
            {createPostMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;