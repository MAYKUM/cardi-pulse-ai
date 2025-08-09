import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, TrendingUp, Clock, Award, Calendar } from 'lucide-react';
import { SessionList } from '@/components/rehab/SessionList';
import { MilestoneList } from '@/components/rehab/MilestoneList';
import { PainTimeline } from '@/components/rehab/PainTimeline';
import { RehabSidebar } from '@/components/rehab/Sidebar';
import type { RehabSession, Milestone, PainScore } from '@/types/rehab';

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
              <SessionList sessions={rehabSessions} />
            </TabsContent>
            
            <TabsContent value="milestones">
              <MilestoneList milestones={milestones} currentWeek={currentWeek} />
            </TabsContent>
            
            <TabsContent value="pain">
              <PainTimeline scores={painScores} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RehabSidebar selectedDate={selectedDate} onSelect={setSelectedDate} />
        </div>
      </div>
    </div>
  );
};