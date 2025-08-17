-- Update seed function to handle orthopedics specialty
CREATE OR REPLACE FUNCTION public.seed_patients_for_current_user(p_specialty medical_specialty)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  elsif p_specialty = 'ophthalmology' then
    insert into public.patients (doctor_id, name, age, gender, medical_history)
    values
      (auth.uid(), 'Ravi Kumar', 62, 'male', jsonb_build_object('va', '6/18', 'iop', 24, 'fundus', 'NPDR with macular edema', 'oct', 'CMT 380μm')),
      (auth.uid(), 'Ananya Singh', 48, 'female', jsonb_build_object('va', '6/9', 'iop', 16, 'cornea', 'Keratoconus suspect', 'topography', 'Inferior steepening')),
      (auth.uid(), 'Mohammed Ali', 71, 'male', jsonb_build_object('va', 'CF 2m', 'iop', 12, 'cataract', 'Nuclear sclerosis grade 3', 'biometry', 'AL 23.6mm')),
      (auth.uid(), 'Priya Patel', 7, 'female', jsonb_build_object('va', '6/12', 'strabismus', 'Esotropia 20Δ', 'amblyopia', 'Right eye')),
      (auth.uid(), 'Sanjay Mehta', 58, 'male', jsonb_build_object('va', '6/6', 'iop', 28, 'glaucoma', 'C:D 0.7 with RNFL thinning'));
  elsif p_specialty = 'orthopedics' then
    insert into public.patients (doctor_id, name, age, gender, medical_history)
    values
      (auth.uid(), 'Marcus Thompson', 45, 'male', jsonb_build_object('injury', 'ACL tear', 'mri_findings', 'Complete ACL rupture with mild meniscal tear', 'pain_score', 7)),
      (auth.uid(), 'Jennifer Wilson', 62, 'female', jsonb_build_object('condition', 'Osteoarthritis knee', 'xray_findings', 'Grade 3 joint space narrowing', 'mobility', 'Limited ROM 90 degrees')),
      (auth.uid(), 'Robert Chen', 28, 'male', jsonb_build_object('injury', 'Shoulder dislocation', 'imaging', 'Bankart lesion visible on MR arthrogram', 'instability_episodes', 3)),
      (auth.uid(), 'Linda Davis', 58, 'female', jsonb_build_object('condition', 'Hip replacement candidate', 'harris_score', 42, 'imaging', 'Severe acetabular wear')),
      (auth.uid(), 'Michael Brown', 35, 'male', jsonb_build_object('injury', 'Lumbar disc herniation L4-L5', 'mri_findings', 'Large central disc protrusion', 'nerve_symptoms', 'L5 radiculopathy'));
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
$function$;