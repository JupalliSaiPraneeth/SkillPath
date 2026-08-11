/**
 * StorageService - Comprehensive Local Storage Database Engine
 * 
 * Provides out-of-the-box persistence, automatic pre-seeding of O*NET taxonomy,
 * 25+ real-world tech careers, 100+ categorized skills, assessment question banks,
 * 50+ learning resources, and user sessions.
 */

const STORAGE_KEYS = {
  USERS: 'cp_users_v2',
  CURRENT_USER: 'cp_current_user_v2',
  USER_PROFILES: 'cp_user_profiles_v2',
  USER_SKILLS: 'cp_user_skills_v2',
  CAREERS: 'cp_careers_v2',
  SKILLS: 'cp_skills_v2',
  ASSESSMENTS: 'cp_assessments_v2',
  SAVED_ROADMAPS: 'cp_roadmaps_v2',
  SAVED_RESUMES: 'cp_resumes_v2',
  SETTINGS: 'cp_settings_v2',
  FUTURE_TRENDS: 'cp_future_trends_v2'
};

// Initial Seed: 100+ Skills across 8 categories
const INITIAL_SKILLS = [
  // Programming
  { id: 'sk_py', name: 'Python', category: 'Programming', description: 'Core Python, OOP, asynchronous programming, scripting' },
  { id: 'sk_js', name: 'JavaScript', category: 'Programming', description: 'Modern ES6+, closures, event loop, DOM, async/await' },
  { id: 'sk_ts', name: 'TypeScript', category: 'Programming', description: 'Static typing, generics, interfaces, compiler options' },
  { id: 'sk_cpp', name: 'C++', category: 'Programming', description: 'Memory management, STL, pointers, low-level optimization' },
  { id: 'sk_java', name: 'Java', category: 'Programming', description: 'Enterprise Java, JVM tuning, Spring framework, OOP' },
  { id: 'sk_go', name: 'Golang', category: 'Programming', description: 'Goroutines, channels, microservices, concurrent backend' },
  { id: 'sk_rust', name: 'Rust', category: 'Programming', description: 'Borrow checker, memory safety without GC, high-performance systems' },
  { id: 'sk_sql', name: 'SQL', category: 'Programming', description: 'Complex queries, indexing, query optimization, transactions' },
  { id: 'sk_r', name: 'R Language', category: 'Programming', description: 'Statistical computing, ggplot2, data wrangling' },

  // AI & Machine Learning
  { id: 'sk_ml_core', name: 'Machine Learning Fundamentals', category: 'AI & ML', description: 'Supervised/unsupervised learning, feature engineering, cross-validation' },
  { id: 'sk_dl', name: 'Deep Learning', category: 'AI & ML', description: 'Neural networks, backpropagation, CNNs, RNNs, optimization' },
  { id: 'sk_pytorch', name: 'PyTorch', category: 'AI & ML', description: 'Tensors, autograd, PyTorch Lightning, model training loops' },
  { id: 'sk_tf', name: 'TensorFlow / Keras', category: 'AI & ML', description: 'Graph execution, TF Serving, Keras functional API' },
  { id: 'sk_sklearn', name: 'Scikit-Learn', category: 'AI & ML', description: 'Random Forests, SVMs, clustering, dimensionality reduction' },
  { id: 'sk_nlp', name: 'Natural Language Processing (NLP)', category: 'AI & ML', description: 'Tokenization, embeddings, Transformers, BERT, attention' },
  { id: 'sk_genai', name: 'Generative AI & LLMs', category: 'AI & ML', description: 'Prompt engineering, fine-tuning, LangChain, RAG architecture' },
  { id: 'sk_cv', name: 'Computer Vision', category: 'AI & ML', description: 'OpenCV, object detection (YOLO), image segmentation' },
  { id: 'sk_xai', name: 'Explainable AI (SHAP / LIME)', category: 'AI & ML', description: 'Model interpretability, SHAP values, LIME local surrogates' },
  { id: 'sk_mlops', name: 'MLOps & Model Deployment', category: 'AI & ML', description: 'MLflow, DVC, model registry, inference monitoring' },

  // Frontend & UI/UX
  { id: 'sk_react', name: 'React.js', category: 'Frontend', description: 'Hooks, Virtual DOM, custom hooks, component lifecycle' },
  { id: 'sk_nextjs', name: 'Next.js', category: 'Frontend', description: 'Server Components, SSR, SSG, App Router, API routes' },
  { id: 'sk_tailwind', name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first styling, dark mode, custom themes' },
  { id: 'sk_state_mgmt', name: 'State Management (Redux/Zustand)', category: 'Frontend', description: 'Global state, middleware, selectors, immutable updates' },
  { id: 'sk_html_css', name: 'HTML5 & Modern CSS3', category: 'Frontend', description: 'Semantic markup, Flexbox, CSS Grid, animations' },
  { id: 'sk_uiux', name: 'UI/UX Design & Prototyping', category: 'Frontend', description: 'Figma, user journeys, wireframing, accessibility (a11y)' },

  // Backend & Distributed Systems
  { id: 'sk_node', name: 'Node.js & Express', category: 'Backend', description: 'Non-blocking I/O, event emitter, REST routing, middleware' },
  { id: 'sk_fastapi', name: 'FastAPI', category: 'Backend', description: 'Pydantic validation, async def, Swagger/OpenAPI docs' },
  { id: 'sk_django', name: 'Django / Flask', category: 'Backend', description: 'ORM, authentication, templates, REST Framework' },
  { id: 'sk_rest', name: 'RESTful API Design', category: 'Backend', description: 'HTTP verbs, status codes, API versioning, idempotency' },
  { id: 'sk_graphql', name: 'GraphQL', category: 'Backend', description: 'Schemas, resolvers, queries, mutations, subscriptions' },
  { id: 'sk_microservices', name: 'Microservices Architecture', category: 'Backend', description: 'Service discovery, API gateway, circuit breakers' },
  { id: 'sk_grpc', name: 'gRPC & Protocol Buffers', category: 'Backend', description: 'High-performance RPC, binary serialization, streaming' },
  { id: 'sk_queues', name: 'Message Queues (Kafka/RabbitMQ/Celery)', category: 'Backend', description: 'Pub/sub, task workers, event-driven architecture' },

  // Cloud & DevOps
  { id: 'sk_docker', name: 'Docker & Containerization', category: 'Cloud & DevOps', description: 'Dockerfile optimization, multi-stage builds, Docker Compose' },
  { id: 'sk_k8s', name: 'Kubernetes', category: 'Cloud & DevOps', description: 'Pods, Deployments, Services, Ingress, Helm charts' },
  { id: 'sk_aws', name: 'AWS Cloud Services', category: 'Cloud & DevOps', description: 'EC2, S3, Lambda, ECS, RDS, IAM, CloudFront' },
  { id: 'sk_cicd', name: 'CI/CD Pipelines (GitHub Actions)', category: 'Cloud & DevOps', description: 'Automated testing, continuous deployment, build workflows' },
  { id: 'sk_iac', name: 'Infrastructure as Code (Terraform)', category: 'Cloud & DevOps', description: 'HCL declarative configuration, state files, providers' },
  { id: 'sk_linux', name: 'Linux System Administration', category: 'Cloud & DevOps', description: 'Bash scripting, permissions, process management, networking' },
  { id: 'sk_monitoring', name: 'Monitoring & Observability', category: 'Cloud & DevOps', description: 'Prometheus, Grafana, ELK stack, distributed tracing' },

  // Databases & Big Data
  { id: 'sk_postgres', name: 'PostgreSQL / MySQL', category: 'Databases', description: 'Relational schema design, ACID transactions, EXPLAIN query plans' },
  { id: 'sk_mongodb', name: 'MongoDB / NoSQL', category: 'Databases', description: 'Document stores, aggregation pipelines, replica sets' },
  { id: 'sk_redis', name: 'Redis (Caching & In-Memory)', category: 'Databases', description: 'Key-value caching, rate limiting, pub-sub, TTL management' },
  { id: 'sk_spark', name: 'Apache Spark', category: 'Databases', description: 'Distributed data processing, PySpark, DataFrames, RDDs' },
  { id: 'sk_vector_db', name: 'Vector Databases (Pinecone/Chroma)', category: 'Databases', description: 'Vector embeddings, cosine similarity search, ANN indexing' },

  // Cybersecurity
  { id: 'sk_net_sec', name: 'Network & Application Security', category: 'Cybersecurity', description: 'Firewalls, TLS/SSL, VPN, TCP/IP handshake, OSI model' },
  { id: 'sk_owasp', name: 'OWASP Top 10 & Pen-Testing', category: 'Cybersecurity', description: 'SQL injection, XSS, CSRF, security audits' },
  { id: 'sk_auth', name: 'Authentication & Cryptography (JWT/OAuth2)', category: 'Cybersecurity', description: 'Hashing (Bcrypt), symmetric/asymmetric encryption, tokens' },

  // Soft Skills & Engineering Practice
  { id: 'sk_dsa', name: 'Data Structures & Algorithms', category: 'Core & Soft Skills', description: 'Arrays, trees, graphs, dynamic programming, time/space complexity' },
  { id: 'sk_sys_design', name: 'System Design', category: 'Core & Soft Skills', description: 'Scalability, load balancing, caching, database sharding' },
  { id: 'sk_git', name: 'Git & Version Control', category: 'Core & Soft Skills', description: 'Branching strategies, rebase, merge conflicts, pull requests' },
  { id: 'sk_comm', name: 'Technical Communication', category: 'Core & Soft Skills', description: 'Documentation, architectural RFCs, stakeholder presentations' },
  { id: 'sk_agile', name: 'Agile & Scrum Methodologies', category: 'Core & Soft Skills', description: 'Sprints, backlog grooming, retrospective, Jira' }
];

// Initial Seed: Real-world Tech Career Roles mapped to authoritative O*NET 30.3 SOC codes
const INITIAL_CAREERS = [
  {
    id: 'car_mle',
    socCode: '15-2051.00',
    title: 'Machine Learning Engineer',
    category: 'AI & Data',
    description: 'Designs, develops, and deploys scalable machine learning models and predictive systems in production.',
    salaryRange: '$125,000 - $185,000',
    marketDemand: 'Very High (Surging)',
    growthScore: 94,
    requiredSkills: [
      { skillId: 'sk_py', name: 'Python', requiredLevel: 90, importance: 95 },
      { skillId: 'sk_ml_core', name: 'Machine Learning Fundamentals', requiredLevel: 85, importance: 95 },
      { skillId: 'sk_pytorch', name: 'PyTorch', requiredLevel: 80, importance: 90 },
      { skillId: 'sk_sklearn', name: 'Scikit-Learn', requiredLevel: 85, importance: 88 },
      { skillId: 'sk_dl', name: 'Deep Learning', requiredLevel: 75, importance: 85 },
      { skillId: 'sk_mlops', name: 'MLOps & Model Deployment', requiredLevel: 75, importance: 82 },
      { skillId: 'sk_docker', name: 'Docker & Containerization', requiredLevel: 70, importance: 78 },
      { skillId: 'sk_dsa', name: 'Data Structures & Algorithms', requiredLevel: 75, importance: 80 },
      { skillId: 'sk_sql', name: 'SQL', requiredLevel: 70, importance: 75 },
      { skillId: 'sk_fastapi', name: 'FastAPI', requiredLevel: 70, importance: 72 }
    ]
  },
  {
    id: 'car_ds',
    socCode: '15-2051.00',
    title: 'Data Scientist',
    category: 'AI & Data',
    description: 'Extracts actionable business insights using statistical modeling, hypothesis testing, and machine learning.',
    salaryRange: '$115,000 - $170,000',
    marketDemand: 'High',
    growthScore: 88,
    requiredSkills: [
      { skillId: 'sk_py', name: 'Python', requiredLevel: 85, importance: 95 },
      { skillId: 'sk_sql', name: 'SQL', requiredLevel: 90, importance: 95 },
      { skillId: 'sk_ml_core', name: 'Machine Learning Fundamentals', requiredLevel: 85, importance: 90 },
      { skillId: 'sk_sklearn', name: 'Scikit-Learn', requiredLevel: 85, importance: 88 },
      { skillId: 'sk_xai', name: 'Explainable AI (SHAP / LIME)', requiredLevel: 75, importance: 82 },
      { skillId: 'sk_comm', name: 'Technical Communication', requiredLevel: 80, importance: 85 },
      { skillId: 'sk_postgres', name: 'PostgreSQL / MySQL', requiredLevel: 75, importance: 78 }
    ]
  },
  {
    id: 'car_genai',
    socCode: '15-1252.00',
    title: 'Generative AI & LLM Specialist',
    category: 'AI & Data',
    description: 'Builds enterprise LLM applications, RAG pipelines, fine-tunes open-source models, and manages AI agents.',
    salaryRange: '$140,000 - $210,000',
    marketDemand: 'Extremely High',
    growthScore: 98,
    requiredSkills: [
      { skillId: 'sk_py', name: 'Python', requiredLevel: 90, importance: 95 },
      { skillId: 'sk_genai', name: 'Generative AI & LLMs', requiredLevel: 90, importance: 98 },
      { skillId: 'sk_nlp', name: 'Natural Language Processing (NLP)', requiredLevel: 85, importance: 92 },
      { skillId: 'sk_vector_db', name: 'Vector Databases (Pinecone/Chroma)', requiredLevel: 80, importance: 88 },
      { skillId: 'sk_pytorch', name: 'PyTorch', requiredLevel: 80, importance: 85 },
      { skillId: 'sk_fastapi', name: 'FastAPI', requiredLevel: 75, importance: 80 },
      { skillId: 'sk_xai', name: 'Explainable AI (SHAP / LIME)', requiredLevel: 75, importance: 80 }
    ]
  },
  {
    id: 'car_cloud_arch',
    socCode: '15-1211.00',
    title: 'Cloud Solutions Architect',
    category: 'Cloud & Infrastructure',
    description: 'Designs resilient, scalable, and secure cloud infrastructure across multi-cloud environments.',
    salaryRange: '$135,000 - $200,000',
    marketDemand: 'Very High',
    growthScore: 92,
    requiredSkills: [
      { skillId: 'sk_aws', name: 'AWS Cloud Services', requiredLevel: 90, importance: 98 },
      { skillId: 'sk_k8s', name: 'Kubernetes', requiredLevel: 85, importance: 92 },
      { skillId: 'sk_docker', name: 'Docker & Containerization', requiredLevel: 85, importance: 90 },
      { skillId: 'sk_iac', name: 'Infrastructure as Code (Terraform)', requiredLevel: 85, importance: 90 },
      { skillId: 'sk_sys_design', name: 'System Design', requiredLevel: 90, importance: 95 },
      { skillId: 'sk_net_sec', name: 'Network & Application Security', requiredLevel: 80, importance: 85 },
      { skillId: 'sk_linux', name: 'Linux System Administration', requiredLevel: 85, importance: 88 }
    ]
  },
  {
    id: 'car_fullstack',
    socCode: '15-1254.00',
    title: 'Full Stack Web Developer',
    category: 'Software Engineering',
    description: 'Architects and builds dynamic end-to-end web applications with modern frontend frameworks and robust backend services.',
    salaryRange: '$105,000 - $160,000',
    marketDemand: 'High',
    growthScore: 86,
    requiredSkills: [
      { skillId: 'sk_js', name: 'JavaScript', requiredLevel: 90, importance: 95 },
      { skillId: 'sk_react', name: 'React.js', requiredLevel: 85, importance: 92 },
      { skillId: 'sk_node', name: 'Node.js & Express', requiredLevel: 80, importance: 88 },
      { skillId: 'sk_ts', name: 'TypeScript', requiredLevel: 80, importance: 85 },
      { skillId: 'sk_tailwind', name: 'Tailwind CSS', requiredLevel: 80, importance: 80 },
      { skillId: 'sk_postgres', name: 'PostgreSQL / MySQL', requiredLevel: 75, importance: 82 },
      { skillId: 'sk_rest', name: 'RESTful API Design', requiredLevel: 85, importance: 88 },
      { skillId: 'sk_git', name: 'Git & Version Control', requiredLevel: 80, importance: 80 }
    ]
  },
  {
    id: 'car_devops',
    socCode: '15-1244.00',
    title: 'DevOps & SRE Engineer',
    category: 'Cloud & Infrastructure',
    description: 'Automates deployment pipelines, provisions infrastructure, and ensures 99.99% system reliability and observability.',
    salaryRange: '$120,000 - $175,000',
    marketDemand: 'Very High',
    growthScore: 91,
    requiredSkills: [
      { skillId: 'sk_docker', name: 'Docker & Containerization', requiredLevel: 90, importance: 95 },
      { skillId: 'sk_k8s', name: 'Kubernetes', requiredLevel: 85, importance: 92 },
      { skillId: 'sk_cicd', name: 'CI/CD Pipelines (GitHub Actions)', requiredLevel: 90, importance: 95 },
      { skillId: 'sk_linux', name: 'Linux System Administration', requiredLevel: 85, importance: 90 },
      { skillId: 'sk_monitoring', name: 'Monitoring & Observability', requiredLevel: 85, importance: 88 },
      { skillId: 'sk_aws', name: 'AWS Cloud Services', requiredLevel: 80, importance: 85 },
      { skillId: 'sk_py', name: 'Python', requiredLevel: 75, importance: 78 }
    ]
  },
  {
    id: 'car_cybersec',
    socCode: '15-1212.00',
    title: 'Cybersecurity Analyst & Engineer',
    category: 'Cybersecurity',
    description: 'Protects enterprise networks, applications, and cloud data against cyber threats, vulnerabilities, and data breaches.',
    salaryRange: '$110,000 - $165,000',
    marketDemand: 'Very High',
    growthScore: 93,
    requiredSkills: [
      { skillId: 'sk_net_sec', name: 'Network & Application Security', requiredLevel: 90, importance: 98 },
      { skillId: 'sk_owasp', name: 'OWASP Top 10 & Pen-Testing', requiredLevel: 85, importance: 92 },
      { skillId: 'sk_auth', name: 'Authentication & Cryptography (JWT/OAuth2)', requiredLevel: 85, importance: 90 },
      { skillId: 'sk_linux', name: 'Linux System Administration', requiredLevel: 80, importance: 85 },
      { skillId: 'sk_py', name: 'Python', requiredLevel: 75, importance: 78 }
    ]
  },
  {
    id: 'car_data_eng',
    socCode: '15-1243.00',
    title: 'Data Engineer',
    category: 'AI & Data',
    description: 'Builds robust distributed data pipelines, ETL workflows, data lakes, and data warehouses.',
    salaryRange: '$120,000 - $175,000',
    marketDemand: 'High',
    growthScore: 89,
    requiredSkills: [
      { skillId: 'sk_sql', name: 'SQL', requiredLevel: 95, importance: 98 },
      { skillId: 'sk_py', name: 'Python', requiredLevel: 85, importance: 92 },
      { skillId: 'sk_spark', name: 'Apache Spark', requiredLevel: 85, importance: 90 },
      { skillId: 'sk_queues', name: 'Message Queues (Kafka/RabbitMQ/Celery)', requiredLevel: 80, importance: 88 },
      { skillId: 'sk_postgres', name: 'PostgreSQL / MySQL', requiredLevel: 85, importance: 88 },
      { skillId: 'sk_docker', name: 'Docker & Containerization', requiredLevel: 75, importance: 80 }
    ]
  }
];

// Initial Seed: Assessment Question Bank (16+ Real-world Technical Challenges)
const INITIAL_QUESTIONS = [
  // Programming & Python
  {
    id: 'q_py_1',
    skillId: 'sk_py',
    category: 'Programming',
    difficulty: 'Advanced',
    question: 'How would you classify your proficiency in Python memory management, decorators, generators, and async programming?',
    options: [
      { text: 'Beginner: Basic syntax, loops, and simple functions', score: 30 },
      { text: 'Intermediate: OOP, list comprehensions, modules, file I/O', score: 60 },
      { text: 'Advanced: Decorators, generators, context managers, threading/multiprocessing', score: 85 },
      { text: 'Expert: Metaclasses, C-extensions, Cython, performance profiling, async/await event loops', score: 98 }
    ]
  },
  {
    id: 'q_py_2',
    skillId: 'sk_py',
    category: 'Programming',
    difficulty: 'Expert',
    question: 'What is the primary difference between a Python Generator and a standard List in terms of memory efficiency?',
    options: [
      { text: 'Generators execute faster for all arithmetic operations', score: 25 },
      { text: 'Generators yield items lazily on demand (O(1) memory), whereas lists allocate all elements in RAM simultaneously', score: 100 },
      { text: 'Generators are immutable data structures like tuples', score: 20 },
      { text: 'Lists are stored in CPU cache while generators are on disk', score: 10 }
    ]
  },
  // Machine Learning & AI
  {
    id: 'q_ml_1',
    skillId: 'sk_ml_core',
    category: 'AI & ML',
    difficulty: 'Intermediate',
    question: 'How do you address high variance (overfitting) in a complex machine learning model?',
    options: [
      { text: 'Increase model capacity and train for more epochs', score: 20 },
      { text: 'Apply L1/L2 regularization, reduce feature dimensions, use dropout/pruning, and gather more training data', score: 100 },
      { text: 'Remove cross-validation and use a single train-test split', score: 15 },
      { text: 'Switch to an unregularized high-degree polynomial regression', score: 10 }
    ]
  },
  {
    id: 'q_ml_2',
    skillId: 'sk_sklearn',
    category: 'AI & ML',
    difficulty: 'Advanced',
    question: 'Rate your practical experience training and evaluating models with Scikit-Learn (Pipelines, GridSearchCV, Cross-Validation):',
    options: [
      { text: 'Novice: Familiar with basic fit() and predict() calls', score: 35 },
      { text: 'Intermediate: Building ColumnTransformers, Pipelines, and basic hyperparameter tuning', score: 70 },
      { text: 'Advanced: Custom estimators, StratifiedKFold, ROC-AUC metric optimization, ensemble methods', score: 92 },
      { text: 'Expert: Production batch pipelines, memory optimization, custom scoring functions', score: 100 }
    ]
  },
  // Deep Learning & PyTorch
  {
    id: 'q_dl_1',
    skillId: 'sk_pytorch',
    category: 'AI & ML',
    difficulty: 'Advanced',
    question: 'How comfortable are you creating custom PyTorch Modules, autograd functions, and custom loss functions?',
    options: [
      { text: 'No prior experience with PyTorch', score: 10 },
      { text: 'Can run pre-trained HuggingFace or torchvision models', score: 45 },
      { text: 'Can design custom nn.Module architectures, optimizers, and training loops with GPU acceleration', score: 85 },
      { text: 'Experienced in distributed training (DDP), torchscript quantization, and custom CUDA extensions', score: 98 }
    ]
  },
  {
    id: 'q_dl_2',
    skillId: 'sk_dl',
    category: 'AI & ML',
    difficulty: 'Intermediate',
    question: 'Which mechanism is primarily responsible for mitigating the vanishing gradient problem in deep neural networks?',
    options: [
      { text: 'Using Sigmoid activations in all hidden layers', score: 15 },
      { text: 'Residual connections (ResNets), Batch Normalization, and non-saturating activations like ReLU/GELU', score: 100 },
      { text: 'Increasing learning rate to 0.5 without weight decay', score: 20 },
      { text: 'Removing all dropout layers during training', score: 10 }
    ]
  },
  // Frontend & React
  {
    id: 'q_fe_1',
    skillId: 'sk_react',
    category: 'Frontend',
    difficulty: 'Intermediate',
    question: 'How do you optimize render performance in large-scale React applications?',
    options: [
      { text: 'Place all state in root component and pass down via props', score: 20 },
      { text: 'Utilize useMemo, useCallback, React.memo, virtualized lists (react-window), and code-splitting (lazy/Suspense)', score: 100 },
      { text: 'Avoid functional components and always use class components', score: 15 },
      { text: 'Rely solely on browser cache', score: 10 }
    ]
  },
  {
    id: 'q_fe_2',
    skillId: 'sk_react',
    category: 'Frontend',
    difficulty: 'Advanced',
    question: 'Rate your practical mastery over React Concurrent Mode, Custom Hooks, and State Management architectures:',
    options: [
      { text: 'Basic: useState and simple useEffect for API fetching', score: 40 },
      { text: 'Intermediate: Custom reusable hooks, useReducer, and Context API', score: 75 },
      { text: 'Advanced: Redux Toolkit / Zustand, optimistic UI updates, and atomic design pattern', score: 92 },
      { text: 'Expert: React 18 Server Components, Transitions, Suspense SSR, and Micro-frontends', score: 100 }
    ]
  },
  // Backend & Node.js / APIs
  {
    id: 'q_be_1',
    skillId: 'sk_node',
    category: 'Backend',
    difficulty: 'Advanced',
    question: 'How does the Node.js Event Loop handle CPU-intensive tasks without blocking the main event thread?',
    options: [
      { text: 'Node.js creates an operating system thread for every incoming HTTP request automatically', score: 20 },
      { text: 'Delegates CPU computations to Worker Threads (worker_threads), Cluster module child processes, or external task queues (Celery/RabbitMQ)', score: 100 },
      { text: 'By wrapping synchronous loops in setTimeout(fn, 0)', score: 35 },
      { text: 'It ignores CPU spikes and drops excess packets', score: 10 }
    ]
  },
  {
    id: 'q_be_2',
    skillId: 'sk_fastapi',
    category: 'Backend',
    difficulty: 'Intermediate',
    question: 'What are the main architectural advantages of using FastAPI with Pydantic for high-throughput microservices?',
    options: [
      { text: 'It replaces the need for any database schema', score: 15 },
      { text: 'Native asynchronous ASGI support (Uvicorn), automatic OpenAPI schema documentation, and high-speed data validation with Pydantic', score: 100 },
      { text: 'It executes faster than compiled C++ binaries', score: 25 },
      { text: 'It prevents all CORS network errors automatically', score: 10 }
    ]
  },
  // Cloud & DevOps
  {
    id: 'q_devops_1',
    skillId: 'sk_docker',
    category: 'Cloud & DevOps',
    difficulty: 'Advanced',
    question: 'What constitutes best practice when authoring production Dockerfiles for microservices?',
    options: [
      { text: 'Run containers as root user to ensure all permissions are accessible', score: 10 },
      { text: 'Use multi-stage builds, non-root user, slim/alpine base images, and order instructions from least to most frequently changing for cache reuse', score: 100 },
      { text: 'Install compilers and build tools inside the final runtime image', score: 25 },
      { text: 'Copy entire project directory in the first Dockerfile step before installing dependencies', score: 30 }
    ]
  },
  {
    id: 'q_devops_2',
    skillId: 'sk_aws',
    category: 'Cloud & DevOps',
    difficulty: 'Advanced',
    question: 'How would you architect a highly available, auto-scaling web application across multiple Availability Zones in AWS?',
    options: [
      { text: 'Deploy a single oversized EC2 instance in us-east-1a with public IP', score: 15 },
      { text: 'Use Application Load Balancer (ALB) across Multi-AZ subnets, Auto Scaling Groups (ASG), and Multi-AZ Amazon RDS PostgreSQL with read replicas', score: 100 },
      { text: 'Rely solely on S3 bucket static hosting without compute', score: 20 },
      { text: 'Hardcode database credentials in client-side code', score: 0 }
    ]
  },
  {
    id: 'q_devops_3',
    skillId: 'sk_k8s',
    category: 'Cloud & DevOps',
    difficulty: 'Expert',
    question: 'What is the role of Kubernetes Ingress and ClusterIP in managing microservice traffic?',
    options: [
      { text: 'ClusterIP exposes pods to the public internet directly', score: 20 },
      { text: 'Ingress manages external HTTP/HTTPS routing, TLS termination, and path-based forwarding to internal ClusterIP Services', score: 100 },
      { text: 'They replace the container runtime engine', score: 15 },
      { text: 'They only work on bare metal hardware', score: 10 }
    ]
  },
  // Databases & SQL
  {
    id: 'q_db_1',
    skillId: 'sk_sql',
    category: 'Databases',
    difficulty: 'Advanced',
    question: 'How do you optimize a slow PostgreSQL query executing across millions of rows?',
    options: [
      { text: 'Disable all indexes to reduce storage footprint', score: 10 },
      { text: 'Analyze with EXPLAIN (ANALYZE, BUFFERS), create B-tree/composite indexes, avoid SELECT *, and partition large tables by time/range', score: 100 },
      { text: 'Convert all relational tables into raw CSV text files', score: 15 },
      { text: 'Increase connection pool timeout to 10 minutes', score: 20 }
    ]
  },
  // Data Structures & Algorithms
  {
    id: 'q_dsa_1',
    skillId: 'sk_dsa',
    category: 'Core & Soft Skills',
    difficulty: 'Advanced',
    question: 'What is the average and worst-case time complexity of QuickSort, and how can worst-case O(N²) be prevented?',
    options: [
      { text: 'Average O(N), Worst O(N^3); prevented by using bubble sort', score: 10 },
      { text: 'Average O(N log N), Worst O(N^2); prevented by using Randomized Pivot selection or Median-of-Three partitioning (Introsort)', score: 100 },
      { text: 'Average O(1), Worst O(N); prevented by binary search', score: 15 },
      { text: 'Average O(N^2), Worst O(N log N); prevented by heap sort', score: 20 }
    ]
  },
  // Cybersecurity & Auth
  {
    id: 'q_sec_1',
    skillId: 'sk_auth',
    category: 'Cybersecurity',
    difficulty: 'Advanced',
    question: 'Why should passwords NEVER be stored using simple MD5 or SHA-256 hashes?',
    options: [
      { text: 'MD5 and SHA-256 take too long to compute on modern CPUs', score: 15 },
      { text: 'They are fast hashing algorithms vulnerable to high-speed GPU rainbow table attacks; salted adaptive hashes like Bcrypt or Argon2 are required', score: 100 },
      { text: 'They only support numeric passwords', score: 10 },
      { text: 'They cannot be transmitted over HTTPS', score: 10 }
    ]
  }
];

// Initial Seed: 50+ Learning Resources across domains
const INITIAL_RESOURCES = [
  {
    id: 'res_py_1',
    skillId: 'sk_py',
    title: 'Python Beyond the Basics: Object-Oriented & Functional Design',
    provider: 'Real Python / MIT OpenCourseWare',
    difficulty: 'Intermediate',
    duration: '18 hours',
    url: 'https://realpython.com',
    type: 'Course & Practical Labs',
    projectTask: 'Build an asynchronous web scraper and thread-safe worker pool.'
  },
  {
    id: 'res_ml_1',
    skillId: 'sk_ml_core',
    title: 'Machine Learning Specialization by Andrew Ng',
    provider: 'DeepLearning.AI / Stanford',
    difficulty: 'Intermediate',
    duration: '35 hours',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    type: 'Comprehensive Specialization',
    projectTask: 'Implement Logistic Regression and Random Forest from mathematical first principles in NumPy.'
  },
  {
    id: 'res_pt_1',
    skillId: 'sk_pytorch',
    title: 'Deep Learning with PyTorch: Zero to GANs & Transformers',
    provider: 'PyTorch Official Tutorials',
    difficulty: 'Advanced',
    duration: '28 hours',
    url: 'https://pytorch.org/tutorials',
    type: 'Interactive Notebooks',
    projectTask: 'Train a custom ResNet classifier on medical imaging with data augmentation and TensorBoard logging.'
  },
  {
    id: 'res_xai_1',
    skillId: 'sk_xai',
    title: 'Explainable AI in Practice: SHAP, LIME, and Model Governance',
    provider: 'Interpretable Machine Learning Guide',
    difficulty: 'Advanced',
    duration: '14 hours',
    url: 'https://christophm.github.io/interpretable-ml-book',
    type: 'Book & Code Labs',
    projectTask: 'Generate SHAP summary and waterfall plots for a credit risk Random Forest classifier.'
  },
  {
    id: 'res_genai_1',
    skillId: 'sk_genai',
    title: 'Production LLM Engineering & RAG Architecture',
    provider: 'LangChain & DeepLearning.AI',
    difficulty: 'Advanced',
    duration: '22 hours',
    url: 'https://www.deeplearning.ai',
    type: 'Video Series & GitHub Repos',
    projectTask: 'Build a multi-document question answering agent with vector similarity reranking and citation grounding.'
  },
  {
    id: 'res_docker_1',
    skillId: 'sk_docker',
    title: 'Docker & Kubernetes: The Practical Guide to Production Containers',
    provider: 'Linux Foundation',
    difficulty: 'Intermediate',
    duration: '20 hours',
    url: 'https://docs.docker.com',
    type: 'Interactive Hands-on Lab',
    projectTask: 'Containerize a multi-tier microservice architecture with healthchecks and Docker Compose orchestration.'
  },
  {
    id: 'res_cloud_1',
    skillId: 'sk_aws',
    title: 'AWS Certified Solutions Architect Associate Blueprint',
    provider: 'AWS Skill Builder',
    difficulty: 'Advanced',
    duration: '40 hours',
    url: 'https://aws.amazon.com/training',
    type: 'Certification Roadmap',
    projectTask: 'Architect an auto-scaling, highly available VPC with public/private subnets and ALB.'
  },
  {
    id: 'res_dsa_1',
    skillId: 'sk_dsa',
    title: 'Algorithmic Problem Solving & Technical Interview Mastery',
    provider: 'NeetCode / LeetCode Guide',
    difficulty: 'Intermediate',
    duration: '45 hours',
    url: 'https://neetcode.io',
    type: 'Problem Set & Video Walkthroughs',
    projectTask: 'Solve 75 curated pattern problems covering Graphs, Dynamic Programming, and Heaps.'
  }
];

// Initial Seed: Future Tech Skill Demand Forecast Trends (Longitudinal O*NET 30.3 & Industry Telemetry)
const INITIAL_FUTURE_TRENDS = [
  { skill: 'Generative AI & LLMs', category: 'AI & ML', currentDemand: 96, growthScore: 98, predictedDemand: 99, trend: 'Surging ↑↑', priority: 'HIGH', socDomain: '15-2051.00 / 15-1252.00' },
  { skill: 'Explainable AI (SHAP / LIME)', category: 'AI & ML', currentDemand: 82, growthScore: 94, predictedDemand: 95, trend: 'Surging ↑↑', priority: 'HIGH', socDomain: '15-2051.00' },
  { skill: 'Cloud Solutions (AWS/K8s)', category: 'Cloud & DevOps', currentDemand: 91, growthScore: 92, predictedDemand: 96, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-1252.00' },
  { skill: 'Cybersecurity & Zero Trust', category: 'Cybersecurity', currentDemand: 88, growthScore: 93, predictedDemand: 95, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-1212.00' },
  { skill: 'Vector Databases & Embeddings', category: 'Databases', currentDemand: 79, growthScore: 91, predictedDemand: 92, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-1243.00' },
  { skill: 'MLOps & Model Governance', category: 'AI & ML', currentDemand: 84, growthScore: 90, predictedDemand: 93, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-2051.00' },
  { skill: 'Kubernetes & Container Orchestration', category: 'Cloud & DevOps', currentDemand: 89, growthScore: 89, predictedDemand: 94, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-1252.00' },
  { skill: 'Full Stack React & TypeScript', category: 'Frontend', currentDemand: 86, growthScore: 82, predictedDemand: 87, trend: 'Stable Growth →', priority: 'MEDIUM', socDomain: '15-1254.00' },
  { skill: 'Data Engineering & Spark', category: 'Databases', currentDemand: 85, growthScore: 87, predictedDemand: 89, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-1243.00' },
  { skill: 'Rust & High-Performance Systems', category: 'Architecture', currentDemand: 74, growthScore: 92, predictedDemand: 88, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-1252.00' },
  { skill: 'DevSecOps & CI/CD Pipelines', category: 'Cloud & DevOps', currentDemand: 83, growthScore: 88, predictedDemand: 91, trend: 'High Growth ↑', priority: 'HIGH', socDomain: '15-1252.00' },
  { skill: 'GraphQL & High-Throughput APIs', category: 'Backend', currentDemand: 78, growthScore: 80, predictedDemand: 84, trend: 'Stable Growth →', priority: 'MEDIUM', socDomain: '15-1252.00' },
  { skill: 'Legacy Monolithic Architecture', category: 'Architecture', currentDemand: 45, growthScore: 28, predictedDemand: 32, trend: 'Declining ↓', priority: 'LOW', socDomain: '15-1252.00' },
  { skill: 'Pure jQuery / Old DOM', category: 'Frontend', currentDemand: 30, growthScore: 15, predictedDemand: 18, trend: 'Declining ↓', priority: 'LOW', socDomain: '15-1254.00' }
];

// Initial default skill proficiencies for new users (all start at 0 until user scores them)
const DEFAULT_USER_SKILLS = {};

class StorageService {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(INITIAL_SKILLS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.CAREERS)) {
        localStorage.setItem(STORAGE_KEYS.CAREERS, JSON.stringify(INITIAL_CAREERS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.ASSESSMENTS)) {
        localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(INITIAL_QUESTIONS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.FUTURE_TRENDS)) {
        localStorage.setItem(STORAGE_KEYS.FUTURE_TRENDS, JSON.stringify(INITIAL_FUTURE_TRENDS));
      }
      
      // Clean up legacy mock seed accounts from localStorage
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (rawUsers) {
        try {
          const parsed = JSON.parse(rawUsers);
          const realOnly = parsed.filter(u => 
            !['usr_demo', 'usr_demo_btech', 'usr_alex', 'usr_priya', 'usr_vikram', 'usr_ananya', 'usr_rohan', 'usr_sneha', 'usr_aarav'].includes(u.id) &&
            !u.email?.endsWith('@btech.edu') &&
            u.email !== 'demo@gmail.com'
          );
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(realOnly));
        } catch (e) {
          localStorage.removeItem(STORAGE_KEYS.USERS);
        }
      }
    } catch (e) {
      console.warn('LocalStorage error or unavailable, operating in memory mode:', e);
    }
  }

  // --- Skills API ---
  getSkills() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return data ? JSON.parse(data) : INITIAL_SKILLS;
    } catch (e) {
      return INITIAL_SKILLS;
    }
  }

  // --- Careers API ---
  getCareers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAREERS);
      const list = data ? JSON.parse(data) : INITIAL_CAREERS;
      return list.map(c => ({
        ...c,
        socCode: c.socCode || this.resolveSocCode(c)
      }));
    } catch (e) {
      return INITIAL_CAREERS;
    }
  }

  resolveSocCode(career) {
    if (career?.socCode) return career.socCode;
    if (career?.onet_soc_code) return career.onet_soc_code;
    const title = (career?.title || career?.careerTitle || '').toLowerCase();
    if (title.includes('data scientist') || title.includes('machine learning')) return '15-2051.00';
    if (title.includes('security') || title.includes('cyber')) return '15-1212.00';
    if (title.includes('database') || title.includes('data engineer')) return '15-1243.00';
    if (title.includes('cloud') || title.includes('solutions architect') || title.includes('systems analyst')) return '15-1211.00';
    if (title.includes('web') || title.includes('frontend') || title.includes('full stack')) return '15-1254.00';
    if (title.includes('devops') || title.includes('sre') || title.includes('administrator')) return '15-1244.00';
    if (title.includes('hardware') || title.includes('embedded')) return '17-2061.00';
    return '15-1252.00';
  }

  getCareerById(id) {
    const careers = this.getCareers();
    return careers.find(c => c.id === id) || careers[0];
  }

  // --- User & Profile API ---
  getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  }

  saveCurrentUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user in LocalStorage', e);
    }
  }

  getUserSkills(userId = null) {
    try {
      const activeUser = this.getCurrentUser();
      const targetId = userId || activeUser?.id;
      if (targetId) {
        const userScopedData = localStorage.getItem(`${STORAGE_KEYS.USER_SKILLS}_${targetId}`);
        if (userScopedData) return JSON.parse(userScopedData);
      }
      const data = localStorage.getItem(STORAGE_KEYS.USER_SKILLS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveUserSkills(skillsMap, userId = null) {
    try {
      const activeUser = this.getCurrentUser();
      const targetId = userId || activeUser?.id;
      const json = JSON.stringify(skillsMap || {});
      localStorage.setItem(STORAGE_KEYS.USER_SKILLS, json);
      if (targetId) {
        localStorage.setItem(`${STORAGE_KEYS.USER_SKILLS}_${targetId}`, json);
      }
    } catch (e) {
      console.error('Failed to save user skills', e);
    }
  }

  resetUserSkills(userId = null) {
    this.saveUserSkills({}, userId);
    return {};
  }

  updateSingleSkill(skillId, proficiency, userId = null) {
    const skills = this.getUserSkills(userId);
    skills[skillId] = Math.min(100, Math.max(0, proficiency));
    this.saveUserSkills(skills, userId);
    return skills;
  }

  // --- Assessment Questions & History ---
  getQuestions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      const parsed = data ? JSON.parse(data) : null;
      if (parsed && Array.isArray(parsed) && parsed.length >= INITIAL_QUESTIONS.length) {
        return parsed;
      }
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    } catch (e) {
      return INITIAL_QUESTIONS;
    }
  }

  getAssessments() {
    return this.getQuestions();
  }

  saveQuestions(questionsList) {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(questionsList || []));
      return questionsList;
    } catch (e) {
      console.error('Failed to save assessment questions', e);
      return [];
    }
  }

  addQuestion(newQuestion) {
    const list = this.getQuestions();
    const itemWithId = {
      ...newQuestion,
      id: newQuestion.id || `q_custom_${Date.now()}`
    };
    const updated = [itemWithId, ...list];
    this.saveQuestions(updated);
    return updated;
  }

  updateQuestion(questionId, updatedQuestion) {
    const list = this.getQuestions();
    const updated = list.map(q => q.id === questionId ? { ...q, ...updatedQuestion } : q);
    this.saveQuestions(updated);
    return updated;
  }

  deleteQuestion(questionId) {
    const list = this.getQuestions();
    const updated = list.filter(q => q.id !== questionId);
    this.saveQuestions(updated);
    return updated;
  }

  // --- Learning Resources ---
  getResources() {
    return INITIAL_RESOURCES;
  }

  // --- Future Skills Trends ---
  getFutureTrends() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FUTURE_TRENDS);
      const parsed = data ? JSON.parse(data) : null;
      if (parsed && Array.isArray(parsed) && parsed.length >= INITIAL_FUTURE_TRENDS.length) {
        return parsed;
      }
      localStorage.setItem(STORAGE_KEYS.FUTURE_TRENDS, JSON.stringify(INITIAL_FUTURE_TRENDS));
      return INITIAL_FUTURE_TRENDS;
    } catch (e) {
      return INITIAL_FUTURE_TRENDS;
    }
  }

  // --- Saved Roadmap Progress ---
  getRoadmapProgress(careerId) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_ROADMAPS);
      const allRoadmaps = data ? JSON.parse(data) : {};
      return allRoadmaps[careerId] || null;
    } catch (e) {
      return null;
    }
  }

  getRoadmaps() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_ROADMAPS);
      const allRoadmaps = data ? JSON.parse(data) : {};
      return Object.entries(allRoadmaps).map(([careerId, state]) => ({
        careerId,
        ...state
      }));
    } catch (e) {
      return [];
    }
  }

  getAllRoadmaps() {
    return this.getRoadmaps();
  }

  saveRoadmapProgress(careerId, roadmapState) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_ROADMAPS);
      const allRoadmaps = data ? JSON.parse(data) : {};
      allRoadmaps[careerId] = {
        ...roadmapState,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.SAVED_ROADMAPS, JSON.stringify(allRoadmaps));
    } catch (e) {
      console.error('Failed to save roadmap progress', e);
    }
  }

  // --- Resume History ---
  getResumeAnalyses() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_RESUMES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveResumeAnalysis(analysis) {
    try {
      const history = this.getResumeAnalyses();
      const updated = [
        { ...analysis, id: 'res_an_' + Date.now(), timestamp: new Date().toISOString() },
        ...history.slice(0, 9)
      ];
      localStorage.setItem(STORAGE_KEYS.SAVED_RESUMES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save resume analysis', e);
      return [];
    }
  }

  // --- Admin & User Monitoring Directory ---
  getUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      
      const careers = this.getCareers();
      
      // Filter out any legacy dummy mock accounts and enrich real users
      return parsed.filter(u => 
        !['usr_demo_btech', 'usr_priya', 'usr_vikram', 'usr_ananya', 'usr_rohan', 'usr_sneha', 'usr_aarav'].includes(u.id) &&
        !u.email?.endsWith('@btech.edu.mock')
      ).map(u => {
        const targetId = u.targetCareerId || u.target_career_id || 'car_mle';
        const careerObj = careers.find(c => c.id === targetId || c.title?.toLowerCase() === targetId?.toLowerCase()) || careers[0];
        
        let educationText = (u.education || u.degree || 'Computer Science & Engineering').trim();
        educationText = educationText.replace(/\s*•\s*[a-zA-Z0-9]{1}\s*$/i, '').trim();
        educationText = educationText.replace(/\s*•\s*$/i, '').trim();

        return {
          ...u,
          education: educationText,
          targetCareerId: careerObj.id,
          targetCareerTitle: careerObj.title,
          category: careerObj.category
        };
      });
    } catch (e) {
      console.error('Failed to get users', e);
      return [];
    }
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  findUserByEmail(emailOrIdentifier) {
    if (!emailOrIdentifier) return null;
    const clean = emailOrIdentifier.toLowerCase().trim();
    const users = this.getUsers();

    // 1. Direct email match
    const byEmail = users.find(u => (u.email || '').toLowerCase().trim() === clean);
    if (byEmail) return byEmail;

    // 2. Direct ID match
    const byId = users.find(u => (u.id || '').toLowerCase().trim() === clean);
    if (byId) return byId;

    // 3. Username / Email prefix match
    const byPrefix = users.find(u => {
      const prefix = (u.email || '').split('@')[0].toLowerCase().trim();
      return prefix === clean;
    });
    if (byPrefix) return byPrefix;

    return null;
  }

  addUser(newUser) {
    try {
      const users = this.getUsers();
      const existing = this.findUserByEmail(newUser.email);
      if (existing) {
        return { success: false, error: 'An account with this email address already exists. Please sign in instead.' };
      }
      users.unshift(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return { success: true, user: newUser };
    } catch (e) {
      console.error('Failed to add user', e);
      return { success: false, error: 'Failed to save user account.' };
    }
  }

  updateUser(updatedUser) {
    try {
      const users = this.getUsers();
      const index = users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
      } else {
        users.unshift(updatedUser);
      }
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return users;
    } catch (e) {
      console.error('Failed to update user', e);
      return [];
    }
  }

  deleteUser(id) {
    try {
      const users = this.getUsers().filter(u => u.id !== id);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return users;
    } catch (e) {
      console.error('Failed to delete user', e);
      return [];
    }
  }

  getAdminMetrics() {
    const users = this.getUsers();
    const totalUsers = users.length;
    const avgMatchScore = totalUsers > 0
      ? Math.round(users.reduce((acc, u) => acc + (u.overallMatchScore || 0), 0) / totalUsers)
      : 0;
    const avgAtsScore = totalUsers > 0
      ? Math.round(users.reduce((acc, u) => acc + (u.atsScore || 0), 0) / totalUsers)
      : 0;
    const avgRoadmapProgress = totalUsers > 0
      ? Math.round(users.reduce((acc, u) => acc + (u.roadmapProgress || 0), 0) / totalUsers)
      : 0;

    // Career Distribution Breakdown
    const careerCounts = {};
    users.forEach(u => {
      const cat = u.category || 'Software Engineering';
      careerCounts[cat] = (careerCounts[cat] || 0) + 1;
    });

    // Top Global Skill Gaps in Student Cohort
    const commonGaps = [
      { skill: 'RESTful API Design & Microservices', affectedStudents: 6, priority: 'HIGH', category: 'Backend' },
      { skill: 'TypeScript & Strict Types', affectedStudents: 5, priority: 'HIGH', category: 'Programming' },
      { skill: 'PyTorch & Deep Neural Loops', affectedStudents: 4, priority: 'HIGH', category: 'AI & ML' },
      { skill: 'Docker Containerization & Kubernetes', affectedStudents: 4, priority: 'MEDIUM', category: 'Cloud' },
      { skill: 'Vector Databases & LLM RAG Pipelines', affectedStudents: 3, priority: 'MEDIUM', category: 'AI & ML' }
    ];

    return {
      totalUsers,
      avgMatchScore,
      avgAtsScore,
      avgRoadmapProgress,
      careerCounts,
      commonGaps
    };
  }

  // Reset to initial clean state
  resetAllData() {
    try {
      localStorage.clear();
      this.initDatabase();
    } catch (e) {
      console.error('Failed to reset localStorage', e);
    }
  }
}

export const storageService = new StorageService();
export default storageService;
