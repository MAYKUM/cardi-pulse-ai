import React, { memo, useMemo } from 'react';
import { BaseDashboard, DashboardCard, QuickAction, Patient, Appointment } from '@/components/base/BaseDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bone, Target, Activity, Calendar, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StandardizedOrthopedicsDashboard = memo(function StandardizedOrthopedicsDashboard() {
  const navigate = useNavigate();

  // Orthopedics-specific dashboard data
  const orthopedicsCards: DashboardCard[] = useMemo(() => [
    {
      id: 'patients',
      title: 'Orthopedic Patients',
      value: 312,
      delta: '+15 this week',
      icon: Users,
      color: 'text-primary',
      trend: 'up'
    },
    {
      id: 'surgeries',
      title: 'Surgeries This Month',
      value: 28,
      delta: '8 scheduled',
      icon: Target,
      color: 'text-accent',
      trend: 'up'
    },
    {
      id: 'critical-cases',
      title: 'Critical Cases',
      value: 5,
      delta: '2 post-op complications',
      icon: AlertTriangle,
      color: 'text-destructive',
      trend: 'down'
    },
    {
      id: 'success-rate',
      title: 'Surgery Success Rate',
      value: '96.8%',
      delta: 'Last 3 months',
      icon: TrendingUp,
      color: 'text-success',
      trend: 'up'
    }
  ], []);

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'xray-analysis',
      title: 'X-ray Analysis',
      description: 'AI-powered bone imaging',
      icon: Bone,
      href: '/xray-analysis',
      color: 'hover:bg-primary/10',
      featured: true
    },
    {
      id: 'surgical-planning',
      title: 'Surgical Planning',
      description: '3D planning tools',
      icon: Target,
      href: '/surgical-planning',
      color: 'hover:bg-accent/10'
    },
    {
      id: 'rehab-tracker',
      title: 'Rehab Tracker',
      description: 'Recovery monitoring',
      icon: Activity,
      href: '/rehab-tracker',
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
      name: 'Rajesh Kumar',
      initials: 'RK',
      age: 45,
      condition: 'Femur Fracture (AO 32-A3)',
      lastVisit: 'Today',
      status: 'active'
    },
    {
      id: 'p2',
      name: 'Meera Patel',
      initials: 'MP',
      age: 62,
      condition: 'Total Hip Replacement',
      lastVisit: 'Yesterday',
      status: 'follow-up'
    },
    {
      id: 'p3',
      name: 'Arjun Singh',
      initials: 'AS',
      age: 28,
      condition: 'ACL Reconstruction',
      lastVisit: '3 days ago',
      status: 'active'
    },
    {
      id: 'p4',
      name: 'Sunita Gupta',
      initials: 'SG',
      age: 58,
      condition: 'Spinal Fusion L4-L5',
      lastVisit: '1 week ago',
      status: 'stable'
    }
  ], []);

  const appointments: Appointment[] = useMemo(() => [
    {
      id: 'a1',
      time: '09:00',
      patientName: 'Vikram Sharma',
      patientInitials: 'VS',
      type: 'Pre-op - Knee Replacement',
      status: 'confirmed',
      location: 'clinic'
    },
    {
      id: 'a2',
      time: '10:30',
      patientName: 'Anjali Reddy',
      patientInitials: 'AR',
      type: 'Post-op Follow-up',
      status: 'confirmed',
      location: 'clinic'
    },
    {
      id: 'a3',
      time: '14:00',
      patientName: 'Rohit Jain',
      patientInitials: 'RJ',
      type: 'Fracture Assessment',
      status: 'pending',
      location: 'clinic'
    },
    {
      id: 'a4',
      time: '15:30',
      patientName: 'Priya Nair',
      patientInitials: 'PN',
      type: 'Emergency - Compound fracture',
      status: 'urgent',
      location: 'clinic'
    }
  ], []);

  const headerActions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => navigate('/surgical-planning')}>
        <Target className="w-4 h-4 mr-2" />
        Surgical Planning
      </Button>
      <Button size="sm" onClick={() => navigate('/xray-analysis')}>
        <Bone className="w-4 h-4 mr-2" />
        X-ray Analysis
      </Button>
    </div>
  );

  const customSections = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Surgery Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Today's Surgery Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">09:00 - Total Knee Replacement</p>
                <p className="text-sm text-muted-foreground">Patient: Vikram Sharma (Right knee)</p>
              </div>
              <Badge className="bg-success text-success-foreground">SCHEDULED</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">14:00 - ORIF Ankle Fracture</p>
                <p className="text-sm text-muted-foreground">Patient: Anjali Reddy (Left ankle)</p>
              </div>
              <Badge className="bg-warning text-warning-foreground">PREP</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recovery Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Excellent Recovery</span>
              <Badge className="bg-success text-success-foreground">78%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">On Track</span>
              <Badge variant="outline">18%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Complications</span>
              <Badge variant="destructive">4%</Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Average Recovery Time</span>
                <span className="text-sm">8.2 weeks</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <BaseDashboard
      specialty="orthopedics"
      cards={orthopedicsCards}
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
          case 'surgeries':
            navigate('/surgical-planning');
            break;
          case 'critical-cases':
            navigate('/emergency-procedures');
            break;
          default:
            break;
        }
      }}
    />
  );
});

export { StandardizedOrthopedicsDashboard };