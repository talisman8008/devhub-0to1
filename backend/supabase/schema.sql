CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(120) NOT NULL DEFAULT '',
  contact_number VARCHAR(20) NOT NULL DEFAULT '',
  college_name VARCHAR(160) NOT NULL DEFAULT '',
  city VARCHAR(80) NOT NULL DEFAULT '',
  course_background VARCHAR(120) NOT NULL DEFAULT '',
  area_of_interest VARCHAR(120) NOT NULL DEFAULT '',
  why_join TEXT NOT NULL DEFAULT '',
  skill_level VARCHAR(50) NOT NULL DEFAULT '',
  solo_or_team VARCHAR(50) NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(100) DEFAULT 'landing_page',
  ip_hash VARCHAR(64) NULL,
  razorpay_payment_id VARCHAR(100) NULL,
  razorpay_order_id VARCHAR(100) NULL,
  payment_plan VARCHAR(50) NULL
);

ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS full_name VARCHAR(120) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS contact_number VARCHAR(20) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS college_name VARCHAR(160) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS city VARCHAR(80) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS course_background VARCHAR(120) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS area_of_interest VARCHAR(120) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS why_join TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS skill_level VARCHAR(50) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS solo_or_team VARCHAR(50) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS razorpay_payment_id VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS razorpay_order_id VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS payment_plan VARCHAR(50) NULL;

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block anon select" ON public.waitlist;
CREATE POLICY "Block anon select" ON public.waitlist
  FOR SELECT
  TO anon
  USING (false);

DROP POLICY IF EXISTS "Block anon insert" ON public.waitlist;
DROP POLICY IF EXISTS "Allow anon insert" ON public.waitlist;
CREATE POLICY "Allow anon insert" ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure anon role has permissions to access the schema and table
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.waitlist TO anon, authenticated;

NOTIFY pgrst, 'reload schema';
