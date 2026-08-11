import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Target,
  Sparkles,
  School,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Check,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Code2,
  Database,
  Compass,
  UploadCloud,
  FileText,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Logo from '../components/common/Logo';
import CustomSelect from '../components/common/CustomSelect';
import storageService from '../services/storageService';
import MLEngine from '../services/mlEngine';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Wizard Step Management (1: Credentials, 2: Academics, 3: Career & Interests)
  const [currentStep, setCurrentStep] = useState(1);
  const [isAllInOneView, setIsAllInOneView] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    degree: 'Bachelor of Technology (B.Tech)',
    education: 'Computer Science & Engineering (CSE)',
    college: '',
    graduationYear: '2026',
    experience: 'Fresher / Student (0-1 Years)',
    targetCareerId: 'car_mle',
    interests: ['Machine Learning', 'Cloud Computing & AWS', 'Full Stack Web (React/Node)']
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeInterestCategory, setActiveInterestCategory] = useState('All');
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const careerDropdownRef = useRef(null);
  const experienceDropdownRef = useRef(null);
  const resumeInputRef = useRef(null);

  // Resume upload state
  const [resumeUpload, setResumeUpload] = useState({ status: 'idle', fileName: '', skills: [], education: '', experience: '' });
  const [isDragOver, setIsDragOver] = useState(false);

  // Map MLEngine education output → formData.degree values
  const mapEducation = (edu) => {
    if (!edu) return formData.degree;
    const e = edu.toLowerCase();
    if (e.includes('master') || e.includes('m.tech') || e.includes('m.s')) return 'Master of Technology (M.Tech)';
    if (e.includes('phd') || e.includes('doctorate')) return 'Ph.D. / Doctorate';
    if (e.includes('mca')) return 'MCA / Computer Applications';
    if (e.includes('b.sc') || e.includes('b.s.') || e.includes('bachelor of science')) return 'Bachelor of Science (B.Sc)';
    return 'Bachelor of Technology (B.Tech)';
  };

  // Map MLEngine experience output → formData.experience values
  const mapExperience = (exp) => {
    if (!exp) return formData.experience;
    const e = exp.toLowerCase();
    if (e.includes('5+') || e.includes('senior')) return '5+ Years (Senior / Lead)';
    if (e.includes('3') || e.includes('4') || e.includes('mid')) return '3-4 Years (Mid-Level Engineer)';
    if (e.includes('2') || e.includes('junior')) return '1-2 years (Academic & Projects)';
    return 'Fresher / Student (0-1 Years)';
  };

  const handleResumeUpload = (file) => {
    if (!file) return;
    setResumeUpload({ status: 'parsing', fileName: file.name, skills: [], education: '', experience: '' });
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const result = MLEngine.parseResumeText(text, null);
      if (!result) {
        setResumeUpload((s) => ({ ...s, status: 'error' }));
        return;
      }
      const mappedDegree = mapEducation(result.detectedEducation);
      const mappedExp   = mapExperience(result.detectedExperience);
      setFormData((fd) => ({ ...fd, degree: mappedDegree, experience: mappedExp }));
      setResumeUpload({
        status: 'done',
        fileName: file.name,
        skills: result.detectedSkills || [],
        education: result.detectedEducation || '',
        experience: result.detectedExperience || '',
      });
    };
    reader.onerror = () => setResumeUpload((s) => ({ ...s, status: 'error' }));
    reader.readAsText(file);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (careerDropdownRef.current && !careerDropdownRef.current.contains(e.target)) setCareerDropdownOpen(false);
      if (experienceDropdownRef.current && !experienceDropdownRef.current.contains(e.target)) setExperienceDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);


  // Load all available careers from storage service
  const availableCareers = useMemo(() => {
    try {
      const stored = storageService.getCareers();
      if (stored && stored.length > 0) return stored;
    } catch (e) {
      console.warn('Fallback to standard careers list:', e);
    }
    return [
      { id: 'car_mle', title: 'Machine Learning Engineer', socCode: '15-2051.00', category: 'AI & Data', salaryRange: '$125,000 - $185,000' },
      { id: 'car_ds', title: 'Data Scientist', socCode: '15-2051.00', category: 'AI & Data', salaryRange: '$115,000 - $170,000' },
      { id: 'car_genai', title: 'Generative AI & LLM Specialist', socCode: '15-1252.00', category: 'AI & Data', salaryRange: '$140,000 - $210,000' },
      { id: 'car_fullstack', title: 'Full Stack Web Developer', socCode: '15-1254.00', category: 'Software & Web', salaryRange: '$105,000 - $160,000' },
      { id: 'car_frontend', title: 'Frontend Systems Engineer', socCode: '15-1254.00', category: 'Software & Web', salaryRange: '$100,000 - $150,000' },
      { id: 'car_backend', title: 'Backend & Distributed Systems Engineer', socCode: '15-1252.00', category: 'Software & Web', salaryRange: '$115,000 - $175,000' },
      { id: 'car_cloud_arch', title: 'Cloud Solutions Architect', socCode: '15-1211.00', category: 'Cloud & DevOps', salaryRange: '$130,000 - $190,000' },
      { id: 'car_devops', title: 'DevOps & Site Reliability Engineer', socCode: '15-1252.00', category: 'Cloud & DevOps', salaryRange: '$120,000 - $175,000' },
      { id: 'car_cybersecurity', title: 'Cybersecurity & Defense Analyst', socCode: '15-1212.00', category: 'Security & Systems', salaryRange: '$110,000 - $165,000' },
      { id: 'car_data_eng', title: 'Big Data & Pipeline Engineer', socCode: '15-1243.00', category: 'AI & Data', salaryRange: '$120,000 - $175,000' }
    ];
  }, []);

  // Currently selected career details
  const selectedCareerInfo = useMemo(() => {
    return availableCareers.find((c) => c.id === formData.targetCareerId) || availableCareers[0];
  }, [availableCareers, formData.targetCareerId]);

  // Group careers by category for the custom dropdown
  const careersByCategory = useMemo(() => {
    return availableCareers.reduce((acc, car) => {
      const cat = car.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(car);
      return acc;
    }, {});
  }, [availableCareers]);

  const degreeOptions = [
    'Bachelor of Technology (B.Tech)',
    'Bachelor of Engineering (B.E.)',
    'Master of Technology (M.Tech)',
    'Master of Science (M.S. / M.Sc)',
    'Bachelor of Science (B.Sc in CS/IT)',
    'Master of Computer Applications (MCA)',
    'Bachelor of Computer Applications (BCA)'
  ];

  const branchOptions = [
    'Computer Science & Engineering (CSE)',
    'Artificial Intelligence & Data Science (AI & DS)',
    'Information Technology (IT)',
    'Cybersecurity & Information Defense',
    'Electronics & Communication Engineering (ECE)',
    'Electrical & Electronics Engineering (EEE)',
    'Data Science & Business Analytics',
    'Software Engineering'
  ];

  const popularColleges = [
    'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani',
    'NIT Trichy', 'NIT Surathkal', 'IIIT Hyderabad', 'Anna University',
    'VTU Affiliated College', 'JNTU Affiliated College'
  ];

  const experienceOptions = [
    { label: 'Fresher / Student (0-1 Years)', desc: 'Undergraduate student building fundamental academic projects' },
    { label: '1-2 Years (Internships & Projects)', desc: 'Completed internships, capstone projects, or freelance work' },
    { label: '2-3 Years (Junior Software Engineer)', desc: 'Junior software developer targeting role transition or promotion' },
    { label: '3+ Years (Experienced Professional)', desc: 'Mid-level engineer upskilling in AI, Cloud, or Distributed Systems' }
  ];

  const categorizedInterests = {
    'AI & ML': [
      'Machine Learning',
      'Deep Learning & PyTorch',
      'Generative AI & LLMs',
      'Natural Language Processing',
      'Computer Vision & OpenCV',
      'Explainable AI (SHAP/LIME)',
      'MLOps & Deployment'
    ],
    'Web & Frontend': [
      'Full Stack Web (React/Node)',
      'Next.js & Server Components',
      'Tailwind CSS & Design Systems',
      'TypeScript & Modern ESNext',
      'GraphQL & REST APIs'
    ],
    'Cloud & DevOps': [
      'Cloud Computing & AWS',
      'Docker & Containerization',
      'Kubernetes (K8s) Cluster Mgmt',
      'CI/CD Pipelines & GitHub Actions',
      'Infrastructure as Code (Terraform)'
    ],
    'Data & Security': [
      'Data Engineering & Apache Spark',
      'SQL & PostgreSQL Optimization',
      'Cybersecurity & Ethical Hacking',
      'System Design & Distributed Scalability',
      'Data Structures & Algorithms'
    ]
  };

  const allInterestsList = useMemo(() => {
    return Object.values(categorizedInterests).flat();
  }, []);

  const displayedInterests = useMemo(() => {
    if (activeInterestCategory === 'All') return allInterestsList;
    return categorizedInterests[activeInterestCategory] || allInterestsList;
  }, [activeInterestCategory, allInterestsList]);

  // Password Strength Calculation
  const passwordScore = useMemo(() => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score += 25;
    if (p.length >= 10) score += 25;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score += 25;
    if (/[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p)) score += 25;
    return score;
  }, [formData.password]);

  const passwordStrengthLabel = useMemo(() => {
    if (passwordScore === 0) return { text: 'Enter password', color: 'text-slate-400', barBg: 'bg-slate-200 dark:bg-slate-700' };
    if (passwordScore <= 25) return { text: 'Weak', color: 'text-rose-500', barBg: 'bg-rose-500' };
    if (passwordScore <= 50) return { text: 'Fair', color: 'text-amber-500', barBg: 'bg-amber-500' };
    if (passwordScore <= 75) return { text: 'Good', color: 'text-blue-500', barBg: 'bg-blue-500' };
    return { text: 'Strong & Secure', color: 'text-emerald-500', barBg: 'bg-emerald-500' };
  }, [passwordScore]);

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsMismatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;

  // Toggle Technical Interest Pill
  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  // Quick Select Starter Pack for Technical Interests
  const selectStarterPack = (category) => {
    const items = categorizedInterests[category] || allInterestsList.slice(0, 4);
    setFormData((prev) => {
      const merged = Array.from(new Set([...prev.interests, ...items.slice(0, 3)]));
      return { ...prev, interests: merged };
    });
  };

  // Step Validation Helpers
  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your Full Name to continue.');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid academic or personal email address.');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please ensure both passwords are identical.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const validateStep2 = () => {
    if (!formData.college.trim()) {
      setErrorMessage('Please enter your University or College name.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setErrorMessage('');
    setCurrentStep((prev) => Math.min(3, prev + 1));
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2()) {
      setCurrentStep(2);
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await register(formData);
      if (!res || !res.success) {
        setErrorMessage(res?.error || 'Registration failed. Please check your credentials and try again.');
        setIsSubmitting(false);
        return;
      }

      // Smooth transition to assessment page
      navigate('/assessment');
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during account creation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center relative">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 ambient-blob-1 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 ambient-blob-2 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl">
        
        {/* Main Grid Layout: Left Hero Showcase & Right Interactive Form Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: HERO VALUE PROPOSITION & LIVE TARGET CAREER MATCHER          */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
            
            {/* Header Badge & Title */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>O*NET 30.3 ML-Engine Platform</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                Engineering Student <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                  Career Acceleration
                </span>
              </h1>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Initialize your individualized skill radar, calibrate 43-dimension industry gap analytics, and unlock personalized week-by-week learning roadmaps.
              </p>
            </div>

            {/* Live Interactive Target Career Preview Card */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                  <Target className="w-4 h-4" />
                  <span>Target Role Matcher</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  SOC {selectedCareerInfo?.socCode || '15-2051.00'}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 leading-snug">
                {selectedCareerInfo?.title || 'Machine Learning Engineer'}
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {selectedCareerInfo?.description || 'Designs, builds, and deploys high-impact predictive AI pipelines.'}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Market Compensation</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedCareerInfo?.salaryRange || '$125,000 - $185,000'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Interests</span>
                  <span className="font-bold text-blue-600 dark:text-cyan-400">
                    {formData.interests.length} Specializations
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Algorithmic Skill Gap Radar</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Continuous evaluation with multi-dimensional cosine similarity matching.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">5-Phase Milestone Roadmap</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Curated engineering learning paths from core math to production cloud deployment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Explainable AI & Confidence</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Transparent SHAP feature weightings explaining exactly why skills were recommended.
                  </p>
                </div>
              </div>

            </div>

            {/* Institutional Trust Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50/80 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200/60 dark:border-blue-900/40 flex items-center gap-3">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-slate-900">A</div>
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-slate-900">S</div>
                <div className="w-7 h-7 rounded-full bg-cyan-600 text-white font-black text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-slate-900">R</div>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-slate-100">1,200+ Engineering Students</span> actively mapping skill trajectories.
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: INTERACTIVE REGISTRATION STUDIO CARD                       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl" glow>
              
              {/* Header inside Card */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                        Create Engineering Account
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isAllInOneView ? 'Complete your student profile in one view' : `Step ${currentStep} of 3 • Personalized Assessment Setup`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* View Mode Toggle Button (Wizard vs All-in-One) */}
                <button
                  type="button"
                  onClick={() => setIsAllInOneView(!isAllInOneView)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
                >
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isAllInOneView ? 'Switch to Step Wizard' : 'Show All Fields'}</span>
                </button>
              </div>

              {/* Multi-Step Interactive Navigation Tabs (Visible in Wizard Mode) */}
              {!isAllInOneView && (
                <div className="mb-6">
                  {/* Step Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>

                  {/* Step Tab Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setCurrentStep(1);
                      }}
                      className={`p-2.5 rounded-2xl text-left transition-all border flex items-center gap-2.5 ${
                        currentStep === 1
                          ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/50 shadow-xs ring-1 ring-blue-500/20'
                          : currentStep > 1
                          ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                          : 'bg-slate-50/50 dark:bg-slate-900/30 border-transparent text-slate-400'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        currentStep === 1
                          ? 'bg-blue-600 text-white shadow-xs'
                          : currentStep > 1
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                      </div>
                      <div className="min-w-0 hidden sm:block">
                        <span className="text-[11px] font-black block text-slate-800 dark:text-slate-200 truncate">Account</span>
                        <span className="text-[10px] text-slate-400 block truncate">Credentials</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep1()) {
                          setErrorMessage('');
                          setCurrentStep(2);
                        }
                      }}
                      className={`p-2.5 rounded-2xl text-left transition-all border flex items-center gap-2.5 ${
                        currentStep === 2
                          ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/50 shadow-xs ring-1 ring-blue-500/20'
                          : currentStep > 2
                          ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                          : 'bg-slate-50/50 dark:bg-slate-900/30 border-transparent text-slate-400'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        currentStep === 2
                          ? 'bg-blue-600 text-white shadow-xs'
                          : currentStep > 2
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                      </div>
                      <div className="min-w-0 hidden sm:block">
                        <span className="text-[11px] font-black block text-slate-800 dark:text-slate-200 truncate">Academics</span>
                        <span className="text-[10px] text-slate-400 block truncate">College & Branch</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep1() && validateStep2()) {
                          setErrorMessage('');
                          setCurrentStep(3);
                        }
                      }}
                      className={`p-2.5 rounded-2xl text-left transition-all border flex items-center gap-2.5 ${
                        currentStep === 3
                          ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/50 shadow-xs ring-1 ring-blue-500/20'
                          : 'bg-slate-50/50 dark:bg-slate-900/30 border-transparent text-slate-400'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        currentStep === 3
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        3
                      </div>
                      <div className="min-w-0 hidden sm:block">
                        <span className="text-[11px] font-black block text-slate-800 dark:text-slate-200 truncate">Career Goal</span>
                        <span className="text-[10px] text-slate-400 block truncate">O*NET & Skills</span>
                      </div>
                    </button>

                  </div>
                </div>
              )}

              {/* Zero Skill Baseline Banner */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-cyan-50/80 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-slate-900/80 border border-blue-200/80 dark:border-blue-800/60 flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-black text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <span>0% Skill Baseline Initialization</span>
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-cyan-300 font-mono">
                      Deterministic
                    </span>
                  </p>
                  <p className="text-blue-700/90 dark:text-blue-300/90 mt-1 leading-relaxed">
                    All technical skill scores begin at <strong>0%</strong> until you complete the scenario assessment or calibrate your proficiency sliders in the workspace.
                  </p>
                </div>
              </div>

              {/* Error Message Notice */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-xs font-bold text-rose-700 dark:text-rose-300 flex items-start gap-3 shadow-xs animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="block font-black">Registration Error</span>
                    <span className="font-normal text-rose-600 dark:text-rose-400">{errorMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* ================================================================= */}
                {/* SECTION 1: ACCOUNT & PERSONAL CREDENTIALS                         */}
                {/* ================================================================= */}
                {(isAllInOneView || currentStep === 1) && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <h3 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-blue-500" />
                        <span>1. Personal & Login Credentials</span>
                      </h3>
                      <span className="text-[10px] text-slate-400">All fields required *</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                          <User className="w-4 h-4 text-slate-400 group-focus-within:text-blue-500 absolute left-3.5 top-3.5 transition-colors pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs font-medium transition-all"
                            placeholder="e.g. Alex Rivera"
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                          <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-blue-500 absolute left-3.5 top-3.5 transition-colors pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs font-medium transition-all"
                            placeholder="student@university.edu"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Passwords Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Password <span className="text-rose-500">*</span>
                          </label>
                          {formData.password && (
                            <span className={`text-[10px] font-bold ${passwordStrengthLabel.color}`}>
                              {passwordStrengthLabel.text}
                            </span>
                          )}
                        </div>
                        <div className="relative group">
                          <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-blue-500 absolute left-3.5 top-3.5 transition-colors pointer-events-none" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs font-medium transition-all"
                            placeholder="Minimum 6 characters"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        {/* Password Strength Meter */}
                        {formData.password && (
                          <div className="mt-2 space-y-1">
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${passwordStrengthLabel.barBg}`}
                                style={{ width: `${Math.max(10, passwordScore)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Confirm Password <span className="text-rose-500">*</span>
                          </label>
                          {formData.confirmPassword && (
                            <span className={`text-[10px] font-bold ${passwordsMatch ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {passwordsMatch ? '✓ Matched' : '✗ Mismatch'}
                            </span>
                          )}
                        </div>
                        <div className="relative group">
                          <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-blue-500 absolute left-3.5 top-3.5 transition-colors pointer-events-none" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className={`w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-900 border rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 shadow-xs font-medium transition-all ${
                              passwordsMismatch
                                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                                : passwordsMatch
                                ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20'
                                : 'border-slate-300 dark:border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/20'
                            }`}
                            placeholder="Re-enter password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* SECTION 2: ACADEMIC & EDUCATION BACKGROUND                        */}
                {/* ================================================================= */}
                {(isAllInOneView || currentStep === 2) && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <h3 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
                        <span>2. Academic & Education Background</span>
                      </h3>
                      <span className="text-[10px] text-slate-400">Engineering Profile</span>
                    </div>

                    {/* ─── Resume Upload Auto-Fill Strip ─────────────────────────── */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={(e) => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleResumeUpload(f); }}
                      className={[
                        'relative rounded-2xl border-2 border-dashed transition-all duration-200',
                        isDragOver
                          ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40'
                          : resumeUpload.status === 'done'
                            ? 'border-emerald-400/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                            : 'border-slate-300/60 dark:border-slate-700/60 bg-slate-50/40 dark:bg-slate-800/20 hover:border-blue-400/70 hover:bg-blue-50/30',
                      ].join(' ')}
                    >
                      {resumeUpload.status !== 'done' ? (
                        <label className="flex flex-col sm:flex-row items-center gap-4 p-4 cursor-pointer">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                            resumeUpload.status === 'parsing'
                              ? 'bg-blue-100 dark:bg-blue-900/50'
                              : 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40'
                          }`}>
                            {resumeUpload.status === 'parsing'
                              ? <Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
                              : <UploadCloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            }
                          </div>
                          <div className="text-center sm:text-left flex-1">
                            <p className="text-xs font-black text-slate-900 dark:text-slate-100">
                              {resumeUpload.status === 'parsing' ? 'Extracting data from resume…' : 'Upload Resume to Auto-Fill'}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {resumeUpload.status === 'parsing'
                                ? 'Running NLP pipeline — degree, experience & skills are being detected'
                                : 'Drop PDF / TXT / DOCX here — degree, experience & skills auto-detected instantly'}
                            </p>
                          </div>
                          {resumeUpload.status !== 'parsing' && (
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); resumeInputRef.current?.click(); }}
                              className="shrink-0 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black transition-colors shadow-md shadow-blue-500/25"
                            >
                              Browse File
                            </button>
                          )}
                          <input
                            ref={resumeInputRef}
                            type="file"
                            accept=".txt,.pdf,.docx,.doc,.md"
                            className="hidden"
                            onChange={(e) => handleResumeUpload(e.target.files[0])}
                          />
                        </label>
                      ) : (
                        <div className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                <p className="text-xs font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Resume parsed successfully
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[240px]">{resumeUpload.fileName}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setResumeUpload({ status: 'idle', fileName: '', skills: [], education: '', experience: '' })}
                              className="shrink-0 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                              <X className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              🎓 {resumeUpload.education}
                            </span>
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                              💼 {resumeUpload.experience}
                            </span>
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              ✦ {resumeUpload.skills.length} skills detected
                            </span>
                          </div>

                          {resumeUpload.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {resumeUpload.skills.slice(0, 14).map((s) => (
                                <span key={s.id} className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                  {s.name}
                                </span>
                              ))}
                              {resumeUpload.skills.length > 14 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                                  +{resumeUpload.skills.length - 14} more
                                </span>
                              )}
                            </div>
                          )}

                          <p className="text-[10px] text-slate-400 font-medium">
                            ✓ Degree &amp; experience fields auto-filled below — review and adjust if needed.
                          </p>
                        </div>
                      )}

                      {resumeUpload.status === 'error' && (
                        <div className="flex items-center gap-2 px-4 pb-3">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <p className="text-xs font-bold text-rose-600 dark:text-rose-400">Could not read file content. Try a plain-text .txt resume.</p>
                        </div>
                      )}
                    </div>
                    {/* ─────────────────────────────────────────────────────────────── */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {/* Degree Program */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Degree Program
                        </label>
                        <CustomSelect
                          value={formData.degree}
                          onChange={(val) => setFormData({ ...formData, degree: val })}
                          options={degreeOptions}
                          accentColor="blue"
                          id="reg-degree"
                        />
                      </div>

                      {/* Branch / Specialization */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Branch / Specialization
                        </label>
                        <CustomSelect
                          value={formData.education}
                          onChange={(val) => setFormData({ ...formData, education: val })}
                          options={branchOptions}
                          accentColor="blue"
                          id="reg-branch"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* University / College Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          University / Institute Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                          <School className="w-4 h-4 text-slate-400 group-focus-within:text-blue-500 absolute left-3.5 top-3.5 transition-colors pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs font-medium transition-all"
                            placeholder="e.g. National Institute of Technology"
                          />
                        </div>

                        {/* Quick Campus Suggestion Chips */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {popularColleges.slice(0, 4).map((col) => (
                            <button
                              type="button"
                              key={col}
                              onClick={() => setFormData({ ...formData, college: col })}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors"
                            >
                              + {col}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Graduation Year */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Graduation Year
                        </label>
                        <CustomSelect
                          value={formData.graduationYear}
                          onChange={(val) => setFormData({ ...formData, graduationYear: val })}
                          options={[
                            { value: '2025', label: '2025 (Graduated / Immediate Joiner)' },
                            { value: '2026', label: '2026 (Final Year Engineering Student)' },
                            { value: '2027', label: '2027 (Pre-Final Year / 3rd Year)' },
                            { value: '2028', label: '2028 (Sophomore / 2nd Year)' },
                            { value: '2029', label: '2029 (1st Year Engineering)' },
                          ]}
                          accentColor="blue"
                          icon={<span className="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>}
                          id="reg-grad-year"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* SECTION 3: CAREER GOAL & TECHNICAL DOMAIN INTERESTS               */}
                {/* ================================================================= */}
                {(isAllInOneView || currentStep === 3) && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <h3 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-emerald-500" />
                        <span>3. Target Career & Domain Specialization</span>
                      </h3>
                      <span className="text-[10px] text-slate-400">O*NET Calibration</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Target O*NET Career Role — Custom Dropdown */}
                      <div ref={careerDropdownRef} className="relative">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                          <Target className="w-3 h-3 text-indigo-500" />
                          Target Career Role <span className="text-rose-500">*</span>
                        </label>
                        {/* Trigger button */}
                        <button
                          type="button"
                          onClick={() => { setCareerDropdownOpen(o => !o); setExperienceDropdownOpen(false); }}
                          className={`w-full flex items-center justify-between gap-2 px-3.5 py-3 rounded-2xl text-left transition-all duration-200 border-2 shadow-sm ${
                            careerDropdownOpen
                              ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                              : 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 truncate">
                              {selectedCareerInfo?.title || 'Select a career role'}
                            </span>
                            {selectedCareerInfo?.category && (
                              <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                                {selectedCareerInfo.category}
                              </span>
                            )}
                          </div>
                          <ChevronDown className={`w-4 h-4 shrink-0 text-indigo-400 transition-transform duration-200 ${careerDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown panel */}
                        {careerDropdownOpen && (
                          <div className="absolute z-50 top-full mt-2 left-0 right-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-500/10 overflow-hidden"
                            style={{ animation: 'dropdownSlideIn 0.18s cubic-bezier(0.16,1,0.3,1)' }}>
                            <style>{`@keyframes dropdownSlideIn { from { opacity:0; transform:translateY(-8px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
                            <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5">
                              {Object.entries(careersByCategory).map(([category, careers]) => (
                                <div key={category}>
                                  {/* Category header */}
                                  <div className="px-3 pt-2 pb-1">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{category}</span>
                                  </div>
                                  {/* Career items */}
                                  {careers.map((car) => {
                                    const isSelected = formData.targetCareerId === car.id;
                                    return (
                                      <button
                                        key={car.id}
                                        type="button"
                                        onClick={() => { setFormData({ ...formData, targetCareerId: car.id }); setCareerDropdownOpen(false); }}
                                        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                                          isSelected
                                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25'
                                            : 'hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                            isSelected ? 'bg-white' : 'bg-indigo-400 dark:bg-indigo-600'
                                          }`} />
                                          <span className="text-xs font-semibold truncate">{car.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                          {car.salaryRange && (
                                            <span className={`text-[10px] font-bold ${
                                              isSelected ? 'text-green-200' : 'text-emerald-600 dark:text-emerald-400'
                                            }`}>
                                              {car.salaryRange.split(' - ')[0]}
                                            </span>
                                          )}
                                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                            {/* Footer hint */}
                            <div className="border-t border-slate-100 dark:border-slate-800 px-4 py-2 flex items-center gap-2">
                              <Sparkles className="w-3 h-3 text-indigo-400" />
                              <span className="text-[10px] text-slate-400 dark:text-slate-500">O*NET SOC-calibrated career tracks</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Current Experience Level — Custom Dropdown */}
                      <div ref={experienceDropdownRef} className="relative">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-blue-500" />
                          Current Experience Level
                        </label>
                        {/* Trigger button */}
                        <button
                          type="button"
                          onClick={() => { setExperienceDropdownOpen(o => !o); setCareerDropdownOpen(false); }}
                          className={`w-full flex items-center justify-between gap-2 px-3.5 py-3 rounded-2xl text-left transition-all duration-200 border-2 shadow-sm ${
                            experienceDropdownOpen
                              ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Briefcase className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {formData.experience || 'Select experience level'}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${experienceDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown panel */}
                        {experienceDropdownOpen && (
                          <div className="absolute z-50 top-full mt-2 left-0 right-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10 overflow-hidden"
                            style={{ animation: 'dropdownSlideIn 0.18s cubic-bezier(0.16,1,0.3,1)' }}>
                            <div className="p-1.5 space-y-0.5">
                              {experienceOptions.map((exp) => {
                                const isSelected = formData.experience === exp.label;
                                return (
                                  <button
                                    key={exp.label}
                                    type="button"
                                    onClick={() => { setFormData({ ...formData, experience: exp.label }); setExperienceDropdownOpen(false); }}
                                    className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 ${
                                      isSelected
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                                        : 'hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                                      isSelected
                                        ? 'border-white bg-white/20'
                                        : 'border-slate-300 dark:border-slate-600'
                                    }`}>
                                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <div className="min-w-0">
                                      <p className={`text-xs font-bold leading-snug ${isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                                        {exp.label}
                                      </p>
                                      <p className={`text-[10px] mt-0.5 leading-snug ${
                                        isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                                      }`}>
                                        {exp.desc}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Technical Domain Interests Selection */}
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Technical Interests & Domain Focus</span>
                        </label>
                        <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400">
                          {formData.interests.length} Selected
                        </span>
                      </div>

                      {/* Filter Chips by Category */}
                      <div className="flex flex-wrap gap-1.5 pb-1">
                        {['All', 'AI & ML', 'Web & Frontend', 'Cloud & DevOps', 'Data & Security'].map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setActiveInterestCategory(cat)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                              activeInterestCategory === cat
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Technical Interest Pills */}
                      <div className="flex flex-wrap gap-2 pt-1 max-h-48 overflow-y-auto pr-1">
                        {displayedInterests.map((interest) => {
                          const selected = formData.interests.includes(interest);
                          return (
                            <button
                              type="button"
                              key={interest}
                              onClick={() => toggleInterest(interest)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border transform active:scale-95 ${
                                selected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 ring-2 ring-blue-500/30'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-slate-800'
                              }`}
                            >
                              {selected ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                              )}
                              <span>{interest}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* ACTION CONTROLS & WIZARD NAVIGATION                               */}
                {/* ================================================================= */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  
                  {/* Left Action: Previous Step in Wizard */}
                  {!isAllInOneView && currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div className="hidden sm:block text-[11px] text-slate-400">
                      ⚡ Immediate Supabase DB Sync
                    </div>
                  )}

                  {/* Right Action: Next Step OR Final Submit */}
                  {!isAllInOneView && currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow transition-all flex items-center justify-center gap-2"
                    >
                      <span>Continue to {currentStep === 1 ? 'Academics' : 'Career Goal'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Creating Student Account & Calibrating...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account & Start Skill Assessment</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}

                </div>

              </form>

              {/* Footer Switch to Sign In */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Already have a verified student or faculty account?</span>
                <Link to="/login" className="text-blue-600 dark:text-cyan-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>Sign In to Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </Card>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
