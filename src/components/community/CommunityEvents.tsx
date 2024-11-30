import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  type: 'online' | 'in-person' | 'hybrid';
  tags: string[];
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI Ethics Workshop',
    description: 'Join us for an interactive workshop on ethical considerations in AI development.',
    date: '2024-02-15',
    time: '14:00',
    location: 'Virtual Meeting Room',
    attendees: 45,
    maxAttendees: 100,
    type: 'online',
    tags: ['Workshop', 'Ethics', 'AI'],
  },
  {
    id: '2',
    title: 'Community Hackathon',
    description: 'Build innovative AI solutions with fellow community members.',
    date: '2024-03-01',
    time: '09:00',
    location: 'IntelliSync HQ + Virtual',
    attendees: 75,
    maxAttendees: 150,
    type: 'hybrid',
    tags: ['Hackathon', 'Coding', 'Innovation'],
  },
];

export default function CommunityEvents() {
  const [events] = useState<Event[]>(mockEvents);

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'online':
        return 'bg-blue-500/10 text-blue-500';
      case 'in-person':
        return 'bg-green-500/10 text-green-500';
      case 'hybrid':
        return 'bg-purple-500/10 text-purple-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <Button variant="outline" size="sm">
          View All
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{event.title}</CardTitle>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <Clock className="ml-4 mr-2 h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{event.attendees} / {event.maxAttendees} attendees</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
