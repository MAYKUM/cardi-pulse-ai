import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff,
  Layers,
  Ruler,
  Target,
  Settings,
  Download,
  Upload,
  Maximize,
  Move3D,
  Palette
} from 'lucide-react';

interface BoneModel {
  id: string;
  patientName: string;
  patientId: string;
  studyDate: string;
  bodyPart: string;
  scanType: 'CT' | 'MRI' | 'CBCT';
  resolution: string;
  reconstructionQuality: 'high' | 'medium' | 'low';
  pathology: string[];
  measurements: Measurement[];
  annotations: Annotation[];
}

interface Measurement {
  id: string;
  type: 'distance' | 'angle' | 'volume' | 'surface-area';
  label: string;
  value: number;
  unit: string;
  coordinates: number[][];
}

interface Annotation {
  id: string;
  type: 'fracture' | 'deformity' | 'tumor' | 'artifact' | 'roi';
  label: string;
  description: string;
  coordinates: number[];
  color: string;
}

interface ViewSettings {
  opacity: number;
  wireframe: boolean;
  lighting: 'ambient' | 'directional' | 'point';
  colorScheme: 'bone' | 'rainbow' | 'grayscale' | 'thermal';
  clippingPlane: {
    enabled: boolean;
    axis: 'x' | 'y' | 'z';
    position: number;
  };
}

export const BoneReconstructionViewer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('model-1');
  const [viewSettings, setViewSettings] = useState<ViewSettings>({
    opacity: 100,
    wireframe: false,
    lighting: 'directional',
    colorScheme: 'bone',
    clippingPlane: {
      enabled: false,
      axis: 'z',
      position: 50
    }
  });
  const [activeView, setActiveView] = useState<string>('3d');
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const boneModel: BoneModel = {
    id: "model-1",
    patientName: "Rajesh Kumar",
    patientId: "P001",
    studyDate: "2024-01-15",
    bodyPart: "Right Femur",
    scanType: "CT",
    resolution: "0.5mm slice thickness",
    reconstructionQuality: "high",
    pathology: ["Displaced mid-shaft fracture", "Comminuted fragments"],
    measurements: [
      {
        id: "m1",
        type: "distance",
        label: "Fracture gap",
        value: 12.5,
        unit: "mm",
        coordinates: [[0, 0, 0], [12.5, 0, 0]]
      },
      {
        id: "m2",
        type: "angle",
        label: "Angulation",
        value: 15.2,
        unit: "degrees",
        coordinates: [[0, 0, 0], [10, 0, 0], [8, 5, 0]]
      },
      {
        id: "m3",
        type: "volume",
        label: "Bone fragment",
        value: 2.3,
        unit: "cm³",
        coordinates: []
      }
    ],
    annotations: [
      {
        id: "a1",
        type: "fracture",
        label: "Primary fracture line",
        description: "Oblique fracture through mid-shaft",
        coordinates: [0, 0, 0],
        color: "#ef4444"
      },
      {
        id: "a2",
        type: "fracture",
        label: "Butterfly fragment",
        description: "Comminuted fragment on lateral aspect",
        coordinates: [5, 2, 0],
        color: "#f97316"
      }
    ]
  };

  const handleOpacityChange = (value: number[]) => {
    setViewSettings(prev => ({ ...prev, opacity: value[0] }));
  };

  const handleClippingChange = (value: number[]) => {
    setViewSettings(prev => ({
      ...prev,
      clippingPlane: { ...prev.clippingPlane, position: value[0] }
    }));
  };

  const getPathologyColor = (pathology: string) => {
    if (pathology.toLowerCase().includes('fracture')) return 'bg-red-100 text-red-800 border-red-200';
    if (pathology.toLowerCase().includes('tumor')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (pathology.toLowerCase().includes('deformity')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">3D Bone Reconstruction Viewer</h1>
          <p className="text-muted-foreground">Advanced 3D visualization for complex trauma and deformities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Load DICOM
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Model
          </Button>
          <Button size="sm">
            <Target className="w-4 h-4 mr-2" />
            Start Planning
          </Button>
        </div>
      </div>

      {/* Model Information */}
      <Card>
        <CardHeader>
          <CardTitle>Model Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Patient</p>
              <p className="font-medium">{boneModel.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Body Part</p>
              <p className="font-medium">{boneModel.bodyPart}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scan Type</p>
              <p className="font-medium">{boneModel.scanType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Study Date</p>
              <p className="font-medium">{new Date(boneModel.studyDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resolution</p>
              <p className="font-medium">{boneModel.resolution}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quality</p>
              <Badge variant="outline">{boneModel.reconstructionQuality}</Badge>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Pathology</p>
            <div className="flex gap-2">
              {boneModel.pathology.map((pathology, index) => (
                <Badge key={index} className={getPathologyColor(pathology)}>
                  {pathology}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 3D Viewer */}
        <div className="lg:col-span-3">
          <Card className="h-[700px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Move3D className="w-5 h-5" />
                  3D Reconstruction Viewer
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Maximize className="w-4 h-4" />
                  </Button>
                  <Select value={activeView} onValueChange={setActiveView}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3d">3D View</SelectItem>
                      <SelectItem value="axial">Axial</SelectItem>
                      <SelectItem value="sagittal">Sagittal</SelectItem>
                      <SelectItem value="coronal">Coronal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                {/* 3D Visualization Area */}
                <div className="text-center text-white/60">
                  <div className="w-24 h-24 mx-auto mb-4 border-2 border-white/20 rounded-lg flex items-center justify-center">
                    <Move3D className="w-12 h-12" />
                  </div>
                  <p className="text-lg">3D Bone Model Viewer</p>
                  <p className="text-sm mt-2">{boneModel.bodyPart} - {boneModel.scanType} Reconstruction</p>
                </div>
                
                {/* Overlay Controls */}
                <div className="absolute top-4 left-4 space-y-2">
                  <Button size="sm" variant="secondary">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>

                {/* Annotations Overlay */}
                {showAnnotations && boneModel.annotations.map((annotation, index) => (
                  <div
                    key={annotation.id}
                    className="absolute top-20 right-20 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: annotation.color }}
                    title={annotation.label}
                  />
                ))}

                {/* Measurements Overlay */}
                {showMeasurements && (
                  <div className="absolute bottom-4 left-4 space-y-1">
                    {boneModel.measurements.map((measurement) => (
                      <div key={measurement.id} className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                        {measurement.label}: {measurement.value} {measurement.unit}
                      </div>
                    ))}
                  </div>
                )}

                {/* View Mode Indicator */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">{activeView.toUpperCase()}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* View Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                View Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Opacity</label>
                  <span className="text-sm text-muted-foreground">{viewSettings.opacity}%</span>
                </div>
                <Slider
                  value={[viewSettings.opacity]}
                  onValueChange={handleOpacityChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Color Scheme</label>
                <Select 
                  value={viewSettings.colorScheme} 
                  onValueChange={(value) => setViewSettings(prev => ({ ...prev, colorScheme: value as any }))}
                >
                  <SelectTrigger>
                    <Palette className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bone">Bone (Default)</SelectItem>
                    <SelectItem value="rainbow">Rainbow</SelectItem>
                    <SelectItem value="grayscale">Grayscale</SelectItem>
                    <SelectItem value="thermal">Thermal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Lighting</label>
                <Select 
                  value={viewSettings.lighting} 
                  onValueChange={(value) => setViewSettings(prev => ({ ...prev, lighting: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ambient">Ambient</SelectItem>
                    <SelectItem value="directional">Directional</SelectItem>
                    <SelectItem value="point">Point Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Wireframe</label>
                <Button
                  size="sm"
                  variant={viewSettings.wireframe ? "default" : "outline"}
                  onClick={() => setViewSettings(prev => ({ ...prev, wireframe: !prev.wireframe }))}
                >
                  <Layers className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Clipping Plane */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Clipping Plane
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enable Clipping</label>
                <Button
                  size="sm"
                  variant={viewSettings.clippingPlane.enabled ? "default" : "outline"}
                  onClick={() => setViewSettings(prev => ({
                    ...prev,
                    clippingPlane: { ...prev.clippingPlane, enabled: !prev.clippingPlane.enabled }
                  }))}
                >
                  {viewSettings.clippingPlane.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>

              {viewSettings.clippingPlane.enabled && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Axis</label>
                    <Select 
                      value={viewSettings.clippingPlane.axis} 
                      onValueChange={(value) => setViewSettings(prev => ({
                        ...prev,
                        clippingPlane: { ...prev.clippingPlane, axis: value as any }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="x">X-Axis</SelectItem>
                        <SelectItem value="y">Y-Axis</SelectItem>
                        <SelectItem value="z">Z-Axis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Position</label>
                      <span className="text-sm text-muted-foreground">{viewSettings.clippingPlane.position}%</span>
                    </div>
                    <Slider
                      value={[viewSettings.clippingPlane.position]}
                      onValueChange={handleClippingChange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Measurements & Annotations */}
          <Card>
            <CardHeader>
              <CardTitle>Measurements & Annotations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Show Measurements</label>
                <Button
                  size="sm"
                  variant={showMeasurements ? "default" : "outline"}
                  onClick={() => setShowMeasurements(!showMeasurements)}
                >
                  <Ruler className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Show Annotations</label>
                <Button
                  size="sm"
                  variant={showAnnotations ? "default" : "outline"}
                  onClick={() => setShowAnnotations(!showAnnotations)}
                >
                  <Target className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <h4 className="text-sm font-medium">Current Measurements</h4>
                {boneModel.measurements.map((measurement) => (
                  <div key={measurement.id} className="text-xs p-2 bg-muted rounded">
                    <div className="font-medium">{measurement.label}</div>
                    <div className="text-muted-foreground">
                      {measurement.value} {measurement.unit}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Ruler className="w-4 h-4 mr-2" />
                Add Measurement
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Add Annotation
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Screenshots
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};