import { useState, useCallback, memo, useMemo } from "react";
import { 
  Activity, 
  Heart, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Zap,
  Upload,
  Download,
  Play,
  Pause,
  RotateCw,
  Ruler,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock ECG data
const ecgData = {
  patientName: "Rajesh Kumar",
  patientId: "P001",
  recordingDate: "2024-01-15",
  duration: "10 seconds",
  leads: 12,
  sampleRate: "500 Hz",
  calibration: "10 mm/mV"
};

const measurements = {
  heartRate: 78,
  prInterval: 160,
  qrsDuration: 95,
  qtInterval: 420,
  qtcInterval: 440,
  rhythm: "Normal Sinus Rhythm"
};

const aiFindings = [
  {
    type: "Normal ECG",
    confidence: 94,
    severity: "normal",
    description: "Regular sinus rhythm with normal intervals"
  },
  {
    type: "Possible LVH",
    confidence: 72,
    severity: "mild",
    description: "Voltage criteria suggestive of left ventricular hypertrophy"
  },
  {
    type: "T-wave Abnormality",
    confidence: 68,
    severity: "moderate",
    description: "Non-specific T-wave changes in leads V4-V6"
  }
];

const leadConfiguration = [
  { name: "I", position: { x: 0, y: 0 } },
  { name: "aVR", position: { x: 1, y: 0 } },
  { name: "V1", position: { x: 2, y: 0 } },
  { name: "V4", position: { x: 3, y: 0 } },
  { name: "II", position: { x: 0, y: 1 } },
  { name: "aVL", position: { x: 1, y: 1 } },
  { name: "V2", position: { x: 2, y: 1 } },
  { name: "V5", position: { x: 3, y: 1 } },
  { name: "III", position: { x: 0, y: 2 } },
  { name: "aVF", position: { x: 1, y: 2 } },
  { name: "V3", position: { x: 2, y: 2 } },
  { name: "V6", position: { x: 3, y: 2 } }
];

const EcgAnalysis = memo(function EcgAnalysis() {
  const [gain, setGain] = useState(10);
  const [speed, setSpeed] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("0.5-40");
  const [selectedLead, setSelectedLead] = useState("all");

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case "normal": return "success";
      case "mild": return "warning";
      case "moderate": return "destructive";
      case "severe": return "critical";
      default: return "muted";
    }
  }, []);

  const getMeasurementStatus = useCallback((measurement: string, value: number) => {
    const ranges = {
      heartRate: { normal: [60, 100], mild: [50, 120], severe: [40, 150] },
      prInterval: { normal: [120, 200], mild: [100, 220], severe: [80, 250] },
      qrsDuration: { normal: [80, 120], mild: [70, 140], severe: [60, 160] },
      qtInterval: { normal: [350, 450], mild: [330, 470], severe: [300, 500] },
    };

    const range = ranges[measurement as keyof typeof ranges];
    if (!range) return "normal";

    if (value >= range.normal[0] && value <= range.normal[1]) return "normal";
    if (value >= range.mild[0] && value <= range.mild[1]) return "mild";
    return "severe";
  }, []);

  // Memoize the expensive SVG path generation
  const generateSineWave = useCallback((lead: string, width: number, height: number) => {
    const points: string[] = [];
    const amplitude = height * 0.3;
    const frequency = 0.02;
    const heartRateEffect = 78 / 60; // beats per second
    
    for (let x = 0; x < width; x++) {
      let y = height / 2;
      
      // QRS complex simulation
      const beatPosition = (x * heartRateEffect) % 60;
      if (beatPosition < 8) {
        y += Math.sin(beatPosition * Math.PI / 4) * amplitude * 2;
      } else if (beatPosition < 12) {
        y -= Math.sin((beatPosition - 8) * Math.PI / 4) * amplitude * 3;
      } else if (beatPosition < 20) {
        y += Math.sin((beatPosition - 12) * Math.PI / 8) * amplitude * 1.5;
      } else {
        y += Math.sin(x * frequency) * amplitude * 0.2;
      }
      
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  }, []);

  // Pre-generate waveforms to avoid computing on every render
  const leadWaveforms = useMemo(() => {
    const waveforms: Record<string, string> = {};
    leadConfiguration.forEach(lead => {
      waveforms[lead.name] = generateSineWave(lead.name, 200, 100);
    });
    waveforms['rhythm'] = generateSineWave('rhythm', 800, 100);
    return waveforms;
  }, [generateSineWave]);

  return (
    <div className="space-y-6">
      {/* ECG Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{ecgData.patientName}</h2>
                  <p className="text-sm text-muted-foreground">ID: {ecgData.patientId}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">12-Lead ECG</p>
                <p className="text-sm text-muted-foreground">{ecgData.recordingDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{ecgData.duration} • {ecgData.sampleRate}</p>
                <p className="text-sm text-muted-foreground">{ecgData.calibration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload ECG
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main ECG Display */}
        <div className="lg:col-span-3 space-y-4">
          {/* Control Panel */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant={isPlaying ? "default" : "outline"}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Ruler className="h-4 w-4" />
                    <Button size="sm" variant="outline">Measure</Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="grid" className="text-sm">Grid</Label>
                    <Switch
                      id="grid"
                      checked={showGrid}
                      onCheckedChange={setShowGrid}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="measurements" className="text-sm">Measurements</Label>
                    <Switch
                      id="measurements"
                      checked={showMeasurements}
                      onCheckedChange={setShowMeasurements}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm">Filter:</Label>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5-40">0.5-40 Hz</SelectItem>
                        <SelectItem value="0.05-150">0.05-150 Hz</SelectItem>
                        <SelectItem value="1-30">1-30 Hz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm">Gain: {gain}mm/mV</Label>
                    <Slider
                      value={[gain]}
                      onValueChange={(value) => setGain(value[0])}
                      max={20}
                      min={5}
                      step={5}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm">Speed: {speed}mm/s</Label>
                    <Slider
                      value={[speed]}
                      onValueChange={(value) => setSpeed(value[0])}
                      max={50}
                      min={10}
                      step={5}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ECG Waveform Display */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-4 min-h-[600px]">
                {leadConfiguration.map((lead) => (
                  <div key={lead.name} className="relative">
                    <div className="text-sm font-medium mb-2 text-center">{lead.name}</div>
                    <div className="relative h-32 bg-black rounded border">
                      <svg
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                        viewBox="0 0 200 100"
                      >
                        {/* Grid */}
                        {showGrid && (
                          <>
                            <defs>
                              <pattern
                                id={`grid-${lead.name}`}
                                width="5"
                                height="5"
                                patternUnits="userSpaceOnUse"
                              >
                                <path
                                  d="M 5 0 L 0 0 0 5"
                                  fill="none"
                                  stroke="rgba(255,0,0,0.3)"
                                  strokeWidth="0.5"
                                />
                              </pattern>
                            </defs>
                            <rect
                              width="100%"
                              height="100%"
                              fill={`url(#grid-${lead.name})`}
                            />
                          </>
                        )}
                        
                        {/* ECG Waveform */}
                        <polyline
                          points={leadWaveforms[lead.name]}
                          fill="none"
                          stroke="#00ff00"
                          strokeWidth="1"
                          className={isPlaying ? "animate-pulse" : ""}
                        />
                      </svg>
                      
                      {/* Lead label overlay */}
                      <div className="absolute bottom-1 left-1 text-xs text-green-400 bg-black/50 px-1 rounded">
                        {lead.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Rhythm Strip */}
              <div className="mt-6">
                <div className="text-sm font-medium mb-2">Rhythm Strip - Lead II</div>
                <div className="relative h-24 bg-black rounded border">
                  <svg
                    width="100%"
                    height="100%"
                    className="absolute inset-0"
                    viewBox="0 0 800 100"
                  >
                    {showGrid && (
                      <>
                        <defs>
                          <pattern
                            id="rhythm-grid"
                            width="5"
                            height="5"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 5 0 L 0 0 0 5"
                              fill="none"
                              stroke="rgba(255,0,0,0.3)"
                              strokeWidth="0.5"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#rhythm-grid)"
                        />
                      </>
                    )}
                    <polyline
                      points={leadWaveforms['rhythm']}
                      fill="none"
                      stroke="#00ff00"
                      strokeWidth="1.5"
                      className={isPlaying ? "animate-pulse" : ""}
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Measurements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ruler className="h-5 w-5" />
                <span>Measurements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>HR:</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{measurements.heartRate}</span>
                      <Badge className={`bg-${getSeverityColor(getMeasurementStatus('heartRate', measurements.heartRate))}`}>
                        {getMeasurementStatus('heartRate', measurements.heartRate)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>PR:</span>
                    <span className="font-medium">{measurements.prInterval}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>QRS:</span>
                    <span className="font-medium">{measurements.qrsDuration}ms</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>QT:</span>
                    <span className="font-medium">{measurements.qtInterval}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>QTc:</span>
                    <span className="font-medium">{measurements.qtcInterval}ms</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm font-medium">Rhythm:</p>
                <p className="text-sm text-muted-foreground">{measurements.rhythm}</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>AI Analysis</span>
                </div>
                <Button size="sm">
                  Analyze
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiFindings.map((finding, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{finding.type}</span>
                    <Badge className={`bg-${getSeverityColor(finding.severity)}`}>
                      {finding.confidence}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{finding.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Interpretation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Interpretation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-success/10 border border-success/20 rounded-md">
                  <p className="font-medium text-success">Normal ECG</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Regular sinus rhythm with normal intervals and axis.
                  </p>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
                  <p className="font-medium text-warning">Minor Findings</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Consider clinical correlation for voltage criteria.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export { EcgAnalysis };