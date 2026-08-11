-- =============================================================================
-- SkillPath Finder — Complete Supabase PostgreSQL Master Update Script
-- Supabase Project: https://difjsuzcdhrwkxioovlf.supabase.co
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & USER AUTHENTICATION TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT DEFAULT 'student',
    education TEXT NOT NULL DEFAULT 'Computer Science & Engineering',
    degree TEXT NOT NULL DEFAULT 'Bachelor of Technology (B.Tech)',
    college TEXT DEFAULT 'Engineering Institute of Technology',
    graduation_year TEXT DEFAULT '2026',
    experience TEXT DEFAULT 'Fresher / Student (0-1 Years)',
    interests TEXT[] DEFAULT ARRAY['Machine Learning', 'Cloud Computing', 'Full Stack Web (React/Node)'],
    target_career_id TEXT DEFAULT 'car_mle',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure Unique Email Constraint and Index
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_email_unique ON public.profiles(LOWER(TRIM(email)));

-- 2. USER SKILLS PROFICIENCIES (0-100% SCALE)
CREATE TABLE IF NOT EXISTS public.user_skills (
    user_id TEXT NOT NULL,
    skill_id TEXT NOT NULL,
    proficiency INT NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, skill_id)
);

-- 3. ASSESSMENTS LOGS
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    skill_id TEXT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SAVED ROADMAPS & LEARNING PROGRESS
CREATE TABLE IF NOT EXISTS public.learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    career_id TEXT NOT NULL,
    completed_phases INT[] DEFAULT ARRAY[]::INT[],
    phase_progress JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. O*NET 30.3 MASTER OCCUPATIONS
CREATE TABLE IF NOT EXISTS public.onet_occupations (
    onet_soc_code TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

-- 6. O*NET REPORTED & ALTERNATE JOB TITLES
CREATE TABLE IF NOT EXISTS public.onet_job_titles (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    is_reported_title INT DEFAULT 0
);

-- 7. O*NET ESSENTIAL SKILLS
CREATE TABLE IF NOT EXISTS public.onet_occupation_skills (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT NOT NULL,
    skill_name TEXT NOT NULL,
    scale_id TEXT NOT NULL,
    data_value NUMERIC(5,2) NOT NULL
);

-- 8. O*NET SOFTWARE & HOT TECH
CREATE TABLE IF NOT EXISTS public.onet_software_skills (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    example_software TEXT NOT NULL,
    commodity_title TEXT,
    hot_technology INT DEFAULT 0,
    in_demand INT DEFAULT 0
);

-- 9. O*NET JOB ZONES
CREATE TABLE IF NOT EXISTS public.onet_job_zones (
    onet_soc_code TEXT PRIMARY KEY REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    job_zone INT NOT NULL,
    date_updated TEXT,
    domain_source TEXT
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_occupations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_job_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_occupation_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_software_skills ENABLE ROW LEVEL SECURITY;

-- Allow public and authenticated read/write access for application lifecycle
CREATE POLICY "Allow all read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow all insert on profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update on profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Allow all read on user_skills" ON public.user_skills FOR SELECT USING (true);
CREATE POLICY "Allow all insert on user_skills" ON public.user_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update on user_skills" ON public.user_skills FOR UPDATE USING (true);

CREATE POLICY "Allow all read on onet_occupations" ON public.onet_occupations FOR SELECT USING (true);
CREATE POLICY "Allow all read on onet_job_titles" ON public.onet_job_titles FOR SELECT USING (true);
CREATE POLICY "Allow all read on onet_occupation_skills" ON public.onet_occupation_skills FOR SELECT USING (true);
CREATE POLICY "Allow all read on onet_software_skills" ON public.onet_software_skills FOR SELECT USING (true);

-- SEED DEFAULT DEMO USERS
INSERT INTO public.profiles (id, name, email, role, degree, education, graduation_year, experience, target_career_id)
VALUES 
  ('usr_admin', 'Admin', 'admin@careerpilot.ai', 'admin', 'Super Administrator', 'Institutional Platform Head', 'Faculty', 'Platform Administrator', 'car_mle'),
  ('usr_jupalli', 'Jupalli Sai Praneeth', 'jupallisaipraneeth540@gmail.com', 'student', 'Bachelor of Technology (B.Tech)', 'Computer Science & Engineering', '2026', 'Fresher / Student (0-1 Years)', 'car_fullstack'),
  ('usr_alex', 'Alex Rivera', 'alex.rivera@btech.edu', 'student', 'Bachelor of Technology (B.Tech)', 'Computer Science & Engineering', '2026', '1-2 Years (Internships & Projects)', 'car_mle')
ON CONFLICT (email) DO UPDATE SET 
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();
