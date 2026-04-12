-- ============================================================
-- CarHakiki — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- ============================================================
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================


-- ============================================================
-- TABLE: profiles
-- Auto-created when a user signs up via Supabase Auth.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email            TEXT,
  phone            TEXT,
  full_name        TEXT,
  reports_remaining INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: auto-create a profile row when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- TABLE: payments
-- Created by: api/payment/callback/route.ts
-- Columns exactly match what the code upserts/queries.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id         TEXT UNIQUE NOT NULL,          -- Pesapal OrderTrackingId (conflict key)
  user_id          UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  vin              TEXT,
  amount           NUMERIC(12, 2) NOT NULL DEFAULT 0,
  currency         TEXT NOT NULL DEFAULT 'TZS',
  status           TEXT NOT NULL DEFAULT 'pending', -- pending | completed | failed
  provider         TEXT NOT NULL DEFAULT 'pesapal',
  provider_ref     TEXT,                           -- Pesapal OrderMerchantReference
  reports_included INTEGER NOT NULL DEFAULT 1,
  reports_used     INTEGER NOT NULL DEFAULT 0,
  pricing_tier     TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS payments_order_id_idx  ON public.payments (order_id);
CREATE INDEX IF NOT EXISTS payments_user_id_idx   ON public.payments (user_id);
CREATE INDEX IF NOT EXISTS payments_vin_idx       ON public.payments (vin);
CREATE INDEX IF NOT EXISTS payments_status_idx    ON public.payments (status);


-- ============================================================
-- TABLE: reports
-- Created by: api/payment/callback/route.ts (upsert)
-- Read by:    api/report/[id]/route.ts + dashboard/page.tsx
-- Note: id is TEXT (format: "RPT-{timestamp}") — matches code.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reports (
  id               TEXT PRIMARY KEY,              -- RPT-{timestamp} from generate route
  user_id          UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_id         TEXT REFERENCES public.payments(order_id) ON DELETE SET NULL,
  vin              TEXT NOT NULL,
  vehicle_info     JSONB,                          -- NHTSA decoded vehicle data
  report_data      JSONB,                          -- Full report object (returned to client)
  status           TEXT NOT NULL DEFAULT 'completed',
  data_source      TEXT,                           -- 'GlobalVIN CARFAX' | 'NHTSA (basic)'
  overall_score    INTEGER,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reports_user_id_idx    ON public.reports (user_id);
CREATE INDEX IF NOT EXISTS reports_vin_idx        ON public.reports (vin);
CREATE INDEX IF NOT EXISTS reports_order_id_idx   ON public.reports (order_id);
CREATE INDEX IF NOT EXISTS reports_created_at_idx ON public.reports (created_at DESC);


-- ============================================================
-- TABLE: vin_cache
-- Prevents duplicate GlobalVIN API charges ($3/call).
-- Cached entries expire after 30 days.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.vin_cache (
  vin              TEXT PRIMARY KEY,
  raw_data         JSONB NOT NULL,
  fetched_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at       TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days')
);

CREATE INDEX IF NOT EXISTS vin_cache_expires_at_idx ON public.vin_cache (expires_at);


-- ============================================================
-- ROW LEVEL SECURITY
-- Service role key (used by all server routes) bypasses RLS.
-- Anon key (used by dashboard client) needs explicit policies.
-- ============================================================

ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vin_cache ENABLE ROW LEVEL SECURITY;

-- profiles: users can read/update only their own row
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- payments: service role only (no direct client access needed)
-- (No anon/user policies — server routes use service role key which bypasses RLS)

-- reports: allow authenticated users to read their own reports;
-- also allow anon reads so the dashboard (pre-auth MVP) can display reports.
-- Tighten this to auth.uid() = user_id once full auth is implemented.
CREATE POLICY "Anyone can read reports (MVP)"
  ON public.reports FOR SELECT
  USING (true);

-- vin_cache: service role only (no direct client access needed)
-- (No anon/user policies — only server routes touch this table)
