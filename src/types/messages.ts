export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'file';
  url: string;
  name: string;
  size: number;
  mimeType: string;
  metadata?: Record<string, any>;
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
  content: string;
  sender: User;
  timestamp: Date;
  attachments: Attachment[];
  reactions: Reaction[];
  readBy: string[];
  threadId?: string;
  edited?: boolean;
  editedAt?: Date;
  deletedAt?: Date;
  metadata?: Record<string, any>;
}

export interface Thread {
  id: string;
  parentMessage: Message;
  replies: Message[];
  createdAt: Date;
  lastReplyAt: Date;
  metadata?: Record<string, any>;
}

export interface Call {
  id: string;
  tribeId: string;
  type: 'audio' | 'video';
  status: 'ringing' | 'ongoing' | 'ended';
  startTime: Date;
  endTime?: Date;
  participants: CallParticipant[];
  metadata?: Record<string, any>;
}

export interface CallParticipant {
  id: string;
  user: User;
  status: 'connecting' | 'connected' | 'disconnected';
  joinedAt: Date;
  leftAt?: Date;
  audioEnabled: boolean;
  videoEnabled: boolean;
  metadata?: Record<string, any>;
}
