import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import {
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Target,
  Map,
  ClipboardCheck,
  CheckCircle2,
  Menu,
  X,
  LayoutDashboard,
  Award,
  TrendingUp,
  FileSearch,
  Brain,
  CheckCheck,
  Briefcase
} from 'lucide-react';
import CustomSelect from '../common/CustomSelect';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../common/Logo';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { careers, selectedCareer, selectCareer, gapAnalysis } = useCareer();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);

  const profileDropdownRef = useRef(null);
  const drawerBackdropRef = useRef(null);
  const drawerPanelRef = useRef(null);
  const drawerNavContainerRef = useRef(null);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLanding = location.pathname === '/';

  // Extract first letter of name for initials avatar
  const userName = currentUser?.name?.trim() || 'Student';
  const firstLetter = (userName.charAt(0) || 'S').toUpperCase();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smooth GSAP Close Handler
  const closeMobileMenu = useCallback(() => {
    if (drawerPanelRef.current && drawerBackdropRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsMobileMenuOpen(false);
          setIsMobileMenuMounted(false);
          document.body.style.overflow = '';
        }
      });

      tl.to(drawerPanelRef.current, {
        x: '-100%',
        duration: 0.32,
        ease: 'power3.in'
      }, 0);

      tl.to(drawerBackdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      }, 0.05);
    } else {
      setIsMobileMenuOpen(false);
      setIsMobileMenuMounted(false);
      document.body.style.overflow = '';
    }
  }, []);

  // Smooth GSAP Open Handler
  const openMobileMenu = () => {
    setIsMobileMenuMounted(true);
    setIsMobileMenuOpen(true);
  };

  // Close mobile drawer on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
    setIsProfileOpen(false);
  }, [location.pathname, closeMobileMenu]);

  // GSAP animation when drawer mounts
  useEffect(() => {
    if (isMobileMenuMounted && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const ctx = gsap.context(() => {
        // 1. Backdrop Fade In
        if (drawerBackdropRef.current) {
          gsap.fromTo(
            drawerBackdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: 'power2.out' }
          );
        }

        // 2. Drawer Panel Slide in smoothly from Left
        if (drawerPanelRef.current) {
          gsap.fromTo(
            drawerPanelRef.current,
            { x: '-100%' },
            {
              x: '0%',
              duration: 0.45,
              ease: 'power3.out'
            }
          );
        }

        // 3. Stagger individual items in
        const navElements = drawerNavContainerRef.current?.querySelectorAll('.gsap-drawer-item');
        if (navElements && navElements.length > 0) {
          gsap.fromTo(
            navElements,
            { x: -22, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.025,
              ease: 'power2.out',
              delay: 0.1
            }
          );
        }
      });

      return () => {
        ctx.revert();
      };
    }
  }, [isMobileMenuMounted, isMobileMenuOpen]);

  const handleLogout = () => {
    setIsProfileOpen(false);
    closeMobileMenu();
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { to: '/career-roles', label: 'Career Roles & O*NET', icon: Briefcase, badge: '1,016' },
    { to: '/assessment', label: 'Skill Assessment', icon: ClipboardCheck },
    {
      to: '/skill-gap',
      label: 'Skill Gap Analysis',
      icon: Target,
      badge: gapAnalysis?.priorityCounts?.high > 0 ? `${gapAnalysis.priorityCounts.high} High` : null,
      badgeType: 'warning'
    },
    { to: '/career-recommendations', label: 'Career Recommendations', icon: Award },
    { to: '/future-skills', label: 'Future Skills Forecast', icon: TrendingUp },
    { to: '/roadmap', label: 'Learning Roadmap', icon: Map },
    { to: '/resume-analyzer', label: 'Resume NLP Analyzer', icon: FileSearch },
    { to: '/explainable-ai', label: 'Explainable AI (SHAP)', icon: Brain },
    { to: '/model-evaluation', label: 'Model Evaluation (Viva)', icon: CheckCheck },
    { to: '/profile', label: 'Engineering Profile', icon: User }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-transparent border-0 transition-all duration-200">
        <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-4">

          {/* Left Corner: Brand Logo and Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            {!isLanding && !isAuthPage && (
              <button
                onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                className="md:hidden p-1.5 sm:p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#843bf1] transition-all shadow-sm shrink-0 cursor-pointer"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#843bf1]" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-200" />}
              </button>
            )}

            {isLanding ? (
              <Logo size="xl" />
            ) : isAuthPage ? (
              <div className="flex items-center shrink-0">
                <Logo size="md" imgClassName="w-28 xs:w-32 sm:w-36 max-h-8 sm:max-h-9" />
              </div>
            ) : (
              <div className="flex items-center shrink-0 md:hidden">
                <Logo size="xl" />
              </div>
            )}
          </div>

          {/* Center: Command Center Target Role Selector or Landing Page Nav */}
          {!isLanding && !isAuthPage ? (
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-auto justify-center">
              <div className="w-full flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFF9F5]/95 dark:bg-[#0a0d42]/90 border-2 border-[#0F129A]/25 dark:border-[#FFEDDF]/30 shadow-md shadow-[#0F129A]/5 hover:border-[#0F129A] dark:hover:border-[#FFEDDF] backdrop-blur-md transition-all">
                <div className="p-1 rounded-full bg-[#0F129A]/15 dark:bg-[#FFEDDF]/15 text-[#0F129A] dark:text-[#FFEDDF] shrink-0">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-black tracking-wider text-[#0F129A] dark:text-[#FFEDDF] uppercase whitespace-nowrap font-heading">
                  TARGET ROLE:
                </span>
                <div className="relative flex-1">
                  <CustomSelect
                    value={selectedCareer?.id || 'car_fullstack'}
                    onChange={(val) => selectCareer(val)}
                    options={careers.map((c) => ({ value: c.id, label: c.title, badge: c.category }))}
                    placeholder="Select role…"
                    accentColor="ultramarine"
                    size="sm"
                    id="navbar-career-select"
                    className="min-w-[220px]"
                  />
                </div>
              </div>
            </div>
          ) : isLanding ? (
            <nav className="hidden lg:flex items-center gap-1 bg-white/90 dark:bg-[#151130]/90 p-1 rounded-full border border-[#C8BEFA]/30 backdrop-blur-md shadow-sm">
              <a
                href="#architecture-section"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-[#C8BEFA]/90 hover:text-[#151130] dark:hover:white hover:bg-[#C8BEFA]/20 transition-all"
              >
                ML Architecture
              </a>
              <a
                href="#workflow-section"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-[#C8BEFA]/90 hover:text-[#151130] dark:hover:white hover:bg-[#C8BEFA]/20 transition-all"
              >
                User Journey
              </a>
              <a
                href="#viva-defense-section"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-[#C8BEFA]/90 hover:text-[#151130] dark:hover:white hover:bg-[#C8BEFA]/20 transition-all"
              >
                Viva Defense
              </a>
              <Link
                to="/model-evaluation"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all"
              >
                100% Accuracy Proof
              </Link>
            </nav>
          ) : null}

          {/* Right Corner: Theme Toggle & Executive Initials Profile / Action */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2.5 rounded-full border border-slate-200/80 dark:border-[#C8BEFA]/40 bg-white/90 dark:bg-[#151130]/90 text-slate-700 dark:text-[#C8BEFA] hover:border-[#C8BEFA] hover:scale-105 transition-all shadow-md backdrop-blur-md cursor-pointer shrink-0"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8BEFA] fill-[#C8BEFA]" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#151130] fill-[#151130]" />
              )}
            </button>

            {isLanding ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-700 dark:text-[#C8BEFA] hover:text-[#151130] dark:hover:white px-2.5 sm:px-3 py-2 transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 text-xs font-black rounded-full bg-[#151130] dark:bg-[#C8BEFA] text-[#C8BEFA] dark:text-[#151130] border border-[#C8BEFA]/30 hover:bg-[#201a47] dark:hover:bg-white shadow-md shadow-[#151130]/20 dark:shadow-[#C8BEFA]/20 transition-all transform hover:scale-105 whitespace-nowrap"
                >
                  Launch Dashboard
                </Link>
              </div>
            ) : isAuthPage ? (
              <div className="flex items-center gap-2">
                {location.pathname === '/login' ? (
                  <Link
                    to="/register"
                    className="px-3.5 sm:px-4 py-2 text-xs font-black rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 hover:border-[#843bf1] hover:text-[#843bf1] dark:hover:text-[#a970fe] transition-all shadow-sm backdrop-blur-md whitespace-nowrap"
                  >
                    Create Account
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="px-3.5 sm:px-4 py-2 text-xs font-black rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 hover:border-[#843bf1] hover:text-[#843bf1] dark:hover:text-[#a970fe] transition-all shadow-sm backdrop-blur-md whitespace-nowrap"
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
                  className={`flex items-center gap-1.5 sm:gap-2 p-1 pl-1 sm:pl-1.5 pr-1.5 sm:pr-3.5 rounded-full border transition-all shadow-md backdrop-blur-md cursor-pointer ${isProfileOpen
                    ? 'bg-purple-50/80 dark:bg-purple-950/40 border-[#843bf1] ring-2 ring-[#843bf1]/30'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800 hover:border-[#843bf1]'
                    }`}
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  {/* Initials Avatar Badge */}
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#843bf1] flex items-center justify-center text-white font-black text-[11px] sm:text-sm shadow-md shadow-[#843bf1]/40">
                      {firstLetter}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
                  </div>

                  {/* Clean Profile Name */}
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-black text-slate-900 dark:text-slate-100 tracking-tight">
                      {userName.split(' ')[0]}
                    </p>
                  </div>

                  <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#843bf1] transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
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
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
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

      {/* ========================================================================= */}
      {/* MOBILE NAVIGATION DRAWER (For Screens < 768px in App Mode) */}
      {/* ========================================================================= */}
      {!isLanding && !isAuthPage && isMobileMenuMounted && (
        <div className="fixed inset-0 z-50 md:hidden flex pointer-events-auto">
          {/* Backdrop Blur Overlay */}
          <div
            ref={drawerBackdropRef}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-all cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div
            ref={drawerPanelRef}
            className="relative w-4/5 max-w-xs bg-white dark:bg-slate-950 border-r border-[#843bf1]/30 shadow-2xl z-10 flex flex-col h-full overflow-hidden will-change-transform"
          >
            
            {/* Drawer Header */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-[#843bf1]/20 dark:border-[#843bf1]/30 shrink-0">
              <Logo size="xl" />
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#843bf1] transition-colors cursor-pointer"
                aria-label="Close Mobile Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Header: Career Selector */}
            <div className="p-4 border-b border-[#0F129A]/15 dark:border-[#FFEDDF]/15 bg-[#FFF9F5]/90 dark:bg-[#0a0d42]/60 gsap-drawer-item">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0F129A] dark:text-[#FFEDDF] mb-2 font-heading">
                <Target className="w-3.5 h-3.5" />
                <span>Target Role</span>
              </div>
              <CustomSelect
                value={selectedCareer?.id || 'car_fullstack'}
                onChange={(val) => {
                  selectCareer(val);
                  closeMobileMenu();
                }}
                options={careers.map((c) => ({ value: c.id, label: c.title, badge: c.category }))}
                placeholder="Select role…"
                accentColor="ultramarine"
                size="sm"
                id="mobile-navbar-career-select"
                className="w-full"
              />
            </div>

            {/* Scrollable Navigation Links */}
            <div ref={drawerNavContainerRef} className="flex-1 overflow-y-auto p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all font-heading gsap-drawer-item ${
                        isActive
                          ? 'bg-gradient-to-r from-[#151130] via-[#241c52] to-[#342978] text-[#C8BEFA] font-black shadow-md shadow-[#151130]/30 dark:bg-gradient-to-r dark:from-[#C8BEFA] dark:to-[#ded6fc] dark:text-[#151130]'
                          : 'text-slate-700 dark:text-[#C8BEFA]/80 hover:bg-[#151130]/10 hover:text-[#151130] dark:hover:white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C8BEFA] dark:text-[#151130]' : 'text-[#151130] dark:text-[#C8BEFA]'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border shrink-0 ${
                              isActive
                                ? 'bg-white/20 dark:bg-[#151130]/20 text-[#C8BEFA] dark:text-[#151130] border-[#C8BEFA]/40 dark:border-[#151130]/40'
                                : 'bg-[#151130]/10 text-[#151130] dark:text-[#C8BEFA] border-[#151130]/20 dark:border-[#C8BEFA]/30'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Drawer Footer: User Profile & Sign Out */}
            <div className="p-3 border-t border-[#151130]/15 dark:border-[#C8BEFA]/15 bg-[#FAF8FF] dark:bg-[#151130]/90 gsap-drawer-item">
              <div className="flex items-center gap-2.5 mb-2.5 px-1">
                <div className="w-8 h-8 rounded-full bg-[#151130] dark:bg-[#C8BEFA] flex items-center justify-center text-[#C8BEFA] dark:text-[#151130] font-black text-xs shrink-0 shadow-sm">
                  {firstLetter}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate font-heading">{userName}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{currentUser?.email || 'student@university.edu'}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
