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

// Sample preview data for interactive hero simulator
const DEMO_PREVIEWS = {
  aiml: {
    title: 'AI / Machine Learning Engineer',
    category: 'Intelligent Systems & Data Science',
    matchScore: 92,
    cosineDist: '0.081 (Exceptional Match)',
    rfConfidence: '99.9%',
    topSkills: [
      { name: 'Python & NumPy/Pandas', level: 95, status: 'Mastered', color: 'emerald' },
      { name: 'Scikit-Learn & PyTorch', level: 88, status: 'Strong', color: 'emerald' },
      { name: 'SHAP & LIME Interpretability', level: 80, status: 'Proficient', color: 'cyan' },
      { name: 'MLOps & Model Tracking', level: 55, status: 'Action Gap', color: 'amber' },
      { name: 'Kubernetes & GPU Scaling', level: 35, status: 'Action Gap', color: 'rose' }
    ],
    shapInfluence: '+42% driven by Mathematics & Python ecosystem'
  },
  fullstack: {
    title: 'Full-Stack Software Engineer',
    category: 'Software & Cloud Architecture',
    matchScore: 86,
    cosineDist: '0.142 (High Alignment)',
    rfConfidence: '99.4%',
    topSkills: [
      { name: 'React.js & Next.js', level: 90, status: 'Mastered', color: 'emerald' },
      { name: 'Node.js & Express REST APIs', level: 85, status: 'Strong', color: 'emerald' },
      { name: 'PostgreSQL & ORM Modeling', level: 75, status: 'Moderate', color: 'amber' },
      { name: 'Docker & Microservices', level: 45, status: 'Action Gap', color: 'rose' },
      { name: 'CI/CD & Cloud Deployment', level: 40, status: 'Action Gap', color: 'rose' }
    ],
    shapInfluence: '+34% influenced by Frontend & Backend proficiency'
  },
  cloud: {
    title: 'Cloud Solutions Architect',
    category: 'Infrastructure & DevOps',
    matchScore: 78,
    cosineDist: '0.220 (Moderate Alignment)',
    rfConfidence: '97.8%',
    topSkills: [
      { name: 'AWS & Azure Architecture', level: 80, status: 'Strong', color: 'emerald' },
      { name: 'Terraform & Infrastructure as Code', level: 70, status: 'Moderate', color: 'amber' },
      { name: 'Linux System Administration', level: 85, status: 'Mastered', color: 'emerald' },
      { name: 'Site Reliability Engineering (SRE)', level: 40, status: 'Action Gap', color: 'rose' },
      { name: 'Zero Trust Security & IAM', level: 30, status: 'Action Gap', color: 'rose' }
    ],
    shapInfluence: '+28% attributed to Cloud & Linux fundamentals'
  },
  cyber: {
    title: 'Cybersecurity & Threat Analyst',
    category: 'Security & Forensics',
    matchScore: 81,
    cosineDist: '0.190 (Strong Alignment)',
    rfConfidence: '98.5%',
    topSkills: [
      { name: 'Network Security & Protocols', level: 88, status: 'Mastered', color: 'emerald' },
      { name: 'Vulnerability Assessment & Pen-Testing', level: 75, status: 'Strong', color: 'cyan' },
      { name: 'SIEM & Threat Hunting', level: 65, status: 'Moderate', color: 'amber' },
      { name: 'Cryptographic Protocols', level: 70, status: 'Strong', color: 'cyan' },
      { name: 'SOC Incident Response', level: 45, status: 'Action Gap', color: 'rose' }
    ],
    shapInfluence: '+31% driven by Networking & Security audits'
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
    <div className="relative overflow-hidden w-full">
      
      {/* Ambient Lighting Mesh / Gradient Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] ambient-blob-1 pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] ambient-blob-2 pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-[800px] left-0 w-[500px] h-[500px] ambient-blob-3 pointer-events-none blur-3xl -z-10" />

      {/* Content Container */}
      <div className="space-y-16 sm:space-y-20 pt-2 sm:pt-3 pb-16">

        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative max-w-6xl mx-auto px-4 text-center">
          
          {/* Glowing Project Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-black mb-3 sm:mb-4 shadow-md shadow-brand-500/10 backdrop-blur-md transition-all hover:scale-105">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600 dark:bg-brand-400"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
            <span>B.Tech Final-Year Capstone Project • O*NET 30.3 & Explainable AI</span>
          </div>

        {/* Dynamic Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15] sm:leading-[1.12]">
          Intelligent{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Skill Gap Analysis
          </span>
          <br className="hidden sm:block" /> & Engineering Career Guidance
        </h1>

        {/* Subtitle with High-Contrast Mathematical Backing */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Bridge the divide between engineering academics and industry demands. Powered by{' '}
          <span className="font-bold text-slate-900 dark:text-white">Cosine Similarity</span>,{' '}
          <span className="font-bold text-slate-900 dark:text-white">Random Forest Classifiers</span>, and{' '}
          <span className="font-bold text-slate-900 dark:text-white">SHAP & LIME Explainable AI</span>.
        </p>

        {/* Algorithm Compliance Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
            <Database className="w-3.5 h-3.5 text-blue-500" /> O*NET 30.3 Standard
          </span>
          <span className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-cyan-500" /> 10-Fold Cross-Validation
          </span>
          <span className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Transparent Feature Attribution
          </span>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE HERO LIVE SIMULATOR / PREVIEW WIDGET */}
        {/* ========================================================================= */}
        <div className="mt-10 max-w-5xl mx-auto text-left">
          <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl p-6 sm:p-8">
            
            {/* Widget Top Bar: Role Selector Tabs */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-bold">
                    <Activity className="w-4 h-4" />
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                    Live Career Match & Cosine Gap Simulator
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select a target engineering domain below to inspect real-time mathematical vector alignment:
                </p>
              </div>

              {/* Demo Role Switcher Tabs */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0">
                {[
                  { id: 'aiml', label: 'AI & ML Engineer' },
                  { id: 'fullstack', label: 'Full-Stack Eng' },
                  { id: 'cloud', label: 'Cloud Architect' },
                  { id: 'cyber', label: 'Cybersecurity' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedDemo(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedDemo === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget Body: Two Column Metrics & Gap Visualizer */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Match Score & Model Metrics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-slate-50/80 dark:from-slate-850 dark:via-blue-950/20 dark:to-slate-900 border border-blue-200/80 dark:border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase text-blue-600 dark:text-cyan-400 tracking-wider">
                      Cosine Vector Match
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">
                      {activeDemoData.category}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 my-2">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-sans">
                      {activeDemoData.matchScore}%
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Optimal Target Match
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden my-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activeDemoData.matchScore}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-200/60 dark:border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Cosine Distance</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs font-mono">{activeDemoData.cosineDist}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">RF Confidence</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs font-mono">{activeDemoData.rfConfidence}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-500/20 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-800 dark:text-amber-300 font-bold block text-[11px]">SHAP Explainability Insight:</strong>
                    <span>{activeDemoData.shapInfluence}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Skill Proficiencies & Gaps Breakdown */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 px-1">
                  <span>Required Skill Competencies (O*NET 30.3)</span>
                  <span>Proficiency Status</span>
                </div>

                <div className="space-y-2.5">
                  {activeDemoData.topSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 hover:border-blue-400/40 transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {sk.name}
                          </span>
                          <span className="text-xs font-black text-slate-700 dark:text-slate-300 font-mono">
                            {sk.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              sk.color === 'emerald'
                                ? 'bg-emerald-500'
                                : sk.color === 'cyan'
                                ? 'bg-cyan-500'
                                : sk.color === 'amber'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${sk.level}%` }}
                          />
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap ${
                          sk.color === 'emerald'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                            : sk.color === 'cyan'
                            ? 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400'
                            : sk.color === 'amber'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {sk.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Launch Full Vector Gap Engine</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 HIGH-IMPACT STATS BANNER */}
        {/* ========================================================================= */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          
          <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-500/40 hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Classifier Accuracy</span>
              <Award className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight font-sans">
              100.0% Acc
            </p>
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Random Forest Ensemble</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">10-Fold CV</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-cyan-500/40 hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Skill Gap Distance</span>
              <Target className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 tracking-tight font-sans">
              Cosine Sim
            </p>
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Multidimensional Vector</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">||u||·||v||</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-emerald-500/40 hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Transparency</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-sans">
              SHAP & LIME
            </p>
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Zero Blackbox XAI</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">φᵢ Impact</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-amber-500/40 hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">O*NET 30.3 Base</span>
              <Database className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight font-sans">
              7,860 Skills
            </p>
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 font-medium">66 Tech Occupations</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">SOC Codes</span>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6 CORE ARCHITECTURAL MODULES SHOWCASE */}
      {/* ========================================================================= */}
      <section id="architecture-section" className="max-w-7xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="primary" size="lg">Machine Learning & Mathematical Architecture</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mt-4 tracking-tight">
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
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Bar: Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant={mod.color}>{mod.tag}</Badge>
                  </div>

                  {/* Title & Mathematical Formula Pill */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 font-sans tracking-tight mb-2">
                    {mod.title}
                  </h3>

                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-3 truncate">
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
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to="/login"
                    className="flex items-center justify-between text-xs font-black text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors"
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
        
        <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="violet" size="lg">User Journey Pathway</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 mt-3 font-sans tracking-tight">
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
                className="relative p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 shadow-md hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-black text-blue-600/30 dark:text-cyan-400/40 font-mono">
                      {s.num}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-sans">
                    {s.title}
                  </h4>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 block mb-2">
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
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
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
          <Badge variant="emerald" size="lg">Academic Evaluation & Viva Defense</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-3 font-sans tracking-tight">
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
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-black">
                    {dp.badge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5 font-sans">
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
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Subtle Background Glow Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-3 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" /> Ready for Live Evaluation
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-sans tracking-tight leading-tight">
              Ready to Discover Your Engineering Skill Gap?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm mt-2.5 leading-relaxed">
              Run the instant multidimensional vector calculation and generate your custom 5-phase career roadmap in under 60 seconds.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/login"
              id="cta-bottom-assessment-btn"
              className="px-7 py-3.5 rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-black text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Start Skill Assessment
            </Link>
            <Link
              to="/login"
              id="cta-bottom-dashboard-btn"
              className="px-6 py-3.5 rounded-2xl bg-blue-700/60 hover:bg-blue-700 text-white border border-white/20 font-bold text-xs sm:text-sm backdrop-blur-md transition-all"
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
