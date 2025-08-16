import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Phone, Clock, MapPin, Users, Heart, Brain, Activity, Zap, Shield } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  department: string;
  priority: 'primary' | 'secondary';
}

interface EmergencyProtocol {
  id: string;
  title: string;
  category: string;
  severity: 'critical' | 'urgent' | 'moderate';
  steps: string[];
  contacts: string[];
  icon: React.ComponentType<any>;
}

export const EmergencyProcedures: React.FC = () => {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [emergencyDescription, setEmergencyDescription] = useState('');

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Emergency Services',
      role: 'First Response',
      phone: '911',
      department: 'Emergency',
      priority: 'primary'
    },
    {
      id: '2',
      name: 'Dr. Sarah Wilson',
      role: 'Chief of Cardiology',
      phone: '(555) 123-4567',
      department: 'Cardiology',
      priority: 'primary'
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      role: 'Emergency Department',
      phone: '(555) 234-5678',
      department: 'Emergency',
      priority: 'primary'
    },
    {
      id: '4',
      name: 'Nursing Supervisor',
      role: 'Charge Nurse',
      phone: '(555) 345-6789',
      department: 'Nursing',
      priority: 'secondary'
    },
    {
      id: '5',
      name: 'Hospital Security',
      role: 'Security Team',
      phone: '(555) 456-7890',
      department: 'Security',
      priority: 'secondary'
    }
  ];

  const emergencyProtocols: EmergencyProtocol[] = [
    {
      id: 'cardiac_arrest',
      title: 'Cardiac Arrest',
      category: 'Cardiovascular',
      severity: 'critical',
      icon: Heart,
      steps: [
        'Call 911 immediately',
        'Begin CPR if patient is unresponsive',
        'Use AED if available',
        'Continue CPR until emergency services arrive',
        'Prepare for advanced cardiac life support'
      ],
      contacts: ['1', '2']
    },
    {
      id: 'stroke',
      title: 'Stroke/TIA',
      category: 'Neurological',
      severity: 'critical',
      icon: Brain,
      steps: [
        'Assess using FAST protocol (Face, Arms, Speech, Time)',
        'Call stroke team immediately',
        'Do not give food or drink',
        'Monitor vital signs',
        'Prepare for emergency imaging'
      ],
      contacts: ['1', '3']
    },
    {
      id: 'seizure',
      title: 'Seizure Emergency',
      category: 'Neurological',
      severity: 'urgent',
      icon: Activity,
      steps: [
        'Ensure patient safety - clear area',
        'Do not restrain or put anything in mouth',
        'Time the seizure duration',
        'Turn patient on side when convulsions stop',
        'Call for help if seizure lasts >5 minutes'
      ],
      contacts: ['3', '4']
    },
    {
      id: 'anaphylaxis',
      title: 'Anaphylaxis',
      category: 'Allergic Reaction',
      severity: 'critical',
      icon: AlertTriangle,
      steps: [
        'Administer epinephrine immediately',
        'Call 911',
        'Monitor airway and breathing',
        'Prepare for IV access',
        'Have resuscitation equipment ready'
      ],
      contacts: ['1', '3']
    },
    {
      id: 'arrhythmia',
      title: 'Dangerous Arrhythmia',
      category: 'Cardiovascular',
      severity: 'urgent',
      icon: Zap,
      steps: [
        'Assess patient consciousness and pulse',
        'Connect to cardiac monitor',
        'Prepare defibrillator if indicated',
        'Establish IV access',
        'Call cardiology team'
      ],
      contacts: ['2', '3']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'primary' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const triggerEmergencyAlert = (protocolId: string) => {
    setActiveAlert(protocolId);
    // In a real system, this would trigger actual emergency notifications
    console.log(`Emergency alert triggered for: ${protocolId}`);
  };

  const cancelAlert = () => {
    setActiveAlert(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Emergency Procedures</h1>
          <p className="text-muted-foreground">Quick access to critical emergency protocols</p>
        </div>
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Emergency Ready
        </Badge>
      </div>

      {activeAlert && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <span className="font-medium">Emergency Alert Active</span>
              <Button
                size="sm"
                variant="outline"
                onClick={cancelAlert}
                className="border-red-300"
              >
                Cancel Alert
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="protocols" className="space-y-6">
        <TabsList>
          <TabsTrigger value="protocols">Emergency Protocols</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="alert">Alert System</TabsTrigger>
          <TabsTrigger value="training">Training Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="protocols" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {emergencyProtocols.map((protocol) => {
              const Icon = protocol.icon;
              
              return (
                <Card key={protocol.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <Icon className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{protocol.title}</CardTitle>
                          <CardDescription>{protocol.category}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(protocol.severity)}>
                        {protocol.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Emergency Steps:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {protocol.steps.map((step, index) => (
                            <li key={index} className="text-muted-foreground">{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => triggerEmergencyAlert(protocol.id)}
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Activate Protocol
                        </Button>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Primary Contacts</CardTitle>
                <CardDescription>Critical emergency contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emergencyContacts.filter(c => c.priority === 'primary').map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <Phone className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.role}</p>
                          <p className="text-sm text-muted-foreground">{contact.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Phone className="mr-2 h-4 w-4" />
                          {contact.phone}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secondary Contacts</CardTitle>
                <CardDescription>Additional support contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emergencyContacts.filter(c => c.priority === 'secondary').map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Phone className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.role}</p>
                          <p className="text-sm text-muted-foreground">{contact.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          {contact.phone}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alert" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Alert System</CardTitle>
              <CardDescription>Broadcast emergency alerts to the medical team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Emergency Type</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>Select emergency type...</option>
                  {emergencyProtocols.map((protocol) => (
                    <option key={protocol.id} value={protocol.id}>
                      {protocol.title} - {protocol.category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Room number, department, or location" className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Brief description of the emergency..."
                  value={emergencyDescription}
                  onChange={(e) => setEmergencyDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-2">
                <Button className="bg-red-600 hover:bg-red-700 flex-1">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Send Emergency Alert
                </Button>
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Notify Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CPR & AED Training</CardTitle>
                <CardDescription>Basic life support certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Current certification expires: 12/2024</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Activity className="mr-2 h-4 w-4" />
                    Access Training Materials
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Drills</CardTitle>
                <CardDescription>Practice scenarios and procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Last drill: 01/10/2024</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Schedule Practice Drill
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};