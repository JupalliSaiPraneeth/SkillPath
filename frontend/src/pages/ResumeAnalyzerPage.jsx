import React, { useState } from 'react';
import {
  FileSearch,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import MLEngine from '../services/mlEngine';
import storageService from '../services/storageService';

export const ResumeAnalyzerPage = () => {
  const { selectedCareer } = useCareer();

  const [rawText, setRawText] = useState(`Alex Rivera
B.Tech in Computer Science & Engineering (2026)
Skills: Python, Scikit-Learn, Pandas, NumPy, SQL, React.js, Tailwind CSS, Git, Machine Learning, Data Structures, FastAPI, Docker.
Projects: Built an end-to-end Machine Learning web app with automated evaluation metrics and REST API.
Experience: 1-2 years academic projects & research labs.`);

  const [analysisResult, setAnalysisResult] = useState(() => {
    return MLEngine.parseResumeText(rawText, selectedCareer);
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setRawText(text);
  };

  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = MLEngine.parseResumeText(rawText, selectedCareer);
      setAnalysisResult(result);
      if (result) {
        storageService.saveResumeAnalysis(result);
      }
      setIsProcessing(false);
    }, 300);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setRawText(content);
      const result = MLEngine.parseResumeText(content, selectedCareer);
      setAnalysisResult(result);
    };
    reader.readAsText(file);
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
                <FileSearch className="w-3.5 h-3.5 shrink-0" />
                <span>Module 7 — NLP Resume Parsing</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Resume Skill Extraction & ATS Matcher
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Extracts competencies, degrees, and project experiences, comparing them directly against <strong className="text-[#843bf1] dark:text-[#a970fe] font-black">{selectedCareer?.title}</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#843bf1]/30 dark:border-[#843bf1]/40 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5 shadow-xs shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-black text-slate-950 dark:text-white">Honest NLP Extraction</span>
          </div>
        </div>
      </div>

      {/* Input Section & Upload Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Upload & Paste Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                Upload or Paste Resume
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Supports PDF, DOCX text, or Markdown inputs</p>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
              NLP Pipeline
            </span>
          </div>

          <div className="space-y-4">
            {/* Drag and Drop Zone */}
            <label className="border-2 border-dashed border-[#843bf1]/40 dark:border-[#843bf1]/50 hover:border-[#843bf1] rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-purple-50/30 dark:bg-purple-950/20 hover:bg-purple-50/60">
              <UploadCloud className="w-8 h-8 text-[#843bf1] dark:text-[#a970fe] mb-2" />
              <span className="text-xs font-black text-slate-950 dark:text-white font-sans">Upload PDF / DOCX / TXT Resume</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Click to browse or drop file here</span>
              <input type="file" accept=".txt,.pdf,.docx,.doc,.md" onChange={handleFileUpload} className="hidden" />
            </label>

            <div>
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5 font-sans">Or Paste Resume Content Directly:</label>
              <textarea
                rows={7}
                value={rawText}
                onChange={handleTextChange}
                placeholder="Paste full resume text here..."
                className="w-full p-4 bg-slate-50/80 dark:bg-slate-950/80 border border-[#843bf1]/30 dark:border-[#843bf1]/40 rounded-2xl text-xs text-slate-900 dark:text-slate-200 font-mono focus:outline-none focus:border-[#843bf1] focus:ring-1 focus:ring-[#843bf1] shadow-xs"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-[#843bf1] hover:bg-[#722ed1] text-white font-black text-xs sm:text-sm shadow-md shadow-[#843bf1]/40 ring-1 ring-[#843bf1]/60 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? <span>Parsing NLP Tokens...</span> : <span>Run Full Resume NLP Analysis</span>}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ATS Match & Extracted Summary Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                ATS Alignment & Extraction Result
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Evaluated against {selectedCareer?.title}</p>
            </div>
            <span className="text-[11px] font-black px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40">
              {analysisResult?.resumeScore || 0}/100 ATS Score
            </span>
          </div>

          {analysisResult ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block font-black">Detected Education</span>
                  <span className="text-xs font-black text-slate-950 dark:text-white mt-0.5 block font-sans">{analysisResult.detectedEducation}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block font-black">Detected Experience</span>
                  <span className="text-xs font-black text-slate-950 dark:text-white mt-0.5 block font-sans">{analysisResult.detectedExperience}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-black text-slate-800 dark:text-slate-200 mb-2 block font-sans">
                  Detected Technical Skills ({analysisResult.totalSkillsDetected}):
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                  {analysisResult.detectedSkills.map((s, idx) => (
                    <span key={idx} className="text-[11px] px-3 py-1 rounded-xl bg-[#843bf1]/10 dark:bg-[#843bf1]/20 text-[#843bf1] dark:text-[#a970fe] border border-[#843bf1]/30 font-bold">
                      ✓ {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#843bf1]/15 dark:border-[#843bf1]/25">
                <ProgressBar
                  value={analysisResult.matchPercentage}
                  showLabel
                  label={`Target Role Requirement Match (${selectedCareer?.title})`}
                  color="brand"
                  height="h-3"
                />
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs font-medium">
              Upload or paste resume to run NLP analysis.
            </div>
          )}
        </div>

      </div>

      {/* Actionable Recommendations & Missing Skills Grid */}
      {analysisResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                  Missing Required Skills for Target Career
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Skills expected by ATS parsers for this position</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-600/40">
                {analysisResult.missingSkills.length} Deficiencies
              </span>
            </div>

            <div className="space-y-2.5">
              {analysisResult.missingSkills.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
                    <span className="font-black text-slate-950 dark:text-white font-sans">{m.name}</span>
                  </div>
                  <Badge variant="high" size="sm">Importance: {m.importance}</Badge>
                </div>
              ))}
              {analysisResult.missingSkills.length === 0 && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-black p-3">All target core requirements detected!</p>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#843bf1]/25 dark:border-[#843bf1]/35 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#843bf1]/15 dark:border-[#843bf1]/25 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                  ATS & Resume Optimization Advice
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Actionable guidelines to improve recruiter response rate</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#843bf1]/15 dark:bg-[#843bf1]/25 text-[#843bf1] dark:text-purple-200 border border-[#843bf1]/30">
                Expert Tips
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              {analysisResult.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-[#843bf1] dark:text-[#a970fe] shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-bold text-slate-800 dark:text-slate-200">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};

export default ResumeAnalyzerPage;
