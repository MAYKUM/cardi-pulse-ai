import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { RehabSession } from '@/types/rehab';

interface Props {
  sessions: RehabSession[];
}

export function SessionList({ sessions }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent PT Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{session.date}</h4>
                  <p className="text-sm text-muted-foreground">{session.therapist}</p>
                </div>
                <Badge variant="outline">{session.completion}% Complete</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <p className="font-medium">{session.duration} minutes</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Exercises:</span>
                  <p className="font-medium">{session.exercises} completed</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Progress:</span>
                  <Progress value={session.completion} className="mt-1" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Notes:</p>
                <p className="text-sm">{session.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
