import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Import critical shell components directly for immediate availability
import { AppShell } from "./components/AppShell";
import { OphthalmologyShell } from "./components/ophthalmology/OphthalmologyShell";
import { LoginPage } from "./components/LoginPage";

// Optimized lazy loading with correct export structure
const EnhancedDashboard = React.lazy(() => import("./components/EnhancedDashboard").then(module => ({ default: module.EnhancedDashboard })));
const PatientDashboard = React.lazy(() => import("./components/PatientDashboard").then(module => ({ default: module.PatientDashboard })));
const PatientIntakeForm = React.lazy(() => import("./components/PatientIntakeForm").then(module => ({ default: module.PatientIntakeForm })));
const DicomViewer = React.lazy(() => import("./components/DicomViewer").then(module => ({ default: module.DicomViewer })));
const EcgAnalysis = React.lazy(() => import("./components/EcgAnalysis").then(module => ({ default: module.EcgAnalysis })));
const EchoReports = React.lazy(() => import("./components/EchoReports").then(module => ({ default: module.EchoReports })));
const LabResults = React.lazy(() => import("./components/LabResults").then(module => ({ default: module.LabResults })));
const Telecardiology = React.lazy(() => import("./components/Telecardiology").then(module => ({ default: module.Telecardiology })));
const DeviceIntegration = React.lazy(() => import("./components/DeviceIntegration").then(module => ({ default: module.DeviceIntegration })));
const Appointments = React.lazy(() => import("./components/Appointments").then(module => ({ default: module.Appointments })));
const IntegrationsHub = React.lazy(() => import("./components/IntegrationsHub").then(module => ({ default: module.IntegrationsHub })));
const EEGAnalysis = React.lazy(() => import("./components/EEGAnalysis").then(module => ({ default: module.EEGAnalysis })));
const VideoEEG = React.lazy(() => import("./components/VideoEEG").then(module => ({ default: module.VideoEEG })));
const EMGPanel = React.lazy(() => import("./components/EMGPanel").then(module => ({ default: module.EMGPanel })));
const XrayAnalysis = React.lazy(() => import("./components/XrayAnalysis").then(module => ({ default: module.XrayAnalysis })));
const SurgicalPlanning = React.lazy(() => import("./components/SurgicalPlanning").then(module => ({ default: module.SurgicalPlanning })));
const RehabTracker = React.lazy(() => import("./components/RehabTracker").then(module => ({ default: module.RehabTracker })));
const PatientsList = React.lazy(() => import("./components/PatientsList").then(module => ({ default: module.PatientsList })));
const NewAppointment = React.lazy(() => import("./components/NewAppointment").then(module => ({ default: module.NewAppointment })));
const LogoutPage = React.lazy(() => import("./pages/auth/LogoutPage"));
const AIAnalysisChat = React.lazy(() => import("./components/AIAnalysisChat"));
const OphthalmologyDashboard = React.lazy(() => import("./components/ophthalmology/OphthalmologyDashboard"));
const MultimodalImagingViewer = React.lazy(() => import("./components/ophthalmology/MultimodalImagingViewer"));
const IOLPlanning = React.lazy(() => import("./components/ophthalmology/IOLPlanning"));
const GlaucomaSuite = React.lazy(() => import("./components/ophthalmology/GlaucomaSuite"));
const TeleScreeningPortal = React.lazy(() => import("./components/ophthalmology/TeleScreeningPortal"));
const SettingsPage = React.lazy(() => import("./components/settings/SettingsPage").then(module => ({ default: module.SettingsPage })));
const NeuropsychTests = React.lazy(() => import("./components/NeuropsychTests").then(module => ({ default: module.NeuropsychTests })));
const MovementTracking = React.lazy(() => import("./components/MovementTracking").then(module => ({ default: module.MovementTracking })));
const SeizureLogs = React.lazy(() => import("./components/SeizureLogs").then(module => ({ default: module.SeizureLogs })));
const SecuritySettings = React.lazy(() => import("./components/SecuritySettings").then(module => ({ default: module.SecuritySettings })));
const ImageUpload = React.lazy(() => import("./components/ImageUpload").then(module => ({ default: module.ImageUpload })));
const QuickSearch = React.lazy(() => import("./components/QuickSearch").then(module => ({ default: module.QuickSearch })));
const BoneViewer3D = React.lazy(() => import("./components/BoneViewer3D").then(module => ({ default: module.BoneViewer3D })));
const FractureHealing = React.lazy(() => import("./components/FractureHealing").then(module => ({ default: module.FractureHealing })));
const OsteoporosisRisk = React.lazy(() => import("./components/OsteoporosisRisk").then(module => ({ default: module.OsteoporosisRisk })));
const JointReplacementRegistry = React.lazy(() => import("./components/JointReplacementRegistry").then(module => ({ default: module.JointReplacementRegistry })));
const TeleOrthoConsult = React.lazy(() => import("./components/TeleOrthoConsult").then(module => ({ default: module.TeleOrthoConsult })));
const TestReports = React.lazy(() => import("./components/TestReports").then(module => ({ default: module.TestReports })));
const VitalSigns = React.lazy(() => import("./components/VitalSigns").then(module => ({ default: module.VitalSigns })));
const EmergencyProcedures = React.lazy(() => import("./components/EmergencyProcedures").then(module => ({ default: module.EmergencyProcedures })));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Import critical skeleton for immediate LCP improvement
import { CriticalDashboardSkeleton } from "./components/CriticalDashboardSkeleton";

// Create query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retries for faster loading
    },
  },
});

// Optimized loading component with critical above-the-fold content
const LoadingSpinner = () => <CriticalDashboardSkeleton />;

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
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
          <Route path="ai-analysis" element={<AIAnalysisChat specialty="cardiology" />} />
          <Route path="upload" element={<ImageUpload />} />
          <Route path="search" element={<QuickSearch />} />
          <Route path="emergency" element={<EmergencyProcedures />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/neurology" element={<AppShell />}>
          <Route index element={<EnhancedDashboard />} />
          <Route path="dashboard" element={<EnhancedDashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/new" element={<PatientIntakeForm />} />
          <Route path="patients/:id" element={<PatientDashboard />} />
          <Route path="eeg" element={<EEGAnalysis />} />
          <Route path="video-eeg" element={<VideoEEG />} />
          <Route path="emg" element={<EMGPanel />} />
          <Route path="imaging" element={<DicomViewer />} />
          <Route path="neuropsych" element={<NeuropsychTests />} />
          <Route path="movement" element={<MovementTracking />} />
          <Route path="lab" element={<LabResults />} />
          <Route path="seizure-logs" element={<SeizureLogs />} />
          <Route path="telehealth" element={<Telecardiology />} />
          <Route path="devices" element={<DeviceIntegration />} />
          <Route path="integrations" element={<IntegrationsHub />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/new" element={<NewAppointment />} />
          <Route path="ai-analysis" element={<AIAnalysisChat specialty="neurology" />} />
          <Route path="upload" element={<ImageUpload />} />
          <Route path="search" element={<QuickSearch />} />
          <Route path="emergency" element={<EmergencyProcedures />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/orthopedics" element={<AppShell />}>
          <Route index element={<EnhancedDashboard />} />
          <Route path="dashboard" element={<EnhancedDashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/new" element={<PatientIntakeForm />} />
          <Route path="patients/:id" element={<PatientDashboard />} />
          <Route path="xray" element={<XrayAnalysis />} />
          <Route path="3d-viewer" element={<BoneViewer3D />} />
          <Route path="surgical-planning" element={<SurgicalPlanning />} />
          <Route path="imaging" element={<DicomViewer />} />
          <Route path="rehab" element={<RehabTracker />} />
          <Route path="fracture-healing" element={<FractureHealing />} />
          <Route path="osteoporosis" element={<OsteoporosisRisk />} />
          <Route path="joint-registry" element={<JointReplacementRegistry />} />
          <Route path="tele-consult" element={<TeleOrthoConsult />} />
          <Route path="ai-analysis" element={<AIAnalysisChat specialty="orthopedics" />} />
          <Route path="lab" element={<LabResults />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/new" element={<NewAppointment />} />
          <Route path="integrations" element={<IntegrationsHub />} />
          <Route path="upload" element={<ImageUpload />} />
          <Route path="search" element={<QuickSearch />} />
          <Route path="emergency" element={<EmergencyProcedures />} />
        </Route>

        <Route path="/ophthalmology" element={<OphthalmologyShell />}>
          <Route index element={<OphthalmologyDashboard />} />
          <Route path="dashboard" element={<OphthalmologyDashboard />} />
          <Route path="imaging" element={<MultimodalImagingViewer />} />
          <Route path="iol-planning" element={<IOLPlanning />} />
          <Route path="glaucoma" element={<GlaucomaSuite />} />
          <Route path="telemedicine" element={<TeleScreeningPortal />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/new" element={<PatientIntakeForm />} />
          <Route path="ai-analysis" element={<AIAnalysisChat specialty="ophthalmology" />} />
          <Route path="upload" element={<ImageUpload />} />
          <Route path="search" element={<QuickSearch />} />
          <Route path="emergency" element={<EmergencyProcedures />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/general-medicine" element={<AppShell />}>
          <Route index element={<EnhancedDashboard />} />
          <Route path="dashboard" element={<EnhancedDashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/new" element={<PatientIntakeForm />} />
          <Route path="patients/:id" element={<PatientDashboard />} />
          <Route path="lab" element={<LabResults />} />
          <Route path="imaging" element={<DicomViewer />} />
          <Route path="reports" element={<TestReports />} />
          <Route path="vitals" element={<VitalSigns />} />
          <Route path="telehealth" element={<Telecardiology />} />
          <Route path="devices" element={<DeviceIntegration />} />
          <Route path="integrations" element={<IntegrationsHub />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/new" element={<NewAppointment />} />
          <Route path="ai-analysis" element={<AIAnalysisChat specialty="general-medicine" />} />
          <Route path="upload" element={<ImageUpload />} />
          <Route path="search" element={<QuickSearch />} />
          <Route path="emergency" element={<EmergencyProcedures />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;