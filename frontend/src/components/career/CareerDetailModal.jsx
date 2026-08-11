import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  X,
  Sparkles,
  BookOpen,
  Cpu,
  GraduationCap,
  Briefcase,
  Layers,
  Activity,
  Award,
  Zap,
  CheckCircle2,
  TrendingUp,
  Target,
  ArrowRight,
  ExternalLink,
  Flame,
  ShieldCheck,
  Compass,
  Check
} from 'lucide-react';
import onetService from '../../services/onetService';

export const CareerDetailModal = ({ socCode, initialData, onClose, onSelectTarget }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialData || null);
  const [activeTab, setActiveTab] = useState('overview');
  const [history, setHistory] = useState([]);
  const [currentSoc, setCurrentSoc] = useState(socCode);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Scroll to top immediately when mounting or switching SOC code
  useEffect(() => {
    scrollToTop();
  }, [currentSoc]);

  // Fetch occupation detail for a given SOC code
  const loadOccupation = useCallback(async (code) => {
    if (!code) return;
    setLoading(true);
    try {
      const res = await onetService.getOccupationDetail(code);
      if (res) {
        setData(res);
        setCurrentSoc(code);
      }
    } catch (err) {
      console.error('Failed to load occupation detail:', err);
    } finally {
      setLoading(false);
      scrollToTop();
    }
  }, []);

  useEffect(() => {
    if (socCode) {
      setCurrentSoc(socCode);
      setHistory([]);
      loadOccupation(socCode);
      scrollToTop();
    }
  }, [socCode, loadOccupation]);

  // Navigate to a related occupation while pushing current to history stack
  const handleNavigateRelated = (newSoc) => {
    if (currentSoc && currentSoc !== newSoc) {
      setHistory((prev) => [...prev, currentSoc]);
    }
    loadOccupation(newSoc);
    scrollToTop();
  };

  // Back button handler: pop history or return to occupations list
  const handleBack = useCallback(() => {
    scrollToTop();
    if (history.length > 0) {
      const prevSoc = history[history.length - 1];
      setHistory((prev) => prev.slice(0, prev.length - 1));
      loadOccupation(prevSoc);
    } else {
      onClose();
    }
  }, [history, loadOccupation, onClose]);

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    scrollToTop();
  };

  if (!currentSoc && !data) return null;

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12">
      
      {/* ========================================================================= */}
      {/* TOP NAVIGATION & ACTION ROW */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Prominent Back Button & History Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleBack}
            className="group px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 hover:bg-[#843bf1] hover:text-white dark:hover:bg-[#843bf1] text-slate-900 dark:text-slate-100 border border-[#843bf1]/30 hover:border-[#843bf1] font-black text-xs sm:text-sm backdrop-blur-md shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105"
            title="Return to previous view"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{history.length > 0 ? 'Back to Previous Role' : 'Back to Career Roles'}</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Back to All 1,016 Roles
            </button>
          )}
        </div>

        {/* Top Right Quick Target Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onSelectTarget && data && (
            <button
              onClick={() => onSelectTarget(data)}
              className="px-5 py-2.5 rounded-2xl bg-[#843bf1] hover:bg-[#722ed1] text-white font-black text-xs sm:text-sm shadow-md shadow-[#843bf1]/40 ring-1 ring-[#843bf1]/60 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Set as My Target Career</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO HEADER CARD */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl p-6 sm:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] font-mono text-[11px] sm:text-xs font-extrabold border border-[#843bf1]/30 flex items-center gap-1.5 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>O*NET-SOC {data?.onet_soc_code || currentSoc}</span>
            </span>

            {data?.job_zone && (
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-600/40 text-[11px] font-black flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Job Zone {data.job_zone.job_zone}: {data.job_zone.name}</span>
              </span>
            )}

            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40 text-[10px] sm:text-[11px] font-black uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>O*NET 30.3 Verified</span>
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-sans tracking-tight text-slate-950 dark:text-white leading-tight drop-shadow-sm">
              {data?.title || 'Occupation Profile'}
            </h1>
            {data?.description && (
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 max-w-4xl leading-relaxed font-medium">
                {data.description}
              </p>
            )}
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 border-t border-[#843bf1]/20 dark:border-[#843bf1]/30 scrollbar-none text-xs sm:text-sm">
            {[
              { id: 'overview', label: 'Overview & Titles', icon: Compass },
              { id: 'skills', label: 'Skills & Gaps', icon: Target },
              { id: 'tech', label: 'Software & Hot Tech', icon: Cpu },
              { id: 'knowledge', label: 'Knowledge & Abilities', icon: BookOpen },
              { id: 'tasks', label: 'Tasks & Emerging Work', icon: Zap },
              { id: 'preparation', label: 'Education & Job Zone', icon: GraduationCap },
              { id: 'related', label: 'Related Careers', icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 font-black ring-1 ring-[#843bf1]/60'
                      : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-[#843bf1]/20 dark:border-[#843bf1]/30 hover:border-[#843bf1] hover:text-[#843bf1]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTENT PANELS */}
      {/* ========================================================================= */}
      {loading ? (
        <div className="py-24 text-center space-y-4 rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-[#843bf1]/25 p-8">
          <div className="w-12 h-12 border-4 border-[#843bf1] border-t-transparent rounded-full animate-spin mx-auto shadow-lg"></div>
          <p className="font-black text-sm text-[#843bf1] dark:text-purple-300 animate-pulse">
            Retrieving O*NET 30.3 14-Dimension Dataset...
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* ================================================================= */}
          {/* TAB 1: OVERVIEW */}
          {/* ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Full Description Card */}
              <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg">
                <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Official Occupational Definition</span>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-800 dark:text-slate-200">
                  {data?.description}
                </p>
              </div>

              {/* Sample Reported Job Titles */}
              {data?.job_titles && data.job_titles.length > 0 && (
                <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Industry Reported Alternative Job Titles ({data.job_titles.length})</span>
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">USDOL Market Taxonomy</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {data.job_titles.map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          t.is_reported_title
                            ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-500/40 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {t.job_title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* RIASEC Holland Interests Profile */}
              {data?.interests && data.interests.length > 0 && (
                <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2">
                        <Compass className="w-4 h-4" />
                        <span>RIASEC Holland Interest Profile (Scale: 1.00 - 7.00)</span>
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Standardized psychological occupational interest dimensions evaluated by the Department of Labor.
                      </p>
                    </div>
                    <span className="text-[10px] text-[#843bf1] dark:text-purple-300 font-mono font-bold bg-[#843bf1]/10 dark:bg-purple-900/40 px-2.5 py-1 rounded-lg border border-[#843bf1]/20 dark:border-purple-500/30 self-start sm:self-auto">
                      USDOL O*NET Dimension
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {data.interests
                      .filter((int) =>
                        ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'].includes(
                          int.interest_type
                        )
                      )
                      .map((int, idx) => {
                        const score = Number(int.data_value) || 0;
                        const pct = Math.min(100, Math.round((score / 7) * 100));

                        const themes = {
                          Realistic: {
                            bar: 'from-amber-500 to-orange-600',
                            badge: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-500/30',
                            desc: 'Hands-on, practical, physical'
                          },
                          Investigative: {
                            bar: 'from-cyan-500 to-blue-600',
                            badge: 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-300 dark:border-cyan-500/30',
                            desc: 'Analytical, scientific, research'
                          },
                          Artistic: {
                            bar: 'from-fuchsia-500 to-pink-600',
                            badge: 'text-fuchsia-700 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/50 border-fuchsia-300 dark:border-fuchsia-500/30',
                            desc: 'Creative, expressive, original'
                          },
                          Social: {
                            bar: 'from-emerald-500 to-teal-600',
                            badge: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-500/30',
                            desc: 'Helping, teaching, interpersonal'
                          },
                          Enterprising: {
                            bar: 'from-violet-500 to-purple-600',
                            badge: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-300 dark:border-purple-500/30',
                            desc: 'Leadership, persuasion, business'
                          },
                          Conventional: {
                            bar: 'from-indigo-500 to-blue-600',
                            badge: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-500/30',
                            desc: 'Structured, systematic, data'
                          }
                        };

                        const theme =
                          themes[int.interest_type] || {
                            bar: 'from-blue-500 to-purple-600',
                            badge: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-500/30',
                            desc: 'Interest Dimension'
                          };

                        return (
                          <div
                            key={idx}
                            className="p-4 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-xs hover:border-[#843bf1]/50 transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-sm font-black text-slate-900 dark:text-white">{int.interest_type}</span>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">{theme.desc}</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded-md border text-xs font-mono font-black ${theme.badge}`}>
                                {score.toFixed(2)} <span className="text-[9px] opacity-75 font-normal">/ 7</span>
                              </span>
                            </div>

                            <div className="space-y-1">
                              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700/50">
                                <div
                                  className={`bg-gradient-to-r ${theme.bar} h-full rounded-full transition-all duration-500`}
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                <span>Intensity: {pct}%</span>
                                <span>Scale Max 7.00</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: SKILLS & GAPS */}
          {/* ================================================================= */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Essential Core Competencies & Skills Required</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Deduplicated competencies scored by Importance (1.0 - 5.0) and Mastery Level (0.0 - 7.0).
                    </p>
                  </div>
                  <span className="text-xs text-[#843bf1] dark:text-purple-300 font-mono font-bold bg-[#843bf1]/10 dark:bg-purple-900/50 px-3 py-1 rounded-xl border border-[#843bf1]/20 dark:border-purple-500/30 self-start sm:self-auto">
                    {data?.skills?.length || 0} Core Skills
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {data?.skills?.map((skill, idx) => {
                    const imp = Number(skill.importance || skill.data_value) || 0;
                    const lvl = Number(skill.level) || 0;
                    const pct = Math.min(100, Math.max(0, Math.round(((imp - 1) / 4) * 100)));

                    return (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#843bf1]/50 flex flex-col justify-between space-y-3 shadow-xs transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                            {skill.skill_name}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[#843bf1] dark:text-cyan-400 font-mono font-black text-xs">
                              {imp.toFixed(2)} <span className="text-[9px] text-slate-400 font-normal">/ 5</span>
                            </span>
                            {lvl > 0 && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-[10px] font-mono text-purple-800 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                                Lvl {lvl.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-[#843bf1] h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-500 dark:text-slate-400 font-mono">
                            <span>Importance</span>
                            <span>{pct}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Transferable Skills */}
                {data?.transferable_skills && data.transferable_skills.length > 0 && (
                  <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <h4 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider">
                      Transferable Cognitive & Behavioral Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.transferable_skills.slice(0, 20).map((ts, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 font-bold border border-purple-200 dark:border-purple-500/30 text-xs flex items-center gap-1.5"
                        >
                          <span>{ts.skill_name}</span>
                          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-black">
                            ({(ts.importance || ts.data_value).toFixed(1)})
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: SOFTWARE & HOT TECH */}
          {/* ================================================================= */}
          {activeTab === 'tech' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>Technologies, Software Tools & Programming Frameworks</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Official O*NET technology inventory mapped from employer demand data and job postings.
                    </p>
                  </div>
                  <span className="text-xs text-amber-800 dark:text-amber-300 font-mono font-bold bg-amber-100 dark:bg-amber-950/50 px-3 py-1 rounded-xl border border-amber-300 dark:border-amber-500/30 flex items-center gap-1 self-start sm:self-auto">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Hot Tech Highlighted</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 pt-2">
                  {data?.software_skills?.map((soft, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                        soft.hot_technology
                          ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/50 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-[#843bf1]/40'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate"
                          title={soft.example_software || soft.commodity_title}
                        >
                          {soft.example_software || soft.commodity_title || 'Software Tool'}
                        </p>
                        <p
                          className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5"
                          title={soft.commodity_title}
                        >
                          {soft.commodity_title || 'Technical Technology Category'}
                        </p>
                      </div>
                      {soft.hot_technology && (
                        <span className="px-2 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-black uppercase flex items-center gap-1 shrink-0 shadow-xs">
                          <Flame className="w-3 h-3 text-white" />
                          <span>Hot Tech</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: KNOWLEDGE & ABILITIES */}
          {/* ================================================================= */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Knowledge Domains */}
              <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-4">
                <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Required Knowledge Domains (Deduplicated)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {data?.knowledge?.map((k, idx) => {
                    const imp = Number(k.importance || k.data_value) || 0;
                    const lvl = Number(k.level) || 0;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#843bf1]/40 flex justify-between items-center gap-2"
                      >
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{k.knowledge_name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono font-bold text-xs text-[#843bf1] dark:text-cyan-400">{imp.toFixed(2)}</span>
                          {lvl > 0 && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-700">
                              Lvl {lvl.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cognitive & Psychomotor Abilities */}
              <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-4">
                <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Activity className="w-4 h-4" />
                  <span>Cognitive, Sensory & Psychomotor Abilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {data?.abilities?.map((a, idx) => {
                    const imp = Number(a.importance || a.data_value) || 0;
                    const lvl = Number(a.level) || 0;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#843bf1]/40 flex justify-between items-center gap-2"
                      >
                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">{a.ability_name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300">{imp.toFixed(2)}</span>
                          {lvl > 0 && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                              Lvl {lvl.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: TASKS & EMERGING WORK */}
          {/* ================================================================= */}
          {activeTab === 'tasks' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Emerging AI & Cloud Tasks */}
              {data?.emerging_tasks && data.emerging_tasks.length > 0 && (
                <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/60 dark:to-purple-950/60 rounded-3xl border border-cyan-200 dark:border-cyan-500/40 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2.5 text-cyan-900 dark:text-cyan-300 font-black text-sm">
                    <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                    <span>Emerging AI & Cloud Tasks (O*NET 30.3 High-Growth Forecast)</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.emerging_tasks.map((et, idx) => (
                      <li
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/40 border border-cyan-300 dark:border-cyan-500/20 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed shadow-xs"
                      >
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">✦</span>
                        <span>{et.task_statement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Core Occupational Tasks */}
              <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-4">
                <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Core Daily Work Activities & Tasks ({data?.tasks?.length || 0})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data?.tasks?.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed"
                    >
                      <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-black flex items-center justify-center shrink-0 text-xs border border-purple-300 dark:border-purple-500/30">
                        {idx + 1}
                      </span>
                      <span className="flex-1">{t.task_statement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: EDUCATION & PREPARATION */}
          {/* ================================================================= */}
          {activeTab === 'preparation' && (
            <div className="space-y-6 animate-fade-in">
              {data?.job_zone ? (
                <div className="p-6 sm:p-8 bg-purple-50 dark:bg-gradient-to-br dark:from-purple-950/60 dark:via-slate-900/80 dark:to-slate-950 border border-purple-200 dark:border-purple-500/40 rounded-3xl space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-200 dark:border-purple-500/30 pb-5">
                    <div>
                      <span className="px-3.5 py-1 bg-[#843bf1] text-white rounded-xl font-black text-xs uppercase tracking-wider">
                        Job Zone {data.job_zone.job_zone}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                        {data.job_zone.name}
                      </h2>
                    </div>
                    <span className="font-mono text-purple-800 dark:text-purple-300 font-black text-sm bg-purple-100 dark:bg-purple-900/50 px-3.5 py-1.5 rounded-xl border border-purple-300 dark:border-purple-500/40 self-start sm:self-auto">
                      SVP Range: {data.job_zone.svp_range || '7.0 to 8.0'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-purple-200 dark:border-purple-500/20 space-y-1 shadow-xs">
                      <p className="font-black text-[#843bf1] dark:text-purple-300 uppercase tracking-wider text-[10px]">Required Experience</p>
                      <p className="text-slate-800 dark:text-slate-200">{data.job_zone.experience}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-purple-200 dark:border-purple-500/20 space-y-1 shadow-xs">
                      <p className="font-black text-[#843bf1] dark:text-purple-300 uppercase tracking-wider text-[10px]">Education & Credentials</p>
                      <p className="text-slate-800 dark:text-slate-200">{data.job_zone.education}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-purple-200 dark:border-purple-500/20 space-y-1 shadow-xs">
                      <p className="font-black text-[#843bf1] dark:text-purple-300 uppercase tracking-wider text-[10px]">Job Training Required</p>
                      <p className="text-slate-800 dark:text-slate-200">{data.job_zone.job_training}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-purple-200 dark:border-purple-500/20 space-y-1 shadow-xs">
                      <p className="font-black text-[#843bf1] dark:text-purple-300 uppercase tracking-wider text-[10px]">Example Benchmark Occupations</p>
                      <p className="text-slate-800 dark:text-slate-200">{data.job_zone.examples}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-900/60 rounded-3xl border border-[#843bf1]/20">
                  Preparation details not specified in this release.
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 7: RELATED CAREERS */}
          {/* ================================================================= */}
          {activeTab === 'related' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 rounded-3xl p-6 backdrop-blur-xl shadow-lg space-y-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-[#843bf1] dark:text-[#a970fe] tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Related Career Pathways & Alternative Occupations</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Clicking "Explore" opens that role. Use the <strong>Back Button</strong> at any time to return.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {data?.related_occupations?.map((rel, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#843bf1] transition-all flex items-center justify-between gap-3 shadow-xs group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#843bf1] dark:group-hover:text-[#a970fe] transition-colors truncate">
                          {rel.related_title}
                        </p>
                        <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          SOC {rel.related_soc_code}
                        </p>
                      </div>

                      <button
                        onClick={() => handleNavigateRelated(rel.related_soc_code)}
                        className="px-3 py-2 bg-[#843bf1]/15 hover:bg-[#843bf1] text-[#843bf1] hover:text-white dark:text-purple-300 dark:hover:text-white rounded-xl text-xs font-black transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM ACTION BAR */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/25 dark:border-[#843bf1]/35 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Powered by O*NET® 30.3 (USDOL/ETA) • Official Standard</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleBack}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{history.length > 0 ? 'Back to Previous Role' : 'Back to Career Roles'}</span>
          </button>

          {onSelectTarget && data && (
            <button
              onClick={() => onSelectTarget(data)}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#843bf1] hover:bg-[#722ed1] text-white rounded-2xl text-xs font-black shadow-lg shadow-[#843bf1]/40 ring-1 ring-[#843bf1]/60 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Set as My Target Career</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CareerDetailModal;
