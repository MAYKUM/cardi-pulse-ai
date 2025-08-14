import React, { useState } from "react";
import { 
  Monitor, 
  Moon, 
  Sun, 
  Layout, 
  Eye, 
  Bell, 
  Globe,
  Palette,
  Save,
  RotateCcw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface UserPreferencesProps {
  specialty: "cardiology" | "neurology" | "general_medicine" | "ophthalmology";
}

export function UserPreferences({ specialty }: UserPreferencesProps) {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en-IN",
    timezone: "Asia/Kolkata",
    dateFormat: "dd/MM/yyyy",
    timeFormat: "24h",
    density: "comfortable",
    fontSize: 14,
    animationsEnabled: true,
    highContrast: false,
    autoSave: true,
    compactMode: false,
    specialtyView: true,
    defaultDashboard: "overview"
  });

  const handleSave = () => {
    // Save preferences logic here
    toast({
      title: "Preferences saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleReset = () => {
    // Reset to defaults logic here
    toast({
      title: "Preferences reset",
      description: "Settings have been restored to defaults.",
    });
  };

  const specialtyOptions = {
    cardiology: [
      { value: "ecg-focus", label: "ECG-Focused Dashboard" },
      { value: "hemodynamics", label: "Hemodynamics View" },
      { value: "interventional", label: "Interventional Layout" }
    ],
    neurology: [
      { value: "eeg-focus", label: "EEG-Focused Dashboard" },
      { value: "imaging", label: "Neuroimaging View" },
      { value: "stroke-care", label: "Stroke Care Layout" }
    ],
    ophthalmology: [
      { value: "imaging", label: "Imaging-Focused View" },
      { value: "screening", label: "Screening Dashboard" },
      { value: "surgery", label: "Surgical Planning Layout" }
    ],
    general_medicine: [
      { value: "comprehensive", label: "Comprehensive View" },
      { value: "primary-care", label: "Primary Care Focus" },
      { value: "preventive", label: "Preventive Care Layout" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Theme & Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <Palette className="h-5 w-5" />
            Theme & Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Theme</Label>
              <RadioGroup 
                value={preferences.theme} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center gap-x-2">
                    <Sun className="h-4 w-4" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center gap-x-2">
                    <Moon className="h-4 w-4" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center gap-x-2">
                    <Monitor className="h-4 w-4" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="space-y-2">
                  <Slider
                    value={[preferences.fontSize]}
                    onValueChange={([value]) => setPreferences(prev => ({ ...prev, fontSize: value }))}
                    min={12}
                    max={18}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Small (12px)</span>
                    <span>Medium (14px)</span>
                    <span>Large (18px)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Display Density</Label>
              <Select value={preferences.density} onValueChange={(value) => setPreferences(prev => ({ ...prev, density: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">Animations</Label>
                <Switch
                  id="animations"
                  checked={preferences.animationsEnabled}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, animationsEnabled: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast">High Contrast</Label>
                <Switch
                  id="high-contrast"
                  checked={preferences.highContrast}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, highContrast: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="compact-mode">Compact Mode</Label>
                <Switch
                  id="compact-mode"
                  checked={preferences.compactMode}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, compactMode: checked }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialty-Specific Views */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <Layout className="h-5 w-5" />
            Specialty Dashboard
            <Badge variant="secondary" className="ml-2">
              {specialty.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Specialty-Specific View</Label>
              <p className="text-sm text-muted-foreground">
                Customize dashboard layout for {specialty} workflows
              </p>
            </div>
            <Switch
              checked={preferences.specialtyView}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, specialtyView: checked }))}
            />
          </div>

          {preferences.specialtyView && (
            <div className="space-y-2">
              <Label>Default Dashboard Layout</Label>
              <Select value={preferences.defaultDashboard} onValueChange={(value) => setPreferences(prev => ({ ...prev, defaultDashboard: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  {specialtyOptions[specialty]?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <Globe className="h-5 w-5" />
            Localization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-IN">English (India)</SelectItem>
                  <SelectItem value="hi-IN">हिन्दी</SelectItem>
                  <SelectItem value="bn-IN">বাংলা</SelectItem>
                  <SelectItem value="te-IN">తెలుగు</SelectItem>
                  <SelectItem value="ta-IN">தமிழ்</SelectItem>
                  <SelectItem value="mr-IN">मराठी</SelectItem>
                  <SelectItem value="gu-IN">ગુજરાતી</SelectItem>
                  <SelectItem value="kn-IN">ಕನ್ನಡ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/MM/yyyy">DD/MM/YYYY (Indian)</SelectItem>
                  <SelectItem value="MM/dd/yyyy">MM/DD/YYYY (US)</SelectItem>
                  <SelectItem value="yyyy-MM-dd">YYYY-MM-DD (ISO)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time Format</Label>
              <Select value={preferences.timeFormat} onValueChange={(value) => setPreferences(prev => ({ ...prev, timeFormat: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12 Hour</SelectItem>
                  <SelectItem value="24h">24 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Kolkata">India Standard Time (IST)</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="Asia/Dubai">Gulf Standard Time (GST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-save Changes</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save changes as you make them
              </p>
            </div>
            <Switch
              checked={preferences.autoSave}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoSave: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleReset} className="flex items-center gap-x-2">
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-x-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}