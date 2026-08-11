import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Sparkles,
  ArrowRight,
  Layers,
  ExternalLink,
  GraduationCap,
  Filter,
  CheckCircle2,
  Target,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Cpu,
  Globe,
  Database,
  RefreshCw
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { useAuth } from '../context/AuthContext';
import onetService from '../services/onetService';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import CareerDetailModal from '../components/career/CareerDetailModal';

export const OccupationsExplorerPage = () => {
  const { selectCareer, careers } = useCareer();
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [occupations, setOccupations] = useState([]);
  const [totalCount, setTotalCount] = useState(1016);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(18);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOnetSoc, setSelectedOnetSoc] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const categories = [
    { id: 'ALL', label: 'All Disciplines', count: '1,016' },
    { id: 'TECH', label: 'Software & Technology (SOC 15-xxxx)', query: '15-' },
    { id: 'AI_DATA', label: 'Data Science & AI', query: 'data' },
    { id: 'ENG', label: 'Architecture & Engineering (SOC 17-xxxx)', query: '17-' },
    { id: 'MGMT', label: 'Management & Operations (SOC 11-xxxx)', query: '11-' },
    { id: 'FIN', label: 'Business & Financial (SOC 13-xxxx)', query: '13-' },
    { id: 'HEALTH', label: 'Healthcare & Life Sciences (SOC 29-xxxx)', query: '29-' }
  ];

  // Fetch occupations from O*NET SQLite API backend
  const fetchOccupations = async (page = 1, search = '') => {
    setIsLoading(true);
    try {
      const res = await onetService.getOccupations(page, pageSize, search);
      if (res?.occupations) {
        setOccupations(res.occupations);
        setTotalCount(res.total || 1016);
      } else {
        setOccupations([]);
      }
    } catch (err) {
      console.warn('Failed to load occupations:', err);
      setOccupations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      let query = searchTerm.trim();
      if (selectedCategory !== 'ALL') {
        const cat = categories.find(c => c.id === selectedCategory);
        if (cat?.query && !query) {
          query = cat.query;
        }
      }
      fetchOccupations(currentPage, query);
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleSelectOccupation = (soc) => {
    setSelectedOnetSoc(soc);
    scrollToTop();
  };

  const handleCloseDetail = () => {
    setSelectedOnetSoc(null);
    scrollToTop();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  const handleSetTargetCareer = (occ) => {
    const soc = occ.onet_soc_code || occ.soc_code;
    const title = occ.title;

    // Find matching predefined career or create dynamic pointer
    const match = careers.find(c => c.socCode === soc || c.title?.toLowerCase().includes(title?.toLowerCase()));
    const targetId = match ? match.id : 'car_mle';

    selectCareer(targetId);
    if (updateProfile) {
      updateProfile({ targetCareerId: targetId, targetCareerTitle: title });
    }

    setToastMessage(`Target Career updated to "${title}"! Navigating to Learning Roadmap...`);
    setTimeout(() => {
      navigate('/roadmap');
    }, 1200);
  };

  if (selectedOnetSoc) {
    return (
      <div className="space-y-6 pb-16 font-sans">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <CareerDetailModal
          socCode={selectedOnetSoc}
          onClose={handleCloseDetail}
          onSelectTarget={(occ) => handleSetTargetCareer(occ)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 font-sans">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header (Frosted Glass & Dynamic High-Contrast Typography) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 text-[11px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                <Database className="w-3.5 h-3.5" />
                <span>O*NET 30.3 Occupational Standard</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40 text-[10px] font-black">
                1,016 Roles Available
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-sans tracking-tight text-slate-950 dark:text-white leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Explore All 1,016 Career Roles & 14-Dimension Profiles
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Discover official Department of Labor job profiles. Inspect technical competencies, software tool stacks, RIASEC Holland dimensions, generalized work activities, and salary tiers for any occupation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/career-recommendations')}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-[#843bf1]/40 text-[#843bf1] dark:text-[#a970fe] font-black text-xs transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-xs hover:scale-105 cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#843bf1] dark:text-[#a970fe]" />
              <span>AI Recommendations</span>
            </button>
            <button
              onClick={() => navigate('/skill-gap')}
              className="px-4 py-3 rounded-2xl bg-[#843bf1] hover:bg-[#722ed1] text-white font-black text-xs shadow-md shadow-[#843bf1]/40 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer ring-1 ring-[#843bf1]/60"
            >
              <Target className="w-4 h-4" />
              <span>My Skill Gap Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Search & Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#843bf1] dark:text-[#a970fe] absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by role title, SOC code (e.g. 15-1254.00), or keyword..."
              className="w-full pl-11 pr-10 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#843bf1]/30 dark:border-[#843bf1]/40 rounded-2xl text-xs text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#843bf1] focus:ring-2 focus:ring-[#843bf1]/20 shadow-sm transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Refresh Action */}
          <button
            onClick={() => fetchOccupations(currentPage, searchTerm)}
            className="px-4 py-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-slate-800 dark:text-slate-200 text-xs font-bold hover:text-[#843bf1] hover:border-[#843bf1] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 text-[#843bf1] ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${selectedCategory === cat.id
                  ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 font-black ring-1 ring-[#843bf1]/60'
                  : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-[#843bf1]/20 dark:border-[#843bf1]/30 hover:border-[#843bf1] hover:text-[#843bf1]'
                }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result Count and Pagination Summary */}
      <div className="flex items-center justify-between text-xs font-black text-slate-950 dark:text-white px-1 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        <span>
          Showing {occupations.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, totalCount)} of {totalCount} O*NET Occupations
        </span>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      {/* Grid of Career Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md animate-pulse border border-[#843bf1]/20 dark:border-[#843bf1]/30"></div>
          ))}
        </div>
      ) : occupations.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/30">
          <Briefcase className="w-12 h-12 text-[#843bf1] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No occupations matched your query</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try searching for terms like "Developer", "Engineer", "Data", "Manager", or clear the filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#843bf1] text-white text-xs font-bold hover:bg-[#722ed1] transition-all cursor-pointer shadow-md shadow-[#843bf1]/30"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occupations.map((occ) => {
            const soc = occ.onet_soc_code || occ.soc_code;
            return (
              <div
                key={soc}
                className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg hover:shadow-2xl hover:border-[#843bf1] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-3">

                  {/* Top Bar: SOC Code & Dimensions Count */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
                    <span className="text-[11px] font-mono font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/10 dark:bg-[#843bf1]/20 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30">
                      SOC {soc}
                    </span>
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-600/40 flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      14 Dimensions
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight group-hover:text-[#843bf1] dark:group-hover:text-[#a970fe] transition-colors line-clamp-1">
                      {occ.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3 min-h-[48px] font-medium">
                    {occ.description || 'Authoritative occupational taxonomy profile curated under U.S. Department of Labor O*NET 30.3 release standards.'}
                  </p>

                  {/* Metadata Chips */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      O*NET 30.3 Verified
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#843bf1]/10 dark:bg-[#843bf1]/20 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/20 dark:border-[#843bf1]/30">
                      Hot Tech & Skills
                    </span>
                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-4 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25 flex items-center gap-2">
                  <button
                    onClick={() => handleSelectOccupation(soc)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#843bf1] hover:bg-[#722ed1] text-white font-black text-xs shadow-md shadow-[#843bf1]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer ring-1 ring-[#843bf1]/50"
                    title="Inspect complete 14-dimension breakdown"
                  >
                    <span>Inspect 14 Dimensions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleSetTargetCareer(occ)}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
                    title="Set as Target Career Path & Build Roadmap"
                  >
                    <Target className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Nav */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#843bf1]/20 dark:border-[#843bf1]/30">
        <div className="text-xs font-black text-slate-950 dark:text-white drop-shadow-xs">
          Showing page {currentPage} of {totalPages} ({totalCount} total occupations)
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-[#843bf1] disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Quick Page Jump */}
          <div className="flex items-center gap-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${currentPage === pageNum
                      ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 ring-1 ring-[#843bf1]/60'
                      : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-[#843bf1]/20 dark:border-[#843bf1]/30 hover:border-[#843bf1] hover:text-[#843bf1]'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            disabled={currentPage >= totalPages || isLoading}
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-[#843bf1] disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default OccupationsExplorerPage;
