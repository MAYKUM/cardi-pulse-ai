import { useState } from "react";
import { Eye, Download, Filter, Search, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const echoStudies = [
  {
    id: "ECH001",
    patient: "Rajesh Kumar",
    date: "2024-01-15",
    type: "Transthoracic",
    status: "reviewed",
    ejectionFraction: "55%",
    findings: "Normal LV function"
  },
  {
    id: "ECH002", 
    patient: "Priya Sharma",
    date: "2024-01-14",
    type: "Transesophageal",
    status: "pending",
    ejectionFraction: "42%",
    findings: "Mild mitral regurgitation"
  },
  {
    id: "ECH003",
    patient: "Mohammed Ali",
    date: "2024-01-13", 
    type: "Stress Echo",
    status: "reviewed",
    ejectionFraction: "48%",
    findings: "Anterior wall hypokinesis"
  }
];

export function EchoReports() {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudies = echoStudies.filter(study => {
    const matchesStatus = statusFilter === "all" || study.status === statusFilter;
    const matchesSearch = study.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "reviewed":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Reviewed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (selectedStudy) {
    const study = echoStudies.find(s => s.id === selectedStudy);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedStudy(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Studies
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Echo Study {study?.id}</h1>
              <p className="text-muted-foreground">{study?.patient} • {study?.date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            {getStatusBadge(study?.status || "")}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Viewer */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Echo Images & Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Interactive Echo Viewer</p>
                    <p className="text-xs text-muted-foreground">Click to view DICOM images</p>
                  </div>
                </div>
                
                <Tabs defaultValue="measurements" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="measurements">Measurements</TabsTrigger>
                    <TabsTrigger value="annotations">Annotations</TabsTrigger>
                    <TabsTrigger value="views">Views</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="measurements" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Left Ventricle</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>LVEDD: 52mm</div>
                          <div>LVESD: 34mm</div>
                          <div>LVEF: {study?.ejectionFraction}</div>
                          <div>FS: 35%</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mitral Valve</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>E-wave: 0.8 m/s</div>
                          <div>A-wave: 0.6 m/s</div>
                          <div>E/A ratio: 1.33</div>
                          <div>DT: 180ms</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="annotations">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Click on the image to add annotations</p>
                      <div className="p-4 border border-dashed rounded-lg">
                        <p className="text-sm">No annotations added yet</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="views">
                    <div className="grid grid-cols-4 gap-2">
                      {["Parasternal Long", "Parasternal Short", "Apical 4-Chamber", "Apical 2-Chamber"].map((view) => (
                        <div key={view} className="aspect-square bg-muted rounded border p-2">
                          <div className="text-xs text-center">{view}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Annotation Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Study Type</label>
                  <p>{study?.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Indication</label>
                  <p>Chest pain evaluation</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Interpretation</label>
                  <p>{study?.findings}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">AI Insights</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automated analysis suggests normal left ventricular systolic function. 
                    No regional wall motion abnormalities detected.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confidence Score</label>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">88% confidence</p>
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
          <h1 className="text-2xl font-bold">Echo Reports</h1>
          <p className="text-muted-foreground">Echocardiogram studies and interpretations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          New Study
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
                  placeholder="Search by patient name or study ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Studies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Echo Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Study ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>EF</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudies.map((study) => (
                <TableRow key={study.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{study.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      {study.patient}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {study.date}
                    </div>
                  </TableCell>
                  <TableCell>{study.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {study.ejectionFraction}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(study.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudy(study.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
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