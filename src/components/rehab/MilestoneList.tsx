import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Target } from 'lucide-react';
import type { Milestone } from '@/types/rehab';

interface Props {
  milestones: Milestone[];
  currentWeek: number;
}

export function MilestoneList({ milestones, currentWeek }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recovery Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-start gap-3 p-4 border rounded-lg">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                  milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {milestone.completed ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <Target className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Week {milestone.targetWeek}
                    </Badge>
                    {milestone.completed && milestone.completedDate && (
                      <Badge variant="default" className="text-xs">
                        Completed {milestone.completedDate}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                {!milestone.completed && currentWeek > milestone.targetWeek && (
                  <div className="flex items-center gap-1 mt-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Behind schedule</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
