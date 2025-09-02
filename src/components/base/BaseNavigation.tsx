import React, { memo, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Home,
  Users,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  Shield
} from 'lucide-react';
import { getSpecialtyConfig, SpecialtyType, applySpecialtyTheme } from '@/config/specialty-config';

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  badge?: string | number;
  isNew?: boolean;
  isPremium?: boolean;
  children?: NavigationItem[];
}

export interface NavigationGroup {
  id: string;
  title: string;
  items: NavigationItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

interface BaseNavigationProps {
  specialty: SpecialtyType;
  customGroups?: NavigationGroup[];
  onItemClick?: (item: NavigationItem) => void;
  compact?: boolean;
  showLabels?: boolean;
}

const BaseNavigation = memo<BaseNavigationProps>(function BaseNavigation({
  specialty,
  customGroups = [],
  onItemClick,
  compact = false,
  showLabels = true
}) {
  const location = useLocation();
  const specialtyConfig = useMemo(() => getSpecialtyConfig(specialty), [specialty]);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Apply specialty theme
  React.useEffect(() => {
    applySpecialtyTheme(specialty);
  }, [specialty]);

  // Base navigation items available to all specialties
  const baseGroups: NavigationGroup[] = useMemo(() => [
    {
      id: 'main',
      title: 'Main',
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          href: `/${specialty}`,
          icon: Home,
          description: 'Overview and key metrics'
        },
        {
          id: 'patients',
          title: specialtyConfig.customTerminology.patient || 'Patients',
          href: '/patients',
          icon: Users,
          description: 'Patient management and records'
        },
        {
          id: 'appointments',
          title: 'Appointments',
          href: '/appointments',
          icon: Calendar,
          description: 'Schedule and manage appointments'
        },
        {
          id: 'records',
          title: 'Medical Records',
          href: '/records',
          icon: FileText,
          description: 'Digital health records'
        }
      ]
    },
    {
      id: 'specialty',
      title: `${specialtyConfig.theme.displayName} Tools`,
      items: specialtyConfig.features
        .filter(feature => feature.enabled)
        .map(feature => ({
          id: feature.id,
          title: feature.name,
          href: `/${feature.id}`,
          icon: feature.icon,
          description: feature.description,
          isPremium: feature.premium
        }))
    },
    {
      id: 'settings',
      title: 'Settings',
      items: [
        {
          id: 'settings',
          title: 'Settings',
          href: '/settings',
          icon: Settings,
          description: 'Configure preferences and security'
        },
        {
          id: 'help',
          title: 'Help & Support',
          href: '/help',
          icon: HelpCircle,
          description: 'Documentation and support'
        }
      ]
    }
  ], [specialty, specialtyConfig]);

  // Combine base and custom groups
  const allGroups = useMemo(() => {
    return [...baseGroups, ...customGroups].filter(group => group.items.length > 0);
  }, [baseGroups, customGroups]);

  const isActive = (href: string) => {
    if (href === `/${specialty}`) {
      return location.pathname === `/${specialty}` || location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavigationItem) => {
    onItemClick?.(item);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {/* Specialty Header */}
        <div className={`flex items-center gap-3 p-3 rounded-lg ${compact ? 'justify-center' : ''}`}>
          <specialtyConfig.theme.icon 
            className="h-6 w-6 flex-shrink-0" 
            style={{ color: specialtyConfig.theme.primary }} 
          />
          {!compact && showLabels && (
            <div>
              <h2 className="font-semibold text-sm">{specialtyConfig.theme.displayName}</h2>
              <p className="text-xs text-muted-foreground">Medical Platform</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Navigation Groups */}
        {allGroups.map((group) => (
          <div key={group.id} className="space-y-1">
            {group.collapsible ? (
              <Collapsible
                open={!collapsedGroups.has(group.id)}
                onOpenChange={() => toggleGroup(group.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    {(!compact || !showLabels) ? group.title : ''}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {group.items.map((item) => (
                    <NavigationLink
                      key={item.id}
                      item={item}
                      isActive={isActive(item.href)}
                      compact={compact}
                      showLabels={showLabels}
                      onClick={() => handleItemClick(item)}
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <>
                {(!compact || !showLabels) && group.title && (
                  <div className="px-2 py-1">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {group.title}
                    </h3>
                  </div>
                )}
                {group.items.map((item) => (
                  <NavigationLink
                    key={item.id}
                    item={item}
                    isActive={isActive(item.href)}
                    compact={compact}
                    showLabels={showLabels}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </>
            )}
          </div>
        ))}

        {/* Emergency Contact */}
        <div className="mt-6 pt-4 border-t">
          <div className={`p-3 bg-destructive/10 border border-destructive/20 rounded-lg ${compact ? 'text-center' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-destructive flex-shrink-0" />
              {(!compact || !showLabels) && (
                <span className="text-sm font-medium text-destructive">Emergency</span>
              )}
            </div>
            {(!compact || !showLabels) && (
              <p className="text-xs text-muted-foreground">
                24/7 Support: <span className="font-mono">+1-800-MEDICAL</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
});

// Individual navigation link component
const NavigationLink = memo<{
  item: NavigationItem;
  isActive: boolean;
  compact: boolean;
  showLabels: boolean;
  onClick: () => void;
}>(function NavigationLink({ item, isActive, compact, showLabels, onClick }) {
  return (
    <NavLink
      to={item.href}
      className={({ isActive: navIsActive }) => `
        flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
        ${navIsActive || isActive 
          ? 'bg-primary text-primary-foreground shadow-sm' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }
        ${compact ? 'justify-center' : ''}
      `}
      onClick={onClick}
    >
      <item.icon className="h-4 w-4 flex-shrink-0" />
      {(!compact || !showLabels) && (
        <>
          <span className="flex-1">{item.title}</span>
          <div className="flex items-center gap-1">
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
            {item.isNew && (
              <Badge variant="default" className="text-xs bg-accent">
                New
              </Badge>
            )}
            {item.isPremium && (
              <Badge variant="outline" className="text-xs">
                Pro
              </Badge>
            )}
          </div>
        </>
      )}
    </NavLink>
  );
});

// Mobile navigation overlay
const MobileNavigation = memo<{
  specialty: SpecialtyType;
  isOpen: boolean;
  onClose: () => void;
  customGroups?: NavigationGroup[];
}>(function MobileNavigation({ specialty, isOpen, onClose, customGroups = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-72 bg-card border-r shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <BaseNavigation 
          specialty={specialty} 
          customGroups={customGroups}
          onItemClick={onClose}
        />
      </div>
    </div>
  );
});

export { BaseNavigation, MobileNavigation };