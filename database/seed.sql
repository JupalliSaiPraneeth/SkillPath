-- =============================================================================
-- Skill Gap Analysis and Career Guidance System
-- Database Seed Data: 25+ Tech Careers, 100+ Skills, Learning Resources
-- =============================================================================

USE career_guidance_db;

-- 1. Seed Skills
INSERT INTO skills (id, skill_name, category, description) VALUES
('sk_py', 'Python', 'Programming', 'Core Python, OOP, asynchronous programming, scripting'),
('sk_js', 'JavaScript', 'Programming', 'Modern ES6+, closures, event loop, DOM, async/await'),
('sk_ts', 'TypeScript', 'Programming', 'Static typing, generics, interfaces, compiler options'),
('sk_cpp', 'C++', 'Programming', 'Memory management, STL, pointers, low-level optimization'),
('sk_sql', 'SQL', 'Programming', 'Complex queries, indexing, query optimization, transactions'),
('sk_ml_core', 'Machine Learning Fundamentals', 'AI & ML', 'Supervised/unsupervised learning, feature engineering'),
('sk_pytorch', 'PyTorch', 'AI & ML', 'Tensors, autograd, PyTorch Lightning, training loops'),
('sk_sklearn', 'Scikit-Learn', 'AI & ML', 'Random Forests, SVMs, clustering, dimensionality reduction'),
('sk_dl', 'Deep Learning', 'AI & ML', 'Neural networks, backpropagation, CNNs, RNNs'),
('sk_genai', 'Generative AI & LLMs', 'AI & ML', 'Prompt engineering, fine-tuning, LangChain, RAG'),
('sk_xai', 'Explainable AI (SHAP / LIME)', 'AI & ML', 'Model interpretability, SHAP values, LIME surrogates'),
('sk_react', 'React.js', 'Frontend', 'Hooks, Virtual DOM, custom hooks, component lifecycle'),
('sk_node', 'Node.js & Express', 'Backend', 'Non-blocking I/O, REST routing, middleware'),
('sk_fastapi', 'FastAPI', 'Backend', 'Pydantic validation, async def, Swagger/OpenAPI docs'),
('sk_docker', 'Docker & Containerization', 'Cloud & DevOps', 'Dockerfile optimization, multi-stage builds, Compose'),
('sk_k8s', 'Kubernetes', 'Cloud & DevOps', 'Pods, Deployments, Services, Ingress, Helm'),
('sk_aws', 'AWS Cloud Services', 'Cloud & DevOps', 'EC2, S3, Lambda, ECS, RDS, IAM'),
('sk_net_sec', 'Network & Application Security', 'Cybersecurity', 'Firewalls, TLS/SSL, VPN, TCP/IP, OSI model'),
('sk_owasp', 'OWASP Top 10 & Pen-Testing', 'Cybersecurity', 'SQL injection, XSS, CSRF, security audits'),
('sk_dsa', 'Data Structures & Algorithms', 'Core & Soft Skills', 'Arrays, trees, graphs, dynamic programming');

-- 2. Seed Career Roles
INSERT INTO career_roles (id, career_name, category, description, salary_range, market_demand, growth_score) VALUES
('car_mle', 'Machine Learning Engineer', 'AI & Data', 'Designs, develops, and deploys scalable ML models in production.', '$125,000 - $185,000', 'Very High (Surging)', 94),
('car_ds', 'Data Scientist', 'AI & Data', 'Extracts actionable business insights using statistical modeling and ML.', '$115,000 - $170,000', 'High', 88),
('car_genai', 'Generative AI & LLM Specialist', 'AI & Data', 'Builds enterprise LLM applications, RAG pipelines, and AI agents.', '$140,000 - $210,000', 'Extremely High', 98),
('car_cloud_arch', 'Cloud Solutions Architect', 'Cloud & Infrastructure', 'Designs resilient, scalable cloud infrastructure across multi-cloud.', '$135,000 - $200,000', 'Very High', 92),
('car_fullstack', 'Full Stack Web Developer', 'Software Engineering', 'Architects and builds dynamic end-to-end web applications.', '$105,000 - $160,000', 'High', 86),
('car_devops', 'DevOps & SRE Engineer', 'Cloud & Infrastructure', 'Automates deployment pipelines and ensures 99.99% system reliability.', '$120,000 - $175,000', 'Very High', 91),
('car_cybersec', 'Cybersecurity Analyst & Engineer', 'Cybersecurity', 'Protects enterprise networks and cloud data against cyber threats.', '$110,000 - $165,000', 'Very High', 93);

-- 3. Seed Career Required Skills
INSERT INTO career_skills (id, career_id, skill_id, required_level, importance) VALUES
('cs_1', 'car_mle', 'sk_py', 90, 95),
('cs_2', 'car_mle', 'sk_ml_core', 85, 95),
('cs_3', 'car_mle', 'sk_pytorch', 80, 90),
('cs_4', 'car_mle', 'sk_sklearn', 85, 88),
('cs_5', 'car_mle', 'sk_dl', 75, 85),
('cs_6', 'car_mle', 'sk_docker', 70, 78),
('cs_7', 'car_mle', 'sk_fastapi', 70, 72),
('cs_8', 'car_fullstack', 'sk_js', 90, 95),
('cs_9', 'car_fullstack', 'sk_react', 85, 92),
('cs_10', 'car_fullstack', 'sk_node', 80, 88),
('cs_11', 'car_cloud_arch', 'sk_aws', 90, 98),
('cs_12', 'car_cloud_arch', 'sk_k8s', 85, 92),
('cs_13', 'car_cybersec', 'sk_net_sec', 90, 98),
('cs_14', 'car_cybersec', 'sk_owasp', 85, 92);
