export interface Tribe {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  memberCount: number;
  category: string;
  avatar: string;
  bannerImage: string;
  tags: string[];
  rules: string[];
  privacyLevel: 'public' | 'private' | 'invite-only';
}

export interface TribeMember {
  id: string;
  name: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  avatar: string;
  contributions: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

export interface TribeInvite {
  id: string;
  tribeId: string;
  inviterId: string;
  inviteeId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  expiresAt: Date;
}

export interface TribeActivity {
  id: string;
  tribeId: string;
  userId: string;
  type: 'join' | 'leave' | 'post' | 'comment' | 'achievement';
  timestamp: Date;
  metadata?: Record<string, any>;
}
