import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Info,
  Download,
  Filter
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import SkillRadarChart from '../components/charts/SkillRadarChart';
import GapBarChart from '../components/charts/GapBarChart';
import storageService from '../services/storageService';
import CareerDetailModal from '../components/career/CareerDetailModal';

export const SkillGapPage = () => {
  const { careers, selectedCareer, selectCareer, gapAnalysis } = useCareer();
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [showOnetModal, setShowOnetModal] = useState(false);

  const filteredCards = filterPriority === 'ALL'
    ? gapAnalysis.skillCards
    : gapAnalysis.skillCards.filter(c => c.priority === filterPriority);

  return (
    <div className="space-y-8 pb-12 font-sans">

      {/* Hero Header (Frosted Glass & Dynamic High-Contrast Typography) */}
      <div className="relative overflow-visible rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 text-[11px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>Module 2 — Cosine Similarity Engine</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Skill Gap Analysis
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Mathematical comparison between your User Skill Vector and the O*NET 30.3 target career requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setShowOnetModal(true)}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-[#843bf1]/40 text-[#843bf1] dark:text-[#a970fe] font-black text-xs hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all flex items-center justify-center gap-1.5 shadow-xs hover:scale-105 cursor-pointer"
              title="Inspect complete 14-dimension O*NET 30.3 occupational breakdown"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#843bf1] dark:text-[#a970fe]" />
              <span>O*NET 30.3 Profile</span>
            </button>

            <Link
              to="/roadmap"
              className="px-4 py-3 rounded-2xl bg-[#843bf1] hover:bg-[#722ed1] text-white font-black text-xs shadow-md shadow-[#843bf1]/40 ring-1 ring-[#843bf1]/60 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Generate Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Vector Math & Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg hover:border-[#843bf1] hover:-translate-y-1 transition-all">
          <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Cosine Similarity</span>
          <p className="text-3xl font-black text-[#843bf1] dark:text-[#a970fe] font-mono mt-1">{gapAnalysis.cosineSimilarity}</p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Range: 0.0 (Orthogonal) - 1.0 (Identical)</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg hover:border-[#843bf1] hover:-translate-y-1 transition-all">
          <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Overall Match Score</span>
          <p className="text-3xl font-black text-[#843bf1] dark:text-[#a970fe] font-mono mt-1">{gapAnalysis.overallMatchScore}%</p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Combined cosine & level coverage</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg hover:border-[#843bf1] hover:-translate-y-1 transition-all">
          <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">High Priority Gaps</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono mt-1">{gapAnalysis.priorityCounts.high}</p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Skills with gap ≥ 35% or high importance</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg hover:border-[#843bf1] hover:-translate-y-1 transition-all">
          <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Target Market Demand</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1.5 font-sans">{selectedCareer?.marketDemand}</p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Salary: {selectedCareer?.salaryRange}</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                Multidimensional Vector Radar
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">User Vector vs {selectedCareer?.title} Required Vector</p>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
              Cosine Space
            </span>
          </div>
          <SkillRadarChart skillCards={gapAnalysis.skillCards} height={320} />
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                Skill Gap Bar Analysis
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Direct visual breakdown of Current vs Missing Skill Gaps</p>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-600/40">
              Gaps Visualized
            </span>
          </div>
          <GapBarChart skillCards={gapAnalysis.skillCards} height={320} />
        </div>
      </div>

      {/* Detailed Skill Cards with Priority Filter */}
      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white font-sans">Detailed Skill Level Breakdown</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Review individual current proficiencies, required benchmarks, and priorities</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#843bf1]" />
            <div className="flex bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/30 dark:border-[#843bf1]/40 p-1 rounded-2xl text-xs font-semibold shadow-xs">
              {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-3 py-1.5 rounded-xl transition-all font-black ${filterPriority === p
                      ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 ring-1 ring-[#843bf1]/60'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#843bf1]'
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-1 ${card.priority === 'HIGH' ? 'border-rose-300 dark:border-rose-500/40 hover:border-rose-500' :
                  card.priority === 'MEDIUM' ? 'border-amber-300 dark:border-amber-500/40 hover:border-amber-500' : 'border-emerald-300 dark:border-emerald-500/40 hover:border-emerald-500'
                }`}
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800/80 pb-2">
                <h4 className="text-xs font-black text-slate-950 dark:text-white font-sans">{card.skillName}</h4>
                <Badge variant={card.priority}>{card.priority} Priority</Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="text-slate-600 dark:text-slate-400 font-bold">Current Level:</span>
                  <span className="font-black text-[#843bf1] dark:text-[#a970fe]">{card.currentLevel}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="text-slate-600 dark:text-slate-400 font-bold">Required Level:</span>
                  <span className="font-black text-indigo-600 dark:text-indigo-400">{card.requiredLevel}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="text-slate-600 dark:text-slate-400 font-bold">Calculated Gap:</span>
                  <span className={`font-black ${card.gap > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {card.gap > 0 ? `${card.gap}%` : 'Mastered (0%)'}
                  </span>
                </div>

                <div className="pt-2">
                  <ProgressBar
                    value={card.currentLevel}
                    max={card.requiredLevel || 100}
                    color={card.isMastered ? 'emerald' : card.priority === 'HIGH' ? 'rose' : 'brand'}
                    height="h-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 14-Dimension O*NET Modal */}
      {showOnetModal && (
        <CareerDetailModal
          socCode={selectedCareer?.socCode}
          onClose={() => setShowOnetModal(false)}
        />
      )}

    </div>
  );
};

export default SkillGapPage;
