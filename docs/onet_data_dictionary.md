# O*NET 30.3 Database Integration & Data Dictionary
**Release:** O*NET 30.3 Database (May 2026 Release)  
**Source:** U.S. Department of Labor, Employment and Training Administration (USDOL/ETA)  
**License:** Creative Commons Attribution 4.0 International (CC BY 4.0)

---

## 1. Overview

The **O*NET 30.3 Database** serves as the authoritative occupational intelligence backbone for **SkillPath Finder**. It replaces hard-coded career definitions with standardized, empirical job requirements covering:

- **1,016 Verified Standard Occupational Classification (O*NET-SOC) Roles**
- **65,496 Alternate & Reported Job Titles**
- **100+ Essential Technical & Transferable Skills**
- **31,821 Software & Hot Technology Inventory Records**
- **59,004 Knowledge Domain Ratings**
- **92,976 Cognitive & Physical Abilities**
- **18,796 Core Occupational Tasks**
- **328 Emerging Tasks (AI, Cloud, and Next-Gen Engineering)**

---

## 2. Ingestion Pipeline & Execution

```
db_30_3_csv (46 CSVs)
        ↓
ml/preprocessing/onet_validate.py  ──> data/onet/validation/data_quality_report.json (Score: 100.0%)
        ↓
ml/preprocessing/onet_transform.py ──> Scale Normalization (1–5 scale to 0–100%)
        ↓
ml/preprocessing/onet_import.py    ──> data/onet/onet_30_3.db (Indexed SQLite)
        ↓
backend/app/routes/onet_routes.py  ──> FastAPI REST API Endpoints
        ↓
frontend/src/services/onetService.js──> React UI & Admin Portal Management
```

### Pipeline Commands

```bash
# 1. Run Data Validation on all 46 CSVs
python ml/preprocessing/onet_validate.py

# 2. Ingest into Relational SQLite Store
python ml/preprocessing/onet_import.py

# 3. Test Multi-Feature Recommendation Engine
python ml/models/onet_recommendation_engine.py
```

---

## 3. Relational Schema & Table Inventory

| Table Name | Source File | Records | Primary Key / Index | Description |
|---|---|---|---|---|
| `onet_occupations` | `occupation_data.csv` | 1,016 | `onet_soc_code` | Master occupational titles and definitions |
| `onet_job_titles` | `job_titles.csv`, `sample_of_reported_titles.csv` | 65,496 | `id` (idx: `job_title`, `onet_soc_code`) | Alternate titles for intelligent search |
| `onet_occupation_skills` | `essential_skills.csv` | 17,880 | `id` (idx: `onet_soc_code`, `skill_name`) | Essential skill importance & level scales |
| `onet_transferable_skills` | `transferable_skills.csv` | 44,700 | `id` (idx: `onet_soc_code`) | Cognitive, interpersonal, and analytical skills |
| `onet_knowledge` | `knowledge.csv` | 59,004 | `id` (idx: `onet_soc_code`) | Knowledge areas (Computers, Math, Engineering) |
| `onet_abilities` | `abilities.csv` | 92,976 | `id` (idx: `onet_soc_code`) | Cognitive, sensory, and psychomotor abilities |
| `onet_software_skills` | `software_skills.csv` | 31,821 | `id` (idx: `hot_technology`, `onet_soc_code`) | Software tools & Hot Technology flags |
| `onet_job_zones` | `job_zones.csv` | 923 | `onet_soc_code` | Preparation level (1 to 5) & SVP range |
| `onet_job_zone_reference`| `job_zone_reference.csv`| 4 | `job_zone` | Education, experience & training benchmarks |
| `onet_career_interest_types`| `career_interest_types.csv`| 8,307 | `id` (idx: `onet_soc_code`) | RIASEC Holland interest dimensions |
| `onet_work_styles` | `work_styles.csv` | 37,422 | `id` (idx: `onet_soc_code`) | Personality & work style characteristics |
| `onet_work_activities` | `work_activities.csv` | 73,308 | `id` (idx: `onet_soc_code`) | Generalized Work Activities (GWAs/DWAs) |
| `onet_tasks` | `task_statements.csv` | 18,796 | `id` (idx: `onet_soc_code`) | Core daily occupational tasks |
| `onet_emerging_tasks` | `emerging_tasks.csv` | 328 | `id` (idx: `onet_soc_code`) | Emerging workplace responsibilities |
| `onet_related_occupations`| `related_occupations.csv`| 18,460 | `id` (idx: `onet_soc_code`) | Alternative career pathways |
| `onet_dataset_versions` | Generated | 1 | `version` | Version tracking (30.3, May 2026, USDOL/ETA) |

---

## 4. API Endpoints

- `GET /api/onet/occupations?page=1&limit=20&search=`: Paginated occupations.
- `GET /api/onet/search?q=`: Fast multi-field ranking search across titles and alternate job titles.
- `GET /api/onet/occupations/{code}`: Complete 14-dimension occupational profile.
- `POST /api/onet/skill-gap`: Cosine similarity & skill-by-skill gap calculation.
- `GET /api/onet/admin/status`: Database status, active version, and row count metrics.
- `GET /api/onet/admin/data-quality`: Validation audit scorecard.

---

## 5. Creative Commons Attribution Notice

This product includes data from the **O*NET 30.3 Database** by the **U.S. Department of Labor, Employment and Training Administration (USDOL/ETA)**. Used under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. O*NET® is a trademark of USDOL/ETA.
