import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Activity, Target, TrendingUp, Clock, Award, AlertCircle } from 'lucide-react';

interface RehabSession {
  id: string;
  date: string;
  therapist: string;
  duration: number;
  exercises: number;
  completion: number;
  notes: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetWeek: number;
  completed: boolean;
  completedDate?: string;
}

interface PainScore {
  date: string;
  score: number; // 0-10 scale
  activity: string;
}

export const RehabTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const rehabSessions: RehabSession[] = [
    {
      id: 'session-001',
      date: '2024-01-15',
      therapist: 'Sarah Johnson, PT',
      duration: 45,
      exercises: 8,
      completion: 95,
      notes: 'Great progress on range of motion. Patient showing improved strength.'
    },
    {
      id: 'session-002',
      date: '2024-01-12',
      therapist: 'Mike Chen, PT',
      duration: 40,
      exercises: 6,
      completion: 88,
      notes: 'Some difficulty with balance exercises. Need to focus on proprioception.'
    },
    {
      id: 'session-003',
      date: '2024-01-10',
      therapist: 'Sarah Johnson, PT',
      duration: 50,
      exercises: 9,
      completion: 92,
      notes: 'Excellent compliance. Patient motivated and following home exercise program.'
    }
  ];

  const milestones: Milestone[] = [
    {
      id: 'mile-001',
      title: 'Full Weight Bearing',
      description: 'Patient can bear full weight on affected limb',
      targetWeek: 6,
      completed: true,
      completedDate: '2024-01-10'
    },
    {
      id: 'mile-002',
      title: 'Return to Walking',
      description: 'Independent walking without assistive devices',
      targetWeek: 8,
      completed: true,
      completedDate: '2024-01-14'
    },
    {
      id: 'mile-003',
      title: 'Stair Climbing',
      description: 'Ability to climb stairs with minimal assistance',
      targetWeek: 10,
      completed: false
    },
    {
      id: 'mile-004',
      title: 'Return to Sports',
      description: 'Cleared for sports-specific activities',
      targetWeek: 16,
      completed: false
    }
  ];

  const painScores: PainScore[] = [
    { date: '2024-01-15', score: 3, activity: 'Walking' },
    { date: '2024-01-14', score: 4, activity: 'PT Session' },
    { date: '2024-01-13', score: 2, activity: 'Rest' },
    { date: '2024-01-12', score: 5, activity: 'PT Session' },
    { date: '2024-01-11', score: 3, activity: 'Walking' },
    { date: '2024-01-10', score: 4, activity: 'PT Session' },
    { date: '2024-01-09', score: 2, activity: 'Rest' }
  ];

  const currentWeek = 9; // Example current week post-surgery
  const overallProgress = 75; // Example overall progress percentage

  const getPainColor = (score: number) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rehabilitation Tracker</h1>
          <p className="text-muted-foreground">Monitor recovery progress and outcomes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </Button>
          <Button size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Log Exercise
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{overallProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weeks Post-Op</p>
                <p className="text-2xl font-bold">{currentWeek}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
                <p className="text-2xl font-bold">{rehabSessions.length}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Milestones Achieved</p>
                <p className="text-2xl font-bold">{milestones.filter(m => m.completed).length}/{milestones.length}</p>
              </div>
              <Award className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="sessions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="sessions">PT Sessions</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="pain">Pain Tracking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Recent PT Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rehabSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{session.date}</h4>
                            <p className="text-sm text-muted-foreground">{session.therapist}</p>
                          </div>
                          <Badge variant="outline">
                            {session.completion}% Complete
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Duration:</span>
                            <p className="font-medium">{session.duration} minutes</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Exercises:</span>
                            <p className="font-medium">{session.exercises} completed</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Progress:</span>
                            <Progress value={session.completion} className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Notes:</p>
                          <p className="text-sm">{session.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="milestones">
              <Card>
                <CardHeader>
                  <CardTitle>Recovery Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                          milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {milestone.completed ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <Target className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{milestone.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Week {milestone.targetWeek}
                              </Badge>
                              {milestone.completed && milestone.completedDate && (
                                <Badge variant="default" className="text-xs">
                                  Completed {milestone.completedDate}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                          {!milestone.completed && currentWeek > milestone.targetWeek && (
                            <div className="flex items-center gap-1 mt-2 text-amber-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm">Behind schedule</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pain">
              <Card>
                <CardHeader>
                  <CardTitle>Pain Level Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Pain Level Chart (0-10 scale)</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Recent Pain Scores</h4>
                      {painScores.slice(0, 5).map((score, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <span className="text-sm">{score.date}</span>
                            <span className="text-xs text-muted-foreground ml-2">({score.activity})</span>
                          </div>
                          <div className={`font-bold ${getPainColor(score.score)}`}>
                            {score.score}/10
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Session Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                Log Pain Score
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Update Milestone
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Schedule PT
              </Button>
            </CardContent>
          </Card>

          {/* Home Exercise Program */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quad Strengthening</span>
                  <Badge variant="outline">3x15</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Range of Motion</span>
                  <Badge variant="outline">2x10</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Balance Training</span>
                  <Badge variant="outline">5 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gait Training</span>
                  <Badge variant="outline">10 min</Badge>
                </div>
              </div>
              <Button className="w-full mt-4" size="sm">
                Mark as Complete
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};