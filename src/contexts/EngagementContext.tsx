import React, { createContext, useReducer, useState, useCallback, useMemo, useEffect } from 'react';
import { mockActivities, mockEvents, mockPolls, mockAchievements } from '@/mocks/engagementMocks';
import { initializeTribeEngagement } from '@/utils/tribeUtils';
import { MemberProgress, Achievement } from '@/types/gamification';
import { BADGES, calculateNextLevelProgress } from '@/lib/gamification';
import { Activity, TribeEvent, Poll, PollOption } from '@/types/engagement';
import { EngagementContextType, EngagementState, EngagementAction } from '@/types/contextTypes';

export type { Activity, TribeEvent, Poll, PollOption, Achievement };

export interface TribeMilestone {
  id: string;
  type: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: {
    type: string;
    value: string;
  };
  unlocksAt: number;
  celebrationDate?: Date;
}

export interface Insight {
  id: string;
  type: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  timeframe: 'daily' | 'weekly' | 'monthly';
  details: {
    label: string;
    value: number;
  }[];
}

interface Reaction {
  type: string;
  count: number;
  users: string[];
}

interface EngagementState {
  activities: {
    [tribeId: string]: Activity[];
  };
  events: {
    [tribeId: string]: TribeEvent[];
  };
  polls: {
    [tribeId: string]: Poll[];
  };
  achievements: {
    [tribeId: string]: Achievement[];
  };
  loading: boolean;
  error: string | null;
}

interface TribeInitData {
  activities: Activity[];
  events: TribeEvent[];
  polls: Poll[];
  achievements: Achievement[];
}

type EngagementAction =
  | { type: 'INITIALIZE_TRIBE'; payload: { tribeId: string; data: TribeInitData } }
  | { type: 'ADD_ACTIVITY'; payload: { tribeId: string; activity: Activity } }
  | { type: 'SET_ACTIVITIES'; tribeId: string; activities: Activity[] }
  | { type: 'ADD_EVENT'; payload: { tribeId: string; event: TribeEvent } }
  | { type: 'UPDATE_EVENT'; tribeId: string; event: TribeEvent }
  | { type: 'ADD_POLL'; payload: { tribeId: string; poll: Poll } }
  | { type: 'VOTE_POLL'; tribeId: string; pollId: string; optionId: string; userId: string }
  | { type: 'ADD_ACHIEVEMENT'; payload: { tribeId: string; achievement: Achievement } }
  | { type: 'GRANT_ACHIEVEMENT'; tribeId: string; achievementId: string; userId: string }
  | { type: 'ADD_REACTION'; tribeId: string; activityId: string; reaction: string; userId: string }
  | { type: 'ADD_COMMENT'; tribeId: string; activityId: string; comment: Activity['comments'][0] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

interface EngagementContextType {
  state: EngagementState;
  dispatch: React.Dispatch<EngagementAction>;
  milestones: {
    getMilestones: (tribeId: string) => TribeMilestone[];
    updateMilestone: (tribeId: string, milestoneId: string, progress: number) => void;
    claimReward: (tribeId: string, milestoneId: string) => void;
  };
  insights: {
    getInsights: (tribeId: string, timeframe: 'daily' | 'weekly' | 'monthly') => Insight[];
    refreshInsights: (tribeId: string) => void;
  };
  initializeEngagement: (tribeId: string) => Promise<void>;
  addActivity: (tribeId: string, activity: Activity) => void;
  addEvent: (tribeId: string, event: TribeEvent) => void;
  addPoll: (tribeId: string, poll: Poll) => void;
  addAchievement: (tribeId: string, achievement: Achievement) => void;
  memberProgress: MemberProgress;
  achievements: Achievement[];
  addPoints: (amount: number, reason: string) => void;
  awardBadge: (badgeId: keyof typeof BADGES) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
};

const initialState: EngagementState = {
  activities: mockActivities,
  events: mockEvents,
  polls: mockPolls,
  achievements: mockAchievements,
  loading: false,
  error: null,
};

function engagementReducer(state: EngagementState, action: EngagementAction): EngagementState {
  switch (action.type) {
    case 'INITIALIZE_TRIBE':
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.payload.tribeId]: action.payload.data.activities,
        },
        events: {
          ...state.events,
          [action.payload.tribeId]: action.payload.data.events,
        },
        polls: {
          ...state.polls,
          [action.payload.tribeId]: action.payload.data.polls,
        },
        achievements: {
          ...state.achievements,
          [action.payload.tribeId]: action.payload.data.achievements,
        },
      };
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.payload.tribeId]: [
            action.payload.activity,
            ...(state.activities[action.payload.tribeId] || []),
          ],
        },
      };
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.tribeId]: action.activities,
        },
      };
    case 'ADD_EVENT':
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.tribeId]: [
            action.payload.event,
            ...(state.events[action.payload.tribeId] || []),
          ],
        },
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: {
          ...state.events,
          [action.tribeId]: state.events[action.tribeId]?.map(event =>
            event.id === action.event.id ? action.event : event
          ) || [],
        },
      };
    case 'ADD_POLL':
      return {
        ...state,
        polls: {
          ...state.polls,
          [action.payload.tribeId]: [
            action.payload.poll,
            ...(state.polls[action.payload.tribeId] || []),
          ],
        },
      };
    case 'VOTE_POLL':
      return {
        ...state,
        polls: {
          ...state.polls,
          [action.tribeId]: state.polls[action.tribeId]?.map(poll =>
            poll.id === action.pollId
              ? {
                  ...poll,
                  options: poll.options.map((option: PollOption) =>
                    option.id === action.optionId
                      ? { ...option, votes: option.votes + 1 }
                      : option
                  ),
                  totalVotes: poll.totalVotes + 1,
                  userVote: action.optionId,
                }
              : poll
          ) || [],
        },
      };
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: {
          ...state.achievements,
          [action.payload.tribeId]: [
            ...(state.achievements[action.payload.tribeId] || []),
            {
              ...action.payload.achievement,
              progress: 0,
              maxProgress: action.payload.achievement.maxProgress || 1,
              completed: false
            }
          ]
        }
      };
    case 'GRANT_ACHIEVEMENT':
      return {
        ...state,
        achievements: {
          ...state.achievements,
          [action.tribeId]: state.achievements[action.tribeId]?.map((achievement) =>
            achievement.id === action.achievementId
              ? {
                  ...achievement,
                  completed: true,
                  progress: achievement.maxProgress,
                }
              : achievement
          ) || [],
        },
      };
    case 'ADD_REACTION':
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.tribeId]: state.activities[action.tribeId]?.map(activity =>
            activity.id === action.activityId
              ? {
                  ...activity,
                  reactions: activity.reactions.some((r: Reaction) => r.type === action.reaction)
                    ? activity.reactions.map((r: Reaction) =>
                        r.type === action.reaction
                          ? {
                              ...r,
                              count: r.count + 1,
                              users: [...r.users, action.userId],
                            }
                          : r
                      )
                    : [
                        ...activity.reactions,
                        {
                          type: action.reaction,
                          count: 1,
                          users: [action.userId],
                        },
                      ],
                }
              : activity
          ) || [],
        },
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.tribeId]: state.activities[action.tribeId]?.map(activity =>
            activity.id === action.activityId
              ? {
                  ...activity,
                  comments: [...activity.comments, action.comment],
                }
              : activity
          ) || [],
        },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
}

const EngagementContext = createContext<EngagementContextType>({
  state: initialState,
  dispatch: () => {},
  milestones: {
    getMilestones: () => [],
    updateMilestone: () => {},
    claimReward: () => {},
  },
  insights: {
    getInsights: () => [],
    refreshInsights: () => {},
  },
  initializeEngagement: async () => {},
  addActivity: () => {},
  addEvent: () => {},
  addPoll: () => {},
  addAchievement: () => {},
  memberProgress: {
    currentLevel: 'bronze',
    nextLevel: 'silver',
    progress: 0,
    pointsNeeded: 500,
    totalPoints: 0,
    recentPoints: [],
    badges: [],
    achievements: []
  },
  achievements: [],
  addPoints: () => {},
  awardBadge: () => {},
  updateAchievementProgress: () => {},
});

function EngagementProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(engagementReducer, initialState);
  const [tribeMilestones, setTribeMilestones] = useState<Record<string, TribeMilestone[]>>({});
  const [tribeInsights, setTribeInsights] = useState<Record<string, Insight[]>>({});
  const [memberProgress, setMemberProgress] = useState<MemberProgress>({
    currentLevel: 'bronze',
    nextLevel: 'silver',
    progress: 0,
    pointsNeeded: 500,
    totalPoints: 0,
    recentPoints: [],
    badges: [],
    achievements: []
  });
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_post',
      name: 'First Post',
      description: 'Create your first post in the community',
      icon: '📝',
      progress: 0,
      maxProgress: 1,
      completed: false,
      reward: 100
    },
    {
      id: 'active_member',
      name: 'Active Member',
      description: 'Post at least 5 times in a week',
      icon: '🌟',
      progress: 0,
      maxProgress: 5,
      completed: false,
      reward: 250
    }
  ]);

  const getMilestones = useCallback((tribeId: string) => {
    if (!tribeMilestones[tribeId]) {
      setTribeMilestones((prev) => ({
        ...prev,
        [tribeId]: [
          {
            id: '1',
            type: 'members',
            title: '1,000 Members',
            description: 'Grow our community to 1,000 active members',
            target: 1000,
            current: 856,
            reward: {
              type: 'badge',
              value: 'Thriving Community',
            },
            unlocksAt: 1000,
          },
          // Add more mock milestones...
        ],
      }));
    }
    return tribeMilestones[tribeId] || [];
  }, [tribeMilestones]);

  const updateMilestone = useCallback((tribeId: string, milestoneId: string, progress: number) => {
    setTribeMilestones((prev) => ({
      ...prev,
      [tribeId]: prev[tribeId]?.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, current: progress }
          : milestone
      ) || [],
    }));
  }, []);

  const claimReward = useCallback((tribeId: string, milestoneId: string) => {
    setTribeMilestones((prev) => ({
      ...prev,
      [tribeId]: prev[tribeId]?.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, celebrationDate: new Date() }
          : milestone
      ) || [],
    }));
  }, []);

  const getInsights = useCallback(
    (tribeId: string, timeframe: 'daily' | 'weekly' | 'monthly' = 'weekly') => {
      if (!tribeInsights[tribeId]) {
        setTribeInsights((prev) => ({
          ...prev,
          [tribeId]: [
            {
              id: '1',
              type: 'growth',
              title: 'Member Growth',
              value: 156,
              change: 23,
              trend: 'up',
              timeframe: 'weekly',
              details: [
                { label: 'New Members', value: 156 },
                { label: 'Active Members', value: 892 },
                { label: 'Engagement Rate', value: 78 },
              ],
            },
            // Add more mock insights...
          ],
        }));
      }
      return tribeInsights[tribeId]?.filter((insight) => insight.timeframe === timeframe) || [];
    },
    [tribeInsights]
  );

  const refreshInsights = useCallback((_tribeId: string) => {
    // Mock implementation - replace with actual API call
    // This would typically fetch fresh data from the backend
  }, []);

  const addActivity = useCallback((tribeId: string, activity: Activity) => {
    dispatch({ type: 'ADD_ACTIVITY', payload: { tribeId, activity } });
  }, [dispatch]);

  const addEvent = useCallback((tribeId: string, event: TribeEvent) => {
    dispatch({ type: 'ADD_EVENT', payload: { tribeId, event } });
  }, [dispatch]);

  const addPoll = useCallback((tribeId: string, poll: Poll) => {
    dispatch({ type: 'ADD_POLL', payload: { tribeId, poll } });
  }, [dispatch]);

  const addAchievement = useCallback((tribeId: string, achievement: Achievement) => {
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: { tribeId, achievement } });
  }, [dispatch]);

  const addPoints = useCallback((amount: number, reason: string) => {
    setMemberProgress((prev) => {
      const newTotalPoints = prev.totalPoints + amount;
      const newProgress = calculateNextLevelProgress(newTotalPoints);
      
      return {
        ...prev,
        ...newProgress,
        totalPoints: newTotalPoints,
        recentPoints: [
          {
            amount,
            reason,
            timestamp: new Date(),
          },
          ...prev.recentPoints.slice(0, 4), // Keep last 5 activities
        ],
      };
    });
  }, []);

  const awardBadge = useCallback((badgeId: keyof typeof BADGES) => {
    const badge = BADGES[badgeId];
    if (!memberProgress.badges.some((b) => b.id === badge.id)) {
      setMemberProgress((prev) => ({
        ...prev,
        badges: [...prev.badges, { ...badge, earnedAt: new Date() }],
      }));
      addPoints(50, `Earned ${badge.name} badge`);
    }
  }, [addPoints, memberProgress]);

  const updateAchievementProgress = useCallback((achievementId: string, progress: number) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id !== achievementId) return achievement;

        const newProgress = Math.min(progress, achievement.maxProgress);
        const wasCompleted = achievement.completed;
        const isNowCompleted = newProgress >= achievement.maxProgress;

        if (isNowCompleted && !wasCompleted) {
          // Award points when achievement is completed
          setTimeout(() => {
            addPoints(
              achievement.reward,
              `Completed ${achievement.name} achievement`
            );
          }, 0);
        }

        return {
          ...achievement,
          progress: newProgress,
          completed: isNowCompleted,
        };
      })
    );
  }, [addPoints]);

  const initializeEngagement = useCallback(async (tribeId: string) => {
    const initialData = initializeTribeEngagement(tribeId);
    dispatch({ type: 'INITIALIZE_TRIBE', payload: { tribeId, data: initialData } });
  }, [dispatch]);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('memberProgress');
    const savedAchievements = localStorage.getItem('achievements');

    if (savedProgress) {
      setMemberProgress(JSON.parse(savedProgress));
    }
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('memberProgress', JSON.stringify(memberProgress));
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [memberProgress, achievements]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      milestones: {
        getMilestones,
        updateMilestone,
        claimReward,
      },
      insights: {
        getInsights,
        refreshInsights,
      },
      initializeEngagement,
      addActivity,
      addEvent,
      addPoll,
      addAchievement,
      memberProgress,
      achievements,
      addPoints,
      awardBadge,
      updateAchievementProgress,
    }),
    [state, dispatch, getMilestones, updateMilestone, claimReward, getInsights, refreshInsights, initializeEngagement, addActivity, addEvent, addPoll, addAchievement, memberProgress, achievements, addPoints, awardBadge, updateAchievementProgress]
  );

  return (
    <EngagementContext.Provider value={value}>
      {children}
    </EngagementContext.Provider>
  );
}

export { EngagementContext, EngagementProvider };
