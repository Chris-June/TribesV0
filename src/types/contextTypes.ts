import { Activity, TribeEvent, Poll } from './engagement';
import { Achievement, MemberProgress } from './gamification';
import { BADGES } from '@/lib/gamification';

export type { Activity, TribeEvent, Poll, Achievement };

export interface TribeMilestone {
  id: string;
  type: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: {
    type: string;
    value: string;
  };
  unlocksAt: number;
  celebrationDate?: Date;
}

export interface Insight {
  id: string;
  type: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  timeframe: 'daily' | 'weekly' | 'monthly';
  details: {
    label: string;
    value: number;
  }[];
}

export interface EngagementState {
  activities: {
    [tribeId: string]: Activity[];
  };
  events: {
    [tribeId: string]: TribeEvent[];
  };
  polls: {
    [tribeId: string]: Poll[];
  };
  achievements: {
    [tribeId: string]: Achievement[];
  };
  loading: boolean;
  error: string | null;
}

export interface TribeInitData {
  activities: Activity[];
  events: TribeEvent[];
  polls: Poll[];
  achievements: Achievement[];
}

export type EngagementAction =
  | { type: 'INITIALIZE_TRIBE'; payload: { tribeId: string; data: TribeInitData } }
  | { type: 'ADD_ACTIVITY'; payload: { tribeId: string; activity: Activity } }
  | { type: 'SET_ACTIVITIES'; tribeId: string; activities: Activity[] }
  | { type: 'ADD_EVENT'; payload: { tribeId: string; event: TribeEvent } }
  | { type: 'UPDATE_EVENT'; tribeId: string; event: TribeEvent }
  | { type: 'ADD_POLL'; payload: { tribeId: string; poll: Poll } }
  | { type: 'VOTE_POLL'; tribeId: string; pollId: string; optionId: string; userId: string }
  | { type: 'ADD_ACHIEVEMENT'; payload: { tribeId: string; achievement: Achievement } }
  | { type: 'GRANT_ACHIEVEMENT'; tribeId: string; achievementId: string; userId: string }
  | { type: 'ADD_REACTION'; tribeId: string; activityId: string; reaction: string; userId: string }
  | { type: 'ADD_COMMENT'; tribeId: string; activityId: string; comment: Activity['comments'][0] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

export interface EngagementContextType {
  state: EngagementState;
  dispatch: React.Dispatch<EngagementAction>;
  milestones: {
    getMilestones: (tribeId: string) => TribeMilestone[];
    updateMilestone: (tribeId: string, milestoneId: string, progress: number) => void;
    claimReward: (tribeId: string, milestoneId: string) => void;
  };
  insights: {
    getInsights: (tribeId: string, timeframe: 'daily' | 'weekly' | 'monthly') => Insight[];
    refreshInsights: (tribeId: string) => void;
  };
  initializeEngagement: (tribeId: string) => Promise<void>;
  addActivity: (tribeId: string, activity: Activity) => void;
  addEvent: (tribeId: string, event: TribeEvent) => void;
  addPoll: (tribeId: string, poll: Poll) => void;
  addAchievement: (tribeId: string, achievement: Achievement) => void;
  memberProgress: MemberProgress;
  achievements: Achievement[];
  addPoints: (amount: number, reason: string) => void;
  awardBadge: (badgeId: keyof typeof BADGES) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
}
