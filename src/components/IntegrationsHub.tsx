import React, { useMemo, memo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, UserType } from '@/contexts/AuthContext';
import { 
  Database, 
  Cloud, 
  Smartphone, 
  Monitor, 
  Stethoscope, 
  Activity, 
  FileText, 
  Shield,
  Zap,
  Globe,
  Heart,
  Brain
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'connected' | 'available' | 'coming-soon';
  category: string;
  userTypes?: UserType[];
}

const integrations: Integration[] = [
  // Universal integrations
  {
    id: 'epic',
    name: 'Epic EHR',
    description: 'Connect with Epic electronic health records system',
    icon: Database,
    status: 'connected',
    category: 'EHR Systems'
  },
  {
    id: 'cerner',
    name: 'Cerner PowerChart',
    description: 'Integration with Cerner healthcare information system',
    icon: FileText,
    status: 'available',
    category: 'EHR Systems'
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    description: 'Secure cloud storage for medical data and imaging',
    icon: Cloud,
    status: 'connected',
    category: 'Storage'
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Applications',
    description: 'Patient mobile apps for remote monitoring',
    icon: Smartphone,
    status: 'available',
    category: 'Patient Engagement'
  },
  {
    id: 'telemedicine',
    name: 'Telemedicine Platform',
    description: 'Video consultations and remote patient care',
    icon: Monitor,
    status: 'connected',
    category: 'Telehealth'
  },
  {
    id: 'lab-systems',
    name: 'Laboratory Systems',
    description: 'Direct integration with lab result systems',
    icon: Activity,
    status: 'available',
    category: 'Diagnostics'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy Networks',
    description: 'Electronic prescribing and medication management',
    icon: Shield,
    status: 'available',
    category: 'Pharmacy'
  },
  {
    id: 'ai-analytics',
    name: 'AI Analytics Engine',
    description: 'Advanced AI-powered medical data analysis',
    icon: Zap,
    status: 'coming-soon',
    category: 'AI & Analytics'
  },
  // Cardiology-specific
  {
    id: 'ecg-devices',
    name: 'ECG Monitoring Devices',
    description: 'Connect Holter monitors, event recorders, and ECG machines',
    icon: Heart,
    status: 'connected',
    category: 'Cardiac Devices',
    userTypes: ['cardio']
  },
  {
    id: 'echo-systems',
    name: 'Echocardiography Systems',
    description: 'Integration with ultrasound and echo imaging systems',
    icon: Activity,
    status: 'available',
    category: 'Cardiac Imaging',
    userTypes: ['cardio']
  },
  {
    id: 'cardiac-monitors',
    name: 'Cardiac Monitoring',
    description: 'Real-time cardiac telemetry and monitoring systems',
    icon: Monitor,
    status: 'connected',
    category: 'Cardiac Devices',
    userTypes: ['cardio']
  },
  // Generic medicine additions
  {
    id: 'radiology-pacs',
    name: 'Radiology PACS',
    description: 'Picture archiving and communication systems for medical imaging',
    icon: Monitor,
    status: 'available',
    category: 'Medical Imaging',
    userTypes: ['generic']
  },
  {
    id: 'neurology-devices',
    name: 'Neurology Devices',
    description: 'EEG, EMG, and other neurological monitoring equipment',
    icon: Brain,
    status: 'available',
    category: 'Neurology',
    userTypes: ['generic', 'neurology']
  },
  // Neurology-specific
  {
    id: 'eeg-systems',
    name: 'EEG Analysis Systems',
    description: 'Advanced EEG monitoring and AI-powered seizure detection',
    icon: Brain,
    status: 'connected',
    category: 'Neurological Diagnostics',
    userTypes: ['neurology']
  },
  {
    id: 'emg-ncs',
    name: 'EMG/NCS Equipment',
    description: 'Electromyography and nerve conduction study systems',
    icon: Activity,
    status: 'connected',
    category: 'Neurological Diagnostics',
    userTypes: ['neurology']
  },
  {
    id: 'video-eeg',
    name: 'Video-EEG Monitoring',
    description: 'Long-term video-EEG monitoring systems for epilepsy',
    icon: Monitor,
    status: 'available',
    category: 'Neurological Diagnostics',
    userTypes: ['neurology']
  },
  {
    id: 'seizure-tracking',
    name: 'Seizure Diary Apps',
    description: 'Patient apps for seizure logging and medication tracking',
    icon: Smartphone,
    status: 'available',
    category: 'Patient Engagement',
    userTypes: ['neurology']
  },
  {
    id: 'vital-monitors',
    name: 'Vital Sign Monitors',
    description: 'Blood pressure, temperature, and multi-parameter monitors',
    icon: Stethoscope,
    status: 'connected',
    category: 'Patient Monitoring',
    userTypes: ['generic']
  },
  // Orthopedics-specific
  {
    id: 'pacs-orthopedic',
    name: 'Orthopedic PACS',
    description: 'Specialized PACS for bone imaging and templating',
    icon: Monitor,
    status: 'connected',
    category: 'Orthopedic Imaging',
    userTypes: ['orthopedics']
  },
  {
    id: 'xray-ai',
    name: 'AI X-ray Analysis',
    description: 'AI-powered fracture detection and classification',
    icon: Brain,
    status: 'connected',
    category: 'AI Diagnostics',
    userTypes: ['orthopedics']
  },
  {
    id: 'surgical-planning',
    name: '3D Surgical Planning',
    description: 'Advanced 3D templating and surgical planning tools',
    icon: Monitor,
    status: 'available',
    category: 'Surgical Planning',
    userTypes: ['orthopedics']
  },
  {
    id: 'implant-registry',
    name: 'Joint Replacement Registry',
    description: 'Track implants and monitor long-term outcomes',
    icon: Shield,
    status: 'connected',
    category: 'Registry Systems',
    userTypes: ['orthopedics']
  },
  {
    id: 'dexa-integration',
    name: 'DEXA Scan Integration',
    description: 'Bone density measurement and osteoporosis assessment',
    icon: Activity,
    status: 'available',
    category: 'Bone Health',
    userTypes: ['orthopedics']
  },
  {
    id: 'gait-analysis',
    name: 'Gait Analysis Systems',
    description: 'Movement analysis for rehabilitation assessment',
    icon: Activity,
    status: 'available',
    category: 'Rehabilitation',
    userTypes: ['orthopedics']
  },
  {
    id: 'implant-vendors',
    name: 'Implant Vendor Networks',
    description: 'Direct integration with Stryker, DePuy, Zimmer Biomet',
    icon: Shield,
    status: 'connected',
    category: 'Supply Chain',
    userTypes: ['orthopedics']
  },
  {
    id: 'ndhm-integration',
    name: 'NDHM/ABHA Integration',
    description: 'National Digital Health Mission connectivity',
    icon: Globe,
    status: 'available',
    category: 'National Health ID',
    userTypes: ['orthopedics']
  },
  {
    id: 'rehab-tracking',
    name: 'Rehabilitation Tracking',
    description: 'Patient outcome and physiotherapy progress monitoring',
    icon: Activity,
    status: 'connected',
    category: 'Rehabilitation',
    userTypes: ['orthopedics']
  },
  {
    id: 'wearable-devices',
    name: 'Wearable Device Integration',
    description: 'Fitbit, Garmin, and medical wearables for mobility tracking',
    icon: Smartphone,
    status: 'available',
    category: 'Wearables',
    userTypes: ['orthopedics']
  }
];

// Utility functions - these are pure functions so they don't need memoization
const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
      return 'bg-success/10 text-success border-success/20';
    case 'available':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'coming-soon':
      return 'bg-muted/10 text-muted-foreground border-muted/20';
    default:
      return 'bg-muted/10 text-muted-foreground border-muted/20';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'connected':
      return 'Connected';
    case 'available':
      return 'Available';
    case 'coming-soon':
      return 'Coming Soon';
    default:
      return 'Unknown';
  }
};

const getButtonText = (status: string) => {
  switch (status) {
    case 'connected':
      return 'Configure';
    case 'available':
      return 'Connect';
    case 'coming-soon':
      return 'Learn More';
    default:
      return 'View';
  }
};

const IntegrationsHub: React.FC = memo(function IntegrationsHub() {
  const { user } = useAuth();
  
  // Memoize filtered integrations to prevent filtering on every render
  const filteredIntegrations = useMemo(() => {
    return integrations.filter(integration => {
      if (!integration.userTypes) return true; // Universal integrations
      return integration.userTypes.includes(user?.type || 'generic');
    });
  }, [user?.type]);

  // Memoize categories to prevent array recreation
  const categories = useMemo(() => {
    return Array.from(new Set(filteredIntegrations.map(integration => integration.category)));
  }, [filteredIntegrations]);

  // Memoize connected count to prevent recalculation
  const connectedCount = useMemo(() => {
    return filteredIntegrations.filter(i => i.status === 'connected').length;
  }, [filteredIntegrations]);

  // Memoize integrations by category to prevent filtering on every render
  const integrationsByCategory = useMemo(() => {
    const grouped: Record<string, Integration[]> = {};
    filteredIntegrations.forEach(integration => {
      if (!grouped[integration.category]) {
        grouped[integration.category] = [];
      }
      grouped[integration.category].push(integration);
    });
    return grouped;
  }, [filteredIntegrations]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integration Hub</h1>
          <p className="text-muted-foreground">
            Connect and manage your medical system integrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {connectedCount} Connected
          </span>
        </div>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrationsByCategory[category]?.map(integration => {
              const Icon = integration.icon;
              return (
                <IntegrationCard 
                  key={integration.id} 
                  integration={integration} 
                  Icon={Icon} 
                />
              );
            })}
          </div>
        </div>
      ))}

      {filteredIntegrations.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Integrations Available</h3>
            <p className="text-muted-foreground">
              No integrations are currently available for your specialty.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

// Memoize the integration card component to prevent unnecessary re-renders
const IntegrationCard = memo(function IntegrationCard({ 
  integration, 
  Icon 
}: { 
  integration: Integration; 
  Icon: React.ComponentType<any>; 
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{integration.name}</CardTitle>
            </div>
          </div>
          <Badge className={getStatusColor(integration.status)}>
            {getStatusText(integration.status)}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {integration.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant={integration.status === 'connected' ? 'outline' : 'default'}
          className="w-full"
          disabled={integration.status === 'coming-soon'}
        >
          {getButtonText(integration.status)}
        </Button>
      </CardContent>
    </Card>
  );
});

export { IntegrationsHub };