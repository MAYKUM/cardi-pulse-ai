import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Package, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Search,
  Filter,
  FileText,
  Target,
  Activity,
  Clock
} from 'lucide-react';

interface ImplantRecord {
  id: string;
  patientName: string;
  patientId: string;
  implantType: 'hip' | 'knee' | 'shoulder' | 'ankle';
  procedure: string;
  surgeryDate: string;
  surgeon: string;
  implantDetails: {
    manufacturer: string;
    model: string;
    size: string;
    lotNumber: string;
    serialNumber: string;
    expiryDate: string;
    material: string;
  };
  followUpSchedule: FollowUp[];
  complications: Complication[];
  functionalScores: FunctionalScore[];
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'revision-needed';
  lastFollowUp: string;
  nextFollowUp: string;
}

interface FollowUp {
  date: string;
  type: 'routine' | 'imaging' | 'complications';
  findings: string;
  functionalScore?: number;
  recommendations: string[];
}

interface Complication {
  date: string;
  type: string;
  severity: 'minor' | 'moderate' | 'major';
  treatment: string;
  resolved: boolean;
}

interface FunctionalScore {
  date: string;
  scoreType: 'Oxford' | 'WOMAC' | 'KSS' | 'HHS' | 'DASH';
  score: number;
  maxScore: number;
  interpretation: string;
}

export const JointReplacementRegistry: React.FC = () => {
  const [selectedImplant, setSelectedImplant] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const implantRecords: ImplantRecord[] = [
    {
      id: "JRR001",
      patientName: "Rajesh Kumar",
      patientId: "P001",
      implantType: "hip",
      procedure: "Total Hip Replacement",
      surgeryDate: "2023-06-15",
      surgeon: "Dr. Rajesh Orthopedic",
      implantDetails: {
        manufacturer: "DePuy Synthes",
        model: "Pinnacle Acetabular Cup",
        size: "54mm",
        lotNumber: "LOT2023456",
        serialNumber: "SN789012345",
        expiryDate: "2028-06-15",
        material: "Titanium/Polyethylene"
      },
      followUpSchedule: [
        {
          date: "2023-09-15",
          type: "routine",
          findings: "Excellent healing, no complications",
          functionalScore: 42,
          recommendations: ["Continue physiotherapy", "Weight-bearing as tolerated"]
        },
        {
          date: "2024-01-15",
          type: "imaging",
          findings: "Stable implant, good osseointegration",
          functionalScore: 44,
          recommendations: ["Return to full activities", "Annual follow-up"]
        }
      ],
      complications: [],
      functionalScores: [
        {
          date: "2024-01-15",
          scoreType: "Oxford",
          score: 44,
          maxScore: 48,
          interpretation: "Excellent"
        }
      ],
      status: "excellent",
      lastFollowUp: "2024-01-15",
      nextFollowUp: "2025-01-15"
    },
    {
      id: "JRR002",
      patientName: "Meera Patel",
      patientId: "P002",
      implantType: "knee",
      procedure: "Total Knee Replacement",
      surgeryDate: "2023-09-20",
      surgeon: "Dr. Rajesh Orthopedic",
      implantDetails: {
        manufacturer: "Stryker",
        model: "Triathlon Total Knee",
        size: "Size 3",
        lotNumber: "LOT2023789",
        serialNumber: "SN123456789",
        expiryDate: "2028-09-20",
        material: "Cobalt-Chrome/UHMWPE"
      },
      followUpSchedule: [
        {
          date: "2023-12-20",
          type: "routine",
          findings: "Good healing, mild stiffness",
          functionalScore: 78,
          recommendations: ["Intensive physiotherapy", "ROM exercises"]
        }
      ],
      complications: [
        {
          date: "2023-11-15",
          type: "Stiffness",
          severity: "minor",
          treatment: "Physiotherapy",
          resolved: true
        }
      ],
      functionalScores: [
        {
          date: "2023-12-20",
          scoreType: "KSS",
          score: 78,
          maxScore: 100,
          interpretation: "Good"
        }
      ],
      status: "good",
      lastFollowUp: "2023-12-20",
      nextFollowUp: "2024-03-20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'revision-needed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComplicationColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'major': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateDaysFromSurgery = (surgeryDate: string) => {
    const surgery = new Date(surgeryDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - surgery.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getImplantTypeIcon = (type: string) => {
    switch (type) {
      case 'hip': return '🦴';
      case 'knee': return '🦵';
      case 'shoulder': return '💪';
      case 'ankle': return '🦶';
      default: return '🔧';
    }
  };

  const filteredRecords = implantRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.implantDetails.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.implantDetails.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Joint Replacement Registry</h1>
          <p className="text-muted-foreground">Implant tracking and outcome monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Registry
          </Button>
          <Button size="sm">
            <Package className="w-4 h-4 mr-2" />
            Register Implant
          </Button>
        </div>
      </div>

      {/* Registry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Implants
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">247</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Success Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">96.2%</div>
            <p className="text-xs text-muted-foreground">Excellent outcomes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Due Follow-ups
            </CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">18</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Complications
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients, manufacturers, or models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
                <SelectItem value="revision-needed">Revision Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registry List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Implant Registry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredRecords.map((record) => (
                <div 
                  key={record.id} 
                  className="p-4 border rounded-lg hover:bg-accent/5 cursor-pointer"
                  onClick={() => setSelectedImplant(record.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getImplantTypeIcon(record.implantType)}</div>
                      <div>
                        <h4 className="font-medium">{record.patientName}</h4>
                        <p className="text-sm text-muted-foreground">{record.procedure}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Manufacturer</p>
                      <p className="font-medium">{record.implantDetails.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Surgery Date</p>
                      <p className="font-medium">{new Date(record.surgeryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Days Post-Op</p>
                      <p className="font-medium">{calculateDaysFromSurgery(record.surgeryDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Follow-up</p>
                      <p className="font-medium">{new Date(record.nextFollowUp).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {record.complications.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium">
                          {record.complications.length} complication(s)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detailed View */}
        <div className="space-y-6">
          {selectedImplant ? (
            (() => {
              const record = implantRecords.find(r => r.id === selectedImplant);
              if (!record) return null;
              
              return (
                <>
                  {/* Implant Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Implant Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Model</p>
                        <p className="font-medium">{record.implantDetails.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium">{record.implantDetails.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Material</p>
                        <p className="font-medium">{record.implantDetails.material}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Serial Number</p>
                        <p className="font-medium">{record.implantDetails.serialNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lot Number</p>
                        <p className="font-medium">{record.implantDetails.lotNumber}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Latest Functional Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Latest Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {record.functionalScores.length > 0 && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground mb-2">
                            {record.functionalScores[record.functionalScores.length - 1].score}/
                            {record.functionalScores[record.functionalScores.length - 1].maxScore}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {record.functionalScores[record.functionalScores.length - 1].scoreType} Score
                          </p>
                          <Badge className={getStatusColor(record.status)} variant="outline">
                            {record.functionalScores[record.functionalScores.length - 1].interpretation}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Complications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Complications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {record.complications.length > 0 ? (
                        record.complications.map((complication, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{complication.type}</h4>
                              <Badge className={getComplicationColor(complication.severity)}>
                                {complication.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{complication.treatment}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {complication.resolved ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <Clock className="w-4 h-4 text-yellow-600" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {complication.resolved ? 'Resolved' : 'Ongoing'}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No complications recorded</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Follow-up
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Activity className="w-4 h-4 mr-2" />
                        Record Score
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Issue
                      </Button>
                    </CardContent>
                  </Card>
                </>
              );
            })()
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Select an Implant</h3>
                <p className="text-muted-foreground">
                  Choose an implant from the registry to view detailed information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};