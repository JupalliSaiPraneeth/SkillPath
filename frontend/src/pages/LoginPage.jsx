import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Logo from '../components/common/Logo';

export const LoginPage = () => {
  const { login, currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (currentUser.isNewUser && !currentUser.assessmentDone) {
        navigate('/assessment', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (!res || !res.success) {
        setErrorMessage(res?.error || 'Authentication failed. Please check your email and password.');
        setIsSubmitting(false);
        return;
      }

      const id = (email || '').toLowerCase().trim();
      if (id === 'admin' || id.includes('admin') || id.includes('faculty') || res.user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (res.user?.isNewUser && !res.user?.assessmentDone) {
        navigate('/assessment', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to authenticate with database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-8 font-sans">
      <div className="w-full max-w-md space-y-4 sm:space-y-5 my-auto">

        {/* Header Branding */}
        <div className="text-center flex flex-col items-center mb-2">
          <div className="hidden sm:flex justify-center items-center mb-2 sm:mb-3 translate-x-4 sm:translate-x-5">
            <Logo size="2xl" imgClassName="w-64 sm:w-80 md:w-96 max-h-16 sm:max-h-20 md:max-h-24 mx-auto" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-black font-heading tracking-tight drop-shadow-xs">
            Sign In to SkillPath Finder
          </h1>

          <p className="text-xs sm:text-sm font-bold text-black font-sans mt-1">
            Access your AI & O*NET 30.3 Career Guidance Workspace
          </p>
        </div>

        {/* Credentials Form Card (Ultramarine #0F129A & Peach Cream #FFEDDF Theme) */}
        <div className="rounded-3xl bg-[#FFEDDF]/95 dark:bg-[#FFEDDF]/95 backdrop-blur-xl border-2 border-[#0F129A]/20 shadow-2xl p-6 sm:p-8">

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-100 border border-rose-300 text-xs font-bold text-rose-800 flex items-start gap-2.5 shadow-sm">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#0F129A] uppercase tracking-wider mb-1.5 font-heading">
                Account Email or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#0F129A]/70 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#0F129A]/25 rounded-2xl text-xs text-[#0F129A] font-bold placeholder:text-[#0F129A]/40 focus:outline-none focus:border-[#0F129A] focus:ring-2 focus:ring-[#0F129A]/20 shadow-xs disabled:opacity-50 transition-all"
                  placeholder="name@university.edu or admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#0F129A] uppercase tracking-wider mb-1.5 font-heading">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#0F129A]/70 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  disabled={isSubmitting}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border-2 border-[#0F129A]/25 rounded-2xl text-xs text-[#0F129A] font-bold placeholder:text-[#0F129A]/40 focus:outline-none focus:border-[#0F129A] focus:ring-2 focus:ring-[#0F129A]/20 shadow-xs disabled:opacity-50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#0F129A]/70 hover:text-[#0F129A] cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-[#0F129A] hover:bg-[#0a0d78] text-[#FFEDDF] font-black text-xs sm:text-sm tracking-wider uppercase font-heading shadow-lg shadow-[#0F129A]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FFEDDF]" />
                  <span>Authenticating with Database...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter Workspace</span>
                  <ArrowRight className="w-4 h-4 text-[#FFEDDF]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#0F129A]/15 text-center text-xs text-[#0F129A]/80 font-bold">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-[#0F129A] font-black underline hover:text-[#0a0d78] ml-1">
              Create Engineering Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
