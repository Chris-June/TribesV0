import { MemberProgress } from './gamification';

export interface TribeMember {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  level?: 'founder' | 'ai-partner' | 'gold' | 'silver' | 'bronze';
  joinedAt?: string;
  contributions?: number;
  achievements?: string[];
  progress?: MemberProgress;
}

export interface TribeStats {
  growth: number;
  activeMembers: number;
  postsPerWeek: number;
  engagementRate: number;
}

export interface TribeEngagement {
  totalPosts: number;
  totalEvents: number;
  totalPolls: number;
  weeklyGrowth: number;
  recentMilestones: string[];
}

export interface Tribe {
  id: string;
  name: string;
  description: string;
  image?: string;
  bannerImage?: string;
  avatar?: string;
  category: string;
  members: TribeMember[];
  isVerified?: boolean;
  privacy: 'public' | 'private';
  memberApproval: 'automatic' | 'manual';
  tags?: string[];
  rules?: string[];
  createdAt?: string;
  owner?: TribeMember;
  features?: string[];
  stats?: TribeStats;
  engagement?: TribeEngagement;
}

export interface TribeJoinRequest {
  tribeId: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface LeaderboardMember {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: string;
  rank: number;
}
