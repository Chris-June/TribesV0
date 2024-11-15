import { useRef, useEffect, useState } from 'react';
import { SendHorizontal, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import MediaUpload from './MediaUpload';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onMediaUpload?: (files: File[]) => void;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onKeyPress,
  onMediaUpload,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [value]);

  const handleMediaUpload = (files: File[]) => {
    if (onMediaUpload) {
      onMediaUpload(files);
    }
  };

  return (
    <>
      <div className="p-4 border-t bg-card">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyPress}
              placeholder="Type your message..."
              className="min-h-[44px] max-h-[200px] resize-none pr-24 bg-background"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setMediaDialogOpen(true)}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload media</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add emoji</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <Button
            onClick={onSend}
            disabled={!value.trim()}
            size="icon"
            className="h-[44px]"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
          </DialogHeader>
          <MediaUpload
            onUpload={handleMediaUpload}
            onClose={() => setMediaDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}