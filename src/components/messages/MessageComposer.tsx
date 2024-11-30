import { useState, useRef, useCallback } from 'react';
import { useMessages } from '@/contexts/MessagesContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Image,
  File,
  Mic,
  Video,
  Smile,
  AtSign,
  Send,
  X,
  Upload,
  Paperclip,
} from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface MessageComposerProps {
  tribeId: string;
  threadId?: string;
  parentId?: string;
  onSend?: () => void;
}

export default function MessageComposer({
  tribeId,
  threadId,
  parentId,
  onSend,
}: MessageComposerProps) {
  const { dispatch } = useMessages();
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const file = new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' });
        setAttachments([...attachments, file]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setContent(content + emoji.native);
    setShowEmojiPicker(false);
  };

  const uploadAttachments = async (files: File[]): Promise<string[]> => {
    // TODO: Implement actual file upload logic
    return files.map(file => URL.createObjectURL(file));
  };

  const handleSend = async () => {
    if (!content.trim() && attachments.length === 0) return;

    const uploadedUrls = await uploadAttachments(attachments);
    const messageAttachments = attachments.map((file, index) => ({
      id: Date.now().toString() + index,
      type: file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
        ? 'video'
        : file.type.startsWith('audio/')
        ? 'audio'
        : 'file',
      url: uploadedUrls[index],
      name: file.name,
      size: file.size,
      mimeType: file.type,
    }));

    const message = {
      id: Date.now().toString(),
      tribeId,
      threadId,
      parentId,
      content,
      attachments: messageAttachments,
      sender: {
        id: 'current-user-id', // Replace with actual user ID
        username: 'Current User', // Replace with actual username
      },
      reactions: [],
      timestamp: new Date(),
      readBy: ['current-user-id'], // Replace with actual user ID
    };

    dispatch({
      type: 'SEND_MESSAGE',
      tribeId,
      message,
    });

    setContent('');
    setAttachments([]);
    onSend?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4 space-y-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <span className="max-w-[150px] truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4"
                onClick={() => handleRemoveAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[80px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? 'text-red-500' : ''}
          >
            <Mic className="h-5 w-5" />
          </Button>

          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="light"
              />
            </PopoverContent>
          </Popover>

          <Button onClick={handleSend} disabled={!content.trim() && attachments.length === 0}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
