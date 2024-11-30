import { v4 as uuidv4 } from 'uuid';
import { Tribe, TribeMember } from '@/types/tribes';
import { Activity, TribeEvent, Poll } from '@/types/engagement';
import { Achievement } from '@/types/gamification';

export function formatTribeName(name: string): string {
  // Remove any existing -tribe suffix to avoid duplication
  const baseName = name.replace(/-tribe$/, '');
  
  // Replace spaces and special characters with underscores
  const formattedName = baseName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
    
  return `${formattedName}-tribe`;
}

export function generateTribeId(name: string): string {
  const formattedName = formatTribeName(name);
  return `${formattedName}-${uuidv4()}`;
}

export function createNewTribe(tribeData: Partial<Tribe>): Tribe {
  const now = new Date().toISOString();
  const tribeName = tribeData.name || '';
  
  const owner: TribeMember = {
    id: '',
    name: '',
    role: 'Owner',
    avatar: '',
  };
  
  return {
    id: generateTribeId(tribeName),
    name: tribeName,
    description: '',
    image: 'https://source.unsplash.com/random/800x600/?community',
    category: '',
    members: [owner],
    isVerified: false,
    privacy: 'public',
    memberApproval: 'automatic',
    createdAt: now,
    owner,
    tags: [],
    features: ['Discussions', 'Events', 'Polls'],
    stats: {
      growth: 0,
      activeMembers: 1,
      postsPerWeek: 0,
      engagementRate: 0
    },
    engagement: {
      totalPosts: 0,
      totalEvents: 0,
      totalPolls: 0,
      weeklyGrowth: 0,
      recentMilestones: []
    },
    ...tribeData,
  };
}

export function initializeTribeEngagement(tribeId: string): {
  activities: Activity[];
  events: TribeEvent[];
  polls: Poll[];
  achievements: Achievement[];
} {
  const now = new Date();
  
  return {
    activities: [{
      id: `activity-${uuidv4()}`,
      tribeId,
      type: 'post' as const,
      content: {
        text: 'Welcome to our new tribe! 🎉',
        media: []
      },
      createdBy: 'system',
      createdAt: now,
      reactions: [],
      comments: []
    }],
    events: [{
      id: `event-${uuidv4()}`,
      tribeId,
      title: 'First Tribe Meetup',
      description: 'Join us for our first tribe gathering! Let\'s get to know each other and discuss our goals.',
      startDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      location: 'Virtual',
      isVirtual: true,
      attendees: [],
      organizer: 'system',
      status: 'upcoming' as const,
      createdAt: now
    }],
    polls: [{
      id: `poll-${uuidv4()}`,
      tribeId,
      question: 'What topics would you like to discuss in our tribe?',
      options: [
        { id: '1', text: 'Community Building', votes: 0 },
        { id: '2', text: 'Knowledge Sharing', votes: 0 },
        { id: '3', text: 'Project Collaboration', votes: 0 },
        { id: '4', text: 'Social Events', votes: 0 }
      ],
      createdBy: 'system',
      createdAt: now,
      endsAt: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      isActive: true,
      totalVotes: 0
    }],
    achievements: [{
      id: `achievement-${uuidv4()}`,
      name: 'Founder',
      description: 'Created this amazing tribe',
      icon: '👑',
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: 100
    }]
  };
}
