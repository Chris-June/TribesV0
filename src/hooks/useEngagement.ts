import { useContext } from 'react';
import { EngagementContext } from '@/contexts/EngagementContext';

export function useEngagement() {
  const context = useContext(EngagementContext);
  if (!context) {
    throw new Error('useEngagement must be used within an EngagementProvider');
  }
  return context;
}
