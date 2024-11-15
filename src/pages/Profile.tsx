import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';

const stats = [
  {
    title: 'Tribes',
    value: '12',
    icon: Users,
  },
  {
    title: 'Messages',
    value: '1.2K',
    icon: MessageSquare,
  },
  {
    title: 'Media Shared',
    value: '234',
    icon: ImageIcon,
  },
  {
    title: 'Documents',
    value: '56',
    icon: FileText,
  },
];

const activities = [
  {
    type: 'join',
    tribe: 'Gaming Enthusiasts',
    time: '2 hours ago',
  },
  {
    type: 'post',
    tribe: 'Tech Innovators',
    content: 'Shared a new article about AI developments',
    time: '5 hours ago',
  },
  {
    type: 'comment',
    tribe: 'Digital Artists',
    content: 'Commented on "Latest Design Trends 2024"',
    time: '1 day ago',
  },
];

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user?.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined March 2024
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Full-stack developer passionate about building communities and
                  sharing knowledge.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge>Developer</Badge>
                  <Badge>Community Builder</Badge>
                  <Badge>Tech Enthusiast</Badge>
                </div>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button variant="outline" size="sm">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4 flex flex-col items-center">
                <stat.icon className="h-5 w-5 text-muted-foreground mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="tribes">Tribes</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg border"
                      >
                        <div className="rounded-full bg-primary/10 p-2">
                          {activity.type === 'join' ? (
                            <Users className="h-4 w-4 text-primary" />
                          ) : activity.type === 'post' ? (
                            <FileText className="h-4 w-4 text-primary" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.tribe}</span>
                            {activity.content && (
                              <span className="text-muted-foreground">
                                {' '}
                                - {activity.content}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tribes">
            <Card>
              <CardHeader>
                <CardTitle>My Tribes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tribes list coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Shared Media</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Media gallery coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}