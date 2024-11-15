import { createContext, useContext, useReducer } from 'react';

interface MediaItem {
  type: 'image' | 'video' | 'file';
  url: string;
  name: string;
  size: number;
  mimeType?: string;
  thumbnail?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  media?: MediaItem[];
}

interface MessagesState {
  messages: Record<string, Message[]>;
  loading: boolean;
  error: string | null;
}

type MessagesAction =
  | { type: 'ADD_MESSAGE'; channelId: string; message: Message }
  | { type: 'SET_MESSAGES'; channelId: string; messages: Message[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string };

const initialState: MessagesState = {
  messages: {},
  loading: false,
  error: null,
};

const MessagesContext = createContext<{
  state: MessagesState;
  dispatch: React.Dispatch<MessagesAction>;
} | null>(null);

function messagesReducer(state: MessagesState, action: MessagesAction): MessagesState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.channelId]: [
            ...(state.messages[action.channelId] || []),
            action.message,
          ],
        },
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.channelId]: action.messages,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  return (
    <MessagesContext.Provider value={{ state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}