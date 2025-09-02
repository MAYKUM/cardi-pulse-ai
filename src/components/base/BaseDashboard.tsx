import React, { memo, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Users, Calendar, Activity, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSpecialtyConfig, SpecialtyType, applySpecialtyTheme } from '@/config/specialty-config';

export interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  delta: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  color: string;
  featured?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: 'active' | 'follow-up' | 'stable' | 'critical';
}

export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  patientInitials: string;
  type: string;
  status: 'confirmed' | 'pending' | 'urgent';
  location: 'clinic' | 'telehealth';
}

interface BaseDashboardProps {
  specialty: SpecialtyType;
  cards: DashboardCard[];
  quickActions: QuickAction[];
  patients: Patient[];
  appointments: Appointment[];
  loading?: boolean;
  onCardClick?: (cardId: string) => void;
  onPatientClick?: (patientId: string) => void;
  onAppointmentClick?: (appointmentId: string) => void;
  headerActions?: React.ReactNode;
  customSections?: React.ReactNode;
}

const BaseDashboard = memo<BaseDashboardProps>(function BaseDashboard({
  specialty,
  cards,
  quickActions,
  patients,
  appointments,
  loading = false,
  onCardClick,
  onPatientClick,
  onAppointmentClick,
  headerActions,
  customSections
}) {
  const navigate = useNavigate();
  const specialtyConfig = useMemo(() => getSpecialtyConfig(specialty), [specialty]);

  // Apply specialty theme on mount
  React.useEffect(() => {
    applySpecialtyTheme(specialty);
  }, [specialty]);

  const getStatusBadgeVariant = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'follow-up': return 'secondary';
      case 'stable': return 'outline';
      case 'critical': return 'destructive';
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'urgent': return 'destructive';
      default: return 'secondary';
    }
  }, []);

  const getTrendIcon = useCallback((trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-success" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-destructive" />;
      default: return <TrendingUp className="h-3 w-3 text-muted-foreground" />;
    }
  }, []);

  const handleCardClick = useCallback((cardId: string) => {
    onCardClick?.(cardId);
  }, [onCardClick]);

  const handlePatientClick = useCallback((patientId: string) => {
    onPatientClick?.(patientId);
    navigate(`/patients/${patientId}`);
  }, [onPatientClick, navigate]);

  const handleAppointmentClick = useCallback((appointmentId: string) => {
    onAppointmentClick?.(appointmentId);
    navigate(`/appointments/${appointmentId}`);
  }, [onAppointmentClick, navigate]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <specialtyConfig.theme.icon className="w-8 h-8" style={{ color: specialtyConfig.theme.primary }} />
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {specialtyConfig.theme.displayName} Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive {specialtyConfig.theme.displayName.toLowerCase()} practice management
          </p>
        </div>
        {headerActions}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
              card.color === 'primary' ? 'bg-gradient-to-br from-primary/10 to-primary/5' :
              card.color === 'secondary' ? 'bg-gradient-to-br from-secondary/10 to-secondary/5' :
              card.color === 'accent' ? 'bg-gradient-to-br from-accent/10 to-accent/5' :
              ''
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(card.trend)}
                    <p className="text-xs text-muted-foreground">{card.delta}</p>
                  </div>
                </div>
                <card.icon className={`h-8 w-8 ${card.color.startsWith('text-') ? card.color : 'text-primary'}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients Section - spans 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent {specialtyConfig.customTerminology.patient || 'Patients'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patients.map((patient) => (
                  <div 
                    key={patient.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handlePatientClick(patient.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ 
                          background: `linear-gradient(135deg, ${specialtyConfig.theme.primary}, ${specialtyConfig.theme.accent})` 
                        }}
                      >
                        {patient.initials}
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Age {patient.age} • {patient.condition}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(patient.status)}>
                        {patient.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.featured ? "default" : "outline"}
                    className="h-auto p-4 flex items-start gap-3 justify-start"
                    onClick={() => navigate(action.href)}
                  >
                    <action.icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-xs opacity-75">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleAppointmentClick(appointment.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-mono font-medium text-muted-foreground">
                        {appointment.time}
                      </div>
                      <div 
                        className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
                        style={{ 
                          background: `linear-gradient(135deg, ${specialtyConfig.theme.primary}, ${specialtyConfig.theme.accent})` 
                        }}
                      >
                        {appointment.patientInitials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{appointment.patientName}</p>
                        <p className="text-xs text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom Sections */}
      {customSections}
    </div>
  );
});

const DashboardSkeleton = memo(function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export { BaseDashboard, DashboardSkeleton };