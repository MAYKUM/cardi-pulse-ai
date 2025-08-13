import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Eye, TrendingDown, TrendingUp, AlertTriangle, 
  Target, Activity, Calendar, FileText, Download 
} from "lucide-react";

// Mock chart component - in real implementation, use recharts or similar
const MockChart = ({ title, data, color = "primary" }: { title: string; data: any[]; color?: string }) => (
  <div className="h-48 border rounded-lg bg-muted/10 flex items-center justify-center">
    <div className="text-center">
      <div className={`text-${color} mb-2`}>📊</div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{data.length} data points</p>
    </div>
  </div>
);

const GlaucomaSuite: React.FC = () => {
  useEffect(() => {
    document.title = "Glaucoma Suite | Ophthalmology";
  }, []);

  const [selectedPatient, setSelectedPatient] = useState("sanjay-mehta");
  const [selectedEye, setSelectedEye] = useState("OD");

  const patients = [
    { id: "sanjay-mehta", name: "Sanjay Mehta", age: 58, stage: "Moderate", risk: "High" },
    { id: "ravi-kumar", name: "Ravi Kumar", age: 62, stage: "Early", risk: "Medium" },
    { id: "priya-sharma", name: "Priya Sharma", age: 45, stage: "Suspect", risk: "Low" },
  ];

  const iopReadings = [
    { date: "2024-01-15", time: "09:30", value: 28, eye: "OD", method: "GAT" },
    { date: "2024-01-15", time: "09:32", value: 26, eye: "OS", method: "GAT" },
    { date: "2024-01-08", time: "14:15", value: 24, eye: "OD", method: "GAT" },
    { date: "2024-01-08", time: "14:17", value: 22, eye: "OS", method: "GAT" },
    { date: "2024-01-01", time: "10:45", value: 32, eye: "OD", method: "GAT" },
  ];

  const visualFieldData = {
    md: -8.5,
    psd: 12.3,
    vfi: 78,
    reliability: {
      fixationLosses: "2/15",
      falsePositives: "1%",
      falseNegatives: "3%"
    },
    progression: "Stable"
  };

  const rnflData = {
    average: 78,
    superior: 82,
    nasal: 88,
    inferior: 65,
    temporal: 76,
    trend: "Thinning"
  };

  const medications = [
    { name: "Latanoprost 0.005%", frequency: "Once daily", effectiveness: "Good", sideEffects: "Mild" },
    { name: "Timolol 0.5%", frequency: "Twice daily", effectiveness: "Moderate", sideEffects: "None" },
    { name: "Brinzolamide 1%", frequency: "Twice daily", effectiveness: "Good", sideEffects: "Mild" },
  ];

  return (
    <main className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Glaucoma Management Suite
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive tracking of IOP, visual fields, OCT progression and treatment response
        </p>
      </header>

      {/* Patient Selection */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Patient Selection</CardTitle>
            <div className="flex gap-4">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} (Age {patient.age}) - {patient.stage} Glaucoma
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedEye} onValueChange={setSelectedEye}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OD">OD</SelectItem>
                  <SelectItem value="OS">OS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current IOP</CardTitle>
            <Eye className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">28 mmHg</div>
            <p className="text-xs text-muted-foreground">Target: &lt;18 mmHg</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning/10 to-warning/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">VF MD</CardTitle>
            <Target className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{visualFieldData.md} dB</div>
            <p className="text-xs text-muted-foreground">Moderate defect</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">RNFL Average</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{rnflData.average} μm</div>
            <p className="text-xs text-muted-foreground">Below normal</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent/10 to-accent/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">High</div>
            <p className="text-xs text-muted-foreground">Rapid progression</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="iop" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="iop">IOP Tracking</TabsTrigger>
          <TabsTrigger value="visual-field">Visual Fields</TabsTrigger>
          <TabsTrigger value="oct">OCT/RNFL</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="progression">Progression</TabsTrigger>
        </TabsList>

        <TabsContent value="iop" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>IOP Trend Chart</CardTitle>
                <CardDescription>Last 6 months • Target: &lt;18 mmHg</CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart title="IOP over time" data={iopReadings} color="destructive" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent IOP Readings</CardTitle>
                <CardDescription>Goldmann Applanation Tonometry</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Eye</TableHead>
                      <TableHead>IOP</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {iopReadings.slice(0, 5).map((reading, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm">{reading.date}</TableCell>
                        <TableCell>{reading.eye}</TableCell>
                        <TableCell>
                          <Badge variant={reading.value > 21 ? "destructive" : "default"}>
                            {reading.value} mmHg
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {reading.value > 21 ? (
                            <TrendingUp className="h-4 w-4 text-destructive" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-success" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visual-field" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Current VF Parameters</CardTitle>
                <CardDescription>24-2 SITA Standard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Mean Deviation (MD)</span>
                    <Badge variant="destructive">{visualFieldData.md} dB</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pattern Std Dev (PSD)</span>
                    <Badge variant="destructive">{visualFieldData.psd} dB</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Visual Field Index (VFI)</span>
                    <Badge variant="secondary">{visualFieldData.vfi}%</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Reliability Indices</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Fixation Losses:</span>
                      <span>{visualFieldData.reliability.fixationLosses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>False Positives:</span>
                      <span>{visualFieldData.reliability.falsePositives}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>False Negatives:</span>
                      <span>{visualFieldData.reliability.falseNegatives}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VF Progression Analysis</CardTitle>
                <CardDescription>Guided Progression Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart title="MD Progression" data={[]} color="warning" />
                <div className="mt-4">
                  <Badge variant="secondary">{visualFieldData.progression}</Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    No significant progression detected in last 3 visits
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visual Field Map</CardTitle>
                <CardDescription>Pattern Deviation Plot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted/20 border rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Visual Field Map</p>
                    <p className="text-xs text-muted-foreground">Pattern deviation plot</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="oct" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>RNFL Thickness Analysis</CardTitle>
                <CardDescription>Circumpapillary RNFL measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Average</span>
                    <Badge variant="destructive">{rnflData.average} μm</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Superior</span>
                    <Badge variant="secondary">{rnflData.superior} μm</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nasal</span>
                    <Badge variant="default">{rnflData.nasal} μm</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Inferior</span>
                    <Badge variant="destructive">{rnflData.inferior} μm</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Temporal</span>
                    <Badge variant="secondary">{rnflData.temporal} μm</Badge>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm font-medium text-warning">Trend Analysis</p>
                  <p className="text-xs text-muted-foreground">{rnflData.trend} detected in inferior quadrant</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ONH Analysis</CardTitle>
                <CardDescription>Optic nerve head parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Cup/Disc Ratio</span>
                      <Badge variant="destructive">0.7</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rim Area</span>
                      <Badge variant="secondary">1.2 mm²</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Disc Area</span>
                      <Badge variant="default">2.1 mm²</Badge>
                    </div>
                  </div>

                  <MockChart title="ONH Progression" data={[]} color="primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Treatment Regimen</CardTitle>
              <CardDescription>Active topical medications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Effectiveness</TableHead>
                    <TableHead>Side Effects</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>
                        <Badge variant={med.effectiveness === "Good" ? "default" : "secondary"}>
                          {med.effectiveness}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={med.sideEffects === "None" ? "default" : "secondary"}>
                          {med.sideEffects}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-medium text-primary mb-2">Treatment Recommendations</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Consider SLT (Selective Laser Trabeculoplasty) for additional IOP reduction</li>
                  <li>• Monitor for progression with current regimen</li>
                  <li>• Consider glaucoma surgery if target IOP not achieved</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progression" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Structural Progression</CardTitle>
                <CardDescription>RNFL thickness over time</CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart title="RNFL Progression" data={[]} color="destructive" />
                <div className="mt-4">
                  <Badge variant="destructive">Significant thinning</Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    -2.3 μm/year in inferior quadrant
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Functional Progression</CardTitle>
                <CardDescription>Visual field MD over time</CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart title="VF MD Progression" data={[]} color="warning" />
                <div className="mt-4">
                  <Badge variant="secondary">Stable</Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    -0.2 dB/year (within normal variation)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Stratification</CardTitle>
              <CardDescription>Personalized progression risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">5-Year Risk</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Progression</span>
                      <Badge variant="destructive">75%</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">10-Year Risk</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Blindness</span>
                      <Badge variant="destructive">25%</Badge>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Next Visit</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Recommended</span>
                      <Badge variant="secondary">3 months</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Follow-up
        </Button>
      </div>
    </main>
  );
};

export default GlaucomaSuite;
