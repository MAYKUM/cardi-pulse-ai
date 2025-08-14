import React, { useState } from "react";
import { 
  Settings, 
  User, 
  Database, 
  Bell, 
  Cpu, 
  Shield, 
  Download,
  Eye,
  Trash2,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const settingsNavigation = [
  {
    id: "preferences",
    label: "User Preferences",
    icon: User,
    description: "UI layout, notifications, display formats"
  },
  {
    id: "data",
    label: "Data Management", 
    icon: Database,
    description: "Access, correct, and erase personal data"
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Alert settings and delivery channels"
  },
  {
    id: "ai-models",
    label: "AI Configuration",
    icon: Cpu,
    description: "Model parameters and performance metrics",
    adminOnly: true
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: Shield,
    description: "DPDP compliance and consent management"
  }
];

export function SettingsLayout({ children, activeSection = "preferences", onSectionChange }: SettingsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" />
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r shadow-medical">
            <SettingsSidebar 
              activeSection={activeSection}
              onSectionChange={onSectionChange}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 bg-card border-r shadow-card">
          <SettingsSidebar 
            activeSection={activeSection}
            onSectionChange={onSectionChange}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-card/95 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-x-3">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>

        {/* Content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SettingsSidebar({ 
  activeSection, 
  onSectionChange, 
  onClose 
}: { 
  activeSection: string;
  onSectionChange?: (section: string) => void;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6">
        <div className="flex items-center gap-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Settings className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Settings</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6">
        <div className="space-y-1">
          {settingsNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange?.(item.id);
                onClose?.();
              }}
              className={cn(
                "group flex w-full items-start gap-x-3 rounded-md p-3 text-left text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-x-2">
                  <span>{item.label}</span>
                  {item.adminOnly && (
                    <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* DPDP Compliance Notice */}
        <div className="mt-auto mb-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-center gap-x-2 mb-2">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">DPDP Compliant</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All settings comply with Indian Data Protection and Privacy regulations.
          </p>
        </div>
      </nav>
    </>
  );
}