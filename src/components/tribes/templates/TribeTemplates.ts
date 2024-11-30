import { LucideIcon, Users, Code, Lightbulb, Globe, BookOpen, Gamepad } from 'lucide-react';
import { Tribe } from '@/types/tribes';

export interface TribeTemplate {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  rules: string[];
  tags: string[];
  template: Partial<Tribe>;
}

export const defaultTemplate: TribeTemplate = {
  id: 'default',
  name: 'Start from Scratch',
  description: 'Create a custom tribe with your own settings',
  icon: Users,
  category: 'Custom',
  features: [],
  rules: [],
  tags: [],
  template: {
    privacy: 'public',
    memberApproval: 'automatic',
    isVerified: false
  }
};

export const tribeTemplates: TribeTemplate[] = [
  {
    id: 'tech-community',
    name: 'Tech Community',
    description: 'Build a community around technology and innovation',
    icon: Code,
    category: 'Technology',
    features: [
      'Technical Discussions',
      'Code Reviews',
      'Project Collaboration',
      'Tech Workshops',
      'Resource Sharing'
    ],
    rules: [
      'Share knowledge respectfully',
      'Contribute constructively',
      'Help fellow developers',
      'Follow coding standards'
    ],
    tags: ['Technology', 'Development', 'Innovation', 'Coding'],
    template: {
      privacy: 'public',
      memberApproval: 'automatic',
      isVerified: false,
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
      }
    }
  },
  {
    id: 'innovation-hub',
    name: 'Innovation Hub',
    description: 'Foster innovation and creative problem-solving',
    icon: Lightbulb,
    category: 'Innovation',
    features: [
      'Idea Sharing',
      'Innovation Challenges',
      'Collaborative Projects',
      'Research Discussions',
      'Resource Library'
    ],
    rules: [
      'Encourage creative thinking',
      'Respect intellectual property',
      'Share constructive feedback',
      'Support fellow innovators'
    ],
    tags: ['Innovation', 'Ideas', 'Research', 'Collaboration'],
    template: {
      privacy: 'public',
      memberApproval: 'automatic',
      isVerified: false,
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
      }
    }
  },
  {
    id: 'learning-community',
    name: 'Learning Community',
    description: 'Create a space for continuous learning and knowledge sharing',
    icon: BookOpen,
    category: 'Education',
    features: [
      'Study Groups',
      'Resource Sharing',
      'Mentorship Program',
      'Learning Paths',
      'Knowledge Base'
    ],
    rules: [
      'Share knowledge openly',
      'Respect learning pace',
      'Support beginners',
      'Maintain quality content'
    ],
    tags: ['Education', 'Learning', 'Knowledge', 'Mentorship'],
    template: {
      privacy: 'public',
      memberApproval: 'automatic',
      isVerified: false,
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
      }
    }
  },
  {
    id: 'gaming-community',
    name: 'Gaming Community',
    description: 'Build a community for gamers and gaming enthusiasts',
    icon: Gamepad,
    category: 'Gaming',
    features: [
      'Game Sessions',
      'Tournament Organization',
      'Strategy Discussions',
      'Team Building',
      'Gaming News'
    ],
    rules: [
      'Practice good sportsmanship',
      'Be inclusive',
      'No toxic behavior',
      'Respect game rules'
    ],
    tags: ['Gaming', 'Esports', 'Multiplayer', 'Community'],
    template: {
      privacy: 'public',
      memberApproval: 'automatic',
      isVerified: false,
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
      }
    }
  },
  {
    id: 'global-network',
    name: 'Global Network',
    description: 'Connect people from around the world',
    icon: Globe,
    category: 'Networking',
    features: [
      'Cultural Exchange',
      'Global Events',
      'Language Practice',
      'International Projects',
      'Travel Tips'
    ],
    rules: [
      'Respect cultural differences',
      'Use inclusive language',
      'Share global perspectives',
      'Maintain cultural sensitivity'
    ],
    tags: ['Global', 'Culture', 'International', 'Networking'],
    template: {
      privacy: 'public',
      memberApproval: 'automatic',
      isVerified: false,
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
      }
    }
  }
];

export const getDefaultTemplate = (): TribeTemplate => defaultTemplate;

export const getTemplateById = (id: string): TribeTemplate => {
  if (id === defaultTemplate.id) return defaultTemplate;
  const template = tribeTemplates.find(t => t.id === id);
  if (!template) throw new Error(`Template with id ${id} not found`);
  return template;
};
