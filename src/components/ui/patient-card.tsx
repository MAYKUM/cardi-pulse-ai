import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, MapPin, Phone } from 'lucide-react';

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age?: number;
    gender?: string;
    lastVisit?: string;
    nextAppointment?: string;
    status?: 'active' | 'inactive' | 'critical';
    contactInfo?: string;
  };
  onViewDetails: (id: string) => void;
  onScheduleAppointment?: (id: string) => void;
  compact?: boolean;
}

export const PatientCard = memo<PatientCardProps>(({ 
  patient, 
  onViewDetails, 
  onScheduleAppointment,
  compact = false 
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'active':
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">
              {patient.age && `${patient.age}y`} {patient.gender && `• ${patient.gender}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {patient.status && (
            <Badge className={getStatusColor(patient.status)}>
              {patient.status}
            </Badge>
          )}
          <Button size="sm" variant="outline" onClick={() => onViewDetails(patient.id)}>
            View
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{patient.name}</CardTitle>
              <CardDescription>
                {patient.age && `Age: ${patient.age}`} 
                {patient.gender && ` • ${patient.gender}`}
              </CardDescription>
            </div>
          </div>
          {patient.status && (
            <Badge className={getStatusColor(patient.status)}>
              {patient.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {patient.lastVisit && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
            </div>
          )}
          
          {patient.nextAppointment && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next: {new Date(patient.nextAppointment).toLocaleDateString()}</span>
            </div>
          )}
          
          {patient.contactInfo && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{patient.contactInfo}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button onClick={() => onViewDetails(patient.id)} className="flex-1">
            View Details
          </Button>
          {onScheduleAppointment && (
            <Button 
              variant="outline" 
              onClick={() => onScheduleAppointment(patient.id)}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

PatientCard.displayName = 'PatientCard';