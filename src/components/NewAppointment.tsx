import { useState } from "react";
import { Calendar, Clock, User, Video, MapPin, Phone, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function NewAppointment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    date: "",
    time: "",
    duration: "30",
    type: "in-person",
    reason: "",
    notes: ""
  });

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const appointmentReasons = {
    cardio: [
      "Initial Consultation",
      "Follow-up",
      "ECG Review",
      "Echo Procedure",
      "Device Interrogation",
      "Stress Test",
      "Other"
    ],
    neurology: [
      "Initial Consultation", 
      "Follow-up",
      "EEG Analysis",
      "EMG/NCS",
      "Neuroimaging Review",
      "Seizure Evaluation",
      "Headache Assessment",
      "Other"
    ],
    generic: [
      "Initial Consultation",
      "Follow-up", 
      "General Check-up",
      "Lab Results Review",
      "Preventive Care",
      "Vaccination",
      "Other"
    ]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.patientName || !formData.date || !formData.time || !formData.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save appointment (in real app, this would call an API)
    toast({
      title: "Appointment Scheduled",
      description: `Appointment for ${formData.patientName} scheduled for ${formData.date} at ${formData.time}`,
    });

    // Navigate back to appointments
    const basePath = user?.type === 'cardio' ? '/cardiology' : 
                     user?.type === 'neurology' ? '/neurology' : 
                     '/general-medicine';
    navigate(`${basePath}/appointments`);
  };

  const handleCancel = () => {
    const basePath = user?.type === 'cardio' ? '/cardiology' : 
                     user?.type === 'neurology' ? '/neurology' : 
                     '/general-medicine';
    navigate(`${basePath}/appointments`);
  };

  const currentReasons = appointmentReasons[user?.type || 'generic'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">New Appointment</h1>
          <p className="text-muted-foreground">Schedule a new patient appointment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <Label htmlFor="patientPhone">Phone Number</Label>
                  <Input
                    id="patientPhone"
                    value={formData.patientPhone}
                    onChange={(e) => handleInputChange("patientPhone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Type</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={formData.type} 
                onValueChange={(value) => handleInputChange("type", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person" className="flex items-center gap-2 cursor-pointer">
                    <MapPin className="h-4 w-4 text-success" />
                    In-Person Visit
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50">
                  <RadioGroupItem value="virtual" id="virtual" />
                  <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
                    <Video className="h-4 w-4 text-primary" />
                    Virtual Consult
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for Visit *</Label>
                <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter any additional notes or special instructions..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Patient</Label>
                <p className="font-medium">{formData.patientName || "Not specified"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                <p className="font-medium">
                  {formData.date && formData.time 
                    ? `${formData.date} at ${formData.time}` 
                    : "Not scheduled"
                  }
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                <p className="font-medium">{formData.duration} minutes</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                <div className="flex items-center gap-2">
                  {formData.type === "virtual" ? (
                    <>
                      <Video className="h-4 w-4 text-primary" />
                      <span>Virtual Consult</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 text-success" />
                      <span>In-Person Visit</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Reason</Label>
                <p className="font-medium">{formData.reason || "Not specified"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Patient
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                View Patient History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}