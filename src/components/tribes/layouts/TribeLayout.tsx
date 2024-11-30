import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTribes } from '@/contexts/TribesContext';
import { Tribe, TribeMember } from '@/types/tribes';
import { INTELLISYNC_TRIBE_ID } from '@/constants/defaultTribe';

interface TribeLayoutProps {
  tribe: Tribe;
  children?: ReactNode;
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
  mainContent?: ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  onJoin?: () => void;
  onLeave?: () => void;
}

export default function TribeLayout({
  tribe,
  children,
  headerContent,
  sidebarContent,
  mainContent,
  activeTab = 'about',
  onTabChange,
  onJoin,
  onLeave,
}: TribeLayoutProps) {
  const { state } = useTribes();
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
              <p className="text-white/80">
                {Array.isArray(tribe.members) ? tribe.members.length : 0} members
              </p>
            </div>
          </div>
          {!isIntelliSyncTribe && (
            <div className="absolute bottom-4 right-4">
              <Button
                variant={isMember ? "destructive" : "secondary"}
                onClick={isMember ? onLeave : onJoin}
                className="mr-2"
              >
                {isMember ? 'Leave Tribe' : 'Join Tribe'}
              </Button>
            </div>
          )}
          {headerContent}
        </div>

        {/* Tribe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">About</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                  <p>{tribe.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tribe.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {tribe.stats && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Stats</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Growth</p>
                        <p className="font-medium">+{tribe.stats.growth}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active</p>
                        <p className="font-medium">{tribe.stats.activeMembers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Posts/Week</p>
                        <p className="font-medium">{tribe.stats.postsPerWeek}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="font-medium">{tribe.stats.engagementRate}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            {sidebarContent}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                {isIntelliSyncTribe && <TabsTrigger value="engagement">Engagement</TabsTrigger>}
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>

              {children || mainContent}
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TribeAboutContent({
  tribe,
}: {
  tribe: Tribe;
}) {
  return (
    <TabsContent value="about">
      <div className="space-y-6">
        <div className="prose dark:prose-invert">
          <h2>Description</h2>
          <p>{tribe.description}</p>
        </div>

        {tribe.features && (
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Rules</h2>
          <ul className="space-y-2">
            {tribe.rules?.map((rule, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-muted-foreground">{index + 1}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TabsContent>
  );
}

export function TribeMembersContent({
  members,
}: {
  members: TribeMember[];
}) {
  return (
    <TabsContent value="members">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.length > 0 ? (
          members.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-center gap-4">
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
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        member.level === 'founder' ? 'bg-yellow-500/20 text-yellow-500' :
                        member.level === 'ai-partner' ? 'bg-blue-500/20 text-blue-500' :
                        member.level === 'gold' ? 'bg-amber-500/20 text-amber-500' :
                        'bg-gray-500/20 text-gray-500'
                      }`}
                    >
                      {member.level}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-8 text-muted-foreground">
            No members yet
          </div>
        )}
      </div>
    </TabsContent>
  );
}

export function TribeEngagementContent({
  tribe,
}: {
  tribe: Tribe;
}) {
  if (!tribe.engagement) return null;

  return (
    <TabsContent value="engagement">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
          <div className="space-y-4">
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
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Milestones</h3>
          <ul className="space-y-2">
            {tribe.engagement.recentMilestones.map((milestone, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>{milestone}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </TabsContent>
  );
}
