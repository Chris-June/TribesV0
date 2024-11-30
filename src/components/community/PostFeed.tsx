import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CreatePost from './CreatePost';
import PostCard, { Post } from './PostCard';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type PostFeedProps = {
  tribeId: string;
};

export default function PostFeed({ tribeId }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load initial posts
  useEffect(() => {
    loadPosts();
  }, [tribeId]);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts([
        {
          id: '1',
          content: 'Just joined this amazing tribe! Looking forward to connecting with everyone.',
          author: {
            id: 'user1',
            name: 'John Doe',
            avatar: 'https://source.unsplash.com/random/100x100/?avatar',
          },
          createdAt: new Date(),
          likes: 5,
          comments: 2,
          isLiked: false,
        },
        {
          id: '2',
          content: "Check out this cool AI project I've been working on!",
          author: {
            id: 'user2',
            name: 'Jane Smith',
            avatar: 'https://source.unsplash.com/random/100x100/?portrait',
          },
          createdAt: new Date(Date.now() - 3600000),
          likes: 10,
          comments: 4,
          isLiked: true,
          media: [
            {
              type: 'image',
              url: 'https://source.unsplash.com/random/800x600/?technology',
            },
          ],
        },
      ]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load posts. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostCreated = () => {
    loadPosts();
  };

  const handleDelete = async (postId: string) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts(posts => posts.filter(post => post.id !== postId));
  };

  const handleUpdate = async (postId: string, content: string) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, content } : post
      )
    );
  };

  const handleLike = async (postId: string) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleComment = async (postId: string, content: string) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments + 1 }
          : post
      )
    );
  };

  return (
    <div className="space-y-4">
      <CreatePost tribeId={tribeId} onPostCreated={handlePostCreated} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </motion.div>
    </div>
  );
}
