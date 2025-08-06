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
  Microscope,
  Pill,
  ClipboardList,
  Monitor,
  UserCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserType } from "@/contexts/AuthContext";

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

// Specialty-specific configurations
const cardioNavigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/", icon: Heart },
      { name: "Patients", href: "/patients", icon: Users },
      { name: "New Patient", href: "/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/appointments", icon: Calendar, count: 8 },
    ]
  },
  {
    title: "Diagnostics & Reports",
    items: [
      { name: "ECG Analysis", href: "/ecg", icon: Activity, count: 2 },
      { name: "Echo Reports", href: "/echo", icon: Stethoscope, count: 3 },
      { name: "Lab Results", href: "/lab", icon: FileText, count: 1 },
      { name: "DICOM Viewer", href: "/imaging", icon: Camera },
    ]
  },
  {
    title: "Telecardiology & Integration",
    items: [
      { name: "Telecardiology", href: "/telehealth", icon: Stethoscope },
      { name: "Device Integration", href: "/devices", icon: Settings },
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

const genericNavigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/", icon: Monitor },
      { name: "Patients", href: "/patients", icon: Users },
      { name: "New Patient", href: "/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/appointments", icon: Calendar, count: 8 },
    ]
  },
  {
    title: "Diagnostics & Reports",
    items: [
      { name: "Lab Results", href: "/lab", icon: FileText, count: 1 },
      { name: "Medical Imaging", href: "/imaging", icon: Camera },
      { name: "Test Reports", href: "/reports", icon: ClipboardList },
      { name: "Vital Signs", href: "/vitals", icon: Activity },
    ]
  },
  {
    title: "Telemedicine & Integration",
    items: [
      { name: "Telemedicine", href: "/telehealth", icon: Video },
      { name: "Device Integration", href: "/devices", icon: Settings },
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

const neurologyNavigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/", icon: Brain },
      { name: "Patients", href: "/patients", icon: Users },
      { name: "New Patient", href: "/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/appointments", icon: Calendar, count: 12 },
    ]
  },
  {
    title: "Neurological Diagnostics",
    items: [
      { name: "EEG Analysis", href: "/eeg", icon: Activity, count: 5 },
      { name: "Video-EEG", href: "/video-eeg", icon: Video, count: 2 },
      { name: "EMG/NCS Reports", href: "/emg", icon: Zap, count: 3 },
      { name: "Neuroimaging", href: "/imaging", icon: Camera },
    ]
  },
  {
    title: "Assessment & Monitoring",
    items: [
      { name: "Neuropsych Tests", href: "/neuropsych", icon: Brain },
      { name: "Movement Tracking", href: "/movement", icon: Activity },
      { name: "Lab Results", href: "/lab", icon: FileText, count: 4 },
      { name: "Seizure Logs", href: "/seizure-logs", icon: ClipboardList },
    ]
  },
  {
    title: "Tele-Neurology & Integration",
    items: [
      { name: "Tele-Neurology", href: "/telehealth", icon: Stethoscope },
      { name: "Device Integration", href: "/devices", icon: Settings },
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

export const getNavigationConfig = (userType: UserType): NavigationGroup[] => {
  if (userType === 'cardio') return cardioNavigationConfig;
  if (userType === 'neurology') return neurologyNavigationConfig;
  return genericNavigationConfig;
};

// Header Actions Configuration
export interface HeaderAction {
  name: string;
  icon: LucideIcon;
  type: 'tooltip' | 'popup' | 'panel';
  badge?: number;
  tooltip?: string;
  action?: string;
}

export const getHeaderActionsConfig = (userType: UserType): HeaderAction[] => [
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
    tooltip: userType === 'cardio' ? "Dr. Cardio - Cardiologist" : 
             userType === 'neurology' ? "Dr. Neurologist - Neurologist" : 
             "Dr. Generic - Physician"
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

const cardioDashboardCards: DashboardCard[] = [
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

const genericDashboardCards: DashboardCard[] = [
  {
    title: "Total Patients",
    value: 1924,
    delta: "+8 this week",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Today's Appointments",
    value: 18,
    delta: "6 remaining",
    icon: Calendar,
    color: "text-accent"
  },
  {
    title: "Lab Reports",
    value: 12,
    delta: "3 pending",
    icon: FileText,
    color: "text-warning"
  },
  {
    title: "Treatment Success",
    value: "91.8%",
    delta: "This month",
    icon: TrendingUp,
    color: "text-success"
  }
];

const neurologyDashboardCards: DashboardCard[] = [
  {
    title: "Total Patients",
    value: 1432,
    delta: "+15 this week",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Today's Appointments",
    value: 16,
    delta: "4 remaining",
    icon: Calendar,
    color: "text-accent"
  },
  {
    title: "EEG Studies",
    value: 28,
    delta: "8 pending",
    icon: Activity,
    color: "text-warning"
  },
  {
    title: "Seizure Control",
    value: "89.3%",
    delta: "This quarter",
    icon: TrendingUp,
    color: "text-success"
  }
];

export const getDashboardCardsConfig = (userType: UserType): DashboardCard[] => {
  if (userType === 'cardio') return cardioDashboardCards;
  if (userType === 'neurology') return neurologyDashboardCards;
  return genericDashboardCards;
};

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

// Mock data for recent patients
export const recentPatientsData = [
  {
    id: "P001",
    name: "Rajesh Kumar",
    age: 58,
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    status: "active",
    initials: "RK"
  },
  {
    id: "P002", 
    name: "Priya Sharma",
    age: 45,
    condition: "Arrhythmia",
    lastVisit: "2024-01-12",
    status: "follow-up",
    initials: "PS"
  },
  {
    id: "P003",
    name: "Amit Patel", 
    age: 62,
    condition: "CAD",
    lastVisit: "2024-01-10",
    status: "stable",
    initials: "AP"
  },
  {
    id: "P004",
    name: "Sarah Johnson",
    age: 39,
    condition: "Heart Failure",
    lastVisit: "2024-01-08",
    status: "critical",
    initials: "SJ"
  },
  {
    id: "P005",
    name: "David Chen",
    age: 51,
    condition: "Chest Pain",
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