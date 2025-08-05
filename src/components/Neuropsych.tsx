import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from 'sonner';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Download,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target
} from 'lucide-react';

// Mock neuropsych data
const patientInfo = {
  name: 'David Chen',
  age: 51,
  condition: "Parkinson's Disease",
  assessmentDate: '2024-01-05',
  clinician: 'Dr. Neuropsychologist'
};

const cognitiveTests = [
  {
    test: 'MoCA (Montreal Cognitive Assessment)',
    score: 24,
    maxScore: 30,
    percentile: 45,
    interpretation: 'Mild Cognitive Impairment',
    domains: {
      'Visuospatial/Executive': 4,
      'Naming': 3,
      'Memory': 3,
      'Attention': 5,
      'Language': 2,
      'Abstraction': 2,
      'Delayed Recall': 3,
      'Orientation': 5
    }
  },
  {
    test: 'MMSE (Mini-Mental State Exam)',
    score: 26,
    maxScore: 30,
    percentile: 62,
    interpretation: 'Normal',
    domains: {
      'Orientation': 9,
      'Registration': 3,
      'Attention/Calculation': 4,
      'Recall': 2,
      'Language': 8
    }
  }
];

const executiveFunctionTests = [
  {
    test: 'Trail Making Test A',
    score: 45,
    unit: 'seconds',
    percentile: 25,
    interpretation: 'Below Average'
  },
  {
    test: 'Trail Making Test B',
    score: 125,
    unit: 'seconds',
    percentile: 15,
    interpretation: 'Impaired'
  },
  {
    test: 'Stroop Color-Word Test',
    score: 35,
    unit: 'correct responses',
    percentile: 30,
    interpretation: 'Below Average'
  }
];

const memoryTests = [
  {
    test: 'Rey Auditory Verbal Learning Test',
    immediateRecall: 42,
    delayedRecall: 8,
    recognition: 12,
    percentile: 35,
    interpretation: 'Mild Impairment'
  },
  {
    test: 'Logical Memory (WMS-IV)',
    immediateRecall: 28,
    delayedRecall: 20,
    percentile: 40,
    interpretation: 'Low Average'
  }
];

const longitudinalData = [
  { date: '2023-01', moca: 28, mmse: 29, tmtA: 35, tmtB: 85 },
  { date: '2023-07', moca: 26, mmse: 28, tmtA: 40, tmtB: 105 },
  { date: '2024-01', moca: 24, mmse: 26, tmtA: 45, tmtB: 125 }
];

const recommendations = [
  'Cognitive rehabilitation therapy focusing on executive function',
  'Memory compensation strategies training',
  'Regular follow-up assessments every 6 months',
  'Consider cholinesterase inhibitor evaluation',
  'Occupational therapy for daily living skills',
  'Family education about cognitive changes'
];

export function Neuropsych() {
  const [selectedTest, setSelectedTest] = useState('overview');

  const handleGenerateReport = () => {
    toast("Neuropsychological assessment report generated");
  };

  const getInterpretationColor = (interpretation: string) => {
    if (interpretation.includes('Normal') || interpretation.includes('Average')) {
      return 'text-green-600 bg-green-50 border-green-200';
    } else if (interpretation.includes('Mild') || interpretation.includes('Below')) {
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    } else {
      return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 50) return 'text-green-600';
    if (percentile >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const chartConfig = {
    moca: { label: "MoCA", color: "hsl(var(--primary))" },
    mmse: { label: "MMSE", color: "hsl(var(--secondary))" },
    tmtA: { label: "TMT-A", color: "hsl(var(--accent))" },
    tmtB: { label: "TMT-B", color: "hsl(var(--muted))" }
  };

  return (
    <div className="space-y-6">
      {/* Patient Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Neuropsychological Assessment - {patientInfo.name}
              </CardTitle>
              <CardDescription>
                {patientInfo.age} years old • {patientInfo.condition} • {patientInfo.assessmentDate}
              </CardDescription>
            </div>
            <Badge variant="outline">
              Clinician: {patientInfo.clinician}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Assessment Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTest} onValueChange={setSelectedTest}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cognitive">Cognitive Tests</TabsTrigger>
              <TabsTrigger value="executive">Executive Function</TabsTrigger>
              <TabsTrigger value="memory">Memory Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Global Cognition</p>
                        <p className="text-2xl font-bold">24/30</p>
                        <p className="text-xs text-muted-foreground">MoCA Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-accent" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Executive Function</p>
                        <p className="text-2xl font-bold text-yellow-600">Below Avg</p>
                        <p className="text-xs text-muted-foreground">TMT-B: 125s</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-secondary" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Memory</p>
                        <p className="text-2xl font-bold text-yellow-600">Mild Imp</p>
                        <p className="text-xs text-muted-foreground">RAVLT</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-destructive" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Progression</p>
                        <p className="text-2xl font-bold text-red-600">Declining</p>
                        <p className="text-xs text-muted-foreground">Over 12 months</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Longitudinal Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Cognitive Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={longitudinalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="moca" stroke="var(--color-moca)" strokeWidth={2} />
                        <Line type="monotone" dataKey="mmse" stroke="var(--color-mmse)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cognitive" className="space-y-4 mt-6">
              {cognitiveTests.map((test, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{test.test}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{test.score}/{test.maxScore}</span>
                        <Badge variant="outline" className={getInterpretationColor(test.interpretation)}>
                          {test.interpretation}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Percentile Rank</span>
                        <span className={getPercentileColor(test.percentile)}>{test.percentile}th percentile</span>
                      </div>
                      <Progress value={(test.score / test.maxScore) * 100} className="h-2" />
                      
                      {/* Domain Breakdown */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {Object.entries(test.domains).map(([domain, score]) => (
                          <div key={domain} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{domain}</span>
                            <span className="font-medium">{score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="executive" className="space-y-4 mt-6">
              {executiveFunctionTests.map((test, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">{test.test}</h4>
                      <Badge variant="outline" className={getInterpretationColor(test.interpretation)}>
                        {test.interpretation}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Score</span>
                        <p className="text-lg font-bold">{test.score} {test.unit}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Percentile</span>
                        <p className={`text-lg font-bold ${getPercentileColor(test.percentile)}`}>
                          {test.percentile}th
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Performance</span>
                        <Progress value={test.percentile} className="mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="memory" className="space-y-4 mt-6">
              {memoryTests.map((test, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">{test.test}</h4>
                      <Badge variant="outline" className={getInterpretationColor(test.interpretation)}>
                        {test.interpretation}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Immediate Recall</span>
                        <p className="text-lg font-bold">{test.immediateRecall}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Delayed Recall</span>
                        <p className="text-lg font-bold">{test.delayedRecall}</p>
                      </div>
                      {test.recognition && (
                        <div>
                          <span className="text-muted-foreground">Recognition</span>
                          <p className="text-lg font-bold">{test.recognition}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Percentile</span>
                        <p className={`text-lg font-bold ${getPercentileColor(test.percentile)}`}>
                          {test.percentile}th
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Clinical Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
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
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}