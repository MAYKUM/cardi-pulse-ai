-- Create medical_specialty enum type with all required values
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'medical_specialty') THEN
    CREATE TYPE medical_specialty AS ENUM ('cardiology', 'neurology', 'general_medicine', 'ophthalmology', 'orthopedics');
  END IF;
END $$;

-- Update doctors table to use the new enum type
ALTER TABLE public.doctors ALTER COLUMN specialty TYPE medical_specialty USING specialty::text::medical_specialty;