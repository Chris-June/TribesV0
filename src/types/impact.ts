export type ImpactCategory = 
  | 'technical' 
  | 'educational' 
  | 'community' 
  | 'innovation' 
  | 'leadership';

export type ResourceType = 
  | 'tutorial' 
  | 'guide' 
  | 'documentation' 
  | 'code-sample' 
  | 'template' 
  | 'tool';

export type InitiativeStatus = 'planned' | 'in-progress' | 'completed' | 'ongoing';

export interface Solution {
  id: string;
  title: string;
  description: string;
  category: ImpactCategory;
  dateCreated: Date;
  complexity: 'basic' | 'intermediate' | 'advanced';
  peopleHelped: number;
  upvotes: number;
  adoptions: number;
  tribe?: {
    id: string;
    name: string;
  };
  tags: string[];
}

export interface HelpMetric {
  id: string;
  recipient: {
    id: string;
    name: string;
    avatar?: string;
  };
  type: 'solution' | 'mentoring' | 'review' | 'guidance';
  date: Date;
  duration?: number; // in minutes
  impact: number; // 0-100
  feedback?: string;
  tribe?: {
    id: string;
    name: string;
  };
}

export interface SharedResource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  dateShared: Date;
  category: ImpactCategory;
  reach: number;
  downloads: number;
  likes: number;
  comments: number;
  reuses: number;
  tribe?: {
    id: string;
    name: string;
  };
  tags: string[];
}

export interface CommunityInitiative {
  id: string;
  title: string;
  description: string;
  status: InitiativeStatus;
  startDate: Date;
  endDate?: Date;
  category: ImpactCategory;
  participants: number;
  engagement: number; // 0-100
  impact: number; // 0-100
  outcomes: string[];
  tribe?: {
    id: string;
    name: string;
  };
}

export interface Innovation {
  id: string;
  title: string;
  description: string;
  category: ImpactCategory;
  dateProposed: Date;
  dateImplemented?: Date;
  status: 'proposed' | 'in-review' | 'approved' | 'implemented';
  impact: number; // 0-100
  adoption: number; // 0-100
  contributors: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: string;
  }>;
  benefits: string[];
  tribe?: {
    id: string;
    name: string;
  };
}

export interface CategoryMetrics {
  category: ImpactCategory;
  solutions: number;
  peopleHelped: number;
  resources: number;
  initiatives: number;
  innovations: number;
  totalImpact: number; // 0-100
  growth: number; // percentage
}

export interface ImpactMetrics {
  solutions: {
    total: Solution[];
    byComplexity: Record<Solution['complexity'], number>;
    totalPeopleHelped: number;
    averageImpact: number;
    topSolutions: Solution[];
  };
  helpMetrics: {
    total: HelpMetric[];
    byType: Record<HelpMetric['type'], number>;
    totalHoursSpent: number;
    averageImpact: number;
    recentHelp: HelpMetric[];
  };
  resources: {
    total: SharedResource[];
    byType: Record<ResourceType, number>;
    totalReach: number;
    totalReuses: number;
    popularResources: SharedResource[];
  };
  initiatives: {
    total: CommunityInitiative[];
    byStatus: Record<InitiativeStatus, number>;
    totalParticipants: number;
    averageEngagement: number;
    activeInitiatives: CommunityInitiative[];
  };
  innovations: {
    total: Innovation[];
    byStatus: Record<Innovation['status'], number>;
    averageImpact: number;
    averageAdoption: number;
    keyInnovations: Innovation[];
  };
  categoryMetrics: CategoryMetrics[];
  overallImpact: {
    score: number; // 0-100
    trend: number; // percentage
    ranking?: number;
    highlights: string[];
  };
}
