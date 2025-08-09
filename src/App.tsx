import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppShell } from "./components/AppShell";

const EnhancedDashboard = lazy(() => import("./components/EnhancedDashboard").then(m => ({ default: m.EnhancedDashboard })));
const PatientDashboard = lazy(() => import("./components/PatientDashboard").then(m => ({ default: m.PatientDashboard })));
const PatientIntakeForm = lazy(() => import("./components/PatientIntakeForm").then(m => ({ default: m.PatientIntakeForm })));
const DicomViewer = lazy(() => import("./components/DicomViewer").then(m => ({ default: m.DicomViewer })));
const EcgAnalysis = lazy(() => import("./components/EcgAnalysis").then(m => ({ default: m.EcgAnalysis })));
const EchoReports = lazy(() => import("./components/EchoReports").then(m => ({ default: m.EchoReports })));
const LabResults = lazy(() => import("./components/LabResults").then(m => ({ default: m.LabResults })));
const Telecardiology = lazy(() => import("./components/Telecardiology").then(m => ({ default: m.Telecardiology })));
const DeviceIntegration = lazy(() => import("./components/DeviceIntegration").then(m => ({ default: m.DeviceIntegration })));
const Appointments = lazy(() => import("./components/Appointments").then(m => ({ default: m.Appointments })));
const IntegrationsHub = lazy(() => import("./components/IntegrationsHub").then(m => ({ default: m.IntegrationsHub })));
const EEGAnalysis = lazy(() => import("./components/EEGAnalysis").then(m => ({ default: m.EEGAnalysis })));
const VideoEEG = lazy(() => import("./components/VideoEEG").then(m => ({ default: m.VideoEEG })));
const EMGPanel = lazy(() => import("./components/EMGPanel").then(m => ({ default: m.EMGPanel })));
const XrayAnalysis = lazy(() => import("./components/XrayAnalysis").then(m => ({ default: m.XrayAnalysis })));
const SurgicalPlanning = lazy(() => import("./components/SurgicalPlanning").then(m => ({ default: m.SurgicalPlanning })));
const RehabTracker = lazy(() => import("./components/RehabTracker").then(m => ({ default: m.RehabTracker })));
const PatientsList = lazy(() => import("./components/PatientsList").then(m => ({ default: m.PatientsList })));
const NewAppointment = lazy(() => import("./components/NewAppointment").then(m => ({ default: m.NewAppointment })));

const LoginRole = lazy(() => import("./pages/auth/LoginRole"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
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
      </Suspense>
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
        <Route path="settings" element={<div>Orthopedics Settings</div>} />
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
      
      {/* Dashboard role entry points */}
      <Route path="/dashboard">
        <Route path="cardiology" element={<Navigate to="/cardiology/dashboard" replace />} />
        <Route path="neurology" element={<Navigate to="/neurology/dashboard" replace />} />
        <Route path="general" element={<Navigate to="/general-medicine/dashboard" replace />} />
      </Route>
      
      {/* Legacy routes - redirect to specialty-specific routes */}
      <Route path="/" element={<Navigate to={`/${user.type === 'cardio' ? 'cardiology' : user.type === 'neurology' ? 'neurology' : user.type === 'orthopedics' ? 'orthopedics' : 'general-medicine'}`} replace />} />
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
