import { useDiscovery } from '@/contexts/DiscoveryContext';
import TrendingTribes from './TrendingTribes';
import RecommendedTribes from './RecommendedTribes';
import TribeFilters from './TribeFilters';
import SearchResults from './SearchResults';
import { Card } from '@/components/ui/card';
import { Compass } from 'lucide-react';

export default function DiscoveryPage() {
  const { state } = useDiscovery();

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Discover Tribes</h1>
            <p className="text-muted-foreground">
              Find and join communities that match your interests
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <TribeFilters />
      </Card>

      {/* Content */}
      <div className="space-y-8">
        {state.searchQuery ? (
          <SearchResults />
        ) : (
          <>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Trending Tribes</h2>
              <TrendingTribes />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Recommended for You
              </h2>
              <RecommendedTribes />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
