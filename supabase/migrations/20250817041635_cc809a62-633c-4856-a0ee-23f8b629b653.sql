-- Create medical_specialty enum type
CREATE TYPE IF NOT EXISTS medical_specialty AS ENUM ('cardiology', 'neurology', 'general_medicine', 'ophthalmology', 'orthopedics');

-- Update doctors table to use the new enum type
ALTER TABLE public.doctors ALTER COLUMN specialty TYPE medical_specialty USING specialty::text::medical_specialty;