export type ConnectionStrength = 'weak' | 'moderate' | 'strong';
export type DomainExpertise = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'thought-leader';
export type ConnectionType = 'mentor' | 'peer' | 'mentee' | 'collaborator' | 'influencer';

export interface NetworkConnection {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  role: string;
  connectionType: ConnectionType;
  strength: ConnectionStrength;
  lastInteraction: Date;
  commonTribes: string[];
  commonProjects: number;
  collaborationScore: number; // 0-100
  domains: string[];
}

export interface CollaborationMetric {
  type: string;
  count: number;
  impact: number; // 0-100
}

export interface DomainExpertStatus {
  domain: string;
  level: DomainExpertise;
  endorsements: number;
  contributions: number;
  impact: number; // 0-100
  trending: boolean;
  relatedDomains: string[];
}

export interface CrossFunctionalMetric {
  domain: string;
  connections: number;
  projects: number;
  impact: number; // 0-100
  growth: number; // percentage
}

export interface InfluenceMetrics {
  overall: number; // 0-100
  reach: number;
  engagement: number;
  adoption: number;
  citations: number;
  trending: number; // percentage change
  topDomains: string[];
}

export interface NetworkMetrics {
  totalConnections: number;
  activeConnections: number;
  connectionsByType: Record<ConnectionType, number>;
  connectionsByStrength: Record<ConnectionStrength, number>;
  reachScore: number; // 0-100
  diversityScore: number; // 0-100
  growthRate: number; // percentage
}

export interface NetworkAnalysis {
  connections: NetworkConnection[];
  metrics: NetworkMetrics;
  influence: InfluenceMetrics;
  domainExpertise: DomainExpertStatus[];
  crossFunctional: CrossFunctionalMetric[];
  collaboration: CollaborationMetric[];
  recommendedConnections: NetworkConnection[];
}
