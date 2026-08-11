import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Target,
  Map,
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import CustomSelect from '../common/CustomSelect';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../common/Logo';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { careers, selectedCareer, selectCareer } = useCareer();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLanding = location.pathname === '/';

  // Extract first letter of name for initials avatar
  const userName = currentUser?.name?.trim() || 'Student';
  const firstLetter = (userName.charAt(0) || 'S').toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent border-0 transition-all duration-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Left Corner: Brand Logo (shown on Landing page or mobile view, hidden on Auth pages to avoid duplication) */}
        {isLanding ? (
          <div className="flex items-center shrink-0">
            <Logo size="lg" />
          </div>
        ) : isAuthPage ? (
          <div className="shrink-0" />
        ) : (
          <div className="flex items-center shrink-0 md:hidden">
            <Logo size="md" />
          </div>
        )}

        {/* Center: Command Center Target Role Selector or Landing Page Nav */}
        {!isLanding && !isAuthPage ? (
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-auto justify-center">
            <div className="w-full flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/30 shadow-sm hover:border-[#843bf1] backdrop-blur-md transition-all">
              <div className="p-1 rounded-full bg-[#843bf1]/15 text-[#843bf1] dark:text-[#a970fe] shrink-0">
                <Target className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-black tracking-wider text-[#843bf1] dark:text-[#a970fe] uppercase whitespace-nowrap">
                TARGET ROLE:
              </span>
              <div className="relative flex-1">
                <CustomSelect
                  value={selectedCareer?.id || 'car_fullstack'}
                  onChange={(val) => selectCareer(val)}
                  options={careers.map((c) => ({ value: c.id, label: c.title, badge: c.category }))}
                  placeholder="Select role…"
                  accentColor="purple"
                  size="sm"
                  id="navbar-career-select"
                  className="min-w-[220px]"
                />
              </div>
            </div>
          </div>
        ) : isLanding ? (
          <nav className="hidden lg:flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 p-1 rounded-full border border-[#843bf1]/30 backdrop-blur-md shadow-sm">
            <a
              href="#architecture-section"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#843bf1] dark:hover:text-[#a970fe] hover:bg-[#843bf1]/10 transition-all"
            >
              ML Architecture
            </a>
            <a
              href="#workflow-section"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#843bf1] dark:hover:text-[#a970fe] hover:bg-[#843bf1]/10 transition-all"
            >
              User Journey
            </a>
            <a
              href="#viva-defense-section"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#843bf1] dark:hover:text-[#a970fe] hover:bg-[#843bf1]/10 transition-all"
            >
              Viva Defense
            </a>
            <Link
              to="/model-evaluation"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all"
            >
              100% Accuracy Proof
            </Link>
          </nav>
        ) : null}

        {/* Right Corner: Theme Toggle & Executive Initials Profile */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:border-[#843bf1] dark:hover:border-[#843bf1] hover:text-[#843bf1] dark:hover:text-[#a970fe] hover:scale-105 transition-all shadow-md backdrop-blur-md cursor-pointer"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#843bf1] fill-[#843bf1]" />
            )}
          </button>

          {isLanding ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#843bf1] px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-xs font-black rounded-full bg-[#843bf1] hover:bg-[#722ada] text-white shadow-md shadow-[#843bf1]/30 transition-all transform hover:scale-105"
              >
                Launch Dashboard
              </Link>
            </div>
          ) : isAuthPage ? (
            <div className="flex items-center gap-2">
              {location.pathname === '/login' ? (
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-black rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 hover:border-[#843bf1] hover:text-[#843bf1] dark:hover:text-[#a970fe] transition-all shadow-sm backdrop-blur-md"
                >
                  Create Account
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-black rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 hover:border-[#843bf1] hover:text-[#843bf1] dark:hover:text-[#a970fe] transition-all shadow-sm backdrop-blur-md"
                >
                  Sign In
                </Link>
              )}
            </div>
          ) : (
            <div className="relative" ref={profileDropdownRef}>

              {/* Executive Profile Trigger Chip (With First Letter Logo) */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2.5 p-1 pl-1.5 pr-3.5 rounded-full border transition-all shadow-md backdrop-blur-md cursor-pointer ${isProfileOpen
                  ? 'bg-purple-50/80 dark:bg-purple-950/40 border-[#843bf1] ring-2 ring-[#843bf1]/30'
                  : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800 hover:border-[#843bf1]'
                  }`}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                {/* Initials Avatar Badge */}
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#843bf1] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#843bf1]/40">
                    {firstLetter}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
                </div>

                {/* Clean Profile Name */}
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    {userName.split(' ')[0]}
                  </p>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-[#843bf1] transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Executive Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in z-50">

                  {/* User Profile Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50/80 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-md ring-2 ring-blue-500/40 shrink-0">
                        {firstLetter}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 truncate">
                          {currentUser?.name || 'Sai Praneeth'}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {currentUser?.email || 'student@university.edu'}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-bold text-[9px]">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{currentUser?.role === 'admin' ? 'Super Admin' : 'Verified Student'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-2 space-y-0.5">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Engineering Profile</span>
                    </Link>

                    <Link
                      to="/roadmap"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors"
                    >
                      <Map className="w-4 h-4 text-slate-400" />
                      <span>5-Phase Learning Roadmap</span>
                    </Link>

                    <Link
                      to="/assessment"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors"
                    >
                      <ClipboardCheck className="w-4 h-4 text-slate-400" />
                      <span>Skill Assessment Bank</span>
                    </Link>
                  </div>

                  {/* Sign Out Action */}
                  <div className="p-2 border-t border-slate-200/80 dark:border-slate-800/80">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;
