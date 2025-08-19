import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Settings,
  Layers,
  Maximize,
  Square
} from 'lucide-react';

interface BoneModel {
  id: string;
  name: string;
  type: 'femur' | 'tibia' | 'humerus' | 'spine' | 'pelvis';
  patientId: string;
  scanDate: string;
  quality: 'high' | 'medium' | 'low';
}

export const BoneViewer3D: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<BoneModel | null>(null);
  const [viewSettings, setViewSettings] = useState({
    opacity: [100],
    brightness: [50],
    contrast: [50],
    zoom: [100],
    rotation: { x: 0, y: 0, z: 0 },
    wireframe: false,
    xray: false
  });
  const viewerRef = useRef<HTMLDivElement>(null);

  const mockModels: BoneModel[] = [
    {
      id: '1',
      name: 'Right Femur - Post Surgery',
      type: 'femur',
      patientId: 'P001',
      scanDate: '2024-01-15',
      quality: 'high'
    },
    {
      id: '2', 
      name: 'Lumbar Spine L1-L5',
      type: 'spine',
      patientId: 'P002',
      scanDate: '2024-01-14',
      quality: 'medium'
    },
    {
      id: '3',
      name: 'Left Tibia Fracture',
      type: 'tibia', 
      patientId: 'P003',
      scanDate: '2024-01-13',
      quality: 'high'
    }
  ];

  const resetView = () => {
    setViewSettings({
      opacity: [100],
      brightness: [50],
      contrast: [50],
      zoom: [100],
      rotation: { x: 0, y: 0, z: 0 },
      wireframe: false,
      xray: false
    });
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">3D Bone Viewer</h1>
          <p className="text-muted-foreground">Interactive 3D bone model visualization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Model
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Advanced Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Model Library */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Bone Models
            </CardTitle>
            <CardDescription>Available 3D reconstructions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockModels.map((model) => (
                <div 
                  key={model.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedModel?.id === model.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{model.name}</span>
                    <Badge className={getQualityColor(model.quality)}>
                      {model.quality}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Patient: {model.patientId}</div>
                    <div>Scan: {model.scanDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3D Viewer */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>3D Visualization</CardTitle>
                <CardDescription>
                  {selectedModel ? selectedModel.name : 'Select a bone model to view'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetView}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              ref={viewerRef}
              className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden"
              style={{ height: '400px' }}
            >
              {selectedModel ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white/10 rounded-lg flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-white/30 rounded-lg animate-spin" 
                           style={{ 
                             borderTopColor: 'white',
                             animationDuration: '2s' 
                           }} 
                      />
                    </div>
                    <p className="text-lg font-medium">{selectedModel.type.toUpperCase()} MODEL</p>
                    <p className="text-sm opacity-75">Interactive 3D view would load here</p>
                    <p className="text-xs opacity-50 mt-2">
                      Requires Three.js integration for full functionality
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <Square className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Select a bone model to begin visualization</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controls Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">View Controls</CardTitle>
            <CardDescription>Adjust visualization settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="display" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="display">Display</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="display" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Opacity</label>
                    <Slider
                      value={viewSettings.opacity}
                      onValueChange={(value) => setViewSettings(prev => ({ ...prev, opacity: value }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <span className="text-xs text-muted-foreground">{viewSettings.opacity[0]}%</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Brightness</label>
                    <Slider
                      value={viewSettings.brightness}
                      onValueChange={(value) => setViewSettings(prev => ({ ...prev, brightness: value }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <span className="text-xs text-muted-foreground">{viewSettings.brightness[0]}%</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Zoom</label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Slider
                        value={viewSettings.zoom}
                        onValueChange={(value) => setViewSettings(prev => ({ ...prev, zoom: value }))}
                        min={25}
                        max={200}
                        step={5}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">{viewSettings.zoom[0]}%</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="mr-2 h-4 w-4" />
                    Measure Distance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Square className="mr-2 h-4 w-4" />
                    Cross-Section
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Layers className="mr-2 h-4 w-4" />
                    Density Map
                  </Button>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Analysis Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fracture">Fracture Analysis</SelectItem>
                      <SelectItem value="density">Bone Density</SelectItem>
                      <SelectItem value="implant">Implant Fit</SelectItem>
                      <SelectItem value="deformation">Deformation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};