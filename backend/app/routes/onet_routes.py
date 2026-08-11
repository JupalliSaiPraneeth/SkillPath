"""
FastAPI Router for O*NET 30.3 Occupational Knowledge Base & Skill Gap Engine
"""

import os
import sqlite3
import json
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query, Body
from pydantic import BaseModel

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DB_PATH = os.path.join(BASE_DIR, "data", "onet", "onet_30_3.db")
QUALITY_REPORT_PATH = os.path.join(BASE_DIR, "data", "onet", "validation", "data_quality_report.json")

router = APIRouter(prefix="/onet", tags=["O*NET 30.3 Knowledge Base"])

def get_db_connection():
    """Returns a connection to the SQLite database with Row factory"""
    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=503, detail="O*NET 30.3 database not initialized. Run onet_import.py first.")
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# -------------------------------------------------------------
# 1. OCCUPATIONS LIST & SEARCH
# -------------------------------------------------------------

@router.get("/occupations")
def get_occupations(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    category: Optional[str] = None
):
    """Paginated list of O*NET occupations with optional title or SOC search"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    offset = (page - 1) * limit
    params = []
    where_clauses = []
    
    if search:
        where_clauses.append("(title LIKE ? OR onet_soc_code LIKE ?)")
        params.extend([f"%{search}%", f"%{search}%"])
        
    where_sql = ("WHERE " + " AND ".join(where_clauses)) if where_clauses else ""
    
    # Count total
    cursor.execute(f"SELECT COUNT(*) FROM onet_occupations {where_sql}", params)
    total = cursor.fetchone()[0]
    
    # Fetch paginated
    cursor.execute(f"""
        SELECT onet_soc_code, title, description 
        FROM onet_occupations 
        {where_sql}
        ORDER BY title ASC
        LIMIT ? OFFSET ?
    """, params + [limit, offset])
    
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    
    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit,
        "occupations": rows
    }

@router.get("/search")
def search_onet(q: str = Query(..., min_length=1, description="Search term for career, skill or job title")):
    """
    Intelligent career search searching across master titles, alternate titles,
    and reported job titles with exact & fuzzy ranking.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    term = f"%{q.strip()}%"
    
    # Ranked query
    query = """
    SELECT DISTINCT
        o.onet_soc_code,
        o.title,
        o.description,
        CASE
            WHEN LOWER(o.title) = LOWER(?) THEN 100
            WHEN LOWER(o.title) LIKE LOWER(?) THEN 85
            WHEN LOWER(t.job_title) = LOWER(?) THEN 80
            WHEN LOWER(t.job_title) LIKE LOWER(?) THEN 65
            ELSE 50
        END AS match_rank,
        GROUP_CONCAT(DISTINCT t.job_title) as matched_titles
    FROM onet_occupations o
    LEFT JOIN onet_job_titles t ON o.onet_soc_code = t.onet_soc_code
    WHERE 
        o.title LIKE ? 
        OR o.onet_soc_code LIKE ?
        OR t.job_title LIKE ?
    GROUP BY o.onet_soc_code
    ORDER BY match_rank DESC, o.title ASC
    LIMIT 30;
    """
    
    cursor.execute(query, [q.strip(), f"{q.strip()}%", q.strip(), f"{q.strip()}%", term, term, term])
    results = []
    for r in cursor.fetchall():
        d = dict(r)
        d["matched_titles"] = d["matched_titles"].split(",")[:5] if d.get("matched_titles") else []
        results.append(d)
        
    conn.close()
    return {
        "query": q,
        "count": len(results),
        "results": results
    }

# -------------------------------------------------------------
# 2. OCCUPATION DEEP DIVE (14 DIMENSIONS)
# -------------------------------------------------------------

@router.get("/occupations/{code}")
def get_occupation_detail(code: str):
    """Returns complete 14-dimension profile for a specific O*NET-SOC occupation"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Master occupation
    cursor.execute("SELECT * FROM onet_occupations WHERE onet_soc_code = ?", [code])
    occ = cursor.fetchone()
    if not occ:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Occupation with O*NET-SOC code '{code}' not found")
        
    res = dict(occ)
    
    # 1. Job Titles (Sample & Alternate)
    cursor.execute("SELECT DISTINCT job_title, is_reported_title FROM onet_job_titles WHERE onet_soc_code = ? LIMIT 30", [code])
    res["job_titles"] = [dict(r) for r in cursor.fetchall()]
    
    # 2. Essential Skills (Pivoted Importance scale 1-5 & Level scale 0-7)
    cursor.execute("""
        SELECT 
            im.element_id, 
            im.skill_name, 
            im.data_value AS importance,
            COALESCE(lv.data_value, 0) AS level,
            im.data_value AS data_value
        FROM onet_occupation_skills im
        LEFT JOIN onet_occupation_skills lv 
            ON im.onet_soc_code = lv.onet_soc_code 
            AND im.element_id = lv.element_id 
            AND lv.scale_id = 'LV'
        WHERE im.onet_soc_code = ? AND im.scale_id = 'IM'
        ORDER BY im.data_value DESC
    """, [code])
    res["skills"] = [dict(r) for r in cursor.fetchall()]
    
    # 3. Transferable Skills (Pivoted Importance & Level)
    cursor.execute("""
        SELECT 
            im.element_id, 
            im.skill_name, 
            im.data_value AS importance,
            COALESCE(lv.data_value, 0) AS level,
            im.data_value AS data_value
        FROM onet_transferable_skills im
        LEFT JOIN onet_transferable_skills lv 
            ON im.onet_soc_code = lv.onet_soc_code 
            AND im.element_id = lv.element_id 
            AND lv.scale_id = 'LV'
        WHERE im.onet_soc_code = ? AND im.scale_id = 'IM'
        ORDER BY im.data_value DESC
    """, [code])
    res["transferable_skills"] = [dict(r) for r in cursor.fetchall()]
    
    # 4. Knowledge Domains (Pivoted Importance & Level)
    cursor.execute("""
        SELECT 
            im.element_id, 
            im.knowledge_name, 
            im.data_value AS importance,
            COALESCE(lv.data_value, 0) AS level,
            im.data_value AS data_value
        FROM onet_knowledge im
        LEFT JOIN onet_knowledge lv 
            ON im.onet_soc_code = lv.onet_soc_code 
            AND im.element_id = lv.element_id 
            AND lv.scale_id = 'LV'
        WHERE im.onet_soc_code = ? AND im.scale_id = 'IM'
        ORDER BY im.data_value DESC
    """, [code])
    res["knowledge"] = [dict(r) for r in cursor.fetchall()]
    
    # 5. Abilities (Pivoted Importance & Level)
    cursor.execute("""
        SELECT 
            im.element_id, 
            im.ability_name, 
            im.data_value AS importance,
            COALESCE(lv.data_value, 0) AS level,
            im.data_value AS data_value
        FROM onet_abilities im
        LEFT JOIN onet_abilities lv 
            ON im.onet_soc_code = lv.onet_soc_code 
            AND im.element_id = lv.element_id 
            AND lv.scale_id = 'LV'
        WHERE im.onet_soc_code = ? AND im.scale_id = 'IM'
        ORDER BY im.data_value DESC
        LIMIT 25
    """, [code])
    res["abilities"] = [dict(r) for r in cursor.fetchall()]
    
    # 6. Software & Hot Technologies (Deduplicated with real software names)
    cursor.execute("""
        SELECT DISTINCT example_software, commodity_title, hot_technology, in_demand 
        FROM onet_software_skills 
        WHERE onet_soc_code = ? AND example_software != ''
        ORDER BY hot_technology DESC, in_demand DESC, example_software ASC
    """, [code])
    res["software_skills"] = [dict(r) for r in cursor.fetchall()]
    
    # 7. Job Zone & Experience Preparation
    cursor.execute("""
        SELECT z.job_zone, r.name, r.experience, r.education, r.job_training, r.examples, r.svp_range
        FROM onet_job_zones z
        LEFT JOIN onet_job_zone_reference r ON z.job_zone = r.job_zone
        WHERE z.onet_soc_code = ?
    """, [code])
    jz = cursor.fetchone()
    res["job_zone"] = dict(jz) if jz else None
    
    # 8. RIASEC Interests (6 Standard Holland Types scale 1-7)
    cursor.execute("""
        SELECT interest_type, data_value 
        FROM onet_career_interest_types 
        WHERE onet_soc_code = ? 
          AND scale_id = 'OI'
          AND interest_type IN ('Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional')
        ORDER BY data_value DESC
    """, [code])
    res["interests"] = [dict(r) for r in cursor.fetchall()]
    
    # High-Point Summary Ranking
    cursor.execute("""
        SELECT interest_type, data_value 
        FROM onet_career_interest_types 
        WHERE onet_soc_code = ? AND scale_id = 'IH'
        ORDER BY data_value ASC
    """, [code])
    res["high_points"] = [dict(r) for r in cursor.fetchall()]
    
    # 9. Work Styles
    cursor.execute("""
        SELECT work_style_name, data_value 
        FROM onet_work_styles 
        WHERE onet_soc_code = ? AND (scale_id = 'IM' OR scale_id IS NULL)
        ORDER BY data_value DESC
    """, [code])
    res["work_styles"] = [dict(r) for r in cursor.fetchall()]
    
    # 10. Work Activities (Pivoted Importance & Level)
    cursor.execute("""
        SELECT 
            im.activity_name, 
            im.data_value AS importance,
            COALESCE(lv.data_value, 0) AS level,
            im.data_value AS data_value
        FROM onet_work_activities im
        LEFT JOIN onet_work_activities lv 
            ON im.onet_soc_code = lv.onet_soc_code 
            AND im.element_id = lv.element_id 
            AND lv.scale_id = 'LV'
        WHERE im.onet_soc_code = ? AND im.scale_id = 'IM'
        ORDER BY im.data_value DESC
        LIMIT 20
    """, [code])
    res["work_activities"] = [dict(r) for r in cursor.fetchall()]
    
    # 11. Core Tasks
    cursor.execute("""
        SELECT task_statement, task_type 
        FROM onet_tasks 
        WHERE onet_soc_code = ?
        LIMIT 25
    """, [code])
    res["tasks"] = [dict(r) for r in cursor.fetchall()]
    
    # 12. Emerging Tasks
    cursor.execute("""
        SELECT task_statement, category 
        FROM onet_emerging_tasks 
        WHERE onet_soc_code = ?
    """, [code])
    res["emerging_tasks"] = [dict(r) for r in cursor.fetchall()]
    
    # 13. Related Occupations
    cursor.execute("""
        SELECT related_soc_code, related_title, related_index 
        FROM onet_related_occupations 
        WHERE onet_soc_code = ?
        ORDER BY related_index ASC
        LIMIT 10
    """, [code])
    res["related_occupations"] = [dict(r) for r in cursor.fetchall()]
    
    # 14. License & Attribution
    res["attribution"] = {
        "database": "O*NET 30.3 Database (May 2026 Release)",
        "source": "U.S. Department of Labor, Employment and Training Administration",
        "license": "Creative Commons Attribution 4.0 International (CC BY 4.0)"
    }
    
    conn.close()
    return res

# -------------------------------------------------------------
# 3. SKILL GAP ANALYSIS & CAREER MATCHING ENGINES
# -------------------------------------------------------------

class SkillGapRequest(BaseModel):
    onet_soc_code: str
    user_skills: Dict[str, int] # skill_name -> score (0 to 100)

@router.post("/skill-gap")
def calculate_onet_skill_gap(req: SkillGapRequest):
    """
    Computes mathematical skill gaps and cosine similarity against official O*NET 30.3 requirement vectors.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Fetch occupation required skills (Importance and Level)
    cursor.execute("""
        SELECT skill_name, data_value, scale_id 
        FROM onet_occupation_skills 
        WHERE onet_soc_code = ? AND scale_id = 'IM'
    """, [req.onet_soc_code])
    
    required_skills = cursor.fetchall()
    if not required_skills:
        conn.close()
        raise HTTPException(status_code=404, detail="No skills found for this occupation")
        
    gaps = []
    user_vector = []
    target_vector = []
    
    # Normalize user input dictionary keys to lowercase for robust lookup
    user_skills_lower = {k.lower().strip(): v for k, v in req.user_skills.items()}
    
    for r in required_skills:
        s_name = r["skill_name"]
        raw_importance = float(r["data_value"])
        # O*NET IM scale is 1.0 to 5.0 -> normalize to 0-100 scale for comparison
        req_level = round(((raw_importance - 1.0) / 4.0) * 100)
        
        user_val = user_skills_lower.get(s_name.lower(), 0)
        gap_val = max(req_level - user_val, 0)
        
        priority = "Low"
        if gap_val >= 40:
            priority = "High"
        elif gap_val >= 20:
            priority = "Medium"
            
        gaps.append({
            "skill": s_name,
            "required_level": req_level,
            "user_level": user_val,
            "gap": gap_val,
            "importance": round(raw_importance, 2),
            "priority": priority
        })
        
        user_vector.append(user_val)
        target_vector.append(req_level)
        
    # Cosine Similarity Calculation
    dot_product = sum(u * t for u, t in zip(user_vector, target_vector))
    norm_u = sum(u * u for u in user_vector) ** 0.5
    norm_t = sum(t * t for t in target_vector) ** 0.5
    
    cosine_sim = (dot_product / (norm_u * norm_t)) if (norm_u * norm_t) > 0 else 0.0
    overall_match = round(cosine_sim * 100, 1)
    
    conn.close()
    return {
        "onet_soc_code": req.onet_soc_code,
        "overall_match_score": overall_match,
        "cosine_similarity": round(cosine_sim, 4),
        "total_skills_evaluated": len(gaps),
        "high_priority_gaps": sum(1 for g in gaps if g["priority"] == "High"),
        "medium_priority_gaps": sum(1 for g in gaps if g["priority"] == "Medium"),
        "skill_gaps": sorted(gaps, key=lambda x: x["gap"], reverse=True)
    }

# -------------------------------------------------------------
# 4. ADMIN O*NET MANAGEMENT & DATA QUALITY ENDPOINTS
# -------------------------------------------------------------

@router.get("/admin/status")
def get_admin_onet_status():
    """Returns database status, active version, total records, and table row counts"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM onet_dataset_versions WHERE status = 'ACTIVE' LIMIT 1")
    ver = cursor.fetchone()
    
    tables = [
        "onet_occupations", "onet_job_titles", "onet_occupation_skills",
        "onet_transferable_skills", "onet_knowledge", "onet_abilities",
        "onet_software_skills", "onet_job_zones", "onet_career_interest_types",
        "onet_work_styles", "onet_work_activities", "onet_tasks",
        "onet_emerging_tasks", "onet_related_occupations"
    ]
    
    table_counts = {}
    for t in tables:
        cursor.execute(f"SELECT COUNT(*) FROM {t}")
        table_counts[t] = cursor.fetchone()[0]
        
    conn.close()
    
    return {
        "version": ver["version"] if ver else "30.3",
        "release_date": ver["release_date"] if ver else "May 2026",
        "imported_at": ver["imported_at"] if ver else None,
        "total_records": sum(table_counts.values()),
        "status": "OPERATIONAL",
        "tables": table_counts
    }

@router.get("/admin/data-quality")
def get_admin_data_quality():
    """Returns detailed data validation audit report"""
    if os.path.exists(QUALITY_REPORT_PATH):
        with open(QUALITY_REPORT_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {
        "status": "NOT_AVAILABLE",
        "message": "Quality report has not been generated yet."
    }
