import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Eye } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ophthalmologyNavigationConfig } from "@/config/ophthalmology-nav";

export function OphthalmologySidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      {/* Header */}
      <div className="p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Eye className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Ophthalmology</h2>
              <p className="text-xs text-muted-foreground">AI Medical Platform</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
            <Eye className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <SidebarContent className="px-2">
        {ophthalmologyNavigationConfig.map((group) => {
          const hasActiveItem = group.items.some((item) => isActive(item.href));
          
          return (
            <SidebarGroup
              key={group.title}
            >
              {!collapsed && (
                <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
                  {group.title}
                </SidebarGroupLabel>
              )}

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.href} 
                            end 
                            className={getNavCls}
                          >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {!collapsed && (
                              <span className="ml-3 truncate">{item.name}</span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}