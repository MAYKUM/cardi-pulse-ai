import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { OphthalmologySidebar } from "./OphthalmologySidebar";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Menu, 
  X, 
  MessageSquare, 
  User, 
  AlertTriangle 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";

export function OphthalmologyShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const { user } = useAuth();

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
            <OphthalmologySidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 bg-card border-r shadow-card">
          <OphthalmologySidebar />
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
                placeholder="Search patients, imaging, reports..."
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
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
                    <h3 className="font-semibold">Critical Alerts</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">High IOP Alert</p>
                      <p className="text-xs text-muted-foreground">Patient: Mrs. Sharma - IOP 35mmHg OD</p>
                      <p className="text-xs text-muted-foreground">5 min ago</p>
                    </div>
                    <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">Retinal Detachment</p>
                      <p className="text-xs text-muted-foreground">Emergency referral needed - Mr. Singh</p>
                      <p className="text-xs text-muted-foreground">15 min ago</p>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">OCT Analysis Ready</p>
                      <p className="text-xs text-muted-foreground">AMD progression - Patient ID: 1247</p>
                      <p className="text-xs text-muted-foreground">30 min ago</p>
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
                          RT
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Retina Tech</p>
                          <p className="text-xs text-muted-foreground">OCT images uploaded...</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs">
                          OR
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">OR Staff</p>
                          <p className="text-xs text-muted-foreground">Surgery schedule update</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Profile */}
              <UserProfileDropdown>
                <Button variant="ghost" className="flex items-center gap-x-2 h-auto p-1">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'DO'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">{user?.name || 'Dr. Ophthalmologist'}</p>
                    <p className="text-xs text-muted-foreground">Ophthalmology</p>
                  </div>
                </Button>
              </UserProfileDropdown>
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