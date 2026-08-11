import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  BookOpen,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import storageService from '../services/storageService';
import CareerDetailModal from '../components/career/CareerDetailModal';

export const CareerRecommendationsPage = () => {
  const { careerRecommendations, selectCareer } = useCareer();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedOnetSoc, setSelectedOnetSoc] = useState(null);
  const categories = ['ALL', 'AI & Data', 'Software Engineering', 'Cloud & Infrastructure', 'Cybersecurity'];

  const filtered = selectedCategory === 'ALL'
    ? careerRecommendations
    : careerRecommendations.filter(c => c.category === selectedCategory);

  const handleSelectAndRoadmap = (careerId) => {
    selectCareer(careerId);
    navigate('/roadmap');
  };

  const handleSelectAndXai = (careerId) => {
    selectCareer(careerId);
    navigate('/explainable-ai');
  };

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

  if (selectedOnetSoc) {
    return (
      <div className="space-y-6 pb-16 font-sans">
        <CareerDetailModal
          socCode={selectedOnetSoc}
          onClose={handleCloseDetail}
          onSelectTarget={(occ) => {
            const targetId = occ.id || 'car_mle';
            selectCareer(targetId);
            handleCloseDetail();
            navigate('/roadmap');
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 font-sans">

      {/* Hero Header (Frosted Glass & Dynamic High-Contrast Typography) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 text-[11px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Module 4 — Random Forest Classifier</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Recommended Engineering Career Paths
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Ranked by multi-class Random Forest probability calibration trained on the O*NET 30.3 tech taxonomy.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/career-roles')}
              className="px-4 py-3 rounded-2xl bg-[#843bf1] hover:bg-[#722ed1] text-white font-black text-xs shadow-md shadow-[#843bf1]/40 ring-1 ring-[#843bf1]/60 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Explore All 1,016 O*NET Roles →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat
                ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 font-black ring-1 ring-[#843bf1]/60'
                : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-[#843bf1]/20 dark:border-[#843bf1]/30 hover:border-[#843bf1] hover:text-[#843bf1]'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Career Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((career, idx) => (
          <div
            key={career.careerId}
            className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg hover:shadow-2xl hover:border-[#843bf1] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">

              {/* Header with Match % */}
              <div className="flex items-start justify-between gap-3 border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/10 dark:bg-[#843bf1]/20 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30">
                      #{idx + 1} {career.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white mt-1.5 font-sans group-hover:text-[#843bf1] dark:group-hover:text-[#a970fe] transition-colors">{career.careerTitle}</h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-2xl sm:text-3xl font-black text-[#843bf1] dark:text-[#a970fe] font-mono">{career.matchScore}%</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">RF Confidence: {career.confidence}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed min-h-[38px] font-medium">{career.description}</p>

              {/* Salary & Demand */}
              <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-black">Market Demand</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">{career.marketDemand}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-black">Salary Range</span>
                  <span className="font-black text-slate-900 dark:text-slate-100">{career.salaryRange}</span>
                </div>
              </div>

              {/* Supporting vs Missing Skills Breakdown */}
              <div className="space-y-2 text-xs pt-1">
                <div>
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 block mb-1">Supporting Proficiencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.supportingSkills.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 font-bold">
                        ✓ {s}
                      </span>
                    ))}
                    {career.supportingSkills.length === 0 && (
                      <span className="text-[11px] text-slate-400 italic">None validated yet</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 block mb-1">Key Missing Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.missingSkills.slice(0, 3).map((m, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20 font-bold">
                        ✗ {m.name} ({m.gap}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25 flex items-center gap-2">
              <button
                onClick={() => handleSelectOccupation(career.socCode || storageService.resolveSocCode(career))}
                className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#843bf1]/30 text-slate-700 dark:text-slate-200 hover:text-[#843bf1] hover:border-[#843bf1] font-bold text-xs shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                title="View complete 14-dimension O*NET 30.3 occupational breakdown"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#843bf1] dark:text-[#a970fe]" />
                <span>O*NET Profile</span>
              </button>

              <button
                onClick={() => handleSelectAndRoadmap(career.careerId)}
                className="flex-1 py-2.5 rounded-xl bg-[#843bf1] hover:bg-[#722ed1] text-white font-black text-xs shadow-md shadow-[#843bf1]/35 ring-1 ring-[#843bf1]/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Select & Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleSelectAndXai(career.careerId)}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 border border-[#843bf1]/30 text-slate-700 dark:text-slate-300 hover:text-[#843bf1] shadow-xs transition-all cursor-pointer"
                title="View SHAP / LIME Explanation"
              >
                <BrainCircuit className="w-4 h-4 text-[#843bf1] dark:text-[#a970fe]" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CareerRecommendationsPage;
