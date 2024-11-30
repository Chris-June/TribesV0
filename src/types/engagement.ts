import { Achievement } from './gamification';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  tribeId: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  createdAt: Date;
  endsAt?: Date;
  isActive: boolean;
  totalVotes: number;
  userVote?: string;
}

export interface UserActivityMetrics {
  timeZone: string;
  activeHours: {
    start: string; // 24-hour format e.g., "09:00"
    end: string;
  };
  responseRate: number; // Percentage
  lastActive: Date;
  activityStreak: {
    current: number;
    longest: number;
    lastUpdated: Date;
  };
  activeTribes: {
    tribeId: string;
    tribeName: string;
    activityScore: number; // 0-100
    lastInteraction: Date;
  }[];
  topicEngagement: {
    topic: string;
    posts: number;
    reactions: number;
    comments: number;
  }[];
  onlineStatus: 'online' | 'away' | 'offline' | 'do_not_disturb';
}

export interface UserEngagementStats {
  dailyActivityScore: number; // 0-100
  weeklyParticipation: number; // Hours
  monthlyContributions: number;
  averageResponseTime: number; // Minutes
  consistencyScore: number; // 0-100
}

export interface TribeEvent {
  id: string;
  tribeId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  isVirtual: boolean;
  attendees: string[];
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface ActivityContent {
  post?: {
    text: string;
    media?: { type: 'image' | 'video'; url: string }[];
  };
  event?: TribeEvent;
  poll?: Poll;
  achievement?: Achievement;
  member_joined?: {
    memberId: string;
    memberName: string;
    joinDate: Date;
  };
  milestone?: {
    title: string;
    description: string;
    value: number;
    target: number;
  };
}

export interface Activity {
  id: string;
  tribeId: string;
  type: keyof ActivityContent;
  content: ActivityContent[keyof ActivityContent];
  createdBy: string;
  createdAt: Date;
  reactions: {
    type: string;
    count: number;
    users: string[];
  }[];
  comments: {
    id: string;
    content: string;
    createdBy: string;
    createdAt: Date;
  }[];
}
