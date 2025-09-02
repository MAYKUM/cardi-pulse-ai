import { 
  Eye, 
  MoreHorizontal, 
  MapPin, 
  Video,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  getDashboardCardsConfig,
  getQuickActionsConfig,
  patientTableColumns,
  recentPatientsData,
  todayScheduleConfig
} from "@/config/app-config";
import { useNavigate } from "react-router-dom";


const EnhancedDashboard = memo(function EnhancedDashboard() {
  const navigate = useNavigate();
  
  // Optimize critical path calculations with useMemo
  const { userType, dashboardCardsConfig, quickActions } = useMemo(() => {
    const specialty = window.location.pathname.split('/')[1];
    const userType = specialty === 'cardiology' ? 'cardio' 
      : specialty === 'neurology' ? 'neurology'
      : specialty === 'orthopedics' ? 'orthopedics'
      : specialty === 'ophthalmology' ? 'ophthalmology'
      : 'generic';
      
    return {
      userType,
      dashboardCardsConfig: getDashboardCardsConfig(userType),
      quickActions: getQuickActionsConfig(userType)
    };
  }, []);

  const getStatusBadgeVariant = useCallback((status: string) => {
    switch (status) {
      case "active": return "default";
      case "follow-up": return "secondary";
      case "stable": return "outline";
      case "critical": return "destructive";
      default: return "secondary";
    }
  }, []);

  const getScheduleStatusBadge = useCallback((status: string) => {
    switch (status) {
      case "confirmed": return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case "pending": return <Badge variant="secondary">Pending</Badge>;
      case "urgent": return <Badge variant="destructive">Urgent</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardCardsConfig.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {card.delta.includes("+") ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-muted-foreground" />
                    )}
                    <p className="text-xs text-muted-foreground">{card.delta}</p>
                  </div>
                </div>
                <card.icon className={`h-8 w-8 ${card.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients Table - spans 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPatientsData.map((patient) => (
                    <TableRow 
                      key={patient.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      <TableCell>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-foreground">
                            {patient.initials}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(patient.status)}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/patients/${patient.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                              <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                              <DropdownMenuItem>View History</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-20 p-4 flex flex-col items-center justify-center space-y-2 ${action.color}`}
                    onClick={() => navigate(action.href)}
                  >
                    <action.icon className="h-5 w-5" />
                    <div className="text-center">
                      <p className="text-sm font-medium">{action.title}</p>
                      <p className="text-xs opacity-75">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayScheduleConfig.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer"
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-mono font-medium">
                        {appointment.time}
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {appointment.patientInitials}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{appointment.patientName}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-muted-foreground">{appointment.type}</p>
                          {appointment.location === 'telehealth' ? (
                            <Video className="h-3 w-3 text-accent" />
                          ) : (
                            <MapPin className="h-3 w-3 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {getScheduleStatusBadge(appointment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export { EnhancedDashboard };