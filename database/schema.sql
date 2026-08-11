-- =============================================================================
-- Skill Gap Analysis and Career Guidance System
-- Database Schema: MySQL 8.0+ / Local Storage DB Adapter
-- =============================================================================

CREATE DATABASE IF NOT EXISTS career_guidance_db;
USE career_guidance_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    education VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    graduation_year VARCHAR(10),
    experience VARCHAR(100),
    interests TEXT,
    target_career_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Skills Taxonomy Table
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(64) PRIMARY KEY,
    skill_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. User Skills & Assessment Scores Table
CREATE TABLE IF NOT EXISTS user_skills (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    skill_id VARCHAR(64) NOT NULL,
    proficiency INT NOT NULL CHECK (proficiency BETWEEN 0 AND 100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- 5. Career Roles Table
CREATE TABLE IF NOT EXISTS career_roles (
    id VARCHAR(64) PRIMARY KEY,
    career_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    salary_range VARCHAR(100),
    market_demand VARCHAR(100),
    growth_score INT DEFAULT 85,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Career Required Skills Table
CREATE TABLE IF NOT EXISTS career_skills (
    id VARCHAR(64) PRIMARY KEY,
    career_id VARCHAR(64) NOT NULL,
    skill_id VARCHAR(64) NOT NULL,
    required_level INT NOT NULL CHECK (required_level BETWEEN 0 AND 100),
    importance INT NOT NULL CHECK (importance BETWEEN 0 AND 100),
    FOREIGN KEY (career_id) REFERENCES career_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- 7. Skill Assessments History Table
CREATE TABLE IF NOT EXISTS assessments (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    skill_id VARCHAR(64) NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- 8. Career Recommendations History Table
CREATE TABLE IF NOT EXISTS recommendations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    career_id VARCHAR(64) NOT NULL,
    match_score INT NOT NULL,
    confidence_score FLOAT NOT NULL,
    cosine_similarity FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (career_id) REFERENCES career_roles(id) ON DELETE CASCADE
);

-- 9. Learning Resources Table
CREATE TABLE IF NOT EXISTS learning_resources (
    id VARCHAR(64) PRIMARY KEY,
    skill_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    provider VARCHAR(255),
    url TEXT,
    difficulty VARCHAR(50),
    duration VARCHAR(50),
    project_task TEXT,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- 10. Learning Roadmaps Table
CREATE TABLE IF NOT EXISTS learning_roadmaps (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    career_id VARCHAR(64) NOT NULL,
    progress_percent INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (career_id) REFERENCES career_roles(id) ON DELETE CASCADE
);

-- 11. Roadmap Milestone Items Table
CREATE TABLE IF NOT EXISTS roadmap_items (
    id VARCHAR(64) PRIMARY KEY,
    roadmap_id VARCHAR(64) NOT NULL,
    phase_number INT NOT NULL,
    skill_id VARCHAR(64) NOT NULL,
    resource_id VARCHAR(64),
    priority VARCHAR(20) DEFAULT 'HIGH',
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (roadmap_id) REFERENCES learning_roadmaps(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
