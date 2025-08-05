import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
      <Route path="/" element={<AppShell />}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="patients" element={<div>Patients List Page</div>} />
        <Route path="patients/new" element={<PatientIntakeForm />} />
        <Route path="patients/:id" element={<PatientDashboard />} />
        <Route path="imaging" element={<DicomViewer />} />
        {user.type === 'cardio' && (
          <>
            <Route path="ecg" element={<EcgAnalysis />} />
            <Route path="echo" element={<EchoReports />} />
          </>
        )}
        <Route path="lab" element={<LabResults />} />
        <Route path="telehealth" element={<Telecardiology />} />
        <Route path="devices" element={<DeviceIntegration />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="integrations" element={<div>Integration Hub</div>} />
        <Route path="security" element={<div>Security Settings</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="upload" element={<div>Upload Images</div>} />
        <Route path="search" element={<div>Quick Search</div>} />
        <Route path="appointments/new" element={<div>New Appointment</div>} />
        <Route path="ai-analysis" element={<div>AI Analysis</div>} />
        <Route path="emergency" element={<div>Emergency Procedures</div>} />
        {user.type === 'generic' && (
          <>
            <Route path="reports" element={<div>Test Reports</div>} />
            <Route path="vitals" element={<div>Vital Signs</div>} />
          </>
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
