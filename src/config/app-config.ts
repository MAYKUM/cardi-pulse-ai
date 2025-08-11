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
  UserCheck,
  Target
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
      { name: "Dashboard", href: "/cardiology/dashboard", icon: Heart },
      { name: "Patients", href: "/cardiology/patients", icon: Users },
      { name: "New Patient", href: "/cardiology/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/cardiology/appointments", icon: Calendar, count: 8 },
    ]
  },
  {
    title: "Diagnostics & Reports",
    items: [
      { name: "ECG Analysis", href: "/cardiology/ecg", icon: Activity, count: 2 },
      { name: "Echo Reports", href: "/cardiology/echo", icon: Stethoscope, count: 3 },
      { name: "Lab Results", href: "/cardiology/lab", icon: FileText, count: 1 },
      { name: "DICOM Viewer", href: "/cardiology/imaging", icon: Camera },
    ]
  },
  {
    title: "Telecardiology & Integration",
    items: [
      { name: "Telecardiology", href: "/cardiology/telehealth", icon: Stethoscope },
      { name: "Device Integration", href: "/cardiology/devices", icon: Settings },
      { name: "Integration Hub", href: "/cardiology/integrations", icon: Zap },
    ]
  },
  {
    title: "Settings & Security",
    items: [
      { name: "Security", href: "/cardiology/security", icon: Shield },
      { name: "Settings", href: "/cardiology/settings", icon: Settings },
    ]
  }
];

const genericNavigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/general-medicine/dashboard", icon: Monitor },
      { name: "Patients", href: "/general-medicine/patients", icon: Users },
      { name: "New Patient", href: "/general-medicine/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/general-medicine/appointments", icon: Calendar, count: 8 },
    ]
  },
  {
    title: "Diagnostics & Reports",
    items: [
      { name: "Lab Results", href: "/general-medicine/lab", icon: FileText, count: 1 },
      { name: "Medical Imaging", href: "/general-medicine/imaging", icon: Camera },
      { name: "Test Reports", href: "/general-medicine/reports", icon: ClipboardList },
      { name: "Vital Signs", href: "/general-medicine/vitals", icon: Activity },
    ]
  },
  {
    title: "Telemedicine & Integration",
    items: [
      { name: "Telemedicine", href: "/general-medicine/telehealth", icon: Video },
      { name: "Device Integration", href: "/general-medicine/devices", icon: Settings },
      { name: "Integration Hub", href: "/general-medicine/integrations", icon: Zap },
    ]
  },
  {
    title: "Settings & Security",
    items: [
      { name: "Security", href: "/general-medicine/security", icon: Shield },
      { name: "Settings", href: "/general-medicine/settings", icon: Settings },
    ]
  }
];

const orthopedicsNavigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/orthopedics/dashboard", icon: Users },
      { name: "Patients", href: "/orthopedics/patients", icon: Users },
      { name: "New Patient", href: "/orthopedics/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/orthopedics/appointments", icon: Calendar, count: 15 },
    ]
  },
  {
    title: "Imaging & Analysis",
    items: [
      { name: "X-ray Analysis", href: "/orthopedics/xray", icon: Activity, count: 8 },
      { name: "3D Bone Viewer", href: "/orthopedics/3d-viewer", icon: Eye },
      { name: "Surgical Planning", href: "/orthopedics/surgical-planning", icon: Target },
      { name: "Medical Imaging", href: "/orthopedics/imaging", icon: Camera },
    ]
  },
  {
    title: "Treatment & Recovery",
    items: [
      { name: "Rehabilitation", href: "/orthopedics/rehab", icon: Activity },
      { name: "Fracture Healing", href: "/orthopedics/fracture-healing", icon: TrendingUp },
      { name: "Osteoporosis Risk", href: "/orthopedics/osteoporosis", icon: AlertTriangle },
      { name: "Joint Registry", href: "/orthopedics/joint-registry", icon: Pill },
    ]
  },
  {
    title: "Telemedicine & Integration",
    items: [
      { name: "Tele-Ortho", href: "/orthopedics/tele-consult", icon: Video },
      { name: "Integration Hub", href: "/orthopedics/integrations", icon: Zap },
      { name: "Lab Results", href: "/orthopedics/lab", icon: FileText, count: 4 },
    ]
  }
];

const neurologyNavigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/neurology/dashboard", icon: Brain },
      { name: "Patients", href: "/neurology/patients", icon: Users },
      { name: "New Patient", href: "/neurology/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/neurology/appointments", icon: Calendar, count: 12 },
    ]
  },
  {
    title: "Neurological Diagnostics",
    items: [
      { name: "EEG Analysis", href: "/neurology/eeg", icon: Activity, count: 5 },
      { name: "Video-EEG", href: "/neurology/video-eeg", icon: Video, count: 2 },
      { name: "EMG/NCS Reports", href: "/neurology/emg", icon: Zap, count: 3 },
      { name: "Neuroimaging", href: "/neurology/imaging", icon: Camera },
    ]
  },
  {
    title: "Assessment & Monitoring",
    items: [
      { name: "Neuropsych Tests", href: "/neurology/neuropsych", icon: Brain },
      { name: "Movement Tracking", href: "/neurology/movement", icon: Activity },
      { name: "Lab Results", href: "/neurology/lab", icon: FileText, count: 4 },
      { name: "Seizure Logs", href: "/neurology/seizure-logs", icon: ClipboardList },
    ]
  },
  {
    title: "Tele-Neurology & Integration",
    items: [
      { name: "Tele-Neurology", href: "/neurology/telehealth", icon: Stethoscope },
      { name: "Device Integration", href: "/neurology/devices", icon: Settings },
      { name: "Integration Hub", href: "/neurology/integrations", icon: Zap },
    ]
  },
  {
    title: "Settings & Security",
    items: [
      { name: "Security", href: "/neurology/security", icon: Shield },
      { name: "Settings", href: "/neurology/settings", icon: Settings },
    ]
  }
];

export const getNavigationConfig = (userType: UserType): NavigationGroup[] => {
  if (userType === 'cardio') return cardioNavigationConfig;
  if (userType === 'neurology') return neurologyNavigationConfig;
  if (userType === 'orthopedics') return orthopedicsNavigationConfig;
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

export const getQuickActionsConfig = (userType: UserType): QuickAction[] => {
  const basePath = userType === 'cardio'
    ? '/cardiology'
    : userType === 'neurology'
    ? '/neurology'
    : userType === 'orthopedics'
    ? '/orthopedics'
    : '/general-medicine';

  return [
    {
      title: "New Patient",
      description: "Register new patient",
      href: `${basePath}/patients/new`,
      icon: UserPlus,
      color: "bg-primary-soft text-primary"
    },
    {
      title: "Upload Images",
      description: "DICOM & medical imaging",
      href: `${basePath}/upload`,
      icon: Upload,
      color: "bg-accent-soft text-accent"
    },
    {
      title: "Quick Search",
      description: "Find patients/cases",
      href: `${basePath}/search`,
      icon: Search,
      color: "bg-success-soft text-success"
    },
    {
      title: "Schedule",
      description: "New appointment",
      href: `${basePath}/appointments/new`,
      icon: Calendar,
      color: "bg-warning-soft text-warning"
    },
    {
      title: "AI Analysis",
      description: "Quick AI chat interface",
      href: `${basePath}/ai-analysis`,
      icon: Zap,
      color: "bg-gradient-to-br from-primary to-accent text-primary-foreground"
    },
    {
      title: "Emergency",
      description: "Critical procedures",
      href: `${basePath}/emergency`,
      icon: AlertTriangle,
      color: "bg-critical-soft text-critical"
    }
  ];
};

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