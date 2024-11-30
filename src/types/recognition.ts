export type RecognitionType = 
  | 'solution' 
  | 'innovation' 
  | 'mentorship' 
  | 'contribution' 
  | 'leadership';

export type CommunityRole = 
  | 'member'
  | 'contributor'
  | 'mentor'
  | 'expert'
  | 'leader'
  | 'ambassador';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: RecognitionType;
  dateEarned: Date;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: {
    current: number;
    total: number;
  };
}

export interface Recognition {
  id: string;
  type: RecognitionType;
  title: string;
  description: string;
  awardedBy: {
    id: string;
    name: string;
    avatar?: string;
    role: CommunityRole;
  };
  dateAwarded: Date;
  tribe?: {
    id: string;
    name: string;
  };
  impact: number; // 0-100
}

export interface FeaturedContribution {
  id: string;
  title: string;
  description: string;
  type: 'post' | 'solution' | 'resource' | 'initiative';
  dateCreated: Date;
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  tribe?: {
    id: string;
    name: string;
  };
  impact: number; // 0-100
}

export interface CommunityRecognition {
  reputationScore: number;
  helpPoints: number;
  role: CommunityRole;
  achievements: Achievement[];
  recognitions: Recognition[];
  featuredContributions: FeaturedContribution[];
  specialStatus: string[];
  impactScore: number; // 0-100
  memberSince: Date;
  trustScore: number; // 0-100
  weeklyRank?: number;
  monthlyRank?: number;
}
