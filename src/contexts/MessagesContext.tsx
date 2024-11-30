import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'file';
  url: string;
  name: string;
  size: number;
  mimeType: string;
  thumbnailUrl?: string;
}

export interface Mention {
  id: string;
  userId: string;
  username: string;
  startIndex: number;
  endIndex: number;
}

export interface Reaction {
  id: string;
  emoji: string;
  userId: string;
  username: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  tribeId: string;
  threadId?: string;
  parentId?: string;
  content: string;
  richContent?: {
    mentions: Mention[];
    links: { url: string; title?: string; preview?: string }[];
    formattedText: string;
  };
  attachments: Attachment[];
  sender: {
    id: string;
    username: string;
    avatar?: string;
  };
  reactions: Reaction[];
  timestamp: Date;
  edited?: Date;
  readBy: string[];
  isThreadStarter?: boolean;
  replyCount?: number;
}

export interface Thread {
  id: string;
  parentMessage: Message;
  replies: Message[];
  participantIds: string[];
  lastReplyAt: Date;
}

export interface CallParticipant {
  id: string;
  username: string;
  avatar?: string;
  isMuted: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
}

export interface Call {
  id: string;
  tribeId: string;
  type: 'audio' | 'video';
  status: 'connecting' | 'active' | 'ended';
  startTime: Date;
  endTime?: Date;
  participants: CallParticipant[];
  hostId: string;
  recordingUrl?: string;
}

interface MessagesState {
  messages: Record<string, Message>;
  threads: Record<string, Thread>;
  activeThreadId: string | null;
  unreadCount: number;
}

const initialState: MessagesState = {
  messages: {},
  threads: {},
  activeThreadId: null,
  unreadCount: 0,
};

type MessagesAction =
  | { type: 'SET_MESSAGES'; messages: Message[] }
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'UPDATE_MESSAGE'; messageId: string; updates: Partial<Message> }
  | { type: 'DELETE_MESSAGE'; messageId: string }
  | { type: 'SET_ACTIVE_THREAD'; threadId: string | null }
  | { type: 'ADD_THREAD'; thread: Thread }
  | { type: 'UPDATE_THREAD'; threadId: string; updates: Partial<Thread> }
  | { type: 'DELETE_THREAD'; threadId: string }
  | { type: 'MARK_AS_READ'; tribeId: string; messageIds: string[] }
  | { type: 'ADD_REACTION'; tribeId: string; messageId: string; reaction: Reaction };

const MessagesContext = createContext<{
  state: MessagesState;
  dispatch: React.Dispatch<MessagesAction>;
} | null>(null);

export function MessagesProvider({ children }: { children: ReactNode }) {
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

function messagesReducer(state: MessagesState, action: MessagesAction): MessagesState {
  switch (action.type) {
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.messages.reduce((acc, message) => {
          acc[message.id] = message;
          return acc;
        }, {} as Record<string, Message>),
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.message.id]: action.message,
        },
        unreadCount: state.unreadCount + 1,
      };

    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.messageId]: {
            ...state.messages[action.messageId],
            ...action.updates,
          },
        },
      };

    case 'DELETE_MESSAGE':
      const { [action.messageId]: _, ...remainingMessages } = state.messages;
      return {
        ...state,
        messages: remainingMessages,
      };

    case 'SET_ACTIVE_THREAD':
      return {
        ...state,
        activeThreadId: action.threadId,
      };

    case 'ADD_THREAD':
      return {
        ...state,
        threads: {
          ...state.threads,
          [action.thread.id]: action.thread,
        },
      };

    case 'UPDATE_THREAD':
      return {
        ...state,
        threads: {
          ...state.threads,
          [action.threadId]: {
            ...state.threads[action.threadId],
            ...action.updates,
          },
        },
      };

    case 'DELETE_THREAD':
      const { [action.threadId]: __, ...remainingThreads } = state.threads;
      return {
        ...state,
        threads: remainingThreads,
        activeThreadId: state.activeThreadId === action.threadId ? null : state.activeThreadId,
      };

    case 'MARK_AS_READ':
      const updatedMessages = { ...state.messages };
      action.messageIds.forEach((id) => {
        if (updatedMessages[id]) {
          updatedMessages[id] = {
            ...updatedMessages[id],
            readBy: [...new Set([...updatedMessages[id].readBy, 'current-user-id'])],
          };
        }
      });
      return {
        ...state,
        messages: updatedMessages,
        unreadCount: Math.max(0, state.unreadCount - action.messageIds.length),
      };

    case 'ADD_REACTION':
      const message = state.messages[action.messageId];
      if (!message) return state;

      const existingReactionIndex = message.reactions.findIndex(
        (r) => r.userId === action.reaction.userId && r.emoji === action.reaction.emoji
      );

      const updatedReactions =
        existingReactionIndex === -1
          ? [...message.reactions, action.reaction]
          : message.reactions.filter((_, index) => index !== existingReactionIndex);

      return {
        ...state,
        messages: {
          ...state.messages,
          [action.messageId]: {
            ...message,
            reactions: updatedReactions,
          },
        },
      };

    default:
      return state;
  }
}