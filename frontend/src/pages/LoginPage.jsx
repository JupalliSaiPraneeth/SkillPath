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
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:pb-12 -translate-y-4 sm:-translate-y-6 md:-translate-y-8 font-sans">
      <div className="w-full max-w-md space-y-4 sm:space-y-5">

        {/* Header Branding */}
        <div className="text-center flex flex-col items-center mb-1">
          <Logo size="xl" className="mb-3" />

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
            Sign In to SkillPath Finder
          </h1>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
            Access your AI & O*NET 30.3 Career Guidance Workspace
          </p>
        </div>

        {/* Credentials Form Card (Clean, sharp border without glow/blur) */}
        <Card className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-white/80 dark:border-slate-800 shadow-xl dark:shadow-2xl">

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-xs font-bold text-rose-700 dark:text-rose-200 flex items-start gap-2.5 shadow-sm">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Account Email or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/95 dark:bg-slate-900 border border-slate-300/90 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#843bf1] focus:border-transparent shadow-sm font-medium disabled:opacity-50 transition-all"
                  placeholder="name@university.edu or admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  disabled={isSubmitting}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white/95 dark:bg-slate-900 border border-slate-300/90 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#843bf1] focus:border-transparent shadow-sm font-medium disabled:opacity-50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#843bf1] via-indigo-600 to-cyan-500 hover:from-[#722ada] hover:to-cyan-400 text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating with Database...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-600 dark:text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-[#843bf1] dark:text-[#a970fe] font-black hover:underline ml-1">
              Create Engineering Account
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default LoginPage;
