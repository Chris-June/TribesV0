import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Tribe } from '@/types/tribes';

interface DiscoveryState {
  tribes: Tribe[];
  trendingTribes: Tribe[];
  recommendedTribes: Tribe[];
  filters: {
    minMembers: number;
    maxMembers: number;
    isVerified: boolean;
    sortBy: 'popular' | 'newest' | 'active';
    categories: string[];
    searchQuery: string;
  };
  loading: {
    tribes: boolean;
    trending: boolean;
    recommended: boolean;
  };
  error: string | null;
}

const initialState: DiscoveryState = {
  tribes: [],
  trendingTribes: [],
  recommendedTribes: [],
  filters: {
    minMembers: 0,
    maxMembers: 10000,
    isVerified: false,
    sortBy: 'popular',
    categories: [],
    searchQuery: '',
  },
  loading: {
    tribes: false,
    trending: false,
    recommended: false,
  },
  error: null,
};

type DiscoveryAction =
  | { type: 'SET_TRIBES'; tribes: Tribe[] }
  | { type: 'SET_TRENDING_TRIBES'; tribes: Tribe[] }
  | { type: 'SET_RECOMMENDED_TRIBES'; tribes: Tribe[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_LOADING_TRIBES'; loading: boolean }
  | { type: 'SET_LOADING_TRENDING'; loading: boolean }
  | { type: 'SET_LOADING_RECOMMENDED'; loading: boolean }
  | { type: 'UPDATE_FILTERS'; filters: Partial<DiscoveryState['filters']> };

function discoveryReducer(state: DiscoveryState, action: DiscoveryAction): DiscoveryState {
  switch (action.type) {
    case 'SET_TRIBES':
      return { ...state, tribes: action.tribes, error: null };
    case 'SET_TRENDING_TRIBES':
      return { ...state, trendingTribes: action.tribes, error: null };
    case 'SET_RECOMMENDED_TRIBES':
      return { ...state, recommendedTribes: action.tribes, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_LOADING_TRIBES':
      return { ...state, loading: { ...state.loading, tribes: action.loading } };
    case 'SET_LOADING_TRENDING':
      return { ...state, loading: { ...state.loading, trending: action.loading } };
    case 'SET_LOADING_RECOMMENDED':
      return { ...state, loading: { ...state.loading, recommended: action.loading } };
    case 'UPDATE_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.filters }
      };
    default:
      return state;
  }
}

interface DiscoveryContextValue {
  state: DiscoveryState;
  dispatch: React.Dispatch<DiscoveryAction>;
}

const DiscoveryContext = createContext<DiscoveryContextValue | null>(null);

export function DiscoveryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(discoveryReducer, initialState);

  useEffect(() => {
    const masterTribe: Tribe = {
      id: 'intellisync-innovators',
      name: 'IntelliSync Innovators Hub',
      description: 'Welcome to the epicenter of AI-powered innovation! Join the IntelliSync Solutions community where we\'re pioneering the future of web applications and SaaS solutions. Connect with fellow developers, entrepreneurs, and AI enthusiasts as we push the boundaries of what\'s possible in software development.',
      image: 'https://source.unsplash.com/random/800x600/?artificial-intelligence-technology',
      category: 'Technology',
      members: 1,
      isVerified: true,
      privacy: 'public',
      memberApproval: 'automatic',
      tags: ['AI', 'SaaS', 'Web Development', 'Innovation', 'Technology'],
      createdAt: new Date('2024-01-01').toISOString(),
      owner: {
        id: 'chris-june',
        name: 'Chris June',
        role: 'Founder & CEO',
        avatar: 'https://source.unsplash.com/random/100x100/?professional',
      },
      features: [
        'Access to exclusive AI development insights',
        'Early access to IntelliSync products',
        'Network with industry professionals',
        'Participate in tech discussions',
        'Learn about latest AI innovations'
      ],
      engagement: {
        posts: 15,
        activeMembers: 1,
        weeklyGrowth: 100,
      }
    };

    dispatch({ type: 'SET_TRIBES', tribes: [masterTribe] });
    dispatch({ type: 'SET_TRENDING_TRIBES', tribes: [masterTribe] });
    dispatch({ type: 'SET_RECOMMENDED_TRIBES', tribes: [masterTribe] });
  }, []);

  const value = {
    state,
    dispatch,
  };

  return (
    <DiscoveryContext.Provider value={value}>
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscovery() {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }
  return context;
}
