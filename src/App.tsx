import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppShell } from "./components/AppShell";
import { OphthalmologyShell } from "./components/ophthalmology/OphthalmologyShell";
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
import { XrayAnalysis } from "./components/XrayAnalysis";
import { SurgicalPlanning } from "./components/SurgicalPlanning";
import { RehabTracker } from "./components/RehabTracker";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { PatientsList } from "./components/PatientsList";
import { NewAppointment } from "./components/NewAppointment";
import LoginRole from "./pages/auth/LoginRole";
import Signup from "./pages/auth/Signup";
import AIAnalysisChat from "./components/AIAnalysisChat";
import OphthalmologyDashboard from "./components/ophthalmology/OphthalmologyDashboard";
import MultimodalImagingViewer from "./components/ophthalmology/MultimodalImagingViewer";
import IOLPlanning from "./components/ophthalmology/IOLPlanning";
import GlaucomaSuite from "./components/ophthalmology/GlaucomaSuite";
import TeleScreeningPortal from "./components/ophthalmology/TeleScreeningPortal";
import { SettingsPage } from "./components/settings/SettingsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NeuropsychTests } from "./components/NeuropsychTests";
import { MovementTracking } from "./components/MovementTracking";
import { SeizureLogs } from "./components/SeizureLogs";
import { SecuritySettings } from "./components/SecuritySettings";

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
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login">
          <Route path="cardiology" element={<LoginRole />} />
          <Route path="neurology" element={<LoginRole />} />
          <Route path="general-medicine" element={<LoginRole />} />
          <Route path=":role" element={<LoginRole />} />
        </Route>
        <Route path="/" element={<Navigate to="/login/general-medicine" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
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
        <Route path="settings" element={<SettingsPage />} />
        <Route path="upload" element={<div>Upload Images</div>} />
        <Route path="search" element={<div>Quick Search</div>} />
        <Route path="ai-analysis" element={<AIAnalysisChat specialty="cardiology" />} />
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
        <Route path="neuropsych" element={<NeuropsychTests />} />
        <Route path="movement" element={<MovementTracking />} />
        <Route path="seizure-logs" element={<SeizureLogs />} />
        <Route path="lab" element={<LabResults />} />
        <Route path="telehealth" element={<Telecardiology />} />
        <Route path="devices" element={<DeviceIntegration />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="upload" element={<div>Upload Images</div>} />
        <Route path="search" element={<div>Quick Search</div>} />
        <Route path="ai-analysis" element={<AIAnalysisChat specialty="neurology" />} />
        <Route path="emergency" element={<div>Emergency Procedures</div>} />
      </Route>

      <Route path="/ophthalmology" element={<OphthalmologyShell />}>
        <Route index element={<OphthalmologyDashboard />} />
        <Route path="dashboard" element={<OphthalmologyDashboard />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<MultimodalImagingViewer />} />
        <Route path="iol-planning" element={<IOLPlanning />} />
        <Route path="glaucoma" element={<GlaucomaSuite />} />
        <Route path="tele-screening" element={<TeleScreeningPortal />} />
        <Route path="ai-analysis" element={<AIAnalysisChat specialty="ophthalmology" />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      <Route path="/orthopedics" element={<AppShell />}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="dashboard" element={<EnhancedDashboard />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<DicomViewer />} />
        <Route path="xray" element={<XrayAnalysis />} />
        <Route path="3d-viewer" element={<div>3D Bone Viewer</div>} />
        <Route path="surgical-planning" element={<SurgicalPlanning />} />
        <Route path="rehab" element={<RehabTracker />} />
        <Route path="fracture-healing" element={<div>Fracture Healing Tracker</div>} />
        <Route path="osteoporosis" element={<div>Osteoporosis Risk Dashboard</div>} />
        <Route path="joint-registry" element={<div>Joint Replacement Registry</div>} />
        <Route path="tele-consult" element={<div>Tele-Ortho Consultation</div>} />
        <Route path="lab" element={<LabResults />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="settings" element={<SettingsPage />} />
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
        <Route path="settings" element={<SettingsPage />} />
        <Route path="upload" element={<div>Upload Images</div>} />
        <Route path="search" element={<div>Quick Search</div>} />
        <Route path="ai-analysis" element={<AIAnalysisChat specialty="general-medicine" />} />
        <Route path="emergency" element={<div>Emergency Procedures</div>} />
      </Route>

      
      {/* Dashboard role entry points */}
      <Route path="/dashboard">
        <Route path="cardiology" element={<Navigate to="/cardiology/dashboard" replace />} />
        <Route path="neurology" element={<Navigate to="/neurology/dashboard" replace />} />
        <Route path="ophthalmology" element={<Navigate to="/ophthalmology/dashboard" replace />} />
        <Route path="general" element={<Navigate to="/general-medicine/dashboard" replace />} />
      </Route>

      {/* If an authenticated user hits any /login/* URL, redirect them to their home */}
      <Route
        path="/login/*"
        element={
          <Navigate
            to={`/${user.type === 'cardio' ? 'cardiology' : user.type === 'neurology' ? 'neurology' : user.type === 'orthopedics' ? 'orthopedics' : user.type === 'ophthalmology' ? 'ophthalmology' : 'general-medicine'}`}
            replace
          />
        }
      />
      
      {/* Legacy routes - redirect to specialty-specific routes */}
      <Route path="/" element={<Navigate to={`/${user.type === 'cardio' ? 'cardiology' : user.type === 'neurology' ? 'neurology' : user.type === 'orthopedics' ? 'orthopedics' : user.type === 'ophthalmology' ? 'ophthalmology' : 'general-medicine'}`} replace />} />
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
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
