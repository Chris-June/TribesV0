import { useEngagement } from '@/contexts/EngagementContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Milestone, PartyPopper, Users, MessageSquare, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface TribeMilestone {
  id: string;
  type: 'members' | 'messages' | 'events' | 'achievements';
  title: string;
  description: string;
  target: number;
  current: number;
  reward?: {
    type: 'badge' | 'feature' | 'boost';
    value: string;
  };
  unlocksAt: number;
  celebrationDate?: Date;
}

interface TribeMilestonesProps {
  tribeId: string;
}

export default function TribeMilestones({ tribeId }: TribeMilestonesProps) {
  // Mock data - replace with actual data from context
  const milestones: TribeMilestone[] = [
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
    {
      id: '2',
      type: 'events',
      title: '100 Events Hosted',
      description: 'Successfully organize and complete 100 tribe events',
      target: 100,
      current: 92,
      reward: {
        type: 'feature',
        value: 'Custom Event Themes',
      },
      unlocksAt: 100,
    },
    // Add more milestones...
  ];

  const getMilestoneIcon = (type: TribeMilestone['type']) => {
    switch (type) {
      case 'members':
        return <Users className="h-5 w-5" />;
      case 'messages':
        return <MessageSquare className="h-5 w-5" />;
      case 'events':
        return <Calendar className="h-5 w-5" />;
      case 'achievements':
        return <PartyPopper className="h-5 w-5" />;
    }
  };

  const getProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Milestone className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Tribe Milestones</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-1 bg-primary transition-all"
                style={{
                  width: `${getProgress(milestone.current, milestone.target)}%`,
                }}
              />
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getMilestoneIcon(milestone.type)}
                    <h3 className="font-semibold">{milestone.title}</h3>
                  </div>
                  <Badge variant="outline">
                    {getProgress(milestone.current, milestone.target)}%
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{milestone.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {milestone.current.toLocaleString()} /{' '}
                      {milestone.target.toLocaleString()}
                    </span>
                  </div>

                  {milestone.reward && (
                    <div className="flex items-center space-x-2 text-sm">
                      <PartyPopper className="h-4 w-4 text-primary" />
                      <span>Unlocks: {milestone.reward.value}</span>
                    </div>
                  )}
                </div>

                {milestone.celebrationDate ? (
                  <div className="flex items-center justify-center space-x-2 bg-primary/10 p-2 rounded-md">
                    <PartyPopper className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      Achieved on{' '}
                      {new Date(milestone.celebrationDate).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={milestone.current < milestone.target}
                  >
                    {milestone.current >= milestone.target
                      ? 'Claim Reward'
                      : `${milestone.target - milestone.current} more to go`}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
