import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Scan, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Move, 
  Crosshair,
  Download,
  Upload,
  Brain,
  Eye,
  AlertTriangle,
  CheckCircle,
  Layers,
  Target,
  Ruler
} from 'lucide-react';

// Mock neuroimaging data
const studyInfo = {
  patientName: 'Priya Sharma',
  patientAge: 45,
  studyType: 'MRI Brain',
  studyDate: '2024-01-12',
  sequence: 'T1-weighted FLAIR',
  sliceThickness: '3mm',
  fieldStrength: '3T'
};

const aiAnalysis = {
  lesions: [
    {
      type: 'White Matter Hyperintensity',
      location: 'Periventricular',
      volume: '2.3 ml',
      severity: 'Mild',
      confidence: 92
    },
    {
      type: 'Microhemorrhage',
      location: 'Left Frontal',
      volume: '0.5 ml',
      severity: 'Low',
      confidence: 87
    }
  ],
  volumetrics: {
    totalBrainVolume: '1340 ml',
    grayMatter: '650 ml',
    whiteMatter: '690 ml',
    csf: '180 ml'
  },
  recommendations: [
    'Follow-up imaging in 6 months',
    'Consider vascular risk factor assessment',
    'Clinical correlation recommended'
  ]
};

const imageSequences = [
  'T1-weighted',
  'T2-weighted', 
  'FLAIR',
  'DWI',
  'ADC',
  'SWI',
  'T2*-GRE'
];

const windowPresets = [
  { name: 'Brain', window: 80, level: 40 },
  { name: 'Bone', window: 2000, level: 300 },
  { name: 'Soft Tissue', window: 400, level: 50 },
  { name: 'CSF', window: 80, level: 40 }
];

export function Neuroimaging() {
  const [selectedTool, setSelectedTool] = useState('crosshair');
  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [currentSlice, setCurrentSlice] = useState(75);
  const [selectedSequence, setSelectedSequence] = useState('FLAIR');
  const [showAiOverlay, setShowAiOverlay] = useState(true);
  const [windowLevel, setWindowLevel] = useState(40);
  const [windowWidth, setWindowWidth] = useState(80);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tools = [
    { id: 'crosshair', icon: Crosshair, label: 'Crosshair' },
    { id: 'zoom', icon: ZoomIn, label: 'Zoom' },
    { id: 'pan', icon: Move, label: 'Pan' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate' },
    { id: 'measure', icon: Ruler, label: 'Measure' },
    { id: 'annotate', icon: Target, label: 'Annotate' }
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    toast(`${tools.find(t => t.id === toolId)?.label} tool selected`);
  };

  const handleAiAnalysis = () => {
    toast("AI lesion segmentation analysis completed");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Mild': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const handleWindowPreset = (preset: typeof windowPresets[0]) => {
    setWindowWidth(preset.window);
    setWindowLevel(preset.level);
    toast(`Applied ${preset.name} window preset`);
  };

  return (
    <div className="space-y-6">
      {/* Study Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Neuroimaging - {studyInfo.patientName}
              </CardTitle>
              <CardDescription>
                {studyInfo.studyType} • {studyInfo.patientAge} years old • {studyInfo.studyDate}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{studyInfo.sequence}</Badge>
              <Badge variant="outline">{studyInfo.fieldStrength}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Image Viewer</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedSequence} onValueChange={setSelectedSequence}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {imageSequences.map((seq) => (
                      <SelectItem key={seq} value={seq}>
                        {seq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  size="sm" 
                  variant={showAiOverlay ? "default" : "outline"}
                  onClick={() => setShowAiOverlay(!showAiOverlay)}
                >
                  <Layers className="h-4 w-4 mr-1" />
                  AI Overlay
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-lg">
              <div className="flex items-center gap-1">
                {tools.map((tool) => (
                  <Button
                    key={tool.id}
                    size="sm"
                    variant={selectedTool === tool.id ? "default" : "ghost"}
                    onClick={() => handleToolSelect(tool.id)}
                    className="h-8 w-8 p-0"
                  >
                    <tool.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>Slice:</span>
                  <Slider
                    value={[currentSlice]}
                    onValueChange={(value) => setCurrentSlice(value[0])}
                    min={1}
                    max={150}
                    step={1}
                    className="w-24"
                  />
                  <span className="w-12">{currentSlice}/150</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Zoom:</span>
                  <span className="w-12">{zoom}%</span>
                </div>
              </div>
            </div>

            {/* Image Display */}
            <div className="relative border rounded-lg bg-black h-96 overflow-hidden">
              <canvas 
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
                style={{ background: '#000' }}
              />
              
              {/* Patient Info Overlay */}
              <div className="absolute top-2 left-2 text-white text-xs bg-black bg-opacity-50 p-2 rounded">
                <div>{studyInfo.patientName}</div>
                <div>{studyInfo.studyDate}</div>
                <div>{selectedSequence}</div>
              </div>
              
              {/* Image Info Overlay */}
              <div className="absolute top-2 right-2 text-white text-xs bg-black bg-opacity-50 p-2 rounded text-right">
                <div>Slice: {currentSlice}/150</div>
                <div>W: {windowWidth} L: {windowLevel}</div>
                <div>Zoom: {zoom}%</div>
              </div>

              {/* AI Lesion Overlays */}
              {showAiOverlay && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Mock lesion overlay - red circles */}
                  <div className="absolute top-1/3 left-1/2 w-8 h-8 border-2 border-red-500 rounded-full opacity-75" />
                  <div className="absolute top-2/3 right-1/3 w-6 h-6 border-2 border-yellow-500 rounded-full opacity-75" />
                </div>
              )}
            </div>

            {/* Window/Level Controls */}
            <div className="flex items-center justify-between mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span>Window:</span>
                  <Slider
                    value={[windowWidth]}
                    onValueChange={(value) => setWindowWidth(value[0])}
                    min={10}
                    max={2000}
                    step={10}
                    className="w-20"
                  />
                  <span className="w-12">{windowWidth}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Level:</span>
                  <Slider
                    value={[windowLevel]}
                    onValueChange={(value) => setWindowLevel(value[0])}
                    min={-500}
                    max={500}
                    step={5}
                    className="w-20"
                  />
                  <span className="w-12">{windowLevel}</span>
                </div>
              </div>
              
              <div className="flex gap-1">
                {windowPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    size="sm"
                    variant="outline"
                    onClick={() => handleWindowPreset(preset)}
                    className="text-xs"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lesions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lesions">Lesions</TabsTrigger>
                <TabsTrigger value="volumetrics">Volumetrics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="lesions" className="space-y-3">
                {aiAnalysis.lesions.map((lesion, index) => (
                  <div key={index} className={`p-3 rounded-lg border text-sm ${getSeverityColor(lesion.severity)}`}>
                    <div className="font-semibold mb-1">{lesion.type}</div>
                    <div className="space-y-1 text-xs">
                      <div><strong>Location:</strong> {lesion.location}</div>
                      <div><strong>Volume:</strong> {lesion.volume}</div>
                      <div><strong>Confidence:</strong> {lesion.confidence}%</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="volumetrics" className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Brain:</span>
                    <span>{aiAnalysis.volumetrics.totalBrainVolume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gray Matter:</span>
                    <span>{aiAnalysis.volumetrics.grayMatter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>White Matter:</span>
                    <span>{aiAnalysis.volumetrics.whiteMatter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CSF:</span>
                    <span>{aiAnalysis.volumetrics.csf}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-2 pt-4 border-t">
              <Button size="sm" className="w-full" onClick={handleAiAnalysis}>
                <Brain className="h-4 w-4 mr-2" />
                Re-run Analysis
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiAnalysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}