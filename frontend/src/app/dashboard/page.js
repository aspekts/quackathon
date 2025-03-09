'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Calendar, MapPin, Users, BookOpen, User } from 'lucide-react';
import supabase from '@/lib/supabase';
import { interests } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);

      // Fetch matches based on interests
      const { data: matchesData } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .contains('interests', profileData?.interests)
        .limit(3);

      setMatches(matchesData || []);

      // Fetch events matching user interests
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .overlaps('categories', profileData?.interests)
        .order('start_time', { ascending: true })
        .limit(3);

      setEvents(eventsData || []);
    };

    fetchData();
  }, [user, router]);

  if (!user) {
    // Show a loading state or nothing while redirecting
    return null;
  }

  if (!profile) return <DashboardSkeleton />;

  return (
    <div className="p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {profile.username}</h1>
          <p className="text-muted-foreground">{profile.course} Student</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Course: {profile.course}</p>
              <p className="font-medium">Year: Year {profile.year || '1'}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Your Interests:</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(interest => {
                  const interestData = interests.find(i => i.id === interest);
                  return (
                    <span 
                      key={interest} 
                      className="px-3 py-1 bg-accent rounded-full text-sm"
                    >
                      {interestData?.emoji} {interestData?.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recommended Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="p-2 border rounded">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.start_time).toLocaleDateString()} - {event.location}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {event.categories?.map(category => {
                    const interest = interests.find(i => i.id === category);
                    return (
                      <span key={category} className="text-sm bg-muted px-2 py-1 rounded">
                        {interest?.emoji} {interest?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Buddy Matches */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Matches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {matches.map(match => (
              <div 
                key={match.id} 
                className="p-2 border rounded hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{match.username}</p>
                    <p className="text-sm text-muted-foreground">{match.course}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.interests.slice(0, 3).map(interest => {
                      const interestData = interests.find(i => i.id === interest);
                      return (
                        <span 
                          key={interest} 
                          className="text-sm bg-muted px-2 py-1 rounded"
                        >
                          {interestData?.emoji}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full" asChild>
              <Link href="/buddy-match">View All Matches</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-8 animate-pulse">
      {/* Skeleton loading UI */}
    </div>
  );
}