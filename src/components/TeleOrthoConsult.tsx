import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Video, 
  Phone, 
  MessageSquare, 
  Upload, 
  Camera, 
  Mic,
  MicOff,
  VideoOff,
  Calendar,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Target,
  Activity
} from 'lucide-react';

interface TeleConsult {
  id: string;
  patientName: string;
  patientId: string;
  consultType: 'video' | 'phone' | 'chat';
  appointmentTime: string;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'routine' | 'urgent' | 'emergency';
  reasonForConsult: string;
  symptoms: string[];
  gaitVideoUploaded: boolean;
  xrayShared: boolean;
  aiTriageScore: number;
  consultation: ConsultationData;
}

interface ConsultationData {
  chiefComplaint: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  assessment: string;
  plan: string[];
  followUpRequired: boolean;
  prescriptions: string[];
  imaging: string[];
}

interface GaitAnalysis {
  videoId: string;
  uploadDate: string;
  analysisResults: {
    symmetry: number;
    cadence: number;
    strideLength: number;
    gaitPattern: string;
    abnormalities: string[];
    recommendations: string[];
  };
}

export const TeleOrthoConsult: React.FC = () => {
  const [activeConsult, setActiveConsult] = useState<string>('');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const upcomingConsults: TeleConsult[] = [
    {
      id: "TC001",
      patientName: "Rajesh Kumar",
      patientId: "P001",
      consultType: "video",
      appointmentTime: "2024-01-20T10:00:00",
      duration: 30,
      status: "scheduled",
      priority: "routine",
      reasonForConsult: "Post-operative follow-up - femur fracture",
      symptoms: ["Mild pain", "Reduced mobility", "Swelling"],
      gaitVideoUploaded: true,
      xrayShared: true,
      aiTriageScore: 6,
      consultation: {
        chiefComplaint: "",
        historyOfPresentIllness: "",
        physicalExamination: "",
        assessment: "",
        plan: [],
        followUpRequired: false,
        prescriptions: [],
        imaging: []
      }
    },
    {
      id: "TC002",
      patientName: "Priya Sharma",
      patientId: "P002",
      consultType: "video",
      appointmentTime: "2024-01-20T11:30:00",
      duration: 20,
      status: "scheduled",
      priority: "urgent",
      reasonForConsult: "Knee pain after total knee replacement",
      symptoms: ["Severe pain", "Stiffness", "Clicking sound"],
      gaitVideoUploaded: false,
      xrayShared: false,
      aiTriageScore: 8,
      consultation: {
        chiefComplaint: "",
        historyOfPresentIllness: "",
        physicalExamination: "",
        assessment: "",
        plan: [],
        followUpRequired: false,
        prescriptions: [],
        imaging: []
      }
    }
  ];

  const gaitAnalysis: GaitAnalysis = {
    videoId: "GA001",
    uploadDate: "2024-01-19",
    analysisResults: {
      symmetry: 78,
      cadence: 102,
      strideLength: 1.2,
      gaitPattern: "Antalgic gait",
      abnormalities: ["Reduced weight bearing on right leg", "Shortened stance phase"],
      recommendations: ["Continue physical therapy", "Gradual weight bearing progression"]
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'routine': return 'bg-green-100 text-green-800 border-green-200';
      case 'urgent': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAiTriageColor = (score: number) => {
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tele-Ortho Consultation</h1>
          <p className="text-muted-foreground">Secure video consults and AI-assisted triage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consult
          </Button>
          <Button size="sm">
            <Video className="w-4 h-4 mr-2" />
            Start Emergency Call
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Consults
            </CardTitle>
            <Video className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
            <p className="text-xs text-muted-foreground">3 completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Urgent Cases
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gait Videos
            </CardTitle>
            <Camera className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted-foreground">Pending analysis</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              AI Triage Accuracy
            </CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94.2%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consultation Queue */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Consultation Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="space-y-4 mt-4">
                  {upcomingConsults.map((consult) => (
                    <div key={consult.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                            {consult.consultType === 'video' ? <Video className="w-5 h-5" /> : 
                             consult.consultType === 'phone' ? <Phone className="w-5 h-5" /> : 
                             <MessageSquare className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{consult.patientName}</h4>
                            <p className="text-sm text-muted-foreground">{consult.reasonForConsult}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getPriorityColor(consult.priority)}>
                            {consult.priority}
                          </Badge>
                          <Badge className={getStatusColor(consult.status)} variant="outline">
                            {consult.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-medium">
                            {new Date(consult.appointmentTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{consult.duration} min</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">AI Triage</p>
                          <p className={`font-medium ${getAiTriageColor(consult.aiTriageScore)}`}>
                            {consult.aiTriageScore}/10
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Media</p>
                          <div className="flex gap-1">
                            {consult.gaitVideoUploaded && <Camera className="w-4 h-4 text-green-600" />}
                            {consult.xrayShared && <FileText className="w-4 h-4 text-blue-600" />}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                        <Button size="sm" onClick={() => setActiveConsult(consult.id)}>
                          <Video className="w-4 h-4 mr-2" />
                          Start Consult
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          View Records
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="active" className="mt-4">
                  {activeConsult ? (
                    <div className="space-y-4">
                      {/* Video Interface */}
                      <div className="aspect-video bg-black rounded-lg relative">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="text-center">
                            <Video className="w-16 h-16 mx-auto mb-4" />
                            <p>Video consultation in progress</p>
                            <p className="text-sm opacity-75">Patient: {upcomingConsults.find(c => c.id === activeConsult)?.patientName}</p>
                          </div>
                        </div>
                        
                        {/* Controls */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          <Button 
                            size="sm" 
                            variant={audioEnabled ? "default" : "destructive"}
                            onClick={() => setAudioEnabled(!audioEnabled)}
                          >
                            {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                          </Button>
                          <Button 
                            size="sm" 
                            variant={videoEnabled ? "default" : "destructive"}
                            onClick={() => setVideoEnabled(!videoEnabled)}
                          >
                            {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => setActiveConsult('')}>
                            End Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No active consultations</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="mt-4">
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-muted-foreground">3 consultations completed today</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Symptom Triage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Symptom Triage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800">Next Patient</h4>
                <p className="text-sm text-blue-600">Priya Sharma - Knee pain</p>
                <p className="text-xs text-blue-600 mt-1">AI Score: 8/10 (Urgent)</p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium">Suggested Assessment</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Evaluate range of motion</li>
                  <li>• Check for signs of infection</li>
                  <li>• Assess implant stability</li>
                  <li>• Consider imaging if persistent</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Gait Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Gait Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <h4 className="font-medium">Latest Analysis</h4>
                <p className="text-sm text-muted-foreground">Rajesh Kumar</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Symmetry</span>
                  <span className="text-sm font-medium">{gaitAnalysis.analysisResults.symmetry}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cadence</span>
                  <span className="text-sm font-medium">{gaitAnalysis.analysisResults.cadence} steps/min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pattern</span>
                  <span className="text-sm font-medium">{gaitAnalysis.analysisResults.gaitPattern}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <h5 className="font-medium text-sm mb-2">Recommendations</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {gaitAnalysis.analysisResults.recommendations.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Gait Video
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Share Imaging
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                AI Symptom Checker
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};