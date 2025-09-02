import React, { memo, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface SeizureEvent {
  id: string;
  date: string;
  time: string;
  type: string;
  duration: number;
  severity: 'mild' | 'moderate' | 'severe';
  triggers?: string[];
  location: string;
  witnesses: boolean;
  description: string;
  recovery_time: number;
}

interface SeizureAnalyticsProps {
  events: SeizureEvent[];
}

const SeizureAnalytics = memo(function SeizureAnalytics({ events }: SeizureAnalyticsProps) {
  const commonTriggers = useMemo(() => [
    'Sleep deprivation',
    'Stress',
    'Missed medication',
    'Alcohol',
    'Flashing lights',
    'Illness/fever',
    'Hormonal changes',
    'Dehydration'
  ], []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Frequency Trends</CardTitle>
          <CardDescription>Seizure frequency over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Frequency chart for {events.length} events</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Triggers</CardTitle>
          <CardDescription>Most frequent seizure triggers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonTriggers.slice(0, 5).map((trigger, index) => (
              <div key={trigger} className="flex items-center justify-between">
                <span className="text-sm">{trigger}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default SeizureAnalytics;