import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';

export default function Tribe() {
  const { id = 'general' } = useParams();
  const {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    handleMediaUpload,
  } = useChat(id);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      <div className="w-60 border-r bg-card flex flex-col">
        <div className="p-4">
          <h2 className="font-semibold text-lg">Gaming Tribe</h2>
          <p className="text-sm text-muted-foreground">A place for gamers</p>
        </div>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Channels</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  general
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  announcements
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Members</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Online (23)
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Tribe Settings
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-card">
          <h3 className="font-semibold"># general</h3>
          <p className="text-sm text-muted-foreground">
            General discussion for all tribe members
          </p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} index={index} />
            ))}
          </div>
        </ScrollArea>

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          onMediaUpload={handleMediaUpload}
        />
      </div>
    </div>
  );
}