import React, { useState, memo, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap, 
  Download, 
  FileText, 
  TrendingUp, 
  Activity, 
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EMGPanel = memo(function EMGPanel() {
  const { toast } = useToast();
  const [selectedTest, setSelectedTest] = useState('median-motor');

  // Memoize static data to prevent recreation on every render
  const studyInfo = useMemo(() => ({
    patientId: "NP-2024-003",
    patientName: "Amit Singh",
    age: 52,
    studyDate: "2024-01-23",
    referringPhysician: "Dr. Neurologist",
    indication: "Carpal Tunnel Syndrome"
  }), []);

  const motorTests = useMemo(() => [
    {
      nerve: "Median Motor",
      muscle: "Abductor Pollicis Brevis",
      latency: "4.2 ms",
      amplitude: "8.5 mV",
      velocity: "52 m/s",
      distance: "220 mm",
      status: "abnormal",
      reference: "< 4.0 ms"
    },
    {
      nerve: "Ulnar Motor", 
      muscle: "Abductor Digiti Minimi",
      latency: "3.1 ms",
      amplitude: "9.2 mV", 
      velocity: "58 m/s",
      distance: "240 mm",
      status: "normal",
      reference: "< 3.5 ms"
    },
    {
      nerve: "Radial Motor",
      muscle: "Extensor Indicis",
      latency: "2.8 ms",
      amplitude: "7.8 mV",
      velocity: "55 m/s", 
      distance: "180 mm",
      status: "normal",
      reference: "< 3.0 ms"
    }
  ], []);

  const sensoryTests = useMemo(() => [
    {
      nerve: "Median Sensory",
      segment: "Wrist-Index",
      latency: "4.8 ms",
      amplitude: "12 μV",
      velocity: "42 m/s",
      distance: "140 mm", 
      status: "abnormal",
      reference: "< 3.5 ms"
    },
    {
      nerve: "Ulnar Sensory",
      segment: "Wrist-Little",
      latency: "3.2 ms",
      amplitude: "18 μV",
      velocity: "48 m/s",
      distance: "140 mm",
      status: "normal", 
      reference: "< 3.5 ms"
    }
  ], []);

  const fWaveTests = useMemo(() => [
    {
      nerve: "Median F-Wave",
      latency: "32.5 ms",
      amplitude: "0.8 mV",
      persistence: "85%",
      status: "abnormal",
      reference: "< 31.0 ms"
    }
  ], []);

  const aiInterpretation = useMemo(() => ({
    diagnosis: "Moderate Carpal Tunnel Syndrome",
    confidence: 92,
    findings: [
      "Prolonged median motor distal latency",
      "Prolonged median sensory latency",
      "Normal ulnar nerve function",
      "Focal median nerve slowing at wrist"
    ],
    recommendations: [
      "Surgical consultation recommended",
      "Consider wrist splinting",
      "Follow-up in 3 months if conservative management"
    ]
  }), []);

  const generateReport = useCallback(() => {
    toast({
      title: "EMG/NCS Report Generated",
      description: "Comprehensive report with AI interpretation ready for download"
    });
  }, [toast]);

  const getStatusColor = useCallback((status: string) => {
    return status === 'normal' ? 'text-success' : 'text-warning';
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    return status === 'normal' ? 
      <CheckCircle className="w-4 h-4 text-success" /> : 
      <AlertCircle className="w-4 h-4 text-warning" />;
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Study Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">EMG/Nerve Conduction Study</CardTitle>
                <p className="text-muted-foreground">
                  {studyInfo.patientName} • {studyInfo.patientId} • Age {studyInfo.age}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Study Date: {studyInfo.studyDate}</p>
              <p>Referring: {studyInfo.referringPhysician}</p>
              <p>Indication: {studyInfo.indication}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Results */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="motor" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="motor">Motor NCS</TabsTrigger>
              <TabsTrigger value="sensory">Sensory NCS</TabsTrigger>
              <TabsTrigger value="fwave">F-Wave</TabsTrigger>
              <TabsTrigger value="emg">EMG</TabsTrigger>
            </TabsList>

            <TabsContent value="motor">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Motor Nerve Conduction Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {motorTests.map((test, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{test.nerve}</h3>
                            {getStatusIcon(test.status)}
                          </div>
                          <Badge variant={test.status === 'normal' ? 'default' : 'secondary'}>
                            {test.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">Recording: {test.muscle}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Latency</p>
                            <p className={`font-medium ${getStatusColor(test.status)}`}>
                              {test.latency}
                            </p>
                            <p className="text-xs text-muted-foreground">{test.reference}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Amplitude</p>
                            <p className="font-medium">{test.amplitude}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Velocity</p>
                            <p className="font-medium">{test.velocity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Distance</p>
                            <p className="font-medium">{test.distance}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensory">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sensory Nerve Conduction Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sensoryTests.map((test, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{test.nerve}</h3>
                            {getStatusIcon(test.status)}
                          </div>
                          <Badge variant={test.status === 'normal' ? 'default' : 'secondary'}>
                            {test.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">Segment: {test.segment}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Latency</p>
                            <p className={`font-medium ${getStatusColor(test.status)}`}>
                              {test.latency}
                            </p>
                            <p className="text-xs text-muted-foreground">{test.reference}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Amplitude</p>
                            <p className="font-medium">{test.amplitude}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Velocity</p>
                            <p className="font-medium">{test.velocity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Distance</p>
                            <p className="font-medium">{test.distance}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fwave">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">F-Wave Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fWaveTests.map((test, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{test.nerve}</h3>
                            {getStatusIcon(test.status)}
                          </div>
                          <Badge variant={test.status === 'normal' ? 'default' : 'secondary'}>
                            {test.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Latency</p>
                            <p className={`font-medium ${getStatusColor(test.status)}`}>
                              {test.latency}
                            </p>
                            <p className="text-xs text-muted-foreground">{test.reference}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Amplitude</p>
                            <p className="font-medium">{test.amplitude}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Persistence</p>
                            <p className="font-medium">{test.persistence}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emg">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Electromyography</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-background border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Activity className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-lg font-medium">EMG Waveforms</p>
                      <p className="text-sm">Needle EMG recordings would display here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Interpretation Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-primary">{aiInterpretation.diagnosis}</p>
                  <Badge variant="secondary">{aiInterpretation.confidence}%</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Findings</h4>
                <ul className="space-y-1 text-sm">
                  {aiInterpretation.findings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1 text-sm">
                  {aiInterpretation.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Motor Tests</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sensory Tests</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">F-Wave Tests</span>
                <Badge variant="secondary">1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Abnormal Results</span>
                <Badge variant="destructive">2</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button onClick={generateReport} className="w-full" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export { EMGPanel };