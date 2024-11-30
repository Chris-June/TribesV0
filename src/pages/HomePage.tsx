import { motion } from 'framer-motion';
import { useTribes } from '@/contexts/TribesContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, MessageSquare } from 'lucide-react';

export default function HomePage() {
  const { state: { userTribes } } = useTribes();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to IntelliSync Tribes</h1>
        <p className="text-muted-foreground text-lg">
          Your hub for connecting with like-minded innovators and creators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Your Tribes */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Tribes</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Total Tribes</span>
              </div>
              <Badge>{userTribes.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Active Members</span>
              </div>
              <Badge>{userTribes.reduce((acc, tribe) => acc + tribe.members.length, 0)}</Badge>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline">
            Explore More Tribes
          </Button>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>Recent Posts</span>
              </div>
              <Badge>12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span>Engagement Rate</span>
              </div>
              <Badge>85%</Badge>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline">
            View All Activity
          </Button>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              Create New Tribe
            </Button>
            <Button className="w-full" variant="outline">
              Join Tribe
            </Button>
            <Button className="w-full" variant="outline">
              Browse Tribes
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
