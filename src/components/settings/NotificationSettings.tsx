import React, { useState } from "react";
import { 
  Bell, 
  Smartphone, 
  Mail, 
  MessageSquare,
  AlertTriangle,
  Heart,
  Brain,
  Eye,
  Stethoscope,
  Clock,
  Volume2,
  Vibrate,
  BellOff,
  Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettingsProps {
  specialty: "cardiology" | "neurology" | "general_medicine" | "ophthalmology";
}

export function NotificationSettings({ specialty }: NotificationSettingsProps) {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // Channel preferences
    inApp: true,
    email: true,
    sms: false,
    push: true,
    
    // Notification types
    criticalAlerts: true,
    patientUpdates: true,
    labResults: true,
    appointments: true,
    systemUpdates: false,
    aiInsights: true,
    
    // Delivery settings
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "07:00",
    emergencyOverride: true,
    
    // Sound settings
    soundEnabled: true,
    vibrationEnabled: true,
    volume: 75,
    customTone: "default",
    
    // Frequency settings
    criticalImmediate: true,
    urgentDelay: 0,
    routineDelay: 30,
    digestFrequency: "daily",
    
    // Specialty-specific
    specialtyAlerts: true
  });

  const specialtyAlerts = {
    cardiology: [
      { id: "arrhythmia", label: "Arrhythmia Detection", description: "ECG abnormalities and rhythm disorders" },
      { id: "troponin", label: "Elevated Troponin", description: "Critical cardiac enzyme levels" },
      { id: "bp_crisis", label: "Hypertensive Crisis", description: "Blood pressure emergencies" },
      { id: "heart_failure", label: "Heart Failure Events", description: "Acute decompensation alerts" }
    ],
    neurology: [
      { id: "seizure", label: "Seizure Activity", description: "EEG spike detection and seizure events" },
      { id: "stroke_alert", label: "Stroke Alerts", description: "FAST protocol and imaging findings" },
      { id: "icp", label: "Intracranial Pressure", description: "Critical ICP monitoring alerts" },
      { id: "neuro_deterioration", label: "Neurological Deterioration", description: "GCS changes and focal deficits" }
    ],
    ophthalmology: [
      { id: "iop_elevation", label: "IOP Elevation", description: "Intraocular pressure spikes" },
      { id: "retinal_emergency", label: "Retinal Emergencies", description: "Detachment and vascular occlusions" },
      { id: "corneal_perforation", label: "Corneal Perforation", description: "Emergency surgical cases" },
      { id: "sudden_vision_loss", label: "Sudden Vision Loss", description: "Acute visual field defects" }
    ],
    general_medicine: [
      { id: "sepsis", label: "Sepsis Screening", description: "SIRS criteria and sepsis alerts" },
      { id: "critical_labs", label: "Critical Lab Values", description: "Life-threatening laboratory results" },
      { id: "drug_interactions", label: "Drug Interactions", description: "Medication safety alerts" },
      { id: "allergy_alerts", label: "Allergy Alerts", description: "Patient allergy warnings" }
    ]
  };

  const deliveryChannels = [
    { id: "inApp", label: "In-App", icon: Bell, description: "Notifications within the application" },
    { id: "email", label: "Email", icon: Mail, description: "Email notifications to registered address" },
    { id: "sms", label: "SMS", icon: MessageSquare, description: "Text messages to mobile number" },
    { id: "push", label: "Push", icon: Smartphone, description: "Mobile push notifications" }
  ];

  const handleSave = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const getSpecialtyIcon = () => {
    switch (specialty) {
      case "cardiology": return Heart;
      case "neurology": return Brain;
      case "ophthalmology": return Eye;
      default: return Stethoscope;
    }
  };

  const SpecialtyIcon = getSpecialtyIcon();

  return (
    <div className="space-y-6">
      {/* Delivery Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <Bell className="h-5 w-5" />
            Delivery Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliveryChannels.map((channel) => (
              <Card key={channel.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-x-2">
                      <channel.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{channel.label}</span>
                    </div>
                    <Switch
                      checked={settings[channel.id as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, [channel.id]: checked }))
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {channel.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {[
              { key: "criticalAlerts", label: "Critical Alerts", description: "Life-threatening conditions and emergencies", priority: "critical" },
              { key: "patientUpdates", label: "Patient Updates", description: "Status changes and care plan modifications", priority: "high" },
              { key: "labResults", label: "Lab Results", description: "Laboratory and diagnostic test results", priority: "medium" },
              { key: "appointments", label: "Appointments", description: "Scheduling and appointment reminders", priority: "medium" },
              { key: "aiInsights", label: "AI Insights", description: "ML-powered clinical recommendations", priority: "low" },
              { key: "systemUpdates", label: "System Updates", description: "Application updates and maintenance", priority: "low" }
            ].map((type) => (
              <div key={type.key} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    type.priority === 'critical' ? 'bg-critical' :
                    type.priority === 'high' ? 'bg-warning' :
                    type.priority === 'medium' ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                  <div>
                    <Label className="font-medium">{type.label}</Label>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[type.key as keyof typeof settings] as boolean}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, [type.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specialty-Specific Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <SpecialtyIcon className="h-5 w-5" />
            {specialty.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())} Alerts
            <Badge variant="secondary" className="ml-2">Specialty</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Enable Specialty Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts specific to {specialty} practice
              </p>
            </div>
            <Switch
              checked={settings.specialtyAlerts}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, specialtyAlerts: checked }))
              }
            />
          </div>

          {settings.specialtyAlerts && (
            <div className="space-y-3">
              {specialtyAlerts[specialty]?.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div>
                    <Label className="font-medium">{alert.label}</Label>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Timing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <Clock className="h-5 w-5" />
            Delivery Timing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quiet Hours */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">
                  Suppress non-critical notifications during specified hours
                </p>
              </div>
              <Switch
                checked={settings.quietHours}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, quietHours: checked }))
                }
              />
            </div>

            {settings.quietHours && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={settings.quietStart}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, quietStart: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={settings.quietEnd}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, quietEnd: e.target.value }))
                    }
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label>Emergency Override</Label>
                <p className="text-sm text-muted-foreground">
                  Critical alerts bypass quiet hours
                </p>
              </div>
              <Switch
                checked={settings.emergencyOverride}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, emergencyOverride: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          {/* Delivery Delays */}
          <div className="space-y-4">
            <h3 className="font-medium">Notification Delays</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Routine Notifications (minutes)</Label>
                <Slider
                  value={[settings.routineDelay]}
                  onValueChange={([value]) => 
                    setSettings(prev => ({ ...prev, routineDelay: value }))
                  }
                  max={60}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Immediate</span>
                  <span>{settings.routineDelay} min</span>
                  <span>1 hour</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Digest Frequency</Label>
                <Select 
                  value={settings.digestFrequency} 
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, digestFrequency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sound & Vibration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <Volume2 className="h-5 w-5" />
            Sound & Vibration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Sound Notifications</Label>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, soundEnabled: checked }))
                  }
                />
              </div>

              {settings.soundEnabled && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Volume</Label>
                    <Slider
                      value={[settings.volume]}
                      onValueChange={([value]) => 
                        setSettings(prev => ({ ...prev, volume: value }))
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Silent</span>
                      <span>{settings.volume}%</span>
                      <span>Max</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Notification Tone</Label>
                    <Select 
                      value={settings.customTone} 
                      onValueChange={(value) => 
                        setSettings(prev => ({ ...prev, customTone: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="gentle">Gentle</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="medical">Medical Beep</SelectItem>
                        <SelectItem value="custom">Custom Upload</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Vibration</Label>
                  <p className="text-sm text-muted-foreground">
                    Mobile device vibration for alerts
                  </p>
                </div>
                <Switch
                  checked={settings.vibrationEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, vibrationEnabled: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-x-2">
          <Save className="h-4 w-4" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
}