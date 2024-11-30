import { ImpactMetrics } from "@/types/impact";

export const mockImpactMetrics: ImpactMetrics = {
  solutions: {
    total: [
      {
        id: "1",
        title: "Advanced AI Model Integration",
        description: "A comprehensive solution for integrating AI models into existing applications",
        category: "technical",
        dateCreated: new Date("2024-01-15"),
        complexity: "advanced",
        peopleHelped: 250,
        upvotes: 180,
        adoptions: 45,
        tribe: {
          id: "tribe1",
          name: "AI Innovation"
        },
        tags: ["AI", "Integration", "Machine Learning"]
      },
      {
        id: "2",
        title: "Real-time Data Processing Pipeline",
        description: "Efficient solution for processing large-scale real-time data",
        category: "technical",
        dateCreated: new Date("2024-01-10"),
        complexity: "advanced",
        peopleHelped: 180,
        upvotes: 150,
        adoptions: 35,
        tribe: {
          id: "tribe2",
          name: "Data Engineering"
        },
        tags: ["Data Processing", "Real-time", "Scalability"]
      }
    ],
    byComplexity: {
      basic: 15,
      intermediate: 25,
      advanced: 10
    },
    totalPeopleHelped: 1250,
    averageImpact: 85,
    topSolutions: []  // Will be populated from total
  },
  helpMetrics: {
    total: [
      {
        id: "1",
        recipient: {
          id: "user1",
          name: "Sarah Chen",
          avatar: "/avatars/sarah.jpg"
        },
        type: "mentoring",
        date: new Date("2024-01-20"),
        duration: 60,
        impact: 95,
        feedback: "Exceptional guidance on AI model optimization",
        tribe: {
          id: "tribe1",
          name: "AI Innovation"
        }
      },
      {
        id: "2",
        recipient: {
          id: "user2",
          name: "Michael Park",
          avatar: "/avatars/michael.jpg"
        },
        type: "solution",
        date: new Date("2024-01-18"),
        impact: 88,
        feedback: "Helped resolve a critical performance issue"
      }
    ],
    byType: {
      solution: 45,
      mentoring: 25,
      review: 35,
      guidance: 30
    },
    totalHoursSpent: 150,
    averageImpact: 92,
    recentHelp: []  // Will be populated from total
  },
  resources: {
    total: [
      {
        id: "1",
        title: "Complete Guide to AI Model Optimization",
        description: "Comprehensive guide covering advanced techniques for AI model optimization",
        type: "guide",
        dateShared: new Date("2024-01-15"),
        category: "technical",
        reach: 2500,
        downloads: 850,
        likes: 420,
        comments: 65,
        reuses: 180,
        tribe: {
          id: "tribe1",
          name: "AI Innovation"
        },
        tags: ["AI", "Optimization", "Performance"]
      },
      {
        id: "2",
        title: "Real-time Data Processing Templates",
        description: "Collection of templates for building real-time data processing pipelines",
        type: "template",
        dateShared: new Date("2024-01-10"),
        category: "technical",
        reach: 1800,
        downloads: 620,
        likes: 280,
        comments: 45,
        reuses: 150,
        tribe: {
          id: "tribe2",
          name: "Data Engineering"
        },
        tags: ["Data Processing", "Templates", "Real-time"]
      }
    ],
    byType: {
      tutorial: 15,
      guide: 12,
      documentation: 8,
      "code-sample": 25,
      template: 10,
      tool: 5
    },
    totalReach: 15000,
    totalReuses: 850,
    popularResources: []  // Will be populated from total
  },
  initiatives: {
    total: [
      {
        id: "1",
        title: "AI Innovation Workshop Series",
        description: "Monthly workshop series focusing on practical AI implementation",
        status: "ongoing",
        startDate: new Date("2023-10-01"),
        category: "educational",
        participants: 150,
        engagement: 92,
        impact: 95,
        outcomes: [
          "Trained 150+ developers in AI implementation",
          "Created 25+ practical projects",
          "Established ongoing mentorship program"
        ],
        tribe: {
          id: "tribe1",
          name: "AI Innovation"
        }
      }
    ],
    byStatus: {
      planned: 3,
      "in-progress": 2,
      completed: 8,
      ongoing: 2
    },
    totalParticipants: 450,
    averageEngagement: 88,
    activeInitiatives: []  // Will be populated from total
  },
  innovations: {
    total: [
      {
        id: "1",
        title: "AI-Powered Code Review System",
        description: "Automated system for intelligent code review and optimization suggestions",
        category: "innovation",
        dateProposed: new Date("2023-12-01"),
        dateImplemented: new Date("2024-01-15"),
        status: "implemented",
        impact: 95,
        adoption: 85,
        contributors: [
          {
            id: "user1",
            name: "Sarah Chen",
            avatar: "/avatars/sarah.jpg",
            role: "Lead Developer"
          }
        ],
        benefits: [
          "50% reduction in code review time",
          "30% improvement in code quality",
          "Automated optimization suggestions"
        ],
        tribe: {
          id: "tribe1",
          name: "AI Innovation"
        }
      }
    ],
    byStatus: {
      proposed: 3,
      "in-review": 2,
      approved: 2,
      implemented: 5
    },
    averageImpact: 88,
    averageAdoption: 82,
    keyInnovations: []  // Will be populated from total
  },
  categoryMetrics: [
    {
      category: "technical",
      solutions: 25,
      peopleHelped: 850,
      resources: 35,
      initiatives: 5,
      innovations: 8,
      totalImpact: 92,
      growth: 25
    },
    {
      category: "educational",
      solutions: 15,
      peopleHelped: 450,
      resources: 28,
      initiatives: 4,
      innovations: 5,
      totalImpact: 88,
      growth: 20
    }
  ],
  overallImpact: {
    score: 92,
    trend: 15,
    ranking: 5,
    highlights: [
      "Led 15+ successful community initiatives",
      "Helped 1,250+ community members",
      "Created 75+ high-impact resources",
      "Implemented 8 major innovations"
    ]
  }
};

// Populate the arrays that reference total arrays
mockImpactMetrics.solutions.topSolutions = mockImpactMetrics.solutions.total;
mockImpactMetrics.helpMetrics.recentHelp = mockImpactMetrics.helpMetrics.total;
mockImpactMetrics.resources.popularResources = mockImpactMetrics.resources.total;
mockImpactMetrics.initiatives.activeInitiatives = mockImpactMetrics.initiatives.total;
mockImpactMetrics.innovations.keyInnovations = mockImpactMetrics.innovations.total;
