import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Award,
  Trophy,
  Star,
  Heart,
  Shield,
  TrendingUp,
  Crown,
  Medal,
  Flame,
  Share2
} from "lucide-react";
import { CommunityRecognition, Achievement } from "@/types/recognition";
import { formatDistanceToNow } from "date-fns";

interface CommunityRecognitionProps {
  data: CommunityRecognition;
}

const rarityColors = {
  common: 'bg-slate-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-orange-500'
};

const roleIcons = {
  member: Shield,
  contributor: Star,
  mentor: Heart,
  expert: Trophy,
  leader: Crown,
  ambassador: Medal
};

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.type === 'solution' ? Trophy :
               achievement.type === 'innovation' ? Star :
               achievement.type === 'mentorship' ? Heart :
               achievement.type === 'contribution' ? Medal :
               Crown;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border">
      <div className={`rounded-full p-2 ${rarityColors[achievement.rarity]} bg-opacity-10`}>
        <Icon className={`w-4 h-4 ${rarityColors[achievement.rarity]} text-opacity-100`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium truncate">{achievement.title}</h4>
          <Badge variant="secondary" className="shrink-0">
            {achievement.rarity}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
        {achievement.progress && (
          <div className="mt-2 space-y-1">
            <Progress 
              value={(achievement.progress.current / achievement.progress.total) * 100}
              className="h-1"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{achievement.progress.current}/{achievement.progress.total}</span>
              <span>{formatDistanceToNow(achievement.dateEarned)} ago</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CommunityRecognitionCard({ data }: CommunityRecognitionProps) {
  const RoleIcon = roleIcons[data.role];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Award className="w-5 h-5" />
          Community Recognition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Reputation and Role */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Reputation</span>
              <span className="text-sm">{data.reputationScore}</span>
            </div>
            <Progress value={data.reputationScore} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Help Points: {data.helpPoints}</span>
              {(data.weeklyRank || data.monthlyRank) && (
                <span>
                  {data.weeklyRank && `#${data.weeklyRank} this week`}
                  {data.weeklyRank && data.monthlyRank && ' • '}
                  {data.monthlyRank && `#${data.monthlyRank} this month`}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Trust Score</span>
              <span className="text-sm">{data.trustScore}%</span>
            </div>
            <Progress value={data.trustScore} className="h-2" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RoleIcon className="w-3 h-3" />
              <span className="capitalize">{data.role}</span>
              <span>•</span>
              <span>Member since {formatDistanceToNow(data.memberSince)} ago</span>
            </div>
          </div>
        </div>

        {/* Special Status */}
        {data.specialStatus.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.specialStatus.map((status, index) => (
              <Badge key={index} variant="secondary">
                {status}
              </Badge>
            ))}
          </div>
        )}

        {/* Recent Achievements */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Recent Achievements
          </h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {data.achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Featured Contributions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Star className="w-4 h-4" />
            Featured Contributions
          </h3>
          <div className="space-y-3">
            {data.featuredContributions.slice(0, 3).map((contribution) => (
              <div key={contribution.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="rounded-full p-2 bg-primary/10">
                  {contribution.type === 'post' ? <Share2 className="w-4 h-4 text-primary" /> :
                   contribution.type === 'solution' ? <Trophy className="w-4 h-4 text-primary" /> :
                   contribution.type === 'resource' ? <Star className="w-4 h-4 text-primary" /> :
                   <Flame className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium">{contribution.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{contribution.description}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {contribution.impact}% impact
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{contribution.engagement.views} views</span>
                    <span>{contribution.engagement.likes} likes</span>
                    <span>{contribution.engagement.comments} comments</span>
                    {contribution.tribe && (
                      <>
                        <span>•</span>
                        <span>{contribution.tribe.name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Recognitions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Medal className="w-4 h-4" />
            Recent Recognition
          </h3>
          <div className="space-y-2">
            {data.recognitions.slice(0, 3).map((recognition) => (
              <div key={recognition.id} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={recognition.awardedBy.avatar} />
                  <AvatarFallback>{recognition.awardedBy.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{recognition.awardedBy.name}</span>
                    <span className="text-muted-foreground"> recognized you for </span>
                    <span className="font-medium">{recognition.title}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(recognition.dateAwarded)} ago
                    {recognition.tribe && ` • ${recognition.tribe.name}`}
                  </p>
                </div>
                <Badge variant="outline">{recognition.impact}% impact</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
