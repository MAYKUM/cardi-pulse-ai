import React, { memo, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Thermometer, Activity, Droplet } from 'lucide-react';

const VitalCard = memo(({ vital, index }: { vital: any; index: number }) => {
  const IconComponent = vital.icon;
  
  return (
    <Card key={index}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <IconComponent className="h-5 w-5 text-primary" />
          <Badge variant={vital.status === 'normal' ? 'secondary' : 'destructive'}>
            {vital.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{vital.value}</div>
          <div className="text-sm text-muted-foreground">{vital.label}</div>
        </div>
      </CardContent>
    </Card>
  );
});

VitalCard.displayName = 'VitalCard';

export const VitalSigns: React.FC = memo(() => {
  const vitalsData = useMemo(() => [
    { icon: Heart, label: 'Heart Rate', value: '72 BPM', status: 'normal' },
    { icon: Activity, label: 'Blood Pressure', value: '120/80', status: 'normal' },
    { icon: Thermometer, label: 'Temperature', value: '98.6°F', status: 'normal' },
    { icon: Droplet, label: 'SpO2', value: '98%', status: 'normal' }
  ], []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vital Signs Monitor</h1>
        <p className="text-muted-foreground">Real-time patient vital signs tracking</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {vitalsData.map((vital, i) => (
          <VitalCard key={i} vital={vital} index={i} />
        ))}
      </div>
    </div>
  );
});

VitalSigns.displayName = 'VitalSigns';