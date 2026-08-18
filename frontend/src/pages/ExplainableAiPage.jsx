import React from 'react';
import {
  Brain,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ShapWaterfallChart from '../components/charts/ShapWaterfallChart';

export const ExplainableAiPage = () => {
  const { selectedCareer, explainabilityData } = useCareer();

  return (
    <div className="space-y-8 pb-12 font-sans">

      {/* Hero Header (Frosted Glass & Dynamic High-Contrast Typography) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 text-[11px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 shrink-0" />
                <span>Module 6 — SHAP & LIME Interpretability</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Explainable AI (XAI) Transparency
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Mathematical breakdown of model decisions using Shapley Additive Explanations (SHAP) and Local Interpretable Model-agnostic Explanations (LIME).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5 shadow-xs shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-black text-slate-950 dark:text-white">Transparent Mathematics</span>
          </div>
        </div>
      </div>

      {/* Model Narrative Callout */}
      <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-lg transition-colors">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#843bf1]/15 dark:bg-[#843bf1]/25 border border-[#843bf1]/30 text-[#843bf1] dark:text-[#a970fe] shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-950 dark:text-white font-sans">
              Why was {selectedCareer?.title} recommended?
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
              {explainabilityData.narrative}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25 pt-2.5">
              <span>Primary Positive Driver: <strong className="text-emerald-600 dark:text-emerald-400 font-black">{explainabilityData.topPositiveDriver}</strong></span>
              <span>•</span>
              <span>Major Gap Factor: <strong className="text-rose-600 dark:text-rose-400 font-black">{explainabilityData.topGapFactor}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* SHAP Waterfall Chart & LIME Contributions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SHAP Waterfall (2 Cols) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                SHAP Feature Attribution Waterfall
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">How individual skill proficiencies pushed recommendation probability</p>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40">
              Shapley Values
            </span>
          </div>
          <ShapWaterfallChart
            shapFeatures={explainabilityData.shapFeatures}
            baseValue={explainabilityData.baseValue}
            height={340}
          />
        </div>

        {/* LIME Local Surrogate Weights (1 Col) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                LIME Local Decision Weights
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Interpretable linear surrogate boundary</p>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
              Local Weights
            </span>
          </div>
          <div className="space-y-3">
            {explainabilityData.limeContributions.slice(0, 6).map((lime, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80 text-xs space-y-1 hover:border-[#843bf1]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-950 dark:text-white text-xs font-sans">{lime.rule}</span>
                  <span className="font-mono text-[#843bf1] dark:text-[#a970fe] font-black">{lime.weight}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-bold ${lime.effect.includes('Supports') ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {lime.effect}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-medium">Weight $\omega_{idx}$</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detailed Feature Importance Table */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
              SHAP Numerical Feature Contribution Table
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Exact mathematical values $\phi_i$ calculated per skill attribute</p>
          </div>
          <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
            Attribution Vectors
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black">
                <th className="pb-3 px-2">Skill / Feature Name</th>
                <th className="pb-3 px-2">Your Score</th>
                <th className="pb-3 px-2">Target Baseline</th>
                <th className="pb-3 px-2">SHAP Impact Value ($\phi$)</th>
                <th className="pb-3 px-2">Direction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {explainabilityData.shapFeatures.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-2 font-black text-slate-950 dark:text-white font-sans">{f.feature}</td>
                  <td className="py-3 px-2 font-mono font-black text-[#843bf1] dark:text-[#a970fe]">{f.userScore}%</td>
                  <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-400">{f.requiredScore}%</td>
                  <td className="py-3 px-2 font-mono font-bold">
                    <span className={f.shapValue >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                      {f.percentageText}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={f.shapValue >= 0 ? 'success' : 'high'} size="sm">
                      {f.impact}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
export default ExplainableAiPage;
