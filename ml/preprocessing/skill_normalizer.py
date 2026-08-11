"""
Skill Normalization Layer for SkillPath Finder
Standardizes user-entered skill tokens, abbreviations, and aliases to official O*NET technical competencies.
"""

import re
from typing import List, Dict, Optional, Tuple

# Comprehensive alias dictionary mapping variations to standardized O*NET skills
SKILL_ALIASES = {
    # Programming & Scripting
    "py": "Python",
    "python3": "Python",
    "python 3": "Python",
    "js": "JavaScript",
    "javascript": "JavaScript",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "c++": "C++",
    "cpp": "C++",
    "c#": "C#",
    "csharp": "C#",
    "golang": "Go",
    "go lang": "Go",
    "rs": "Rust",
    "rust": "Rust",
    "java": "Java",
    "sql": "SQL",
    "psql": "PostgreSQL",
    "postgres": "PostgreSQL",
    "postgresql": "PostgreSQL",
    "mysql": "MySQL",
    "mongodb": "MongoDB",
    "mongo": "MongoDB",
    "redis": "Redis",
    
    # Web & Frameworks
    "react": "React",
    "react.js": "React",
    "reactjs": "React",
    "next": "Next.js",
    "nextjs": "Next.js",
    "next.js": "Next.js",
    "node": "Node.js",
    "nodejs": "Node.js",
    "node.js": "Node.js",
    "vue": "Vue.js",
    "vuejs": "Vue.js",
    "angular": "Angular",
    "angularjs": "Angular",
    "fastapi": "FastAPI",
    "fast api": "FastAPI",
    "django": "Django",
    "flask": "Flask",
    "express": "Express.js",
    "expressjs": "Express.js",
    "spring": "Spring Boot",
    "spring boot": "Spring Boot",
    "html": "HTML5",
    "html5": "HTML5",
    "css": "CSS3",
    "css3": "CSS3",
    "tailwind": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",

    # AI, ML & Data Science
    "ml": "Machine Learning",
    "machine learning": "Machine Learning",
    "machine-learning": "Machine Learning",
    "dl": "Deep Learning",
    "deep learning": "Deep Learning",
    "nlp": "Natural Language Processing",
    "natural language processing": "Natural Language Processing",
    "cv": "Computer Vision",
    "computer vision": "Computer Vision",
    "genai": "Generative AI",
    "generative ai": "Generative AI",
    "llm": "Large Language Models",
    "llms": "Large Language Models",
    "pytorch": "PyTorch",
    "torch": "PyTorch",
    "tensorflow": "TensorFlow",
    "tf": "TensorFlow",
    "keras": "Keras",
    "scikit-learn": "Scikit-Learn",
    "scikitlearn": "Scikit-Learn",
    "sklearn": "Scikit-Learn",
    "pandas": "Pandas",
    "numpy": "NumPy",
    "scipy": "SciPy",
    "data science": "Data Science",
    "data analysis": "Data Analysis",
    "data analytics": "Data Analysis",
    "tableau": "Tableau",
    "powerbi": "Power BI",
    "power bi": "Power BI",

    # Cloud & DevOps
    "aws": "Amazon Web Services (AWS)",
    "amazon web services": "Amazon Web Services (AWS)",
    "gcp": "Google Cloud Platform (GCP)",
    "google cloud": "Google Cloud Platform (GCP)",
    "azure": "Microsoft Azure",
    "ms azure": "Microsoft Azure",
    "docker": "Docker",
    "k8s": "Kubernetes",
    "kubernetes": "Kubernetes",
    "terraform": "Terraform",
    "ci/cd": "CI/CD Pipelines",
    "cicd": "CI/CD Pipelines",
    "jenkins": "Jenkins",
    "github actions": "GitHub Actions",
    "linux": "Linux",
    "bash": "Shell Scripting (Bash)",
    "git": "Git",
    "github": "Git",

    # Core CS & Security
    "dsa": "Data Structures & Algorithms",
    "data structures": "Data Structures & Algorithms",
    "algorithms": "Data Structures & Algorithms",
    "oop": "Object-Oriented Programming",
    "cybersecurity": "Cybersecurity",
    "infosec": "Information Security",
    "penetration testing": "Penetration Testing",
    "pen testing": "Penetration Testing",
    "ethical hacking": "Ethical Hacking",
    "cryptography": "Cryptography",
    "network security": "Network Security"
}

def clean_token(text: str) -> str:
    """Removes special characters and extra whitespace"""
    if not text:
        return ""
    # Strip whitespace, lowercase, remove punctuation except +, #, .
    cleaned = re.sub(r'[^a-zA-Z0-9\+\#\.\s\-]', ' ', text)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip().lower()
    return cleaned

def normalize_skill(skill_raw: str) -> str:
    """
    Standardizes a raw skill name using alias map, direct match, or casing.
    Returns human-readable canonical skill name.
    """
    if not skill_raw:
        return ""
    
    cleaned = clean_token(skill_raw)
    
    # 1. Exact alias match
    if cleaned in SKILL_ALIASES:
        return SKILL_ALIASES[cleaned]
    
    # 2. Check direct lower match against keys
    for alias_key, standard_name in SKILL_ALIASES.items():
        if cleaned == alias_key.lower():
            return standard_name
            
    # 3. Capitalize words if not found in alias map
    return " ".join(word.capitalize() for word in skill_raw.strip().split())

def normalize_skills_list(skills: List[str]) -> List[str]:
    """Normalizes and deduplicates a list of skill strings"""
    normalized = []
    seen = set()
    for s in skills:
        norm = normalize_skill(s)
        if norm and norm.lower() not in seen:
            seen.add(norm.lower())
            normalized.append(norm)
    return normalized

if __name__ == '__main__':
    test_cases = ["ML", "machine-learning", "k8s", "py", "AWS", "reactjs", "NLP", "dsa", "c++", "docker"]
    print("Skill Normalization Demo:")
    for t in test_cases:
        print(f"  {t:20s} -> {normalize_skill(t)}")
