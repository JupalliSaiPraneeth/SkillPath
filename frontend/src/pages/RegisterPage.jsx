import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Target,
  School,
  Eye,
  EyeOff,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Logo from '../components/common/Logo';
import CustomSelect from '../components/common/CustomSelect';
import storageService from '../services/storageService';

export const RegisterPage = () => {
  const { register, currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Careers list
  const availableCareers = useMemo(() => {
    try {
      const stored = storageService.getCareers();
      if (stored && stored.length > 0) return stored;
    } catch (e) {
      console.warn('Fallback to standard careers list:', e);
    }
    return [
      { id: 'car_mle', title: 'Machine Learning Engineer', category: 'AI & Data' },
      { id: 'car_ds', title: 'Data Scientist', category: 'AI & Data' },
      { id: 'car_genai', title: 'Generative AI & LLM Specialist', category: 'AI & Data' },
      { id: 'car_fullstack', title: 'Full Stack Web Developer', category: 'Software & Web' },
      { id: 'car_frontend', title: 'Frontend Systems Engineer', category: 'Software & Web' },
      { id: 'car_backend', title: 'Backend & Distributed Systems Engineer', category: 'Software & Web' },
      { id: 'car_cloud_arch', title: 'Cloud Solutions Architect', category: 'Cloud & DevOps' },
      { id: 'car_devops', title: 'DevOps & Site Reliability Engineer', category: 'Cloud & DevOps' },
      { id: 'car_cybersecurity', title: 'Cybersecurity & Defense Analyst', category: 'Security & Systems' },
      { id: 'car_data_eng', title: 'Big Data & Pipeline Engineer', category: 'AI & Data' }
    ];
  }, []);

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
    'Electronics & Communication (ECE)',
    'Electrical & Electronics (EEE)',
    'Data Science & Analytics',
    'Software Engineering'
  ];

  // Validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await register(formData);
      if (!res || !res.success) {
        setErrorMessage(res?.error || 'Registration failed. Please check your details and try again.');
        setIsSubmitting(false);
        return;
      }

      navigate('/assessment');
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during account creation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-8 font-sans">
      <div className="w-full max-w-2xl space-y-2.5 sm:space-y-3 my-auto">

        {/* Header Branding */}
        <div className="text-center flex flex-col items-center mb-0.5">
          <Logo size="lg" className="mb-1.5" />

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
            Create Engineering Account
          </h1>

          <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
            Join SkillPath Finder for AI & O*NET 30.3 Career Intelligence
          </p>
        </div>

        {/* Credentials Form Card */}
        <Card
          className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-white/80 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-visible relative z-20"
          bodyClassName="p-4 sm:p-5"
        >

          {errorMessage && (
            <div className="mb-3.5 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-[11px] font-bold text-rose-700 dark:text-rose-200 flex items-start gap-2 shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-white/95 dark:bg-slate-900 border border-slate-300/90 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#843bf1] focus:border-transparent shadow-xs font-medium disabled:opacity-50 transition-all"
                    placeholder="e.g. Alex Rivera"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-white/95 dark:bg-slate-900 border border-slate-300/90 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#843bf1] focus:border-transparent shadow-xs font-medium disabled:opacity-50 transition-all"
                    placeholder="student@university.edu"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Degree & Branch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Degree Program
                </label>
                <CustomSelect
                  value={formData.degree}
                  onChange={(val) => setFormData({ ...formData, degree: val })}
                  options={degreeOptions}
                  icon={<GraduationCap className="w-3.5 h-3.5" />}
                  accentColor="purple"
                  placeholder="Select Degree..."
                  id="reg-degree-select"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Branch / Specialization
                </label>
                <CustomSelect
                  value={formData.education}
                  onChange={(val) => setFormData({ ...formData, education: val })}
                  options={branchOptions}
                  icon={<Briefcase className="w-3.5 h-3.5" />}
                  accentColor="purple"
                  placeholder="Select Branch..."
                  id="reg-branch-select"
                />
              </div>
            </div>

            {/* Row 3: College & Target Career */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  College / University
                </label>
                <div className="relative">
                  <School className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.college}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-white/95 dark:bg-slate-900 border border-slate-300/90 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#843bf1] focus:border-transparent shadow-xs font-medium disabled:opacity-50 transition-all"
                    placeholder="e.g. University / Institute"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Target Career Role
                </label>
                <CustomSelect
                  value={formData.targetCareerId}
                  onChange={(val) => setFormData({ ...formData, targetCareerId: val })}
                  options={availableCareers.map((c) => ({
                    value: c.id,
                    label: c.title,
                    badge: c.category,
                    group: c.category
                  }))}
                  icon={<Target className="w-3.5 h-3.5" />}
                  accentColor="purple"
                  placeholder="Select Target Career..."
                  id="reg-career-select"
                />
              </div>
            </div>

            {/* Row 4: Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-9 py-2 bg-white/95 dark:bg-slate-900 border border-slate-300/90 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#843bf1] focus:border-transparent shadow-xs font-medium disabled:opacity-50 transition-all"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-9 pr-9 py-2 bg-white/95 dark:bg-slate-900 border border-slate-300/90 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#843bf1] focus:border-transparent shadow-xs font-medium disabled:opacity-50 transition-all"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#843bf1] via-indigo-600 to-cyan-500 hover:from-[#722ada] hover:to-cyan-400 text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-[1.005] active:scale-[0.995] transition-all flex items-center justify-center gap-2 mt-3 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating Student Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Start Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Switch to Sign In */}
          <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-[11px] text-slate-600 dark:text-slate-400">
            Already have a registered account?{' '}
            <Link to="/login" className="text-[#843bf1] dark:text-[#a970fe] font-black hover:underline ml-1">
              Sign In to Workspace
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default RegisterPage;
