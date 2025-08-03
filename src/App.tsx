import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { PatientDashboard } from "./components/PatientDashboard";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<PatientDashboard />} />
            <Route path="patients/new" element={<PatientIntakeForm />} />
            <Route path="imaging" element={<DicomViewer />} />
            <Route path="ecg" element={<EcgAnalysis />} />
            <Route path="echo" element={<EchoReports />} />
            <Route path="lab" element={<LabResults />} />
            <Route path="telehealth" element={<Telecardiology />} />
            <Route path="devices" element={<DeviceIntegration />} />
            <Route path="appointments" element={<Appointments />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
