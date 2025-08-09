import { supabase } from "@/integrations/supabase/client";

/**
 * Centralized Auth service for Supabase interactions.
 * Keeps components lean and improves testability.
 */
export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithGoogle(roleKey: string) {
  // Keep redirect behavior identical to existing implementation
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/login/${roleKey}` },
  });
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user ?? null;
}
