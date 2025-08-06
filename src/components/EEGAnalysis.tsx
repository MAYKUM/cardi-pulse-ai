import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Square, 
  Download, 
  Brain, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Settings,
  Flag
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EEGAnalysis: React.FC = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeScale, setTimeScale] = useState([10]);
  const [amplitudeScale, setAmplitudeScale] = useState([50]);
  const [selectedChannels, setSelectedChannels] = useState('all');
  const [aiDetection, setAiDetection] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  const studyInfo = {
    patientId: "NP-2024-001",
    patientName: "Rajesh Kumar",
    age: 45,
    studyDate: "2024-01-20",
    duration: "45 minutes",
    channels: 21,
    samplingRate: "512 Hz"
  };

  const aiFindings = [
    {
      type: "Spike",
      location: "Left Temporal (T3-T5)",
      time: "00:12:34",
      confidence: 94,
      severity: "high"
    },
    {
      type: "Sharp Wave",
      location: "Right Frontal (F4-F8)",
      time: "00:18:22",
      confidence: 87,
      severity: "medium"
    },
    {
      type: "Seizure Activity",
      location: "Bilateral Temporal",
      time: "00:25:15",
      confidence: 96,
      severity: "critical"
    }
  ];

  const channelGroups = [
    { id: 'all', label: 'All Channels (21)' },
    { id: 'temporal', label: 'Temporal (T3, T4, T5, T6)' },
    { id: 'frontal', label: 'Frontal (Fp1, Fp2, F3, F4, F7, F8)' },
    { id: 'central', label: 'Central (C3, C4, Cz)' },
    { id: 'parietal', label: 'Parietal (P3, P4, Pz)' },
    { id: 'occipital', label: 'Occipital (O1, O2)' }
  ];

  const annotations = [
    { id: '1', type: 'spike', time: '00:12:34', channel: 'T3', note: 'Sharp spike complex' },
    { id: '2', type: 'seizure', time: '00:25:15', channel: 'Bilateral', note: 'Generalized tonic-clonic' },
    { id: '3', type: 'artifact', time: '00:08:45', channel: 'Fp1', note: 'Eye movement artifact' }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "EEG Playback Paused" : "EEG Playback Started",
      description: `Current position: ${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`
    });
  };

  const handleAiAnalysis = () => {
    toast({
      title: "AI Analysis Complete",
      description: "Found 3 significant events. Review findings panel for details."
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-critical';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getAnnotationIcon = (type: string) => {
    switch (type) {
      case 'spike': return <Zap className="w-3 h-3" />;
      case 'seizure': return <AlertTriangle className="w-3 h-3" />;
      case 'artifact': return <Flag className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
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
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">EEG Study Analysis</CardTitle>
                <p className="text-muted-foreground">
                  {studyInfo.patientName} • {studyInfo.patientId} • Age {studyInfo.age}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Study Date: {studyInfo.studyDate}</p>
              <p>Duration: {studyInfo.duration}</p>
              <p>Channels: {studyInfo.channels} • {studyInfo.samplingRate}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main EEG Viewer */}
        <div className="lg:col-span-3 space-y-4">
          {/* Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button onClick={handlePlayPause} variant="outline" size="sm">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Square className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 45:00
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm">AI Detection</label>
                    <Switch checked={aiDetection} onCheckedChange={setAiDetection} />
                  </div>
                  <Button onClick={handleAiAnalysis} size="sm">
                    <Brain className="w-4 h-4 mr-2" />
                    Run AI Analysis
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Channel Group</label>
                  <Select value={selectedChannels} onValueChange={setSelectedChannels}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {channelGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Scale: {timeScale[0]}s/page</label>
                  <Slider
                    value={timeScale}
                    onValueChange={setTimeScale}
                    min={5}
                    max={60}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Amplitude: {amplitudeScale[0]}µV</label>
                  <Slider
                    value={amplitudeScale}
                    onValueChange={setAmplitudeScale}
                    min={10}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EEG Waveform Display */}
          <Card>
            <CardContent className="p-0">
              <div className="h-96 bg-background border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-medium">EEG Waveform Display</p>
                  <p className="text-sm">Real-time EEG channels would render here</p>
                  <p className="text-xs mt-2">Channels: {selectedChannels} • Scale: {timeScale[0]}s • Amplitude: {amplitudeScale[0]}µV</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annotations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Annotations & Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {annotations.map((annotation) => (
                  <div key={annotation.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      {getAnnotationIcon(annotation.type)}
                      <div>
                        <p className="font-medium capitalize">{annotation.type}</p>
                        <p className="text-sm text-muted-foreground">{annotation.note}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-mono">{annotation.time}</p>
                      <p className="text-muted-foreground">{annotation.channel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Findings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiFindings.map((finding, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getSeverityColor(finding.severity)}>
                      {finding.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{finding.confidence}%</span>
                  </div>
                  <p className="text-sm font-medium">{finding.location}</p>
                  <p className="text-xs text-muted-foreground font-mono">{finding.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Events</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Spikes Detected</span>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Seizure Activity</span>
                <Badge variant="destructive">1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Background</span>
                <Badge variant="default">Normal</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Study Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};