import React from 'react';
import {
  Map,
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Code2,
  Award,
  Download,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCareer } from '../context/CareerContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';

export const LearningRoadmapPage = () => {
  const { roadmap, selectedCareer, toggleRoadmapItem } = useCareer();

  const handleToggle = (phaseIndex, itemId) => {
    toggleRoadmapItem(phaseIndex, itemId);
    if (roadmap.progressPercent >= 80) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleDownloadPlan = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12 font-sans">

      {/* Hero Header (Frosted Glass & Dynamic High-Contrast Typography) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 text-[11px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                <Map className="w-3.5 h-3.5" />
                <span>Module 5 — Content-Based Recommendation</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Personalized 5-Phase Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Custom curriculum tailored for <strong className="text-[#843bf1] dark:text-[#a970fe] font-black">{selectedCareer?.title}</strong>, sequencing missing skills from fundamental concepts through to capstone projects and interview defense.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadPlan}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-[#843bf1]/40 text-[#843bf1] dark:text-[#a970fe] font-black text-xs hover:bg-purple-50 dark:hover:bg-purple-950/40 shadow-xs hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#843bf1] dark:text-[#a970fe]" />
              <span>Export Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Metric Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Overall Roadmap Completion</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#843bf1] dark:text-[#a970fe] font-mono">{roadmap?.progressPercent || 0}%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">({roadmap?.completedItems || 0} of {roadmap?.totalItems || 0} milestones checked)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40 font-bold text-xs flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Interactive Local Sync</span>
            </span>
          </div>
        </div>

        <ProgressBar value={roadmap?.progressPercent || 0} color="brand" height="h-3.5" />
      </div>

      {/* 5 Chronological Phases */}
      <div className="space-y-6">
        {roadmap?.phases?.map((phase, pIdx) => {
          const completedCount = phase.items.filter(i => i.isCompleted).length;
          const isPhaseDone = completedCount === phase.items.length && phase.items.length > 0;

          return (
            <div
              key={pIdx}
              className={`p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-5 ${isPhaseDone ? 'ring-1 ring-emerald-500/40' : ''}`}
            >
              <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white font-sans tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{phase.description}</p>
                </div>
                <span className={`text-[11px] font-black px-3 py-1 rounded-xl border ${isPhaseDone
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                    : 'bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border-[#843bf1]/30'
                  }`}>
                  {phase.estimatedWeeks} • {completedCount}/{phase.items.length} Done
                </span>
              </div>

              <div className="space-y-4">
                {phase.items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${item.isCompleted
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/40'
                        : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800/80 hover:border-[#843bf1]/40'
                      }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        type="button"
                        onClick={() => handleToggle(pIdx, item.id)}
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-[#843bf1] transition-colors cursor-pointer"
                      >
                        {item.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className={`text-xs sm:text-sm font-black font-sans ${item.isCompleted ? 'text-emerald-700 dark:text-emerald-300 line-through' : 'text-slate-950 dark:text-white'}`}>
                            {item.skillName}
                          </h4>
                          {item.priority && <Badge variant={item.priority.toLowerCase()} size="sm">{item.priority} Priority</Badge>}
                          <span className="text-[10px] text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 font-bold border border-slate-300/40 dark:border-slate-700/40">
                            {item.difficulty} • {item.duration}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                          <BookOpen className="w-3.5 h-3.5 text-[#843bf1] dark:text-[#a970fe] shrink-0" />
                          <span>{item.resourceTitle} ({item.resourceProvider})</span>
                        </p>

                        {item.projectTask && (
                          <p className="text-xs text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-950/80 p-3 rounded-xl border border-[#843bf1]/20 dark:border-[#843bf1]/30 flex items-start gap-2 mt-2">
                            <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span><strong className="text-slate-950 dark:text-white font-bold">Practical Task:</strong> {item.projectTask}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                      <a
                        href={item.resourceUrl || 'https://google.com'}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-800 dark:text-slate-200 hover:text-[#843bf1] flex items-center gap-1.5 border border-[#843bf1]/30 shadow-xs transition-all"
                      >
                        <span>Resource</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#843bf1] dark:text-[#a970fe]" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default LearningRoadmapPage;
