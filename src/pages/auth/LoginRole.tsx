import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { signInWithPassword, signInWithGoogle } from "@/services/auth";
import { ensureDoctorProfile, fetchDoctorProfile, seedPatientsForSpecialty, Specialty } from "@/hooks/useDoctorProfile";
import { useAuth } from "@/contexts/AuthContext";

const roleMap: Record<string, { specialty: Specialty; label: string; dashboard: string; userType: 'cardio' | 'neurology' | 'orthopedics' | 'generic' }> = {
  cardiology: { specialty: "cardiology", label: "Cardiology", dashboard: "/dashboard/cardiology", userType: 'cardio' },
  neurology: { specialty: "neurology", label: "Neurology", dashboard: "/dashboard/neurology", userType: 'neurology' },
  "general-medicine": { specialty: "general_medicine", label: "General Medicine", dashboard: "/dashboard/general", userType: 'generic' },
};

export default function LoginRole() {
  const { role: roleParam } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const roleKey = useMemo(() => (roleParam ?? "general-medicine").toLowerCase(), [roleParam]);
  const roleCfg = roleMap[roleKey] ?? roleMap["general-medicine"];

  useEffect(() => {
    document.title = `${roleCfg.label} Login | AI Medical Portal`;
  }, [roleCfg.label]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPassword(email, password);

      // Verify or create doctor profile
      const existing = await fetchDoctorProfile();
      if (existing && existing.specialty !== roleCfg.specialty) {
        toast({ title: "Access denied", description: `Your account is registered as ${existing.specialty.replace('_',' ')}. Please use the correct portal.`, variant: "destructive" });
        setLoading(false);
        return;
      }
      if (!existing) {
        await ensureDoctorProfile(roleCfg.specialty);
        await seedPatientsForSpecialty(roleCfg.specialty);
      }

      // Keep the existing UI context in sync
      login(roleCfg.userType);
      navigate(roleCfg.dashboard, { replace: true });
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message ?? String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await signInWithGoogle(roleKey);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{roleCfg.label} Portal</CardTitle>
          <CardDescription>Sign in to access your role-based dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
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
            Don’t have an account? <a className="underline" href="/signup">Create one</a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
