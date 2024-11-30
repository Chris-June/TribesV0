import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Users, Activity, Medal, Star, Flame } from 'lucide-react';
import ProgressCard from '@/components/gamification/ProgressCard';
import AchievementsList from '@/components/gamification/AchievementsList';
import TribeLeaderboard from '@/components/gamification/TribeLeaderboard';
import { useEngagement } from '@/contexts/EngagementContext';
import { Badge } from '@/components/ui/badge';
import { formatPoints } from '@/lib/gamification';

export default function ProfilePage() {
  const { memberProgress, achievements } = useEngagement();

  const stats = [
    {
      label: 'Level',
      value: memberProgress.currentLevel,
      icon: Trophy,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Total Points',
      value: formatPoints(memberProgress.totalPoints),
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Badges',
      value: memberProgress.badges.length.toString(),
      icon: Medal,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Achievements',
      value: achievements.filter(a => a.completed).length.toString(),
      icon: Flame,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Username</h1>
              <Badge variant="secondary" className="capitalize">
                {memberProgress.currentLevel} Level
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Member since {new Date().toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2">
              {memberProgress.badges.slice(0, 3).map((badge) => (
                <Badge
                  key={badge.id}
                  variant="outline"
                  className="gap-1 text-base"
                >
                  {badge.icon} {badge.name}
                </Badge>
              ))}
              {memberProgress.badges.length > 3 && (
                <Badge variant="outline">
                  +{memberProgress.badges.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <p className="text-2xl font-bold mt-2 capitalize">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="tribes">My Tribes</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressCard progress={memberProgress} />
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Global Rankings</h3>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <TribeLeaderboard
                  members={[
                    {
                      id: '1',
                      name: 'John Doe',
                      avatar: '/placeholder-avatar.jpg',
                      points: 1500,
                      level: 'gold',
                      rank: 1,
                    },
                    {
                      id: '2',
                      name: 'Jane Smith',
                      avatar: '/placeholder-avatar.jpg',
                      points: 1200,
                      level: 'silver',
                      rank: 2,
                    },
                    {
                      id: '3',
                      name: 'Mike Johnson',
                      avatar: '/placeholder-avatar.jpg',
                      points: 900,
                      level: 'silver',
                      rank: 3,
                    },
                  ]}
                />
              </ScrollArea>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementsList achievements={achievements} />
        </TabsContent>

        <TabsContent value="tribes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tribe cards will be populated here */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Tribe Name</h3>
                  <p className="text-sm text-muted-foreground">
                    100 members
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rank</span>
                  <span className="font-medium">#3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-medium">1,234</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {memberProgress.recentPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Activity className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{point.reason}</p>
                      <p className="text-xs text-muted-foreground">
                        {point.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-medium text-green-500">
                      +{point.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
