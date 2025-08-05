import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Zap, 
  TrendingUp, 
  Download,
  FileText,
  Activity,
  Timer,
  Gauge,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Mock EMG/NCS data
const studyInfo = {
  patientName: 'Amit Patel',
  patientAge: 62,
  studyDate: '2024-01-10',
  indication: 'Suspected peripheral neuropathy',
  clinician: 'Dr. Neurologist'
};

const nerveStudies = [
  {
    nerve: 'Median Motor',
    side: 'Right',
    distalLatency: 3.2,
    amplitude: 8.5,
    conductionVelocity: 52,
    normalRanges: { latency: '<4.2ms', amplitude: '>5mV', velocity: '>49m/s' },
    interpretation: 'Normal'
  },
  {
    nerve: 'Median Sensory',
    side: 'Right', 
    distalLatency: 2.8,
    amplitude: 35,
    conductionVelocity: 58,
    normalRanges: { latency: '<3.5ms', amplitude: '>15μV', velocity: '>50m/s' },
    interpretation: 'Normal'
  },
  {
    nerve: 'Ulnar Motor',
    side: 'Right',
    distalLatency: 4.8,
    amplitude: 3.2,
    conductionVelocity: 45,
    normalRanges: { latency: '<3.3ms', amplitude: '>6mV', velocity: '>49m/s' },
    interpretation: 'Abnormal'
  },
  {
    nerve: 'Peroneal Motor',
    side: 'Right',
    distalLatency: 5.2,
    amplitude: 2.1,
    conductionVelocity: 38,
    normalRanges: { latency: '<5.5ms', amplitude: '>2mV', velocity: '>44m/s' },
    interpretation: 'Abnormal'
  }
];

const emgFindings = [
  {
    muscle: 'First Dorsal Interosseous',
    side: 'Right',
    insertionalActivity: 'Normal',
    spontaneousActivity: 'None',
    muaps: 'Normal amplitude and duration',
    recruitment: 'Full',
    interpretation: 'Normal'
  },
  {
    muscle: 'Abductor Pollicis Brevis',
    side: 'Right',
    insertionalActivity: 'Increased',
    spontaneousActivity: 'Fibrillations',
    muaps: 'Increased amplitude, prolonged duration',
    recruitment: 'Reduced',
    interpretation: 'Chronic denervation'
  }
];

const clinicalSummary = {
  findings: [
    'Reduced motor nerve conduction velocities in ulnar and peroneal nerves',
    'Decreased compound muscle action potential amplitudes',
    'Evidence of chronic denervation in APB muscle',
    'Normal median nerve conduction studies'
  ],
  impression: 'Findings consistent with sensorimotor peripheral neuropathy, predominantly affecting ulnar and peroneal nerves',
  recommendations: [
    'Blood glucose and HbA1c testing',
    'Vitamin B12 and folate levels',
    'Consider further metabolic workup',
    'Follow-up in 6 months'
  ]
};

export function EmgNcs() {
  const [selectedTab, setSelectedTab] = useState('ncs');
  const [selectedNerve, setSelectedNerve] = useState('');

  const handleGenerateReport = () => {
    toast("EMG/NCS report generated successfully");
  };

  const getInterpretationColor = (interpretation: string) => {
    return interpretation === 'Normal' 
      ? 'text-green-600 bg-green-50 border-green-200'
      : 'text-red-600 bg-red-50 border-red-200';
  };

  const isValueAbnormal = (value: number, range: string) => {
    // Simple check for demonstration - would need proper parsing in production
    if (range.includes('<')) {
      const limit = parseFloat(range.replace('<', '').replace('ms', '').replace('μV', '').replace('mV', ''));
      return value > limit;
    } else if (range.includes('>')) {
      const limit = parseFloat(range.replace('>', '').replace('ms', '').replace('μV', '').replace('mV', '').replace('m/s', ''));
      return value < limit;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Study Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                EMG/NCS Study - {studyInfo.patientName}
              </CardTitle>
              <CardDescription>
                {studyInfo.patientAge} years old • {studyInfo.studyDate} • {studyInfo.indication}
              </CardDescription>
            </div>
            <Badge variant="outline">
              Clinician: {studyInfo.clinician}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Study Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Study Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ncs">Nerve Conduction Studies</TabsTrigger>
              <TabsTrigger value="emg">EMG Findings</TabsTrigger>
              <TabsTrigger value="summary">Clinical Summary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ncs" className="space-y-4 mt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Nerve</th>
                      <th className="text-left p-3">Side</th>
                      <th className="text-left p-3">Distal Latency</th>
                      <th className="text-left p-3">Amplitude</th>
                      <th className="text-left p-3">Conduction Velocity</th>
                      <th className="text-left p-3">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nerveStudies.map((study, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{study.nerve}</td>
                        <td className="p-3">{study.side}</td>
                        <td className="p-3">
                          <div className={`inline-flex items-center gap-1 ${
                            isValueAbnormal(study.distalLatency, study.normalRanges.latency) 
                              ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {study.distalLatency}ms
                            <small className="text-muted-foreground">({study.normalRanges.latency})</small>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className={`inline-flex items-center gap-1 ${
                            isValueAbnormal(study.amplitude, study.normalRanges.amplitude) 
                              ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {study.amplitude}{study.nerve.includes('Sensory') ? 'μV' : 'mV'}
                            <small className="text-muted-foreground">({study.normalRanges.amplitude})</small>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className={`inline-flex items-center gap-1 ${
                            isValueAbnormal(study.conductionVelocity, study.normalRanges.velocity) 
                              ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {study.conductionVelocity}m/s
                            <small className="text-muted-foreground">({study.normalRanges.velocity})</small>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={getInterpretationColor(study.interpretation)}>
                            {study.interpretation}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="emg" className="space-y-4 mt-6">
              <div className="grid gap-4">
                {emgFindings.map((finding, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{finding.muscle} - {finding.side}</CardTitle>
                        <Badge variant="outline" className={getInterpretationColor(finding.interpretation)}>
                          {finding.interpretation}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Insertional Activity:</span>
                        <p className="text-muted-foreground">{finding.insertionalActivity}</p>
                      </div>
                      <div>
                        <span className="font-medium">Spontaneous Activity:</span>
                        <p className="text-muted-foreground">{finding.spontaneousActivity}</p>
                      </div>
                      <div>
                        <span className="font-medium">MUAPs:</span>
                        <p className="text-muted-foreground">{finding.muaps}</p>
                      </div>
                      <div>
                        <span className="font-medium">Recruitment:</span>
                        <p className="text-muted-foreground">{finding.recruitment}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="summary" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Clinical Findings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {clinicalSummary.findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Clinical Impression
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm bg-blue-50 p-4 rounded-lg border border-blue-200">
                    {clinicalSummary.impression}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {clinicalSummary.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center gap-4">
            <Button onClick={handleGenerateReport}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Full Report
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              View Waveforms
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}