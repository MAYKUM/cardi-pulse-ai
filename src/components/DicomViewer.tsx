import { useState, useRef, useEffect, useCallback, memo } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Move, 
  Ruler, 
  Circle, 
  Square, 
  Type, 
  Download, 
  Share2, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Settings,
  Layers,
  Brain,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock DICOM data
const studyInfo = {
  patientName: "Rajesh Kumar",
  patientId: "P001",
  studyDate: "2024-01-15",
  modality: "CT",
  bodyPart: "Chest",
  sliceCount: 64,
  seriesDescription: "Cardiac CT Angiography"
};

const aiAnalysis = {
  findings: [
    { type: "Stenosis", location: "LAD", severity: "Moderate", confidence: 89 },
    { type: "Calcification", location: "RCA", severity: "Mild", confidence: 94 },
    { type: "Plaque", location: "LCX", severity: "Mild", confidence: 76 }
  ],
  riskScore: 65,
  recommendations: [
    "Consider stress testing",
    "Monitor lipid levels",
    "Lifestyle modifications"
  ]
};

const DicomViewer = memo(function DicomViewer() {
  const [currentSlice, setCurrentSlice] = useState(32);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTool, setSelectedTool] = useState("move");
  const [showAiOverlay, setShowAiOverlay] = useState(true);
  const [windowPreset, setWindowPreset] = useState("soft-tissue");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlice((prev) => (prev < studyInfo.sliceCount ? prev + 1 : 1));
      }, 200);
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
  }, [isPlaying]);

  const tools = [
    { id: "move", icon: Move, label: "Pan" },
    { id: "zoom", icon: ZoomIn, label: "Zoom" },
    { id: "ruler", icon: Ruler, label: "Measure" },
    { id: "circle", icon: Circle, label: "Circle ROI" },
    { id: "square", icon: Square, label: "Rectangle ROI" },
    { id: "text", icon: Type, label: "Annotation" },
  ];

  const windowPresets = [
    { value: "soft-tissue", label: "Soft Tissue" },
    { value: "bone", label: "Bone" },
    { value: "lung", label: "Lung" },
    { value: "cardiac", label: "Cardiac" },
    { value: "custom", label: "Custom" },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    toast.info(`${tools.find(t => t.id === toolId)?.label} tool activated`);
  };

  const handleAiAnalysis = () => {
    toast.success("AI analysis completed");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "severe": return "critical";
      case "moderate": return "warning";
      case "mild": return "success";
      default: return "muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Study Information Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h2 className="text-lg font-semibold">{studyInfo.patientName}</h2>
                <p className="text-sm text-muted-foreground">ID: {studyInfo.patientId}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{studyInfo.modality} - {studyInfo.bodyPart}</p>
                <p className="text-sm text-muted-foreground">{studyInfo.studyDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{studyInfo.seriesDescription}</p>
                <p className="text-sm text-muted-foreground">{studyInfo.sliceCount} slices</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Viewer */}
        <div className="lg:col-span-3 space-y-4">
          {/* Toolbar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      size="sm"
                      variant={selectedTool === tool.id ? "default" : "outline"}
                      onClick={() => handleToolSelect(tool.id)}
                      className="flex items-center space-x-1"
                    >
                      <tool.icon className="h-4 w-4" />
                    </Button>
                  ))}
                  <div className="h-4 w-px bg-border mx-2" />
                  <Button size="sm" variant="outline">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="ai-overlay" className="text-sm">AI Overlay</Label>
                    <Switch
                      id="ai-overlay"
                      checked={showAiOverlay}
                      onCheckedChange={setShowAiOverlay}
                    />
                  </div>
                  <Select value={windowPreset} onValueChange={setWindowPreset}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {windowPresets.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DICOM Viewer Canvas */}
          <Card className="relative">
            <CardContent className="p-0">
              <div className="relative bg-black aspect-square">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    transform: `scale(${zoomLevel / 100})`
                  }}
                />
                
                {/* Mock DICOM image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">DICOM Viewer</p>
                    <p className="text-sm">Slice {currentSlice} of {studyInfo.sliceCount}</p>
                  </div>
                </div>

                {/* AI Overlay */}
                {showAiOverlay && (
                  <div className="absolute inset-0">
                    <div className="absolute top-4 left-4 bg-red-500/20 border-2 border-red-500 rounded-full w-16 h-16" />
                    <div className="absolute top-20 left-20 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg w-12 h-8" />
                    <div className="absolute bottom-20 right-16 bg-blue-500/20 border-2 border-blue-500 rounded-full w-10 h-10" />
                  </div>
                )}

                {/* Slice indicator */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {currentSlice}/{studyInfo.sliceCount}
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {zoomLevel}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Playback Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentSlice(Math.max(1, currentSlice - 1))}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentSlice(Math.min(studyInfo.sliceCount, currentSlice + 1))}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <div className="flex-1 px-4">
                  <Slider
                    value={[currentSlice]}
                    onValueChange={(value) => setCurrentSlice(value[0])}
                    max={studyInfo.sliceCount}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Display Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Display</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Zoom: {zoomLevel}%</Label>
                <Slider
                  value={[zoomLevel]}
                  onValueChange={(value) => setZoomLevel(value[0])}
                  max={400}
                  min={25}
                  step={25}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm">Brightness</Label>
                <Slider
                  value={[brightness]}
                  onValueChange={(value) => setBrightness(value[0])}
                  max={200}
                  min={0}
                  step={10}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm">Contrast</Label>
                <Slider
                  value={[contrast]}
                  onValueChange={(value) => setContrast(value[0])}
                  max={200}
                  min={0}
                  step={10}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Analysis</span>
                </div>
                <Button size="sm" onClick={handleAiAnalysis}>
                  Analyze
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-1">{aiAnalysis.riskScore}</div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Findings</Label>
                {aiAnalysis.findings.map((finding, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{finding.type}</span>
                      <Badge className={`bg-${getSeverityColor(finding.severity)} text-${getSeverityColor(finding.severity)}-foreground`}>
                        {finding.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{finding.location}</p>
                    <p className="text-xs text-muted-foreground">Confidence: {finding.confidence}%</p>
                  </div>
                ))}
              </div>

              <div>
                <Label className="text-sm font-medium">Recommendations</Label>
                <ul className="mt-2 space-y-1">
                  {aiAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-xs text-muted-foreground">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Series Navigator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5" />
                <span>Series</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 bg-primary-soft rounded border border-primary">
                  <p className="text-sm font-medium">Cardiac CTA</p>
                  <p className="text-xs text-muted-foreground">64 slices</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="text-sm font-medium">Calcium Score</p>
                  <p className="text-xs text-muted-foreground">32 slices</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="text-sm font-medium">Localizer</p>
                  <p className="text-xs text-muted-foreground">3 slices</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export { DicomViewer };