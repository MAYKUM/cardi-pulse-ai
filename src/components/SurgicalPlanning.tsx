import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Wrench, Package, Clock, Users, AlertTriangle } from 'lucide-react';

interface Implant {
  id: string;
  name: string;
  manufacturer: string;
  size: string;
  material: string;
  inStock: boolean;
}

interface SurgicalStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  critical: boolean;
}

export const SurgicalPlanning: React.FC = () => {
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [selectedImplant, setSelectedImplant] = useState<string>('');

  const availableImplants: Implant[] = [
    {
      id: 'imp-001',
      name: 'DePuy Synthes LCP Distal Femur Plate',
      manufacturer: 'DePuy Synthes',
      size: '9-hole, Left',
      material: 'Titanium',
      inStock: true
    },
    {
      id: 'imp-002',
      name: 'Stryker Gamma3 Nail',
      manufacturer: 'Stryker',
      size: '11mm x 180mm',
      material: 'Titanium',
      inStock: true
    },
    {
      id: 'imp-003',
      name: 'Zimmer Biomet NCB Plate',
      manufacturer: 'Zimmer Biomet',
      size: '7-hole, Right',
      material: 'Stainless Steel',
      inStock: false
    }
  ];

  const surgicalSteps: SurgicalStep[] = [
    {
      id: 1,
      title: 'Patient Positioning & Draping',
      description: 'Position patient supine on radiolucent table. Ensure C-arm access.',
      duration: 15,
      critical: false
    },
    {
      id: 2,
      title: 'Surgical Approach',
      description: 'Lateral approach to distal femur. Identify vastus lateralis muscle.',
      duration: 20,
      critical: true
    },
    {
      id: 3,
      title: 'Fracture Reduction',
      description: 'Achieve anatomical reduction using traction and manipulation.',
      duration: 30,
      critical: true
    },
    {
      id: 4,
      title: 'Plate Positioning',
      description: 'Position LCP plate on lateral aspect of distal femur.',
      duration: 25,
      critical: true
    },
    {
      id: 5,
      title: 'Screw Insertion',
      description: 'Insert locking screws in distal fragment, cortical screws proximally.',
      duration: 40,
      critical: true
    },
    {
      id: 6,
      title: 'Fluoroscopic Confirmation',
      description: 'Confirm reduction and hardware position with C-arm.',
      duration: 10,
      critical: true
    },
    {
      id: 7,
      title: 'Closure',
      description: 'Layer closure with sutures. Apply sterile dressing.',
      duration: 15,
      critical: false
    }
  ];

  const totalDuration = surgicalSteps.reduce((sum, step) => sum + step.duration, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Surgical Planning</h1>
          <p className="text-muted-foreground">Pre-operative planning and templating tools</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule OR
          </Button>
          <Button size="sm">
            <Package className="w-4 h-4 mr-2" />
            Order Implants
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Planning Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Procedure Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Procedure Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="procedure">Primary Procedure</Label>
                  <Select value={selectedProcedure} onValueChange={setSelectedProcedure}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select procedure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orif-femur">ORIF Distal Femur Fracture</SelectItem>
                      <SelectItem value="thr">Total Hip Replacement</SelectItem>
                      <SelectItem value="tkr">Total Knee Replacement</SelectItem>
                      <SelectItem value="spine-fusion">Lumbar Spine Fusion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="surgeon">Primary Surgeon</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select surgeon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-sharma">Dr. Sharma</SelectItem>
                      <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                      <SelectItem value="dr-kumar">Dr. Kumar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Procedure Notes</Label>
                <Textarea 
                  id="notes"
                  placeholder="Enter specific notes for this procedure..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 3D Planning Viewer */}
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                3D Planning Viewer
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="relative h-full bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-muted rounded-lg flex items-center justify-center">
                    <Wrench className="w-8 h-8" />
                  </div>
                  <p>3D Bone Model & Implant Templating</p>
                  <p className="text-sm mt-2">Interactive planning workspace</p>
                </div>
                
                {/* Template overlay indicators */}
                <div className="absolute top-4 left-4 space-y-2">
                  <Badge variant="secondary">Bone Model Loaded</Badge>
                  <Badge variant="outline">Implant Template Ready</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Surgical Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Surgical Steps
                </span>
                <Badge variant="outline">
                  Total: {totalDuration} minutes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {surgicalSteps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                      {step.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{step.title}</h4>
                        {step.critical && (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {step.duration}min
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Implant Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Implant Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="implant">Primary Implant</Label>
                <Select value={selectedImplant} onValueChange={setSelectedImplant}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select implant" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableImplants.map((implant) => (
                      <SelectItem key={implant.id} value={implant.id}>
                        {implant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedImplant && (
                <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                  {(() => {
                    const implant = availableImplants.find(i => i.id === selectedImplant);
                    if (!implant) return null;
                    return (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">Manufacturer</p>
                          <p className="font-medium">{implant.manufacturer}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Size</p>
                          <p className="font-medium">{implant.size}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Material</p>
                          <p className="font-medium">{implant.material}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Availability</span>
                          <Badge variant={implant.inStock ? "default" : "destructive"}>
                            {implant.inStock ? "In Stock" : "Order Required"}
                          </Badge>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Team Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Surgical Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Primary Surgeon</Label>
                <p className="text-sm font-medium">Dr. Rajesh Sharma</p>
              </div>
              <div>
                <Label>Assistant Surgeon</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assistant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                    <SelectItem value="dr-kumar">Dr. Kumar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Anesthesiologist</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select anesthesiologist" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-singh">Dr. Singh</SelectItem>
                    <SelectItem value="dr-reddy">Dr. Reddy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>OR Nurse</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select OR nurse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nurse-mary">Nurse Mary</SelectItem>
                    <SelectItem value="nurse-sarah">Nurse Sarah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pre-op Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Pre-op Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="consent" className="rounded" />
                <Label htmlFor="consent" className="text-sm">Surgical consent signed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="imaging" className="rounded" />
                <Label htmlFor="imaging" className="text-sm">Imaging reviewed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="labs" className="rounded" />
                <Label htmlFor="labs" className="text-sm">Lab results reviewed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="anesthesia" className="rounded" />
                <Label htmlFor="anesthesia" className="text-sm">Anesthesia clearance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="implants" className="rounded" />
                <Label htmlFor="implants" className="text-sm">Implants available</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};