export type { 
  Specialty,
  DoctorProfile,
} from "@/services/doctor";

export {
  getCurrentUserId,
  fetchDoctorProfile,
  ensureDoctorProfile,
  seedPatientsForSpecialty,
} from "@/services/doctor";
