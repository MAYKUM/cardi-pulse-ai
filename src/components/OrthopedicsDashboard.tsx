import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bone, 
  Activity, 
  Users, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  Stethoscope,
  Target,
  Award,
  FileText,
  Heart
} from 'lucide-react';

interface PatientSummary {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  nextAppointment: string;
  status: 'healing' | 'follow-up' | 'surgery-pending' | 'critical';
  progressScore: number;
}

interface SurgicalCase {
  id: string;
  patientName: string;
  procedure: string;
  date: string;
  surgeon: string;
  implants: string[];
  status: 'planned' | 'in-progress' | 'completed';
}

export const OrthopedicsDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const dashboardStats = [
    {
      title: "Total Patients",
      value: 1247,
      delta: "+18 this week",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Surgeries This Month",
      value: 42,
      delta: "6 scheduled",
      icon: Target,
      color: "text-accent"
    },
    {
      title: "Critical Cases",
      value: 7,
      delta: "2 new alerts",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Success Rate",
      value: "96.2%",
      delta: "Recovery outcomes",
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  const recentPatients: PatientSummary[] = [
    {
      id: "OP001",
      name: "Rajesh Kumar",
      age: 45,
      condition: "Femur Fracture (AO 32-A3)",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-29",
      status: "healing",
      progressScore: 78
    },
    {
      id: "OP002",
      name: "Meera Patel",
      age: 62,
      condition: "Total Hip Replacement",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-02-05",
      status: "follow-up",
      progressScore: 92
    },
    {
      id: "OP003",
      name: "Arjun Singh",
      age: 28,
      condition: "ACL Reconstruction",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-25",
      status: "healing",
      progressScore: 65
    },
    {
      id: "OP004",
      name: "Sunita Gupta",
      age: 58,
      condition: "Spinal Fusion L4-L5",
      lastVisit: "2024-01-08",
      nextAppointment: "2024-01-30",
      status: "surgery-pending",
      progressScore: 0
    }
  ];

  const upcomingSurgeries: SurgicalCase[] = [
    {
      id: "SRG001",
      patientName: "Vikram Sharma",
      procedure: "Total Knee Replacement",
      date: "2024-01-25",
      surgeon: "Dr. Rajesh Orthopedic",
      implants: ["DePuy Attune Knee", "Trabecular Metal"],
      status: "planned"
    },
    {
      id: "SRG002",
      patientName: "Anjali Reddy",
      procedure: "ORIF Ankle Fracture",
      date: "2024-01-26",
      surgeon: "Dr. Rajesh Orthopedic",
      implants: ["Locking Plate System"],
      status: "planned"
    },
    {
      id: "SRG003",
      patientName: "Rohit Jain",
      procedure: "Arthroscopic Meniscus Repair",
      date: "2024-01-27",
      surgeon: "Dr. Rajesh Orthopedic",
      implants: ["Bioabsorbable Anchors"],
      status: "planned"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'follow-up': return 'bg-green-100 text-green-800 border-green-200';
      case 'surgery-pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSurgeryStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Bone className="w-8 h-8 text-primary" />
            Orthopedics Dashboard
          </h1>
          <p className="text-muted-foreground">Comprehensive orthopedic patient management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Surgery
          </Button>
          <Button size="sm">
            <Target className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patient Care</TabsTrigger>
          <TabsTrigger value="surgeries">Surgical Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Patients */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Patients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{patient.name}</h4>
                        <Badge className={getStatusColor(patient.status)} variant="outline">
                          {patient.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground">
                          Progress: {patient.progressScore}%
                        </span>
                        <Progress value={patient.progressScore} className="w-24 h-2" />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Surgeries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Upcoming Surgeries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSurgeries.map((surgery) => (
                  <div key={surgery.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                      {surgery.date.split('-')[2]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{surgery.procedure}</h4>
                        <Badge className={getSurgeryStatusColor(surgery.status)} variant="outline">
                          {surgery.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{surgery.patientName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Implants: {surgery.implants.join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Healing</span>
                  <Badge className="bg-blue-100 text-blue-800">245</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Follow-up Required</span>
                  <Badge className="bg-green-100 text-green-800">158</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Surgery Pending</span>
                  <Badge className="bg-yellow-100 text-yellow-800">67</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Critical</span>
                  <Badge className="bg-red-100 text-red-800">7</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recovery Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Excellent Recovery</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Good Recovery</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <Progress value={18} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Complications</span>
                  <span className="text-sm font-medium">4%</span>
                </div>
                <Progress value={4} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  New Patient Intake
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Schedule Surgery
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  View X-ray Analysis
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Rehabilitation Tracker
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="surgeries" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Surgery Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Planned Surgeries</h4>
                    <p className="text-sm text-muted-foreground">Next 30 days</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">15</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Pre-op Planning</h4>
                    <p className="text-sm text-muted-foreground">Templating required</p>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Completed</h4>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">42</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implant Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hip Implants</span>
                  <Badge variant="outline">24 units</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Knee Implants</span>
                  <Badge variant="outline">18 units</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trauma Plates</span>
                  <Badge variant="outline">45 units</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spinal Hardware</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Manage Inventory
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Success Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Overall Success Rate</span>
                    <span className="text-sm font-medium">96.2%</span>
                  </div>
                  <Progress value={96.2} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Patient Satisfaction</span>
                    <span className="text-sm font-medium">94.8%</span>
                  </div>
                  <Progress value={94.8} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Recovery Time</span>
                    <span className="text-sm font-medium">92.1%</span>
                  </div>
                  <Progress value={92.1} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Procedure Volume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Joint Replacements</span>
                  <span className="text-sm font-medium">124</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trauma Surgeries</span>
                  <span className="text-sm font-medium">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Arthroscopic</span>
                  <span className="text-sm font-medium">67</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spine Procedures</span>
                  <span className="text-sm font-medium">34</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Fracture Detection</h4>
                  <p className="text-sm text-blue-600">AI identified 15 cases requiring urgent attention</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Recovery Prediction</h4>
                  <p className="text-sm text-green-600">94% accuracy in recovery time estimates</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Risk Assessment</h4>
                  <p className="text-sm text-yellow-600">3 patients flagged for complications</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};