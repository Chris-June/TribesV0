import { useState, useEffect } from 'react';
import { useTribes } from '@/contexts/TribesContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Search, X, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTribesSearch } from '@/hooks/useTribesSearch';
import { TRIBE_CATEGORIES } from '@/config/tribeConfig';

const searchVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export default function TribeSearch() {
  const { state: { userTribes, discoveredTribes } } = useTribes();
  const [open, setOpen] = useState(false);
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  const allTribes = [...userTribes, ...discoveredTribes];
  const {
    filteredTribes,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags
  } = useTribesSearch({ tribes: allTribes });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setOpen(false);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
  };

  const handleClearTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // Get all unique tags from the selected category
  const availableTags = selectedCategory
    ? TRIBE_CATEGORIES.find(c => c.id === selectedCategory)?.suggestedTags || []
    : Array.from(new Set(allTribes.flatMap(tribe => tribe.tags || [])));

  return (
    <div className="space-y-4">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key="search"
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
            <Input
              type="text"
              placeholder="Search tribes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Category Selection */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8">
              Categories
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandList>
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup>
                  {TRIBE_CATEGORIES.map((category) => (
                    <CommandItem
                      key={category.id}
                      onSelect={() => handleCategorySelect(category.id)}
                      className="flex items-center gap-2"
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Tag Selection */}
        <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8">
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {availableTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() => handleTagSelect(tag)}
                      className="flex items-center gap-2"
                    >
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        selectedTags.includes(tag) ? "bg-primary" : "bg-muted"
                      )} />
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Selected Filters */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Badge
                variant="secondary"
                className="h-8 gap-1 pl-2 pr-1 hover:bg-secondary/80 transition-colors"
              >
                {TRIBE_CATEGORIES.find(c => c.id === selectedCategory)?.icon}
                {TRIBE_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-secondary-foreground/10"
                  onClick={handleClearCategory}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </motion.div>
          )}

          {selectedTags.map((tag) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Badge
                variant="secondary"
                className="h-8 gap-1 pl-2 pr-1 hover:bg-secondary/80 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-secondary-foreground/10"
                  onClick={() => handleClearTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
