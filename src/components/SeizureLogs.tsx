import React, { useState, memo, useMemo, useCallback, Suspense, lazy } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Plus, Calendar, Clock, MapPin, FileText, TrendingUp } from 'lucide-react';

// Lazy load heavy components to improve initial LCP
const SeizureEventDialog = lazy(() => import('./seizure/SeizureEventDialog'));
const SeizureAnalytics = lazy(() => import('./seizure/SeizureAnalytics'));
const SeizureCalendar = lazy(() => import('./seizure/SeizureCalendar'));

interface SeizureEvent {
  id: string;
  date: string;
  time: string;
  type: string;
  duration: number;
  severity: 'mild' | 'moderate' | 'severe';
  triggers?: string[];
  location: string;
  witnesses: boolean;
  description: string;
  recovery_time: number;
}

export const SeizureLogs: React.FC = memo(() => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<SeizureEvent>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    severity: 'mild',
    witnesses: false
  });

  // Memoize mock data to prevent re-creation
  const mockEvents: SeizureEvent[] = useMemo(() => [
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      type: 'Tonic-Clonic',
      duration: 120,
      severity: 'severe',
      triggers: ['Sleep deprivation', 'Stress'],
      location: 'Home - Living room',
      witnesses: true,
      description: 'Generalized tonic-clonic seizure with loss of consciousness',
      recovery_time: 900
    },
    {
      id: '2',
      date: '2024-01-12',
      time: '09:45',
      type: 'Focal Aware',
      duration: 45,
      severity: 'mild',
      triggers: ['Flashing lights'],
      location: 'Office',
      witnesses: false,
      description: 'Brief focal seizure with déjà vu sensation',
      recovery_time: 180
    }
  ], []);

  const seizureTypes = [
    'Tonic-Clonic',
    'Focal Aware',
    'Focal Impaired Awareness',
    'Absence',
    'Myoclonic',
    'Atonic',
    'Tonic',
    'Clonic'
  ];

  const commonTriggers = [
    'Sleep deprivation',
    'Stress',
    'Missed medication',
    'Alcohol',
    'Flashing lights',
    'Illness/fever',
    'Hormonal changes',
    'Dehydration'
  ];

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-success/10 text-success';
      case 'moderate': return 'bg-warning/10 text-warning';
      case 'severe': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }, []);

  const handleAddEvent = useCallback(() => {
    // In a real app, this would save to the database
    console.log('Adding seizure event:', newEvent);
    setIsAddingEvent(false);
    setNewEvent({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      severity: 'mild',
      witnesses: false
    });
  }, [newEvent]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seizure Logs</h1>
          <p className="text-muted-foreground">Track and monitor seizure events</p>
        </div>
        <Suspense fallback={<Button disabled><Plus className="mr-2 h-4 w-4" />Log Seizure</Button>}>
          <SeizureEventDialog
            isOpen={isAddingEvent}
            onOpenChange={setIsAddingEvent}
            newEvent={newEvent}
            onEventChange={setNewEvent}
            onSave={handleAddEvent}
          />
        </Suspense>
      </div>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Events</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{event.type} Seizure</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Duration:</span>
                        <div>{formatDuration(event.duration)}</div>
                      </div>
                      <div>
                        <span className="font-medium">Recovery:</span>
                        <div>{formatDuration(event.recovery_time)}</div>
                      </div>
                      <div>
                        <span className="font-medium">Witnesses:</span>
                        <div>{event.witnesses ? 'Yes' : 'No'}</div>
                      </div>
                    </div>
                    
                    {event.triggers && event.triggers.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Triggers:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {event.triggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Suspense fallback={
            <Card>
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          }>
            <SeizureCalendar events={mockEvents} />
          </Suspense>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Suspense fallback={
            <div className="grid gap-4 md:grid-cols-2">
              {Array(2).fill(null).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-muted rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          }>
            <SeizureAnalytics events={mockEvents} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
});