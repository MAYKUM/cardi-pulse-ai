import { useState } from "react";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets, 
  Weight, 
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  Camera,
  Pill
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock patient data
const patient = {
  id: "P001",
  name: "Rajesh Kumar",
  age: 58,
  gender: "Male",
  mrn: "MRN-2024-001",
  phone: "+91 98765 43210",
  email: "rajesh.kumar@email.com",
  address: "123 MG Road, Bangalore, Karnataka 560001",
  lastVisit: "2024-01-15",
  nextAppointment: "2024-02-01",
  riskScore: 75,
  abhaId: "12-3456-7890-1234"
};

const vitals = [
  { label: "Blood Pressure", value: "140/90", unit: "mmHg", status: "elevated", icon: Heart },
  { label: "Heart Rate", value: "78", unit: "bpm", status: "normal", icon: Activity },
  { label: "Temperature", value: "98.6", unit: "°F", status: "normal", icon: Thermometer },
  { label: "Oxygen Sat", value: "98", unit: "%", status: "normal", icon: Droplets },
  { label: "Weight", value: "75.5", unit: "kg", status: "normal", icon: Weight },
];

const labResults = [
  { test: "Troponin I", value: "0.04", unit: "ng/mL", range: "<0.04", status: "normal" },
  { test: "BNP", value: "350", unit: "pg/mL", range: "<100", status: "elevated" },
  { test: "Total Cholesterol", value: "240", unit: "mg/dL", range: "<200", status: "elevated" },
  { test: "HDL", value: "35", unit: "mg/dL", range: ">40", status: "low" },
  { test: "LDL", value: "160", unit: "mg/dL", range: "<100", status: "elevated" },
];

const medications = [
  { name: "Metoprolol", dosage: "50mg", frequency: "Twice daily", compliance: 95 },
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", compliance: 88 },
  { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", compliance: 92 },
  { name: "Aspirin", dosage: "81mg", frequency: "Once daily", compliance: 98 },
];

const recentStudies = [
  { type: "Echocardiogram", date: "2024-01-10", status: "completed", findings: "Mild LVH" },
  { type: "ECG", date: "2024-01-15", status: "completed", findings: "Normal sinus rhythm" },
  { type: "Stress Test", date: "2024-01-05", status: "completed", findings: "Positive for ischemia" },
];

export function PatientDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "elevated": return "lab-elevated";
      case "low": return "lab-low";
      case "critical": return "critical";
      default: return "lab-normal";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "elevated": return <Badge variant="destructive">High</Badge>;
      case "low": return <Badge className="bg-warning text-warning-foreground">Low</Badge>;
      case "critical": return <Badge className="bg-critical text-critical-foreground">Critical</Badge>;
      default: return <Badge className="bg-success text-success-foreground">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-card rounded-lg shadow-card border">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <span>{patient.age} years • {patient.gender}</span>
                  <span>MRN: {patient.mrn}</span>
                  <span>ABHA: {patient.abhaId}</span>
                </div>
                <div className="flex items-center space-x-6 mt-2">
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{patient.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="text-lg font-semibold">Risk Score: {patient.riskScore}</span>
              </div>
              <Progress value={patient.riskScore} className="w-32 h-2" />
              <p className="text-xs text-muted-foreground mt-1">High cardiovascular risk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="studies">Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p className="font-semibold">{patient.lastVisit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Next Appointment</p>
                    <p className="font-semibold">{patient.nextAppointment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Compliance</p>
                    <p className="font-semibold">93%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-critical" />
                  <div>
                    <p className="text-sm text-muted-foreground">Alerts</p>
                    <p className="font-semibold">2 Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Vitals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {vitals.slice(0, 3).map((vital, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <vital.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{vital.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{vital.value} {vital.unit}</span>
                      {getStatusBadge(vital.status)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recent Studies</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentStudies.map((study, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{study.type}</p>
                      <p className="text-xs text-muted-foreground">{study.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-success text-success-foreground mb-1">Completed</Badge>
                      <p className="text-xs text-muted-foreground">{study.findings}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vitals.map((vital, index) => (
              <Card key={index} className={`bg-${getStatusColor(vital.status)}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <vital.icon className="h-6 w-6 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">{vital.label}</p>
                        <p className="text-2xl font-bold">{vital.value}</p>
                        <p className="text-sm text-muted-foreground">{vital.unit}</p>
                      </div>
                    </div>
                    {getStatusBadge(vital.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Lab Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {labResults.map((lab, index) => (
                  <div key={index} className={`p-4 rounded-md bg-${getStatusColor(lab.status)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{lab.test}</p>
                        <p className="text-sm text-muted-foreground">Reference: {lab.range}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{lab.value} {lab.unit}</p>
                        {getStatusBadge(lab.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5" />
                <span>Current Medications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((med, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
                      </div>
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Compliance:</span>
                      <Progress value={med.compliance} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{med.compliance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="studies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentStudies.map((study, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-5 w-5 text-primary" />
                      <span className="font-medium">{study.type}</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">{study.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Date: {study.date}</p>
                  <p className="text-sm">Findings: {study.findings}</p>
                  <Button size="sm" className="mt-3 w-full">View Full Report</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}