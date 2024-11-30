import { Tribe } from '@/types/tribes';

export const INTELLISYNC_TRIBE_ID = 'intellisync-community-tribe';

export const defaultTribe: Tribe = {
  id: INTELLISYNC_TRIBE_ID,
  name: 'IntelliSync Community',
  description: 'Welcome to the official IntelliSync Community! Join us in exploring AI, sharing insights, and building the future of intelligent collaboration.',
  image: '/intellisync-banner.jpg', // You'll need to add this image to public folder
  category: 'Technology',
  members: 1,
  isVerified: true,
  privacy: 'public',
  memberApproval: 'automatic',
  createdAt: new Date().toISOString(),
  owner: {
    id: 'system',
    name: 'IntelliSync',
    role: 'Owner',
    avatar: '/intellisync-logo.png', // You'll need to add this image to public folder
  },
  tags: ['AI', 'Technology', 'Community', 'Innovation'],
  features: ['Discussions', 'Events', 'Polls', 'Resources'],
  engagement: {
    posts: 0,
    activeMembers: 1,
    weeklyGrowth: 0,
    lastActivity: new Date().toISOString(),
    totalPosts: 0,
    totalEvents: 0,
    totalPolls: 0,
    activeUsers: [],
    recentMilestones: [],
  },
  stats: {
    growth: 0,
    activeMembers: 1,
    postsPerWeek: 0,
    engagementRate: 0,
  },
  settings: {
    allowGuests: true,
    enablePolls: true,
    enableEvents: true,
    enableDiscussions: true,
  },
};
