import React, { useState, useEffect, memo } from 'react';
import { BaseSettings, SettingsSection } from '@/components/base/BaseSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { fetchDoctorProfile, type Specialty } from '@/hooks/useDoctorProfile';
import { SpecialtyType } from '@/config/specialty-config';
import { 
  Stethoscope, 
  Heart, 
  Brain, 
  Bone, 
  Eye, 
  Wifi, 
  Database, 
  Palette,
  Shield,
  Cpu
} from 'lucide-react';

interface StandardizedSettingsPageProps {
  specialty?: SpecialtyType;
}

const StandardizedSettingsPage = memo<StandardizedSettingsPageProps>(function StandardizedSettingsPage({
  specialty: propSpecialty
}) {
  const [activeSection, setActiveSection] = useState('preferences');
  const [specialty, setSpecialty] = useState<SpecialtyType>(propSpecialty || 'general_medicine');
  const [loading, setLoading] = useState(!propSpecialty);

  // Load doctor profile to determine specialty if not provided
  useEffect(() => {
    if (!propSpecialty) {
      const loadDoctorProfile = async () => {
        setLoading(true);
        try {
          const profile = await fetchDoctorProfile();
          if (profile?.specialty) {
            // Map the backend specialty to our SpecialtyType
            const mappedSpecialty: SpecialtyType = 
              profile.specialty === 'cardiology' ? 'cardiology' :
              profile.specialty === 'neurology' ? 'neurology' :
              profile.specialty === 'orthopedics' ? 'orthopedics' :
              profile.specialty === 'ophthalmology' ? 'ophthalmology' :
              'general_medicine';
            setSpecialty(mappedSpecialty);
          }
        } catch (error) {
          console.error('Failed to load doctor profile:', error);
        } finally {
          setLoading(false);
        }
      };
      loadDoctorProfile();
    }
  }, [propSpecialty]);

  // Specialty-specific settings sections
  const specialtySpecificSections: SettingsSection[] = (() => {
    switch (specialty) {
      case 'cardiology':
        return [
          {
            id: 'cardio-settings',
            title: 'Cardiology Settings',
            description: 'Configure cardiac monitoring and analysis preferences',
            icon: Heart,
            content: <CardiologySettings />,
          },
          {
            id: 'ecg-config',
            title: 'ECG Configuration',
            description: 'ECG analysis parameters and alert thresholds',
            icon: Stethoscope,
            content: <ECGConfiguration />,
            premiumFeature: true
          }
        ];
      
      case 'neurology':
        return [
          {
            id: 'neuro-settings',
            title: 'Neurology Settings',
            description: 'Configure EEG monitoring and seizure detection',
            icon: Brain,
            content: <NeurologySettings />,
          },
          {
            id: 'seizure-config',
            title: 'Seizure Detection',
            description: 'Seizure alert thresholds and notification settings',
            icon: Brain,
            content: <SeizureConfiguration />,
            premiumFeature: true
          }
        ];
      
      case 'orthopedics':
        return [
          {
            id: 'ortho-settings',
            title: 'Orthopedics Settings',
            description: 'Configure surgical planning and imaging preferences',
            icon: Bone,
            content: <OrthopedicsSettings />,
          },
          {
            id: 'imaging-config',
            title: 'Imaging Configuration',
            description: 'X-ray analysis and 3D reconstruction settings',
            icon: Bone,
            content: <ImagingConfiguration />,
            premiumFeature: true
          }
        ];
      
      case 'ophthalmology':
        return [
          {
            id: 'ophthal-settings',
            title: 'Ophthalmology Settings',
            description: 'Configure OCT analysis and screening preferences',
            icon: Eye,
            content: <OphthalmologySettings />,
          }
        ];
      
      default:
        return [];
    }
  })();

  if (loading) {
    return <SettingsLoadingSkeleton />;
  }

  return (
    <BaseSettings
      specialty={specialty}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      customSections={specialtySpecificSections}
      showPremiumFeatures={true}
      isAdmin={false}
    />
  );
});

// Specialty-specific settings components
const CardiologySettings = memo(function CardiologySettings() {
  const [settings, setSettings] = useState({
    autoECGAnalysis: true,
    criticalAlerts: true,
    heartRateThreshold: 100,
    arrhythmiaDetection: true
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-destructive" />
            Cardiac Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic ECG Analysis</Label>
              <p className="text-sm text-muted-foreground">Enable AI-powered ECG interpretation</p>
            </div>
            <Switch 
              checked={settings.autoECGAnalysis}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoECGAnalysis: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Critical Cardiac Alerts</Label>
              <p className="text-sm text-muted-foreground">Immediate notifications for critical conditions</p>
            </div>
            <Switch 
              checked={settings.criticalAlerts}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, criticalAlerts: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const ECGConfiguration = memo(function ECGConfiguration() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ECG Analysis Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Sensitivity Level</Label>
              <Badge variant="outline">High</Badge>
            </div>
            <div className="flex items-center justify-between">
              <Label>Artifact Filtering</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const NeurologySettings = memo(function NeurologySettings() {
  const [settings, setSettings] = useState({
    autoEEGAnalysis: true,
    seizureDetection: true,
    videoEEGRecording: false,
    alertFamily: true
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            EEG Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic EEG Analysis</Label>
              <p className="text-sm text-muted-foreground">AI-powered EEG pattern recognition</p>
            </div>
            <Switch 
              checked={settings.autoEEGAnalysis}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoEEGAnalysis: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Seizure Detection</Label>
              <p className="text-sm text-muted-foreground">Real-time seizure event detection</p>
            </div>
            <Switch 
              checked={settings.seizureDetection}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, seizureDetection: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const SeizureConfiguration = memo(function SeizureConfiguration() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Seizure Detection Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Detection Sensitivity</Label>
              <Badge variant="outline">Standard</Badge>
            </div>
            <div className="flex items-center justify-between">
              <Label>False Positive Reduction</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const OrthopedicsSettings = memo(function OrthopedicsSettings() {
  const [settings, setSettings] = useState({
    autoXrayAnalysis: true,
    fractureDetection: true,
    surgicalPlanning: true,
    implantDatabase: true
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bone className="h-5 w-5 text-success" />
            Imaging & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic X-ray Analysis</Label>
              <p className="text-sm text-muted-foreground">AI-powered bone imaging analysis</p>
            </div>
            <Switch 
              checked={settings.autoXrayAnalysis}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoXrayAnalysis: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Fracture Detection</Label>
              <p className="text-sm text-muted-foreground">Automated fracture identification</p>
            </div>
            <Switch 
              checked={settings.fractureDetection}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, fractureDetection: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const ImagingConfiguration = memo(function ImagingConfiguration() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Imaging Analysis Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Detection Accuracy</Label>
              <Badge variant="outline">High</Badge>
            </div>
            <div className="flex items-center justify-between">
              <Label>3D Reconstruction</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const OphthalmologySettings = memo(function OphthalmologySettings() {
  const [settings, setSettings] = useState({
    autoOCTAnalysis: true,
    drScreening: true,
    glaucomaDetection: true,
    teleScreening: false
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-accent" />
            Ophthalmic Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic OCT Analysis</Label>
              <p className="text-sm text-muted-foreground">AI-powered retinal imaging analysis</p>
            </div>
            <Switch 
              checked={settings.autoOCTAnalysis}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoOCTAnalysis: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>DR Screening</Label>
              <p className="text-sm text-muted-foreground">Diabetic retinopathy screening</p>
            </div>
            <Switch 
              checked={settings.drScreening}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, drScreening: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const SettingsLoadingSkeleton = memo(function SettingsLoadingSkeleton() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-80 border-r bg-card p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded"></div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
});

export { StandardizedSettingsPage };