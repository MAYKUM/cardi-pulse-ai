-- Fix RLS policies for seed_activity table
-- Add comprehensive RLS policies for the seed_activity table

-- Policy for users to view their own seed activity
CREATE POLICY "Users can view their own seed activity" 
ON public.seed_activity 
FOR SELECT 
USING (user_id = auth.uid());

-- Policy for users to insert their own seed activity
CREATE POLICY "Users can insert their own seed activity" 
ON public.seed_activity 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Policy for users to update their own seed activity
CREATE POLICY "Users can update their own seed activity" 
ON public.seed_activity 
FOR UPDATE 
USING (user_id = auth.uid());

-- Policy for users to delete their own seed activity
CREATE POLICY "Users can delete their own seed activity" 
ON public.seed_activity 
FOR DELETE 
USING (user_id = auth.uid());