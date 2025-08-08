import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId } from "./useDoctorProfile";

export interface PatientRow {
  id: string;
  doctor_id: string;
  name: string;
  age: number | null;
  gender: string | null;
  medical_history: any;
  created_at: string;
}

export function usePatientsRealtime() {
  const [patients, setPatients] = useState<PatientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let active = true;

    (async () => {
      const uid = await getCurrentUserId();
      if (!uid) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("patients")
        .select("id, doctor_id, name, age, gender, medical_history, created_at")
        .eq("doctor_id", uid)
        .order("created_at", { ascending: false });

      if (!active) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setPatients((data as PatientRow[]) ?? []);
      setLoading(false);

      channel = supabase
        .channel("patients-realtime")
        .on('postgres_changes', { event: '*', schema: 'public', table: 'patients' }, (payload: any) => {
          const row = payload.new ?? payload.old;
          if (!row || row.doctor_id !== uid) return;
          setPatients((prev) => {
            switch (payload.eventType) {
              case 'INSERT':
                return [payload.new as PatientRow, ...prev];
              case 'UPDATE':
                return prev.map(p => p.id === row.id ? (payload.new as PatientRow) : p);
              case 'DELETE':
                return prev.filter(p => p.id !== row.id);
              default:
                return prev;
            }
          });
        })
        .subscribe();
    })();

    return () => {
      active = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return { patients, loading, error };
}
