import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ensureDoctorProfile, fetchDoctorProfile, seedPatientsForSpecialty, Specialty } from "@/hooks/useDoctorProfile";
import { useAuth } from "@/contexts/AuthContext";

const roleMap: Record<string, { specialty: Specialty; label: string; dashboard: string; userType: 'cardio' | 'neurology' | 'orthopedics' | 'generic' | 'ophthalmology' }> = {
  cardiology: { specialty: "cardiology", label: "Cardiology", dashboard: "/cardiology", userType: 'cardio' },
  neurology: { specialty: "neurology", label: "Neurology", dashboard: "/neurology", userType: 'neurology' },
  ophthalmology: { specialty: "ophthalmology", label: "Ophthalmology", dashboard: "/ophthalmology", userType: 'ophthalmology' },
  orthopedics: { specialty: "orthopedics", label: "Orthopedics", dashboard: "/orthopedics", userType: 'orthopedics' },
  "general-medicine": { specialty: "general_medicine", label: "General Medicine", dashboard: "/general-medicine", userType: 'generic' },
};

export default function LoginRole() {
  const { role: roleParam } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const roleKey = useMemo(() => (roleParam ?? "general-medicine").toLowerCase(), [roleParam]);
  const roleCfg = roleMap[roleKey] ?? roleMap["general-medicine"];

  useEffect(() => {
    document.title = `${roleCfg.label} Login | AI Medical Portal`;
    // Auto-login when component mounts
    handleAutoLogin();
  }, [roleCfg.label]);

  const handleAutoLogin = async () => {
    setLoading(true);
    try {
      // Skip actual authentication - just navigate to dashboard
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;

      // Verify or create doctor profile
      // const existing = await fetchDoctorProfile();
      // if (existing && existing.specialty !== roleCfg.specialty) {
      //   toast({ title: "Access denied", description: `Your account is registered as ${existing.specialty.replace('_',' ')}. Please use the correct portal.`, variant: "destructive" });
      //   setLoading(false);
      //   return;
      // }
      // if (!existing) {
      //   await ensureDoctorProfile(roleCfg.specialty);
      //   await seedPatientsForSpecialty(roleCfg.specialty);
      // }

      // Navigate directly to the dashboard - auto-login for specialty
      navigate(roleCfg.dashboard, { replace: true });
    } catch (err: unknown) {
      toast({ title: "Auto-login failed", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogle = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: { redirectTo: `${window.location.origin}/login/${roleKey}` }
  //   });
  // };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{roleCfg.label} Portal</CardTitle>
          <CardDescription>Automatically logging you into your role-based dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@hospital.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Button variant="secondary" className="w-full" onClick={handleGoogle}>
            Continue with Google
          </Button>
          <p className="text-sm opacity-80 text-center">
            Don't have an account? <a className="underline" href="/signup">Create one</a>
          </p> */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Automatically logging you into the {roleCfg.label} portal...
            </p>
            {loading && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}