import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Brain, Calendar, Download, Upload, Zap } from 'lucide-react';

interface FractureDetection {
  type: string;
  location: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  aoClassification?: string;
}

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  mrn: string;
  studyDate: string;
  bodyPart: string;
}

export const XrayAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number>(1);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);

  const patientInfo: PatientInfo = {
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    mrn: "MRN-2024-001",
    studyDate: "2024-01-15",
    bodyPart: "Right Femur"
  };

  const fractureDetections: FractureDetection[] = [
    {
      type: "Displaced Fracture",
      location: "Mid-shaft Femur",
      confidence: 94.2,
      severity: "severe",
      aoClassification: "32-A3"
    },
    {
      type: "Hairline Fracture",
      location: "Proximal Tibia",
      confidence: 87.5,
      severity: "mild",
      aoClassification: "41-A1"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'severe': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">X-ray Analysis</h1>
          <p className="text-muted-foreground">AI-powered fracture detection and classification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Images
          </Button>
        </div>
      </div>

      {/* Patient Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Patient Name</p>
              <p className="font-medium">{patientInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age/Gender</p>
              <p className="font-medium">{patientInfo.age}Y / {patientInfo.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">MRN</p>
              <p className="font-medium">{patientInfo.mrn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Study Date</p>
              <p className="font-medium">{patientInfo.studyDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* X-ray Viewer */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>X-ray Viewer - {patientInfo.bodyPart}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={aiAnalysisEnabled ? "default" : "secondary"}>
                    AI Analysis {aiAnalysisEnabled ? "ON" : "OFF"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAiAnalysisEnabled(!aiAnalysisEnabled)}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Toggle AI
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="relative h-full bg-black rounded-lg flex items-center justify-center">
                {/* Placeholder for X-ray image */}
                <div className="text-white/60 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-8 h-8" />
                  </div>
                  <p>X-ray Image Viewer</p>
                  <p className="text-sm mt-2">Image {selectedImage} of 3</p>
                </div>
                
                {/* AI Overlay Indicators */}
                {aiAnalysisEnabled && (
                  <>
                    <div className="absolute top-20 left-20 w-12 h-12 border-2 border-red-500 rounded-full flex items-center justify-center">
                      <span className="text-red-500 text-xs font-bold">F1</span>
                    </div>
                    <div className="absolute top-40 right-32 w-8 h-8 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-yellow-500 text-xs font-bold">F2</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Image Navigation */}
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3].map((num) => (
                  <Button
                    key={num}
                    size="sm"
                    variant={selectedImage === num ? "default" : "outline"}
                    onClick={() => setSelectedImage(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-6">
          {/* AI Fracture Detection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Fracture Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fractureDetections.map((detection, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{detection.type}</h4>
                    <Badge className={getSeverityColor(detection.severity)}>
                      {detection.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{detection.location}</p>
                  {detection.aoClassification && (
                    <p className="text-sm">
                      <span className="font-medium">AO Classification:</span> {detection.aoClassification}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <Progress value={detection.confidence} className="flex-1" />
                    <span className="text-sm font-medium">{detection.confidence}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Mark as Critical
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Surgery
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Measurement Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Measurement Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="distance" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="distance">Distance</TabsTrigger>
                  <TabsTrigger value="angle">Angle</TabsTrigger>
                  <TabsTrigger value="area">Area</TabsTrigger>
                </TabsList>
                <TabsContent value="distance" className="space-y-2">
                  <p className="text-sm text-muted-foreground">Click two points to measure distance</p>
                  <Button size="sm" className="w-full">Start Measurement</Button>
                </TabsContent>
                <TabsContent value="angle" className="space-y-2">
                  <p className="text-sm text-muted-foreground">Click three points to measure angle</p>
                  <Button size="sm" className="w-full">Start Measurement</Button>
                </TabsContent>
                <TabsContent value="area" className="space-y-2">
                  <p className="text-sm text-muted-foreground">Draw polygon to measure area</p>
                  <Button size="sm" className="w-full">Start Measurement</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};