import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2, Flag, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isPinned?: boolean;
};

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'IntelliSync Team',
      avatar: '/intellisync-logo.png',
      role: 'Admin',
    },
    content: '🎉 Welcome to the IntelliSync Community! This is your space to connect, share insights, and explore the future of AI together. Check out our community guidelines and feel free to introduce yourself!',
    timestamp: '2024-01-20T10:00:00Z',
    likes: 42,
    comments: 15,
    isLiked: false,
    isPinned: true,
  },
  {
    id: '2',
    author: {
      name: 'AI Research Group',
      avatar: '/research-avatar.png',
      role: 'Verified Member',
    },
    content: '📊 Just published our latest findings on large language model performance optimization. Would love to hear your thoughts and experiences! #AIResearch #LLM',
    timestamp: '2024-01-19T15:30:00Z',
    likes: 28,
    comments: 7,
    isLiked: false,
  },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-4 shadow-sm"
        >
          {post.isPinned && (
            <div className="mb-2 text-sm text-primary font-medium">
              📌 Pinned Post
            </div>
          )}
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center space-x-2">
                    <span>{post.author.role}</span>
                    <span>•</span>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="mt-2 text-foreground">{post.content}</p>
              <div className="mt-4 flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={post.isLiked ? 'text-primary' : ''}
                  onClick={() => toggleLike(post.id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
