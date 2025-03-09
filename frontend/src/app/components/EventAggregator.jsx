'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Ticket, School, MapPin, CalendarDays } from 'lucide-react';
import { fetchDUSAEvents, fetchUniversityEvents } from '@/lib/events';

export default function EventAggregator() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSource, setSelectedSource] = useState('all');
  
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        const [dusaEvents, uniEvents] = await Promise.all([
          fetchDUSAEvents(),
          fetchUniversityEvents()
        ]);
  
        setEvents([
          ...dusaEvents.map(e => ({ ...e, source: 'DUSA' })),
          ...uniEvents.map(e => ({ ...e, source: 'University' }))
        ]);
      } catch (error) {
        console.error('Event loading failed:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadEvents();
    }, []);
  
    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    };
  
    const filteredEvents = events.filter(event => 
      selectedSource === 'all' || event.source === selectedSource
    );
  
    return (
      <Card className="h-full">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <CardTitle>Dundee Events</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={selectedSource === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSource('all')}
              >
                All Events
              </Button>
              <Button 
                variant={selectedSource === 'DUSA' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSource('DUSA')}
              >
                <Ticket className="h-4 w-4 mr-2" />
                DUSA
              </Button>
              <Button 
                variant={selectedSource === 'University' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSource('University')}
              >
                <School className="h-4 w-4 mr-2" />
                University
              </Button>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={loadEvents}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
  
        <CardContent className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-32 bg-muted rounded-lg" />
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No upcoming events found
            </div>
          ) : (
            filteredEvents.map(event => (
              <div 
                key={`${event.source}-${event.title}`}
                className="border rounded-lg p-4 hover:bg-accent transition-colors"
              >
                <div className="flex gap-4">
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                      <MapPin className="h-4 w-4 ml-2" />
                      <span>{event.location || 'Various Locations'}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {event.source === 'DUSA' ? (
                          <Ticket className="h-3 w-3 inline mr-1" />
                        ) : (
                          <School className="h-3 w-3 inline mr-1" />
                        )}
                        {event.source}
                      </span>
                    </div>
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-primary hover:underline"
                      >
                        More details and tickets →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    );
  }