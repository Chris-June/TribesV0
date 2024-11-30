export type ExpertiseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';

export interface SkillEndorsement {
  endorserId: string;
  endorserName: string;
  endorserAvatar?: string;
  endorserLevel: ExpertiseLevel;
  endorsementDate: Date;
  comment?: string;
}

export interface ExpertiseArea {
  name: string;
  level: ExpertiseLevel;
  experiencePoints: number;
  pointsToNextLevel: number;
  endorsements: SkillEndorsement[];
  lastUsed: Date;
  verified: boolean;
}

export interface KnowledgeNode {
  id: string;
  name: string;
  level: ExpertiseLevel;
  connections: string[]; // IDs of related nodes
  strengthScore: number; // 0-100
}

export interface ExpertiseMetrics {
  primarySkills: ExpertiseArea[];
  knowledgeGraph: KnowledgeNode[];
  totalEndorsements: number;
  verifiedSkills: number;
  contributionQuality: {
    accuracy: number; // 0-100
    helpfulness: number; // 0-100
    clarity: number; // 0-100
    consistency: number; // 0-100
  };
  expertiseScore: number; // 0-100
  topContributionAreas: {
    area: string;
    contributions: number;
    impact: number; // 0-100
  }[];
}
