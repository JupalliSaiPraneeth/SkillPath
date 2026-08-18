import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sliders,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import SkillRadarChart from '../components/charts/SkillRadarChart';
import storageService from '../services/storageService';

export const SkillAssessmentPage = () => {
  const navigate = useNavigate();
  const { skillsList, userSkills, updateSkillLevel, updateBatchSkills, resetSkills, gapAnalysis, selectedCareer } = useCareer();
  const questions = storageService.getQuestions();

  const categories = ['All', 'Programming', 'AI & ML', 'Frontend', 'Backend', 'Cloud & DevOps', 'Databases', 'Cybersecurity', 'Core & Soft Skills'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [mode, setMode] = useState('slider');
  const [submittedQuiz, setSubmittedQuiz] = useState({});

  const filteredSkills = activeCategory === 'All'
    ? skillsList
    : skillsList.filter(s => s.category === activeCategory);

  const handleSliderChange = (skillId, value) => {
    updateSkillLevel(skillId, parseInt(value, 10));
  };

  const handleQuizAnswer = (questionId, skillId, score) => {
    setSubmittedQuiz(prev => ({ ...prev, [questionId]: score }));
    updateSkillLevel(skillId, score);
  };

  const handleResetToBaseline = () => {
    if (resetSkills) {
      resetSkills();
    } else {
      storageService.saveUserSkills({});
    }
    setSubmittedQuiz({});
  };

  const handleDone = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-8 pb-12 font-sans">

      {/* Hero Header (Frosted Glass & Dynamic High-Contrast Typography) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-[#843bf1]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 text-[11px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                <ClipboardCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Module 1 — Rule-Based Assessment</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Interactive Skill Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Rate your technical proficiencies or answer scenario MCQs to generate normalized skill vectors (0–100).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/30 dark:border-[#843bf1]/40 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setMode('slider')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-black transition-all ${mode === 'slider'
                    ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 ring-1 ring-[#843bf1]/60'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#843bf1]'
                  }`}
              >
                Proficiency Sliders
              </button>
              <button
                onClick={() => setMode('quiz')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-black transition-all ${mode === 'quiz'
                    ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 ring-1 ring-[#843bf1]/60'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#843bf1]'
                  }`}
              >
                Scenario Quiz Bank
              </button>
            </div>

            <button
              onClick={handleResetToBaseline}
              className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:border-rose-300 shadow-sm transition-all cursor-pointer shrink-0"
              title="Reset All Skill Scores to 0%"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat
                ? 'bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/35 font-black ring-1 ring-[#843bf1]/60'
                : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-[#843bf1]/20 dark:border-[#843bf1]/30 hover:border-[#843bf1] hover:text-[#843bf1]'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Assessment Controls + Live Vector Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Assessment Controls */}
        <div className="lg:col-span-2 space-y-4">
          {mode === 'slider' ? (
            <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-4">
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                    Technical Skills Inventory ({filteredSkills.length} Skills)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Drag sliders to adjust normalized proficiency scores</p>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
                  Normalized 0–100
                </span>
              </div>

              <div className="space-y-4">
                {filteredSkills.map((skill) => {
                  const currentLevel = userSkills[skill.id] || 0;
                  return (
                    <div key={skill.id} className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 space-y-2.5 hover:border-[#843bf1]/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-black text-slate-950 dark:text-white font-sans">{skill.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#843bf1]/10 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/20">
                              {skill.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{skill.description}</p>
                        </div>
                        <span className={`text-xs font-black px-2.5 py-1 rounded-xl shadow-xs ${currentLevel >= 75 ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300' :
                            currentLevel >= 45 ? 'bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                          }`}>
                          {currentLevel}%
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentLevel}
                          onChange={(e) => handleSliderChange(skill.id, e.target.value)}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#843bf1]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Done Action Bar */}
              <div className="pt-6 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Finished scoring your skills?
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Click Done to finalize your assessment and view your personalized Executive Dashboard.
                  </p>
                </div>
                <button
                  id="assessment-slider-done-btn"
                  onClick={handleDone}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#843bf1] via-indigo-600 to-blue-600 hover:from-[#722ada] hover:to-blue-500 text-white font-black text-sm sm:text-base shadow-lg shadow-[#843bf1]/30 hover:shadow-xl hover:shadow-[#843bf1]/40 transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Done</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-4">
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                    Scenario-Based Assessment Questions ({(activeCategory === 'All' ? questions : questions.filter(q => q.category === activeCategory)).length} Technical Challenges)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Select answers to calibrate your skill score dynamically</p>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
                  Adaptive Quiz
                </span>
              </div>

              {/* Progress & Sync Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-[#843bf1]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-[#843bf1] text-white shadow-md shadow-[#843bf1]/40">
                    <ClipboardCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">
                      Technical Knowledge Progress: {Object.keys(submittedQuiz).length} / {questions.length} Answered
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Scores automatically update your mathematical competency vector u in Supabase.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] flex items-center gap-1 shadow-xs border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Synced
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {(activeCategory === 'All' ? questions : questions.filter(q => q.category === activeCategory)).map((q, idx) => (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#843bf1] dark:text-[#a970fe] font-mono">Q{idx + 1}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#843bf1]/10 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/20">
                          {q.category}
                        </span>
                        {q.difficulty && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${q.difficulty === 'Expert' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300' :
                              q.difficulty === 'Advanced' ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300' :
                                'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                            }`}>
                            {q.difficulty}
                          </span>
                        )}
                      </div>
                      {submittedQuiz[q.id] !== undefined && (
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Scored: {submittedQuiz[q.id]}%
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{q.question}</p>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = submittedQuiz[q.id] === opt.score;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleQuizAnswer(q.id, q.skillId, opt.score)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${isSelected
                                ? 'bg-purple-50 dark:bg-[#843bf1]/20 border-[#843bf1] text-slate-900 dark:text-white font-bold shadow-sm'
                                : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#843bf1]/40'
                              }`}
                          >
                            <span className="font-mono text-slate-400 dark:text-slate-500">{String.fromCharCode(65 + oIdx)}.</span>
                            <span className="flex-1">{opt.text}</span>
                            {isSelected && (
                              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                                {opt.score}%
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Done Action Bar */}
              <div className="pt-6 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Completed your technical questions?
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Click Done to finalize your scores and return to the Executive Dashboard.
                  </p>
                </div>
                <button
                  id="assessment-quiz-done-btn"
                  onClick={handleDone}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#843bf1] via-indigo-600 to-blue-600 hover:from-[#722ada] hover:to-blue-500 text-white font-black text-sm sm:text-base shadow-lg shadow-[#843bf1]/30 hover:shadow-xl hover:shadow-[#843bf1]/40 transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Done</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Vector Radar & Gap Preview */}
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                  Real-Time Skill Vector
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Compared against {selectedCareer?.title}</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40">
                {gapAnalysis.overallMatchScore}% Match
              </span>
            </div>

            <SkillRadarChart skillCards={gapAnalysis.skillCards} height={280} />

            <div className="pt-4 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-bold">Cosine Similarity:</span>
                <span className="font-mono font-black text-[#843bf1] dark:text-[#a970fe] text-sm">{gapAnalysis.cosineSimilarity}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-bold">High Priority Gaps:</span>
                <span className="font-black text-rose-600 dark:text-rose-400">{gapAnalysis.priorityCounts.high} skills</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-bold">Target Career:</span>
                <span className="font-black text-[#843bf1] dark:text-[#a970fe]">{selectedCareer?.title}</span>
              </div>

              <button
                id="assessment-radar-done-btn"
                onClick={handleDone}
                className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#843bf1] to-blue-600 hover:from-[#722ada] hover:to-blue-500 text-white font-black text-xs sm:text-sm shadow-md shadow-[#843bf1]/30 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Done</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SkillAssessmentPage;
