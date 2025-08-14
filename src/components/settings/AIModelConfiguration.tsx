import React, { useState } from "react";
import { 
  Cpu, 
  BarChart3, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity,
  TrendingUp,
  Database,
  Lock,
  Eye,
  Save,
  RefreshCw,
  Upload
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const aiModels = [
  {
    id: "cardiac-diagnosis",
    name: "Cardiac Diagnosis AI",
    specialty: "cardiology",
    version: "v2.1.3",
    status: "active",
    accuracy: 94.5,
    lastTrained: "2024-01-15",
    parameters: {
      confidence_threshold: 0.85,
      sensitivity: 0.92,
      specificity: 0.88
    }
  },
  {
    id: "neuro-analysis",
    name: "Neurological Analysis AI",
    specialty: "neurology", 
    version: "v1.8.7",
    status: "active",
    accuracy: 91.2,
    lastTrained: "2024-01-10",
    parameters: {
      confidence_threshold: 0.80,
      sensitivity: 0.89,
      specificity: 0.85
    }
  },
  {
    id: "ophthalmic-screening",
    name: "Ophthalmic Screening AI",
    specialty: "ophthalmology",
    version: "v1.5.2",
    status: "active",
    accuracy: 96.1,
    lastTrained: "2024-01-12",
    parameters: {
      confidence_threshold: 0.90,
      sensitivity: 0.95,
      specificity: 0.91
    }
  },
  {
    id: "general-triage",
    name: "General Triage AI",
    specialty: "general",
    version: "v3.0.1",
    status: "beta",
    accuracy: 87.8,
    lastTrained: "2024-01-18",
    parameters: {
      confidence_threshold: 0.75,
      sensitivity: 0.84,
      specificity: 0.82
    }
  }
];

const performanceMetrics = [
  { label: "Accuracy", value: 93.2, trend: "+2.1%", color: "success" },
  { label: "Precision", value: 91.8, trend: "+1.5%", color: "success" },
  { label: "Recall", value: 89.4, trend: "-0.3%", color: "warning" },
  { label: "F1 Score", value: 90.6, trend: "+1.8%", color: "success" }
];

const versionHistory = [
  { version: "v2.1.3", date: "2024-01-15", changes: "Improved ECG analysis accuracy", status: "current" },
  { version: "v2.1.2", date: "2024-01-08", changes: "Enhanced arrhythmia detection", status: "archived" },
  { version: "v2.1.1", date: "2024-01-01", changes: "Bug fixes and performance optimizations", status: "archived" },
  { version: "v2.1.0", date: "2023-12-15", changes: "Major algorithm update", status: "archived" }
];

export function AIModelConfiguration() {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [approvalRequired, setApprovalRequired] = useState(false);

  const handleParameterChange = (parameter: string, value: number) => {
    setSelectedModel(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [parameter]: value
      }
    }));
    setPendingChanges(true);
  };

  const handleSaveChanges = () => {
    setApprovalRequired(true);
    toast({
      title: "Changes submitted for approval",
      description: "Model configuration changes require administrative approval.",
    });
  };

  const handleApproveChanges = () => {
    setPendingChanges(false);
    setApprovalRequired(false);
    toast({
      title: "Changes approved and deployed",
      description: "Model configuration has been updated successfully.",
    });
  };

  const handleRetrainModel = () => {
    toast({
      title: "Model retraining initiated",
      description: "The model will be retrained with the latest data. This may take several hours.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin Access Warning */}
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          <strong>Admin Only:</strong> AI model configuration requires administrative privileges. 
          All changes are logged and require approval before deployment.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Model Configuration</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="versions">Version History</TabsTrigger>
          <TabsTrigger value="approval">Change Approval</TabsTrigger>
        </TabsList>

        {/* Model Configuration Tab */}
        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Model Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                  <Cpu className="h-5 w-5" />
                  AI Models
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiModels.map((model) => (
                  <div
                    key={model.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedModel.id === model.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{model.name}</h3>
                      <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                        {model.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Version:</span>
                        <span>{model.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span>{model.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Model Parameters */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                  <Settings className="h-5 w-5" />
                  {selectedModel.name} Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Confidence Threshold</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Minimum confidence level for predictions
                      </p>
                      <Slider
                        value={[selectedModel.parameters.confidence_threshold]}
                        onValueChange={([value]) => handleParameterChange('confidence_threshold', value)}
                        min={0.5}
                        max={1.0}
                        step={0.01}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>0.5</span>
                        <span>{selectedModel.parameters.confidence_threshold.toFixed(2)}</span>
                        <span>1.0</span>
                      </div>
                    </div>

                    <div>
                      <Label>Sensitivity</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        True positive rate (recall)
                      </p>
                      <Slider
                        value={[selectedModel.parameters.sensitivity]}
                        onValueChange={([value]) => handleParameterChange('sensitivity', value)}
                        min={0.5}
                        max={1.0}
                        step={0.01}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>0.5</span>
                        <span>{selectedModel.parameters.sensitivity.toFixed(2)}</span>
                        <span>1.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Specificity</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        True negative rate
                      </p>
                      <Slider
                        value={[selectedModel.parameters.specificity]}
                        onValueChange={([value]) => handleParameterChange('specificity', value)}
                        min={0.5}
                        max={1.0}
                        step={0.01}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>0.5</span>
                        <span>{selectedModel.parameters.specificity.toFixed(2)}</span>
                        <span>1.0</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Model Status</Label>
                      <Select defaultValue={selectedModel.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="beta">Beta Testing</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {pendingChanges && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      You have unsaved changes. These modifications require approval before deployment.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handleRetrainModel}
                    className="flex items-center gap-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Retrain Model
                  </Button>
                  
                  <div className="space-x-2">
                    <Button 
                      variant="outline"
                      disabled={!pendingChanges}
                    >
                      Reset Changes
                    </Button>
                    <Button 
                      onClick={handleSaveChanges}
                      disabled={!pendingChanges}
                      className="flex items-center gap-x-2"
                    >
                      <Save className="h-4 w-4" />
                      Submit for Approval
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Metrics Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <Badge 
                      variant={metric.color === 'success' ? 'default' : 'secondary'}
                      className={metric.color === 'success' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}
                    >
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span className="text-2xl font-bold">{metric.value}%</span>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <Progress value={metric.value} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <BarChart3 className="h-5 w-5" />
                Detailed Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Model Accuracy Over Time</h3>
                    <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">Performance Chart Placeholder</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Prediction Distribution</h3>
                    <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">Distribution Chart Placeholder</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Version History Tab */}
        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Clock className="h-5 w-5" />
                Model Version History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {versionHistory.map((version, index) => (
                  <div key={version.version} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        version.status === 'current' ? 'bg-success' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <div className="flex items-center gap-x-2">
                          <span className="font-medium">{version.version}</span>
                          {version.status === 'current' && (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{version.changes}</p>
                        <p className="text-xs text-muted-foreground">{version.date}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {version.status !== 'current' && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Rollback
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Change Approval Tab */}
        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <CheckCircle className="h-5 w-5" />
                Change Approval Workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {approvalRequired ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Changes to {selectedModel.name} are pending approval. Review the changes below and approve or reject.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    No pending changes requiring approval.
                  </AlertDescription>
                </Alert>
              )}

              {approvalRequired && (
                <Card className="border-warning">
                  <CardHeader>
                    <CardTitle className="text-warning">Pending Changes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Model: {selectedModel.name}</Label>
                      <p className="text-sm text-muted-foreground">Version: {selectedModel.version}</p>
                    </div>
                    
                    <div>
                      <Label>Parameter Changes:</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>Confidence Threshold:</span>
                          <span>{selectedModel.parameters.confidence_threshold.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sensitivity:</span>
                          <span>{selectedModel.parameters.sensitivity.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Specificity:</span>
                          <span>{selectedModel.parameters.specificity.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Approval Notes:</Label>
                      <Textarea 
                        placeholder="Add notes about this change request..."
                        className="mt-2"
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Reject Changes</Button>
                      <Button onClick={handleApproveChanges}>Approve & Deploy</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Approval History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Parameter Update - v2.1.3</p>
                        <p className="text-sm text-muted-foreground">Approved by Dr. Admin on 2024-01-15</p>
                      </div>
                      <Badge variant="default" className="bg-success text-success-foreground">
                        Approved
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Algorithm Update - v2.1.2</p>
                        <p className="text-sm text-muted-foreground">Approved by Dr. Admin on 2024-01-08</p>
                      </div>
                      <Badge variant="default" className="bg-success text-success-foreground">
                        Approved
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}