export interface TribeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  suggestedTags: string[];
  features: string[];
}

export const TRIBE_CATEGORIES: TribeCategory[] = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'For tech enthusiasts, developers, and innovators',
    icon: '💻',
    suggestedTags: [
      'programming',
      'artificial-intelligence',
      'web-development',
      'cybersecurity',
      'blockchain',
      'mobile-apps',
      'data-science',
      'cloud-computing'
    ],
    features: ['Discussions', 'Code Sharing', 'Project Collaboration', 'Tech Talks']
  },
  {
    id: 'art-design',
    name: 'Art & Design',
    description: 'For artists, designers, and creative minds',
    icon: '🎨',
    suggestedTags: [
      'digital-art',
      'illustration',
      'ui-ux',
      'graphic-design',
      'animation',
      'photography',
      'visual-arts',
      'branding'
    ],
    features: ['Portfolio Showcase', 'Design Critiques', 'Resource Sharing', 'Creative Challenges']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'For gamers, developers, and esports enthusiasts',
    icon: '🎮',
    suggestedTags: [
      'esports',
      'game-development',
      'streaming',
      'competitive',
      'casual',
      'rpg',
      'fps',
      'strategy'
    ],
    features: ['Game Events', 'Team Formation', 'Tournament Organization', 'Live Streaming']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'For learners, teachers, and knowledge seekers',
    icon: '📚',
    suggestedTags: [
      'online-learning',
      'tutorials',
      'study-groups',
      'research',
      'academic',
      'skill-development',
      'mentoring',
      'resources'
    ],
    features: ['Study Groups', 'Course Sharing', 'Mentorship', 'Resource Library']
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For entrepreneurs, professionals, and business leaders',
    icon: '💼',
    suggestedTags: [
      'entrepreneurship',
      'startups',
      'marketing',
      'finance',
      'networking',
      'leadership',
      'innovation',
      'strategy'
    ],
    features: ['Networking Events', 'Resource Sharing', 'Mentorship', 'Business Development']
  },
  {
    id: 'science',
    name: 'Science',
    description: 'For scientists, researchers, and science enthusiasts',
    icon: '🔬',
    suggestedTags: [
      'research',
      'physics',
      'biology',
      'chemistry',
      'astronomy',
      'environmental',
      'medicine',
      'innovation'
    ],
    features: ['Research Collaboration', 'Paper Discussions', 'Project Sharing', 'Lab Notes']
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'For health professionals and wellness enthusiasts',
    icon: '🧘‍♀️',
    suggestedTags: [
      'fitness',
      'nutrition',
      'mental-health',
      'meditation',
      'yoga',
      'healthcare',
      'wellness',
      'lifestyle'
    ],
    features: ['Wellness Programs', 'Health Tracking', 'Expert Consultations', 'Community Support']
  },
  {
    id: 'community',
    name: 'Community',
    description: 'For community builders and social initiatives',
    icon: '🤝',
    suggestedTags: [
      'local-community',
      'social-impact',
      'volunteering',
      'events',
      'networking',
      'support-groups',
      'initiatives',
      'collaboration'
    ],
    features: ['Event Planning', 'Resource Sharing', 'Volunteer Coordination', 'Impact Tracking']
  }
];

export const COMMON_FEATURES = [
  'Discussions',
  'Events',
  'Polls',
  'Resources',
  'Member Directory',
  'Announcements',
  'Direct Messaging',
  'File Sharing'
];

export interface PrivacyOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const PRIVACY_OPTIONS: PrivacyOption[] = [
  {
    id: 'public',
    name: 'Public',
    description: 'Anyone can find and join this tribe',
    icon: '🌍'
  },
  {
    id: 'private',
    name: 'Private',
    description: 'Only invited members can join this tribe',
    icon: '🔒'
  }
];

export interface MemberApprovalOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const MEMBER_APPROVAL_OPTIONS: MemberApprovalOption[] = [
  {
    id: 'automatic',
    name: 'Automatic',
    description: 'Members can join instantly',
    icon: '⚡'
  },
  {
    id: 'manual',
    name: 'Manual Approval',
    description: 'Admins must approve new members',
    icon: '👥'
  }
];
