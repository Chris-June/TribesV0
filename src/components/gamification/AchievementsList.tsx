import { motion } from 'framer-motion';
import { Achievement } from '@/types/gamification';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Lock } from 'lucide-react';

type AchievementsListProps = {
  achievements: Achievement[];
};

export default function AchievementsList({
  achievements,
}: AchievementsListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {achievements.map((achievement) => (
        <motion.div key={achievement.id} variants={item}>
          <Card className="p-4">
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-lg ${
                  achievement.completed
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">
                    {achievement.name}
                  </h3>
                  {achievement.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {achievement.description}
                </p>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>
                      {achievement.progress} / {achievement.maxProgress}
                    </span>
                  </div>
                  <Progress
                    value={(achievement.progress / achievement.maxProgress) * 100}
                    className="h-2"
                  />
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Reward
                  </span>
                  <span className="font-medium text-amber-500">
                    +{achievement.reward} points
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
