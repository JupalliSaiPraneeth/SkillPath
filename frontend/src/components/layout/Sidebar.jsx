import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Target,
  Award,
  TrendingUp,
  Map,
  FileSearch,
  Brain,
  CheckCheck,
  User,
  Briefcase
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';
import { useTheme } from '../../context/ThemeContext';
import logoDark from '../../assets/logo-dark.png';
import logoWhite from '../../assets/logo-white.png';

export const Sidebar = () => {
  const { gapAnalysis } = useCareer();
  const { isDark } = useTheme();

  const navItems = [
    { to: '/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { to: '/career-roles', label: 'Career Roles & O*NET', icon: Briefcase, badge: '1,016' },
    { to: '/assessment', label: 'Skill Assessment', icon: ClipboardCheck },
    {
      to: '/skill-gap',
      label: 'Skill Gap Analysis',
      icon: Target,
      badge: gapAnalysis.priorityCounts.high > 0 ? `${gapAnalysis.priorityCounts.high} High` : null,
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
    <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden md:flex flex-col bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-slate-100 transition-all duration-300 border-r border-[#843bf1]/30 dark:border-[#843bf1]/40 shadow-[10px_0_35px_rgba(132,59,241,0.15)] dark:shadow-[10px_0_35px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

      {/* Ambient #843bf1 Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#843bf1]/15 via-white/40 to-[#843bf1]/10 dark:from-[#843bf1]/20 dark:via-slate-950/80 dark:to-slate-950/90 pointer-events-none" />

      {/* Top Logo Header */}
      <div className="h-16 flex items-center px-4 border-b border-[#843bf1]/20 dark:border-[#843bf1]/30 shrink-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md relative z-10">
        <Link to="/" className="flex items-center gap-2 group select-none py-1">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#843bf1]/30 to-purple-600/30 rounded-xl blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              key={isDark ? 'dark-logo' : 'light-logo'}
              src={isDark ? logoDark : logoWhite}
              alt="SkillPath Finder"
              className="h-11 sm:h-12 w-auto max-h-12 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200 relative"
            />
          </div>
        </Link>
      </div>

      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 sidebar-scroll relative z-10">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `w-full group flex items-center justify-between px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left relative overflow-hidden ${isActive
                    ? 'bg-[#843bf1] text-white font-black shadow-[0_4px_18px_rgba(132,59,241,0.45)] dark:shadow-[0_4px_20px_rgba(132,59,241,0.6)] ring-1 ring-[#843bf1]/60 dark:ring-[#843bf1]/80 translate-x-0.5'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#843bf1] dark:hover:text-white hover:bg-[#843bf1]/10 dark:hover:bg-[#843bf1]/25 hover:translate-x-1'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-white rounded-r-full shadow-[0_0_8px_white]" />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${isActive
                          ? 'bg-white/20 text-white shadow-inner'
                          : 'bg-[#843bf1]/10 dark:bg-[#843bf1]/20 text-[#843bf1] dark:text-[#a970fe] group-hover:bg-[#843bf1] group-hover:text-white group-hover:scale-110'
                        }`}>
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]' : ''}`} />
                      </div>
                      <span className="truncate text-xs">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border shrink-0 transition-all ${isActive
                          ? 'bg-white/25 text-white border-white/40 backdrop-blur-xs'
                          : item.badgeType === 'warning'
                            ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-600/40 shadow-xs'
                            : 'bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30 dark:border-[#843bf1]/40 shadow-xs'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

    </aside>
  );
};

export default Sidebar;
