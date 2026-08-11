# Skill Gap Analysis and Career Guidance System
**B.Tech Major Engineering Capstone Project**

An intelligent, machine-learning-powered web platform designed to analyze technical competencies, compute multidimensional skill gaps with **Cosine Similarity**, forecast industry demand using **Random Forest Regressors**, recommend career roles via **Random Forest Classifiers**, explain decisions through **SHAP & LIME (Explainable AI)**, and generate personalized **5-Phase Learning Roadmaps**.

---

## 1. Key System Architecture

```
+---------------------------------------------------------------------------------------------------+
|                                  REACT + VITE FRONTEND                                            |
|                                                                                                   |
|  +------------------+  +------------------+  +-------------------+  +--------------------------+  |
|  | Landing & Auth   |  | Skill Assessment |  | Skill Gap Analyzer|  | Career Recommendations   |  |
|  +------------------+  +------------------+  +-------------------+  +--------------------------+  |
|  +------------------+  +------------------+  +-------------------+  +--------------------------+  |
|  | Future Skills    |  | Learning Roadmap |  | Resume Analyzer   |  | Explainable AI (SHAP)    |  |
|  +------------------+  +------------------+  +-------------------+  +--------------------------+  |
|  +------------------+  +------------------+                                                       |
|  | Model Evaluation |  | User Profile     |                                                       |
|  +------------------+  +------------------+                                                       |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | Client ML & Analytics Engine (Cosine Similarity, RandomForest Inference, SHAP, NLP Parser)  |  |
|  +---------------------------------------------------------------------------------------------+  |
|  | LocalStorage Service & Data Seed Manager (Users, Profiles, Skills, Careers, Roadmaps, XAI)   |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
                                              | (Dual-Mode Bridge)
                                              v
+---------------------------------------------------------------------------------------------------+
|                                     FASTAPI ML BACKEND                                            |
|                                                                                                   |
|  +------------------+  +------------------+  +-------------------+  +--------------------------+  |
|  | Auth & Profiles  |  | Skill Gap Engine |  | Career RF Model   |  | Future Skills Regressor  |  |
|  +------------------+  +------------------+  +-------------------+  +--------------------------+  |
|  | SHAP / LIME XAI  |  | NLP Resume Parser|  | Roadmap Generator |  | Model Evaluation Metrics |  |
|  +------------------+  +------------------+  +-------------------+  +--------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Machine Learning Modules & Formulas

### Module 1 — Rule-Based Skill Assessment
Normalized proficiency scores $S_i \in [0, 100]$ computed across 8 engineering domains (Programming, AI/ML, Frontend, Backend, Cloud/DevOps, Databases, Cybersecurity, Soft Skills).

### Module 2 — Cosine Similarity Skill Gap Analysis
Calculates the geometric cosine distance between the User Skill Vector $\mathbf{u}$ and O*NET Target Career Vector $\mathbf{c}$:
$$\text{Cosine Similarity}(\mathbf{u}, \mathbf{c}) = \frac{\mathbf{u} \cdot \mathbf{c}}{\|\mathbf{u}\|_2 \|\mathbf{c}\|_2} = \frac{\sum_{i=1}^n u_i c_i}{\sqrt{\sum_{i=1}^n u_i^2} \sqrt{\sum_{i=1}^n c_i^2}}$$

- **Gap Calculation**: $\text{Gap}_i = \max(0, \text{Required}_i - \text{Current}_i)$
- **Priority Classification**:
  - $\text{HIGH}: \text{Gap}_i \ge 35\% \lor (\text{Gap}_i \ge 20\% \land \text{Importance}_i \ge 85)$
  - $\text{MEDIUM}: \text{Gap}_i \ge 15\% \lor (\text{Gap}_i \ge 10\% \land \text{Importance}_i \ge 75)$
  - $\text{LOW}: \text{Gap}_i > 0\%$

### Module 3 — Future Skills Demand Regression
Random Forest Regressor forecasting multi-year adoption velocity:
$$\text{Demand Velocity} = \frac{\text{Predicted Demand}_{2027} - \text{Current Demand}_{2024}}{\text{Current Demand}_{2024}} \times 100\%$$
- Model Metrics: $R^2 = 0.884$, $\text{RMSE} = 4.12$, $\text{MAE} = 3.05$.

### Module 4 — Career Recommendation Classifier
Ensemble of 150 Decision Trees evaluating skill vectors, degree level, and technical interests.
- Test Accuracy: **91.4%**
- Macro F1-Score: **90.0%**
- ROC-AUC: **0.946**

### Module 5 — Content-Based Learning Roadmap
Sequences missing skills into 5 distinct chronological learning phases:
1. **Phase 1 — Fundamentals & Core Concepts**
2. **Phase 2 — Intermediate Skills & Tooling**
3. **Phase 3 — Advanced Specialization & Architecture**
4. **Phase 4 — Real-World Capstone Projects**
5. **Phase 5 — Interview Preparation & Viva Defense**

### Module 6 — Explainable AI (SHAP & LIME)
- **SHAP (Shapley Additive Explanations)**:
  $$\phi_i(v) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(|N|-|S|-1)!}{|N|!} (v(S \cup \{i\}) - v(S))$$
- Interactive waterfall attribution shows exact mathematical positive and negative contributions per skill.

### Module 7 — NLP Resume Parser
Extracts technical competencies, education levels, and project experiences from PDF, DOCX, or text inputs and evaluates ATS alignment.

---

## 3. Quick Start Instructions

### Running Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser. The system runs seamlessly out-of-the-box using browser `localStorage` with pre-seeded data.

### Running Backend (FastAPI + Python ML)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend API will be accessible at `http://localhost:8000` (OpenAPI Swagger docs at `http://localhost:8000/docs`).

### Training Machine Learning Models
```bash
python ml/training/train_career_model.py
python ml/training/train_future_skills_model.py
```

---

## 4. Entity-Relationship (ER) Database Schema

The database design contains 11 relational tables:
1. `users` (id, name, email, password_hash, role, created_at)
2. `user_profiles` (id, user_id, education, degree, graduation_year, experience, interests, target_career_id)
3. `skills` (id, skill_name, category, description)
4. `user_skills` (id, user_id, skill_id, proficiency)
5. `career_roles` (id, career_name, category, description, salary_range, market_demand, growth_score)
6. `career_skills` (id, career_id, skill_id, required_level, importance)
7. `assessments` (id, user_id, skill_id, score, created_at)
8. `recommendations` (id, user_id, career_id, match_score, confidence_score, cosine_similarity)
9. `learning_resources` (id, skill_id, title, provider, url, difficulty, duration, project_task)
10. `learning_roadmaps` (id, user_id, career_id, progress_percent)
11. `roadmap_items` (id, roadmap_id, phase_number, skill_id, resource_id, priority, status)

---

## 5. B.Tech Viva / Project Defense Summary

- **Problem Statement**: Bridging the gap between engineering student proficiencies and rapidly evolving tech job market requirements.
- **Novelty**: Combining Cosine Similarity vector matching with Random Forest ensemble classification and SHAP transparency to provide explainable career guidance.
- **Results**: 91.4% classification accuracy, 0.884 regression $R^2$ score, and dynamic 5-phase customized roadmaps.
