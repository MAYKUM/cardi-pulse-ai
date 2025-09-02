import { useState } from "react";
import { Calendar, Clock, Video, MapPin, User, Phone, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useNavigate } from "react-router-dom";

// Generate random appointments for demonstration
const generateRandomAppointments = () => {
  const patients = [
    "Rajesh Kumar", "Priya Sharma", "Mohammed Ali", "Sunita Patel", "David Chen",
    "Maria Rodriguez", "James Wilson", "Lisa Thompson", "Amit Gupta", "Sarah Connor",
    "Michael Brown", "Jennifer Lee", "Robert Garcia", "Emily Davis", "John Smith"
  ];
  
  const reasons = {
    cardio: ["Follow-up", "ECG Review", "Echo Procedure", "Device Check", "Initial Consult"],
    neurology: ["EEG Analysis", "Seizure Evaluation", "Headache Assessment", "Follow-up", "EMG Study"],
    generic: ["General Check-up", "Lab Review", "Follow-up", "Vaccination", "Consultation"]
  };

  const appointments = [];
  const today = new Date();
  
  // Generate appointments for the next 30 days
  for (let day = 0; day < 30; day++) {
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + day);
    
    // Skip weekends
    if (appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) continue;
    
    // Random number of appointments per day (2-6)
    const appointmentsPerDay = Math.floor(Math.random() * 5) + 2;
    
    for (let i = 0; i < appointmentsPerDay; i++) {
      const hour = 9 + Math.floor(Math.random() * 8); // 9 AM to 4 PM
      const minute = Math.random() < 0.5 ? 0 : 30;
      
      appointments.push({
        id: `APT${String(day).padStart(2, '0')}${i}`,
        patient: patients[Math.floor(Math.random() * patients.length)],
        date: appointmentDate.toISOString().split('T')[0],
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        duration: [30, 45, 60][Math.floor(Math.random() * 3)],
        type: Math.random() < 0.3 ? "virtual" : "in-person",
        status: Math.random() < 0.8 ? "confirmed" : Math.random() < 0.5 ? "pending" : "cancelled",
        reason: reasons.cardio[Math.floor(Math.random() * reasons.cardio.length)],
        notes: "Routine appointment",
        phone: `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`
      });
    }
  }
  
  return appointments.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
};

const appointments = generateRandomAppointments();

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

export function Appointments() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  // Remove auth dependency
  const navigate = useNavigate();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "virtual":
        return <Video className="h-4 w-4 text-primary" />;
      case "in-person":
        return <MapPin className="h-4 w-4 text-success" />;
      default:
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "virtual":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Virtual</Badge>;
      case "in-person":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">In-Person</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesDate = apt.date === selectedDate;
    const matchesType = typeFilter === "all" || apt.type === typeFilter;
    return matchesDate && matchesType;
  });

  const todaysAppointments = appointments.filter(apt => apt.date === selectedDate);

  if (selectedPatient) {
    const patient = appointments.find(apt => apt.id === selectedPatient);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPatient(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Calendar
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Patient Profile</h1>
              <p className="text-muted-foreground">{patient?.patient}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call Patient
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Schedule Follow-up
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient History */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-2 border-primary pl-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Jan 15, 2024</span>
                      {getTypeBadge(patient?.type || "")}
                    </div>
                    <p className="text-sm text-muted-foreground">{patient?.reason}</p>
                    <p className="text-sm">{patient?.notes}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Dec 20, 2023</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">In-Person</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Initial consultation</p>
                    <p className="text-sm">Comprehensive cardiac assessment</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Nov 15, 2023</span>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Virtual</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Results review</p>
                    <p className="text-sm">ECG and lab results discussion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clinical Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">Dr. Sarah Patel</span>
                      <span className="text-xs text-muted-foreground">Jan 15, 2024</span>
                    </div>
                    <p className="text-sm">Patient reports significant improvement in chest pain symptoms. ECG shows normal sinus rhythm. Continue current medication regimen.</p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">Dr. Michael Chen</span>
                      <span className="text-xs text-muted-foreground">Dec 20, 2023</span>
                    </div>
                    <p className="text-sm">Initial presentation with atypical chest pain. Stress test ordered. Patient educated on lifestyle modifications.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p>{patient?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Visit</label>
                  <p>{patient?.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Appointment</label>
                  <p className="text-sm text-muted-foreground">Not scheduled</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Call
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Patient
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Blood Pressure</span>
                  <span className="text-sm font-medium">125/80</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Heart Rate</span>
                  <span className="text-sm font-medium">72 bpm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Weight</span>
                  <span className="text-sm font-medium">75 kg</span>
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
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage patient appointments and schedules</p>
        </div>
        <Button 
          onClick={() => {
            const specialty = window.location.pathname.split('/')[1];
            const basePath = specialty === 'cardiology' ? '/cardiology' : 
                           specialty === 'neurology' ? '/neurology' : 
                           specialty === 'orthopedics' ? '/orthopedics' :
                           specialty === 'ophthalmology' ? '/ophthalmology' :
                           '/general-medicine';
            navigate(`${basePath}/appointments/new`);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    if (viewMode === "day") {
                      newDate.setDate(newDate.getDate() - 1);
                    } else if (viewMode === "week") {
                      newDate.setDate(newDate.getDate() - 7);
                    } else {
                      newDate.setMonth(newDate.getMonth() - 1);
                    }
                    setCurrentDate(newDate);
                    setSelectedDate(newDate.toISOString().split('T')[0]);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium min-w-[200px] text-center">
                  {viewMode === "day" && currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  {viewMode === "week" && `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                  {viewMode === "month" && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    if (viewMode === "day") {
                      newDate.setDate(newDate.getDate() + 1);
                    } else if (viewMode === "week") {
                      newDate.setDate(newDate.getDate() + 7);
                    } else {
                      newDate.setMonth(newDate.getMonth() + 1);
                    }
                    setCurrentDate(newDate);
                    setSelectedDate(newDate.toISOString().split('T')[0]);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "day" | "week" | "month")}>
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeSlots.map((time) => {
                  const appointment = filteredAppointments.find(apt => apt.time === time);
                  return (
                    <div key={time} className="flex items-center gap-4 p-2 border-b border-border/50">
                      <div className="w-20 text-sm text-muted-foreground font-mono">
                        {time}
                      </div>
                      {appointment ? (
                        <div 
                          className="flex-1 p-3 bg-primary/5 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                          onClick={() => setSelectedPatient(appointment.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(appointment.type)}
                              {getStatusBadge(appointment.status)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 p-3 border border-dashed border-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Available</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Appointments</span>
                <span className="text-sm font-medium">{todaysAppointments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Virtual Consults</span>
                <span className="text-sm font-medium">
                  {todaysAppointments.filter(apt => apt.type === "virtual").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">In-Person Visits</span>
                <span className="text-sm font-medium">
                  {todaysAppointments.filter(apt => apt.type === "in-person").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending Confirmations</span>
                <span className="text-sm font-medium">
                  {todaysAppointments.filter(apt => apt.status === "pending").length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Patients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysAppointments.slice(0, 3).map((apt) => (
                <div 
                  key={apt.id} 
                  className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded cursor-pointer"
                  onClick={() => setSelectedPatient(apt.id)}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{apt.patient}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{apt.time}</span>
                      {getTypeIcon(apt.type)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Video className="h-4 w-4 mr-2" />
                Start Virtual Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}