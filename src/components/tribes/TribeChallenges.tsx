import { useEngagement } from '@/contexts/EngagementContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Timer, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'tribe';
  startDate: Date;
  endDate: Date;
  reward: {
    type: 'achievement' | 'points' | 'role';
    value: string;
  };
  progress: number;
  participants: number;
  requirements: {
    type: 'posts' | 'events' | 'reactions' | 'invites';
    target: number;
    current: number;
  }[];
  leaderboard: {
    userId: string;
    score: number;
    rank: number;
  }[];
}

interface TribeChallengesProps {
  tribeId: string;
}

export default function TribeChallenges({ tribeId }: TribeChallengesProps) {
  // Mock data - replace with actual data from context
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Community Builder',
      description: 'Grow the tribe by inviting new members and fostering engagement',
      type: 'individual',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reward: {
        type: 'achievement',
        value: 'Community Champion',
      },
      progress: 65,
      participants: 24,
      requirements: [
        {
          type: 'invites',
          target: 5,
          current: 3,
        },
        {
          type: 'posts',
          target: 10,
          current: 7,
        },
      ],
      leaderboard: [
        { userId: '1', score: 850, rank: 1 },
        { userId: '2', score: 720, rank: 2 },
      ],
    },
    // Add more challenges...
  ];

  const getRewardIcon = (type: Challenge['reward']['type']) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="h-4 w-4" />;
      case 'points':
        return <Star className="h-4 w-4" />;
      case 'role':
        return <Users className="h-4 w-4" />;
    }
  };

  const getDaysRemaining = (endDate: Date) => {
    const days = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Active Challenges</h2>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence>
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{challenge.title}</CardTitle>
                    <Badge variant="outline">{challenge.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Timer className="h-4 w-4" />
                      <span>{getDaysRemaining(challenge.endDate)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Requirements:</h4>
                    <div className="space-y-1">
                      {challenge.requirements.map((req) => (
                        <div
                          key={req.type}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="capitalize">{req.type}</span>
                          <span>
                            {req.current}/{req.target}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <span>Reward:</span>
                    <div className="flex items-center space-x-1">
                      {getRewardIcon(challenge.reward.type)}
                      <span>{challenge.reward.value}</span>
                    </div>
                  </div>

                  <Button className="w-full">Join Challenge</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
