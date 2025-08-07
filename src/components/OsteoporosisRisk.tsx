import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, TrendingDown, Target, Activity, Calculator, FileText, Users, Calendar } from 'lucide-react';

interface PatientRiskProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  bmi: number;
  dexaScores: {
    spineT: number;
    hipT: number;
    radiusT: number;
    lastTest: string;
  };
  fraxScore: {
    tenYearHipFracture: number;
    tenYearMajorFracture: number;
    calculatedDate: string;
  };
  riskFactors: string[];
  medications: string[];
  treatmentPlan: string[];
}

interface DexaScan {
  id: string;
  date: string;
  spineT: number;
  hipT: number;
  radiusT: number;
  boneDensity: {
    spine: number;
    hip: number;
    radius: number;
  };
  diagnosis: 'normal' | 'osteopenia' | 'osteoporosis';
  notes: string;
}

export const OsteoporosisRisk: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>('patient-1');
  const [selectedView, setSelectedView] = useState<string>('overview');

  const patientProfile: PatientRiskProfile = {
    id: "patient-1",
    name: "Meera Patel",
    age: 68,
    gender: "female",
    bmi: 22.5,
    dexaScores: {
      spineT: -2.8,
      hipT: -2.2,
      radiusT: -1.9,
      lastTest: "2024-01-15"
    },
    fraxScore: {
      tenYearHipFracture: 8.5,
      tenYearMajorFracture: 22.3,
      calculatedDate: "2024-01-15"
    },
    riskFactors: [
      "Post-menopausal",
      "Family history of hip fracture",
      "Previous wrist fracture",
      "Low calcium intake",
      "Sedentary lifestyle"
    ],
    medications: [
      "Alendronate 70mg weekly",
      "Calcium carbonate 1200mg daily",
      "Vitamin D3 2000 IU daily"
    ],
    treatmentPlan: [
      "Continue bisphosphonate therapy",
      "Weight-bearing exercise program",
      "Fall prevention assessment",
      "Follow-up DEXA in 1 year"
    ]
  };

  const dexaHistory: DexaScan[] = [
    {
      id: "dexa-1",
      date: "2024-01-15",
      spineT: -2.8,
      hipT: -2.2,
      radiusT: -1.9,
      boneDensity: { spine: 0.712, hip: 0.634, radius: 0.598 },
      diagnosis: "osteoporosis",
      notes: "Severe osteoporosis with high fracture risk"
    },
    {
      id: "dexa-2",
      date: "2023-01-10",
      spineT: -2.5,
      hipT: -2.0,
      radiusT: -1.7,
      boneDensity: { spine: 0.745, hip: 0.658, radius: 0.615 },
      diagnosis: "osteoporosis",
      notes: "Progressive bone loss despite treatment"
    },
    {
      id: "dexa-3",
      date: "2022-01-08",
      spineT: -2.1,
      hipT: -1.8,
      radiusT: -1.4,
      boneDensity: { spine: 0.789, hip: 0.684, radius: 0.642 },
      diagnosis: "osteopenia",
      notes: "Initial diagnosis, treatment initiated"
    }
  ];

  const getRiskLevel = (score: number, type: 'hip' | 'major') => {
    if (type === 'hip') {
      if (score >= 3) return { level: 'high', color: 'bg-red-100 text-red-800 border-red-200' };
      if (score >= 1) return { level: 'moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
      return { level: 'low', color: 'bg-green-100 text-green-800 border-green-200' };
    } else {
      if (score >= 20) return { level: 'high', color: 'bg-red-100 text-red-800 border-red-200' };
      if (score >= 10) return { level: 'moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
      return { level: 'low', color: 'bg-green-100 text-green-800 border-green-200' };
    }
  };

  const getDiagnosisColor = (diagnosis: string) => {
    switch (diagnosis) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'osteopenia': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'osteoporosis': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTScoreColor = (score: number) => {
    if (score <= -2.5) return 'text-red-600';
    if (score <= -1.0) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Osteoporosis Risk Dashboard</h1>
          <p className="text-muted-foreground">DEXA integration and FRAX score assessment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calculator className="w-4 h-4 mr-2" />
            FRAX Calculator
          </Button>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule DEXA
          </Button>
        </div>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Patient</p>
              <p className="font-medium">{patientProfile.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age/Gender</p>
              <p className="font-medium">{patientProfile.age}Y / {patientProfile.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">BMI</p>
              <p className="font-medium">{patientProfile.bmi}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last DEXA</p>
              <p className="font-medium">{new Date(patientProfile.dexaScores.lastTest).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Diagnosis</p>
              <Badge className={getDiagnosisColor(dexaHistory[0].diagnosis)}>
                {dexaHistory[0].diagnosis}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* FRAX Score Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                FRAX Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="text-sm text-muted-foreground mb-2">10-Year Hip Fracture Risk</h3>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {patientProfile.fraxScore.tenYearHipFracture}%
                  </div>
                  <Badge className={getRiskLevel(patientProfile.fraxScore.tenYearHipFracture, 'hip').color}>
                    {getRiskLevel(patientProfile.fraxScore.tenYearHipFracture, 'hip').level} risk
                  </Badge>
                  <Progress value={patientProfile.fraxScore.tenYearHipFracture} className="mt-3" max={30} />
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="text-sm text-muted-foreground mb-2">10-Year Major Fracture Risk</h3>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {patientProfile.fraxScore.tenYearMajorFracture}%
                  </div>
                  <Badge className={getRiskLevel(patientProfile.fraxScore.tenYearMajorFracture, 'major').color}>
                    {getRiskLevel(patientProfile.fraxScore.tenYearMajorFracture, 'major').level} risk
                  </Badge>
                  <Progress value={patientProfile.fraxScore.tenYearMajorFracture} className="mt-3" max={50} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DEXA Score Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                DEXA Score Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">T-Score Overview</TabsTrigger>
                  <TabsTrigger value="history">Historical Comparison</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="text-sm text-muted-foreground mb-2">Lumbar Spine</h4>
                      <div className={`text-2xl font-bold mb-2 ${getTScoreColor(patientProfile.dexaScores.spineT)}`}>
                        {patientProfile.dexaScores.spineT}
                      </div>
                      <p className="text-xs text-muted-foreground">T-Score</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="text-sm text-muted-foreground mb-2">Hip</h4>
                      <div className={`text-2xl font-bold mb-2 ${getTScoreColor(patientProfile.dexaScores.hipT)}`}>
                        {patientProfile.dexaScores.hipT}
                      </div>
                      <p className="text-xs text-muted-foreground">T-Score</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="text-sm text-muted-foreground mb-2">Radius</h4>
                      <div className={`text-2xl font-bold mb-2 ${getTScoreColor(patientProfile.dexaScores.radiusT)}`}>
                        {patientProfile.dexaScores.radiusT}
                      </div>
                      <p className="text-xs text-muted-foreground">T-Score</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4 mt-4">
                  {dexaHistory.map((scan, index) => (
                    <div key={scan.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                        {new Date(scan.date).getFullYear()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{new Date(scan.date).toLocaleDateString()}</h4>
                          <Badge className={getDiagnosisColor(scan.diagnosis)}>
                            {scan.diagnosis}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Spine T-Score</p>
                            <p className={`font-medium ${getTScoreColor(scan.spineT)}`}>{scan.spineT}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Hip T-Score</p>
                            <p className={`font-medium ${getTScoreColor(scan.hipT)}`}>{scan.hipT}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Radius T-Score</p>
                            <p className={`font-medium ${getTScoreColor(scan.radiusT)}`}>{scan.radiusT}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{scan.notes}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patientProfile.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">{factor}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Current Treatment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patientProfile.medications.map((medication, index) => (
                <div key={index} className="p-2 bg-green-50 border border-green-200 rounded">
                  <span className="text-sm text-green-800">{medication}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Treatment Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Treatment Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patientProfile.treatmentPlan.map((plan, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm">{plan}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calculator className="w-4 h-4 mr-2" />
                Recalculate FRAX
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule DEXA
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Patient Education
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};