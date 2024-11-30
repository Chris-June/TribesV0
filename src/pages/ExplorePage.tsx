import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTribes } from '@/contexts/TribesContext';

const categories = [
  'All',
  'Technology',
  'Art & Design',
  'Gaming',
  'Education',
  'Business',
  'Other',
];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { state: { userTribes } } = useTribes();

  // Combine all tribes for display
  const allTribes = [
    {
      id: 'intellisync-innovators',
      name: 'IntelliSync Innovators Hub',
      description: 'The official tribe for IntelliSync platform developers and enthusiasts.',
      image: 'https://source.unsplash.com/random/800x600/?artificial-intelligence-technology',
      category: 'Technology',
      members: 1000,
      isVerified: true,
    },
    ...userTribes.owned,
    ...userTribes.joined,
  ];

  const filteredTribes = allTribes.filter((tribe) => {
    const matchesSearch = tribe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tribe.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tribe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Tribes</h1>
        <p className="text-muted-foreground text-lg">
          Discover communities that match your interests
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tribes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTribes.map((tribe) => (
          <Card
            key={tribe.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/tribe/${tribe.id}`)}
          >
            <img
              src={tribe.image}
              alt={tribe.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold">{tribe.name}</h3>
                {tribe.isVerified && (
                  <Badge variant="secondary">Verified</Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {tribe.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{tribe.category}</Badge>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {tribe.members} {tribe.members === 1 ? 'member' : 'members'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTribes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tribes found matching your criteria</p>
        </div>
      )}
    </motion.div>
  );
}
