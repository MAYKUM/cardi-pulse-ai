import { Eye, Users, UserPlus, Calendar, Camera, Activity, Zap, Shield, Settings } from "lucide-react";
import type { NavigationGroup } from "./app-config";

export const ophthalmologyNavigationConfig: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/ophthalmology/dashboard", icon: Eye },
      { name: "Patients", href: "/ophthalmology/patients", icon: Users },
      { name: "New Patient", href: "/ophthalmology/patients/new", icon: UserPlus },
      { name: "Appointments", href: "/ophthalmology/appointments", icon: Calendar },
    ]
  },
  {
    title: "Imaging & Planning",
    items: [
      { name: "Imaging Viewer", href: "/ophthalmology/imaging", icon: Camera },
      { name: "IOL Planning", href: "/ophthalmology/iol-planning", icon: Activity },
      { name: "Glaucoma Suite", href: "/ophthalmology/glaucoma", icon: Zap },
      { name: "Tele‑Screening", href: "/ophthalmology/tele-screening", icon: Camera },
    ]
  },
  {
    title: "Settings & Security",
    items: [
      { name: "Security", href: "/ophthalmology/security", icon: Shield },
      { name: "Settings", href: "/ophthalmology/settings", icon: Settings },
    ]
  }
];
