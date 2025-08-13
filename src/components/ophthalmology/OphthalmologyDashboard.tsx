import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, Camera, Calendar, Users, AlertTriangle, Clock, 
  TrendingUp, Activity, Zap, FileText, Microscope, Target 
} from "lucide-react";

const OphthalmologyDashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard | Ophthalmology";
  }, []);

  const urgentAlerts = [
    { id: 1, patient: "Ravi Kumar", condition: "IOP > 35 mmHg", priority: "critical", time: "2m ago" },
    { id: 2, patient: "Priya Sharma", condition: "Suspected RD", priority: "critical", time: "15m ago" },
    { id: 3, patient: "Ahmed Khan", condition: "Post-op endophthalmitis risk", priority: "warning", time: "1h ago" },
  ];

  const todayStats = {
    patients: 24,
    surgeries: 6,
    screenings: 89,
    imaging: 45,
  };

  const recentPatients = [
    { name: "Ananya Singh", age: 48, lastVisit: "Today", condition: "Keratoconus", va: "6/9", iop: "16" },
    { name: "Mohammed Ali", age: 71, lastVisit: "Yesterday", condition: "Cataract", va: "CF 2m", iop: "12" },
    { name: "Priya Patel", age: 7, lastVisit: "2 days ago", condition: "Amblyopia", va: "6/12", iop: "-" },
  ];

  return (
    <main className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Ophthalmology Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor patients, imaging, surgeries, and screening programs
        </p>
      </header>

      {/* Urgent Alerts */}
      {urgentAlerts.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Urgent Alerts ({urgentAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {urgentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center gap-3">
                  <Badge variant={alert.priority === "critical" ? "destructive" : "secondary"}>
                    {alert.priority}
                  </Badge>
                  <div>
                    <p className="font-medium">{alert.patient}</p>
                    <p className="text-sm text-muted-foreground">{alert.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayStats.patients}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent/10 to-accent/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Surgeries</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{todayStats.surgeries}</div>
            <p className="text-xs text-muted-foreground">4 cataract, 2 retina</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success/10 to-success/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Screenings</CardTitle>
            <Eye className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{todayStats.screenings}</div>
            <p className="text-xs text-muted-foreground">DR camp ongoing</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning/10 to-warning/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Imaging Queue</CardTitle>
            <Camera className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{todayStats.imaging}</div>
            <p className="text-xs text-muted-foreground">12 pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="surgery">Surgery</TabsTrigger>
          <TabsTrigger value="screening">Screening</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Latest patient visits and key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Age {patient.age} • {patient.condition}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-4 text-sm">
                        <span>VA: {patient.va}</span>
                        <span>IOP: {patient.iop}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5" />
                  OCT Analysis Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Pending Review</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AI Flagged</span>
                    <Badge variant="destructive">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completed Today</span>
                    <Badge variant="outline">28</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Fundus Screening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>No DR</span>
                    <Badge className="bg-success text-success-foreground">65</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mild NPDR</span>
                    <Badge variant="secondary">15</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Refer Urgent</span>
                    <Badge variant="destructive">4</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="surgery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Surgery Schedule</CardTitle>
              <CardDescription>6 procedures scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "09:00", patient: "Mr. Rajesh Kumar", procedure: "Phacoemulsification + IOL", eye: "Right", status: "Completed" },
                  { time: "10:30", patient: "Mrs. Sunita Devi", procedure: "Phacoemulsification + IOL", eye: "Left", status: "In Progress" },
                  { time: "14:00", patient: "Mr. Suresh Patel", procedure: "Vitrectomy", eye: "Right", status: "Scheduled" },
                ].map((surgery, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-mono text-muted-foreground">{surgery.time}</div>
                      <div>
                        <p className="font-medium">{surgery.patient}</p>
                        <p className="text-sm text-muted-foreground">{surgery.procedure} ({surgery.eye})</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        surgery.status === "Completed" ? "default" :
                        surgery.status === "In Progress" ? "secondary" : "outline"
                      }
                    >
                      {surgery.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screening" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>DR Screening Camp</CardTitle>
                <CardDescription>Village Health Center, Anand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm">89/120</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">No DR</p>
                      <p className="font-semibold">65 patients</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Refer</p>
                      <p className="font-semibold text-destructive">8 patients</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROP Screening</CardTitle>
                <CardDescription>NICU - City Hospital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Screened</p>
                      <p className="font-semibold">12 infants</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Follow-up</p>
                      <p className="font-semibold text-warning">3 infants</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default OphthalmologyDashboard;