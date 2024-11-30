import { Activity, TribeEvent, Poll, Achievement } from '@/contexts/EngagementContext';
import { UserActivityMetrics, UserEngagementStats } from '@/types/engagement';
import { ExpertiseMetrics } from '@/types/expertise';

export const mockActivities: { [tribeId: string]: Activity[] } = {
  'intellisync-tribe': [
    {
      id: 'activity-1',
      tribeId: 'intellisync-tribe',
      type: 'post',
      content: {
        text: 'Welcome to the IntelliSync Tribe! This is the central hub for all IntelliSync members. 🌟',
        media: []
      },
      createdBy: 'admin',
      createdAt: new Date('2024-01-01'),
      reactions: [
        { type: '👋', count: 25, users: Array.from({ length: 25 }, (_, i) => `user-${i + 1}`) },
        { type: '❤️', count: 15, users: Array.from({ length: 15 }, (_, i) => `user-${i + 1}`) }
      ],
      comments: [
        {
          id: 'comment-1',
          content: 'Excited to be part of this community!',
          createdBy: 'user-1',
          createdAt: new Date('2024-01-01T01:00:00')
        }
      ]
    },
    {
      id: 'activity-2',
      tribeId: 'intellisync-tribe',
      type: 'achievement',
      content: {
        id: 'achievement-1',
        name: 'Community Milestone',
        description: 'Reached 100 active members!',
        icon: '🎉',
        progress: 100,
        maxProgress: 100,
        completed: true,
        reward: 1000
      },
      createdBy: 'system',
      createdAt: new Date('2024-01-10'),
      reactions: [
        { type: '🎉', count: 30, users: Array.from({ length: 30 }, (_, i) => `user-${i + 1}`) }
      ],
      comments: []
    }
  ],
  'tribe-1': [
    {
      id: 'activity-1',
      tribeId: 'tribe-1',
      type: 'post',
      content: {
        text: 'Welcome to our tribe! Let\'s build something amazing together.',
        media: []
      },
      createdBy: 'user-1',
      createdAt: new Date('2024-01-15'),
      reactions: [
        { type: '👍', count: 5, users: ['user-2', 'user-3', 'user-4', 'user-5', 'user-6'] },
        { type: '❤️', count: 3, users: ['user-7', 'user-8', 'user-9'] }
      ],
      comments: [
        {
          id: 'comment-1',
          content: 'Excited to be here!',
          createdBy: 'user-2',
          createdAt: new Date('2024-01-15T01:00:00')
        }
      ]
    },
    {
      id: 'activity-2',
      tribeId: 'tribe-1',
      type: 'member_joined',
      content: {
        memberId: 'member-1',
        memberName: 'Sarah Chen',
        joinDate: new Date('2024-01-16')
      },
      createdBy: 'user-2',
      createdAt: new Date('2024-01-16'),
      reactions: [],
      comments: []
    },
    {
      id: 'activity-3',
      tribeId: 'tribe-1',
      type: 'achievement',
      content: {
        id: 'achievement-1',
        name: 'First Milestone',
        description: 'Reached 100 active members!',
        icon: '🎉',
        progress: 100,
        maxProgress: 100,
        completed: true,
        reward: 1000
      },
      createdBy: 'system',
      createdAt: new Date('2024-01-17'),
      reactions: [
        { type: '🎉', count: 10, users: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'] }
      ],
      comments: []
    }
  ],
  'intellisync-innovators': [
    {
      id: 'activity-1',
      tribeId: 'intellisync-innovators',
      type: 'post',
      content: {
        text: 'Excited to announce our new AI-powered features coming soon!',
        media: []
      },
      createdBy: 'system',
      createdAt: new Date('2024-01-15'),
      reactions: [
        { type: '🚀', count: 15, users: Array.from({ length: 15 }, (_, i) => `user-${i + 1}`) },
        { type: '🎉', count: 10, users: Array.from({ length: 10 }, (_, i) => `user-${i + 1}`) }
      ],
      comments: [
        {
          id: 'comment-1',
          content: 'Can\'t wait to try them out!',
          createdBy: 'user-1',
          createdAt: new Date('2024-01-15T02:00:00')
        }
      ]
    },
    {
      id: 'activity-2',
      tribeId: 'intellisync-innovators',
      type: 'event',
      content: {
        id: 'event-1',
        tribeId: 'intellisync-innovators',
        title: 'AI Innovation Workshop',
        description: 'Join us for a hands-on workshop exploring the latest in AI technology.',
        startDate: new Date('2024-02-01T15:00:00'),
        endDate: new Date('2024-02-01T17:00:00'),
        location: 'Virtual',
        isVirtual: true,
        attendees: Array.from({ length: 25 }, (_, i) => `user-${i + 1}`),
        organizer: 'system',
        status: 'upcoming' as const,
        createdAt: new Date('2024-01-16')
      },
      createdBy: 'system',
      createdAt: new Date('2024-01-16'),
      reactions: [],
      comments: []
    }
  ]
};

export const mockEvents: { [tribeId: string]: TribeEvent[] } = {
  'intellisync-tribe': [
    {
      id: 'event-1',
      tribeId: 'intellisync-tribe',
      title: 'IntelliSync Community Summit',
      description: 'Join us for our flagship community event where we\'ll discuss the future of IntelliSync and showcase upcoming features!',
      startDate: new Date('2024-02-15T15:00:00'),
      endDate: new Date('2024-02-15T18:00:00'),
      location: 'Virtual',
      isVirtual: true,
      attendees: Array.from({ length: 50 }, (_, i) => `user-${i + 1}`),
      organizer: 'admin',
      status: 'upcoming' as const,
      createdAt: new Date('2024-01-15')
    }
  ],
  'tribe-1': [
    {
      id: 'event-1',
      tribeId: 'tribe-1',
      title: 'Community Meetup',
      description: 'Join us for our monthly community gathering!',
      startDate: new Date('2024-02-01T18:00:00'),
      endDate: new Date('2024-02-01T20:00:00'),
      location: 'Virtual',
      isVirtual: true,
      attendees: Array.from({ length: 20 }, (_, i) => `user-${i + 1}`),
      organizer: 'user-1',
      status: 'upcoming' as const,
      createdAt: new Date('2024-01-10')
    },
    {
      id: 'event-2',
      tribeId: 'tribe-1',
      title: 'Tech Talk: AI and Community',
      description: 'An insightful discussion about the role of AI in community building.',
      startDate: new Date('2024-02-10T19:00:00'),
      endDate: new Date('2024-02-10T20:30:00'),
      location: 'Virtual',
      isVirtual: true,
      attendees: Array.from({ length: 30 }, (_, i) => `user-${i + 1}`),
      organizer: 'user-2',
      status: 'upcoming' as const,
      createdAt: new Date('2024-01-12')
    }
  ],
  'intellisync-innovators': [
    {
      id: 'event-1',
      tribeId: 'intellisync-innovators',
      title: 'AI Innovation Workshop',
      description: 'Join us for a hands-on workshop exploring the latest in AI technology.',
      startDate: new Date('2024-02-01T15:00:00'),
      endDate: new Date('2024-02-01T17:00:00'),
      location: 'Virtual',
      isVirtual: true,
      attendees: Array.from({ length: 25 }, (_, i) => `user-${i + 1}`),
      organizer: 'system',
      status: 'upcoming' as const,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'event-2',
      tribeId: 'intellisync-innovators',
      title: 'Monthly Community Call',
      description: 'Stay updated with the latest developments and connect with fellow innovators.',
      startDate: new Date('2024-02-15T16:00:00'),
      endDate: new Date('2024-02-15T17:00:00'),
      location: 'Virtual',
      isVirtual: true,
      attendees: Array.from({ length: 50 }, (_, i) => `user-${i + 1}`),
      organizer: 'system',
      status: 'upcoming' as const,
      createdAt: new Date('2024-01-16')
    },
    {
      id: 'event-3',
      tribeId: 'intellisync-innovators',
      title: 'AI Ethics Workshop',
      description: 'A deep dive into ethical considerations in AI development.',
      startDate: new Date('2024-02-20T14:00:00'),
      endDate: new Date('2024-02-20T16:00:00'),
      location: 'Virtual',
      isVirtual: true,
      attendees: Array.from({ length: 50 }, (_, i) => `user-${i + 1}`),
      organizer: 'system',
      status: 'upcoming' as const,
      createdAt: new Date('2024-01-16')
    }
  ]
};

export const mockPolls: { [tribeId: string]: Poll[] } = {
  'intellisync-tribe': [
    {
      id: 'poll-1',
      tribeId: 'intellisync-tribe',
      question: 'What features would you like to see next in IntelliSync?',
      options: [
        {
          id: 'option-1',
          text: 'Advanced AI Collaboration',
          votes: 15
        },
        {
          id: 'option-2',
          text: 'Enhanced Project Management',
          votes: 12
        },
        {
          id: 'option-3',
          text: 'Real-time Team Communication',
          votes: 8
        },
        {
          id: 'option-4',
          text: 'Custom Workflow Automation',
          votes: 10
        }
      ],
      createdBy: 'admin',
      createdAt: new Date('2024-01-10'),
      endsAt: new Date('2024-02-10'),
      isActive: true,
      totalVotes: 45
    }
  ],
  'tribe-1': [
    {
      id: 'poll-1',
      tribeId: 'tribe-1',
      question: 'What should be our next community event theme?',
      options: [
        {
          id: 'option-1',
          text: 'Tech Innovation Showcase',
          votes: 8
        },
        {
          id: 'option-2',
          text: 'Community Building Workshop',
          votes: 12
        },
        {
          id: 'option-3',
          text: 'AI Ethics Discussion',
          votes: 6
        },
        {
          id: 'option-4',
          text: 'Hackathon',
          votes: 15
        }
      ],
      createdBy: 'user-1',
      createdAt: new Date('2024-01-15'),
      endsAt: new Date('2024-02-15'),
      isActive: true,
      totalVotes: 41
    }
  ],
  'intellisync-innovators': [
    {
      id: 'poll-1',
      tribeId: 'intellisync-innovators',
      question: 'Which AI feature would you like us to prioritize?',
      options: [
        {
          id: 'option-1',
          text: 'Advanced Code Generation',
          votes: 250
        },
        {
          id: 'option-2',
          text: 'Natural Language Processing',
          votes: 180
        },
        {
          id: 'option-3',
          text: 'Automated Testing',
          votes: 120
        }
      ],
      createdBy: 'system',
      createdAt: new Date('2024-01-15'),
      endsAt: new Date('2024-01-22'),
      isActive: true,
      totalVotes: 550
    }
  ]
};

export const mockAchievements: { [tribeId: string]: Achievement[] } = {
  'intellisync-tribe': [
    {
      id: 'achievement-1',
      name: 'Founder',
      description: 'Created this amazing tribe',
      icon: '👑',
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: 100
    },
    {
      id: 'achievement-2',
      name: 'Community Builder',
      description: 'Reached 100 active members',
      icon: '🌟',
      progress: 100,
      maxProgress: 100,
      completed: true,
      reward: 500
    }
  ],
  'tribe-1': [
    {
      id: 'achievement-1',
      name: 'First Steps',
      description: 'Started your journey',
      icon: '🌱',
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: 50
    }
  ],
  'intellisync-innovators': [
    {
      id: 'achievement-1',
      name: 'Innovator',
      description: 'Pioneer in AI innovation',
      icon: '🚀',
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: 200
    }
  ]
};

export const mockMemberProgress = {
  id: 'chris-june',
  name: 'Chris June',
  email: 'chris.june@intellisync.ca',
  location: 'Chatham-Kent, On., Canada',
  level: 'gold',
  totalPoints: 2500,
  currentLevel: 'Gold',
  nextLevel: 'Platinum',
  pointsToNextLevel: 2500,
  badges: [
    {
      id: 'early-adopter',
      name: 'Early Adopter',
      description: 'One of the first to join IntelliSync',
      icon: '🌟',
      earnedAt: new Date('2024-01-15'),
    },
    {
      id: 'innovator',
      name: 'Innovator',
      description: 'Contributing to platform innovation',
      icon: '💡',
      earnedAt: new Date('2024-01-20'),
    },
    {
      id: 'community-builder',
      name: 'Community Builder',
      description: 'Helping build the IntelliSync community',
      icon: '🏗️',
      earnedAt: new Date('2024-01-25'),
    }
  ],
  achievements: [
    {
      id: 'platform-pioneer',
      name: 'Platform Pioneer',
      description: 'Early contributor to IntelliSync platform',
      progress: 100,
      maxProgress: 100,
      completed: true,
      reward: {
        points: 500,
        badge: 'Pioneer Badge'
      }
    },
    {
      id: 'tech-visionary',
      name: 'Tech Visionary',
      description: 'Shaping the future of collaborative development',
      progress: 75,
      maxProgress: 100,
      completed: false,
      reward: {
        points: 1000,
        badge: 'Visionary Badge'
      }
    },
    {
      id: 'community-catalyst',
      name: 'Community Catalyst',
      description: 'Driving community engagement and growth',
      progress: 60,
      maxProgress: 100,
      completed: false,
      reward: {
        points: 750,
        badge: 'Catalyst Badge'
      }
    }
  ],
  recentPoints: [
    {
      amount: 100,
      reason: 'Platform Development Contribution',
      timestamp: new Date('2024-01-26T10:00:00'),
    },
    {
      amount: 75,
      reason: 'Community Feature Implementation',
      timestamp: new Date('2024-01-25T15:30:00'),
    },
    {
      amount: 50,
      reason: 'Documentation Enhancement',
      timestamp: new Date('2024-01-24T14:20:00'),
    }
  ],
  joinedTribes: [
    {
      id: 'tech-innovators',
      name: 'Tech Innovators',
      role: 'admin',
      joinedAt: new Date('2024-01-15'),
    },
    {
      id: 'platform-builders',
      name: 'Platform Builders',
      role: 'member',
      joinedAt: new Date('2024-01-20'),
    }
  ]
};

export const mockActivityMetrics: UserActivityMetrics = {
  timeZone: "EST",
  activeHours: {
    start: "09:00",
    end: "17:00"
  },
  responseRate: 95,
  lastActive: new Date(),
  activityStreak: {
    current: 12,
    longest: 30,
    lastUpdated: new Date()
  },
  activeTribes: [
    {
      tribeId: "tech-innovators",
      tribeName: "Tech Innovators",
      activityScore: 95,
      lastInteraction: new Date()
    },
    {
      tribeId: "platform-builders",
      tribeName: "Platform Builders",
      activityScore: 88,
      lastInteraction: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      tribeId: "community-leaders",
      tribeName: "Community Leaders",
      activityScore: 82,
      lastInteraction: new Date(Date.now() - 48 * 60 * 60 * 1000)
    }
  ],
  topicEngagement: [
    {
      topic: "AI/ML",
      posts: 45,
      reactions: 230,
      comments: 156
    },
    {
      topic: "Community Building",
      posts: 38,
      reactions: 185,
      comments: 127
    },
    {
      topic: "Innovation",
      posts: 32,
      reactions: 168,
      comments: 94
    }
  ],
  onlineStatus: "online"
};

export const mockEngagementStats: UserEngagementStats = {
  dailyActivityScore: 92,
  weeklyParticipation: 28,
  monthlyContributions: 124,
  averageResponseTime: 12,
  consistencyScore: 95
};

export const mockExpertiseMetrics: ExpertiseMetrics = {
  primarySkills: [
    {
      name: "Full Stack Development",
      level: "expert",
      experiencePoints: 8500,
      pointsToNextLevel: 1500,
      endorsements: [
        {
          endorserId: "user1",
          endorserName: "Alex Chen",
          endorserAvatar: "/avatars/alex.jpg",
          endorserLevel: "expert",
          endorsementDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          comment: "Outstanding system architecture skills"
        },
        {
          endorserId: "user2",
          endorserName: "Sarah Kim",
          endorserAvatar: "/avatars/sarah.jpg",
          endorserLevel: "master",
          endorsementDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        }
      ],
      lastUsed: new Date(),
      verified: true
    },
    {
      name: "AI/ML",
      level: "advanced",
      experiencePoints: 6200,
      pointsToNextLevel: 1800,
      endorsements: [
        {
          endorserId: "user3",
          endorserName: "Mike Johnson",
          endorserLevel: "expert",
          endorsementDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        }
      ],
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      verified: true
    },
    {
      name: "System Architecture",
      level: "expert",
      experiencePoints: 7800,
      pointsToNextLevel: 2200,
      endorsements: [],
      lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      verified: true
    },
    {
      name: "Cloud Computing",
      level: "intermediate",
      experiencePoints: 3500,
      pointsToNextLevel: 1500,
      endorsements: [],
      lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      verified: false
    }
  ],
  knowledgeGraph: [
    {
      id: "node1",
      name: "Web Development",
      level: "expert",
      connections: ["node2", "node3"],
      strengthScore: 95
    },
    {
      id: "node2",
      name: "Database Design",
      level: "advanced",
      connections: ["node1"],
      strengthScore: 88
    }
  ],
  totalEndorsements: 3,
  verifiedSkills: 3,
  contributionQuality: {
    accuracy: 95,
    helpfulness: 92,
    clarity: 88,
    consistency: 90
  },
  expertiseScore: 92,
  topContributionAreas: [
    {
      area: "Backend Development",
      contributions: 156,
      impact: 94
    },
    {
      area: "System Design",
      contributions: 89,
      impact: 92
    },
    {
      area: "Code Review",
      contributions: 234,
      impact: 88
    }
  ]
};
