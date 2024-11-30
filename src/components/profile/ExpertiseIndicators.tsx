import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Star, Award, TrendingUp, CheckCircle2, Users } from "lucide-react";
import { ExpertiseMetrics, ExpertiseLevel } from "@/types/expertise";
import { formatDistanceToNow } from "date-fns";

interface ExpertiseIndicatorsProps {
  metrics: ExpertiseMetrics;
}

const levelColors: Record<ExpertiseLevel, string> = {
  beginner: 'bg-blue-500',
  intermediate: 'bg-green-500',
  advanced: 'bg-yellow-500',
  expert: 'bg-purple-500',
  master: 'bg-red-500'
};

const levelIcons: Record<ExpertiseLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
  master: 5
};

export function ExpertiseIndicators({ metrics }: ExpertiseIndicatorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Expertise & Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Expertise Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Expertise Score</span>
            </div>
            <span className="text-sm font-medium">{metrics.expertiseScore}%</span>
          </div>
          <Progress value={metrics.expertiseScore} className="h-2" />
        </div>

        {/* Primary Skills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Primary Skills</span>
            </div>
            <Badge variant="outline">
              {metrics.verifiedSkills} Verified
            </Badge>
          </div>
          <ScrollArea className="h-[200px] pr-4">
            {metrics.primarySkills.map((skill) => (
              <div key={skill.name} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    {skill.verified && (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: levelIcons[skill.level] }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-3 rounded-sm ${levelColors[skill.level]}`}
                      />
                    ))}
                  </div>
                </div>
                <Progress 
                  value={(skill.experiencePoints / (skill.experiencePoints + skill.pointsToNextLevel)) * 100} 
                  className="h-1.5" 
                />
                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                  <span>{skill.level}</span>
                  <span>Last used {formatDistanceToNow(skill.lastUsed)} ago</span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Contribution Quality */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Contribution Quality</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(metrics.contributionQuality).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs capitalize">{key}</span>
                  <span className="text-xs">{value}%</span>
                </div>
                <Progress value={value} className="h-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Endorsers */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Endorsements</span>
            </div>
            <Badge variant="secondary">{metrics.totalEndorsements} total</Badge>
          </div>
          <div className="flex -space-x-2">
            {metrics.primarySkills
              .flatMap(skill => skill.endorsements)
              .slice(0, 5)
              .map((endorsement, index) => (
                <TooltipProvider key={endorsement.endorserId}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="border-2 border-background w-8 h-8">
                        <AvatarImage src={endorsement.endorserAvatar} />
                        <AvatarFallback>{endorsement.endorserName[0]}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{endorsement.endorserName}</p>
                      <p className="text-xs text-muted-foreground">
                        {endorsement.endorserLevel} • Endorsed {formatDistanceToNow(endorsement.endorsementDate)} ago
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
