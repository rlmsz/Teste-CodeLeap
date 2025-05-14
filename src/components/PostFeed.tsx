
import React from 'react';
import PostItem from './PostItem';
import type { Post } from '../types/post';

interface PostFeedProps {
  posts: Post[];
  username: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, username}) => {
  return (
    <div>
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          isOwnPost={post.username === username}
        />
      ))}
    </div>
  );
};

export default PostFeed;