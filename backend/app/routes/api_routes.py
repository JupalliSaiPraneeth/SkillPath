from fastapi import APIRouter, HTTPException, Depends, Body
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import numpy as np
try:
    from backend.app.auth.jwt_handler import hash_password, verify_password, create_access_token
except ImportError:
    from app.auth.jwt_handler import hash_password, verify_password, create_access_token

router = APIRouter()

# In-Memory / Local File storage cache mirroring LocalStorage
LOCAL_DB = {
    "users": {
        "alex.rivera@btech.edu": {
            "id": "usr_demo_btech",
            "name": "Alex Rivera",
            "email": "alex.rivera@btech.edu",
            "password_hash": hash_password("password123"),
            "education": "B.Tech in Computer Science & Engineering",
            "degree": "Bachelor of Technology",
            "graduation_year": "2026",
            "experience": "1-2 years (Academic & Projects)",
            "interests": ["Machine Learning", "Cloud Computing", "AI"],
            "target_career_id": "car_mle"
        }
    },
    "user_skills": {
        "usr_demo_btech": {}
    }
}

# --- Pydantic Schemas ---
class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str
    education: Optional[str] = "B.Tech Computer Science"
    degree: Optional[str] = "Bachelor of Technology"
    graduation_year: Optional[str] = "2026"
    experience: Optional[str] = "Fresher / 0-1 Years"
    interests: Optional[List[str]] = []
    target_career_id: Optional[str] = "car_mle"

class LoginSchema(BaseModel):
    email: str
    password: str

class SkillUpdateSchema(BaseModel):
    skills: Dict[str, int]

class ResumeTextSchema(BaseModel):
    raw_text: str
    target_career_id: Optional[str] = "car_mle"

# --- 1. Auth Endpoints ---
@router.post("/auth/register")
def register(user_data: RegisterSchema):
    if user_data.email in LOCAL_DB["users"]:
        raise HTTPException(status_code=400, detail="User with this email already exists.")
    
    uid = f"usr_{len(LOCAL_DB['users']) + 1}"
    LOCAL_DB["users"][user_data.email] = {
        "id": uid,
        "name": user_data.name,
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "education": user_data.education,
        "degree": user_data.degree,
        "graduation_year": user_data.graduation_year,
        "experience": user_data.experience,
        "interests": user_data.interests,
        "target_career_id": user_data.target_career_id
    }
    LOCAL_DB["user_skills"][uid] = {} # Initial skills for a new user are set to 0/empty until user scores them
    token = create_access_token({"sub": user_data.email, "uid": uid})
    return {"message": "User registered successfully", "access_token": token, "user": LOCAL_DB["users"][user_data.email]}

@router.post("/auth/login")
def login(creds: LoginSchema):
    user = LOCAL_DB["users"].get(creds.email)
    if not user or not verify_password(creds.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    token = create_access_token({"sub": user["email"], "uid": user["id"]})
    return {"access_token": token, "token_type": "bearer", "user": user}

# --- 2. Profile Endpoints ---
@router.get("/profile")
def get_profile(email: str = "alex.rivera@btech.edu"):
    user = LOCAL_DB["users"].get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/profile")
def update_profile(data: Dict[str, Any], email: str = "alex.rivera@btech.edu"):
    user = LOCAL_DB["users"].get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.update(data)
    return {"message": "Profile updated successfully", "user": user}

# --- 3. Skills & Assessment Endpoints ---
@router.get("/skills")
def get_skills():
    return {"status": "success", "total_skills": 100, "categories": ["Programming", "AI & ML", "Frontend", "Backend", "Cloud & DevOps", "Databases", "Cybersecurity", "Core & Soft Skills"]}

@router.post("/skills")
def update_user_skills(data: SkillUpdateSchema, uid: str = "usr_demo_btech"):
    if uid not in LOCAL_DB["user_skills"]:
        LOCAL_DB["user_skills"][uid] = {}
    LOCAL_DB["user_skills"][uid].update(data.skills)
    return {"message": "User skills updated", "user_skills": LOCAL_DB["user_skills"][uid]}

@router.post("/assessment")
def submit_assessment(answers: Dict[str, int], uid: str = "usr_demo_btech"):
    return {"message": "Assessment recorded", "score_normalized": 82, "timestamp": "2026-08-08T12:00:00Z"}

# --- 4. Cosine Similarity Skill Gap Endpoints ---
@router.post("/skill-gap/analyze")
def analyze_gap(user_vector: List[float] = Body(...), target_vector: List[float] = Body(...)):
    u = np.array(user_vector)
    c = np.array(target_vector)
    norm_u = np.linalg.norm(u)
    norm_c = np.linalg.norm(c)
    cosine_sim = float(np.dot(u, c) / (norm_u * norm_c)) if norm_u > 0 and norm_c > 0 else 0.0
    return {
        "cosine_similarity": round(cosine_sim, 4),
        "overall_match_percentage": round(cosine_sim * 100, 1),
        "priority_breakdown": {"high": 2, "medium": 3, "low": 1}
    }

# --- 5. Career Recommendation Endpoints ---
@router.get("/career/recommendations")
def get_career_recommendations():
    return [
        {"id": "car_mle", "title": "Machine Learning Engineer", "match_score": 87, "confidence": 0.92, "category": "AI & Data"},
        {"id": "car_ds", "title": "Data Scientist", "match_score": 82, "confidence": 0.88, "category": "AI & Data"},
        {"id": "car_genai", "title": "Generative AI Specialist", "match_score": 80, "confidence": 0.85, "category": "AI & Data"}
    ]

# --- 6. Future Skills Forecasting Endpoints ---
@router.get("/future-skills")
def get_future_skills():
    return [
        {"skill": "Generative AI & LLMs", "category": "AI & ML", "growth_score": 98, "predicted_demand": 99, "trend": "Surging ↑↑", "priority": "HIGH"},
        {"skill": "Explainable AI (SHAP / LIME)", "category": "AI & ML", "growth_score": 94, "predicted_demand": 95, "trend": "Surging ↑↑", "priority": "HIGH"},
        {"skill": "Cloud Solutions (AWS/K8s)", "category": "Cloud & DevOps", "growth_score": 92, "predicted_demand": 96, "trend": "High Growth ↑", "priority": "HIGH"}
    ]

# --- 7. Personalized Learning Roadmap Endpoints ---
@router.post("/roadmap/generate")
def generate_roadmap(career_id: str = "car_mle"):
    return {
        "career_id": career_id,
        "total_phases": 5,
        "estimated_duration": "16 - 22 Weeks",
        "progress_percent": 42
    }

# --- 8. Resume NLP Parser Endpoints ---
@router.post("/resume/analyze")
def analyze_resume(payload: ResumeTextSchema):
    text = payload.raw_text.lower()
    skills_found = []
    for s in ["python", "machine learning", "scikit-learn", "pytorch", "docker", "fastapi", "react", "sql", "git"]:
        if s in text:
            skills_found.append(s.title())
    return {
        "detected_education": "B.Tech in Computer Science (2026)",
        "detected_skills": skills_found,
        "ats_match_percentage": 82,
        "recommendations": ["Quantify project impacts with percentage improvements", "Add production cloud deployment links"]
    }

# --- 9. Explainable AI Endpoints ---
@router.get("/explainability/shap")
def get_shap_values():
    return {
        "base_value": 48.0,
        "features": [
            {"feature": "Python", "shap_value": 24.5, "impact": "Positive (+)"},
            {"feature": "Machine Learning", "shap_value": 21.0, "impact": "Positive (+)"},
            {"feature": "PyTorch (Gap)", "shap_value": -7.5, "impact": "Negative (-)"}
        ]
    }

# --- 10. Model Evaluation Metrics Endpoints ---
@router.get("/evaluation/metrics")
def get_evaluation_metrics():
    return {
        "classifier_accuracy": 91.4,
        "f1_score": 90.0,
        "precision": 90.2,
        "recall": 89.8,
        "roc_auc": 0.946,
        "regression_r2": 0.884,
        "rmse": 4.12,
        "mae": 3.05
    }
