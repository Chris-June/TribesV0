import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Crown,
  Shield,
  Calendar,
  Tag,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTribes } from '@/contexts/TribesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Tribe } from '@/types/tribes';

export default function TribePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: { userTribes }, joinTribe, leaveTribe } = useTribes();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tribe, setTribe] = useState<Tribe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Find tribe in user's tribes
    const foundTribe =
      userTribes.owned.find((t) => t.id === id) ||
      userTribes.joined.find((t) => t.id === id);

    if (foundTribe) {
      setTribe(foundTribe);
    } else if (id === 'intellisync-innovators') {
      // Master tribe
      setTribe({
        id: 'intellisync-innovators',
        name: 'IntelliSync Innovators Hub',
        description: 'The official tribe for IntelliSync platform developers and enthusiasts.',
        image: 'https://source.unsplash.com/random/800x600/?artificial-intelligence-technology',
        category: 'Technology',
        members: 1000,
        isVerified: true,
        privacy: 'public',
        memberApproval: 'automatic',
        createdAt: '2024-01-01T00:00:00.000Z',
        owner: {
          id: 'system',
          name: 'IntelliSync',
          role: 'System',
          avatar: '/logo.png',
        },
        tags: ['AI', 'Technology', 'Innovation', 'Development'],
        features: ['Exclusive Updates', 'Direct Support', 'Early Access'],
        engagement: {
          posts: 500,
          activeMembers: 750,
          weeklyGrowth: 15,
        },
      });
    } else {
      navigate('/404');
    }
  }, [id, userTribes, navigate]);

  const handleJoin = async () => {
    if (!tribe || !user) return;

    setIsLoading(true);
    try {
      await joinTribe(tribe.id);
      toast({
        title: 'Success!',
        description: `You've joined ${tribe.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join tribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!tribe || !user) return;

    setIsLoading(true);
    try {
      await leaveTribe(tribe.id);
      toast({
        title: 'Success',
        description: `You've left ${tribe.name}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to leave tribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!tribe) {
    return null;
  }

  const isOwner = user?.id === tribe.owner?.id;
  const isMember = userTribes.joined.some((t) => t.id === tribe.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={tribe.image}
              alt={tribe.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            {tribe.isVerified && (
              <div className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-full">
                <Shield className="h-4 w-4" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{tribe.name}</h1>
              <Badge variant="secondary">{tribe.category}</Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {tribe.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isOwner && !isMember && (
            <Button onClick={handleJoin} disabled={isLoading}>
              {isLoading ? 'Joining...' : 'Join Tribe'}
            </Button>
          )}
          {!isOwner && isMember && (
            <Button
              variant="outline"
              onClick={handleLeave}
              disabled={isLoading}
            >
              {isLoading ? 'Leaving...' : 'Leave Tribe'}
            </Button>
          )}
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="h-4 w-4" />
                <span>Members</span>
              </div>
              <p className="text-2xl font-bold">{tribe.members}</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MessageSquare className="h-4 w-4" />
                <span>Posts</span>
              </div>
              <p className="text-2xl font-bold">{tribe.engagement?.posts}</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4" />
                <span>Growth</span>
              </div>
              <p className="text-2xl font-bold">
                {tribe.engagement?.weeklyGrowth}%
              </p>
            </div>
          </div>

          {/* Features */}
          {tribe.features && tribe.features.length > 0 && (
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tribe.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owner Info */}
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Owner</h2>
            <div className="flex items-center gap-4">
              <img
                src={tribe.owner?.avatar || '/default-avatar.png'}
                alt={tribe.owner?.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{tribe.owner?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {tribe.owner?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created {new Date(tribe.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>
                  {tribe.privacy === 'public' ? 'Public' : 'Private'} tribe
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {tribe.memberApproval === 'automatic'
                    ? 'Automatic approval'
                    : 'Manual approval'}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {tribe.tags && tribe.tags.length > 0 && (
            <div className="bg-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4" />
                <h2 className="text-xl font-semibold">Tags</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {tribe.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
