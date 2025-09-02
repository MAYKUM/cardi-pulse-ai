import React, { useState, memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Cpu, 
  Palette,
  ChevronRight,
  Check,
  X,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { getSpecialtyConfig, SpecialtyType, applySpecialtyTheme } from '@/config/specialty-config';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
  adminOnly?: boolean;
  premiumFeature?: boolean;
}

interface BaseSettingsProps {
  specialty: SpecialtyType;
  activeSection: string;
  onSectionChange: (section: string) => void;
  customSections?: SettingsSection[];
  showPremiumFeatures?: boolean;
  isAdmin?: boolean;
}

const BaseSettings = memo<BaseSettingsProps>(function BaseSettings({
  specialty,
  activeSection,
  onSectionChange,
  customSections = [],
  showPremiumFeatures = false,
  isAdmin = false
}) {
  const specialtyConfig = useMemo(() => getSpecialtyConfig(specialty), [specialty]);
  
  // Apply specialty theme
  React.useEffect(() => {
    applySpecialtyTheme(specialty);
  }, [specialty]);

  // Base settings sections available to all specialties
  const baseSections: SettingsSection[] = useMemo(() => [
    {
      id: 'preferences',
      title: 'User Preferences',
      description: 'Personalize your experience and workflow',
      icon: User,
      content: <UserPreferencesSection specialty={specialty} />
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage alerts and communication preferences',
      icon: Bell,
      content: <NotificationsSection specialty={specialty} />
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Manage account security and data privacy',
      icon: Shield,
      content: <SecuritySection specialty={specialty} />
    },
    {
      id: 'data',
      title: 'Data Management',
      description: 'Export, backup, and manage your data',
      icon: Database,
      content: <DataManagementSection specialty={specialty} />
    },
    {
      id: 'ai-models',
      title: 'AI Configuration',
      description: 'Configure AI models and automation',
      icon: Cpu,
      content: <AIConfigurationSection specialty={specialty} />,
      premiumFeature: true
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize theme and display preferences',
      icon: Palette,
      content: <AppearanceSection specialty={specialty} />
    }
  ], [specialty]);

  // Combine base and custom sections, filter based on permissions
  const allSections = useMemo(() => {
    const combined = [...baseSections, ...customSections];
    return combined.filter(section => {
      if (section.adminOnly && !isAdmin) return false;
      if (section.premiumFeature && !showPremiumFeatures) return false;
      return true;
    });
  }, [baseSections, customSections, isAdmin, showPremiumFeatures]);

  const currentSection = allSections.find(section => section.id === activeSection);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-card">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <specialtyConfig.theme.icon 
              className="h-6 w-6" 
              style={{ color: specialtyConfig.theme.primary }} 
            />
            <div>
              <h2 className="text-lg font-semibold">{specialtyConfig.theme.displayName}</h2>
              <p className="text-sm text-muted-foreground">Settings</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          {allSections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 h-auto p-3 ${
                activeSection === section.id 
                  ? 'bg-primary/10 text-primary border-primary/20' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <section.icon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{section.title}</span>
                  {section.premiumFeature && (
                    <Badge variant="secondary" className="text-xs">Pro</Badge>
                  )}
                  {section.adminOnly && (
                    <Badge variant="outline" className="text-xs">Admin</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 w-80 p-4 border-t bg-card">
          <div className="text-xs text-muted-foreground">
            <p>DPDP & HIPAA Compliant</p>
            <p className="mt-1">Your data is encrypted and secure</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {currentSection ? (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <currentSection.icon 
                  className="h-8 w-8" 
                  style={{ color: specialtyConfig.theme.primary }} 
                />
                <div>
                  <h1 className="text-2xl font-bold">{currentSection.title}</h1>
                  <p className="text-muted-foreground">{currentSection.description}</p>
                </div>
              </div>
              <Separator />
              <div className="animate-fade-in">
                {currentSection.content}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Select a Settings Section</h2>
                <p className="text-muted-foreground">Choose a section from the sidebar to configure your preferences</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Individual settings sections
const UserPreferencesSection = memo<{ specialty: SpecialtyType }>(function UserPreferencesSection({ specialty }) {
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    theme: 'system',
    compactMode: false,
    showTutorials: true
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Show more information in less space</p>
            </div>
            <Switch 
              checked={preferences.compactMode}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, compactMode: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Tutorials</Label>
              <p className="text-sm text-muted-foreground">Display helpful tips and guidance</p>
            </div>
            <Switch 
              checked={preferences.showTutorials}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, showTutorials: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const NotificationsSection = memo<{ specialty: SpecialtyType }>(function NotificationsSection({ specialty }) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    criticalAlerts: true,
    appointmentReminders: true,
    systemUpdates: false
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch 
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Critical Alerts</Label>
              <p className="text-sm text-muted-foreground">Urgent patient alerts and emergencies</p>
            </div>
            <Switch 
              checked={notifications.criticalAlerts}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, criticalAlerts: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const SecuritySection = memo<{ specialty: SpecialtyType }>(function SecuritySection({ specialty }) {
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    loginAlerts: true,
    dataEncryption: true
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch 
              checked={security.twoFactor}
              onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Login Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified of new device logins</p>
            </div>
            <Switch 
              checked={security.loginAlerts}
              onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, loginAlerts: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const DataManagementSection = memo<{ specialty: SpecialtyType }>(function DataManagementSection({ specialty }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Export & Backup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Database className="h-4 w-4 mr-2" />
            Export Patient Data
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Database className="h-4 w-4 mr-2" />
            Backup Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});

const AIConfigurationSection = memo<{ specialty: SpecialtyType }>(function AIConfigurationSection({ specialty }) {
  const [aiSettings, setAiSettings] = useState({
    autoAnalysis: true,
    confidenceThreshold: 80,
    modelVersion: 'latest'
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Model Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic Analysis</Label>
              <p className="text-sm text-muted-foreground">Enable AI-powered medical analysis</p>
            </div>
            <Switch 
              checked={aiSettings.autoAnalysis}
              onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, autoAnalysis: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const AppearanceSection = memo<{ specialty: SpecialtyType }>(function AppearanceSection({ specialty }) {
  const specialtyConfig = useMemo(() => getSpecialtyConfig(specialty), [specialty]);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme & Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border-2" style={{ borderColor: specialtyConfig.theme.primary }}>
            <div className="flex items-center gap-3">
              <specialtyConfig.theme.icon 
                className="h-8 w-8" 
                style={{ color: specialtyConfig.theme.primary }} 
              />
              <div>
                <h3 className="font-semibold">{specialtyConfig.theme.displayName} Theme</h3>
                <p className="text-sm text-muted-foreground">Active specialty theme</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export { BaseSettings };
export type { SettingsSection };