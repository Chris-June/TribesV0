import { MemberLevel } from '@/types/gamification';

export const POINTS = {
  POST_CREATE: 10,
  POST_LIKE_RECEIVED: 2,
  POST_SHARE_RECEIVED: 5,
  COMMENT_CREATE: 5,
  COMMENT_LIKE_RECEIVED: 1,
  DAILY_LOGIN: 3,
  PROFILE_COMPLETE: 20,
  INVITE_ACCEPTED: 15,
  FIRST_POST: 25,
  FIRST_COMMENT: 15,
} as const;

export const LEVEL_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 500,
  GOLD: 2000,
  PLATINUM: 5000,
  DIAMOND: 10000,
} as const;

export const BADGES = {
  EARLY_ADOPTER: {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'Joined during the platform\'s early days',
    icon: '🌟',
  },
  CONVERSATION_STARTER: {
    id: 'conversation_starter',
    name: 'Conversation Starter',
    description: 'Created 10 posts that received responses',
    icon: '💭',
  },
  HELPFUL_HAND: {
    id: 'helpful_hand',
    name: 'Helpful Hand',
    description: 'Received 50 likes on comments',
    icon: '🤝',
  },
  TRIBE_LEADER: {
    id: 'tribe_leader',
    name: 'Tribe Leader',
    description: 'Maintained top contributor status for a month',
    icon: '👑',
  },
  CONTENT_CREATOR: {
    id: 'content_creator',
    name: 'Content Creator',
    description: 'Created 50 posts with media',
    icon: '🎨',
  },
  ENGAGEMENT_EXPERT: {
    id: 'engagement_expert',
    name: 'Engagement Expert',
    description: 'Received 1000 total engagement points',
    icon: '⭐',
  },
  COMMUNITY_PILLAR: {
    id: 'community_pillar',
    name: 'Community Pillar',
    description: 'Active member for 6 months with consistent engagement',
    icon: '🏛️',
  },
} as const;

export function calculateLevel(points: number): MemberLevel {
  if (points >= LEVEL_THRESHOLDS.DIAMOND) return 'diamond';
  if (points >= LEVEL_THRESHOLDS.PLATINUM) return 'platinum';
  if (points >= LEVEL_THRESHOLDS.GOLD) return 'gold';
  if (points >= LEVEL_THRESHOLDS.SILVER) return 'silver';
  return 'bronze';
}

export function calculateNextLevelProgress(points: number): {
  currentLevel: MemberLevel;
  nextLevel: MemberLevel | null;
  progress: number;
  pointsNeeded: number;
} {
  const currentLevel = calculateLevel(points);
  let nextLevel: MemberLevel | null = null;
  let nextThreshold = 0;

  switch (currentLevel) {
    case 'bronze':
      nextLevel = 'silver';
      nextThreshold = LEVEL_THRESHOLDS.SILVER;
      break;
    case 'silver':
      nextLevel = 'gold';
      nextThreshold = LEVEL_THRESHOLDS.GOLD;
      break;
    case 'gold':
      nextLevel = 'platinum';
      nextThreshold = LEVEL_THRESHOLDS.PLATINUM;
      break;
    case 'platinum':
      nextLevel = 'diamond';
      nextThreshold = LEVEL_THRESHOLDS.DIAMOND;
      break;
    case 'diamond':
      nextLevel = null;
      nextThreshold = points;
      break;
  }

  const currentThreshold = LEVEL_THRESHOLDS[currentLevel.toUpperCase() as keyof typeof LEVEL_THRESHOLDS];
  const progress = nextLevel
    ? ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    : 100;

  return {
    currentLevel,
    nextLevel,
    progress,
    pointsNeeded: nextThreshold - points,
  };
}

export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
}
