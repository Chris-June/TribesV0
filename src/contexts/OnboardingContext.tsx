import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface UserProfile {
  displayName: string;
  bio: string;
  avatar: string;
  location: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

interface OnboardingState {
  isCompleted: boolean;
  currentStep: number;
  userInterests: string[];
  userProfile: UserProfile;
  profileCompletion: number;
  hasSeenTutorial: boolean;
  stepsCompleted: {
    welcome: boolean;
    interests: boolean;
    profile: boolean;
    tutorial: boolean;
  };
  recommendedTribes: string[];
}

type OnboardingAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'UPDATE_INTERESTS'; interests: string[] }
  | { type: 'UPDATE_PROFILE'; profile: Partial<UserProfile> }
  | { type: 'COMPLETE_STEP'; step: keyof OnboardingState['stepsCompleted'] }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'COMPLETE_TUTORIAL' }
  | { type: 'UPDATE_PROFILE_COMPLETION'; progress: number };

const initialState: OnboardingState = {
  isCompleted: false,
  currentStep: 0,
  userInterests: [],
  userProfile: {
    displayName: '',
    bio: '',
    avatar: '',
    location: '',
    socialLinks: {},
  },
  profileCompletion: 0,
  hasSeenTutorial: false,
  stepsCompleted: {
    welcome: false,
    interests: false,
    profile: false,
    tutorial: false,
  },
  recommendedTribes: [],
};

const ONBOARDING_STATE_KEY = 'tribes-onboarding-state';

const loadInitialState = (): OnboardingState => {
  const savedState = localStorage.getItem(ONBOARDING_STATE_KEY);
  if (savedState) {
    return JSON.parse(savedState);
  }
  return initialState;
};

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    
    case 'UPDATE_INTERESTS':
      // When interests are updated, also update recommended tribes
      const recommendedTribes = generateRecommendedTribes(action.interests);
      return { 
        ...state, 
        userInterests: action.interests,
        recommendedTribes
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.profile },
      };
    
    case 'COMPLETE_STEP':
      return {
        ...state,
        stepsCompleted: {
          ...state.stepsCompleted,
          [action.step]: true,
        },
      };
    
    case 'COMPLETE_ONBOARDING':
      return { ...state, isCompleted: true };
    
    case 'COMPLETE_TUTORIAL':
      return { ...state, hasSeenTutorial: true };
    
    case 'UPDATE_PROFILE_COMPLETION':
      return { ...state, profileCompletion: action.progress };
    
    default:
      return state;
  }
}

// Helper function to generate recommended tribes based on interests
function generateRecommendedTribes(interests: string[]): string[] {
  // This would be replaced with actual API call in production
  return interests.map(interest => `${interest} Enthusiasts`);
}

interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  setCurrentStep: (step: number) => void;
  updateUserInterests: (interests: string[]) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  completeStep: (step: keyof OnboardingState['stepsCompleted']) => void;
  completeOnboarding: () => void;
  completeTutorial: () => void;
  calculateProfileCompletion: () => number;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, loadInitialState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(ONBOARDING_STATE_KEY, JSON.stringify(state));
  }, [state]);

  const setCurrentStep = (step: number) => {
    dispatch({ type: 'SET_STEP', step });
  };

  const updateUserInterests = (interests: string[]) => {
    dispatch({ type: 'UPDATE_INTERESTS', interests });
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    dispatch({ type: 'UPDATE_PROFILE', profile });
  };

  const completeStep = (step: keyof OnboardingState['stepsCompleted']) => {
    dispatch({ type: 'COMPLETE_STEP', step });
  };

  const completeOnboarding = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    localStorage.setItem(ONBOARDING_STATE_KEY, JSON.stringify({ ...state, isCompleted: true }));
  };

  const completeTutorial = () => {
    dispatch({ type: 'COMPLETE_TUTORIAL' });
  };

  const calculateProfileCompletion = () => {
    const { userProfile, userInterests } = state;
    const fields = [
      userProfile.displayName,
      userProfile.bio,
      userProfile.avatar,
      userProfile.location,
      userInterests.length > 0,
    ];
    
    const completedFields = fields.filter(Boolean).length;
    const progress = (completedFields / fields.length) * 100;
    
    dispatch({ type: 'UPDATE_PROFILE_COMPLETION', progress });
    return progress;
  };

  // Auto-calculate profile completion when relevant fields change
  useEffect(() => {
    calculateProfileCompletion();
  }, [state.userProfile, state.userInterests]);

  // Auto-complete onboarding when all steps are done
  useEffect(() => {
    const allStepsCompleted = Object.values(state.stepsCompleted).every(Boolean);
    if (allStepsCompleted && !state.isCompleted) {
      completeOnboarding();
    }
  }, [state.stepsCompleted, state.isCompleted]);

  const value = {
    state,
    dispatch,
    setCurrentStep,
    updateUserInterests,
    updateUserProfile,
    completeStep,
    completeOnboarding,
    completeTutorial,
    calculateProfileCompletion,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
