import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from backend.app.routes.api_routes import router as api_router
    from backend.app.routes.onet_routes import router as onet_router
except ImportError:
    from app.routes.api_routes import router as api_router
    from app.routes.onet_routes import router as onet_router

app = FastAPI(
    title="Skill Gap Analysis and Career Guidance API",
    description="FastAPI Backend for ML-driven skill assessment, Cosine Similarity gap analysis, Random Forest career recommendations, Future skill regression, SHAP explainability, and NLP resume parsing.",
    version="1.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.include_router(onet_router, prefix="/api")

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Skill Gap Analysis and Career Guidance API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
