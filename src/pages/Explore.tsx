import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const tribes = [
  {
    id: '1',
    name: 'Gaming Enthusiasts',
    description: 'A community for gamers to discuss their favorite titles',
    members: 1234,
    image: 'https://source.unsplash.com/random/400x300?gaming',
    tags: ['Gaming', 'Esports', 'Streaming'],
  },
  {
    id: '2',
    name: 'Tech Innovators',
    description: 'Discussing the latest in technology and innovation',
    members: 892,
    image: 'https://source.unsplash.com/random/400x300?technology',
    tags: ['Technology', 'Programming', 'AI'],
  },
  {
    id: '3',
    name: 'Digital Artists',
    description: 'Share and discuss digital art and techniques',
    members: 567,
    image: 'https://source.unsplash.com/random/400x300?art',
    tags: ['Art', 'Digital', 'Design'],
  },
];

export default function Explore() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Explore Tribes</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tribes..."
            className="pl-9 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tribes.map((tribe, index) => (
          <motion.div
            key={tribe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={tribe.image}
                  alt={tribe.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{tribe.name}</span>
                  <Badge variant="secondary">{tribe.members} members</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tribe.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tribe.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">Join Tribe</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}