import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Activity, Target, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface Props {
  selectedDate?: Date;
  onSelect: (date?: Date) => void;
}

export function RehabSidebar({ selectedDate, onSelect }: Props) {
  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Session Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={selectedDate} onSelect={onSelect} className="rounded-md border" />
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
  );
}
