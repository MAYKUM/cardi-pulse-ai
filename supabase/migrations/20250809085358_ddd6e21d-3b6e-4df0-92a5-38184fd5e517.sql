-- Enable RLS on seed_activity and keep it private (no policies means no direct access)
ALTER TABLE public.seed_activity ENABLE ROW LEVEL SECURITY;

-- Ensure trigger function also pins search_path for safety
CREATE OR REPLACE FUNCTION public.reset_seed_activity_daily()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.day <> current_date THEN
    NEW.day := current_date;
    NEW.seeds_today := 0;
  END IF;
  RETURN NEW;
END;
$$;

-- Optional: explicitly revoke table privileges from anonymous role
REVOKE ALL ON TABLE public.seed_activity FROM anon;