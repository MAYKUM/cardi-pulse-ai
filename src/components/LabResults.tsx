import { useState } from "react";
import { TrendingUp, AlertTriangle, Download, Calendar, Filter, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const labTests = [
  {
    id: "LAB001",
    patient: "Rajesh Kumar",
    date: "2024-01-15",
    type: "Cardiac Panel",
    status: "completed",
    aiAnomalies: true,
    tests: [
      { name: "Troponin I", value: 0.15, unit: "ng/mL", normal: "< 0.04", status: "high" },
      { name: "CK-MB", value: 8.2, unit: "ng/mL", normal: "0-6.3", status: "high" },
      { name: "BNP", value: 450, unit: "pg/mL", normal: "< 100", status: "high" },
      { name: "Total Cholesterol", value: 220, unit: "mg/dL", normal: "< 200", status: "high" }
    ]
  },
  {
    id: "LAB002", 
    patient: "Priya Sharma",
    date: "2024-01-14",
    type: "Lipid Profile",
    status: "completed",
    aiAnomalies: false,
    tests: [
      { name: "Total Cholesterol", value: 180, unit: "mg/dL", normal: "< 200", status: "normal" },
      { name: "HDL", value: 55, unit: "mg/dL", normal: "> 40", status: "normal" },
      { name: "LDL", value: 110, unit: "mg/dL", normal: "< 100", status: "high" },
      { name: "Triglycerides", value: 95, unit: "mg/dL", normal: "< 150", status: "normal" }
    ]
  },
  {
    id: "LAB003",
    patient: "Mohammed Ali",
    date: "2024-01-13", 
    type: "Complete Metabolic",
    status: "pending",
    aiAnomalies: false,
    tests: []
  }
];

export function LabResults() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTests = labTests.filter(test => {
    const matchesType = typeFilter === "all" || test.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesSearch = test.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getValueStatus = (status: string) => {
    switch (status) {
      case "high":
        return "text-critical";
      case "low":
        return "text-warning";
      case "normal":
        return "text-success";
      default:
        return "text-foreground";
    }
  };

  if (selectedTest) {
    const test = labTests.find(t => t.id === selectedTest);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedTest(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Lab Tests
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Lab Test {test?.id}</h1>
              <p className="text-muted-foreground">{test?.patient} • {test?.date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            {getStatusBadge(test?.status || "")}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Results & Trends */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Results Overview
                  {test?.aiAnomalies && (
                    <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      AI Flagged
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Normal Range</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {test?.tests.map((labTest, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{labTest.name}</TableCell>
                        <TableCell className={getValueStatus(labTest.status)}>
                          {labTest.value} {labTest.unit}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{labTest.normal}</TableCell>
                        <TableCell>
                          {labTest.status === "high" && (
                            <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">High</Badge>
                          )}
                          {labTest.status === "low" && (
                            <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Low</Badge>
                          )}
                          {labTest.status === "normal" && (
                            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Normal</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Trend Charts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="troponin" className="w-full">
                  <TabsList>
                    <TabsTrigger value="troponin">Troponin I</TabsTrigger>
                    <TabsTrigger value="bnp">BNP</TabsTrigger>
                    <TabsTrigger value="cholesterol">Cholesterol</TabsTrigger>
                  </TabsList>
                  <TabsContent value="troponin">
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Troponin I Trend Chart</p>
                        <p className="text-xs text-muted-foreground">6-month history showing elevation patterns</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="bnp">
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">BNP Trend Chart</p>
                        <p className="text-xs text-muted-foreground">Progressive increase over 3 months</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="cholesterol">
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Cholesterol Trend Chart</p>
                        <p className="text-xs text-muted-foreground">Response to statin therapy</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {test?.aiAnomalies ? (
                  <div className="p-4 bg-critical/5 rounded-lg border border-critical/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-critical" />
                      <span className="text-sm font-medium text-critical">Anomalies Detected</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Elevated cardiac biomarkers suggest acute coronary syndrome</p>
                      <p>• BNP elevation indicates heart failure</p>
                      <p>• Recommend immediate cardiology consultation</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">Normal Pattern</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lab values within expected ranges for patient demographics.
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confidence Score</label>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">94% confidence</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clinical Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ordering Physician</label>
                  <p>Dr. Sarah Patel</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Clinical Indication</label>
                  <p>Chest pain evaluation</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Lab Location</label>
                  <p>Apollo Main Lab</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lab Results</h1>
          <p className="text-muted-foreground">Laboratory tests with AI-powered analysis</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Order Lab Tests
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name or test ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by test type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tests</SelectItem>
                <SelectItem value="cardiac">Cardiac Panel</SelectItem>
                <SelectItem value="lipid">Lipid Profile</SelectItem>
                <SelectItem value="metabolic">Metabolic Panel</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Highlights */}
      <Card className="border-critical/20 bg-critical/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-critical">
            <AlertTriangle className="h-5 w-5" />
            AI-Flagged Anomalies (1)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Rajesh Kumar - Cardiac Panel</p>
              <p className="text-sm text-muted-foreground">Multiple elevated cardiac biomarkers detected</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedTest("LAB001")}
            >
              Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lab Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Lab Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>AI Analysis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{test.id}</TableCell>
                  <TableCell>{test.patient}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {test.date}
                    </div>
                  </TableCell>
                  <TableCell>{test.type}</TableCell>
                  <TableCell>
                    {test.aiAnomalies ? (
                      <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Flagged
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        Normal
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(test.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTest(test.id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}