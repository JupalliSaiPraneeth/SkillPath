"""
O*NET 30.3 SQLite Relational Database Ingestion Pipeline
Constructs the normalized onet_30_3.db database with indexes and metadata.
"""

import os
import csv
import sqlite3
import hashlib
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ONET_CSV_DIR = os.path.join(BASE_DIR, "db_30_3_csv")
DATA_DIR = os.path.join(BASE_DIR, "data", "onet")
DB_PATH = os.path.join(DATA_DIR, "onet_30_3.db")

def init_db(conn):
    """Initializes schema for all O*NET normalized tables"""
    cursor = conn.cursor()
    
    # 1. Dataset Version Metadata
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_dataset_versions (
        version TEXT PRIMARY KEY,
        release_date TEXT NOT NULL,
        source TEXT NOT NULL,
        imported_at TEXT NOT NULL,
        record_count INTEGER NOT NULL,
        status TEXT NOT NULL
    );
    """)
    
    # 2. Occupations Master Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_occupations (
        onet_soc_code TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    );
    """)
    
    # 3. Alternate & Reported Job Titles
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_job_titles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        job_title TEXT NOT NULL,
        is_reported_title INTEGER DEFAULT 0,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 4. Essential Skills Requirements
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_occupation_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT NOT NULL,
        skill_name TEXT NOT NULL,
        scale_id TEXT NOT NULL,
        data_value REAL NOT NULL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 5. Transferable Skills
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_transferable_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT NOT NULL,
        skill_name TEXT NOT NULL,
        scale_id TEXT NOT NULL,
        data_value REAL NOT NULL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 6. Knowledge Domains
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_knowledge (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT NOT NULL,
        knowledge_name TEXT NOT NULL,
        scale_id TEXT NOT NULL,
        data_value REAL NOT NULL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 7. Abilities
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_abilities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT NOT NULL,
        ability_name TEXT NOT NULL,
        scale_id TEXT NOT NULL,
        data_value REAL NOT NULL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 8. Software & Hot Technologies
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_software_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        example_software TEXT NOT NULL,
        commodity_title TEXT,
        hot_technology INTEGER DEFAULT 0,
        in_demand INTEGER DEFAULT 0,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 9. Job Zones & Preparation
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_job_zones (
        onet_soc_code TEXT PRIMARY KEY,
        job_zone INTEGER NOT NULL,
        date_updated TEXT,
        domain_source TEXT,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_job_zone_reference (
        job_zone INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        experience TEXT,
        education TEXT,
        job_training TEXT,
        examples TEXT,
        svp_range TEXT
    );
    """)
    
    # 10. Education & Training Preparation
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT,
        category_description TEXT,
        data_value REAL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 11. Interests (RIASEC)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_career_interest_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT,
        interest_type TEXT NOT NULL,
        scale_id TEXT,
        data_value REAL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 12. Work Styles
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_work_styles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT,
        work_style_name TEXT NOT NULL,
        scale_id TEXT,
        data_value REAL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 13. Work Activities
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_work_activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        element_id TEXT,
        activity_name TEXT NOT NULL,
        scale_id TEXT,
        data_value REAL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 14. Tasks & Emerging Tasks
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        task_id TEXT,
        task_statement TEXT NOT NULL,
        task_type TEXT,
        importance REAL,
        relevance REAL,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_emerging_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        task_id TEXT,
        task_statement TEXT NOT NULL,
        category TEXT,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    # 15. Related Occupations
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS onet_related_occupations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        onet_soc_code TEXT NOT NULL,
        related_soc_code TEXT NOT NULL,
        related_title TEXT,
        related_index INTEGER,
        FOREIGN KEY (onet_soc_code) REFERENCES onet_occupations(onet_soc_code)
    );
    """)
    
    conn.commit()

def import_csv_to_sqlite():
    """Imports all validated CSVs into onet_30_3.db"""
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # Remove existing DB if needed for clean re-import
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        
    conn = sqlite3.connect(DB_PATH)
    init_db(conn)
    cursor = conn.cursor()
    
    print("=" * 65)
    print("O*NET 30.3 SQLite Relational Ingestion")
    print(f"Target DB: {DB_PATH}")
    print("=" * 65)
    
    total_records = 0
    
    # 1. Ingest Occupations
    occ_file = os.path.join(ONET_CSV_DIR, "occupation_data.csv")
    if os.path.exists(occ_file):
        with open(occ_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Title', '').strip(), r.get('Description', '').strip()) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT OR REPLACE INTO onet_occupations (onet_soc_code, title, description) VALUES (?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_occupations")
            total_records += len(rows)
            
    # 2. Ingest Job Titles
    titles_file = os.path.join(ONET_CSV_DIR, "job_titles.csv")
    if os.path.exists(titles_file):
        with open(titles_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Reported Job Title', '').strip() or r.get('Job Title', '').strip(), 0) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_job_titles (onet_soc_code, job_title, is_reported_title) VALUES (?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_job_titles")
            total_records += len(rows)

    # Reported Titles
    rep_file = os.path.join(ONET_CSV_DIR, "sample_of_reported_titles.csv")
    if os.path.exists(rep_file):
        with open(rep_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Reported Job Title', '').strip(), 1) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_job_titles (onet_soc_code, job_title, is_reported_title) VALUES (?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} sample_of_reported_titles")
            total_records += len(rows)

    # 3. Essential Skills
    skills_file = os.path.join(ONET_CSV_DIR, "essential_skills.csv")
    if os.path.exists(skills_file):
        with open(skills_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Element ID', ''), r.get('Element Name', ''), r.get('Scale ID', ''), float(r.get('Data Value', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_occupation_skills (onet_soc_code, element_id, skill_name, scale_id, data_value) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_occupation_skills")
            total_records += len(rows)

    # 4. Transferable Skills
    trans_file = os.path.join(ONET_CSV_DIR, "transferable_skills.csv")
    if os.path.exists(trans_file):
        with open(trans_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Element ID', ''), r.get('Element Name', ''), r.get('Scale ID', ''), float(r.get('Data Value', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_transferable_skills (onet_soc_code, element_id, skill_name, scale_id, data_value) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_transferable_skills")
            total_records += len(rows)

    # 5. Knowledge
    know_file = os.path.join(ONET_CSV_DIR, "knowledge.csv")
    if os.path.exists(know_file):
        with open(know_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Element ID', ''), r.get('Element Name', ''), r.get('Scale ID', ''), float(r.get('Data Value', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_knowledge (onet_soc_code, element_id, knowledge_name, scale_id, data_value) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_knowledge")
            total_records += len(rows)

    # 6. Abilities
    abi_file = os.path.join(ONET_CSV_DIR, "abilities.csv")
    if os.path.exists(abi_file):
        with open(abi_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Element ID', ''), r.get('Element Name', ''), r.get('Scale ID', ''), float(r.get('Data Value', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_abilities (onet_soc_code, element_id, ability_name, scale_id, data_value) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_abilities")
            total_records += len(rows)

    # 7. Software Skills
    soft_file = os.path.join(ONET_CSV_DIR, "software_skills.csv")
    if os.path.exists(soft_file):
        with open(soft_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [
                (
                    r.get('O*NET-SOC Code', '').strip(),
                    (r.get('Workplace Example') or r.get('Example', '')).strip(),
                    (r.get('Element Name') or r.get('Commodity Title', '')).strip(),
                    1 if r.get('Hot Technology') == 'Y' else 0,
                    1 if r.get('In Demand') == 'Y' else 0
                )
                for r in reader if r.get('O*NET-SOC Code')
            ]
            cursor.executemany("INSERT INTO onet_software_skills (onet_soc_code, example_software, commodity_title, hot_technology, in_demand) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_software_skills")
            total_records += len(rows)

    # 8. Job Zones Reference & Occupations
    jz_ref_file = os.path.join(ONET_CSV_DIR, "job_zone_reference.csv")
    if os.path.exists(jz_ref_file):
        with open(jz_ref_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(int(r.get('Job Zone', 1)), r.get('Name', ''), r.get('Experience', ''), r.get('Education', ''), r.get('Job Training', ''), r.get('Examples', ''), r.get('SVP Range', '')) for r in reader if r.get('Job Zone')]
            cursor.executemany("INSERT OR REPLACE INTO onet_job_zone_reference VALUES (?, ?, ?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_job_zone_reference")
            total_records += len(rows)

    jz_file = os.path.join(ONET_CSV_DIR, "job_zones.csv")
    if os.path.exists(jz_file):
        with open(jz_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), int(r.get('Job Zone', 1) or 1), r.get('Date', ''), r.get('Domain Source', '')) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT OR REPLACE INTO onet_job_zones VALUES (?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_job_zones")
            total_records += len(rows)

    # 9. Interests (RIASEC)
    int_file = os.path.join(ONET_CSV_DIR, "career_interest_types.csv")
    if os.path.exists(int_file):
        with open(int_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Element ID', ''), r.get('Element Name', ''), r.get('Scale ID', ''), float(r.get('Data Value', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_career_interest_types (onet_soc_code, element_id, interest_type, scale_id, data_value) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_career_interest_types")
            total_records += len(rows)

    # 10. Work Styles
    ws_file = os.path.join(ONET_CSV_DIR, "work_styles.csv")
    if os.path.exists(ws_file):
        with open(ws_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Element ID', ''), r.get('Element Name', ''), r.get('Scale ID', ''), float(r.get('Data Value', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_work_styles (onet_soc_code, element_id, work_style_name, scale_id, data_value) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_work_styles")
            total_records += len(rows)

    # 11. Work Activities
    wa_file = os.path.join(ONET_CSV_DIR, "work_activities.csv")
    if os.path.exists(wa_file):
        with open(wa_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Element ID', ''), r.get('Element Name', ''), r.get('Scale ID', ''), float(r.get('Data Value', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_work_activities (onet_soc_code, element_id, activity_name, scale_id, data_value) VALUES (?, ?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_work_activities")
            total_records += len(rows)

    # 12. Tasks Statements
    task_file = os.path.join(ONET_CSV_DIR, "task_statements.csv")
    if os.path.exists(task_file):
        with open(task_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Task ID', ''), r.get('Task', '').strip(), r.get('Task Type', 'Core')) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_tasks (onet_soc_code, task_id, task_statement, task_type) VALUES (?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_tasks")
            total_records += len(rows)

    # Emerging Tasks
    em_file = os.path.join(ONET_CSV_DIR, "emerging_tasks.csv")
    if os.path.exists(em_file):
        with open(em_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Task ID', '') or r.get('Original Task ID', ''), r.get('Task', '').strip() or r.get('Original Task', '').strip(), r.get('Category', 'Emerging')) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_emerging_tasks (onet_soc_code, task_id, task_statement, category) VALUES (?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_emerging_tasks")
            total_records += len(rows)

    # 13. Related Occupations
    rel_file = os.path.join(ONET_CSV_DIR, "related_occupations.csv")
    if os.path.exists(rel_file):
        with open(rel_file, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            rows = [(r.get('O*NET-SOC Code', '').strip(), r.get('Related O*NET-SOC Code', '').strip(), r.get('Related Title', '').strip(), int(r.get('Index', 0) or r.get('Related Index', 0) or 0)) for r in reader if r.get('O*NET-SOC Code')]
            cursor.executemany("INSERT INTO onet_related_occupations (onet_soc_code, related_soc_code, related_title, related_index) VALUES (?, ?, ?, ?)", rows)
            print(f"  [+] Ingested {len(rows):6d} onet_related_occupations")
            total_records += len(rows)

    # 14. Add Version Record
    cursor.execute("""
    INSERT OR REPLACE INTO onet_dataset_versions VALUES (
        '30.3',
        'May 2026',
        'U.S. Department of Labor / Employment and Training Administration (USDOL/ETA)',
        ?,
        ?,
        'ACTIVE'
    );
    """, (datetime.now(timezone.utc).isoformat(), total_records))

    # 15. Create Composite Indexes for Performance
    print("\n[+] Creating High-Performance Search & Foreign Key Indexes...")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_occ_title ON onet_occupations(title);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_titles_job ON onet_job_titles(job_title);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_titles_soc ON onet_job_titles(onet_soc_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_skills_soc ON onet_occupation_skills(onet_soc_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_skills_name ON onet_occupation_skills(skill_name);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_know_soc ON onet_knowledge(onet_soc_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_soft_soc ON onet_software_skills(onet_soc_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_soft_hot ON onet_software_skills(hot_technology);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_tasks_soc ON onet_tasks(onet_soc_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_related_soc ON onet_related_occupations(onet_soc_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_onet_interests_soc ON onet_career_interest_types(onet_soc_code);")

    conn.commit()
    conn.close()
    
    print("=" * 65)
    print(f"[+] Database Successfully Created: {DB_PATH}")
    print(f"[+] Total Records Ingested:        {total_records:,}")
    print(f"[+] O*NET Version Active:          30.3 (May 2026)")
    print("=" * 65 + "\n")

if __name__ == '__main__':
    import_csv_to_sqlite()
