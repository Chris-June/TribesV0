import { useState, useEffect } from 'react';
import { useMessages } from '@/contexts/MessagesContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  MessageSquare,
  ThumbsUp,
  Heart,
  Share2,
  MoreHorizontal,
  Play,
  Pause,
  Download,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import MessageComposer from './MessageComposer';

interface MessageThreadProps {
  tribeId: string;
  threadId: string;
  onClose: () => void;
}

export default function MessageThread({
  tribeId,
  threadId,
  onClose,
}: MessageThreadProps) {
  const { state, dispatch } = useMessages();
  const thread = state.threads[threadId];
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Mark thread messages as read
    const messageIds = [
      thread?.parentMessage.id,
      ...(thread?.replies.map(reply => reply.id) || []),
    ];
    
    if (messageIds.length > 0) {
      dispatch({
        type: 'MARK_AS_READ',
        tribeId,
        messageIds,
      });
    }
  }, [thread, tribeId, dispatch]);

  if (!thread) return null;

  const handleReaction = (messageId: string, reaction: string) => {
    dispatch({
      type: 'ADD_REACTION',
      tribeId,
      messageId,
      reaction: {
        id: Date.now().toString(),
        emoji: reaction,
        userId: 'current-user-id', // Replace with actual user ID
        username: 'Current User', // Replace with actual username
        timestamp: new Date(),
      },
    });
  };

  const toggleAudioPlayback = (audioUrl: string) => {
    if (audioPlaying === audioUrl) {
      setAudioPlaying(null);
    } else {
      setAudioPlaying(audioUrl);
    }
  };

  const renderAttachment = (attachment: Attachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div
            className="relative cursor-pointer rounded-lg overflow-hidden"
            onClick={() => setImagePreview(attachment.url)}
          >
            <img
              src={attachment.url}
              alt={attachment.name}
              className="max-w-[300px] max-h-[200px] object-cover"
            />
          </div>
        );

      case 'video':
        return (
          <div className="relative rounded-lg overflow-hidden">
            <video
              src={attachment.url}
              controls
              className="max-w-[300px] max-h-[200px]"
            />
          </div>
        );

      case 'audio':
        return (
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleAudioPlayback(attachment.url)}
            >
              {audioPlaying === attachment.url ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <div className="flex-1">
              <div className="text-sm font-medium">{attachment.name}</div>
              <div className="text-xs text-muted-foreground">
                {Math.round(attachment.size / 1024)} KB
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <a href={attachment.url} download={attachment.name}>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
            <div className="flex-1">
              <div className="text-sm font-medium">{attachment.name}</div>
              <div className="text-xs text-muted-foreground">
                {Math.round(attachment.size / 1024)} KB
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <a href={attachment.url} download={attachment.name}>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        );
    }
  };

  const renderMessage = (message: Message, isParent = false) => (
    <div className={`flex space-x-4 ${isParent ? 'mb-6' : ''}`}>
      <Avatar>
        <AvatarImage src={message.sender.avatar} />
        <AvatarFallback>
          {message.sender.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{message.sender.username}</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </span>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm">{message.content}</p>

          {message.attachments.length > 0 && (
            <div className="grid gap-2 grid-cols-2">
              {message.attachments.map((attachment) => (
                <div key={attachment.id}>
                  {renderAttachment(attachment)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReaction(message.id, '👍')}
            className="space-x-1"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>
              {message.reactions.filter((r) => r.emoji === '👍').length || ''}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReaction(message.id, '❤️')}
            className="space-x-1"
          >
            <Heart className="h-4 w-4" />
            <span>
              {message.reactions.filter((r) => r.emoji === '❤️').length || ''}
            </span>
          </Button>
          <Button variant="ghost" size="sm" className="space-x-1">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-background border-l flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-lg">Thread</CardTitle>
            <div className="text-sm text-muted-foreground">
              {thread.replies.length} replies
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
        {renderMessage(thread.parentMessage, true)}

        <div className="border-t pt-6">
          <AnimatePresence>
            {thread.replies.map((reply) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                {renderMessage(reply)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>

      <MessageComposer
        tribeId={tribeId}
        threadId={threadId}
        parentId={thread.parentMessage.id}
      />

      {imagePreview && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setImagePreview(null)}
        >
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}
