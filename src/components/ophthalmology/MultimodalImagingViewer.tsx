import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Camera, Eye, Microscope, Zap, Grid3X3, Maximize, 
  Download, Share, Ruler, Palette, MousePointer, 
  RotateCw, FlipHorizontal, ZoomIn, ZoomOut 
} from "lucide-react";

const MultimodalImagingViewer: React.FC = () => {
  useEffect(() => {
    document.title = "Multimodal Imaging Viewer | Ophthalmology";
  }, []);

  const [selectedPatient, setSelectedPatient] = useState("ravi-kumar");
  const [viewMode, setViewMode] = useState("side-by-side");
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [brightness, setBrightness] = useState([50]);
  const [contrast, setContrast] = useState([50]);

  const patients = [
    { id: "ravi-kumar", name: "Ravi Kumar", age: 62, condition: "NPDR with macular edema" },
    { id: "ananya-singh", name: "Ananya Singh", age: 48, condition: "Keratoconus suspect" },
    { id: "mohammed-ali", name: "Mohammed Ali", age: 71, condition: "Cataract grade 3" },
  ];

  const imagingModes = [
    { id: "fundus", name: "Color Fundus", icon: Camera, available: true },
    { id: "oct", name: "OCT B-scan", icon: Microscope, available: true },
    { id: "oct-a", name: "OCT Angiography", icon: Zap, available: true },
    { id: "faf", name: "Fundus AF", icon: Eye, available: false },
    { id: "fa", name: "Fluorescein", icon: Camera, available: false },
    { id: "icg", name: "ICG", icon: Camera, available: false },
  ];

  const aiFindings = [
    { type: "Microaneurysms", confidence: 0.89, color: "red" },
    { type: "Hard Exudates", confidence: 0.76, color: "yellow" },
    { type: "Cotton Wool Spots", confidence: 0.82, color: "blue" },
    { type: "Retinal Edema", confidence: 0.91, color: "green" },
  ];

  const measurements = [
    { type: "Central Macular Thickness", value: "380 μm", normal: "< 300 μm" },
    { type: "Cup/Disc Ratio", value: "0.6", normal: "< 0.7" },
    { type: "RNFL Average", value: "78 μm", normal: "> 90 μm" },
  ];

  return (
    <main className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Multimodal Imaging Viewer
        </h1>
        <p className="text-muted-foreground mt-2">
          Load fundus photos, OCT/OCT-A, FA/ICG, and AI-powered analysis
        </p>
      </header>

      {/* Patient Selection */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Patient Selection</CardTitle>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} (Age {patient.age}) - {patient.condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Imaging Controls */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Imaging Modes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {imagingModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <Button
                  key={mode.id}
                  variant={mode.available ? "default" : "ghost"}
                  disabled={!mode.available}
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {mode.name}
                  {!mode.available && (
                    <Badge variant="secondary" className="ml-auto">N/A</Badge>
                  )}
                </Button>
              );
            })}

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">View Mode</label>
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="side-by-side">Side by Side</SelectItem>
                    <SelectItem value="overlay">Overlay</SelectItem>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="single">Single View</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brightness</label>
                <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Contrast</label>
                <Slider value={contrast} onValueChange={setContrast} max={100} step={1} />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <label className="text-sm font-medium">Tools</label>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">
                  <Ruler className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MousePointer className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <FlipHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Viewer */}
        <Card className="col-span-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Imaging Viewer</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mock imaging viewer area */}
            <div className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <div className="text-center space-y-4">
                {viewMode === "side-by-side" ? (
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="aspect-square bg-primary/10 rounded-lg border flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-primary">Color Fundus</p>
                        <p className="text-xs text-muted-foreground">Right Eye</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-accent/10 rounded-lg border flex items-center justify-center">
                      <div className="text-center">
                        <Microscope className="h-8 w-8 text-accent mx-auto mb-2" />
                        <p className="text-sm text-accent">OCT B-scan</p>
                        <p className="text-xs text-muted-foreground">Foveal</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">No images loaded</p>
                    <p className="text-sm text-muted-foreground">Select imaging mode to view patient data</p>
                  </div>
                )}
              </div>
            </div>

            {/* Image Navigation */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button size="sm" variant="outline">Previous</Button>
              <span className="text-sm text-muted-foreground">Image 1 of 8</span>
              <Button size="sm" variant="outline">Next</Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Panel */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">AI Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="findings" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="findings">Findings</TabsTrigger>
                <TabsTrigger value="measurements">Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="findings" className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Detected Lesions</h4>
                  {aiFindings.map((finding, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-muted/50"
                      onClick={() => setActiveAnnotation(activeAnnotation === finding.type ? null : finding.type)}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: finding.color }}
                        />
                        <span className="text-sm">{finding.type}</span>
                      </div>
                      <Badge variant="secondary">
                        {Math.round(finding.confidence * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">DR Grading</h4>
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="font-medium text-warning">Moderate NPDR</p>
                    <p className="text-xs text-muted-foreground">With macular edema</p>
                    <p className="text-xs text-muted-foreground mt-1">Recommend: 3-4 month follow-up</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="measurements" className="space-y-3">
                {measurements.map((measurement, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{measurement.type}</span>
                      <Badge variant={measurement.value === measurement.normal ? "default" : "destructive"}>
                        {measurement.value}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Normal: {measurement.normal}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Layer Analysis</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>RNFL</span>
                      <Badge variant="destructive">Thin</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GCIPL</span>
                      <Badge variant="secondary">Normal</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>RPE</span>
                      <Badge variant="secondary">Intact</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            <div className="space-y-2">
              <Button size="sm" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Export DICOM
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MultimodalImagingViewer;
