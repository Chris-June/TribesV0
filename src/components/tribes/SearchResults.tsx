import { useDiscovery } from '@/contexts/DiscoveryContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SearchResults() {
  const { state } = useDiscovery();

  const filteredTribes = state.tribes.filter(tribe => {
    const matchesSearch = state.searchQuery
      ? tribe.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        tribe.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      : false;

    const matchesCategories = state.selectedCategories.length === 0 ||
      state.selectedCategories.includes(tribe.category);

    const matchesFilters =
      tribe.members >= state.filters.minMembers &&
      tribe.members <= state.filters.maxMembers &&
      (!state.filters.isVerified || tribe.isVerified);

    return matchesSearch && matchesCategories && matchesFilters;
  });

  if (!state.searchQuery && state.selectedCategories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Search Results</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {filteredTribes.length} {filteredTribes.length === 1 ? 'tribe' : 'tribes'} found
        </span>
      </div>

      {state.loading.search ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            {filteredTribes.map((tribe) => (
              <motion.div
                key={tribe.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden">
                  <div
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tribe.image})` }}
                  />
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{tribe.name}</h3>
                        <Badge variant={tribe.privacy === 'public' ? 'default' : 'secondary'}>
                          {tribe.privacy}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tribe.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {tribe.members.toLocaleString()} members
                      </span>
                      {tribe.isVerified && (
                        <Badge variant="outline" className="bg-primary/10">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {filteredTribes.length === 0 && !state.loading.search && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Search className="h-12 w-12 text-muted-foreground/50" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No tribes found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
