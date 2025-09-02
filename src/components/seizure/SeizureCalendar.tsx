import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

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

interface SeizureCalendarProps {
  events: SeizureEvent[];
}

const SeizureCalendar = memo(function SeizureCalendar({ events }: SeizureCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seizure Calendar</CardTitle>
        <CardDescription>Visual timeline of seizure events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Calendar component would be integrated here</p>
            <p className="text-sm">showing {events.length} seizure events by date</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default SeizureCalendar;