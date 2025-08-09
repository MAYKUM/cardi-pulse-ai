import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PainScore } from '@/types/rehab';

interface Props {
  scores: PainScore[];
}

function getPainColor(score: number) {
  if (score <= 3) return 'text-green-600';
  if (score <= 6) return 'text-yellow-600';
  return 'text-red-600';
}

export function PainTimeline({ scores }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pain Level Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Pain Level Chart (0-10 scale)</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Recent Pain Scores</h4>
            {scores.slice(0, 5).map((score, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <span className="text-sm">{score.date}</span>
                  <span className="text-xs text-muted-foreground ml-2">({score.activity})</span>
                </div>
                <div className={`font-bold ${getPainColor(score.score)}`}>{score.score}/10</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
