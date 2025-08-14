import React, { useState } from "react";
import { 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Database, 
  Clock, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const dataCategories = [
  {
    id: "personal",
    name: "Personal Information",
    icon: User,
    description: "Name, contact details, demographics",
    size: "2.3 KB",
    lastUpdated: "2024-01-15",
    records: 1,
    dataTypes: ["Profile", "Contact", "Preferences"]
  },
  {
    id: "medical",
    name: "Medical Records",
    icon: Activity,
    description: "Patient data, diagnoses, treatment history",
    size: "45.7 MB",
    lastUpdated: "2024-01-20",
    records: 1247,
    dataTypes: ["Diagnoses", "Lab Results", "Prescriptions", "Imaging"]
  },
  {
    id: "system",
    name: "System Activity",
    icon: Database,
    description: "Login logs, system usage, audit trails",
    size: "15.2 MB",
    lastUpdated: "2024-01-20",
    records: 8934,
    dataTypes: ["Login History", "Audit Logs", "Usage Analytics"]
  },
  {
    id: "ai",
    name: "AI Interactions",
    icon: Eye,
    description: "AI model queries, analysis results",
    size: "8.9 MB",
    lastUpdated: "2024-01-20",
    records: 456,
    dataTypes: ["Model Queries", "Analysis Results", "Training Data"]
  }
];

const exportFormats = [
  { value: "json", label: "JSON", description: "Machine-readable format" },
  { value: "csv", label: "CSV", description: "Spreadsheet compatible" },
  { value: "pdf", label: "PDF", description: "Human-readable report" },
  { value: "xml", label: "XML", description: "Structured data format" }
];

const retentionPolicies = [
  {
    category: "Personal Data",
    period: "7 years",
    basis: "DPDP Act 2023",
    status: "compliant"
  },
  {
    category: "Medical Records",
    period: "10 years",
    basis: "Medical Council Guidelines",
    status: "compliant"
  },
  {
    category: "System Logs",
    period: "2 years",
    basis: "Security Requirements", 
    status: "compliant"
  },
  {
    category: "AI Training Data",
    period: "3 years",
    basis: "ML Compliance Policy",
    status: "compliant"
  }
];

export function DataManagement() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = async (categoryId: string, format: string) => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast({
            title: "Export Complete",
            description: `Data exported successfully in ${format.toUpperCase()} format.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDeleteData = (categoryId: string) => {
    toast({
      title: "Data Deletion Requested",
      description: "Your request will be processed within 30 days as per DPDP guidelines.",
    });
  };

  const handleCorrectData = (categoryId: string) => {
    toast({
      title: "Data Correction Available",
      description: "You can update your information in the respective sections.",
    });
  };

  return (
    <div className="space-y-6">
      {/* DPDP Compliance Header */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          This section complies with the Digital Personal Data Protection (DPDP) Act, 2023. 
          You have the right to access, correct, and erase your personal data.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="access" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="access">Data Access</TabsTrigger>
          <TabsTrigger value="export">Data Export</TabsTrigger>
          <TabsTrigger value="correction">Data Correction</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
        </TabsList>

        {/* Data Access Tab */}
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Eye className="h-5 w-5" />
                Your Data Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataCategories.map((category) => (
                  <Card key={category.id} className="border-2 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-x-2">
                          <category.icon className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">{category.name}</h3>
                        </div>
                        <Badge variant="secondary">{category.records} records</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {category.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Data Size:</span>
                          <span className="font-medium">{category.size}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Updated:</span>
                          <span className="font-medium">{category.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-muted-foreground">Data Types:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.dataTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleExportData(category.id, 'json')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Export Tab */}
        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Download className="h-5 w-5" />
                Export Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Data exports are provided in machine-readable formats as required by DPDP Act, 2023.
                  Exports may take a few minutes to generate.
                </AlertDescription>
              </Alert>

              {isExporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Preparing export...</span>
                    <span>{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="w-full" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportFormats.map((format) => (
                  <Card key={format.value} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{format.label}</h3>
                        <Badge variant="outline">{format.value.toUpperCase()}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {format.description}
                      </p>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" disabled={isExporting}>
                            Export All Data ({format.label})
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Export Data Confirmation</DialogTitle>
                            <DialogDescription>
                              This will export all your data in {format.label} format. 
                              The export will include all categories and may contain sensitive information.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button 
                              onClick={() => handleExportData('all', format.value)}
                              className="w-full"
                            >
                              Confirm Export
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Correction Tab */}
        <TabsContent value="correction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Edit className="h-5 w-5" />
                Correct Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  You have the right to correct inaccurate or incomplete personal data. 
                  Changes will be reflected across all systems within 72 hours.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {dataCategories.filter(cat => cat.id !== 'system').map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                          <category.icon className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => handleCorrectData(category.id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Retention Tab */}
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Clock className="h-5 w-5" />
                Data Retention Policies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  Data retention periods are governed by Indian healthcare regulations and DPDP Act, 2023. 
                  Data is automatically purged after the retention period expires.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {retentionPolicies.map((policy, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-x-2 mb-1">
                            <h3 className="font-medium">{policy.category}</h3>
                            <Badge 
                              variant={policy.status === 'compliant' ? 'default' : 'secondary'}
                              className="bg-success text-success-foreground"
                            >
                              {policy.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Retention Period: <span className="font-medium">{policy.period}</span></p>
                            <p>Legal Basis: <span className="font-medium">{policy.basis}</span></p>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-x-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <h3 className="font-medium text-destructive mb-1">Request Data Deletion</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        You can request deletion of your personal data. This action cannot be undone and 
                        may affect your access to medical services.
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Request Data Deletion
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Data Deletion Request</DialogTitle>
                            <DialogDescription>
                              This will request deletion of all your personal data. Medical records required by law 
                              will be retained for the minimum legal period. This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button 
                              variant="destructive"
                              onClick={() => handleDeleteData('all')}
                            >
                              Confirm Deletion Request
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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