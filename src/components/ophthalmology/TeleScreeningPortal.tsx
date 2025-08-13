import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Upload, Camera, Eye, AlertTriangle, CheckCircle, 
  Clock, Users, FileText, Download, Filter, Search 
} from "lucide-react";

const TeleScreeningPortal: React.FC = () => {
  useEffect(() => {
    document.title = "Tele-Screening Portal | Ophthalmology";
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCamp, setSelectedCamp] = useState("anand-camp");

  const screeningCamps = [
    { 
      id: "anand-camp", 
      name: "Anand Village Health Center", 
      type: "DR Screening", 
      status: "Active",
      processed: 89, 
      total: 120,
      highRisk: 8,
      location: "Anand, Gujarat"
    },
    { 
      id: "ahmedabad-rop", 
      name: "Civil Hospital NICU", 
      type: "ROP Screening", 
      status: "Active",
      processed: 12, 
      total: 15,
      highRisk: 3,
      location: "Ahmedabad, Gujarat"
    },
    { 
      id: "surat-glaucoma", 
      name: "Surat Eye Care Camp", 
      type: "Glaucoma Screening", 
      status: "Completed",
      processed: 156, 
      total: 156,
      highRisk: 23,
      location: "Surat, Gujarat"
    },
  ];

  const queueItems = [
    { 
      id: 1, 
      patientId: "DR001", 
      name: "Rajesh Patel", 
      age: 55, 
      status: "pending", 
      priority: "high",
      uploadTime: "2 min ago",
      findings: "Multiple microaneurysms",
      confidence: 0.89
    },
    { 
      id: 2, 
      patientId: "DR002", 
      name: "Sunita Devi", 
      age: 42, 
      status: "reviewed", 
      priority: "medium",
      uploadTime: "15 min ago",
      findings: "No DR detected",
      confidence: 0.95
    },
    { 
      id: 3, 
      patientId: "DR003", 
      name: "Ahmed Khan", 
      age: 68, 
      status: "flagged", 
      priority: "urgent",
      uploadTime: "1 hour ago",
      findings: "Proliferative DR suspected",
      confidence: 0.82
    },
  ];

  const triageStats = {
    noRef: 65,
    mild: 15,
    moderate: 8,
    severe: 4,
    urgent: 3
  };

  return (
    <main className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Tele-Ophthalmology Screening Portal
        </h1>
        <p className="text-muted-foreground mt-2">
          AI-powered batch screening, automatic triage, and referral management
        </p>
      </header>

      {/* Active Campaigns Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {screeningCamps.map((camp) => (
          <Card key={camp.id} className={`cursor-pointer transition-colors ${selectedCamp === camp.id ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{camp.name}</CardTitle>
                <Badge variant={camp.status === "Active" ? "default" : "secondary"}>
                  {camp.status}
                </Badge>
              </div>
              <CardDescription>{camp.type} • {camp.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{camp.processed}/{camp.total}</span>
                  </div>
                  <Progress value={(camp.processed / camp.total) * 100} className="h-2" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">High Risk</span>
                  <Badge variant="destructive">{camp.highRisk}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="queue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">Review Queue</TabsTrigger>
          <TabsTrigger value="upload">Batch Upload</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          {/* Queue Controls */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>AI Screening Queue</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>AI Findings</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queueItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.patientId} • Age {item.age} • {item.uploadTime}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{item.findings}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {Math.round(item.confidence * 100)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          item.priority === "urgent" ? "destructive" :
                          item.priority === "high" ? "secondary" : "outline"
                        }>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.status === "pending" && (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                        {item.status === "reviewed" && (
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Reviewed
                          </Badge>
                        )}
                        {item.status === "flagged" && (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Batch Image Upload
                </CardTitle>
                <CardDescription>Upload fundus images for AI screening</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                  <div className="text-center space-y-4">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium">Drop files here</p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse (JPEG, PNG, DICOM)
                      </p>
                    </div>
                    <Button>Choose Files</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Upload Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Campaign</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>Anand Village DR Screening</option>
                        <option>ROP Screening - NICU</option>
                        <option>Glaucoma Camp - Surat</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Auto-process</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>Yes - Auto triage</option>
                        <option>No - Manual review</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Status</CardTitle>
                <CardDescription>Recent batch uploads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Batch_001_20240113", files: 45, status: "Processing", progress: 78 },
                    { name: "Batch_002_20240113", files: 32, status: "Complete", progress: 100 },
                    { name: "Batch_003_20240112", files: 28, status: "Complete", progress: 100 },
                  ].map((batch, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{batch.name}</p>
                          <p className="text-xs text-muted-foreground">{batch.files} files</p>
                        </div>
                        <Badge variant={batch.status === "Complete" ? "default" : "secondary"}>
                          {batch.status}
                        </Badge>
                      </div>
                      <Progress value={batch.progress} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-success/10 to-success/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">No DR</CardTitle>
                <Eye className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{triageStats.noRef}</div>
                <p className="text-xs text-muted-foreground">No referral needed</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-warning/10 to-warning/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Mild NPDR</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{triageStats.mild}</div>
                <p className="text-xs text-muted-foreground">Annual follow-up</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Moderate+</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{triageStats.moderate}</div>
                <p className="text-xs text-muted-foreground">Refer to specialist</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-critical/10 to-critical/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Urgent</CardTitle>
                <AlertTriangle className="h-4 w-4 text-critical" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-critical">{triageStats.urgent}</div>
                <p className="text-xs text-muted-foreground">Immediate referral</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>DR Grading Distribution</CardTitle>
                <CardDescription>Current screening campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">No DR</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '73%' }} />
                      </div>
                      <span className="text-sm font-medium">73%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mild NPDR</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '17%' }} />
                      </div>
                      <span className="text-sm font-medium">17%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Moderate NPDR</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-destructive h-2 rounded-full" style={{ width: '9%' }} />
                      </div>
                      <span className="text-sm font-medium">9%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Severe/PDR</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-critical h-2 rounded-full" style={{ width: '1%' }} />
                      </div>
                      <span className="text-sm font-medium">1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Performance Metrics</CardTitle>
                <CardDescription>Current model accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Sensitivity</span>
                      <Badge variant="default">94.2%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Specificity</span>
                      <Badge variant="default">91.8%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">PPV</span>
                      <Badge variant="default">88.5%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">NPV</span>
                      <Badge variant="default">96.1%</Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium text-primary">Model Version</p>
                    <p className="text-xs text-muted-foreground">DR-AI v2.1 (Updated Jan 2024)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Screening Reports
              </CardTitle>
              <CardDescription>Generate and download campaign reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Available Reports</h4>
                  {[
                    { name: "Campaign Summary", description: "Overall screening statistics", format: "PDF" },
                    { name: "Patient List", description: "All screened patients with results", format: "Excel" },
                    { name: "Referral Report", description: "High-risk patients requiring follow-up", format: "PDF" },
                    { name: "AI Performance", description: "Model accuracy and quality metrics", format: "PDF" },
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.format}</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Quick Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Screened</span>
                      <span className="font-medium">257 patients</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Referrals Generated</span>
                      <span className="font-medium">34 patients</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Urgent Referrals</span>
                      <span className="font-medium text-destructive">8 patients</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Screening Efficiency</span>
                      <span className="font-medium">13.2% referral rate</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Full Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default TeleScreeningPortal;
