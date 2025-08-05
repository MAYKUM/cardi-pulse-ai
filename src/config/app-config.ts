import { 
  Heart, 
  Users, 
  FileText, 
  Camera, 
  Activity, 
  Stethoscope, 
  Calendar,
  Settings,
  Shield,
  MessageSquare,
  UserPlus,
  Upload,
  Search,
  Zap,
  AlertTriangle,
  TrendingUp,
  Clock,
  MapPin,
  Eye,
  MoreHorizontal,
  Video,
  Brain,
  Scan,
  LayoutDashboard,
  FlaskConical,
  Smartphone
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Navigation Configuration
export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  count?: number | null;
}

export const navigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Patients", href: "/patients", icon: Users },
      { name: "New Patient", href: "/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/appointments", icon: Calendar, count: 8 },
    ]
  },
  {
    title: "Neurology Diagnostics",
    items: [
      { name: "EEG Analysis", href: "/eeg", icon: Activity, count: 2 },
      { name: "Neuroimaging", href: "/neuroimaging", icon: Scan, count: 3 },
      { name: "EMG/NCS Studies", href: "/emg", icon: Zap, count: 1 },
      { name: "Neuropsych Tests", href: "/neuropsych", icon: Brain },
      { name: "Lab Results", href: "/lab", icon: FlaskConical, count: 1 },
    ]
  },
  {
    title: "TeleNeurology & Integration",
    items: [
      { name: "TeleNeurology", href: "/telehealth", icon: Video },
      { name: "Device Integration", href: "/devices", icon: Smartphone },
      { name: "Integration Hub", href: "/integrations", icon: Zap },
    ]
  },
  {
    title: "Settings & Security",
    items: [
      { name: "Security", href: "/security", icon: Shield },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

// Header Actions Configuration
export interface HeaderAction {
  name: string;
  icon: LucideIcon;
  type: 'tooltip' | 'popup' | 'panel';
  badge?: number;
  tooltip?: string;
  action?: string;
}

export const headerActionsConfig: HeaderAction[] = [
  {
    name: "notifications",
    icon: AlertTriangle,
    type: "panel",
    badge: 3,
    tooltip: "Notifications"
  },
  {
    name: "messages",
    icon: MessageSquare,
    type: "popup",
    badge: 2,
    tooltip: "Messages"
  },
  {
    name: "profile",
    icon: Users,
    type: "tooltip",
    tooltip: "Dr. Cardio - Cardiologist"
  }
];

// Dashboard Top Cards Configuration
export interface DashboardCard {
  title: string;
  value: string | number;
  delta: string;
  icon: LucideIcon;
  color: string;
}

export const dashboardCardsConfig: DashboardCard[] = [
  {
    title: "Total Patients",
    value: 2847,
    delta: "+12 this week",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Today's Appointments",
    value: 24,
    delta: "8 remaining",
    icon: Calendar,
    color: "text-accent"
  },
  {
    title: "Critical Alerts",
    value: 5,
    delta: "2 new",
    icon: AlertTriangle,
    color: "text-critical"
  },
  {
    title: "Success Rate",
    value: "94.2%",
    delta: "This month",
    icon: TrendingUp,
    color: "text-success"
  }
];

// Quick Actions Configuration
export interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

export const quickActionsConfig: QuickAction[] = [
  {
    title: "New Patient",
    description: "Register new patient",
    href: "/patients/new",
    icon: UserPlus,
    color: "bg-primary-soft text-primary"
  },
  {
    title: "Upload Images",
    description: "DICOM & medical imaging",
    href: "/upload",
    icon: Upload,
    color: "bg-accent-soft text-accent"
  },
  {
    title: "Quick Search",
    description: "Find patients/cases",
    href: "/search",
    icon: Search,
    color: "bg-success-soft text-success"
  },
  {
    title: "Schedule",
    description: "New appointment",
    href: "/appointments/new",
    icon: Calendar,
    color: "bg-warning-soft text-warning"
  },
  {
    title: "AI Analysis",
    description: "Quick AI chat interface",
    href: "/ai-analysis",
    icon: Zap,
    color: "bg-gradient-to-br from-primary to-accent text-primary-foreground"
  },
  {
    title: "Emergency",
    description: "Critical procedures",
    href: "/emergency",
    icon: AlertTriangle,
    color: "bg-critical-soft text-critical"
  }
];

// Recent Patients Table Configuration
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export const patientTableColumns: TableColumn[] = [
  { key: "avatar", label: "", sortable: false },
  { key: "name", label: "Patient", sortable: true },
  { key: "age", label: "Age", sortable: true },
  { key: "condition", label: "Condition", sortable: false },
  { key: "lastVisit", label: "Last Visit", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "actions", label: "", sortable: false }
];

// Today's Schedule Configuration
export interface ScheduleItem {
  id: string;
  time: string;
  patientName: string;
  patientInitials: string;
  type: string;
  location: 'in-person' | 'telehealth';
  status: 'confirmed' | 'pending' | 'urgent';
}

export const todayScheduleConfig: ScheduleItem[] = [
  {
    id: "1",
    time: "09:00",
    patientName: "Rajesh Kumar",
    patientInitials: "RK",
    type: "Consultation",
    location: "in-person",
    status: "confirmed"
  },
  {
    id: "2",
    time: "10:30",
    patientName: "Priya Sharma",
    patientInitials: "PS",
    type: "Follow-up",
    location: "telehealth",
    status: "confirmed"
  },
  {
    id: "3",
    time: "11:15",
    patientName: "Amit Patel",
    patientInitials: "AP",
    type: "Check-up",
    location: "in-person",
    status: "pending"
  },
  {
    id: "4",
    time: "14:00",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    type: "Emergency",
    location: "in-person",
    status: "urgent"
  },
  {
    id: "5",
    time: "15:30",
    patientName: "David Chen",
    patientInitials: "DC",
    type: "Consultation",
    location: "telehealth",
    status: "confirmed"
  }
];

// Mock data for recent patients - Neurology focused
export const recentPatientsData = [
  {
    id: "P001",
    name: "Rajesh Kumar",
    age: 58,
    condition: "Epilepsy",
    lastVisit: "2024-01-15",
    status: "active",
    initials: "RK"
  },
  {
    id: "P002", 
    name: "Priya Sharma",
    age: 45,
    condition: "Migraine",
    lastVisit: "2024-01-12",
    status: "follow-up",
    initials: "PS"
  },
  {
    id: "P003",
    name: "Amit Patel", 
    age: 62,
    condition: "Stroke Recovery",
    lastVisit: "2024-01-10",
    status: "stable",
    initials: "AP"
  },
  {
    id: "P004",
    name: "Sarah Johnson",
    age: 39,
    condition: "Multiple Sclerosis",
    lastVisit: "2024-01-08",
    status: "critical",
    initials: "SJ"
  },
  {
    id: "P005",
    name: "David Chen",
    age: 51,
    condition: "Parkinson's Disease",
    lastVisit: "2024-01-05",
    status: "active",
    initials: "DC"
  }
];

// Example of how to add new items:
// 1. Add to navigationConfig array in appropriate group
// 2. Add to headerActionsConfig for new header actions
// 3. Add to dashboardCardsConfig for new dashboard cards
// 4. Add to quickActionsConfig for new quick action tiles
// 5. Add to patientTableColumns for new table columns
// 6. Add to todayScheduleConfig for new schedule items