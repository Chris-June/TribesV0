import { motion } from 'framer-motion';
import { Message } from '@/contexts/MessagesContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { FileVideo, File, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: Message;
  index: number;
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const renderMedia = (media: Message['media']) => {
    if (!media) return null;

    return (
      <div className="mt-2 space-y-2">
        {media.map((item, i) => {
          if (item.type === 'image') {
            return (
              <div
                key={i}
                className="relative group rounded-lg overflow-hidden max-w-md"
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          }

          if (item.type === 'video') {
            return (
              <div key={i} className="max-w-md">
                <video
                  controls
                  className="w-full rounded-lg"
                  poster={item.thumbnail}
                >
                  <source src={item.url} type={item.mimeType} />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          }

          if (item.type === 'file') {
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50 max-w-md group hover:bg-muted transition-colors"
              >
                <div className="h-10 w-10 rounded-lg border bg-background flex items-center justify-center">
                  {item.mimeType?.includes('video') ? (
                    <FileVideo className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <File className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(item.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex items-start space-x-4 px-4 py-2 hover:bg-muted/50 rounded-lg"
    >
      <Avatar>
        <AvatarImage src={message.user.avatar} alt={message.user.name} />
        <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <ContextMenu>
        <ContextMenuTrigger className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{message.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {message.timestamp}
            </span>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          {renderMedia(message.media)}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Reply</ContextMenuItem>
          <ContextMenuItem>React to Message</ContextMenuItem>
          <ContextMenuItem>Copy Text</ContextMenuItem>
          <ContextMenuItem className="text-destructive">
            Report Message
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </motion.div>
  );
}