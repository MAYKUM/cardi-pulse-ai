import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ophthalmologyNavigationConfig } from "@/config/ophthalmology-nav";
import { useAuth } from "@/contexts/AuthContext";

export function OphthalmologySidebar({ onClose }: { onClose?: () => void }) {
  const { user } = useAuth();
  
  return (
    <>
      {/* Logo and close button */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6">
        <div className="flex items-center gap-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Eye className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">
            OphthalmoAI
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
          {ophthalmologyNavigationConfig.map((group) => (
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
          <p className="text-xs text-muted-foreground mb-3">24/7 Ophthalmology Emergency Line</p>
          <Button size="sm" className="w-full bg-critical hover:bg-critical/90">
            Call Now
          </Button>
        </div>
      </nav>
    </>
  );
}