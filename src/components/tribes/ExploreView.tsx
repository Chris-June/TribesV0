import { useDiscovery } from '@/contexts/DiscoveryContext';
import TribeSearch from './TribeSearch';
import TribeFilters from './TribeFilters';
import TrendingTribes from './TrendingTribes';
import RecommendedTribes from './RecommendedTribes';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function TribeCard({ tribe }: { tribe: Tribe }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-card rounded-lg p-4 space-y-4"
    >
      <div className="aspect-video relative rounded-md overflow-hidden">
        <img
          src={tribe.coverImage}
          alt={tribe.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{tribe.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tribe.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{tribe.memberCount} members</span>
          <span>•</span>
          <span>{tribe.category}</span>
        </div>
      </div>
    </motion.div>
  );
}

function SearchResults() {
  const { state } = useDiscovery();
  const filteredTribes = state.tribes.filter((tribe) => {
    const matchesSearch = state.searchQuery
      ? tribe.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        tribe.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      : true;

    const matchesCategories = state.selectedCategories.length
      ? state.selectedCategories.includes(tribe.categoryId)
      : true;

    const matchesMembers =
      tribe.memberCount >= state.filters.minMembers &&
      (state.filters.maxMembers === Infinity ||
        tribe.memberCount <= state.filters.maxMembers);

    const matchesVerified = state.filters.isVerified
      ? tribe.isVerified
      : true;

    return matchesSearch && matchesCategories && matchesMembers && matchesVerified;
  });

  return (
    <AnimatePresence mode="wait">
      {state.loading.search ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredTribes.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredTribes.map((tribe) => (
            <TribeCard key={tribe.id} tribe={tribe} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-lg text-muted-foreground">
            No tribes found matching your criteria
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ExploreView() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Explore Tribes</h1>
        <TribeFilters />
      </div>

      <TribeSearch />

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-8">
          <TrendingTribes />
          <RecommendedTribes />
          <SearchResults />
        </div>
      </ScrollArea>
    </div>
  );
}
