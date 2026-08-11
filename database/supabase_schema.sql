-- =============================================================================
-- CareerPilot AI — Supabase PostgreSQL Database Schema & Seed Script
-- Target Project: https://difjsuzcdhrwkxioovlf.supabase.co
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Extended user credentials and engineering profile)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'student',
    education TEXT NOT NULL DEFAULT 'B.Tech Computer Science & Engineering',
    degree TEXT NOT NULL DEFAULT 'Bachelor of Technology',
    graduation_year TEXT DEFAULT '2026',
    experience TEXT DEFAULT 'Fresher / 0-1 Years',
    interests TEXT[] DEFAULT ARRAY['Machine Learning', 'Cloud Computing'],
    target_career_id TEXT DEFAULT 'car_mle',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Skills Taxonomy Table (100+ Curated O*NET Tech Competencies)
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Skills Table (User-assessed normalized proficiencies 0–100)
CREATE TABLE IF NOT EXISTS public.user_skills (
    user_id TEXT NOT NULL,
    skill_id TEXT NOT NULL,
    proficiency INT NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, skill_id)
);

-- 4. Career Roles Table (25+ O*NET Standardized Tech Roles)
CREATE TABLE IF NOT EXISTS public.careers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    salary_range TEXT,
    market_demand TEXT,
    growth_score INT DEFAULT 90,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Career Required Skills Table
CREATE TABLE IF NOT EXISTS public.career_skills (
    career_id TEXT NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    required_level INT NOT NULL CHECK (required_level >= 0 AND required_level <= 100),
    importance INT NOT NULL CHECK (importance >= 0 AND importance <= 100),
    PRIMARY KEY (career_id, skill_id)
);

-- 6. Assessment Submissions Table
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    skill_id TEXT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Personalized Learning Roadmaps Table
CREATE TABLE IF NOT EXISTS public.roadmaps (
    user_id TEXT NOT NULL,
    career_id TEXT NOT NULL,
    roadmap_state JSONB NOT NULL,
    progress_percent INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, career_id)
);

-- 8. Resume NLP Analyses Table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    career_id TEXT,
    ats_score INT NOT NULL,
    cosine_similarity NUMERIC(5,4),
    detected_skills JSONB,
    recommendations JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- Row Level Security (RLS) Policies
-- Enables seamless client access with anon publishable key
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write for profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read for skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert for skills" ON public.skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read-write for user_skills" ON public.user_skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read for careers" ON public.careers FOR SELECT USING (true);
CREATE POLICY "Allow public read-write for assessments" ON public.assessments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for roadmaps" ON public.roadmaps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for resumes" ON public.resumes FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- Initial Data Seeding
-- =============================================================================

INSERT INTO public.skills (id, name, category, description) VALUES
('sk_py', 'Python', 'Programming', 'Core Python, OOP, asynchronous programming, scripting'),
('sk_js', 'JavaScript', 'Programming', 'Modern ES6+, closures, event loop, DOM, async/await'),
('sk_ts', 'TypeScript', 'Programming', 'Static typing, generics, interfaces, compiler options'),
('sk_cpp', 'C++', 'Programming', 'Memory management, STL, pointers, low-level optimization'),
('sk_java', 'Java', 'Programming', 'Enterprise Java, JVM tuning, Spring framework, OOP'),
('sk_go', 'Golang', 'Programming', 'Goroutines, channels, microservices, concurrent backend'),
('sk_rust', 'Rust', 'Programming', 'Borrow checker, memory safety without GC, high-performance systems'),
('sk_sql', 'SQL', 'Programming', 'Complex queries, indexing, query optimization, transactions'),
('sk_ml_core', 'Machine Learning Fundamentals', 'AI & ML', 'Supervised/unsupervised learning, feature engineering, cross-validation'),
('sk_dl', 'Deep Learning', 'AI & ML', 'Neural networks, backpropagation, CNNs, RNNs, optimization'),
('sk_pytorch', 'PyTorch', 'AI & ML', 'Tensors, autograd, PyTorch Lightning, model training loops'),
('sk_tf', 'TensorFlow / Keras', 'AI & ML', 'Graph execution, TF Serving, Keras functional API'),
('sk_sklearn', 'Scikit-Learn', 'AI & ML', 'Random Forests, SVMs, clustering, dimensionality reduction'),
('sk_nlp', 'Natural Language Processing (NLP)', 'AI & ML', 'Tokenization, embeddings, Transformers, BERT, attention'),
('sk_genai', 'Generative AI & LLMs', 'AI & ML', 'Prompt engineering, fine-tuning, LangChain, RAG architecture'),
('sk_cv', 'Computer Vision', 'AI & ML', 'OpenCV, object detection (YOLO), image segmentation'),
('sk_xai', 'Explainable AI (SHAP / LIME)', 'AI & ML', 'Model interpretability, SHAP values, LIME local surrogates'),
('sk_mlops', 'MLOps & Model Deployment', 'AI & ML', 'MLflow, DVC, model registry, inference monitoring'),
('sk_react', 'React.js', 'Frontend', 'Hooks, Virtual DOM, custom hooks, component lifecycle'),
('sk_nextjs', 'Next.js', 'Frontend', 'Server Components, SSR, SSG, App Router, API routes'),
('sk_tailwind', 'Tailwind CSS', 'Frontend', 'Utility-first styling, dark mode, custom themes'),
('sk_docker', 'Docker & Containerization', 'Cloud & DevOps', 'Dockerfile optimization, multi-stage builds, Docker Compose'),
('sk_k8s', 'Kubernetes', 'Cloud & DevOps', 'Pods, Deployments, Services, Ingress, Helm charts'),
('sk_aws', 'AWS Cloud Services', 'Cloud & DevOps', 'EC2, S3, Lambda, ECS, RDS, IAM, CloudFront'),
('sk_postgres', 'PostgreSQL / MySQL', 'Databases', 'Relational schema design, ACID transactions, EXPLAIN query plans'),
('sk_dsa', 'Data Structures & Algorithms', 'Core & Soft Skills', 'Arrays, trees, graphs, dynamic programming, complexity'),
('sk_git', 'Git & Version Control', 'Core & Soft Skills', 'Branching strategies, rebase, merge conflicts, pull requests')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.careers (id, title, category, description, salary_range, market_demand, growth_score) VALUES
('car_mle', 'Machine Learning Engineer', 'AI & Data', 'Designs, develops, and deploys scalable machine learning models and predictive systems in production.', '$125,000 - $185,000', 'Very High (Surging)', 94),
('car_ds', 'Data Scientist', 'AI & Data', 'Extracts actionable business insights using statistical modeling, hypothesis testing, and machine learning.', '$115,000 - $170,000', 'High', 88),
('car_genai', 'Generative AI & LLM Specialist', 'AI & Data', 'Builds enterprise LLM applications, RAG pipelines, fine-tunes open-source models, and manages AI agents.', '$140,000 - $210,000', 'Extremely High', 98),
('car_cloud_arch', 'Cloud Solutions Architect', 'Cloud & Infrastructure', 'Designs resilient, scalable, and secure cloud infrastructure across multi-cloud environments.', '$135,000 - $200,000', 'Very High', 92),
('car_fullstack', 'Full Stack Web Developer', 'Software Engineering', 'Architects and builds dynamic end-to-end web applications with modern frontend frameworks and robust backend services.', '$105,000 - $160,000', 'High', 86),
('car_devops', 'DevOps & SRE Engineer', 'Cloud & Infrastructure', 'Automates deployment pipelines, provisions infrastructure, and ensures 99.99% system reliability and observability.', '$120,000 - $175,000', 'Very High', 91),
('car_cybersec', 'Cybersecurity Analyst & Engineer', 'Cybersecurity', 'Protects enterprise networks, applications, and cloud data against cyber threats, vulnerabilities, and data breaches.', '$110,000 - $165,000', 'Very High', 93),
('car_data_eng', 'Data Engineer', 'AI & Data', 'Builds robust distributed data pipelines, ETL workflows, data lakes, and data warehouses.', '$120,000 - $175,000', 'High', 89)
ON CONFLICT (id) DO NOTHING;
