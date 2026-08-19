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
import Logo from '../common/Logo';

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
    <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden md:flex flex-col bg-gradient-to-b from-[#FAF8FF] via-[#F3EFFF]/50 to-white dark:from-[#151130] dark:via-[#19143a] dark:to-[#0f0c24] text-slate-900 dark:text-slate-100 transition-all duration-300 border-r border-[#151130]/10 dark:border-[#C8BEFA]/15 shadow-[8px_0_30px_rgba(21,17,48,0.06)] dark:shadow-[8px_0_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

      {/* Ambient Champion Blue & Lavender Tonic Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C8BEFA]/20 via-transparent to-[#151130]/5 dark:from-[#C8BEFA]/15 dark:via-transparent dark:to-[#151130]/30 pointer-events-none" />

      {/* Top Logo Header */}
      <div className="h-16 flex items-center px-3.5 border-b border-[#151130]/10 dark:border-[#C8BEFA]/15 shrink-0 bg-white/80 dark:bg-[#151130]/90 backdrop-blur-md relative z-10 overflow-hidden">
        <Logo size="xl" />
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
                  `w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left relative overflow-hidden font-heading ${isActive
                    ? 'bg-gradient-to-r from-[#151130] via-[#241c52] to-[#342978] text-[#C8BEFA] font-black shadow-[0_4px_18px_rgba(21,17,48,0.4)] dark:bg-gradient-to-r dark:from-[#C8BEFA] dark:via-[#ded6fc] dark:to-[#C8BEFA] dark:text-[#151130] dark:shadow-[0_4px_22px_rgba(200,190,250,0.3)] ring-1 ring-[#151130]/50 dark:ring-[#C8BEFA]/40 translate-x-0.5'
                    : 'text-slate-800 dark:text-[#C8BEFA]/80 hover:text-[#151130] dark:hover:text-white hover:bg-[#151130]/8 dark:hover:bg-[#C8BEFA]/10 hover:translate-x-1'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-[#C8BEFA] dark:bg-[#151130] rounded-r-full shadow-[0_0_8px_#C8BEFA] dark:shadow-[0_0_8px_#151130]" />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${isActive
                        ? 'bg-white/20 dark:bg-[#151130]/20 text-[#C8BEFA] dark:text-[#151130] shadow-inner'
                        : 'bg-[#151130]/10 dark:bg-[#C8BEFA]/15 text-[#151130] dark:text-[#C8BEFA] group-hover:bg-[#151130] dark:group-hover:bg-[#C8BEFA] group-hover:text-[#C8BEFA] dark:group-hover:text-[#151130] group-hover:scale-110'
                        }`}>
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8BEFA] dark:text-[#151130] drop-shadow-[0_0_6px_rgba(200,190,250,0.8)]' : ''}`} />
                      </div>
                      <span className="truncate text-xs">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border shrink-0 transition-all ${isActive
                        ? 'bg-white/25 dark:bg-[#151130]/25 text-[#C8BEFA] dark:text-[#151130] border-[#C8BEFA]/40 dark:border-[#151130]/40 backdrop-blur-xs'
                        : item.badgeType === 'warning'
                          ? 'bg-[#C8BEFA]/30 dark:bg-[#C8BEFA]/20 text-[#151130] dark:text-[#C8BEFA] border border-[#C8BEFA]/50 shadow-xs font-black'
                          : 'bg-[#151130]/10 dark:bg-[#C8BEFA]/15 text-[#151130] dark:text-[#C8BEFA] border border-[#151130]/20 dark:border-[#C8BEFA]/30 shadow-xs'
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
