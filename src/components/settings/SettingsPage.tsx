import React, { useState, useEffect } from "react";
import { SettingsLayout } from "./SettingsLayout";
import { UserPreferences } from "./UserPreferences";
import { DataManagement } from "./DataManagement";
import { NotificationSettings } from "./NotificationSettings";
import { AIModelConfiguration } from "./AIModelConfiguration";
import { fetchDoctorProfile, type Specialty } from "@/hooks/useDoctorProfile";

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("preferences");
  const [specialty, setSpecialty] = useState<Specialty>("general_medicine");

  useEffect(() => {
    const loadDoctorProfile = async () => {
      const profile = await fetchDoctorProfile();
      if (profile?.specialty) {
        setSpecialty(profile.specialty);
      }
    };
    
    loadDoctorProfile();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "preferences":
        return <UserPreferences specialty={specialty as any} />;
      case "data":
        return <DataManagement />;
      case "notifications":
        return <NotificationSettings specialty={specialty as any} />;
      case "ai-models":
        return <AIModelConfiguration />;
      case "privacy":
        return <DataManagement />; // Privacy is handled in Data Management
      default:
        return <UserPreferences specialty={specialty as any} />;
    }
  };

  return (
    <SettingsLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </SettingsLayout>
  );
}