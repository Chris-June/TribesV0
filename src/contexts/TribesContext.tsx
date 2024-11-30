import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Tribe } from '@/types/tribes';
import { mockTribes, mockDiscoveredTribes } from '@/mocks/tribeMocks';
import { createNewTribe } from '@/utils/tribeUtils';
import { useEngagement } from './EngagementContext';
import { defaultTribe } from '@/constants/defaultTribe';

type TribesState = {
  userTribes: Tribe[];
  discoveredTribes: Tribe[];
};

type TribesAction =
  | { type: 'CREATE_TRIBE'; payload: Partial<Tribe> }
  | { type: 'JOIN_TRIBE'; payload: string }
  | { type: 'LEAVE_TRIBE'; payload: string }
  | { type: 'UPDATE_TRIBE'; payload: Tribe };

const TribesContext = createContext<{
  state: TribesState;
  createTribe: (tribeData: Partial<Tribe>) => Promise<Tribe>;
  joinTribe: (tribeId: string) => void;
  leaveTribe: (tribeId: string) => void;
  updateTribe: (tribe: Tribe) => void;
} | null>(null);

const initialState: TribesState = {
  userTribes: [defaultTribe, ...mockTribes],
  discoveredTribes: mockDiscoveredTribes,
};

const tribesReducer = (state: TribesState, action: TribesAction): TribesState => {
  switch (action.type) {
    case 'CREATE_TRIBE': {
      const newTribe = createNewTribe(action.payload);
      return {
        ...state,
        userTribes: [...state.userTribes.filter(t => t.id !== defaultTribe.id), defaultTribe, newTribe],
      };
    }
    case 'JOIN_TRIBE': {
      const tribe = state.discoveredTribes.find(t => t.id === action.payload);
      if (!tribe) return state;
      
      return {
        ...state,
        userTribes: [...state.userTribes.filter(t => t.id !== defaultTribe.id), defaultTribe, { ...tribe, members: tribe.members + 1 }],
        discoveredTribes: state.discoveredTribes.filter(t => t.id !== action.payload),
      };
    }
    case 'LEAVE_TRIBE': {
      const tribe = state.userTribes.find(t => t.id === action.payload);
      if (!tribe) return state;
      
      return {
        ...state,
        userTribes: [...state.userTribes.filter(t => t.id !== defaultTribe.id), defaultTribe].filter(t => t.id !== action.payload),
        discoveredTribes: [...state.discoveredTribes, { ...tribe, members: tribe.members - 1 }],
      };
    }
    case 'UPDATE_TRIBE': {
      return {
        ...state,
        userTribes: [...state.userTribes.filter(t => t.id !== defaultTribe.id), defaultTribe].map(tribe => 
          tribe.id === action.payload.id ? action.payload : tribe
        ),
        discoveredTribes: state.discoveredTribes.map(tribe => 
          tribe.id === action.payload.id ? action.payload : tribe
        ),
      };
    }
    default:
      return state;
  }
};

export function TribesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tribesReducer, initialState);
  const { initializeEngagement } = useEngagement();

  const createTribe = async (tribeData: Partial<Tribe>): Promise<Tribe> => {
    try {
      // Check for duplicate tribe names
      const isDuplicateName = [...state.userTribes, ...state.discoveredTribes]
        .some(tribe => tribe.name.toLowerCase() === tribeData.name?.toLowerCase());
      
      if (isDuplicateName) {
        throw new Error('A tribe with this name already exists.');
      }

      const newTribe = createNewTribe({
        ...tribeData,
        owner: {
          id: 'current-user-id', // Replace with actual user ID from auth context
          name: 'Current User', // Replace with actual user name
          role: 'Owner',
          avatar: 'https://source.unsplash.com/random/100x100/?avatar',
        },
      });
      dispatch({ type: 'CREATE_TRIBE', payload: newTribe });
      await initializeEngagement(newTribe.id);
      return newTribe;
    } catch (error) {
      console.error('Error creating tribe:', error);
      throw error;
    }
  };

  const joinTribe = (tribeId: string) => {
    try {
      dispatch({ type: 'JOIN_TRIBE', payload: tribeId });
    } catch (error) {
      console.error('Error joining tribe:', error);
      throw error;
    }
  };

  const leaveTribe = (tribeId: string) => {
    try {
      dispatch({ type: 'LEAVE_TRIBE', payload: tribeId });
    } catch (error) {
      console.error('Error leaving tribe:', error);
      throw error;
    }
  };

  const updateTribe = (tribe: Tribe) => {
    try {
      dispatch({ type: 'UPDATE_TRIBE', payload: tribe });
    } catch (error) {
      console.error('Error updating tribe:', error);
      throw error;
    }
  };

  const value = {
    state,
    createTribe,
    joinTribe,
    leaveTribe,
    updateTribe,
  };

  return <TribesContext.Provider value={value}>{children}</TribesContext.Provider>;
}

export const useTribes = () => {
  const context = useContext(TribesContext);
  if (!context) {
    throw new Error('useTribes must be used within a TribesProvider');
  }
  return context;
};