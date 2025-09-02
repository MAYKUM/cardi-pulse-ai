import { LucideIcon } from "lucide-react";
import { 
  Heart, 
  Brain, 
  Bone, 
  Eye,
  Stethoscope,
  Activity,
  Users,
  Calendar,
  FileText,
  Settings,
  Shield,
  Bell,
  User,
  Database,
  Cpu,
  Lock,
  UserCheck,
  Palette,
  Globe
} from "lucide-react";

export type SpecialtyType = 'cardiology' | 'neurology' | 'orthopedics' | 'ophthalmology' | 'general_medicine';

export interface SpecialtyTheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  icon: LucideIcon;
  name: string;
  displayName: string;
}

export interface SpecialtyFeature {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
  premium?: boolean;
}

export interface SpecialtyConfig {
  theme: SpecialtyTheme;
  features: SpecialtyFeature[];
  settingsOrder: string[];
  customTerminology: Record<string, string>;
  dashboardLayout: 'standard' | 'compact' | 'detailed';
}

// Base features available to all specialties
const BASE_FEATURES: SpecialtyFeature[] = [
  {
    id: 'patient-management',
    name: 'Patient Management',
    description: 'Comprehensive patient records and care tracking',
    icon: Users,
    enabled: true
  },
  {
    id: 'appointments',
    name: 'Appointment Scheduling',
    description: 'Schedule and manage patient appointments',
    icon: Calendar,
    enabled: true
  },
  {
    id: 'medical-records',
    name: 'Medical Records',
    description: 'Digital health records and documentation',
    icon: FileText,
    enabled: true
  },
  {
    id: 'vital-signs',
    name: 'Vital Signs Monitoring',
    description: 'Track and monitor patient vital signs',
    icon: Activity,
    enabled: true
  },
  {
    id: 'telehealth',
    name: 'Telehealth Consultations',
    description: 'Virtual patient consultations and remote care',
    icon: Globe,
    enabled: true
  }
];

// Specialty-specific themes
const SPECIALTY_THEMES: Record<SpecialtyType, SpecialtyTheme> = {
  cardiology: {
    primary: 'hsl(0, 84%, 60%)', // Red for heart
    secondary: 'hsl(0, 84%, 95%)',
    accent: 'hsl(14, 91%, 43%)',
    gradient: 'linear-gradient(135deg, hsl(0, 84%, 60%), hsl(14, 91%, 43%))',
    icon: Heart,
    name: 'cardiology',
    displayName: 'Cardiology'
  },
  neurology: {
    primary: 'hsl(220, 91%, 51%)', // Blue for brain/neural
    secondary: 'hsl(220, 91%, 95%)',
    accent: 'hsl(263, 85%, 61%)',
    gradient: 'linear-gradient(135deg, hsl(220, 91%, 51%), hsl(263, 85%, 61%))',
    icon: Brain,
    name: 'neurology',
    displayName: 'Neurology'
  },
  orthopedics: {
    primary: 'hsl(142, 76%, 36%)', // Green for bones/structure
    secondary: 'hsl(142, 76%, 95%)',
    accent: 'hsl(173, 80%, 40%)',
    gradient: 'linear-gradient(135deg, hsl(142, 76%, 36%), hsl(173, 80%, 40%))',
    icon: Bone,
    name: 'orthopedics',
    displayName: 'Orthopedics'
  },
  ophthalmology: {
    primary: 'hsl(271, 81%, 56%)', // Purple for eyes/vision
    secondary: 'hsl(271, 81%, 95%)',
    accent: 'hsl(292, 84%, 61%)',
    gradient: 'linear-gradient(135deg, hsl(271, 81%, 56%), hsl(292, 84%, 61%))',
    icon: Eye,
    name: 'ophthalmology',
    displayName: 'Ophthalmology'
  },
  general_medicine: {
    primary: 'hsl(210, 40%, 50%)', // Neutral blue-gray
    secondary: 'hsl(210, 40%, 95%)',
    accent: 'hsl(200, 70%, 40%)',
    gradient: 'linear-gradient(135deg, hsl(210, 40%, 50%), hsl(200, 70%, 40%))',
    icon: Stethoscope,
    name: 'general_medicine',
    displayName: 'General Medicine'
  }
};

// Specialty-specific features
const SPECIALTY_FEATURES: Record<SpecialtyType, SpecialtyFeature[]> = {
  cardiology: [
    {
      id: 'ecg-analysis',
      name: 'ECG Analysis',
      description: 'Advanced electrocardiogram interpretation and analysis',
      icon: Activity,
      enabled: true
    },
    {
      id: 'echo-reports',
      name: 'Echocardiography',
      description: 'Cardiac ultrasound reporting and analysis',
      icon: Heart,
      enabled: true
    },
    {
      id: 'telecardiology',
      name: 'Telecardiology',
      description: 'Remote cardiac monitoring and consultations',
      icon: Globe,
      enabled: true
    }
  ],
  neurology: [
    {
      id: 'eeg-analysis',
      name: 'EEG Analysis',
      description: 'Electroencephalogram monitoring and seizure detection',
      icon: Brain,
      enabled: true
    },
    {
      id: 'seizure-tracking',
      name: 'Seizure Tracking',
      description: 'Monitor and log seizure events and patterns',
      icon: Activity,
      enabled: true
    },
    {
      id: 'neuropsych-tests',
      name: 'Neuropsychological Testing',
      description: 'Cognitive assessment and brain function testing',
      icon: FileText,
      enabled: true
    }
  ],
  orthopedics: [
    {
      id: 'xray-analysis',
      name: 'X-ray Analysis',
      description: 'Bone imaging analysis and fracture detection',
      icon: Bone,
      enabled: true
    },
    {
      id: 'surgical-planning',
      name: 'Surgical Planning',
      description: '3D surgical planning and implant positioning',
      icon: Settings,
      enabled: true
    },
    {
      id: 'rehab-tracking',
      name: 'Rehabilitation Tracking',
      description: 'Post-surgery recovery and physical therapy monitoring',
      icon: Activity,
      enabled: true
    }
  ],
  ophthalmology: [
    {
      id: 'oct-analysis',
      name: 'OCT Analysis',
      description: 'Optical coherence tomography retinal imaging',
      icon: Eye,
      enabled: true
    },
    {
      id: 'glaucoma-suite',
      name: 'Glaucoma Suite',
      description: 'Comprehensive glaucoma monitoring and management',
      icon: Eye,
      enabled: true
    },
    {
      id: 'tele-screening',
      name: 'Tele-screening',
      description: 'Remote diabetic retinopathy and ROP screening',
      icon: Globe,
      enabled: true
    }
  ],
  general_medicine: []
};

// Standard settings order for all specialties
const BASE_SETTINGS_ORDER = [
  'preferences',
  'notifications',
  'security',
  'data',
  'ai-models',
  'integrations',
  'privacy'
];

// Custom terminology per specialty
const SPECIALTY_TERMINOLOGY: Record<SpecialtyType, Record<string, string>> = {
  cardiology: {
    'patient': 'Cardiac Patient',
    'consultation': 'Cardiac Consultation',
    'assessment': 'Cardiac Assessment',
    'monitoring': 'Cardiac Monitoring'
  },
  neurology: {
    'patient': 'Neurological Patient',
    'consultation': 'Neurological Evaluation',
    'assessment': 'Neuropsychological Assessment',
    'monitoring': 'Neural Monitoring'
  },
  orthopedics: {
    'patient': 'Orthopedic Patient',
    'consultation': 'Orthopedic Consultation',
    'assessment': 'Musculoskeletal Assessment',
    'monitoring': 'Recovery Monitoring'
  },
  ophthalmology: {
    'patient': 'Ophthalmic Patient',
    'consultation': 'Eye Examination',
    'assessment': 'Visual Assessment',
    'monitoring': 'Vision Monitoring'
  },
  general_medicine: {
    'patient': 'Patient',
    'consultation': 'Consultation',
    'assessment': 'Medical Assessment',
    'monitoring': 'Health Monitoring'
  }
};

export function getSpecialtyConfig(specialty: SpecialtyType): SpecialtyConfig {
  const theme = SPECIALTY_THEMES[specialty];
  const specialtyFeatures = SPECIALTY_FEATURES[specialty] || [];
  const allFeatures = [...BASE_FEATURES, ...specialtyFeatures];
  const customTerminology = SPECIALTY_TERMINOLOGY[specialty] || {};

  return {
    theme,
    features: allFeatures,
    settingsOrder: BASE_SETTINGS_ORDER,
    customTerminology,
    dashboardLayout: specialty === 'ophthalmology' ? 'detailed' : 'standard'
  };
}

export function applySpecialtyTheme(specialty: SpecialtyType): void {
  const theme = SPECIALTY_THEMES[specialty];
  const root = document.documentElement;
  
  // Apply CSS custom properties for the specialty theme
  root.style.setProperty('--specialty-primary', theme.primary);
  root.style.setProperty('--specialty-secondary', theme.secondary);
  root.style.setProperty('--specialty-accent', theme.accent);
  root.style.setProperty('--specialty-gradient', theme.gradient);
}

export { SPECIALTY_THEMES, BASE_FEATURES, SPECIALTY_FEATURES };