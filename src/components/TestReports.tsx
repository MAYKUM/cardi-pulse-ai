import React, { memo, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

const TestReportItem = memo(({ test, index }: { test: string; index: number }) => (
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div>
      <div className="font-medium">{test}</div>
      <div className="text-sm text-muted-foreground">Patient ABC - 2024-01-1{5-index}</div>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant={index < 2 ? "default" : "secondary"}>
        {index < 2 ? 'New' : 'Reviewed'}
      </Badge>
      <Eye className="h-4 w-4 cursor-pointer" />
      <Download className="h-4 w-4 cursor-pointer" />
    </div>
  </div>
));

TestReportItem.displayName = 'TestReportItem';

export const TestReports: React.FC = memo(() => {
  const testReports = useMemo(() => [
    'Blood Chemistry Panel', 
    'Complete Blood Count', 
    'Urinalysis', 
    'Thyroid Function'
  ], []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Test Reports</h1>
        <p className="text-muted-foreground">Laboratory and diagnostic test results</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testReports.map((test, i) => (
              <TestReportItem key={i} test={test} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

TestReports.displayName = 'TestReports';