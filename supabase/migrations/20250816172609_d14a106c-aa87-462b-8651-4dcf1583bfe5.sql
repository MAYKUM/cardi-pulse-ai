-- Add foreign key constraint between patients and doctors tables
-- This ensures data integrity and enables proper JOIN operations

ALTER TABLE public.patients 
ADD CONSTRAINT fk_patients_doctor_id 
FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON DELETE CASCADE;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON public.patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_created_at ON public.patients(created_at);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON public.doctors(specialty);

-- Add validation function for JSONB medical data
CREATE OR REPLACE FUNCTION validate_medical_history(data jsonb)
RETURNS boolean AS $$
BEGIN
  -- Basic validation to ensure medical history contains valid data
  -- Reject if it contains potentially dangerous script content
  IF data::text ~* '<script|javascript:|on\w+\s*=' THEN
    RETURN FALSE;
  END IF;
  
  -- Ensure it's valid JSON and not too large (max 100KB)
  IF length(data::text) > 102400 THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add check constraint for medical_history validation
ALTER TABLE public.patients 
ADD CONSTRAINT valid_medical_history 
CHECK (validate_medical_history(medical_history));

-- Add check constraint for profile_data validation
ALTER TABLE public.doctors 
ADD CONSTRAINT valid_profile_data 
CHECK (validate_medical_history(profile_data));