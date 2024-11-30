import { NetworkAnalysis } from "@/types/network";

export const mockNetworkAnalysis: NetworkAnalysis = {
  connections: [
    {
      id: "1",
      userId: "user1",
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      role: "AI Researcher",
      connectionType: "mentor",
      strength: "strong",
      lastInteraction: new Date("2024-01-20"),
      commonTribes: ["AI Innovation", "Deep Learning", "Research"],
      commonProjects: 5,
      collaborationScore: 95,
      domains: ["Machine Learning", "Neural Networks", "Computer Vision"]
    },
    {
      id: "2",
      userId: "user2",
      name: "Michael Park",
      avatar: "/avatars/michael.jpg",
      role: "Software Architect",
      connectionType: "peer",
      strength: "strong",
      lastInteraction: new Date("2024-01-19"),
      commonTribes: ["System Design", "Cloud Architecture"],
      commonProjects: 3,
      collaborationScore: 88,
      domains: ["Distributed Systems", "Cloud Computing", "System Design"]
    },
    {
      id: "3",
      userId: "user3",
      name: "Emma Wilson",
      avatar: "/avatars/emma.jpg",
      role: "Product Manager",
      connectionType: "collaborator",
      strength: "moderate",
      lastInteraction: new Date("2024-01-15"),
      commonTribes: ["Product Strategy", "User Experience"],
      commonProjects: 2,
      collaborationScore: 82,
      domains: ["Product Management", "UX Design", "Agile"]
    }
  ],
  metrics: {
    totalConnections: 150,
    activeConnections: 89,
    connectionsByType: {
      mentor: 15,
      peer: 45,
      mentee: 20,
      collaborator: 40,
      influencer: 30
    },
    connectionsByStrength: {
      strong: 45,
      moderate: 65,
      weak: 40
    },
    reachScore: 85,
    diversityScore: 92,
    growthRate: 15
  },
  influence: {
    overall: 88,
    reach: 2500,
    engagement: 750,
    adoption: 85,
    citations: 120,
    trending: 25,
    topDomains: [
      "Machine Learning",
      "System Architecture",
      "Cloud Computing",
      "Data Engineering"
    ]
  },
  domainExpertise: [
    {
      domain: "Machine Learning",
      level: "expert",
      endorsements: 45,
      contributions: 78,
      impact: 92,
      trending: true,
      relatedDomains: ["Deep Learning", "Neural Networks", "AI"]
    },
    {
      domain: "System Architecture",
      level: "advanced",
      endorsements: 38,
      contributions: 52,
      impact: 85,
      trending: false,
      relatedDomains: ["Distributed Systems", "Cloud Computing"]
    },
    {
      domain: "Cloud Computing",
      level: "expert",
      endorsements: 42,
      contributions: 65,
      impact: 88,
      trending: true,
      relatedDomains: ["AWS", "Azure", "DevOps"]
    }
  ],
  crossFunctional: [
    {
      domain: "Data Science",
      connections: 35,
      projects: 12,
      impact: 90,
      growth: 25
    },
    {
      domain: "Frontend Development",
      connections: 28,
      projects: 8,
      impact: 82,
      growth: 15
    },
    {
      domain: "Product Management",
      connections: 22,
      projects: 6,
      impact: 78,
      growth: 20
    }
  ],
  collaboration: [
    {
      type: "Code Reviews",
      count: 150,
      impact: 85
    },
    {
      type: "Project Contributions",
      count: 45,
      impact: 92
    },
    {
      type: "Knowledge Sharing",
      count: 75,
      impact: 88
    }
  ],
  recommendedConnections: [
    {
      id: "4",
      userId: "user4",
      name: "David Lee",
      avatar: "/avatars/david.jpg",
      role: "Data Scientist",
      connectionType: "peer",
      strength: "moderate",
      lastInteraction: new Date("2024-01-10"),
      commonTribes: ["Data Science", "Machine Learning"],
      commonProjects: 0,
      collaborationScore: 75,
      domains: ["Data Science", "Statistics", "Python"]
    },
    {
      id: "5",
      userId: "user5",
      name: "Lisa Zhang",
      avatar: "/avatars/lisa.jpg",
      role: "DevOps Engineer",
      connectionType: "collaborator",
      strength: "moderate",
      lastInteraction: new Date("2024-01-08"),
      commonTribes: ["DevOps", "Cloud Infrastructure"],
      commonProjects: 1,
      collaborationScore: 72,
      domains: ["DevOps", "Cloud", "Automation"]
    }
  ]
};
