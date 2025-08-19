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
import LogoutPage from "./pages/auth/LogoutPage";
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
import { ImageUpload } from "./components/ImageUpload";
import { QuickSearch } from "./components/QuickSearch";
import { BoneViewer3D } from "./components/BoneViewer3D";
import { FractureHealing } from "./components/FractureHealing";
import { OsteoporosisRisk } from "./components/OsteoporosisRisk";
import { JointReplacementRegistry } from "./components/JointReplacementRegistry";
import { TeleOrthoConsult } from "./components/TeleOrthoConsult";
import { TestReports } from "./components/TestReports";
import { VitalSigns } from "./components/VitalSigns";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/:role" element={<LoginRole />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/cardiology" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
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
        <Route path="security" element={<SecuritySettings />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="upload" element={<ImageUpload />} />
        <Route path="search" element={<QuickSearch />} />
        <Route path="ai-analysis" element={<AIAnalysisChat specialty="cardiology" />} />
        <Route path="emergency" element={<EmergencyProcedures />} />
      </Route>
      
      <Route path="/neurology" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
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
        <Route path="upload" element={<ImageUpload />} />
        <Route path="search" element={<QuickSearch />} />
        <Route path="ai-analysis" element={<AIAnalysisChat specialty="neurology" />} />
        <Route path="emergency" element={<EmergencyProcedures />} />
      </Route>

      <Route path="/ophthalmology" element={<ProtectedRoute><OphthalmologyShell /></ProtectedRoute>}>
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
      
      <Route path="/orthopedics" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="dashboard" element={<EnhancedDashboard />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<DicomViewer />} />
        <Route path="xray" element={<XrayAnalysis />} />
        <Route path="3d-viewer" element={<BoneViewer3D />} />
        <Route path="surgical-planning" element={<SurgicalPlanning />} />
        <Route path="rehab" element={<RehabTracker />} />
        <Route path="fracture-healing" element={<FractureHealing />} />
        <Route path="osteoporosis" element={<OsteoporosisRisk />} />
        <Route path="joint-registry" element={<JointReplacementRegistry />} />
        <Route path="tele-consult" element={<TeleOrthoConsult />} />
        <Route path="lab" element={<LabResults />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      <Route path="/general-medicine" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="dashboard" element={<EnhancedDashboard />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<DicomViewer />} />
        <Route path="lab" element={<LabResults />} />
        <Route path="reports" element={<TestReports />} />
        <Route path="vitals" element={<VitalSigns />} />
        <Route path="telehealth" element={<Telecardiology />} />
        <Route path="devices" element={<DeviceIntegration />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/new" element={<NewAppointment />} />
        <Route path="integrations" element={<IntegrationsHub />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="upload" element={<ImageUpload />} />
        <Route path="search" element={<QuickSearch />} />
        <Route path="ai-analysis" element={<AIAnalysisChat specialty="general-medicine" />} />
        <Route path="emergency" element={<EmergencyProcedures />} />
      </Route>

      
      {/* Dashboard role entry points */}
      <Route path="/dashboard">
        <Route path="cardiology" element={<Navigate to="/cardiology/dashboard" replace />} />
        <Route path="neurology" element={<Navigate to="/neurology/dashboard" replace />} />
        <Route path="ophthalmology" element={<Navigate to="/ophthalmology/dashboard" replace />} />
        <Route path="orthopedics" element={<Navigate to="/orthopedics/dashboard" replace />} />
        <Route path="general" element={<Navigate to="/general-medicine/dashboard" replace />} />
      </Route>

      {/* If an authenticated user hits any /login/* URL, redirect them to dashboard selection */}
      <Route path="/login/*" element={<Navigate to="/" replace />} />
      
      {/* Root route for authenticated users - redirect based on their type */}
      <Route path="/" element={
        <Navigate 
          to={`/${user.type === 'cardio' ? 'cardiology' : user.type === 'neurology' ? 'neurology' : user.type === 'orthopedics' ? 'orthopedics' : user.type === 'ophthalmology' ? 'ophthalmology' : 'general-medicine'}/dashboard`} 
          replace 
        />
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
