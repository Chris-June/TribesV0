import { useState, useCallback } from 'react';
import { useMessages, Message } from '@/contexts/MessagesContext';

// Simulated user data - in a real app, this would come from auth
const currentUser = {
  id: 'current-user',
  name: 'John Doe',
  avatar: 'https://source.unsplash.com/random/100x100?face=1',
};

export function useChat(channelId: string) {
  const { state, dispatch } = useMessages();
  const [inputValue, setInputValue] = useState('');

  const messages = state.messages[channelId] || [];

  const sendMessage = useCallback(
    (content: string, media?: File[]) => {
      if (!content.trim() && (!media || media.length === 0)) return;

      // In a real app, you would upload the files to a storage service
      // and get back URLs. This is just for demonstration.
      const mediaItems = media?.map((file) => ({
        type: file.type.startsWith('image/')
          ? 'image'
          : file.type.startsWith('video/')
          ? 'video'
          : 'file',
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        mimeType: file.type,
        thumbnail: file.type.startsWith('video/')
          ? 'https://source.unsplash.com/random/400x300?video'
          : undefined,
      }));

      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        user: currentUser,
        media: mediaItems,
      };

      dispatch({ type: 'ADD_MESSAGE', channelId, message: newMessage });

      // In a real app, you would send the message to your backend here
      // and only add it to the state after successful confirmation
    },
    [channelId, dispatch]
  );

  const handleSendMessage = useCallback(() => {
    sendMessage(inputValue);
    setInputValue('');
  }, [inputValue, sendMessage]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleMediaUpload = useCallback(
    (files: File[]) => {
      sendMessage('', files);
    },
    [sendMessage]
  );

  return {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    handleMediaUpload,
  };
}