import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, TrendingUp, AlertTriangle, Activity, Clock, Target, FileImage, CheckCircle } from 'lucide-react';

interface FractureCase {
  id: string;
  patientName: string;
  fractureType: string;
  location: string;
  aoClassification: string;
  injuryDate: string;
  surgeryDate?: string;
  currentPhase: 'inflammatory' | 'repair' | 'remodeling' | 'complete';
  healingProgress: number;
  expectedCompletion: string;
  complications: string[];
  radiographicProgression: RadiographicData[];
}

interface RadiographicData {
  date: string;
  findings: string;
  callousFormation: number;
  bridging: number;
  clinicalNotes: string;
  aiScore: number;
}

export const FractureHealing: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string>('');
  const [selectedView, setSelectedView] = useState<string>('timeline');

  const fractureCase: FractureCase = {
    id: "FH001",
    patientName: "Rajesh Kumar",
    fractureType: "Displaced Femur Fracture",
    location: "Mid-shaft Femur",
    aoClassification: "32-A3",
    injuryDate: "2023-12-15",
    surgeryDate: "2023-12-16",
    currentPhase: "repair",
    healingProgress: 65,
    expectedCompletion: "2024-03-15",
    complications: ["Delayed union risk"],
    radiographicProgression: [
      {
        date: "2023-12-16",
        findings: "Post-operative imaging",
        callousFormation: 0,
        bridging: 0,
        clinicalNotes: "Good reduction and fixation",
        aiScore: 85
      },
      {
        date: "2024-01-02",
        findings: "Early callous formation",
        callousFormation: 25,
        bridging: 10,
        clinicalNotes: "Early healing response visible",
        aiScore: 78
      },
      {
        date: "2024-01-16",
        findings: "Progressive callous",
        callousFormation: 45,
        bridging: 30,
        clinicalNotes: "Good progression, no complications",
        aiScore: 82
      },
      {
        date: "2024-01-30",
        findings: "Bridging callous",
        callousFormation: 65,
        bridging: 55,
        clinicalNotes: "Excellent healing response",
        aiScore: 88
      }
    ]
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'inflammatory': return 'bg-red-100 text-red-800 border-red-200';
      case 'repair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'remodeling': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'complete': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExpectedTimelinePhases = () => {
    const phases = [
      { name: 'Inflammatory', duration: '1-2 weeks', description: 'Hematoma formation and initial response' },
      { name: 'Repair', duration: '2-6 weeks', description: 'Callous formation and soft tissue repair' },
      { name: 'Remodeling', duration: '6-12 weeks', description: 'Bone remodeling and strengthening' },
      { name: 'Complete', duration: '3-6 months', description: 'Full structural integrity restored' }
    ];
    return phases;
  };

  const calculateDaysFromInjury = (date: string) => {
    const injuryDate = new Date(fractureCase.injuryDate);
    const currentDate = new Date(date);
    const diffTime = Math.abs(currentDate.getTime() - injuryDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fracture Healing Tracker</h1>
          <p className="text-muted-foreground">Monitor radiological progression and healing timeline</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileImage className="w-4 h-4 mr-2" />
            Upload X-ray
          </Button>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Follow-up
          </Button>
        </div>
      </div>

      {/* Patient Case Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Case</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Patient</p>
              <p className="font-medium">{fractureCase.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fracture Type</p>
              <p className="font-medium">{fractureCase.fractureType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AO Classification</p>
              <p className="font-medium">{fractureCase.aoClassification}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Phase</p>
              <Badge className={getPhaseColor(fractureCase.currentPhase)}>
                {fractureCase.currentPhase}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Healing Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Healing Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">{fractureCase.healingProgress}%</span>
              </div>
              <Progress value={fractureCase.healingProgress} className="h-3" />
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Days Since Injury</p>
                  <p className="text-2xl font-bold text-foreground">
                    {calculateDaysFromInjury(new Date().toISOString().split('T')[0])}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Expected Completion</p>
                  <p className="text-lg font-medium text-foreground">
                    {new Date(fractureCase.expectedCompletion).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">AI Healing Score</p>
                  <p className="text-2xl font-bold text-primary">
                    {fractureCase.radiographicProgression[fractureCase.radiographicProgression.length - 1]?.aiScore || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Radiographic Progression */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Radiographic Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="space-y-4 mt-4">
                  {fractureCase.radiographicProgression.map((data, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                        {calculateDaysFromInjury(data.date)}d
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{data.findings}</h4>
                          <Badge variant="outline">
                            AI Score: {data.aiScore}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{data.clinicalNotes}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Callous Formation</p>
                            <Progress value={data.callousFormation} className="h-2 mt-1" />
                            <span className="text-xs text-muted-foreground">{data.callousFormation}%</span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Bridging</p>
                            <Progress value={data.bridging} className="h-2 mt-1" />
                            <span className="text-xs text-muted-foreground">{data.bridging}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Initial X-ray (Day 1)</h4>
                      <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileImage className="w-12 h-12 text-slate-400" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Post-operative imaging</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Latest X-ray (Day {calculateDaysFromInjury(fractureCase.radiographicProgression[fractureCase.radiographicProgression.length - 1].date)})</h4>
                      <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileImage className="w-12 h-12 text-slate-400" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Bridging callous formation</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Healing Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Expected Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getExpectedTimelinePhases().map((phase, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    phase.name.toLowerCase() === fractureCase.currentPhase 
                      ? 'bg-primary text-primary-foreground' 
                      : index < getExpectedTimelinePhases().findIndex(p => p.name.toLowerCase() === fractureCase.currentPhase)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index < getExpectedTimelinePhases().findIndex(p => p.name.toLowerCase() === fractureCase.currentPhase) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{phase.name}</h4>
                    <p className="text-xs text-muted-foreground">{phase.duration}</p>
                    <p className="text-xs text-muted-foreground mt-1">{phase.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fractureCase.complications.length > 0 ? (
                fractureCase.complications.map((complication, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800">{complication}</h4>
                    <p className="text-sm text-yellow-600">Monitor closely for signs of delayed healing</p>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800">No Risk Factors</h4>
                  <p className="text-sm text-green-600">Normal healing progression expected</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <FileImage className="w-4 h-4 mr-2" />
                Upload New X-ray
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                AI Analysis
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                Progress Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};