import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ShieldCheck,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import TrendLineChart from '../components/charts/TrendLineChart';
import storageService from '../services/storageService';

export const FutureSkillsPage = () => {
  const futureTrends = storageService.getFutureTrends();
  const [filterCategory, setFilterCategory] = useState('ALL');

  const categories = ['ALL', 'AI & ML', 'Cloud & DevOps', 'Cybersecurity', 'Databases', 'Frontend', 'Architecture'];

  const filteredTrends = filterCategory === 'ALL'
    ? futureTrends
    : futureTrends.filter(t => t.category === filterCategory);

  return (
    <div className="space-y-8 pb-12 font-sans">

      {/* Hero Header (Frosted Glass & Dynamic High-Contrast Typography) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 text-[11px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Module 3 — Random Forest Regression & Trend Forecasting</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Future Tech Skills & Market Demand
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Machine-learning regressor forecasts for emerging technical skills across 2024–2027 based on O*NET 30.3 Hot Technologies and hiring velocity.
            </p>
          </div>

          {/* Academic Transparency Note */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-3 max-w-md shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <p className="text-[11px] leading-tight">
              <strong className="text-slate-950 dark:text-white font-black">Academic Transparency:</strong> Model predictions ($R^2=0.907$) are trained on longitudinal O*NET 30.3 datasets, distinctly separated from raw external statistics.
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Year Demand Trend Line Chart */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
              Historical & 3-Year Projected Demand Trajectories (2022–2027)
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Random Forest Regressor projected skill adoption rates</p>
          </div>
          <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
            R² = 0.907
          </span>
        </div>
        <TrendLineChart height={340} />
      </div>

      {/* Skills Demand Forecast Grid */}
      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-black text-slate-950 dark:text-white font-sans">Predicted In-Demand Technologies</h3>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${filterCategory === cat
                    ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 font-black ring-1 ring-[#843bf1]/60'
                    : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-[#843bf1]/20 dark:border-[#843bf1]/30 hover:border-[#843bf1] hover:text-[#843bf1]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrends.map((trend, idx) => {
            const isUp = trend.trend.includes('↑');
            const isDown = trend.trend.includes('↓');

            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border transition-all duration-200 shadow-md hover:shadow-xl hover:border-[#843bf1] hover:-translate-y-1 ${trend.priority === 'HIGH' ? 'border-[#843bf1]/40' : 'border-[#843bf1]/20 dark:border-[#843bf1]/30'
                  }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#843bf1]/10 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/20">
                      {trend.category}
                    </span>
                    <h4 className="text-sm font-black text-slate-950 dark:text-white mt-1.5 font-sans">{trend.skill}</h4>
                  </div>

                  <span className={`text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-xs ${isUp ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-300' :
                      isDown ? 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                    }`}>
                    {isUp && <ArrowUpRight className="w-3.5 h-3.5" />}
                    {isDown && <ArrowDownRight className="w-3.5 h-3.5" />}
                    {!isUp && !isDown && <Minus className="w-3.5 h-3.5" />}
                    {trend.trend}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-black">Current</span>
                    <span className="font-black text-slate-800 dark:text-slate-200">{trend.currentDemand}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-black">Growth</span>
                    <span className="font-black text-[#843bf1] dark:text-[#a970fe]">{trend.growthScore}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-black">Predicted</span>
                    <span className="font-black text-cyan-600 dark:text-cyan-400">{trend.predictedDemand}%</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 dark:text-slate-400 font-bold">Strategic Priority:</span>
                  <Badge variant={trend.priority.toLowerCase()} size="sm">{trend.priority}</Badge>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default FutureSkillsPage;
