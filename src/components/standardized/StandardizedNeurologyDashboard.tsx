import React, { memo, useMemo } from 'react';
import { BaseDashboard, DashboardCard, QuickAction, Patient, Appointment } from '@/components/base/BaseDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Activity, Zap, Calendar, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StandardizedNeurologyDashboard = memo(function StandardizedNeurologyDashboard() {
  const navigate = useNavigate();

  // Neurology-specific dashboard data
  const neurologyCards: DashboardCard[] = useMemo(() => [
    {
      id: 'patients',
      title: 'Neurological Patients',
      value: 156,
      delta: '+8 this week',
      icon: Users,
      color: 'text-primary',
      trend: 'up'
    },
    {
      id: 'eeg-studies',
      title: 'EEG Studies',
      value: 42,
      delta: '12 pending analysis',
      icon: Activity,
      color: 'text-accent',
      trend: 'up'
    },
    {
      id: 'seizure-alerts',
      title: 'Seizure Alerts',
      value: 7,
      delta: '3 new episodes',
      icon: Zap,
      color: 'text-warning',
      trend: 'up'
    },
    {
      id: 'recovery-rate',
      title: 'Recovery Rate',
      value: '89.3%',
      delta: 'Last 30 days',
      icon: TrendingUp,
      color: 'text-success',
      trend: 'up'
    }
  ], []);

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'new-eeg',
      title: 'EEG Analysis',
      description: 'Record and analyze EEG',
      icon: Activity,
      href: '/eeg-analysis',
      color: 'hover:bg-primary/10',
      featured: true
    },
    {
      id: 'seizure-log',
      title: 'Seizure Log',
      description: 'Track seizure events',
      icon: Zap,
      href: '/seizure-logs',
      color: 'hover:bg-accent/10'
    },
    {
      id: 'neuropsych',
      title: 'Neuropsych Tests',
      description: 'Cognitive assessment',
      icon: Brain,
      href: '/neuropsych-tests',
      color: 'hover:bg-secondary/10'
    },
    {
      id: 'appointment',
      title: 'Schedule',
      description: 'Book appointment',
      icon: Calendar,
      href: '/appointments/new',
      color: 'hover:bg-muted/10'
    }
  ], []);

  const patients: Patient[] = useMemo(() => [
    {
      id: 'p1',
      name: 'Anjali Reddy',
      initials: 'AR',
      age: 28,
      condition: 'Temporal Lobe Epilepsy',
      lastVisit: 'Today',
      status: 'active'
    },
    {
      id: 'p2',
      name: 'Vikram Singh',
      initials: 'VS',
      age: 45,
      condition: 'Multiple Sclerosis',
      lastVisit: 'Yesterday',
      status: 'follow-up'
    },
    {
      id: 'p3',
      name: 'Priya Gupta',
      initials: 'PG',
      age: 34,
      condition: 'Migraine with Aura',
      lastVisit: '3 days ago',
      status: 'stable'
    },
    {
      id: 'p4',
      name: 'Rohit Sharma',
      initials: 'RS',
      age: 52,
      condition: 'Parkinson\'s Disease',
      lastVisit: '1 week ago',
      status: 'follow-up'
    }
  ], []);

  const appointments: Appointment[] = useMemo(() => [
    {
      id: 'a1',
      time: '09:00',
      patientName: 'Kavita Jain',
      patientInitials: 'KJ',
      type: 'EEG Follow-up',
      status: 'confirmed',
      location: 'clinic'
    },
    {
      id: 'a2',
      time: '10:30',
      patientName: 'Arjun Patel',
      patientInitials: 'AP',
      type: 'Seizure Evaluation',
      status: 'confirmed',
      location: 'clinic'
    },
    {
      id: 'a3',
      time: '14:00',
      patientName: 'Neha Singh',
      patientInitials: 'NS',
      type: 'Neuropsych Assessment',
      status: 'pending',
      location: 'clinic'
    },
    {
      id: 'a4',
      time: '15:30',
      patientName: 'Raj Kumar',
      patientInitials: 'RK',
      type: 'Emergency - Status epilepticus',
      status: 'urgent',
      location: 'clinic'
    }
  ], []);

  const headerActions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => navigate('/emergency-procedures')}>
        <AlertTriangle className="w-4 h-4 mr-2" />
        Seizure Protocols
      </Button>
      <Button size="sm" onClick={() => navigate('/video-eeg')}>
        <Activity className="w-4 h-4 mr-2" />
        Video EEG
      </Button>
    </div>
  );

  const customSections = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Active Seizure Monitoring */}
      <Card className="border-warning/50 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <Zap className="h-5 w-5" />
            Active Seizure Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">Patient: Anjali Reddy</p>
                <p className="text-sm text-muted-foreground">24-hour video EEG monitoring - Day 2</p>
              </div>
              <Badge className="bg-warning text-warning-foreground">MONITORING</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">Patient: Rohit Sharma</p>
                <p className="text-sm text-muted-foreground">Seizure detected at 14:23 - Response initiated</p>
              </div>
              <Badge variant="destructive">ALERT</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EEG Study Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            EEG Study Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Scheduled EEGs</span>
              <Badge variant="outline">6</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Video EEG Sessions</span>
              <Badge variant="outline">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sleep Studies</span>
              <Badge variant="outline">2</Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Daily Progress</span>
                <span className="text-sm">73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <BaseDashboard
      specialty="neurology"
      cards={neurologyCards}
      quickActions={quickActions}
      patients={patients}
      appointments={appointments}
      headerActions={headerActions}
      customSections={customSections}
      onCardClick={(cardId) => {
        switch (cardId) {
          case 'patients':
            navigate('/patients');
            break;
          case 'eeg-studies':
            navigate('/eeg-analysis');
            break;
          case 'seizure-alerts':
            navigate('/seizure-logs');
            break;
          default:
            break;
        }
      }}
    />
  );
});

export { StandardizedNeurologyDashboard };