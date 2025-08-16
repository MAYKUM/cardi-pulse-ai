import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Plus, Calendar, Clock, MapPin, FileText, TrendingUp } from 'lucide-react';

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

export const SeizureLogs: React.FC = () => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<SeizureEvent>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    severity: 'mild',
    witnesses: false
  });

  const mockEvents: SeizureEvent[] = [
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
  ];

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  };

  const handleAddEvent = () => {
    // In a real app, this would save to the database
    console.log('Adding seizure event:', newEvent);
    setIsAddingEvent(false);
    setNewEvent({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      severity: 'mild',
      witnesses: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seizure Logs</h1>
          <p className="text-muted-foreground">Track and monitor seizure events</p>
        </div>
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Seizure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Log New Seizure Event</DialogTitle>
              <DialogDescription>
                Record details of the seizure event for medical tracking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="type">Seizure Type</Label>
                <Select onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seizure type" />
                  </SelectTrigger>
                  <SelectContent>
                    {seizureTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (seconds)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="120"
                    onChange={(e) => setNewEvent({...newEvent, duration: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select onValueChange={(value: 'mild' | 'moderate' | 'severe') => setNewEvent({...newEvent, severity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Home - Bedroom"
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what happened during the seizure..."
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddEvent} className="flex-1">Save Event</Button>
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
          <Card>
            <CardHeader>
              <CardTitle>Seizure Calendar</CardTitle>
              <CardDescription>Visual timeline of seizure events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Calendar component would be integrated here</p>
                  <p className="text-sm">showing seizure events by date</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequency Trends</CardTitle>
                <CardDescription>Seizure frequency over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Frequency chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Triggers</CardTitle>
                <CardDescription>Most frequent seizure triggers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commonTriggers.slice(0, 5).map((trigger, index) => (
                    <div key={trigger} className="flex items-center justify-between">
                      <span className="text-sm">{trigger}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 10)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};