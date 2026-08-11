-- =====================================================================
-- O*NET 30.3 PostgreSQL / Supabase Cloud Schema
-- May 2026 Release (U.S. Department of Labor USDOL/ETA)
-- =====================================================================

-- 1. Occupations Master Table
CREATE TABLE IF NOT EXISTS public.onet_occupations (
    onet_soc_code TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

-- 2. Alternate & Reported Job Titles
CREATE TABLE IF NOT EXISTS public.onet_job_titles (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    is_reported_title INT DEFAULT 0
);

-- 3. Essential Skills
CREATE TABLE IF NOT EXISTS public.onet_occupation_skills (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT NOT NULL,
    skill_name TEXT NOT NULL,
    scale_id TEXT NOT NULL,
    data_value NUMERIC(5,2) NOT NULL
);

-- 4. Transferable Skills
CREATE TABLE IF NOT EXISTS public.onet_transferable_skills (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT NOT NULL,
    skill_name TEXT NOT NULL,
    scale_id TEXT NOT NULL,
    data_value NUMERIC(5,2) NOT NULL
);

-- 5. Knowledge Domains
CREATE TABLE IF NOT EXISTS public.onet_knowledge (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT NOT NULL,
    knowledge_name TEXT NOT NULL,
    scale_id TEXT NOT NULL,
    data_value NUMERIC(5,2) NOT NULL
);

-- 6. Abilities
CREATE TABLE IF NOT EXISTS public.onet_abilities (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT NOT NULL,
    ability_name TEXT NOT NULL,
    scale_id TEXT NOT NULL,
    data_value NUMERIC(5,2) NOT NULL
);

-- 7. Software & Hot Technologies
CREATE TABLE IF NOT EXISTS public.onet_software_skills (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    example_software TEXT NOT NULL,
    commodity_title TEXT,
    hot_technology INT DEFAULT 0,
    in_demand INT DEFAULT 0
);

-- 8. Job Zones Reference & Occupations
CREATE TABLE IF NOT EXISTS public.onet_job_zone_reference (
    job_zone INT PRIMARY KEY,
    name TEXT NOT NULL,
    experience TEXT,
    education TEXT,
    job_training TEXT,
    examples TEXT,
    svp_range TEXT
);

CREATE TABLE IF NOT EXISTS public.onet_job_zones (
    onet_soc_code TEXT PRIMARY KEY REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    job_zone INT NOT NULL REFERENCES public.onet_job_zone_reference(job_zone),
    date_updated TEXT,
    domain_source TEXT
);

-- 9. RIASEC Interests
CREATE TABLE IF NOT EXISTS public.onet_career_interest_types (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT,
    interest_type TEXT NOT NULL,
    scale_id TEXT,
    data_value NUMERIC(5,2)
);

-- 10. Work Styles
CREATE TABLE IF NOT EXISTS public.onet_work_styles (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT,
    work_style_name TEXT NOT NULL,
    scale_id TEXT,
    data_value NUMERIC(5,2)
);

-- 11. Work Activities
CREATE TABLE IF NOT EXISTS public.onet_work_activities (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    element_id TEXT,
    activity_name TEXT NOT NULL,
    scale_id TEXT,
    data_value NUMERIC(5,2)
);

-- 12. Tasks & Emerging Tasks
CREATE TABLE IF NOT EXISTS public.onet_tasks (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    task_id TEXT,
    task_statement TEXT NOT NULL,
    task_type TEXT
);

CREATE TABLE IF NOT EXISTS public.onet_emerging_tasks (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    task_id TEXT,
    task_statement TEXT NOT NULL,
    category TEXT
);

-- 13. Related Occupations
CREATE TABLE IF NOT EXISTS public.onet_related_occupations (
    id BIGSERIAL PRIMARY KEY,
    onet_soc_code TEXT NOT NULL REFERENCES public.onet_occupations(onet_soc_code) ON DELETE CASCADE,
    related_soc_code TEXT NOT NULL,
    related_title TEXT,
    related_index INT
);

-- 14. Version Control
CREATE TABLE IF NOT EXISTS public.onet_dataset_versions (
    version TEXT PRIMARY KEY,
    release_date TEXT NOT NULL,
    source TEXT NOT NULL,
    imported_at TIMESTAMPTZ DEFAULT NOW(),
    record_count BIGINT NOT NULL,
    status TEXT NOT NULL
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_pg_onet_occ_title ON public.onet_occupations(title);
CREATE INDEX IF NOT EXISTS idx_pg_onet_titles_job ON public.onet_job_titles(job_title);
CREATE INDEX IF NOT EXISTS idx_pg_onet_titles_soc ON public.onet_job_titles(onet_soc_code);
CREATE INDEX IF NOT EXISTS idx_pg_onet_skills_soc ON public.onet_occupation_skills(onet_soc_code);
CREATE INDEX IF NOT EXISTS idx_pg_onet_soft_soc ON public.onet_software_skills(onet_soc_code);

-- Enable RLS
ALTER TABLE public.onet_occupations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_job_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_occupation_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_software_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onet_dataset_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on onet_occupations" ON public.onet_occupations FOR SELECT USING (true);
CREATE POLICY "Allow public read on onet_job_titles" ON public.onet_job_titles FOR SELECT USING (true);
CREATE POLICY "Allow public read on onet_occupation_skills" ON public.onet_occupation_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on onet_software_skills" ON public.onet_software_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on onet_dataset_versions" ON public.onet_dataset_versions FOR SELECT USING (true);
