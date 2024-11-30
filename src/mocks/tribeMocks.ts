import { Tribe } from '@/types/tribes';
import { INTELLISYNC_TRIBE_ID } from '@/constants/defaultTribe';

export const mockTribes: Tribe[] = [
  {
    id: INTELLISYNC_TRIBE_ID,
    name: 'IntelliSync Community',
    description: 'Welcome to the official IntelliSync Community! Join us in exploring AI, sharing insights, and building the future of intelligent collaboration.',
    bannerImage: '/intellisync-banner.jpg',
    avatar: '/intellisync-logo.png',
    category: 'Technology',
    isVerified: true,
    privacy: 'public',
    memberApproval: 'automatic',
    members: [
      {
        id: '1',
        name: 'Chris June',
        role: 'Founder',
        avatar: '/avatars/chris.jpg',
        level: 'founder',
        joinedAt: '2023-01-01',
        contributions: 150,
        achievements: ['First Commit', 'Community Builder', 'AI Pioneer']
      },
      {
        id: '2',
        name: 'AI Assistant',
        role: 'AI Partner',
        avatar: '/avatars/ai-assistant.png',
        level: 'ai-partner',
        joinedAt: '2023-01-01',
        contributions: 500,
        achievements: ['24/7 Support', 'Knowledge Base', 'Quick Responder']
      }
    ],
    tags: ['AI', 'Technology', 'Innovation', 'Community', 'Professional Development'],
    rules: [
      'Be respectful and professional',
      'Share knowledge and insights',
      'No spam or self-promotion',
      'Keep discussions relevant',
      'Follow our code of conduct'
    ],
    features: [
      'AI Integration',
      'Skill Tracking',
      'Professional Networking',
      'Knowledge Sharing',
      'Community Events',
      'Resource Library',
      'Mentorship Programs',
      'Achievement System'
    ],
    stats: {
      growth: 25,
      activeMembers: 120,
      postsPerWeek: 45,
      engagementRate: 78
    },
    engagement: {
      totalPosts: 1250,
      totalEvents: 24,
      totalPolls: 36,
      weeklyGrowth: 5,
      recentMilestones: [
        'Reached 1000+ community posts',
        'Launched AI mentorship program',
        'Hosted first virtual conference',
        'Released community guidelines 2.0',
        'Introduced skill verification system'
      ]
    }
  },
  {
    id: 'tech-innovators',
    name: 'Tech Innovators',
    description: 'A community of technology enthusiasts and innovators building the future of collaborative development',
    bannerImage: '/placeholder-banner.jpg',
    avatar: '/placeholder-tribe.jpg',
    category: 'Technology',
    isVerified: true,
    privacy: 'public',
    memberApproval: 'automatic',
    members: [
      {
        id: 'chris-june',
        name: 'Chris June',
        role: 'Founder',
        avatar: '/placeholder-avatar.jpg',
        level: 'founder',
        joinedAt: '2024-01-15',
        contributions: 25,
        achievements: ['Community Creator', 'Tech Pioneer']
      },
      {
        id: 'member-2',
        name: 'Alex Chen',
        role: 'Member',
        avatar: '/placeholder-avatar.jpg',
        level: 'gold',
        joinedAt: '2024-01-16',
        contributions: 15,
        achievements: ['Early Adopter']
      }
    ],
    tags: ['Tech', 'Innovation', 'Development', 'Collaboration'],
    rules: [
      'Contribute constructively to discussions',
      'Share knowledge and experiences',
      'Support fellow innovators',
      'Maintain professional conduct'
    ],
    features: [
      'Technical Discussions',
      'Code Reviews',
      'Project Collaboration',
      'Innovation Challenges',
      'Tech Workshops',
      'Resource Sharing'
    ],
    stats: {
      growth: 15,
      activeMembers: 20,
      postsPerWeek: 25,
      engagementRate: 65
    },
    engagement: {
      totalPosts: 150,
      totalEvents: 8,
      totalPolls: 12,
      weeklyGrowth: 8,
      recentMilestones: [
        'Launched first tech workshop',
        'Reached 25 active members',
        'Started weekly code reviews',
        'Initiated innovation challenge program'
      ]
    }
  },
  {
    id: 'platform-builders',
    name: 'Platform Builders',
    description: 'Dedicated to building and improving the IntelliSync platform',
    bannerImage: '/placeholder-banner.jpg',
    avatar: '/placeholder-tribe.jpg',
    category: 'Development',
    isVerified: true,
    privacy: 'public',
    memberApproval: 'automatic',
    members: [
      {
        id: 'chris-june',
        name: 'Chris June',
        role: 'Lead Developer',
        avatar: '/placeholder-avatar.jpg',
        level: 'founder',
        joinedAt: '2024-01-20',
        contributions: 18,
        achievements: ['Platform Pioneer', 'First Deployment']
      }
    ],
    tags: ['Platform', 'Development', 'Coding', 'Community'],
    rules: [
      'Follow coding best practices',
      'Document your contributions',
      'Help review pull requests',
      'Share knowledge with others'
    ],
    features: [
      'Code Repository',
      'Documentation Hub',
      'CI/CD Pipeline',
      'Development Updates',
      'Bug Tracking',
      'Feature Planning'
    ],
    stats: {
      growth: 10,
      activeMembers: 12,
      postsPerWeek: 15,
      engagementRate: 72
    },
    engagement: {
      totalPosts: 85,
      totalEvents: 4,
      totalPolls: 6,
      weeklyGrowth: 6,
      recentMilestones: [
        'First stable release',
        'Documentation system launch',
        'CI/CD pipeline implementation',
        'Bug tracking system setup'
      ]
    }
  }
];

export const mockDiscoveredTribes: Tribe[] = [
  {
    id: 'tech-tribe',
    name: 'Tech Enthusiasts',
    description: 'A tribe for technology lovers',
    bannerImage: '/tribes/tech-banner.png',
    avatar: '/tribes/tech.png',
    category: 'Technology',
    isVerified: true,
    privacy: 'public',
    memberApproval: 'automatic',
    members: [
      {
        id: 'tech-lead',
        name: 'Tech Lead',
        role: 'Founder',
        avatar: '/avatars/tech-lead.png',
        level: 'founder',
        joinedAt: '2024-01-01',
        contributions: 75,
        achievements: ['Community Founder']
      }
    ],
    tags: ['Technology', 'Innovation'],
    features: [
      'Tech Events',
      'Community Polls',
      'Resource Sharing',
      'Tech Discussions'
    ],
    stats: {
      growth: 8,
      activeMembers: 30,
      postsPerWeek: 20,
      engagementRate: 60
    },
    engagement: {
      totalPosts: 75,
      totalEvents: 5,
      totalPolls: 8,
      weeklyGrowth: 3,
      recentMilestones: [
        'First tech meetup',
        'Reached 50 members',
        'Started weekly tech talks'
      ]
    }
  }
];
