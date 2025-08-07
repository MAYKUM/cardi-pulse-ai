import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Eye, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock patient data
const mockPatients = [
  {
    id: "P001",
    name: "Rajesh Kumar",
    age: 58,
    gender: "Male",
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    status: "active",
    phone: "+91 98765 43210",
    initials: "RK"
  },
  {
    id: "P002", 
    name: "Priya Sharma",
    age: 45,
    gender: "Female",
    condition: "Arrhythmia",
    lastVisit: "2024-01-12",
    status: "follow-up",
    phone: "+91 87654 32109",
    initials: "PS"
  },
  {
    id: "P003",
    name: "Amit Patel", 
    age: 62,
    gender: "Male",
    condition: "CAD",
    lastVisit: "2024-01-10",
    status: "stable",
    phone: "+91 76543 21098",
    initials: "AP"
  },
  {
    id: "P004",
    name: "Sarah Johnson",
    age: 39,
    gender: "Female",
    condition: "Heart Failure",
    lastVisit: "2024-01-08",
    status: "critical",
    phone: "+91 65432 10987",
    initials: "SJ"
  },
  {
    id: "P005",
    name: "David Chen",
    age: 51,
    gender: "Male",
    condition: "Chest Pain",
    lastVisit: "2024-01-05",
    status: "active",
    phone: "+91 54321 09876",
    initials: "DC"
  },
  {
    id: "P006",
    name: "Maria Rodriguez",
    age: 67,
    gender: "Female",
    condition: "Epilepsy",
    lastVisit: "2024-01-14",
    status: "active",
    phone: "+91 43210 98765",
    initials: "MR"
  },
  {
    id: "P007",
    name: "James Wilson",
    age: 42,
    gender: "Male",
    condition: "Migraine",
    lastVisit: "2024-01-11",
    status: "follow-up",
    phone: "+91 32109 87654",
    initials: "JW"
  },
  {
    id: "P008",
    name: "Lisa Thompson",
    age: 55,
    gender: "Female",
    condition: "Stroke",
    lastVisit: "2024-01-09",
    status: "recovering",
    phone: "+91 21098 76543",
    initials: "LT"
  }
];

export function PatientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user } = useAuth();
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "follow-up":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Follow-up</Badge>;
      case "critical":
        return <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">Critical</Badge>;
      case "stable":
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Stable</Badge>;
      case "recovering":
        return <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">Recovering</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNewPatient = () => {
    const basePath = user?.type === 'cardio' ? '/cardiology' : 
                     user?.type === 'neurology' ? '/neurology' : 
                     '/general-medicine';
    navigate(`${basePath}/patients/new`);
  };

  const handleViewPatient = (patientId: string) => {
    const basePath = user?.type === 'cardio' ? '/cardiology' : 
                     user?.type === 'neurology' ? '/neurology' : 
                     '/general-medicine';
    navigate(`${basePath}/patients/${patientId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage your patient records and information</p>
        </div>
        <Button onClick={handleNewPatient} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="recovering">Recovering</SelectItem>
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

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {patient.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewPatient(patient.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Patient
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Appointment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}