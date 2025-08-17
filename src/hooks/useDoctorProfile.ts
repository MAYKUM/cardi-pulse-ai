import { supabase } from "@/integrations/supabase/client";

export type Specialty = "cardiology" | "neurology" | "general_medicine" | "ophthalmology" | "orthopedics";

export interface DoctorProfile {
  id: string;
  name: string | null;
  specialty: Specialty;
  profile_data: Record<string, unknown>;
  created_at: string;
}

export async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function fetchDoctorProfile(): Promise<DoctorProfile | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;
  const { data, error } = await supabase
    .from("doctors")
    .select("id, name, specialty, profile_data, created_at")
    .eq("id", userId)
    .maybeSingle();
  if (error) {
    console.error("Failed fetching doctor profile", error);
    return null;
  }
  return data as DoctorProfile | null;
}

export async function ensureDoctorProfile(specialty: Specialty, name?: string) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("No authenticated user");

  // Try to upsert
  const { data, error } = await supabase
    .from("doctors")
    .upsert(
      [{ id: userId, specialty: specialty as any, name: name ?? null, profile_data: {} }],
      { onConflict: "id" }
    )
    .select("id, name, specialty, profile_data, created_at")
    .single();

  if (error) throw error;
  return data as DoctorProfile;
}

export async function seedPatientsForSpecialty(specialty: Specialty) {
  const { error } = await supabase.rpc("seed_patients_for_current_user", {
    p_specialty: specialty as any,
  });
  if (error) console.error("Seed patients RPC error", error);
}
