import { 
  Users, 
  Gamepad2, 
  Code, 
  Palette, 
  Music, 
  Dumbbell, 
  BookOpen, 
  Camera, 
  Briefcase, 
  GraduationCap,
  Heart,
  Sprout,
  ChefHat
} from 'lucide-react';

export interface TribeTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  features: string[];
  suggestedChannels: string[];
  defaultMilestones: {
    title: string;
    description: string;
    target: number;
  }[];
  recommendedChallenges: {
    title: string;
    description: string;
    duration: string;
  }[];
  contentSuggestions: string[];
}

export const tribeTemplates: TribeTemplate[] = [
  {
    id: 'tech-community',
    name: 'Tech Community',
    description: 'A space for technology enthusiasts to discuss, learn, and collaborate',
    icon: Code,
    category: 'Technology',
    features: [
      'Tech discussions',
      'Project showcases',
      'Learning resources',
      'Code reviews',
      'Tech events'
    ],
    suggestedChannels: [
      'general',
      'announcements',
      'projects',
      'resources',
      'help-desk',
      'job-board',
      'tech-news'
    ],
    defaultMilestones: [
      {
        title: 'Community Launch',
        description: 'Reach 100 active members',
        target: 100
      },
      {
        title: 'Knowledge Sharing',
        description: 'Host 10 tech talks or workshops',
        target: 10
      }
    ],
    recommendedChallenges: [
      {
        title: '30 Days of Coding',
        description: 'Complete daily coding challenges for 30 days',
        duration: '30 days'
      },
      {
        title: 'Open Source Sprint',
        description: 'Contribute to open source projects',
        duration: '7 days'
      }
    ],
    contentSuggestions: [
      'Share interesting tech articles',
      'Post coding tips and tricks',
      'Discuss new technologies',
      'Share project updates',
      'Ask technical questions'
    ]
  },
  {
    id: 'creative-arts',
    name: 'Creative Arts',
    description: 'A community for artists to share work, get feedback, and collaborate',
    icon: Palette,
    category: 'Art & Design',
    features: [
      'Art showcases',
      'Feedback sessions',
      'Collaboration opportunities',
      'Resource sharing',
      'Art challenges'
    ],
    suggestedChannels: [
      'general',
      'announcements',
      'artwork-showcase',
      'feedback',
      'resources',
      'collaborations',
      'inspiration'
    ],
    defaultMilestones: [
      {
        title: 'Gallery Opening',
        description: 'Reach 50 artwork submissions',
        target: 50
      },
      {
        title: 'Community Growth',
        description: 'Build a community of 200 artists',
        target: 200
      }
    ],
    recommendedChallenges: [
      {
        title: 'Daily Sketch',
        description: 'Create one sketch every day',
        duration: '30 days'
      },
      {
        title: 'Color Challenge',
        description: 'Create artwork using limited color palettes',
        duration: '7 days'
      }
    ],
    contentSuggestions: [
      'Share your latest artwork',
      'Post works in progress',
      'Ask for feedback',
      'Share art tutorials',
      'Discuss techniques'
    ]
  },
  {
    id: 'fitness-wellness',
    name: 'Fitness & Wellness',
    description: 'A supportive community for health and fitness enthusiasts',
    icon: Dumbbell,
    category: 'Fitness',
    features: [
      'Workout tracking',
      'Nutrition advice',
      'Progress sharing',
      'Challenge participation',
      'Support groups'
    ],
    suggestedChannels: [
      'general',
      'announcements',
      'workout-logs',
      'nutrition',
      'progress-pics',
      'motivation',
      'recipes'
    ],
    defaultMilestones: [
      {
        title: 'Active Community',
        description: 'Reach 300 active members',
        target: 300
      },
      {
        title: 'Challenge Champions',
        description: 'Complete 20 community challenges',
        target: 20
      }
    ],
    recommendedChallenges: [
      {
        title: '30-Day Fitness Challenge',
        description: 'Daily workouts for all fitness levels',
        duration: '30 days'
      },
      {
        title: 'Healthy Eating Week',
        description: 'Share healthy recipes and meal prep ideas',
        duration: '7 days'
      }
    ],
    contentSuggestions: [
      'Share workout routines',
      'Post healthy recipes',
      'Track progress updates',
      'Ask fitness questions',
      'Share success stories'
    ]
  }
];

export const getTemplateById = (id: string): TribeTemplate | undefined => {
  return tribeTemplates.find(template => template.id === id);
};

export const getDefaultTemplate = (): TribeTemplate => {
  return {
    id: 'custom',
    name: 'Custom Tribe',
    description: 'Create your own unique tribe from scratch',
    icon: Users,
    category: 'Custom',
    features: [
      'Customizable channels',
      'Flexible structure',
      'Your own rules',
      'Custom challenges',
      'Personalized milestones'
    ],
    suggestedChannels: [
      'general',
      'announcements'
    ],
    defaultMilestones: [
      {
        title: 'Community Launch',
        description: 'Reach your first 50 members',
        target: 50
      }
    ],
    recommendedChallenges: [
      {
        title: 'Welcome Challenge',
        description: 'Introduce yourself to the community',
        duration: '7 days'
      }
    ],
    contentSuggestions: [
      'Share your vision',
      'Create engaging discussions',
      'Build your community',
      'Set community goals',
      'Welcome new members'
    ]
  };
};
