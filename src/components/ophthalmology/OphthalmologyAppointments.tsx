import React, { memo, useMemo, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Eye, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Plus, 
  Search, 
  Filter,
  Video,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Camera,
  Microscope,
  Target
} from 'lucide-react';
import { getSpecialtyConfig, applySpecialtyTheme } from '@/config/specialty-config';
import { format, addDays, startOfDay } from 'date-fns';

interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  patientEmail: string;
  date: Date;
  time: string;
  type: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  location: 'clinic' | 'telehealth';
  duration: number; // minutes
  notes?: string;
  reason: string;
  priority: 'routine' | 'urgent' | 'emergency';
  tests?: string[];
}

const OphthalmologyAppointments = memo(function OphthalmologyAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const specialtyConfig = useMemo(() => getSpecialtyConfig('ophthalmology'), []);

  // Apply specialty theme
  React.useEffect(() => {
    applySpecialtyTheme('ophthalmology');
  }, []);

  // Mock appointment data
  const appointments: Appointment[] = useMemo(() => [
    {
      id: 'apt001',
      patientName: 'Rajesh Kumar',
      patientAge: 58,
      patientPhone: '+91-9876543210',
      patientEmail: 'rajesh.kumar@email.com',
      date: new Date(),
      time: '09:00',
      type: 'Comprehensive Eye Exam',
      status: 'confirmed',
      location: 'clinic',
      duration: 60,
      reason: 'Annual checkup and vision assessment',
      priority: 'routine',
      tests: ['Visual Acuity', 'Tonometry', 'Fundus Exam']
    },
    {
      id: 'apt002',
      patientName: 'Priya Sharma',
      patientAge: 45,
      patientPhone: '+91-9876543211',
      patientEmail: 'priya.sharma@email.com',
      date: new Date(),
      time: '10:30',
      type: 'OCT Analysis',
      status: 'confirmed',
      location: 'clinic',
      duration: 45,
      reason: 'Macular degeneration monitoring',
      priority: 'routine',
      tests: ['OCT', 'Visual Field Test']
    },
    {
      id: 'apt003',
      patientName: 'Ahmed Khan',
      patientAge: 72,
      patientPhone: '+91-9876543212',
      patientEmail: 'ahmed.khan@email.com',
      date: new Date(),
      time: '11:30',
      type: 'Glaucoma Follow-up',
      status: 'in-progress',
      location: 'clinic',
      duration: 30,
      reason: 'IOP monitoring and medication review',
      priority: 'urgent',
      tests: ['IOP Measurement', 'Visual Field']
    },
    {
      id: 'apt004',
      patientName: 'Sunita Patel',
      patientAge: 34,
      patientPhone: '+91-9876543213',
      patientEmail: 'sunita.patel@email.com',
      date: new Date(),
      time: '14:00',
      type: 'Diabetic Retinopathy Screening',
      status: 'scheduled',
      location: 'telehealth',
      duration: 30,
      reason: 'Annual DR screening for diabetes management',
      priority: 'routine',
      tests: ['Fundus Photography', 'OCT']
    },
    {
      id: 'apt005',
      patientName: 'Vikram Singh',
      patientAge: 28,
      patientPhone: '+91-9876543214',
      patientEmail: 'vikram.singh@email.com',
      date: addDays(new Date(), 1),
      time: '09:30',
      type: 'Contact Lens Fitting',
      status: 'confirmed',
      location: 'clinic',
      duration: 45,
      reason: 'First-time contact lens consultation',
      priority: 'routine',
      tests: ['Corneal Topography', 'Tear Film Assessment']
    },
    {
      id: 'apt006',
      patientName: 'Anjali Reddy',
      patientAge: 67,
      patientPhone: '+91-9876543215',
      patientEmail: 'anjali.reddy@email.com',
      date: addDays(new Date(), 1),
      time: '15:00',
      type: 'Cataract Pre-op',
      status: 'confirmed',
      location: 'clinic',
      duration: 90,
      reason: 'Pre-operative assessment for cataract surgery',
      priority: 'urgent',
      tests: ['Biometry', 'IOL Calculations', 'Pre-op Testing']
    }
  ], []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'routine': return 'text-muted-foreground';
      case 'urgent': return 'text-warning';
      case 'emergency': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           apt.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchesDate = format(apt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchTerm, statusFilter, selectedDate]);

  const todayStats = useMemo(() => {
    const today = startOfDay(new Date());
    const todayAppointments = appointments.filter(apt => 
      format(apt.date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    );
    
    return {
      total: todayAppointments.length,
      confirmed: todayAppointments.filter(apt => apt.status === 'confirmed').length,
      completed: todayAppointments.filter(apt => apt.status === 'completed').length,
      telehealth: todayAppointments.filter(apt => apt.location === 'telehealth').length
    };
  }, [appointments]);

  const handleAppointmentClick = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Eye className="w-8 h-8" style={{ color: specialtyConfig.theme.primary }} />
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Ophthalmology Appointments
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage patient appointments and eye care scheduling
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Create a new ophthalmology appointment for a patient
                </DialogDescription>
              </DialogHeader>
              <NewAppointmentForm onClose={() => setIsNewAppointmentOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Total</p>
                <p className="text-2xl font-bold">{todayStats.total}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-success">{todayStats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-accent">{todayStats.completed}</p>
              </div>
              <Eye className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Telehealth</p>
                <p className="text-2xl font-bold">{todayStats.telehealth}</p>
              </div>
              <Video className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Quick Actions</h4>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Camera className="w-4 h-4 mr-2" />
                Fundus Photography
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Microscope className="w-4 h-4 mr-2" />
                OCT Analysis
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Visual Field Test
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients or appointment types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Appointments for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow 
                      key={appointment.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      <TableCell className="font-mono">{appointment.time}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{appointment.patientName}</p>
                          <p className="text-sm text-muted-foreground">Age {appointment.patientAge}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-muted-foreground">{appointment.duration} min</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {appointment.location === 'telehealth' ? (
                            <Video className="h-4 w-4 text-accent" />
                          ) : (
                            <MapPin className="h-4 w-4 text-primary" />
                          )}
                          <span className="capitalize">{appointment.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <AlertCircle className={`h-4 w-4 ${getPriorityColor(appointment.priority)}`} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
                  <p className="text-muted-foreground">
                    No appointments match your current filters for {format(selectedDate, 'MMMM d, yyyy')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <AppointmentDetailsDialog
          appointment={selectedAppointment}
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
});

// New Appointment Form Component
const NewAppointmentForm = memo<{ onClose: () => void }>(function NewAppointmentForm({ onClose }) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientPhone: '',
    patientEmail: '',
    date: new Date(),
    time: '',
    type: '',
    location: 'clinic',
    duration: '60',
    reason: '',
    priority: 'routine'
  });

  const appointmentTypes = [
    'Comprehensive Eye Exam',
    'OCT Analysis',
    'Glaucoma Follow-up',
    'Diabetic Retinopathy Screening',
    'Contact Lens Fitting',
    'Cataract Pre-op',
    'Visual Field Test',
    'Fundus Photography',
    'IOL Planning'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="patientName">Patient Name</Label>
          <Input
            id="patientName"
            value={formData.patientName}
            onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
            placeholder="Enter patient name"
          />
        </div>
        <div>
          <Label htmlFor="patientAge">Age</Label>
          <Input
            id="patientAge"
            type="number"
            value={formData.patientAge}
            onChange={(e) => setFormData(prev => ({ ...prev, patientAge: e.target.value }))}
            placeholder="Enter age"
          />
        </div>
        <div>
          <Label htmlFor="patientPhone">Phone</Label>
          <Input
            id="patientPhone"
            value={formData.patientPhone}
            onChange={(e) => setFormData(prev => ({ ...prev, patientPhone: e.target.value }))}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <Label htmlFor="patientEmail">Email</Label>
          <Input
            id="patientEmail"
            type="email"
            value={formData.patientEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))}
            placeholder="Enter email address"
          />
        </div>
        <div>
          <Label htmlFor="appointmentType">Appointment Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent>
              {appointmentTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clinic">Clinic</SelectItem>
              <SelectItem value="telehealth">Telehealth</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="routine">Routine</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="reason">Reason for Visit</Label>
        <Textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
          placeholder="Enter reason for appointment"
          rows={3}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Schedule Appointment</Button>
      </DialogFooter>
    </div>
  );
});

// Appointment Details Dialog Component
const AppointmentDetailsDialog = memo<{
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
}>(function AppointmentDetailsDialog({ appointment, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Appointment Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Patient</Label>
              <p className="text-lg font-semibold">{appointment.patientName}</p>
              <p className="text-sm text-muted-foreground">Age {appointment.patientAge}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Contact</Label>
              <div className="space-y-1">
                <p className="text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {appointment.patientPhone}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {appointment.patientEmail}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Date & Time</Label>
              <p className="text-lg font-semibold">
                {format(appointment.date, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-sm text-muted-foreground">{appointment.time} ({appointment.duration} min)</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Type & Location</Label>
              <p className="text-lg font-semibold">{appointment.type}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {appointment.location === 'telehealth' ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span className="capitalize">{appointment.location}</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Reason for Visit</Label>
            <p className="mt-1">{appointment.reason}</p>
          </div>

          {appointment.tests && appointment.tests.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Scheduled Tests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {appointment.tests.map((test, index) => (
                  <Badge key={index} variant="outline">
                    {test}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {appointment.notes && (
            <div>
              <Label className="text-sm font-medium">Notes</Label>
              <p className="mt-1 text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Edit Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export { OphthalmologyAppointments };