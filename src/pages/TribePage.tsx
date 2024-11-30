import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTribes } from '@/contexts/TribesContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEngagement } from '@/contexts/EngagementContext';
import TribeLeaderboard from '@/components/gamification/TribeLeaderboard';
import AchievementsList from '@/components/gamification/AchievementsList';
import { TribeMember, LeaderboardMember } from '@/types/tribes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { INTELLISYNC_TRIBE_ID } from '@/constants/defaultTribe';

export default function TribePage() {
  const { id } = useParams();
  const { state, joinTribe, leaveTribe } = useTribes();
  const { memberProgress } = useEngagement();
  const [members, setMembers] = useState<TribeMember[]>([]);
  const [leaderboardMembers, setLeaderboardMembers] = useState<LeaderboardMember[]>([]);
  
  const tribe = state.userTribes.find(t => t.id === id) || state.discoveredTribes.find(t => t.id === id);

  useEffect(() => {
    if (tribe?.members) {
      const tribeMembers = Array.isArray(tribe.members) ? tribe.members : [];
      setMembers(tribeMembers);
      
      // Transform TribeMembers to LeaderboardMembers
      const leaderboard = tribeMembers.map((member, index) => ({
        id: member.id,
        name: member.name,
        avatar: member.avatar || `https://api.dicebear.com/7.x/avatars/svg?seed=${member.id}`, // Use DiceBear for default avatars
        points: member.progress?.totalPoints || 0,
        level: member.progress?.currentLevel || 'bronze',
        rank: index + 1
      }));
      
      // Sort by points in descending order and update ranks
      leaderboard.sort((a, b) => b.points - a.points);
      leaderboard.forEach((member, index) => {
        member.rank = index + 1;
      });
      
      setLeaderboardMembers(leaderboard);
    }
  }, [tribe]);

  if (!tribe) return <Navigate to="/app" replace />;

  const handleJoin = () => {
    if (id) joinTribe(id);
  };

  const handleLeave = () => {
    if (id) leaveTribe(id);
  };

  const isMember = state.userTribes.some(t => t.id === tribe.id);
  const isIntelliSyncTribe = tribe.id === INTELLISYNC_TRIBE_ID;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Tribe Header */}
        <div className="relative h-48 rounded-lg overflow-hidden">
          <img
            src={tribe.bannerImage || '/placeholder-banner.jpg'}
            alt={tribe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-4">
            <img
              src={tribe.avatar || '/placeholder-tribe.jpg'}
              alt={tribe.name}
              className="w-16 h-16 rounded-full border-4 border-background"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">{tribe.name}</h1>
              <p className="text-white/80">{members.length} members</p>
            </div>
          </div>
          {!isIntelliSyncTribe && (
            <div className="absolute bottom-4 right-4">
              <Button
                variant={isMember ? "destructive" : "secondary"}
                onClick={isMember ? handleLeave : handleJoin}
                className="mr-2"
              >
                {isMember ? 'Leave Tribe' : 'Join Tribe'}
              </Button>
            </div>
          )}
        </div>

        {/* Tribe Content */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            {isIntelliSyncTribe && <TabsTrigger value="engagement">Engagement</TabsTrigger>}
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="prose dark:prose-invert">
                  <h2>Description</h2>
                  <p>{tribe.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Rules</h2>
                  <ul className="space-y-2">
                    {Array.isArray(tribe.rules) && tribe.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isIntelliSyncTribe && tribe.features && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Features</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {tribe.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(tribe.tags) && tribe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {isIntelliSyncTribe && tribe.stats && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Community Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Growth</span>
                        <span>+{tribe.stats.growth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Members</span>
                        <span>{tribe.stats.activeMembers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Posts/Week</span>
                        <span>{tribe.stats.postsPerWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engagement Rate</span>
                        <span>{tribe.stats.engagementRate}%</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {members.length > 0 ? (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 p-4 rounded-lg border"
                  >
                    <img
                      src={member.avatar || '/placeholder-avatar.jpg'}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {member.role}
                      </p>
                      {member.level && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          member.level === 'founder' ? 'bg-yellow-500/20 text-yellow-500' :
                          member.level === 'ai-partner' ? 'bg-blue-500/20 text-blue-500' :
                          member.level === 'gold' ? 'bg-amber-500/20 text-amber-500' :
                          'bg-gray-500/20 text-gray-500'
                        }`}>
                          {member.level}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-muted-foreground">
                  No members yet
                </div>
              )}
            </div>
          </TabsContent>

          {isIntelliSyncTribe && tribe.engagement && (
            <TabsContent value="engagement">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Posts</span>
                      <span>{tribe.engagement.totalPosts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Events</span>
                      <span>{tribe.engagement.totalEvents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Polls</span>
                      <span>{tribe.engagement.totalPolls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly Growth</span>
                      <span>+{tribe.engagement.weeklyGrowth}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tribe.engagement.recentMilestones.map((milestone, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          <TabsContent value="achievements">
            <AchievementsList achievements={memberProgress.achievements} />
          </TabsContent>

          <TabsContent value="leaderboard">
            <TribeLeaderboard members={leaderboardMembers} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
