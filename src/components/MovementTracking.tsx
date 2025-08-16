import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Activity, Play, Pause, Square, RotateCcw, Camera, Download, TrendingUp } from 'lucide-react';

interface MovementData {
  id: string;
  type: 'tremor' | 'gait' | 'coordination' | 'balance';
  timestamp: string;
  severity: number;
  duration: number;
  notes?: string;
}

export const MovementTracking: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<string>('');
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const mockData: MovementData[] = [
    {
      id: '1',
      type: 'tremor',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 3,
      duration: 120,
      notes: 'Resting tremor, right hand'
    },
    {
      id: '2',
      type: 'gait',
      timestamp: '2024-01-15T09:15:00Z',
      severity: 2,
      duration: 180,
      notes: 'Shuffling gait observed'
    }
  ];

  const trackingTypes = [
    {
      id: 'tremor',
      name: 'Tremor Analysis',
      description: 'Monitor involuntary tremors',
      icon: Activity,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'gait',
      name: 'Gait Assessment',
      description: 'Analyze walking patterns',
      icon: Activity,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'coordination',
      name: 'Coordination Tests',
      description: 'Finger-to-nose, heel-to-shin',
      icon: Activity,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'balance',
      name: 'Balance Assessment',
      description: 'Static and dynamic balance',
      icon: Activity,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const startRecording = (type: string) => {
    setRecordingType(type);
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingType('');
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 1) return 'bg-green-100 text-green-800';
    if (severity <= 2) return 'bg-yellow-100 text-yellow-800';
    if (severity <= 3) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Movement Tracking</h1>
          <p className="text-muted-foreground">Real-time movement disorder assessment</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="tracking" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="history">Recording History</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-4">
          {isRecording && (
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                    <div>
                      <CardTitle className="text-lg">Recording {recordingType}</CardTitle>
                      <CardDescription>Duration: {formatTime(recordingTime)}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={stopRecording} variant="outline" size="sm">
                      <Square className="mr-2 h-4 w-4" />
                      Stop
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Camera feed would be displayed here</p>
                    </div>
                  </div>
                  <Progress value={(recordingTime % 60) * (100/60)} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {trackingTypes.map((type) => {
              const Icon = type.icon;
              
              return (
                <Card key={type.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{type.name}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                      <Badge className={type.color}>{type.id}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => startRecording(type.name)} 
                      disabled={isRecording}
                      className="w-full"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {mockData.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg capitalize">{record.type} Recording</CardTitle>
                      <CardDescription>
                        {new Date(record.timestamp).toLocaleString()} • Duration: {Math.floor(record.duration / 60)}m {record.duration % 60}s
                      </CardDescription>
                    </div>
                    <Badge className={getSeverityColor(record.severity)}>
                      Severity: {record.severity}/4
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {record.notes && (
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Recording</Button>
                      <Button variant="outline" size="sm">Download</Button>
                      <Button variant="outline" size="sm">Analysis Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Movement Severity Trends</CardTitle>
                <CardDescription>Track severity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Severity trend chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequency Analysis</CardTitle>
                <CardDescription>Movement type distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trackingTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between">
                      <span className="text-sm">{type.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={Math.random() * 100} className="w-20 h-2" />
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 20)}
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