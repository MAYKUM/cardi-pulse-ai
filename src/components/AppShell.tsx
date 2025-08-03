import { useState } from "react";
import { 
  Heart, 
  Users, 
  FileText, 
  Camera, 
  Activity, 
  Stethoscope, 
  Calendar,
  Settings,
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Heart, count: null },
  { name: "New Patient", href: "/patients/new", icon: Users, count: null },
  { name: "Imaging", href: "/imaging", icon: Camera, count: null },
  { name: "ECG Analysis", href: "/ecg", icon: Activity, count: 2 },
  { name: "Echo Reports", href: "/echo", icon: Stethoscope, count: 3 },
  { name: "Lab Results", href: "/lab", icon: FileText, count: 1 },
  { name: "Telecardiology", href: "/telehealth", icon: Stethoscope, count: null },
  { name: "Device Integration", href: "/devices", icon: Settings, count: null },
  { name: "Appointments", href: "/appointments", icon: Calendar, count: 8 },
];

export function AppShell() {
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
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 bg-card border-r shadow-card">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-card/95 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients, reports, or medications..."
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">DC</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Dr. Cardio</p>
                  <p className="text-xs text-muted-foreground">Cardiologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <>
      {/* Logo and close button */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6">
        <div className="flex items-center gap-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">CardioAI</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6">
        <ul className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex gap-x-3 rounded-md p-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
                onClick={onClose}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{item.name}</span>
                {item.count && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.count}
                  </Badge>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Emergency contact card */}
        <div className="mt-auto mb-6 p-4 bg-critical/5 border border-critical/20 rounded-lg">
          <div className="flex items-center gap-x-2 mb-2">
            <div className="h-2 w-2 bg-critical rounded-full animate-pulse" />
            <span className="text-sm font-medium text-critical">Emergency</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">24/7 Cardiac Emergency Line</p>
          <Button size="sm" className="w-full bg-critical hover:bg-critical/90">
            Call Now
          </Button>
        </div>
      </nav>
    </>
  );
}