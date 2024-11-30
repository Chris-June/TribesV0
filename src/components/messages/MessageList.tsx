import { useMessages } from '@/contexts/MessagesContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import {
  MessageSquare,
  ThumbsUp,
  Heart,
  MoreHorizontal,
  Play,
  Pause,
  Download,
} from 'lucide-react';
import MessageThread from './MessageThread';
import MessageComposer from './MessageComposer';

interface MessageListProps {
  tribeId: string;
  className?: string;
}

export default function MessageList({ tribeId, className }: MessageListProps) {
  const { state, dispatch } = useMessages();
  const messages = Object.values(state.messages)
    .filter((message) => message.tribeId === tribeId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleThreadClick = (messageId: string) => {
    const thread = state.threads[messageId] || {
      id: messageId,
      parentMessage: state.messages[messageId],
      replies: [],
      createdAt: new Date(),
      lastReplyAt: new Date(),
    };

    dispatch({ type: 'ADD_THREAD', thread });
    dispatch({ type: 'SET_ACTIVE_THREAD', threadId: messageId });
  };

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

  const renderAttachment = (attachment: Attachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className="relative cursor-pointer rounded-lg overflow-hidden">
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
            <Button variant="ghost" size="icon">
              <Play className="h-4 w-4" />
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

  return (
    <div className={`flex h-full ${className}`}>
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-4">
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
                        {formatDistanceToNow(new Date(message.timestamp), {
                          addSuffix: true,
                        })}
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
                      onClick={() => handleThreadClick(message.id)}
                      className="space-x-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>
                        {state.threads[message.id]?.replies.length || 0} Replies
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(message.id, '👍')}
                      className="space-x-1"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>
                        {
                          message.reactions.filter((r) => r.emoji === '👍')
                            .length
                        }
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
                        {
                          message.reactions.filter((r) => r.emoji === '❤️')
                            .length
                        }
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <MessageComposer tribeId={tribeId} />
      </div>

      {state.activeThreadId && (
        <MessageThread
          tribeId={tribeId}
          threadId={state.activeThreadId}
          onClose={() => dispatch({ type: 'SET_ACTIVE_THREAD', threadId: null })}
        />
      )}
    </div>
  );
}
