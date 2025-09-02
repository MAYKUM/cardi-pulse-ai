import React, { memo, useMemo } from 'react';
import { BaseDashboard, DashboardCard, QuickAction, Patient, Appointment } from '@/components/base/BaseDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Activity, Stethoscope, Calendar, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StandardizedCardiologyDashboard = memo(function StandardizedCardiologyDashboard() {
  const navigate = useNavigate();

  // Cardiology-specific dashboard data
  const cardiologyCards: DashboardCard[] = useMemo(() => [
    {
      id: 'patients',
      title: 'Cardiac Patients',
      value: 247,
      delta: '+12 this week',
      icon: Users,
      color: 'text-primary',
      trend: 'up'
    },
    {
      id: 'ecg-analyses',
      title: 'ECG Analyses',
      value: 89,
      delta: '23 pending review',
      icon: Activity,
      color: 'text-accent',
      trend: 'up'
    },
    {
      id: 'critical-alerts',
      title: 'Critical Alerts',
      value: 3,
      delta: '2 new today',
      icon: AlertTriangle,
      color: 'text-destructive',
      trend: 'down'
    },
    {
      id: 'success-rate',
      title: 'Treatment Success',
      value: '94.2%',
      delta: 'Last 30 days',
      icon: TrendingUp,
      color: 'text-success',
      trend: 'up'
    }
  ], []);

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'new-ecg',
      title: 'New ECG Analysis',
      description: 'Upload and analyze ECG',
      icon: Activity,
      href: '/ecg-analysis',
      color: 'hover:bg-primary/10',
      featured: true
    },
    {
      id: 'echo-report',
      title: 'Echo Report',
      description: 'Create echo report',
      icon: Heart,
      href: '/echo-reports',
      color: 'hover:bg-accent/10'
    },
    {
      id: 'telehealth',
      title: 'Telecardiology',
      description: 'Remote consultation',
      icon: Stethoscope,
      href: '/telecardiology',
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
      age: 58,
      condition: 'Acute MI - STEMI',
      lastVisit: 'Today',
      status: 'critical'
    },
    {
      id: 'p2',
      name: 'Priya Sharma',
      initials: 'PS',
      age: 45,
      condition: 'Atrial Fibrillation',
      lastVisit: 'Yesterday',
      status: 'active'
    },
    {
      id: 'p3',
      name: 'Ahmed Khan',
      initials: 'AK',
      age: 62,
      condition: 'Heart Failure',
      lastVisit: '2 days ago',
      status: 'follow-up'
    },
    {
      id: 'p4',
      name: 'Sunita Patel',
      initials: 'SP',
      age: 52,
      condition: 'Hypertension',
      lastVisit: '1 week ago',
      status: 'stable'
    }
  ], []);

  const appointments: Appointment[] = useMemo(() => [
    {
      id: 'a1',
      time: '09:00',
      patientName: 'Ravi Gupta',
      patientInitials: 'RG',
      type: 'Follow-up - Post-angioplasty',
      status: 'confirmed',
      location: 'clinic'
    },
    {
      id: 'a2',
      time: '10:30',
      patientName: 'Meera Singh',
      patientInitials: 'MS',
      type: 'Echo - Valve assessment',
      status: 'confirmed',
      location: 'clinic'
    },
    {
      id: 'a3',
      time: '14:00',
      patientName: 'Arjun Reddy',
      patientInitials: 'AR',
      type: 'Telecardiology consult',
      status: 'pending',
      location: 'telehealth'
    },
    {
      id: 'a4',
      time: '15:30',
      patientName: 'Kavya Jain',
      patientInitials: 'KJ',
      type: 'Emergency - Chest pain',
      status: 'urgent',
      location: 'clinic'
    }
  ], []);

  const headerActions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => navigate('/emergency-procedures')}>
        <AlertTriangle className="w-4 h-4 mr-2" />
        Emergency Protocols
      </Button>
      <Button size="sm" onClick={() => navigate('/telecardiology')}>
        <Stethoscope className="w-4 h-4 mr-2" />
        Start Telehealth
      </Button>
    </div>
  );

  const customSections = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Critical Alerts */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Critical Cardiac Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">Patient: Rajesh Kumar</p>
                <p className="text-sm text-muted-foreground">ST-elevation detected - STEMI protocol activated</p>
              </div>
              <Badge variant="destructive">URGENT</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">Patient: Deepak Shah</p>
                <p className="text-sm text-muted-foreground">VT detected - Immediate intervention required</p>
              </div>
              <Badge variant="destructive">CRITICAL</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Procedure Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Today's Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Scheduled Angioplasties</span>
              <Badge variant="outline">4</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Echo Studies</span>
              <Badge variant="outline">8</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Holter Monitoring</span>
              <Badge variant="outline">12</Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Daily Progress</span>
                <span className="text-sm">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <BaseDashboard
      specialty="cardiology"
      cards={cardiologyCards}
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
          case 'ecg-analyses':
            navigate('/ecg-analysis');
            break;
          case 'critical-alerts':
            navigate('/emergency-procedures');
            break;
          default:
            break;
        }
      }}
    />
  );
});

export { StandardizedCardiologyDashboard };