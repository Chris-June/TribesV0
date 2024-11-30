import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Network,
  Users,
  TrendingUp,
  Award,
  Share2,
  Zap,
  Globe,
  UserPlus,
  Activity
} from "lucide-react";
import { NetworkAnalysis, NetworkConnection, DomainExpertStatus } from "@/types/network";
import { formatDistanceToNow } from "date-fns";

interface NetworkAnalysisProps {
  data: NetworkAnalysis;
}

function ConnectionCard({ connection }: { connection: NetworkConnection }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border">
      <Avatar className="w-10 h-10">
        <AvatarImage src={connection.avatar} />
        <AvatarFallback>{connection.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium truncate">{connection.name}</h4>
          <Badge variant={
            connection.strength === 'strong' ? 'default' :
            connection.strength === 'moderate' ? 'secondary' : 'outline'
          }>
            {connection.strength}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="capitalize">{connection.role}</span>
          <span>•</span>
          <span>{connection.commonTribes.length} common tribes</span>
          <span>•</span>
          <span>{connection.commonProjects} projects</span>
        </div>
      </div>
    </div>
  );
}

function DomainExpertCard({ status }: { status: DomainExpertStatus }) {
  return (
    <div className="space-y-2 p-3 rounded-lg border">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{status.domain}</h4>
        <Badge variant={
          status.level === 'thought-leader' ? 'default' :
          status.level === 'expert' ? 'secondary' :
          'outline'
        }>
          {status.level}
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Impact Score</span>
          <span>{status.impact}%</span>
        </div>
        <Progress value={status.impact} className="h-1" />
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{status.endorsements} endorsements</span>
        <span>•</span>
        <span>{status.contributions} contributions</span>
        {status.trending && (
          <>
            <span>•</span>
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-green-500">Trending</span>
          </>
        )}
      </div>
    </div>
  );
}

export function NetworkAnalysisCard({ data }: NetworkAnalysisProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {/* Network Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Network className="w-5 h-5" />
            Network Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Reach Score</span>
                <span className="text-sm">{data.metrics.reachScore}%</span>
              </div>
              <Progress value={data.metrics.reachScore} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Diversity</span>
                <span className="text-sm">{data.metrics.diversityScore}%</span>
              </div>
              <Progress value={data.metrics.diversityScore} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Connection Distribution
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              {Object.entries(data.metrics.connectionsByType).map(([type, count]) => (
                <div key={type} className="p-2 rounded-lg border">
                  <div className="text-2xl font-semibold">{count}</div>
                  <div className="text-xs text-muted-foreground capitalize">{type}s</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Influence Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Influence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Influence</span>
              <span className="text-sm">{data.influence.overall}%</span>
            </div>
            <Progress value={data.influence.overall} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Reach</div>
              <div className="text-2xl font-semibold">{data.influence.reach}</div>
              <div className="text-xs text-muted-foreground">Network members</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Engagement</div>
              <div className="text-2xl font-semibold">{data.influence.engagement}</div>
              <div className="text-xs text-muted-foreground">Active interactions</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Top Domains</h3>
            <div className="flex flex-wrap gap-2">
              {data.influence.topDomains.map((domain) => (
                <Badge key={domain} variant="secondary">{domain}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Expertise */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Award className="w-5 h-5" />
            Domain Expertise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {data.domainExpertise.map((status) => (
              <DomainExpertCard key={status.domain} status={status} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-functional Connections */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Cross-functional Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.crossFunctional.map((metric) => (
              <div key={metric.domain} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{metric.domain}</h4>
                  <Badge variant="outline">
                    {metric.growth > 0 ? '+' : ''}{metric.growth}% growth
                  </Badge>
                </div>
                <Progress value={metric.impact} className="h-1" />
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{metric.connections} connections</span>
                  <span>•</span>
                  <span>{metric.projects} projects</span>
                  <span>•</span>
                  <span>{metric.impact}% impact</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Connections */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Active Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {data.connections.map((connection) => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recommended Connections */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Recommended Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {data.recommendedConnections.map((connection) => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
