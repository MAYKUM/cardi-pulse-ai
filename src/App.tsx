import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppShell } from "./components/AppShell";
import { LoginPage } from "./components/LoginPage";
import { PatientDashboard } from "./components/PatientDashboard";
import { EnhancedDashboard } from "./components/EnhancedDashboard";
import { PatientIntakeForm } from "./components/PatientIntakeForm";
import { DicomViewer } from "./components/DicomViewer";
import { EcgAnalysis } from "./components/EcgAnalysis";
import { EchoReports } from "./components/EchoReports";
import { LabResults } from "./components/LabResults";
import { Telecardiology } from "./components/Telecardiology";
import { DeviceIntegration } from "./components/DeviceIntegration";
import { Appointments } from "./components/Appointments";
import { IntegrationsHub } from "./components/IntegrationsHub";
import { EEGAnalysis } from "./components/EEGAnalysis";
import { VideoEEG } from "./components/VideoEEG";
import { EMGPanel } from "./components/EMGPanel";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { PatientsList } from "./components/PatientsList";
import { NewAppointment } from "./components/NewAppointment";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/cardiology" element={<AppShell />}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="dashboard" element={<EnhancedDashboard />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<DicomViewer />} />
        <Route path="ecg" element={<EcgAnalysis />} />
        <Route path="echo" element={<EchoReports />} />
        <Route path="lab" element={<LabResults />} />
        <Route path="telehealth" element={<Telecardiology />} />
        <Route path="devices" element={<DeviceIntegration />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="security" element={<div>Security Settings</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="upload" element={<div>Upload Images</div>} />
        <Route path="search" element={<div>Quick Search</div>} />
        <Route path="ai-analysis" element={<div>AI Analysis</div>} />
        <Route path="emergency" element={<div>Emergency Procedures</div>} />
      </Route>
      
      <Route path="/neurology" element={<AppShell />}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="dashboard" element={<EnhancedDashboard />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<DicomViewer />} />
        <Route path="eeg" element={<EEGAnalysis />} />
        <Route path="video-eeg" element={<VideoEEG />} />
        <Route path="emg" element={<EMGPanel />} />
        <Route path="neuropsych" element={<div>Neuropsychological Tests</div>} />
        <Route path="movement" element={<div>Movement Tracking</div>} />
        <Route path="seizure-logs" element={<div>Seizure Logs</div>} />
        <Route path="lab" element={<LabResults />} />
        <Route path="telehealth" element={<Telecardiology />} />
        <Route path="devices" element={<DeviceIntegration />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="security" element={<div>Security Settings</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="upload" element={<div>Upload Images</div>} />
        <Route path="search" element={<div>Quick Search</div>} />
        <Route path="ai-analysis" element={<div>AI Analysis</div>} />
        <Route path="emergency" element={<div>Emergency Procedures</div>} />
      </Route>
      
      <Route path="/general-medicine" element={<AppShell />}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="dashboard" element={<EnhancedDashboard />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<DicomViewer />} />
        <Route path="lab" element={<LabResults />} />
        <Route path="reports" element={<div>Test Reports</div>} />
        <Route path="vitals" element={<div>Vital Signs</div>} />
        <Route path="telehealth" element={<Telecardiology />} />
        <Route path="devices" element={<DeviceIntegration />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="security" element={<div>Security Settings</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="upload" element={<div>Upload Images</div>} />
        <Route path="search" element={<div>Quick Search</div>} />
        <Route path="ai-analysis" element={<div>AI Analysis</div>} />
        <Route path="emergency" element={<div>Emergency Procedures</div>} />
      </Route>
      
      {/* Legacy routes - redirect to specialty-specific routes */}
      <Route path="/" element={<Navigate to={`/${user.type === 'cardio' ? 'cardiology' : user.type === 'neurology' ? 'neurology' : 'general-medicine'}`} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
