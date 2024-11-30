import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Activity, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type MemberLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

type TribeMember = {
  id: string;
  name: string;
  avatar: string;
  level: MemberLevel;
  points: number;
  rank: number;
  badges: string[];
  joinedAt: Date;
  lastActive: Date;
  contributions: {
    posts: number;
    comments: number;
    likes: number;
    shares: number;
  };
};

type TribeMembersProps = {
  tribeId: string;
};

const MOCK_MEMBERS: TribeMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
    level: 'diamond',
    points: 15000,
    rank: 1,
    badges: ['Early Adopter', 'Top Contributor', 'Community Leader'],
    joinedAt: new Date('2023-01-01'),
    lastActive: new Date(),
    contributions: {
      posts: 150,
      comments: 480,
      likes: 2300,
      shares: 89,
    },
  },
  {
    id: '2',
    name: 'Michael Park',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=2',
    level: 'platinum',
    points: 12000,
    rank: 2,
    badges: ['Problem Solver', 'Mentor', 'Tech Expert'],
    joinedAt: new Date('2023-02-15'),
    lastActive: new Date(),
    contributions: {
      posts: 120,
      comments: 350,
      likes: 1800,
      shares: 65,
    },
  },
  // Add more mock members here...
];

const getLevelColor = (level: MemberLevel): string => {
  switch (level) {
    case 'diamond':
      return 'bg-blue-500/10 text-blue-500';
    case 'platinum':
      return 'bg-purple-500/10 text-purple-500';
    case 'gold':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'silver':
      return 'bg-gray-400/10 text-gray-400';
    case 'bronze':
      return 'bg-orange-500/10 text-orange-500';
  }
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-4 w-4 text-yellow-500" />;
    case 2:
      return <Trophy className="h-4 w-4 text-gray-400" />;
    case 3:
      return <Trophy className="h-4 w-4 text-orange-500" />;
    default:
      return <Star className="h-4 w-4 text-muted-foreground" />;
  }
};

export default function TribeMembers({ tribeId }: TribeMembersProps) {
  const [members] = useState<TribeMember[]>(MOCK_MEMBERS);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Top Members
        </CardTitle>
        <CardDescription>
          Members ranked by engagement and contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {members.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1">
                      {getRankIcon(member.rank)}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className={getLevelColor(member.level)}
                      >
                        {member.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {member.points.toLocaleString()} pts
                      </span>
                    </div>
                  </div>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="grid grid-cols-2 gap-2 text-xs text-right">
                        <div className="text-muted-foreground">Posts</div>
                        <div>{member.contributions.posts}</div>
                        <div className="text-muted-foreground">Comments</div>
                        <div>{member.contributions.comments}</div>
                        <div className="text-muted-foreground">Likes</div>
                        <div>{member.contributions.likes}</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-2">
                        <div className="font-medium">Badges</div>
                        <div className="flex flex-wrap gap-1">
                          {member.badges.map((badge) => (
                            <Badge key={badge} variant="outline">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined {member.joinedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
