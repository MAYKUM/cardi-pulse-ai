-- Create enum for medical specialties
create type if not exists public.medical_specialty as enum ('cardiology','neurology','general_medicine');

-- Doctors table linked to Supabase auth users
create table if not exists public.doctors (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  specialty public.medical_specialty not null,
  profile_data jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Enable RLS on doctors
alter table public.doctors enable row level security;

-- Policies: each user manages only their own doctor profile
create policy if not exists "Doctors: owners can select their profile" on public.doctors
for select to authenticated using (id = auth.uid());

create policy if not exists "Doctors: owners can insert their profile" on public.doctors
for insert to authenticated with check (id = auth.uid());

create policy if not exists "Doctors: owners can update their profile" on public.doctors
for update to authenticated using (id = auth.uid());

create policy if not exists "Doctors: owners can delete their profile" on public.doctors
for delete to authenticated using (id = auth.uid());

-- Patients table
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  name text not null,
  age int,
  gender text,
  medical_history jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_patients_doctor_id on public.patients(doctor_id);
create index if not exists idx_patients_created_at on public.patients(created_at);

-- Enable RLS on patients
alter table public.patients enable row level security;

-- Policies: a doctor can manage only their own patients
create policy if not exists "Patients: doctor can read own" on public.patients
for select to authenticated using (doctor_id = auth.uid());

create policy if not exists "Patients: doctor can insert own" on public.patients
for insert to authenticated with check (doctor_id = auth.uid());

create policy if not exists "Patients: doctor can update own" on public.patients
for update to authenticated using (doctor_id = auth.uid());

create policy if not exists "Patients: doctor can delete own" on public.patients
for delete to authenticated using (doctor_id = auth.uid());

-- Realtime configuration
alter table public.patients replica identity full;
-- Add to realtime publication (safe if already added)
alter publication supabase_realtime add table public.patients;

-- Seed helper function: inserts sample patients for the current user based on specialty
create or replace function public.seed_patients_for_current_user(p_specialty public.medical_specialty)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  -- Ensure the caller has a doctor profile; if missing, create a minimal one using the given specialty
  if not exists (select 1 from public.doctors d where d.id = auth.uid()) then
    insert into public.doctors (id, name, specialty, profile_data)
    values (auth.uid(), 'Dr. ' || initcap(replace(p_specialty::text, '_', ' ')), p_specialty, jsonb_build_object('auto_created', true))
    on conflict (id) do nothing;
  end if;

  -- Insert specialty-specific demo patients
  if p_specialty = 'cardiology' then
    insert into public.patients (doctor_id, name, age, gender, medical_history)
    values
      (auth.uid(), 'John Carter', 58, 'male', jsonb_build_object('blood_pressure', '138/86', 'cholesterol_total', 225, 'ecg', 'Sinus rhythm with occasional PVCs')),
      (auth.uid(), 'Maria Lopez', 66, 'female', jsonb_build_object('blood_pressure', '150/92', 'cholesterol_total', 248, 'ecg', 'ST depression in V4-V6')),
      (auth.uid(), 'Ahmed Khan', 49, 'male', jsonb_build_object('blood_pressure', '128/78', 'cholesterol_total', 190, 'ecg', 'Normal sinus rhythm')),
      (auth.uid(), 'Sophia Rossi', 72, 'female', jsonb_build_object('blood_pressure', '142/88', 'cholesterol_total', 210, 'ecg', 'AFib episodes noted on Holter')),
      (auth.uid(), 'Wei Zhang', 61, 'male', jsonb_build_object('blood_pressure', '160/100', 'cholesterol_total', 265, 'ecg', 'Left ventricular hypertrophy'));
  elsif p_specialty = 'neurology' then
    insert into public.patients (doctor_id, name, age, gender, medical_history)
    values
      (auth.uid(), 'Emily Clark', 34, 'female', jsonb_build_object('mri_notes', 'Small demyelinating lesions in periventricular area', 'neuro_assessment', 'EDSS 1.5')),
      (auth.uid(), 'Liam Johnson', 55, 'male', jsonb_build_object('mri_notes', 'No acute infarct, chronic microvascular changes', 'neuro_assessment', 'MMSE 28/30')),
      (auth.uid(), 'Noah Brown', 42, 'male', jsonb_build_object('eeg', 'Generalized spike-and-wave discharges', 'neuro_assessment', 'Seizure control improved')),
      (auth.uid(), 'Olivia Wilson', 29, 'female', jsonb_build_object('mri_notes', 'Chiari I malformation suspected', 'neuro_assessment', 'Headache diary shows weekly episodes')),
      (auth.uid(), 'Ava Taylor', 63, 'female', jsonb_build_object('eeg', 'Focal temporal lobe spikes', 'neuro_assessment', 'Cognitive testing normal'));
  else
    -- general_medicine
    insert into public.patients (doctor_id, name, age, gender, medical_history)
    values
      (auth.uid(), 'Peter Nguyen', 45, 'male', jsonb_build_object('blood_pressure', '128/82', 'cholesterol_total', 185, 'notes', 'Annual checkup')),
      (auth.uid(), 'Hannah Kim', 37, 'female', jsonb_build_object('blood_pressure', '118/76', 'hba1c', 5.4, 'notes', 'Routine labs normal')),
      (auth.uid(), 'Jacob Miller', 52, 'male', jsonb_build_object('blood_pressure', '136/88', 'hba1c', 6.2, 'notes', 'Prediabetes counseling')),
      (auth.uid(), 'Aisha Patel', 31, 'female', jsonb_build_object('blood_pressure', '110/70', 'notes', 'Vaccinations updated')),
      (auth.uid(), 'Lucas Garcia', 68, 'male', jsonb_build_object('blood_pressure', '146/90', 'hba1c', 7.1, 'notes', 'DM2 management'));
  end if;
end;
$$;
