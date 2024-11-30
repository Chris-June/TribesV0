import { useEngagement } from '@/contexts/EngagementContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MessageSquare,
  ThumbsUp,
  Award,
  UserPlus,
  Trophy,
  Heart,
  Share2,
  MoreHorizontal,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ActivityFeedProps {
  tribeId: string;
}

export default function ActivityFeed({ tribeId }: ActivityFeedProps) {
  const { state, dispatch } = useEngagement();
  const [newComment, setNewComment] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const activities = state.activities[tribeId] || [];

  const handleReaction = (activityId: string, reaction: string) => {
    dispatch({
      type: 'ADD_REACTION',
      tribeId,
      activityId,
      reaction,
      userId: 'current-user-id', // Replace with actual user ID
    });
  };

  const handleComment = (activityId: string) => {
    if (!newComment.trim()) return;

    dispatch({
      type: 'ADD_COMMENT',
      tribeId,
      activityId,
      comment: {
        id: Date.now().toString(),
        content: newComment,
        createdBy: 'current-user-id', // Replace with actual user ID
        createdAt: new Date(),
      },
    });

    setNewComment('');
    setSelectedActivity(null);
  };

  const renderActivityContent = (activity: Activity) => {
    switch (activity.type) {
      case 'event':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{activity.content.title}</span>
            </div>
            <p className="text-muted-foreground">{activity.content.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span>{new Date(activity.content.startDate).toLocaleDateString()}</span>
              <Badge variant="outline">
                {activity.content.isVirtual ? 'Virtual' : 'In Person'}
              </Badge>
            </div>
          </div>
        );

      case 'poll':
        return (
          <div className="space-y-4">
            <p className="font-medium">{activity.content.question}</p>
            <div className="space-y-2">
              {activity.content.options.map((option: any) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between bg-muted p-2 rounded"
                >
                  <span>{option.text}</span>
                  <span className="text-sm text-muted-foreground">
                    {option.votes} votes
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievement':
        return (
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{activity.content.name}</h4>
              <p className="text-sm text-muted-foreground">
                {activity.content.description}
              </p>
            </div>
          </div>
        );

      case 'member_joined':
        return (
          <div className="flex items-center space-x-4">
            <UserPlus className="h-5 w-5 text-primary" />
            <span>
              <span className="font-medium">{activity.content.name}</span> joined the tribe
            </span>
          </div>
        );

      default:
        return (
          <p className="text-muted-foreground">{activity.content}</p>
        );
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
                <Avatar>
                  <AvatarImage src={`/avatars/${activity.createdBy}.jpg`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">User Name</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {activity.type.replace('_', ' ')}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderActivityContent(activity)}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(activity.id, 'like')}
                      className="space-x-1"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{activity.reactions.find(r => r.type === 'like')?.count || 0}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedActivity(activity.id)}
                      className="space-x-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{activity.comments.length}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="space-x-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {selectedActivity === activity.id && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-4">
                      {activity.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/${comment.createdBy}.jpg`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">User Name</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button
                        onClick={() => handleComment(activity.id)}
                        disabled={!newComment.trim()}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
