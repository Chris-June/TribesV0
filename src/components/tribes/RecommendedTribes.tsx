import { useDiscovery } from '@/contexts/DiscoveryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecommendedTribes() {
  const { state } = useDiscovery();

  if (state.error) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <p>Failed to load recommended tribes. Please try again later.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Recommended for You</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {state.loading.recommended ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-32 w-full" />
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-full mt-2" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            {state.recommendedTribes?.map((tribe, index) => (
              <motion.div
                key={tribe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tribe.image})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tribe.name}</CardTitle>
                      <Badge variant="outline">
                        {tribe.memberCount} members
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tribe.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Join Tribe
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
