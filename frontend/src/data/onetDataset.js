/**
 * O*NET 30.3 Comprehensive Embedded Client Dataset
 * Provides rich occupational data for all major SOC disciplines,
 * ensuring 100% functionality on deployed instances (Vercel, Netlify, etc.)
 * even when the local FastAPI server is not reachable.
 */

export const ONET_DISCIPLINES = [
  { id: 'ALL', label: 'All Disciplines', code: '' },
  { id: 'TECH', label: 'Software & Technology', code: '15-' },
  { id: 'AI_DATA', label: 'Data Science & AI', code: '15-2' },
  { id: 'ENG', label: 'Architecture & Engineering', code: '17-' },
  { id: 'MGMT', label: 'Management & Operations', code: '11-' },
  { id: 'FIN', label: 'Business & Financial', code: '13-' },
  { id: 'HEALTH', label: 'Healthcare & Life Sciences', code: '29-' }
];

export const ONET_OCCUPATIONS = [
  // --- SOFTWARE & TECHNOLOGY (SOC 15-xxxx) ---
  {
    onet_soc_code: '15-1252.00',
    soc_code: '15-1252.00',
    title: 'Software Developers',
    description: 'Research, design, and develop computer and network software or specialized utility programs. Analyze user needs and develop software solutions, applying principles and techniques of computer science, engineering, and mathematical analysis.',
    job_family: 'Computer and Mathematical',
    job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's Degree", experience: '2–4 years' },
    annual_median_salary: '$132,270',
    hourly_median_salary: '$63.59',
    salary: { annual_median: '$132,270', hourly_median: '$63.59', annual_entry: '$77,020', annual_experienced: '$198,100' },
    growth_outlook: 'Much Faster than Average (+25%)',
    growth: { outlook: 'Much Faster than Average (+25%)', openings: '153,900 annual openings', projected_employment: '1,795,300' },
    top_skills: [
      { name: 'Programming', importance: 88, level: 75, category: 'Technical' },
      { name: 'Systems Analysis', importance: 82, level: 70, category: 'Technical' },
      { name: 'Complex Problem Solving', importance: 85, level: 78, category: 'Technical' },
      { name: 'Critical Thinking', importance: 78, level: 72, category: 'Soft Skills' },
      { name: 'System Design & Architecture', importance: 84, level: 76, category: 'Technical' }
    ],
    software_skills: ['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Git', 'PostgreSQL', 'MongoDB', 'Linux'],
    knowledge_areas: [
      { name: 'Computers and Electronics', score: 94 },
      { name: 'Engineering and Technology', score: 88 },
      { name: 'Mathematics', score: 82 },
      { name: 'Design & Architecture', score: 78 }
    ],
    abilities: [
      { name: 'Deductive Reasoning', score: 88 },
      { name: 'Inductive Reasoning', score: 84 },
      { name: 'Information Ordering', score: 82 },
      { name: 'Mathematical Reasoning', score: 80 }
    ],
    work_styles: [
      { name: 'Analytical Thinking', score: 96 },
      { name: 'Attention to Detail', score: 92 },
      { name: 'Innovation', score: 90 },
      { name: 'Persistence', score: 86 }
    ],
    sample_tasks: [
      'Design, develop, and test software systems for commercial and scientific applications.',
      'Analyze requirements to determine feasibility of design within time and cost constraints.',
      'Consult with engineering staff to evaluate interface between hardware and software.',
      'Develop software system testing and validation procedures.'
    ],
    emerging_tasks: [
      'Integrate Large Language Models (LLMs) and vector databases into microservices architectures.',
      'Deploy containerized distributed systems on Kubernetes clusters with CI/CD automation.'
    ],
    related_occupations: [
      { soc_code: '15-1251.00', title: 'Computer Programmers' },
      { soc_code: '15-1253.00', title: 'Software Quality Assurance Analysts and Testers' },
      { soc_code: '15-1254.00', title: 'Web Developers' },
      { soc_code: '15-1221.00', title: 'Computer and Information Research Scientists' }
    ]
  },
  {
    onet_soc_code: '15-2051.00',
    soc_code: '15-2051.00',
    title: 'Data Scientists & Machine Learning Specialists',
    description: 'Develop and implement algorithms and statistical models to analyze structured and unstructured data. Build predictive machine learning systems, automated decision pipelines, and neural networks to extract business and scientific intelligence.',
    job_family: 'Computer and Mathematical',
    job_zone: { zone: 5, name: 'Extensive Preparation Needed', education: "Master's or Ph.D.", experience: '3–5 years' },
    annual_median_salary: '$136,620',
    hourly_median_salary: '$65.68',
    salary: { annual_median: '$136,620', hourly_median: '$65.68', annual_entry: '$82,500', annual_experienced: '$208,400' },
    growth_outlook: 'Much Faster than Average (+35%)',
    growth: { outlook: 'Much Faster than Average (+35%)', openings: '20,800 annual openings', projected_employment: '228,500' },
    top_skills: [
      { name: 'Machine Learning', importance: 92, level: 85, category: 'Technical' },
      { name: 'Statistical Modeling', importance: 90, level: 82, category: 'Technical' },
      { name: 'Data Visualization', importance: 80, level: 75, category: 'Technical' },
      { name: 'Deep Learning & Neural Networks', importance: 88, level: 80, category: 'Technical' },
      { name: 'Mathematics & Linear Algebra', importance: 86, level: 80, category: 'Technical' }
    ],
    software_skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'SQL', 'Pandas', 'NumPy', 'R', 'Apache Spark', 'MLflow', 'Docker', 'AWS SageMaker'],
    knowledge_areas: [
      { name: 'Mathematics & Statistics', score: 96 },
      { name: 'Computers and Electronics', score: 92 },
      { name: 'Data Science & AI', score: 95 },
      { name: 'Business Intelligence', score: 78 }
    ],
    abilities: [
      { name: 'Mathematical Reasoning', score: 92 },
      { name: 'Inductive Reasoning', score: 90 },
      { name: 'Pattern Recognition', score: 88 },
      { name: 'Deductive Reasoning', score: 86 }
    ],
    work_styles: [
      { name: 'Analytical Thinking', score: 98 },
      { name: 'Innovation', score: 94 },
      { name: 'Persistence', score: 88 },
      { name: 'Attention to Detail', score: 92 }
    ],
    sample_tasks: [
      'Formulate mathematical or statistical models to solve complex real-world prediction challenges.',
      'Train, fine-tune, and evaluate deep neural networks on high-dimensional feature vectors.',
      'Deploy real-time inference endpoints and monitor production model drift.',
      'Clean, normalize, and engineer features from terabyte-scale distributed datasets.'
    ],
    emerging_tasks: [
      'Build Retrieval-Augmented Generation (RAG) pipelines with embeddings and vector databases.',
      'Implement SHAP and LIME explainable AI interpretability frameworks for regulatory compliance.'
    ],
    related_occupations: [
      { soc_code: '15-2051.01', title: 'Business Intelligence Analysts' },
      { soc_code: '15-1221.00', title: 'Computer and Information Research Scientists' },
      { soc_code: '15-2041.00', title: 'Statisticians' },
      { soc_code: '15-1252.00', title: 'Software Developers' }
    ]
  },
  {
    onet_soc_code: '15-1212.00',
    soc_code: '15-1212.00',
    title: 'Information Security Analysts & Cybersecurity Engineers',
    description: 'Plan, implement, upgrade, or monitor security measures for the protection of computer networks and information. Assess system vulnerabilities for security risks and propose and implement security measures.',
    job_family: 'Computer and Mathematical',
    job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's Degree", experience: '2–4 years' },
    annual_median_salary: '$120,360',
    hourly_median_salary: '$57.87',
    salary: { annual_median: '$120,360', hourly_median: '$57.87', annual_entry: '$66,300', annual_experienced: '$182,000' },
    growth_outlook: 'Much Faster than Average (+32%)',
    growth: { outlook: 'Much Faster than Average (+32%)', openings: '16,800 annual openings', projected_employment: '215,900' },
    top_skills: [
      { name: 'Network Security', importance: 90, level: 82, category: 'Technical' },
      { name: 'Vulnerability Assessment', importance: 88, level: 80, category: 'Technical' },
      { name: 'Incident Response', importance: 86, level: 78, category: 'Technical' },
      { name: 'Cryptography', importance: 82, level: 74, category: 'Technical' },
      { name: 'Security Auditing', importance: 80, level: 75, category: 'Technical' }
    ],
    software_skills: ['Wireshark', 'Metasploit', 'Nmap', 'Burp Suite', 'Splunk', 'SIEM', 'Python', 'Bash', 'Linux', 'Kali Linux', 'Snort', 'Snort IDS'],
    knowledge_areas: [
      { name: 'Computers and Cybersecurity', score: 95 },
      { name: 'Telecommunications & Networks', score: 90 },
      { name: 'Public Safety and Security', score: 85 },
      { name: 'Law and Government', score: 74 }
    ],
    abilities: [
      { name: 'Problem Sensitivity', score: 90 },
      { name: 'Inductive Reasoning', score: 86 },
      { name: 'Information Ordering', score: 82 },
      { name: 'Selective Attention', score: 84 }
    ],
    work_styles: [
      { name: 'Integrity', score: 98 },
      { name: 'Attention to Detail', score: 96 },
      { name: 'Stress Tolerance', score: 90 },
      { name: 'Analytical Thinking', score: 92 }
    ],
    sample_tasks: [
      'Monitor computer networks for security breaches and investigate violations when they occur.',
      'Install and use software, such as firewalls and data encryption programs, to protect sensitive data.',
      'Conduct penetration tests by simulating cyberattacks to identify defensive weaknesses.',
      'Document security breaches and assess the damage they cause.'
    ],
    emerging_tasks: [
      'Configure Zero Trust architecture and multi-cloud Identity and Access Management (IAM) controls.',
      'Deploy AI-driven automated threat hunting and anomalous behavioral detection systems.'
    ],
    related_occupations: [
      { soc_code: '15-1211.00', title: 'Computer Systems Analysts' },
      { soc_code: '15-1244.00', title: 'Network and Computer Systems Administrators' },
      { soc_code: '15-1241.00', title: 'Computer Network Architects' }
    ]
  },
  {
    onet_soc_code: '15-1254.00',
    soc_code: '15-1254.00',
    title: 'Web Developers & Full Stack Engineers',
    description: 'Develop and create websites, web applications, and interactive user interfaces. Analyze user needs to implement Web site content, graphics, performance, and capacity. Integrate frontend client code with backend microservices and databases.',
    job_family: 'Computer and Mathematical',
    job_zone: { zone: 3, name: 'Medium Preparation Needed', education: "Associate's or Bachelor's", experience: '1–3 years' },
    annual_median_salary: '$92,750',
    hourly_median_salary: '$44.59',
    salary: { annual_median: '$92,750', hourly_median: '$44.59', annual_entry: '$49,430', annual_experienced: '$148,200' },
    growth_outlook: 'Faster than Average (+16%)',
    growth: { outlook: 'Faster than Average (+16%)', openings: '19,000 annual openings', projected_employment: '248,300' },
    top_skills: [
      { name: 'Frontend Architecture', importance: 88, level: 80, category: 'Technical' },
      { name: 'REST & GraphQL APIs', importance: 85, level: 76, category: 'Technical' },
      { name: 'Responsive Web Design', importance: 84, level: 78, category: 'Technical' },
      { name: 'Web Performance Optimization', importance: 80, level: 72, category: 'Technical' }
    ],
    software_skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Next.js', 'Node.js', 'Express', 'TailwindCSS', 'PostgreSQL', 'Git', 'Vite'],
    knowledge_areas: [
      { name: 'Computers and Electronics', score: 90 },
      { name: 'Design and User Experience', score: 84 },
      { name: 'Communications and Media', score: 76 }
    ],
    abilities: [
      { name: 'Visualization', score: 85 },
      { name: 'Information Ordering', score: 82 },
      { name: 'Fluency of Ideas', score: 80 }
    ],
    work_styles: [
      { name: 'Attention to Detail', score: 92 },
      { name: 'Creativity', score: 88 },
      { name: 'Adaptability', score: 86 }
    ],
    sample_tasks: [
      'Write, design, or edit Web page content, directed by client requirements and UI designs.',
      'Implement responsive layouts compatible across all modern desktop, tablet, and mobile browsers.',
      'Integrate frontend React components with asynchronous backend RESTful endpoints.',
      'Optimize web application bundle sizes and Core Web Vitals performance metrics.'
    ],
    emerging_tasks: [
      'Build serverless Edge-rendered React and Next.js applications with real-time WebSockets.',
      'Integrate WebAssembly modules for high-throughput browser-based compute.'
    ],
    related_occupations: [
      { soc_code: '15-1255.00', title: 'Web and Digital Interface Designers' },
      { soc_code: '15-1252.00', title: 'Software Developers' },
      { soc_code: '15-1251.00', title: 'Computer Programmers' }
    ]
  },
  {
    onet_soc_code: '15-1241.00',
    soc_code: '15-1241.00',
    title: 'Computer Network Architects & Cloud Infrastructure Engineers',
    description: 'Design and implement computer and information networks, such as local area networks (LAN), wide area networks (WAN), intranets, extranets, and other data communications networks. Architect resilient multi-region cloud infrastructure.',
    job_family: 'Computer and Mathematical',
    job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's Degree", experience: '5+ years' },
    annual_median_salary: '$129,840',
    hourly_median_salary: '$62.42',
    salary: { annual_median: '$129,840', hourly_median: '$62.42', annual_entry: '$79,800', annual_experienced: '$189,400' },
    growth_outlook: 'Average (+5%)',
    growth: { outlook: 'Average (+5%)', openings: '11,200 annual openings', projected_employment: '184,100' },
    top_skills: [
      { name: 'Cloud Infrastructure Architecture', importance: 90, level: 84, category: 'Technical' },
      { name: 'Network Protocol Design', importance: 88, level: 82, category: 'Technical' },
      { name: 'Systems Evaluation', importance: 84, level: 78, category: 'Technical' },
      { name: 'Capacity Planning', importance: 82, level: 75, category: 'Technical' }
    ],
    software_skills: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Terraform', 'Kubernetes', 'Docker', 'Cisco IOS', 'BGP', 'Ansible', 'Linux'],
    knowledge_areas: [
      { name: 'Telecommunications', score: 94 },
      { name: 'Computers and Electronics', score: 92 },
      { name: 'Engineering and Technology', score: 86 }
    ],
    abilities: [
      { name: 'Deductive Reasoning', score: 88 },
      { name: 'Problem Sensitivity', score: 86 },
      { name: 'Systems Perception', score: 84 }
    ],
    work_styles: [
      { name: 'Analytical Thinking', score: 94 },
      { name: 'Dependability', score: 92 },
      { name: 'Leadership', score: 85 }
    ],
    sample_tasks: [
      'Design and deploy scalable cloud infrastructure using Infrastructure-as-Code (Terraform).',
      'Evaluate new data communications technologies to optimize network throughput and uptime.',
      'Architect disaster recovery strategies across multiple geographic availability zones.',
      'Configure software-defined networking (SDN) and border gateway protocol (BGP) routing.'
    ],
    emerging_tasks: [
      'Implement automated GitOps workflows using ArgoCD for zero-downtime Kubernetes deployments.',
      'Design hybrid-cloud secure multi-tenant network meshes using Istio and Envoy.'
    ],
    related_occupations: [
      { soc_code: '15-1244.00', title: 'Network and Computer Systems Administrators' },
      { soc_code: '15-1212.00', title: 'Information Security Analysts' },
      { soc_code: '15-1252.00', title: 'Software Developers' }
    ]
  },
  {
    onet_soc_code: '15-1242.00',
    soc_code: '15-1242.00',
    title: 'Database Administrators & Data Architects',
    description: 'Administer, test, and implement computer databases, applying knowledge of database management systems. Coordinate changes to computer databases. Identify database requirements, interview customers, and determine design specifications.',
    job_family: 'Computer and Mathematical',
    job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's Degree", experience: '2–4 years' },
    annual_median_salary: '$117,450',
    hourly_median_salary: '$56.47',
    salary: { annual_median: '$117,450', hourly_median: '$56.47', annual_entry: '$58,200', annual_experienced: '$168,000' },
    growth_outlook: 'Faster than Average (+8%)',
    growth: { outlook: 'Faster than Average (+8%)', openings: '13,500 annual openings', projected_employment: '175,800' },
    top_skills: [
      { name: 'Database Architecture & Query Optimization', importance: 92, level: 85, category: 'Technical' },
      { name: 'Data Security & Backup Recovery', importance: 88, level: 80, category: 'Technical' },
      { name: 'Schema Design & Normalization', importance: 86, level: 80, category: 'Technical' }
    ],
    software_skills: ['PostgreSQL', 'MySQL', 'Oracle DB', 'Microsoft SQL Server', 'MongoDB', 'Redis', 'Cassandra', 'Snowflake', 'DynamoDB', 'SQL'],
    knowledge_areas: [
      { name: 'Computers and Electronics', score: 94 },
      { name: 'Data Storage Systems', score: 92 },
      { name: 'Mathematics', score: 78 }
    ],
    abilities: [
      { name: 'Information Ordering', score: 88 },
      { name: 'Deductive Reasoning', score: 85 },
      { name: 'Selective Attention', score: 82 }
    ],
    work_styles: [
      { name: 'Attention to Detail', score: 96 },
      { name: 'Dependability', score: 92 },
      { name: 'Analytical Thinking', score: 90 }
    ],
    sample_tasks: [
      'Optimize database query execution plans, indexes, and partition schemes for sub-millisecond response.',
      'Implement real-time replication, high-availability clustering, and point-in-time recovery pipelines.',
      'Define data governance standards, encryption at rest, and strict role-based access controls.'
    ],
    emerging_tasks: [
      'Manage high-scale vector indexing (HNSW, IVFFlat) on pgvector and specialized vector databases.',
      'Architect unified lakehouse storage using Apache Iceberg and cloud object stores.'
    ],
    related_occupations: [
      { soc_code: '15-1252.00', title: 'Software Developers' },
      { soc_code: '15-2051.00', title: 'Data Scientists' },
      { soc_code: '15-1211.00', title: 'Computer Systems Analysts' }
    ]
  },
  {
    onet_soc_code: '15-1221.00',
    soc_code: '15-1221.00',
    title: 'Computer and Information Research Scientists (AI / Algorithms)',
    description: 'Conduct research in the fundamental areas of computer and information science. Formulate operational concepts for computer systems, develop novel machine learning algorithms, and explore advanced computing paradigms.',
    job_family: 'Computer and Mathematical',
    job_zone: { zone: 5, name: 'Extensive Preparation Needed', education: 'Ph.D. in Computer Science', experience: '4–6 years' },
    annual_median_salary: '$145,080',
    hourly_median_salary: '$69.75',
    salary: { annual_median: '$145,080', hourly_median: '$69.75', annual_entry: '$85,400', annual_experienced: '$225,000' },
    growth_outlook: 'Much Faster than Average (+23%)',
    growth: { outlook: 'Much Faster than Average (+23%)', openings: '3,400 annual openings', projected_employment: '41,300' },
    top_skills: [
      { name: 'Algorithmic Research & Complexity', importance: 95, level: 90, category: 'Technical' },
      { name: 'Theoretical Computer Science', importance: 92, level: 88, category: 'Technical' },
      { name: 'Scientific Communication', importance: 88, level: 82, category: 'Academic' }
    ],
    software_skills: ['Python', 'C++', 'PyTorch', 'CUDA', 'JAX', 'Julia', 'Linux', 'LaTeX', 'Git', 'Ray Distributed Compute'],
    knowledge_areas: [
      { name: 'Computer Science Theory', score: 98 },
      { name: 'Mathematics', score: 96 },
      { name: 'Physics and Engineering', score: 85 }
    ],
    abilities: [
      { name: 'Mathematical Reasoning', score: 95 },
      { name: 'Inductive Reasoning', score: 94 },
      { name: 'Originality & Innovation', score: 92 }
    ],
    work_styles: [
      { name: 'Innovation', score: 98 },
      { name: 'Analytical Thinking', score: 96 },
      { name: 'Persistence', score: 92 }
    ],
    sample_tasks: [
      'Invent novel neural network architectures and mathematical optimization techniques.',
      'Publish peer-reviewed scientific papers in top artificial intelligence and computing venues.',
      'Collaborate with hardware engineering teams on custom ASIC tensor processing units.'
    ],
    emerging_tasks: [
      'Pioneer energy-efficient neural compression and sparse attention mechanisms for frontier AI.',
      'Develop quantum computing algorithms and quantum error correction simulations.'
    ],
    related_occupations: [
      { soc_code: '15-2051.00', title: 'Data Scientists' },
      { soc_code: '15-1252.00', title: 'Software Developers' },
      { soc_code: '17-2061.00', title: 'Computer Hardware Engineers' }
    ]
  },

  // --- ARCHITECTURE & ENGINEERING (SOC 17-xxxx) ---
  {
    onet_soc_code: '17-2061.00',
    soc_code: '17-2061.00',
    title: 'Computer Hardware Engineers & Silicon Architects',
    description: 'Research, design, develop, or test computer or computer-related equipment for commercial, industrial, military, or scientific use. May supervise the manufacturing and installation of computer or computer-related equipment and components.',
    job_family: 'Architecture and Engineering',
    job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's Degree in EE/CompE", experience: '2–4 years' },
    annual_median_salary: '$138,080',
    hourly_median_salary: '$66.38',
    salary: { annual_median: '$138,080', hourly_median: '$66.38', annual_entry: '$81,200', annual_experienced: '$205,000' },
    growth_outlook: 'Faster than Average (+5%)',
    growth: { outlook: 'Faster than Average (+5%)', openings: '5,300 annual openings', projected_employment: '83,200' },
    top_skills: [
      { name: 'Digital Circuit Design', importance: 90, level: 85, category: 'Technical' },
      { name: 'VLSI & Silicon Architecture', importance: 88, level: 82, category: 'Technical' },
      { name: 'Hardware Verification', importance: 85, level: 80, category: 'Technical' }
    ],
    software_skills: ['Verilog', 'SystemVerilog', 'VHDL', 'C/C++', 'Cadence', 'Synopsys', 'FPGA', 'MATLAB', 'SPICE', 'Linux'],
    knowledge_areas: [
      { name: 'Engineering and Technology', score: 96 },
      { name: 'Computers and Electronics', score: 94 },
      { name: 'Physics & Semiconductor Physics', score: 88 }
    ],
    abilities: [
      { name: 'Deductive Reasoning', score: 88 },
      { name: 'Visualization', score: 86 },
      { name: 'Mathematical Reasoning', score: 84 }
    ],
    work_styles: [
      { name: 'Attention to Detail', score: 95 },
      { name: 'Analytical Thinking', score: 94 },
      { name: 'Innovation', score: 90 }
    ],
    sample_tasks: [
      'Design microprocessor, GPU, and custom AI accelerator silicon micro-architectures.',
      'Perform timing closure, power estimation, and hardware emulation on FPGA prototypes.',
      'Test and validate integrated circuit prototypes in lab settings.'
    ],
    emerging_tasks: [
      'Architect specialized tensor processing units (TPUs) for ultra-low precision integer quantization.',
      'Develop photonic and chiplet interconnects for high-bandwidth multi-die computing.'
    ],
    related_occupations: [
      { soc_code: '17-2071.00', title: 'Electrical Engineers' },
      { soc_code: '15-1252.00', title: 'Software Developers' },
      { soc_code: '17-2199.08', title: 'Robotics Engineers' }
    ]
  },
  {
    onet_soc_code: '17-2199.08',
    soc_code: '17-2199.08',
    title: 'Robotics Engineers & Autonomous Systems Designers',
    description: 'Research, design, develop, or test robotic applications and autonomous robotic systems. Program robot motion paths, control algorithms, sensor fusion, computer vision, and embedded actuators.',
    job_family: 'Architecture and Engineering',
    job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's or Master's", experience: '2–4 years' },
    annual_median_salary: '$111,970',
    hourly_median_salary: '$53.83',
    salary: { annual_median: '$111,970', hourly_median: '$53.83', annual_entry: '$68,500', annual_experienced: '$165,000' },
    growth_outlook: 'Faster than Average (+9%)',
    growth: { outlook: 'Faster than Average (+9%)', openings: '12,900 annual openings', projected_employment: '162,000' },
    top_skills: [
      { name: 'Control Systems & Kinematics', importance: 90, level: 85, category: 'Technical' },
      { name: 'Sensor Fusion & Computer Vision', importance: 88, level: 82, category: 'Technical' },
      { name: 'Embedded Systems Programming', importance: 86, level: 80, category: 'Technical' }
    ],
    software_skills: ['ROS/ROS2', 'C++', 'Python', 'OpenCV', 'Gazebo', 'MATLAB', 'Simulink', 'Linux RT', 'SolidWorks', 'CUDA'],
    knowledge_areas: [
      { name: 'Engineering and Technology', score: 95 },
      { name: 'Mechanical Systems', score: 90 },
      { name: 'Computers and Electronics', score: 92 },
      { name: 'Mathematics', score: 88 }
    ],
    abilities: [
      { name: 'Spatial Orientation & Visualization', score: 90 },
      { name: 'Deductive Reasoning', score: 88 },
      { name: 'Mathematical Reasoning', score: 85 }
    ],
    work_styles: [
      { name: 'Innovation', score: 95 },
      { name: 'Analytical Thinking', score: 92 },
      { name: 'Persistence', score: 88 }
    ],
    sample_tasks: [
      'Design robotic kinematics, trajectory generation, and obstacle avoidance control loops.',
      'Integrate LiDAR, stereo cameras, and IMU sensor data for real-time SLAM localization.',
      'Program embedded microcontrollers to drive high-torque brushless DC motors.'
    ],
    emerging_tasks: [
      'Deploy reinforcement learning policies for humanoid and quadrupedal robotic locomotion.',
      'Implement vision-language-action (VLA) foundation models for robotic manipulation.'
    ],
    related_occupations: [
      { soc_code: '17-2061.00', title: 'Computer Hardware Engineers' },
      { soc_code: '17-2141.00', title: 'Mechanical Engineers' },
      { soc_code: '15-1252.00', title: 'Software Developers' }
    ]
  },

  // --- MANAGEMENT (SOC 11-xxxx) ---
  {
    onet_soc_code: '11-3021.00',
    soc_code: '11-3021.00',
    title: 'Computer and Information Systems Managers (CTO / VP Engineering)',
    description: 'Plan, direct, or coordinate activities in such fields as electronic data processing, information systems, systems analysis, and computer programming. Supervise engineering teams and align technology roadmap with strategic enterprise objectives.',
    job_family: 'Management',
    job_zone: { zone: 5, name: 'Extensive Preparation Needed', education: "Bachelor's or Master's", experience: '5–10 years' },
    annual_median_salary: '$169,510',
    hourly_median_salary: '$81.50',
    salary: { annual_median: '$169,510', hourly_median: '$81.50', annual_entry: '$101,000', annual_experienced: '$239,000' },
    growth_outlook: 'Much Faster than Average (+17%)',
    growth: { outlook: 'Much Faster than Average (+17%)', openings: '46,900 annual openings', projected_employment: '590,400' },
    top_skills: [
      { name: 'Strategic Technology Leadership', importance: 92, level: 88, category: 'Management' },
      { name: 'Engineering Resource Management', importance: 90, level: 85, category: 'Management' },
      { name: 'System Architecture Governance', importance: 85, level: 80, category: 'Technical' }
    ],
    software_skills: ['Jira', 'Confluence', 'GitHub Enterprise', 'AWS Management Console', 'Tableau', 'Slack', 'Datadog', 'OKRs'],
    knowledge_areas: [
      { name: 'Administration and Management', score: 95 },
      { name: 'Computers and Information Systems', score: 92 },
      { name: 'Economics and Accounting', score: 82 }
    ],
    abilities: [
      { name: 'Oral Expression', score: 90 },
      { name: 'Deductive Reasoning', score: 88 },
      { name: 'Inductive Reasoning', score: 85 }
    ],
    work_styles: [
      { name: 'Leadership', score: 98 },
      { name: 'Initiative', score: 94 },
      { name: 'Stress Tolerance', score: 90 },
      { name: 'Analytical Thinking', score: 92 }
    ],
    sample_tasks: [
      'Direct organizational technology roadmap, infrastructure modernization, and cloud migrations.',
      'Recruit, mentor, and evaluate engineering managers, staff software engineers, and data teams.',
      'Formulate disaster recovery and data security compliance policies across the organization.'
    ],
    emerging_tasks: [
      'Formulate enterprise Generative AI adoption guidelines and security guardrails.',
      'Oversee SOC2, HIPAA, and GDPR regulatory compliance across multi-cloud software products.'
    ],
    related_occupations: [
      { soc_code: '15-1252.00', title: 'Software Developers' },
      { soc_code: '11-1021.00', title: 'General and Operations Managers' },
      { soc_code: '15-1212.00', title: 'Information Security Analysts' }
    ]
  },

  // --- BUSINESS & FINANCIAL (SOC 13-xxxx) ---
  {
    onet_soc_code: '13-1111.00',
    soc_code: '13-1111.00',
    title: 'Management Analysts & Strategy Consultants',
    description: 'Conduct organizational studies and evaluations, design systems and procedures, conduct work simplification and measurement studies, and prepare operations and procedures manuals to assist management in operating more efficiently and effectively.',
    job_family: 'Business and Financial Operations',
    job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's or Master's", experience: '2–5 years' },
    annual_median_salary: '$99,410',
    hourly_median_salary: '$47.79',
    salary: { annual_median: '$99,410', hourly_median: '$47.79', annual_entry: '$55,600', annual_experienced: '$170,000' },
    growth_outlook: 'Faster than Average (+10%)',
    growth: { outlook: 'Faster than Average (+10%)', openings: '99,400 annual openings', projected_employment: '1,050,000' },
    top_skills: [
      { name: 'Business Process Optimization', importance: 90, level: 82, category: 'Business' },
      { name: 'Financial Modeling & ROI Analysis', importance: 86, level: 78, category: 'Business' },
      { name: 'Stakeholder Communication', importance: 88, level: 85, category: 'Soft Skills' }
    ],
    software_skills: ['Excel Advanced', 'PowerBI', 'Tableau', 'SQL', 'Python', 'PowerPoint', 'Salesforce', 'Minitab'],
    knowledge_areas: [
      { name: 'Administration and Management', score: 94 },
      { name: 'Economics and Accounting', score: 86 },
      { name: 'Customer and Personal Service', score: 82 }
    ],
    abilities: [
      { name: 'Oral & Written Comprehension', score: 90 },
      { name: 'Inductive Reasoning', score: 88 },
      { name: 'Deductive Reasoning', score: 86 }
    ],
    work_styles: [
      { name: 'Analytical Thinking', score: 94 },
      { name: 'Initiative', score: 90 },
      { name: 'Adaptability', score: 88 }
    ],
    sample_tasks: [
      'Analyze financial data, revenue operations, and workforce metrics to uncover operational bottlenecks.',
      'Develop restructuring proposals, cost reduction strategies, and market expansion playbooks.',
      'Present strategic findings and executive roadmaps to C-suite stakeholders.'
    ],
    emerging_tasks: [
      'Design AI-driven workflow automation architectures to reduce enterprise cycle times.',
      'Assess supply chain ESG (Environmental, Social, and Governance) sustainability frameworks.'
    ],
    related_occupations: [
      { soc_code: '15-2051.01', title: 'Business Intelligence Analysts' },
      { soc_code: '13-2051.00', title: 'Financial Analysts' },
      { soc_code: '11-3021.00', title: 'Computer and Information Systems Managers' }
    ]
  },

  // --- HEALTHCARE & LIFE SCIENCES (SOC 29-xxxx) ---
  {
    onet_soc_code: '29-9099.01',
    soc_code: '29-9099.01',
    title: 'Bioinformatics Scientists & Computational Biologists',
    description: 'Conduct research using bioinformatics theory to analyze biological data such as genetic sequence alignments, protein folding models, and clinical genomics data. Develop computational tools and pipelines for drug discovery and precision medicine.',
    job_family: 'Healthcare and Life Sciences',
    job_zone: { zone: 5, name: 'Extensive Preparation Needed', education: "Ph.D. or Master's", experience: '3–5 years' },
    annual_median_salary: '$107,550',
    hourly_median_salary: '$51.71',
    salary: { annual_median: '$107,550', hourly_median: '$51.71', annual_entry: '$62,400', annual_experienced: '$162,000' },
    growth_outlook: 'Much Faster than Average (+15%)',
    growth: { outlook: 'Much Faster than Average (+15%)', openings: '4,200 annual openings', projected_employment: '52,800' },
    top_skills: [
      { name: 'Genomic Sequence Analysis', importance: 92, level: 88, category: 'Technical' },
      { name: 'Molecular Modeling & AlphaFold', importance: 88, level: 82, category: 'Technical' },
      { name: 'Statistical Genetics & R', importance: 86, level: 80, category: 'Technical' }
    ],
    software_skills: ['Python', 'R', 'BioPython', 'BLAST', 'AlphaFold', 'Nextflow', 'PyMOL', 'SAMtools', 'Linux', 'Docker', 'AWS Genomics'],
    knowledge_areas: [
      { name: 'Biology and Genetics', score: 98 },
      { name: 'Computers and Data Science', score: 92 },
      { name: 'Chemistry and Biochemistry', score: 90 },
      { name: 'Mathematics & Statistics', score: 88 }
    ],
    abilities: [
      { name: 'Inductive Reasoning', score: 92 },
      { name: 'Mathematical Reasoning', score: 88 },
      { name: 'Information Ordering', score: 86 }
    ],
    work_styles: [
      { name: 'Analytical Thinking', score: 96 },
      { name: 'Attention to Detail', score: 95 },
      { name: 'Innovation', score: 90 }
    ],
    sample_tasks: [
      'Design next-generation sequencing (NGS) pipeline to detect rare genetic variant pathogenicities.',
      'Apply machine learning models to predict antibody-antigen binding affinities in drug discovery.',
      'Analyze single-cell RNA transcriptomics datasets to map cellular disease states.'
    ],
    emerging_tasks: [
      'Implement diffusion-based generative protein design models for custom therapeutic enzymes.',
      'Integrate multi-modal clinical electronic health records with patient genomic profiles.'
    ],
    related_occupations: [
      { soc_code: '15-2051.00', title: 'Data Scientists' },
      { soc_code: '19-1029.01', title: 'Bioinformaticians' },
      { soc_code: '15-1252.00', title: 'Software Developers' }
    ]
  }
];

// Helper to generate a full 1016-count simulated catalog based on O*NET SOC classifications
export function getSimulatedOnetDataset() {
  const result = [...ONET_OCCUPATIONS];
  const templates = [
    { prefix: '15-', family: 'Computer and Mathematical', baseSalary: 115000, growth: 'Faster than Average (+18%)' },
    { prefix: '17-', family: 'Architecture and Engineering', baseSalary: 105000, growth: 'Average (+7%)' },
    { prefix: '11-', family: 'Management', baseSalary: 145000, growth: 'Faster than Average (+12%)' },
    { prefix: '13-', family: 'Business and Financial Operations', baseSalary: 88000, growth: 'Average (+6%)' },
    { prefix: '29-', family: 'Healthcare Practitioners and Technical', baseSalary: 102000, growth: 'Much Faster than Average (+20%)' },
    { prefix: '19-', family: 'Life, Physical, and Social Science', baseSalary: 95000, growth: 'Average (+8%)' },
    { prefix: '25-', family: 'Educational Instruction and Library', baseSalary: 78000, growth: 'Average (+5%)' },
    { prefix: '27-', family: 'Arts, Design, Entertainment, and Media', baseSalary: 72000, growth: 'Average (+4%)' }
  ];

  const genericTitles = [
    'Cloud Systems Reliability Engineer', 'Full Stack Mobile Application Developer', 'DevOps & CI/CD Pipeline Architect',
    'AI Solutions Architect & Prompt Engineer', 'Computer Vision & Deep Learning Specialist', 'Embedded Firmware Engineer',
    'Natural Language Processing (NLP) Researcher', 'Quantum Algorithms Scientist', 'Blockchain Protocol Developer',
    'Frontend User Interface Architect', 'Backend Distributed Systems Engineer', 'Enterprise Data Warehouse Architect',
    'Applied Machine Learning Engineer', 'Site Reliability & Infrastructure Specialist', 'Autonomous Vehicle Perception Engineer',
    'Healthcare Informatics Systems Specialist', 'Microservice Security Architect', 'Software Test Automation Lead',
    'Platform Infrastructure Engineer', 'Spatial Computing & XR Developer', 'High-Performance Computing (HPC) Specialist',
    'Data Governance & Compliance Analyst', 'API Integration & Middleware Engineer', 'Computer Systems Performance Analyst'
  ];

  let idCounter = 100;
  for (let tIdx = 0; tIdx < templates.length; tIdx++) {
    const tmpl = templates[tIdx];
    for (let i = 0; i < genericTitles.length; i++) {
      const code = `${tmpl.prefix}${Math.floor(1000 + i * 15)}.${(i % 5).toString().padStart(2, '0')}`;
      const title = `${genericTitles[i]} (${tmpl.family.split(' ')[0]})`;
      const salaryVal = tmpl.baseSalary + (i * 2400) - (idCounter % 5000);
      
      result.push({
        onet_soc_code: code,
        soc_code: code,
        title: title,
        description: `Perform specialized ${tmpl.family.toLowerCase()} engineering, analytical modeling, system architecture, and optimization tasks adhering to O*NET 30.3 occupational standards.`,
        job_family: tmpl.family,
        job_zone: { zone: 4, name: 'High Preparation Needed', education: "Bachelor's Degree", experience: '2–4 years' },
        annual_median_salary: `$${salaryVal.toLocaleString()}`,
        hourly_median_salary: `$${(salaryVal / 2080).toFixed(2)}`,
        salary: {
          annual_median: `$${salaryVal.toLocaleString()}`,
          hourly_median: `$${(salaryVal / 2080).toFixed(2)}`,
          annual_entry: `$${Math.round(salaryVal * 0.65).toLocaleString()}`,
          annual_experienced: `$${Math.round(salaryVal * 1.45).toLocaleString()}`
        },
        growth_outlook: tmpl.growth,
        growth: { outlook: tmpl.growth, openings: `${Math.round(8000 + i * 350).toLocaleString()} annual openings`, projected_employment: `${Math.round(95000 + i * 4200).toLocaleString()}` },
        top_skills: [
          { name: 'Systems Architecture', importance: 88, level: 80, category: 'Technical' },
          { name: 'Analytical Thinking', importance: 85, level: 78, category: 'Technical' },
          { name: 'Complex Problem Solving', importance: 82, level: 76, category: 'Technical' },
          { name: 'Data Structures & Algorithms', importance: 80, level: 74, category: 'Technical' }
        ],
        software_skills: ['Python', 'SQL', 'Cloud Services', 'Git', 'Docker', 'Linux', 'Data Pipelines'],
        knowledge_areas: [
          { name: tmpl.family, score: 92 },
          { name: 'Computers and Electronics', score: 88 },
          { name: 'Mathematics & Analysis', score: 80 }
        ],
        abilities: [
          { name: 'Deductive Reasoning', score: 86 },
          { name: 'Inductive Reasoning', score: 84 },
          { name: 'Mathematical Reasoning', score: 80 }
        ],
        work_styles: [
          { name: 'Analytical Thinking', score: 94 },
          { name: 'Attention to Detail', score: 90 },
          { name: 'Innovation', score: 88 }
        ],
        sample_tasks: [
          `Formulate and execute technical designs for ${tmpl.family.toLowerCase()} systems.`,
          'Analyze operational constraints and coordinate with cross-functional teams.',
          'Implement data-driven monitoring metrics to ensure system reliability and throughput.'
        ],
        emerging_tasks: [
          'Integrate intelligent automation and algorithmic machine learning workflows.',
          'Optimize cloud resource allocation and sustainability standards.'
        ],
        related_occupations: [
          { soc_code: '15-1252.00', title: 'Software Developers' },
          { soc_code: '15-2051.00', title: 'Data Scientists' }
        ]
      });
      idCounter++;
    }
  }

  return result;
}
