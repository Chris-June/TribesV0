import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, TrendingUp, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MemberProgress } from '@/types/gamification';
import { formatPoints } from '@/lib/gamification';

const levelColors = {
  bronze: 'from-orange-500 to-orange-700',
  silver: 'from-gray-400 to-gray-600',
  gold: 'from-yellow-500 to-yellow-700',
  platinum: 'from-purple-500 to-purple-700',
  diamond: 'from-blue-500 to-blue-700',
};

const levelIcons = {
  bronze: Trophy,
  silver: Star,
  gold: Award,
  platinum: Zap,
  diamond: TrendingUp,
};

type ProgressCardProps = {
  progress: MemberProgress;
};

export default function ProgressCard({ progress }: ProgressCardProps) {
  const LevelIcon = levelIcons[progress.currentLevel];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            className={`p-2 rounded-lg bg-gradient-to-br ${
              levelColors[progress.currentLevel]
            }`}
          >
            <LevelIcon className="h-5 w-5 text-white" />
          </motion.div>
          <span className="capitalize">{progress.currentLevel} Level</span>
        </CardTitle>
        <CardDescription>
          {progress.nextLevel
            ? `${formatPoints(progress.pointsNeeded)} points to ${
                progress.nextLevel
              }`
            : 'Maximum level achieved!'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {Math.round(progress.progress)}%
            </span>
          </div>
          <Progress value={progress.progress} className="h-2" />
        </div>

        {/* Recent Points */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Activity</h4>
          <div className="space-y-1">
            <AnimatePresence>
              {progress.recentPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-muted-foreground">
                    {point.reason}
                  </span>
                  <span className="font-medium text-green-500">
                    +{point.amount}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Badges Earned</h4>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              {progress.badges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger>
                    <Badge
                      variant="secondary"
                      className="text-base cursor-help"
                    >
                      {badge.icon} {badge.name}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                    {badge.earnedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Earned {badge.earnedAt.toLocaleDateString()}
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>

        {/* Total Points */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Points</span>
            <motion.span
              key={progress.totalPoints}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold"
            >
              {formatPoints(progress.totalPoints)}
            </motion.span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
