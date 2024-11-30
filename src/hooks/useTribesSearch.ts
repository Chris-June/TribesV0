import { useState, useMemo } from 'react';
import { Tribe } from '@/types/tribes';

interface UseTribesSearchProps {
  tribes: Tribe[];
}

interface UseTribesSearchResult {
  filteredTribes: Tribe[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
}

export function useTribesSearch({ tribes }: UseTribesSearchProps): UseTribesSearchResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const filteredTribes = useMemo(() => {
    return tribes.filter(tribe => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        tribe.name.toLowerCase().includes(searchLower) ||
        tribe.description.toLowerCase().includes(searchLower) ||
        tribe.tags?.some(tag => tag.toLowerCase().includes(searchLower));

      // Category filter
      const matchesCategory = !selectedCategory || tribe.category === selectedCategory;

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => tribe.tags?.includes(tag));

      // Features filter
      const matchesFeatures = selectedFeatures.length === 0 || 
        selectedFeatures.every(feature => tribe.features?.includes(feature));

      return matchesSearch && matchesCategory && matchesTags && matchesFeatures;
    });
  }, [tribes, searchQuery, selectedCategory, selectedTags, selectedFeatures]);

  return {
    filteredTribes,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    selectedFeatures,
    setSelectedFeatures,
  };
}
