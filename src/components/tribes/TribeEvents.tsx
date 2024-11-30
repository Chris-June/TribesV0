import { useEngagement } from '@/contexts/EngagementContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isAfter, isBefore, isToday } from 'date-fns';
import { useState } from 'react';

interface TribeEventsProps {
  tribeId: string;
}

export default function TribeEvents({ tribeId }: TribeEventsProps) {
  const { state } = useEngagement();
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  const events = state.events[tribeId] || [];

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    switch (filter) {
      case 'upcoming':
        return isAfter(eventDate, new Date()) || isToday(eventDate);
      case 'past':
        return isBefore(eventDate, new Date()) && !isToday(eventDate);
      default:
        return true;
    }
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return filter === 'past' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Events</h2>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setFilter('upcoming')}
            size="sm"
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'past' ? 'default' : 'outline'}
            onClick={() => setFilter('past')}
            size="sm"
          >
            Past
          </Button>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {sortedEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                    <Badge variant="outline">
                      {event.isVirtual ? 'Virtual' : 'In Person'}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{event.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        {format(new Date(event.startDate), 'PPP')}
                        {event.endDate && ` - ${format(new Date(event.endDate), 'PPP')}`}
                      </span>
                    </div>

                    {event.location && (
                      <div className="flex items-center space-x-2 text-sm">
                        {event.isVirtual ? (
                          <Video className="h-4 w-4 text-primary" />
                        ) : (
                          <MapPin className="h-4 w-4 text-primary" />
                        )}
                        <span>{event.location}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.attendees.length} attendees</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    {event.status === 'upcoming' && (
                      <>
                        <Button variant="outline" size="sm">
                          Maybe
                        </Button>
                        <Button size="sm">
                          Join Event
                        </Button>
                      </>
                    )}
                    {event.status === 'ongoing' && (
                      <Button size="sm">
                        Join Now
                      </Button>
                    )}
                    {event.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        View Summary
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {sortedEvents.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No {filter} events</p>
            <p className="text-sm text-muted-foreground">
              {filter === 'upcoming'
                ? 'There are no upcoming events scheduled.'
                : filter === 'past'
                ? 'No past events to show.'
                : 'No events found.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
