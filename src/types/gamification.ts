export type MemberLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
};

export type MemberProgress = {
  currentLevel: MemberLevel;
  nextLevel: MemberLevel | null;
  progress: number;
  pointsNeeded: number;
  totalPoints: number;
  recentPoints: {
    amount: number;
    reason: string;
    timestamp: Date;
  }[];
  badges: Badge[];
  achievements: Achievement[];
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: number;
};
