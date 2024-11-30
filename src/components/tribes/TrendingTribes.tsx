import { useDiscovery } from '@/contexts/DiscoveryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Tribe } from '@/types/tribes';
import { useNavigate } from 'react-router-dom';

export default function TrendingTribes() {
  const { state } = useDiscovery();
  const navigate = useNavigate();

  const handleTribeClick = (tribeId: string) => {
    navigate(`/app/tribes/${tribeId}`);
  };

  if (state.error) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <p>Failed to load trending tribes. Please try again later.</p>
        </div>
      </Card>
    );
  }

  if (!state.trendingTribes || state.trendingTribes.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <p>No trending tribes available at the moment.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Trending Tribes</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {state.loading.trending ? (
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
            {state.trendingTribes.map((tribe: Tribe, index: number) => (
              <motion.div
                key={tribe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-32">
                    <img
                      src={tribe.image}
                      alt={tribe.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-black/50">
                        {tribe.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tribe.name}</CardTitle>
                      {tribe.isVerified && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tribe.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {tribe.members?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleTribeClick(tribe.id)}
                    >
                      View Tribe
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
