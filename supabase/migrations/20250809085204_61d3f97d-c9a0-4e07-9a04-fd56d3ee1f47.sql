-- Create seed activity table for rate limiting RPC usage
CREATE TABLE IF NOT EXISTS public.seed_activity (
  user_id uuid PRIMARY KEY,
  last_seed_at timestamptz NOT NULL DEFAULT now(),
  seeds_today integer NOT NULL DEFAULT 0,
  day date NOT NULL DEFAULT (current_date)
);

-- Helpful index (PK already indexed, but keep for clarity)
CREATE INDEX IF NOT EXISTS idx_seed_activity_day ON public.seed_activity(day);

-- Function to reset daily counters when the day changes
CREATE OR REPLACE FUNCTION public.reset_seed_activity_daily()
RETURNS trigger AS $$
BEGIN
  IF NEW.day <> current_date THEN
    NEW.day := current_date;
    NEW.seeds_today := 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-reset counters on update/insert
DROP TRIGGER IF EXISTS trg_reset_seed_activity_daily ON public.seed_activity;
CREATE TRIGGER trg_reset_seed_activity_daily
BEFORE INSERT OR UPDATE ON public.seed_activity
FOR EACH ROW
EXECUTE FUNCTION public.reset_seed_activity_daily();

-- Rate limited wrapper around existing seed function
CREATE OR REPLACE FUNCTION public.seed_patients_rate_limited(p_specialty text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid;
  v_now timestamptz := now();
  v_last timestamptz;
  v_seeds_today int;
  min_interval interval := interval '10 minutes';
  max_per_day int := 3;
BEGIN
  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Upsert activity row
  INSERT INTO public.seed_activity (user_id, last_seed_at, seeds_today, day)
  VALUES (v_uid, v_now, 0, current_date)
  ON CONFLICT (user_id) DO NOTHING;

  -- Lock the row to avoid races
  SELECT last_seed_at, seeds_today INTO v_last, v_seeds_today
  FROM public.seed_activity
  WHERE user_id = v_uid
  FOR UPDATE;

  -- Reset counters if day changed
  IF (SELECT day FROM public.seed_activity WHERE user_id = v_uid) <> current_date THEN
    UPDATE public.seed_activity SET day = current_date, seeds_today = 0 WHERE user_id = v_uid;
    v_seeds_today := 0;
  END IF;

  -- Enforce per-day cap
  IF v_seeds_today >= max_per_day THEN
    RAISE EXCEPTION 'Rate limit exceeded: maximum % per day', max_per_day;
  END IF;

  -- Enforce minimum interval between calls
  IF v_last IS NOT NULL AND v_now - v_last < min_interval THEN
    RAISE EXCEPTION 'Please wait % minutes between seed operations', EXTRACT(EPOCH FROM min_interval)/60;
  END IF;

  -- Call existing seeding function
  PERFORM public.seed_patients_for_current_user(p_specialty := p_specialty);

  -- Update activity
  UPDATE public.seed_activity
  SET last_seed_at = v_now,
      seeds_today = v_seeds_today + 1
  WHERE user_id = v_uid;
END;
$$;

-- Ensure only authenticated users can execute (anon blocked)
REVOKE ALL ON FUNCTION public.seed_patients_rate_limited(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.seed_patients_rate_limited(text) TO authenticated;