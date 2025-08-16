-- Fix the function search path security issue
DROP FUNCTION IF EXISTS validate_medical_history(jsonb);

CREATE OR REPLACE FUNCTION validate_medical_history(data jsonb)
RETURNS boolean 
LANGUAGE plpgsql 
IMMUTABLE 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;