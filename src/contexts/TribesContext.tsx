import { createContext, useContext, useReducer } from 'react';

export interface Tribe {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  privacy: 'public' | 'private';
  memberApproval: 'automatic' | 'manual';
  channels: string[];
  createdBy: string;
  members: number;
}

interface TribesState {
  tribes: Tribe[];
  loading: boolean;
  error: string | null;
}

type TribesAction =
  | { type: 'ADD_TRIBE'; tribe: Tribe }
  | { type: 'SET_TRIBES'; tribes: Tribe[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string };

const initialState: TribesState = {
  tribes: [],
  loading: false,
  error: null,
};

const TribesContext = createContext<{
  state: TribesState;
  dispatch: React.Dispatch<TribesAction>;
} | null>(null);

function tribesReducer(state: TribesState, action: TribesAction): TribesState {
  switch (action.type) {
    case 'ADD_TRIBE':
      return {
        ...state,
        tribes: [...state.tribes, action.tribe],
      };
    case 'SET_TRIBES':
      return {
        ...state,
        tribes: action.tribes,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export function TribesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tribesReducer, initialState);

  return (
    <TribesContext.Provider value={{ state, dispatch }}>
      {children}
    </TribesContext.Provider>
  );
}

export function useTribes() {
  const context = useContext(TribesContext);
  if (!context) {
    throw new Error('useTribes must be used within a TribesProvider');
  }
  return context;
}