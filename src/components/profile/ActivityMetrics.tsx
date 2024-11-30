import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Activity, Users, MessageSquare, Flame } from "lucide-react";
import { UserActivityMetrics, UserEngagementStats } from "@/types/engagement";
import { formatDistanceToNow } from "date-fns";

interface ActivityMetricsProps {
  metrics: UserActivityMetrics;
  stats: UserEngagementStats;
}

export function ActivityMetrics({ metrics, stats }: ActivityMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Activity & Engagement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Online Status & Response Rate */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              metrics.onlineStatus === 'online' ? 'bg-green-500' :
              metrics.onlineStatus === 'away' ? 'bg-yellow-500' :
              metrics.onlineStatus === 'do_not_disturb' ? 'bg-red-500' :
              'bg-gray-500'
            }`} />
            <span className="text-sm capitalize">{metrics.onlineStatus.replace('_', ' ')}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary">
                  {metrics.responseRate}% Response Rate
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average response time: {stats.averageResponseTime} minutes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Activity Streak */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Activity Streak</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {metrics.activityStreak.current} days
            </span>
          </div>
          <Progress value={metrics.activityStreak.current} max={metrics.activityStreak.longest} />
          <p className="text-xs text-muted-foreground">
            Longest streak: {metrics.activityStreak.longest} days
          </p>
        </div>

        {/* Active Hours */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Usually Active</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {metrics.activeHours.start} - {metrics.activeHours.end} ({metrics.timeZone})
          </p>
        </div>

        {/* Most Active Tribes */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Most Active In</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {metrics.activeTribes.slice(0, 3).map((tribe) => (
              <TooltipProvider key={tribe.tribeId}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="secondary">
                      {tribe.tribeName}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Activity Score: {tribe.activityScore}%</p>
                    <p>Last active {formatDistanceToNow(tribe.lastInteraction)} ago</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Top Topics */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Favorite Topics</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {metrics.topicEngagement.slice(0, 3).map((topic) => (
              <TooltipProvider key={topic.topic}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline">
                      {topic.topic}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{topic.posts} posts</p>
                    <p>{topic.comments} comments</p>
                    <p>{topic.reactions} reactions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Consistency Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Consistency Score</span>
            <span className="text-sm text-muted-foreground">
              {stats.consistencyScore}%
            </span>
          </div>
          <Progress value={stats.consistencyScore} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
