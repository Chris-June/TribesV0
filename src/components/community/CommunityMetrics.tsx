import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Award } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Metric = {
  id: string;
  title: string;
  value: number | string;
  description: string;
  trend: number;
  icon: any;
};

const metrics: Metric[] = [
  {
    id: '1',
    title: 'Active Members',
    value: '2,547',
    description: 'Members active in the last 30 days',
    trend: 12,
    icon: Users,
  },
  {
    id: '2',
    title: 'Discussions',
    value: '856',
    description: 'Total discussions this month',
    trend: 8,
    icon: MessageSquare,
  },
  {
    id: '3',
    title: 'Growth Rate',
    value: '24%',
    description: 'Member growth this month',
    trend: 15,
    icon: TrendingUp,
  },
  {
    id: '4',
    title: 'Top Contributors',
    value: '127',
    description: 'Members with high engagement',
    trend: 5,
    icon: Award,
  },
];

export default function CommunityMetrics() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Community Insights</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-muted-foreground">
                      {metric.description}
                    </p>
                    {metric.trend > 0 && (
                      <span className="text-xs text-green-500">
                        +{metric.trend}%
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
