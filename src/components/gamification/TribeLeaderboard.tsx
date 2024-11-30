import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { formatPoints } from '@/lib/gamification';
import { LeaderboardMember } from '@/types/tribes';

type TribeLeaderboardProps = {
  members: LeaderboardMember[];
};

const rankColors = {
  1: 'from-yellow-400 to-amber-600',
  2: 'from-gray-300 to-gray-500',
  3: 'from-amber-600 to-amber-800',
};

export default function TribeLeaderboard({ members }: TribeLeaderboardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-5 w-5 text-amber-500" />
        <h2 className="text-lg font-semibold">Top Contributors</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {members.map((member) => (
          <motion.div
            key={member.id}
            variants={item}
            className="relative"
          >
            <div
              className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                rankColors[member.rank as keyof typeof rankColors]
                  ? `bg-gradient-to-r ${
                      rankColors[member.rank as keyof typeof rankColors]
                    }`
                  : 'bg-muted/50'
              } rounded-lg`}
            />

            <div className="relative flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0 w-8 text-center">
                <span
                  className={`font-bold ${
                    member.rank <= 3 ? 'text-amber-500' : 'text-muted-foreground'
                  }`}
                >
                  #{member.rank}
                </span>
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{member.name}</p>
                  <span className="text-xs text-muted-foreground capitalize">
                    {member.level}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-semibold text-amber-500">
                  {formatPoints(member.points)}
                </span>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
}
