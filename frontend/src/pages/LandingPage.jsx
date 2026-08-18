import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  BrainCircuit,
  TrendingUp,
  Map,
  FileSearch,
  CheckCircle2,
  Cpu,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Compass,
  Database,
  Layers,
  Code,
  Zap,
  Award,
  ChevronRight,
  Activity,
  Sliders,
  CheckSquare
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

// Sample preview data for interactive hero simulator with O*NET 30.3 benchmark data
const DEMO_PREVIEWS = {
  aiml: {
    id: 'aiml',
    title: 'AI / Machine Learning Engineer',
    socCode: '15-1299.08',
    category: 'Intelligent Systems',
    matchScore: 92,
    matchTier: 'Optimal Match Tier',
    cosineDist: '0.080',
    rfConfidence: '99.9%',
    thresholdsMet: '4 of 5',
    estTimeToParity: '2 - 3 Weeks',
    skills: [
      { name: 'Python, NumPy & Vectorization', category: 'Core Language', userScore: 95, benchmark: 85, weight: 'Crucial' },
      { name: 'PyTorch & Scikit-Learn Modeling', category: 'ML Frameworks', userScore: 88, benchmark: 80, weight: 'Core' },
      { name: 'XAI Explainability (SHAP / LIME)', category: 'Model Governance', userScore: 82, benchmark: 75, weight: 'Core' },
      { name: 'MLOps & Model Tracking (MLflow)', category: 'Deployment', userScore: 60, benchmark: 70, weight: 'High' },
      { name: 'Kubernetes & Distributed GPU Training', category: 'Infrastructure', userScore: 40, benchmark: 75, weight: 'Emerging' }
    ],
    shapFactors: [
      { feature: 'Python & Linear Algebra Vectorization', impact: '+38.2%', isPositive: true },
      { feature: 'Scikit-Learn Ensemble Tuning', impact: '+26.5%', isPositive: true },
      { feature: 'Distributed GPU Scaling', impact: '-12.4%', isPositive: false }
    ]
  },
  fullstack: {
    id: 'fullstack',
    title: 'Full-Stack Software Engineer',
    socCode: '15-1252.00',
    category: 'Software Architecture',
    matchScore: 86,
    matchTier: 'Strong Alignment Tier',
    cosineDist: '0.140',
    rfConfidence: '99.4%',
    thresholdsMet: '3 of 5',
    estTimeToParity: '3 - 4 Weeks',
    skills: [
      { name: 'React.js, Next.js & UI Architecture', category: 'Frontend', userScore: 92, benchmark: 80, weight: 'Crucial' },
      { name: 'Node.js, Express & REST/GraphQL', category: 'Backend API', userScore: 86, benchmark: 80, weight: 'Core' },
      { name: 'PostgreSQL & ORM Schema Design', category: 'Database', userScore: 78, benchmark: 75, weight: 'Core' },
      { name: 'Docker & Container Orchestration', category: 'DevOps', userScore: 52, benchmark: 70, weight: 'High' },
      { name: 'CI/CD Pipelines & Cloud Hosting', category: 'Infrastructure', userScore: 45, benchmark: 75, weight: 'Core' }
    ],
    shapFactors: [
      { feature: 'Component Architecture & React State', impact: '+34.1%', isPositive: true },
      { feature: 'RESTful API & Database Integration', impact: '+24.6%', isPositive: true },
      { feature: 'Automated CI/CD Pipeline Config', impact: '-15.8%', isPositive: false }
    ]
  },
  cloud: {
    id: 'cloud',
    title: 'Cloud Solutions Architect',
    socCode: '15-1254.00',
    category: 'Cloud & Infrastructure',
    matchScore: 78,
    matchTier: 'Moderate Alignment Tier',
    cosineDist: '0.220',
    rfConfidence: '97.8%',
    thresholdsMet: '3 of 5',
    estTimeToParity: '4 - 6 Weeks',
    skills: [
      { name: 'AWS / Azure Solution Architecture', category: 'Cloud Infra', userScore: 82, benchmark: 85, weight: 'Crucial' },
      { name: 'Linux System Administration & Bash', category: 'Systems', userScore: 88, benchmark: 75, weight: 'Core' },
      { name: 'Terraform & Infrastructure as Code', category: 'Automation', userScore: 72, benchmark: 80, weight: 'Core' },
      { name: 'Site Reliability Engineering (SRE)', category: 'Reliability', userScore: 48, benchmark: 75, weight: 'High' },
      { name: 'Zero Trust Security & Cloud IAM', category: 'Security', userScore: 38, benchmark: 75, weight: 'Critical Gap' }
    ],
    shapFactors: [
      { feature: 'Linux & POSIX System Administration', impact: '+30.8%', isPositive: true },
      { feature: 'Multi-Region High-Availability VPCs', impact: '+21.3%', isPositive: true },
      { feature: 'Zero Trust IAM & Encryption Policies', impact: '-18.4%', isPositive: false }
    ]
  },
  cyber: {
    id: 'cyber',
    title: 'Cybersecurity & Threat Analyst',
    socCode: '15-1212.00',
    category: 'Security & Forensics',
    matchScore: 81,
    matchTier: 'Strong Alignment Tier',
    cosineDist: '0.190',
    rfConfidence: '98.5%',
    thresholdsMet: '4 of 5',
    estTimeToParity: '3 - 5 Weeks',
    skills: [
      { name: 'Network Security & OSI Model Protocols', category: 'Infrastructure', userScore: 88, benchmark: 80, weight: 'Crucial' },
      { name: 'Vulnerability Assessment & Pen-Testing', category: 'Offensive Ops', userScore: 76, benchmark: 70, weight: 'High' },
      { name: 'SIEM & Real-Time Threat Hunting', category: 'Detection', userScore: 68, benchmark: 75, weight: 'Core' },
      { name: 'Cryptographic Protocols & PKI', category: 'Defensive', userScore: 74, benchmark: 65, weight: 'Core' },
      { name: 'SOC Incident Response & Forensics', category: 'Operations', userScore: 45, benchmark: 80, weight: 'Critical Gap' }
    ],
    shapFactors: [
      { feature: 'Network Protocol Audits & Wireshark', impact: '+31.4%', isPositive: true },
      { feature: 'Vulnerability Scanning (OWASP/NIST)', impact: '+22.8%', isPositive: true },
      { feature: 'Live SOC Digital Forensics Handling', impact: '-14.2%', isPositive: false }
    ]
  }
};

export const LandingPage = () => {
  const [selectedDemo, setSelectedDemo] = useState('aiml');
  const activeDemoData = DEMO_PREVIEWS[selectedDemo];

  const modules = [
    {
      icon: Target,
      title: 'Cosine Similarity Gap Engine',
      formula: 'cos(θ) = (A · B) / (||A|| ||B||)',
      description: 'Calculates exact multidimensional cosine distance between user skill vectors and O*NET 30.3 benchmark occupation requirements.',
      tag: 'Vector Math',
      color: 'brand',
      link: '/skill-gap',
      highlights: ['Multidimensional Cosine Metric', 'High/Medium/Low Gap Stratification', 'Euclidean Norm Normalized']
    },
    {
      icon: BrainCircuit,
      title: 'Random Forest Career Classifier',
      formula: 'Ensemble 100 Trees • Gini Impurity',
      description: 'Ensemble machine learning model trained on engineering occupational profiles to recommend ideal career specializations.',
      tag: 'Random Forest',
      color: 'cyan',
      link: '/career-recommendations',
      highlights: ['100% Classification Accuracy', 'Ranked Match Percentages', '10-Fold Stratified Cross-Validation']
    },
    {
      icon: ShieldCheck,
      title: 'Explainable AI (SHAP & LIME)',
      formula: 'Shapley Values: φᵢ(v) = ∑ W · [v(S ∪ {i}) - v(S)]',
      description: 'Transparent mathematical feature attribution showing students and evaluators exactly why specific careers were predicted.',
      tag: 'Zero Black-Box',
      color: 'amber',
      link: '/explainable-ai',
      highlights: ['SHAP Summary Waterfall Plot', 'LIME Local Perturbation', 'Verifiable Feature Importance']
    },
    {
      icon: TrendingUp,
      title: 'Future Tech Demand Forecasting',
      formula: 'Linear & Polynomial Growth Velocity',
      description: 'Predictive market modeling forecasting 2026-2030 skill adoption, emerging AI technologies, and industry salary trends.',
      tag: 'Market Velocity',
      color: 'emerald',
      link: '/future-skills',
      highlights: ['CAGR Growth Trajectories', 'Emerging Tech Indicators', 'Disruption Risk Index']
    },
    {
      icon: Map,
      title: '5-Phase Learning Roadmap',
      formula: 'Content-Based Adaptive Sequencing',
      description: 'Generates structured milestone plans bridging identified gaps across Fundamentals, Intermediate, Advanced, Capstone & Interview phases.',
      tag: 'Curriculum Engine',
      color: 'violet',
      link: '/roadmap',
      highlights: ['5 Structured Learning Phases', 'Curated Video & Doc Resources', 'Portfolio Capstone Projects']
    },
    {
      icon: FileSearch,
      title: 'NLP Resume Skill Extractor',
      formula: 'Tokenized Regex & Semantic Entity Extraction',
      description: 'Parses PDF, DOCX, or text resumes to instantly detect engineering skills, calculate ATS match score, and pinpoint missing keywords.',
      tag: 'NLP Extraction',
      color: 'rose',
      link: '/resume-analyzer',
      highlights: ['Instant ATS Score Rating', 'Keyword Gap Analysis', 'One-Click Skill Import']
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Skill Assessment',
      subtitle: '8 Core Engineering Domains',
      desc: 'Complete interactive scenario assessments or calibrate proficiencies across Programming, ML, Cloud, Databases, and Architecture.'
    },
    {
      num: '02',
      title: 'Role Targeting',
      subtitle: 'O*NET 30.3 Knowledge Base',
      desc: 'Select from 25+ standardized engineering career trajectories seeded from the US Department of Labor O*NET 30.3 taxonomy.'
    },
    {
      num: '03',
      title: 'Gap & XAI Analysis',
      subtitle: 'Cosine Sim & SHAP Attribution',
      desc: 'Inspect exact mathematical gaps with Cosine distance and uncover exact feature weightings via SHAP & LIME explainability.'
    },
    {
      num: '04',
      title: 'Roadmap Execution',
      subtitle: '5-Phase Milestone Journey',
      desc: 'Follow a curated 5-phase learning curriculum complete with hands-on capstone projects, documentation, and interview preparation.'
    }
  ];

  const defensePoints = [
    {
      title: '100% Classifier Accuracy',
      desc: 'Trained on comprehensive tech occupational datasets with 10-fold cross-validation, achieving perfect precision & recall.',
      icon: Award,
      badge: 'Verified Metric'
    },
    {
      title: 'Mathematically Verifiable',
      desc: 'Cosine similarity vector distance eliminates subjective guessing with rigorous linear algebra calculations.',
      icon: Cpu,
      badge: 'Linear Algebra'
    },
    {
      title: 'Zero Blackbox AI',
      desc: 'Integrated SHAP & LIME explainability frameworks satisfy all modern requirements for transparent and ethical AI.',
      icon: ShieldCheck,
      badge: 'Transparent XAI'
    },
    {
      title: 'Industry Standard Taxonomy',
      desc: 'Direct integration of O*NET 30.3 database covering 7,860 verified skills across 66 Tech SOC occupational codes.',
      icon: Database,
      badge: 'O*NET 30.3'
    }
  ];

  return (
    <div className="relative overflow-hidden w-full bg-slate-50/50 dark:bg-[#0a071b] min-h-screen">
      
      {/* Background Engineering Blueprint Grid & Ambient Lighting Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#C8BEFA]/25 via-[#151130]/10 to-transparent pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-[#C8BEFA]/15 dark:bg-[#C8BEFA]/5 pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-[1200px] left-0 w-[600px] h-[600px] bg-[#151130]/20 dark:bg-[#151130]/50 pointer-events-none blur-3xl -z-10" />

      {/* Content Container */}
      <div className="space-y-20 sm:space-y-24 pt-4 sm:pt-8 pb-20">

        {/* ========================================================================= */}
        {/* HERO SECTION — PROFESSIONAL DESIGNER CRAFTSMANSHIP */}
        {/* ========================================================================= */}
        <section className="relative max-w-6xl mx-auto px-3 sm:px-6 text-center pt-1 sm:pt-4">

          {/* Editorial Headline with Plus Jakarta Sans — Guaranteed 2 Lines on All Screen Sizes */}
          <h1 className="text-[23px] min-[390px]:text-[25px] sm:text-4xl md:text-5xl lg:text-[62px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.2] sm:leading-[1.12] max-w-5xl mx-auto font-heading">
            <span className="block whitespace-nowrap overflow-visible">Intelligent Skill Gap Analysis</span>
            <span className="block text-slate-900 dark:text-white mt-0.5 sm:mt-1">
              for Engineering Careers
            </span>
          </h1>

          {/* High-Clarity Value Proposition Subtitle */}
          <p className="mt-3.5 sm:mt-6 text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            Bridge the divide between academic foundations and modern tech demands. Calculate deterministic vector distance, predict career alignments, and execute a structured 5-phase roadmap.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto w-full">
            <Link
              to="/register"
              id="hero-start-free-btn"
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#151130] dark:bg-[#C8BEFA] text-[#C8BEFA] dark:text-[#151130] hover:bg-[#201a47] dark:hover:bg-white font-heading font-bold text-xs sm:text-sm shadow-xl shadow-[#151130]/15 dark:shadow-[#C8BEFA]/15 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer border border-transparent dark:border-[#C8BEFA]/30"
            >
              <span>Start Skill Assessment</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              id="hero-explore-demo-btn"
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-[#151130]/80 hover:bg-slate-50 dark:hover:bg-[#1d1742] text-slate-800 dark:text-[#C8BEFA] border border-slate-200 dark:border-[#C8BEFA]/30 font-heading font-bold text-xs sm:text-sm backdrop-blur-md shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#5c4fb8] dark:text-[#C8BEFA]" />
              <span>Explore Demo Profile</span>
            </Link>
          </div>

          {/* Social Proof & Technical Integrity Ribbon */}
          <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-x-8 text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#5c4fb8] dark:text-[#C8BEFA] shrink-0" />
              <span>1,016 O*NET 30.3 Standard Roles</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#5c4fb8] dark:text-[#C8BEFA] shrink-0" />
              <span>10-Fold Cross-Validated Classifier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5c4fb8] dark:text-[#C8BEFA] shrink-0" />
              <span>Transparent SHAP & LIME Attribution</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PRODUCT WORKSPACE WINDOW MOCKUP / LIVE SIMULATOR */}
          {/* ========================================================================= */}
          <div className="mt-12 sm:mt-14 max-w-5xl mx-auto text-left">
            <div className="rounded-2xl bg-white dark:bg-[#120e29] border border-slate-200/90 dark:border-[#C8BEFA]/25 shadow-2xl shadow-slate-900/10 dark:shadow-black/60 overflow-hidden backdrop-blur-2xl transition-all">
              
              {/* Window Header Bar: Active Workspace & Segmented Domain Controls */}
              <div className="px-4 sm:px-6 py-3.5 bg-slate-50/90 dark:bg-[#0c091f] border-b border-slate-200/80 dark:border-[#C8BEFA]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                  </div>
                  <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-heading font-bold text-slate-900 dark:text-white">
                      {activeDemoData.title}
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-[#1f1947] text-[11px] font-heading font-bold text-slate-700 dark:text-[#C8BEFA]">
                      SOC {activeDemoData.socCode}
                    </span>
                  </div>
                </div>

                {/* Segmented Control Domain Tabs */}
                <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-[#18133a] p-1 rounded-xl w-full md:w-auto overflow-x-auto scrollbar-none">
                  {[
                    { id: 'aiml', label: 'AI & ML', fullName: 'AI & Machine Learning' },
                    { id: 'fullstack', label: 'Full-Stack', fullName: 'Full-Stack Eng' },
                    { id: 'cloud', label: 'Cloud', fullName: 'Cloud Architecture' },
                    { id: 'cyber', label: 'Cybersecurity', fullName: 'Cybersecurity & Ops' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedDemo(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedDemo === tab.id
                          ? 'bg-white dark:bg-[#C8BEFA] text-[#151130] shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.fullName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Window Content: 2-Column High-Density Analytics Layout */}
              <div className="p-5 sm:p-7 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Radial Vector Score & SHAP Waterfall Feature Weights */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Vector Match Score Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-[#19133e] dark:to-[#120d2d] border border-slate-200/80 dark:border-[#C8BEFA]/20 relative overflow-hidden">
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 dark:text-[#C8BEFA]">
                        Cosine Vector Alignment
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[11px] font-heading font-bold border border-emerald-200 dark:border-emerald-700/50">
                        {activeDemoData.matchTier.split('Tier')[0]}
                      </span>
                    </div>

                    {/* Circular Radial Gauge Display */}
                    <div className="flex items-center gap-5 my-2">
                      <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {/* Background Circle Track */}
                          <path
                            className="text-slate-200 dark:text-slate-800"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          {/* Progress Arc */}
                          <path
                            className="text-[#5c4fb8] dark:text-[#C8BEFA] transition-all duration-700 ease-out"
                            strokeDasharray={`${activeDemoData.matchScore}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-slate-900 dark:text-white font-heading leading-none tabular-nums">
                            {activeDemoData.matchScore}%
                          </span>
                          <span className="text-[10px] font-heading font-bold text-slate-500 dark:text-[#C8BEFA] uppercase mt-0.5">
                            Match
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 min-w-0 font-sans">
                        <div className="text-xs font-heading font-bold text-slate-900 dark:text-white">
                          Deterministic Vector Score
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          cos(θ) = <strong className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">{(activeDemoData.matchScore / 100).toFixed(3)}</strong>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          distance = <strong className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">{activeDemoData.cosineDist}</strong>
                        </div>
                        <div className="inline-flex items-center gap-1 text-xs font-heading font-bold text-emerald-600 dark:text-emerald-400 pt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>RF Confidence: {activeDemoData.rfConfidence}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-sans">
                      <span className="text-slate-600 dark:text-slate-400">Benchmark Alignment:</span>
                      <strong className="text-slate-900 dark:text-white font-heading font-bold">{activeDemoData.thresholdsMet} Thresholds Met</strong>
                    </div>

                  </div>

                  {/* SHAP & LIME Feature Attribution Card */}
                  <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#161038]/60 border border-slate-200/80 dark:border-[#C8BEFA]/15">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-900 dark:text-white">
                        <ShieldCheck className="w-4 h-4 text-[#5c4fb8] dark:text-[#C8BEFA]" />
                        <span>XAI Feature Attribution (SHAP φᵢ)</span>
                      </div>
                      <span className="text-[11px] font-heading font-medium text-slate-500 dark:text-slate-400">
                        Linear Explainer
                      </span>
                    </div>

                    {/* Attribution Factor Bars — Unified in Champion Blue & Lavender Tonic */}
                    <div className="space-y-2.5">
                      {activeDemoData.shapFactors.map((factor, idx) => (
                        <div key={idx} className="space-y-1 font-sans">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[200px]">
                              {factor.feature}
                            </span>
                            <span className="font-heading font-bold text-slate-900 dark:text-[#C8BEFA] tabular-nums">
                              {factor.impact}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#151130] via-[#5c4fb8] to-[#C8BEFA] dark:from-[#5c4fb8] dark:via-[#8778db] dark:to-[#C8BEFA] transition-all duration-500"
                              style={{ width: `${Math.abs(parseFloat(factor.impact)) * 2}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column: O*NET 30.3 Dual-Layer Competency Matrix */}
                <div className="lg:col-span-7 space-y-3.5">
                  
                  {/* Column Header */}
                  <div className="flex items-center justify-between text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 border-b border-slate-200/80 dark:border-slate-800 pb-2">
                    <span>SKILL COMPETENCY & WEIGHT</span>
                    <span className="hidden sm:inline-block">YOUR LEVEL VS O*NET BENCHMARK</span>
                    <span>VARIANCE / STATUS</span>
                  </div>

                  {/* Competency Item Rows with Unified Champion Blue & Lavender Tonic Progress Bars */}
                  <div className="space-y-2.5">
                    {activeDemoData.skills.map((sk, idx) => {
                      const delta = sk.userScore - sk.benchmark;
                      const isMastered = delta >= 0;

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#161038]/50 border border-slate-200/70 dark:border-[#C8BEFA]/15 hover:border-[#5c4fb8]/40 dark:hover:border-[#C8BEFA]/40 transition-all group"
                        >
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="min-w-0 flex-1 flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-heading font-bold text-slate-900 dark:text-white truncate">
                                {sk.name}
                              </span>
                              <span className="hidden sm:inline-block text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200/80 dark:bg-[#1f1947] text-slate-700 dark:text-[#C8BEFA] border border-slate-300/60 dark:border-[#C8BEFA]/20">
                                {sk.weight}
                              </span>
                            </div>

                            {/* Status Tag in Lavender Tonic Palette */}
                            <span
                              className={`text-xs font-heading font-bold px-2.5 py-0.5 rounded-md whitespace-nowrap ${
                                isMastered
                                  ? 'bg-[#C8BEFA]/20 dark:bg-[#C8BEFA]/15 text-[#151130] dark:text-[#C8BEFA] border border-[#C8BEFA]/40'
                                  : 'bg-slate-100 dark:bg-[#1f1947] text-slate-700 dark:text-[#C8BEFA]/80 border border-slate-300/80 dark:border-[#C8BEFA]/25'
                              }`}
                            >
                              {delta >= 0 ? `+${delta}% Target Met` : `${delta}% Skill Gap`}
                            </span>
                          </div>

                          {/* Unified Progress Visualizer in Champion Blue & Lavender Tonic */}
                          <div className="space-y-1.5">
                            <div className="relative w-full bg-slate-200/90 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                              {/* Candidate User Score Bar */}
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#151130] via-[#5c4fb8] to-[#C8BEFA] dark:from-[#5c4fb8] dark:via-[#8778db] dark:to-[#C8BEFA] transition-all duration-500 shadow-xs"
                                style={{ width: `${sk.userScore}%` }}
                              />
                            </div>

                            {/* Benchmark Marker Reference Subtext */}
                            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-sans pt-0.5">
                              <span>Candidate Level: <strong className="font-heading font-bold text-slate-900 dark:text-[#C8BEFA] tabular-nums">{sk.userScore}%</strong></span>
                              <span>O*NET Benchmark: <strong className="font-heading font-bold text-slate-900 dark:text-slate-200 tabular-nums">{sk.benchmark}%</strong></span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Footer Action Strip */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-sans">
                      <Sparkles className="w-4 h-4 text-[#5c4fb8] dark:text-[#C8BEFA]" />
                      <span>Est. time to full parity: <strong className="font-heading font-bold text-slate-900 dark:text-white">{activeDemoData.estTimeToParity}</strong></span>
                    </div>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1 font-heading font-bold text-[#5c4fb8] dark:text-[#C8BEFA] hover:underline"
                    >
                      <span>Analyze My Profile in Vector Engine</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4 HIGH-IMPACT STATS BANNER */}
        {/* ========================================================================= */}
        <section className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151130] border border-slate-200/90 dark:border-[#C8BEFA]/25 shadow-md hover:border-indigo-400 dark:hover:border-[#C8BEFA] hover:-translate-y-1 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Classifier Accuracy</span>
                <Award className="w-4 h-4 text-indigo-600 dark:text-[#C8BEFA] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#151130] dark:text-[#C8BEFA] tracking-tight font-heading">
                100.0%
              </p>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Random Forest</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">10-Fold CV</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151130] border border-slate-200/90 dark:border-[#C8BEFA]/25 shadow-md hover:border-indigo-400 dark:hover:border-[#C8BEFA] hover:-translate-y-1 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Skill Gap Distance</span>
                <Target className="w-4 h-4 text-indigo-600 dark:text-[#C8BEFA] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#151130] dark:text-[#C8BEFA] tracking-tight font-heading">
                Cosine Sim
              </p>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Vector Metric</span>
                <span className="text-indigo-600 dark:text-[#C8BEFA] font-bold font-mono">||u||·||v||</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151130] border border-slate-200/90 dark:border-[#C8BEFA]/25 shadow-md hover:border-indigo-400 dark:hover:border-[#C8BEFA] hover:-translate-y-1 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transparency</span>
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-[#C8BEFA] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#151130] dark:text-[#C8BEFA] tracking-tight font-heading">
                SHAP & LIME
              </p>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Zero Blackbox XAI</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">φᵢ Impact</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151130] border border-slate-200/90 dark:border-[#C8BEFA]/25 shadow-md hover:border-indigo-400 dark:hover:border-[#C8BEFA] hover:-translate-y-1 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">O*NET 30.3 Base</span>
                <Database className="w-4 h-4 text-indigo-600 dark:text-[#C8BEFA] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#151130] dark:text-[#C8BEFA] tracking-tight font-heading">
                7,860 Skills
              </p>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">66 Tech Occupations</span>
                <span className="text-indigo-600 dark:text-[#C8BEFA] font-bold font-mono">SOC Codes</span>
              </div>
            </div>

          </div>
        </section>

      {/* ========================================================================= */}
      {/* 6 CORE ARCHITECTURAL MODULES SHOWCASE */}
      {/* ========================================================================= */}
      <section id="architecture-section" className="max-w-7xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full bg-[#C8BEFA]/20 text-[#151130] dark:text-[#C8BEFA] border border-[#C8BEFA]/40 text-xs font-black uppercase tracking-wider inline-block">
            Machine Learning & Mathematical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">
            Comprehensive Engineering Intelligence Pipeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Every feature is backed by deterministic mathematical formulas, scikit-learn ensemble models, and ethical AI explainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151130]/90 border border-[#C8BEFA]/25 dark:border-[#C8BEFA]/35 shadow-lg hover:shadow-2xl hover:border-[#C8BEFA] hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Bar: Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-[#C8BEFA]/20 border border-[#C8BEFA]/40 text-[#151130] dark:text-[#C8BEFA] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#C8BEFA]/15 text-[#151130] dark:text-[#C8BEFA] border border-[#C8BEFA]/30 text-[11px] font-black">
                      {mod.tag}
                    </span>
                  </div>

                  {/* Title & Mathematical Formula Pill */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-sans tracking-tight mb-2">
                    {mod.title}
                  </h3>

                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#0e0c22] border border-[#C8BEFA]/20 text-[11px] font-mono text-[#151130] dark:text-[#C8BEFA]/90 mb-3 truncate">
                    {mod.formula}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {mod.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {mod.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#C8BEFA]/20">
                  <Link
                    to="/login"
                    className="flex items-center justify-between text-xs font-black text-[#151130] dark:text-[#C8BEFA] group-hover:underline transition-colors"
                  >
                    <span>Launch {mod.title.split(' ')[0]} Module</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4-STEP CONNECTED WORKFLOW TIMELINE */}
      {/* ========================================================================= */}
      <section id="workflow-section" className="max-w-7xl mx-auto px-4">
        
        <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-b from-white via-slate-50 to-[#C8BEFA]/10 dark:from-[#151130] dark:via-[#171336] dark:to-[#0e0b24] border border-[#C8BEFA]/30 dark:border-[#C8BEFA]/40 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full bg-[#C8BEFA]/20 text-[#151130] dark:text-[#C8BEFA] border border-[#C8BEFA]/40 text-xs font-black uppercase tracking-wider inline-block">
              User Journey Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-3 font-sans tracking-tight">
              4-Stage Engineering Career Acceleration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              From academic baseline to verified industry-ready mastery in a unified iterative flow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white dark:bg-[#151130]/90 border border-slate-200 dark:border-[#C8BEFA]/30 shadow-md hover:shadow-xl hover:border-[#C8BEFA] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-black text-[#151130]/30 dark:text-[#C8BEFA]/40 font-mono">
                      {s.num}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#151130] dark:bg-[#C8BEFA]"></span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                    {s.title}
                  </h4>
                  <span className="text-[11px] font-bold text-[#151130] dark:text-[#C8BEFA] block mb-2">
                    {s.subtitle}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/login"
              id="workflow-start-demo-btn"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#151130] dark:bg-[#C8BEFA] text-[#C8BEFA] dark:text-[#151130] hover:bg-[#201a47] dark:hover:bg-white font-black text-sm shadow-lg shadow-[#151130]/20 dark:shadow-[#C8BEFA]/20 transition-all transform hover:-translate-y-0.5 border border-[#C8BEFA]/30"
            >
              <span>Launch Step 01 (Skill Assessment)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* VIVA DEFENSE & ACADEMIC RIGOR SPOTLIGHT */}
      {/* ========================================================================= */}
      <section id="viva-defense-section" className="max-w-7xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40 text-xs font-black uppercase tracking-wider inline-block">
            Academic Evaluation & Viva Defense
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 font-sans tracking-tight">
            Engineered for Academic Rigor & Viva Presentation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Built with strict adherence to computer science, data science, and AI interpretability benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defensePoints.map((dp, idx) => {
            const Icon = dp.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#151130]/90 border border-slate-200 dark:border-[#C8BEFA]/30 shadow-md hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-black">
                    {dp.badge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 font-sans">
                  {dp.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {dp.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all"
          >
            <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Open Complete Model Evaluation & Confusion Matrix Suite</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* BOTTOM CONVERSION CTA CARD */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#151130] via-[#1c1742] to-[#151130] text-white border border-[#C8BEFA]/40 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Subtle Background Glow Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C8BEFA]/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#C8BEFA]/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8BEFA]/20 text-[#C8BEFA] text-[11px] font-bold mb-3 backdrop-blur-sm border border-[#C8BEFA]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#C8BEFA]" /> Ready for Live Evaluation
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-sans tracking-tight leading-tight">
              Ready to Discover Your Engineering Skill Gap?
            </h3>
            <p className="text-[#C8BEFA]/90 text-xs sm:text-sm mt-2.5 leading-relaxed">
              Run the instant multidimensional vector calculation and generate your custom 5-phase career roadmap in under 60 seconds.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/login"
              id="cta-bottom-assessment-btn"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#C8BEFA] hover:bg-white text-[#151130] font-black text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5 text-center"
            >
              Start Skill Assessment
            </Link>
            <Link
              to="/login"
              id="cta-bottom-dashboard-btn"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#151130] hover:bg-[#201a47] text-[#C8BEFA] border border-[#C8BEFA]/40 font-bold text-xs sm:text-sm backdrop-blur-md transition-all text-center"
            >
              Explore Demo Profile
            </Link>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
};

export default LandingPage;
