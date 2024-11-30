import { CommunityRecognition } from "@/types/recognition";

export const mockCommunityRecognition: CommunityRecognition = {
  reputationScore: 850,
  helpPoints: 1250,
  role: "expert",
  achievements: [
    {
      id: "1",
      title: "Problem Solver",
      description: "Provided 50 helpful solutions to community members",
      type: "solution",
      dateEarned: new Date("2024-01-15"),
      icon: "trophy",
      rarity: "rare",
      progress: {
        current: 50,
        total: 100
      }
    },
    {
      id: "2",
      title: "Innovation Champion",
      description: "Created 5 innovative resources that helped the community",
      type: "innovation",
      dateEarned: new Date("2024-01-10"),
      icon: "star",
      rarity: "epic"
    },
    {
      id: "3",
      title: "Mentor of the Month",
      description: "Helped 20 new members get started in their journey",
      type: "mentorship",
      dateEarned: new Date("2024-01-05"),
      icon: "heart",
      rarity: "legendary",
      progress: {
        current: 20,
        total: 25
      }
    }
  ],
  recognitions: [
    {
      id: "1",
      type: "solution",
      title: "Exceptional Problem-Solving",
      description: "Provided an innovative solution to a complex technical challenge",
      awardedBy: {
        id: "user1",
        name: "Sarah Chen",
        avatar: "/avatars/sarah.jpg",
        role: "leader"
      },
      dateAwarded: new Date("2024-01-20"),
      tribe: {
        id: "tribe1",
        name: "AI Innovation"
      },
      impact: 95
    },
    {
      id: "2",
      type: "mentorship",
      title: "Outstanding Mentorship",
      description: "Helped multiple team members grow their skills",
      awardedBy: {
        id: "user2",
        name: "Michael Park",
        avatar: "/avatars/michael.jpg",
        role: "mentor"
      },
      dateAwarded: new Date("2024-01-18"),
      impact: 85
    }
  ],
  featuredContributions: [
    {
      id: "1",
      title: "Advanced AI Integration Guide",
      description: "A comprehensive guide on integrating AI models into existing applications",
      type: "resource",
      dateCreated: new Date("2024-01-15"),
      engagement: {
        views: 1200,
        likes: 350,
        comments: 45,
        shares: 120
      },
      tribe: {
        id: "tribe1",
        name: "AI Innovation"
      },
      impact: 92
    },
    {
      id: "2",
      title: "Real-time Data Processing Solution",
      description: "Innovative approach to handling large-scale real-time data",
      type: "solution",
      dateCreated: new Date("2024-01-10"),
      engagement: {
        views: 800,
        likes: 220,
        comments: 35,
        shares: 85
      },
      impact: 88
    }
  ],
  specialStatus: ["Top Contributor 2024", "AI Innovation Expert", "Community Mentor"],
  impactScore: 90,
  memberSince: new Date("2023-01-01"),
  trustScore: 95,
  weeklyRank: 3,
  monthlyRank: 5
};
