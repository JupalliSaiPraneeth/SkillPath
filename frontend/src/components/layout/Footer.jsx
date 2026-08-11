import React from 'react';
import { Compass, Database, Cpu, ShieldCheck, Users, Sparkles, ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#090D16]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Grid: Brand & Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">

          {/* Col 1: Brand & Project Context */}
          <div className="md:col-span-2 space-y-3">
            <Logo size="md" />
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Intelligent Skill Gap Analysis and Career Guidance System based on O*NET 30.3 occupational standard, Multidimensional Cosine Similarity, Random Forest Classifiers, and SHAP Explainable AI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-cyan-400 font-bold text-[10px]">
              <Sparkles className="w-3 h-3" />
              <span>B.Tech Final-Year Capstone Demonstration</span>
            </div>
          </div>

          {/* Col 2: Core ML & Analytics Modules */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Core Modules
            </span>
            <ul className="space-y-1.5 text-xs font-semibold">
              <li>
                <Link to="/skill-gap" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>Cosine Skill Gap Engine</span>
                </Link>
              </li>
              <li>
                <Link to="/career-recommendations" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>Random Forest Recommendations</span>
                </Link>
              </li>
              <li>
                <Link to="/explainable-ai" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>SHAP & LIME Interpretability</span>
                </Link>
              </li>
              <li>
                <Link to="/future-skills" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>Future Tech Trend Forecasting</span>
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>5-Phase Learning Roadmap</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Evaluation & Portals */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Viva & Evaluation
            </span>
            <ul className="space-y-1.5 text-xs font-semibold">
              <li>
                <Link to="/model-evaluation" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold">
                  <span>100% Classifier Accuracy Proof</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">
                  <span>Interactive Skill Assessment</span>
                </Link>
              </li>
              <li>
                <Link to="/resume-analyzer" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">
                  <span>NLP Resume Analyzer</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Row: Badges & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-500 dark:text-slate-400">
            © 2026 SkillPath Finder. Engineering Capstone Project. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
              <Database className="w-3 h-3 text-blue-500" />
              <span>O*NET 30.3 Standard</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
              <Cpu className="w-3 h-3 text-cyan-500" />
              <span>RF Classifier (100% Acc)</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>SHAP & LIME XAI</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

