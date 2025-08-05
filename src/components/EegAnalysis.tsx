import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  Play, 
  Pause, 
  Square, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Upload,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Brain,
  FileText
} from 'lucide-react';

// Mock EEG data and analysis
const eegChannels = [
  'Fp1-F7', 'F7-T3', 'T3-T5', 'T5-O1',
  'Fp2-F8', 'F8-T4', 'T4-T6', 'T6-O2',
  'Fp1-F3', 'F3-C3', 'C3-P3', 'P3-O1',
  'Fp2-F4', 'F4-C4', 'C4-P4', 'P4-O2',
  'Fz-Cz', 'Cz-Pz'
];

const aiFindings = [
  {
    type: 'Spike',
    location: 'Left Temporal (T3-T5)',
    time: '00:02:34',
    confidence: 95,
    severity: 'High'
  },
  {
    type: 'Slow Wave',
    location: 'Right Frontal (F4-C4)',
    time: '00:05:12',
    confidence: 87,
    severity: 'Medium'
  },
  {
    type: 'Sharp Wave',
    location: 'Bilateral Occipital',
    time: '00:07:45',
    confidence: 92,
    severity: 'Medium'
  }
];

const patientInfo = {
  name: 'Rajesh Kumar',
  age: 58,
  condition: 'Epilepsy - Temporal Lobe',
  studyDate: '2024-01-15',
  duration: '30 minutes',
  clinician: 'Dr. Neurologist'
};

export function EegAnalysis() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeScale, setTimeScale] = useState(30); // seconds per screen
  const [amplitudeScale, setAmplitudeScale] = useState(50); // μV
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showAiOverlay, setShowAiOverlay] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => (prev + 0.1) % 1800); // 30 minute loop
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast(isPlaying ? "EEG playback paused" : "EEG playback started");
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    toast("EEG playback stopped");
  };

  const handleAiAnalysis = () => {
    toast("AI seizure detection analysis completed");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate mock waveform data for visualization
  const generateWaveform = (channelIndex: number, time: number) => {
    const frequency = 10 + Math.sin(channelIndex * 0.5) * 5; // Alpha rhythm variation
    const amplitude = amplitudeScale * (0.5 + Math.random() * 0.5);
    return Math.sin(time * frequency + channelIndex) * amplitude;
  };

  return (
    <div className="space-y-6">
      {/* Patient Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                EEG Analysis - {patientInfo.name}
              </CardTitle>
              <CardDescription>
                Patient: {patientInfo.age} years old • {patientInfo.condition} • {patientInfo.studyDate}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              Duration: {patientInfo.duration}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main EEG Viewer */}
      <Card className="h-[600px]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">EEG Waveform Viewer</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={showAiOverlay ? "default" : "outline"}>
                AI Analysis {showAiOverlay ? "ON" : "OFF"}
              </Badge>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowAiOverlay(!showAiOverlay)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={handleStop}>
                <Square className="h-4 w-4" />
              </Button>
              <span className="text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(1800)}
              </span>
              <Progress value={(currentTime / 1800) * 100} className="w-32" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <label>Time Scale:</label>
                <Slider
                  value={[timeScale]}
                  onValueChange={(value) => setTimeScale(value[0])}
                  min={10}
                  max={60}
                  step={5}
                  className="w-16"
                />
                <span className="w-8">{timeScale}s</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <label>Amplitude:</label>
                <Slider
                  value={[amplitudeScale]}
                  onValueChange={(value) => setAmplitudeScale(value[0])}
                  min={25}
                  max={100}
                  step={5}
                  className="w-16"
                />
                <span className="w-12">{amplitudeScale}μV</span>
              </div>
            </div>
          </div>

          {/* EEG Waveform Display */}
          <div className="border rounded-lg bg-black relative h-96 overflow-hidden">
            <canvas 
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: '#000' }}
            />
            {/* Channel Labels */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-around text-xs text-green-400 pointer-events-none">
              {eegChannels.map((channel, index) => (
                <div key={channel} className="bg-black bg-opacity-50 px-1 rounded">
                  {channel}
                </div>
              ))}
            </div>
            
            {/* AI Annotations */}
            {showAiOverlay && (
              <div className="absolute top-4 right-4 space-y-1">
                {aiFindings.map((finding, index) => (
                  <div 
                    key={index}
                    className="bg-red-600 text-white text-xs px-2 py-1 rounded opacity-75"
                  >
                    {finding.type} - {finding.confidence}%
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Analysis Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              AI Seizure Detection Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="findings">
              <TabsList>
                <TabsTrigger value="findings">Findings</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="findings" className="space-y-4">
                {aiFindings.map((finding, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(finding.severity)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {finding.type}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {finding.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm">
                      <strong>Location:</strong> {finding.location}<br />
                      <strong>Time:</strong> {finding.time}<br />
                      <strong>Severity:</strong> {finding.severity}
                    </p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Background activity: Normal 8-12 Hz alpha rhythm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Interictal spikes detected in left temporal region</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>No electrographic seizures observed</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-3">
                  <p>• Continue current anti-epileptic therapy</p>
                  <p>• Monitor for breakthrough seizures</p>
                  <p>• Follow-up EEG in 6 months</p>
                  <p>• Consider sleep-deprived EEG if seizures persist</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Study Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Study Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Patient:</span>
                <span>{patientInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>{patientInfo.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Study Date:</span>
                <span>{patientInfo.studyDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>{patientInfo.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clinician:</span>
                <span>{patientInfo.clinician}</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <Button size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" variant="outline" className="w-full" onClick={handleAiAnalysis}>
                <Brain className="h-4 w-4 mr-2" />
                Re-run AI Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}