import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Insight {
  id: string;
  type: 'growth' | 'engagement' | 'events' | 'activity';
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  timeframe: 'daily' | 'weekly' | 'monthly';
  details?: {
    label: string;
    value: number;
  }[];
}

interface TribeInsightsProps {
  tribeId: string;
}

export default function TribeInsights({ tribeId }: TribeInsightsProps) {
  // Mock data - replace with actual data from context
  const insights: Insight[] = [
    {
      id: '1',
      type: 'growth',
      title: 'Member Growth',
      value: 156,
      change: 23,
      trend: 'up',
      timeframe: 'weekly',
      details: [
        { label: 'New Members', value: 156 },
        { label: 'Active Members', value: 892 },
        { label: 'Engagement Rate', value: 78 },
      ],
    },
    {
      id: '2',
      type: 'engagement',
      title: 'Message Activity',
      value: 2345,
      change: -5,
      trend: 'down',
      timeframe: 'weekly',
      details: [
        { label: 'Total Messages', value: 2345 },
        { label: 'Active Threads', value: 45 },
        { label: 'Avg. Response Time', value: 12 },
      ],
    },
    {
      id: '3',
      type: 'events',
      title: 'Event Participation',
      value: 89,
      change: 12,
      trend: 'up',
      timeframe: 'monthly',
      details: [
        { label: 'Events Hosted', value: 8 },
        { label: 'Total Attendees', value: 89 },
        { label: 'Avg. Rating', value: 4.8 },
      ],
    },
    {
      id: '4',
      type: 'activity',
      title: 'Overall Activity',
      value: 92,
      change: 8,
      trend: 'up',
      timeframe: 'weekly',
      details: [
        { label: 'Active Hours', value: 245 },
        { label: 'Peak Time', value: 14 },
        { label: 'Quiet Hours', value: 4 },
      ],
    },
  ];

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'growth':
        return <Users className="h-5 w-5" />;
      case 'engagement':
        return <MessageSquare className="h-5 w-5" />;
      case 'events':
        return <Calendar className="h-5 w-5" />;
      case 'activity':
        return <Activity className="h-5 w-5" />;
    }
  };

  const getTrendIcon = (trend: Insight['trend']) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Tribe Insights</h2>
        </div>
        <Badge variant="outline">Last 7 days</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {insight.title}
                </CardTitle>
                {getInsightIcon(insight.type)}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {insight.value.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(insight.trend)}
                      <span
                        className={
                          insight.trend === 'up'
                            ? 'text-green-500'
                            : insight.trend === 'down'
                            ? 'text-red-500'
                            : ''
                        }
                      >
                        {Math.abs(insight.change)}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {insight.details?.map((detail) => (
                      <div
                        key={detail.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {detail.label}
                        </span>
                        <span>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
