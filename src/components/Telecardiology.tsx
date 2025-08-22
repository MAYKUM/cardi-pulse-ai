import { useState, useCallback, memo } from "react";
import { Video, Phone, MessageCircle, Share, Monitor, Calendar, Clock, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const upcomingConsults = [
  {
    id: "TC001",
    patient: "Rajesh Kumar",
    time: "10:30 AM",
    date: "2024-01-15",
    type: "Follow-up",
    priority: "routine",
    vitals: {
      bp: "140/90",
      hr: "88",
      temp: "98.6°F"
    },
    complaint: "Chest pain follow-up"
  },
  {
    id: "TC002", 
    patient: "Priya Sharma",
    time: "11:00 AM",
    date: "2024-01-15",
    type: "Consultation",
    priority: "urgent",
    vitals: {
      bp: "160/100",
      hr: "102",
      temp: "99.1°F"
    },
    complaint: "Shortness of breath"
  },
  {
    id: "TC003",
    patient: "Mohammed Ali",
    time: "2:00 PM",
    date: "2024-01-15", 
    type: "Device Check",
    priority: "routine",
    vitals: {
      bp: "125/80",
      hr: "72",
      temp: "98.4°F"
    },
    complaint: "Pacemaker interrogation"
  }
];

const Telecardiology = memo(function Telecardiology() {
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: "patient", message: "Hello doctor, I'm ready for the consultation" },
    { sender: "doctor", message: "Good morning! How are you feeling today?" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const getPriorityBadge = useCallback((priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">Urgent</Badge>;
      case "routine":
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Routine</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  }, []);

  const sendMessage = useCallback(() => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, { sender: "doctor", message: newMessage }]);
      setNewMessage("");
    }
  }, [newMessage]);

  if (activeCall) {
    const consult = upcomingConsults.find(c => c.id === activeCall);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveCall(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← End Call
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Video Consultation</h1>
              <p className="text-muted-foreground">{consult?.patient} • {consult?.type}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-success text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Connected
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Video */}
            <Card className="h-2/3">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-gray-900 rounded-lg flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">{consult?.patient}</p>
                    <p className="text-sm opacity-75">Patient Video Feed</p>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" className="rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Video (Picture-in-Picture) & Screen Share */}
            <div className="grid grid-cols-2 gap-4 h-1/3">
              <Card>
                <CardContent className="p-0 h-full">
                  <div className="h-full bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Dr. Cardio</p>
                      <p className="text-xs text-muted-foreground">Your Video</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-0 h-full">
                  <div className="h-full bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Monitor className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Screen Share</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Share className="h-4 w-4 mr-2" />
                        Share Echo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Patient Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Patient Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Blood Pressure</span>
                  <span className="text-sm font-medium">{consult?.vitals.bp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Heart Rate</span>
                  <span className="text-sm font-medium">{consult?.vitals.hr} bpm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Temperature</span>
                  <span className="text-sm font-medium">{consult?.vitals.temp}</span>
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="h-80">
              <CardHeader>
                <CardTitle className="text-base">Chat</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-64">
                <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`text-sm ${msg.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-2 rounded-lg max-w-xs ${
                        msg.sender === 'doctor' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t flex gap-2">
                  <Input
                    placeholder="Type message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  View ECG History
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Follow-up
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  View Echo Reports
                </Button>
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
          <h1 className="text-2xl font-bold">Telecardiology</h1>
          <p className="text-muted-foreground">Virtual consultations and remote monitoring</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Start Emergency Consult
        </Button>
      </div>

      <Tabs defaultValue="queue" className="w-full">
        <TabsList>
          <TabsTrigger value="queue">Consult Queue</TabsTrigger>
          <TabsTrigger value="history">Call History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Virtual Consults
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Vitals Snapshot</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingConsults.map((consult) => (
                    <TableRow key={consult.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {consult.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{consult.patient}</p>
                          <p className="text-sm text-muted-foreground">{consult.complaint}</p>
                        </div>
                      </TableCell>
                      <TableCell>{consult.type}</TableCell>
                      <TableCell>{getPriorityBadge(consult.priority)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>BP: {consult.vitals.bp}</div>
                          <div>HR: {consult.vitals.hr}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setActiveCall(consult.id)}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Join
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">Today's Consults</p>
                  </div>
                  <Video className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">Urgent Cases</p>
                  </div>
                  <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">!</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm text-muted-foreground">Connection Rate</p>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Call history will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Telecardiology Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Video call settings and preferences...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});

export { Telecardiology };