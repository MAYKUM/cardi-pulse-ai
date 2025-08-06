import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Download, 
  Video, 
  Activity, 
  Brain,
  AlertTriangle,
  Clock,
  Camera
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const VideoEEG: React.FC = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const studyInfo = {
    patientId: "NP-2024-002",
    patientName: "Priya Sharma",
    age: 28,
    studyDate: "2024-01-22",
    duration: "24 hours",
    videoQuality: "1080p",
    eegChannels: 32
  };

  const detectedEvents = [
    {
      id: 1,
      type: "Clinical Seizure",
      time: "02:34:15",
      duration: "2m 30s",
      severity: "critical",
      description: "Generalized tonic-clonic seizure with bilateral involvement"
    },
    {
      id: 2,
      type: "Subclinical Event",
      time: "08:12:45",
      duration: "45s",
      severity: "medium",
      description: "Electrographic seizure without clinical manifestation"
    },
    {
      id: 3,
      type: "Behavioral Event", 
      time: "14:20:30",
      duration: "1m 15s",
      severity: "low",
      description: "Patient movement and vocalization episode"
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Video-EEG Paused" : "Video-EEG Playing",
      description: `Current time: ${Math.floor(currentTime / 3600)}:${Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`
    });
  };

  const jumpToEvent = (time: string) => {
    toast({
      title: "Jumping to Event",
      description: `Navigating to ${time}`
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Study Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Video-EEG Monitoring</CardTitle>
                <p className="text-muted-foreground">
                  {studyInfo.patientName} • {studyInfo.patientId} • Age {studyInfo.age}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Study Date: {studyInfo.studyDate}</p>
              <p>Duration: {studyInfo.duration}</p>
              <p>Video: {studyInfo.videoQuality} • EEG: {studyInfo.eegChannels} channels</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Video Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Patient Video Stream</p>
                  <p className="text-sm opacity-75">24-hour continuous monitoring</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button onClick={handlePlayPause} variant="outline" size="sm">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={() => setIsMuted(!isMuted)} 
                    variant="outline" 
                    size="sm"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {Math.floor(currentTime / 3600)}:{Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0')}:{(currentTime % 60).toString().padStart(2, '0')} / 24:00:00
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Synchronized EEG */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Synchronized EEG
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-background border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-medium">Real-time EEG Channels</p>
                  <p className="text-sm">32-channel synchronized with video</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Detected Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectedEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg space-y-2 hover:bg-muted/50 cursor-pointer" onClick={() => jumpToEvent(event.time)}>
                  <div className="flex items-center justify-between">
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">{event.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{event.duration}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Events</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Clinical Seizures</span>
                <Badge variant="destructive">1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Subclinical Events</span>
                <Badge variant="outline">1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Behavioral Events</span>
                <Badge variant="default">1</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-primary" />
                <span>Seizure Detection: Active</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 text-accent" />
                <span>Movement Analysis: Active</span>
              </div>
              <Button className="w-full" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                Run Full AI Analysis
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Video Clips
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};