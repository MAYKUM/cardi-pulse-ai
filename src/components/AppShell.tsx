import { useState, memo, useCallback, useMemo } from "react";
import { 
  Heart, 
  Search,
  Menu,
  X,
  MessageSquare,
  User,
  MapPin,
  Video,
  AlertTriangle,
  Bell,
  Stethoscope
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getNavigationConfig, getHeaderActionsConfig } from "@/config/app-config";
import { SimpleLogout } from "./SimpleLogout";

const AppShell = memo(function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  
  // Memoize specialty detection for performance
  const specialty = useMemo(() => window.location.pathname.split('/')[1], []);
  
  
  // Memoize user type and configurations for performance
  const userType = useMemo(() => specialty === 'cardiology' ? 'cardio' 
    : specialty === 'neurology' ? 'neurology'
    : specialty === 'orthopedics' ? 'orthopedics'
    : specialty === 'ophthalmology' ? 'ophthalmology'
    : 'generic', [specialty]);
  
  const navigationConfig = useMemo(() => getNavigationConfig(userType), [userType]);
  const headerActionsConfig = useMemo(() => getHeaderActionsConfig(userType), [userType]);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={handleSidebarClose}
        >
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" />
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r shadow-medical">
            <SidebarContent onClose={handleSidebarClose} />
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
            onClick={handleSidebarOpen}
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
              {/* Simple Logout */}
              <SimpleLogout />
              
              {/* Notifications */}
              <Popover open={notificationsPanelOpen} onOpenChange={setNotificationsPanelOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <AlertTriangle className="h-5 w-5" />
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      3
                    </Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">Critical Lab Result</p>
                      <p className="text-xs text-muted-foreground">Patient: Rajesh Kumar - Troponin elevated</p>
                      <p className="text-xs text-muted-foreground">2 min ago</p>
                    </div>
                    <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">Appointment Reminder</p>
                      <p className="text-xs text-muted-foreground">Sarah Johnson - Follow-up in 30 mins</p>
                      <p className="text-xs text-muted-foreground">28 min ago</p>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">Device Alert</p>
                      <p className="text-xs text-muted-foreground">ECG Machine offline - Room 3</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Messages */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <MessageSquare className="h-5 w-5" />
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      2
                    </Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Recent Chats</h3>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                          DN
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Dr. Nurse</p>
                          <p className="text-xs text-muted-foreground">Patient update needed...</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs">
                          LT
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Lab Tech</p>
                          <p className="text-xs text-muted-foreground">Results ready for review</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Profile */}
              <Button variant="ghost" className="flex items-center gap-x-2 h-auto p-1">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {userType === 'cardio' ? 'DC' : 
                     userType === 'neurology' ? 'DN' :
                     userType === 'ophthalmology' ? 'DO' :
                     userType === 'orthopedics' ? 'DR' : 'DG'}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">Doctor</p>
                  <p className="text-xs text-muted-foreground">
                    {userType === 'cardio' ? 'Cardiologist' : 
                     userType === 'neurology' ? 'Neurologist' :
                     userType === 'ophthalmology' ? 'Ophthalmologist' :
                     userType === 'orthopedics' ? 'Orthopedist' : 'Physician'}
                  </p>
                </div>
              </Button>
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
});

const SidebarContent = memo(function SidebarContent({ onClose }: { onClose?: () => void }) {
  // Memoize specialty detection for performance  
  const specialty = useMemo(() => window.location.pathname.split('/')[1], []);
  
  const userType = useMemo(() => specialty === 'cardiology' ? 'cardio' 
    : specialty === 'neurology' ? 'neurology'
    : specialty === 'orthopedics' ? 'orthopedics'
    : specialty === 'ophthalmology' ? 'ophthalmology'
    : 'generic', [specialty]);
  
  const navigationConfig = useMemo(() => getNavigationConfig(userType), [userType]);
  
  return (
    <>
      {/* Logo and close button */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6">
        <div className="flex items-center gap-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            {userType === 'cardio' ? (
              <Heart className="h-5 w-5 text-primary-foreground" />
            ) : (
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            )}
          </div>
          <span className="text-lg font-semibold">
            {userType === 'cardio' ? 'CardioAI' : 'MedicalAI'}
          </span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6">
        <div className="flex flex-1 flex-col gap-y-6">
          {navigationConfig.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
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
            </div>
          ))}
        </div>

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
});

export { AppShell };