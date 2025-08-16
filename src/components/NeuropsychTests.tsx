import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Clock, Target, TrendingUp, FileText, Play, Pause, RotateCcw } from 'lucide-react';

interface TestResult {
  id: string;
  testName: string;
  score: number;
  percentile: number;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  date: string;
}

export const NeuropsychTests: React.FC = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testProgress, setTestProgress] = useState(0);

  const mockResults: TestResult[] = [
    {
      id: '1',
      testName: 'MMSE (Mini-Mental State Exam)',
      score: 24,
      percentile: 75,
      severity: 'mild',
      date: '2024-01-15'
    },
    {
      id: '2',
      testName: 'MoCA (Montreal Cognitive Assessment)',
      score: 22,
      percentile: 68,
      severity: 'mild',
      date: '2024-01-10'
    },
    {
      id: '3',
      testName: 'Trail Making Test A',
      score: 45,
      percentile: 85,
      severity: 'normal',
      date: '2024-01-08'
    }
  ];

  const availableTests = [
    {
      id: 'mmse',
      name: 'MMSE',
      description: 'Mini-Mental State Examination',
      duration: '10-15 min',
      icon: Brain
    },
    {
      id: 'moca',
      name: 'MoCA',
      description: 'Montreal Cognitive Assessment',
      duration: '10-15 min',
      icon: Target
    },
    {
      id: 'trail-a',
      name: 'Trail Making A',
      description: 'Attention and Processing Speed',
      duration: '5-10 min',
      icon: Clock
    },
    {
      id: 'trail-b',
      name: 'Trail Making B',
      description: 'Executive Function',
      duration: '5-10 min',
      icon: TrendingUp
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startTest = (testId: string) => {
    setActiveTest(testId);
    setTestProgress(0);
    // Simulate test progress
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveTest(null);
          return 0;
        }
        return prev + 10;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Neuropsychological Tests</h1>
          <p className="text-muted-foreground">Comprehensive cognitive assessment tools</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Available Tests</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {availableTests.map((test) => {
              const Icon = test.icon;
              const isActive = activeTest === test.id;
              
              return (
                <Card key={test.id} className={isActive ? 'ring-2 ring-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{test.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isActive ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Play className="h-4 w-4" />
                          Test in progress...
                        </div>
                        <Progress value={testProgress} className="h-2" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setActiveTest(null)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => startTest(test.id)} className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Start Test
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="space-y-4">
            {mockResults.map((result) => (
              <Card key={result.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{result.testName}</CardTitle>
                      <CardDescription>Completed on {new Date(result.date).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge className={getSeverityColor(result.severity)}>
                      {result.severity.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{result.score}</div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{result.percentile}%</div>
                      <div className="text-sm text-muted-foreground">Percentile</div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cognitive Performance Trends</CardTitle>
              <CardDescription>Track cognitive function over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chart visualization would be implemented here</p>
                  <p className="text-sm">showing cognitive trends over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};