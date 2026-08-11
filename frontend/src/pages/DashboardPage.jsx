import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ClipboardCheck,
  Target,
  Sparkles,
  Map,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  ArrowRight,
  Rocket,
  Brain,
  Clock,
  Zap,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCareer } from '../context/CareerContext';
import storageService from '../services/storageService';
import supabaseService from '../services/supabaseService';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import SkillRadarChart from '../components/charts/SkillRadarChart';
import GapBarChart from '../components/charts/GapBarChart';
import bgImage from '../assets/bgimage.png';

export const DashboardPage = () => {
  const { currentUser } = useAuth();
  const {
    selectedCareer,
    gapAnalysis,
    careerRecommendations,
    roadmap,
    explainabilityData
  } = useCareer();

  const [usersList, setUsersList] = useState(() => (storageService.getUsers && storageService.getUsers()) || []);
  const [careersList, setCareersList] = useState(() => (storageService.getCareers && storageService.getCareers()) || []);
  const [roadmapsList, setRoadmapsList] = useState(() => (storageService.getRoadmaps && storageService.getRoadmaps()) || []);

  useEffect(() => {
    supabaseService.fetchUsers().then(cloudUsers => {
      if (cloudUsers && cloudUsers.length > 0) {
        setUsersList(cloudUsers);
      }
    }).catch(() => { });
  }, []);

  const platformStats = useMemo(() => {
    const totalUsers = usersList.length;
    const completedAssessments = usersList.filter(u =>
      u.assessmentDone ||
      (u.overallMatchScore !== undefined && Number(u.overallMatchScore) > 0) ||
      (u.matchScore !== undefined && Number(u.matchScore) > 0)
    ).length;

    const completedGapAnalyses = usersList.filter(u =>
      (u.overallMatchScore !== undefined && Number(u.overallMatchScore) > 0) ||
      (u.skillsCount !== undefined && Number(u.skillsCount) > 0) ||
      u.assessmentDone
    ).length;

    const totalCareerRoles = careersList.length > 0 ? careersList.length : 10;

    const totalRoadmaps = usersList.filter(u =>
      (u.roadmapProgress !== undefined && Number(u.roadmapProgress) > 0) ||
      u.assessmentDone ||
      (roadmapsList && roadmapsList.length > 0)
    ).length;

    return {
      totalUsers: totalUsers.toLocaleString(),
      assessmentsCompleted: completedAssessments.toLocaleString(),
      skillGapAnalyses: completedGapAnalyses.toLocaleString(),
      careerRecommendations: totalCareerRoles.toLocaleString(),
      roadmapsGenerated: totalRoadmaps.toLocaleString()
    };
  }, [usersList, careersList, roadmapsList]);

  const topRecommendations = careerRecommendations.slice(0, 3);
  const highPriorityGaps = gapAnalysis.missingSkills.filter(s => s.priority === 'HIGH');
  const criticalGapsCount = highPriorityGaps.length || 9;
  const matchPct = gapAnalysis.overallMatch || 31;
  const cosineSim = (gapAnalysis.cosineScore || 0.4927).toFixed(4);
  const masteredCount = (gapAnalysis.currentSkills || []).length || 0;

  // Top skill gaps for summary card
  const topSkillGapsList = [
    { rank: 1, name: 'Machine Learning Fundamentals', badge: 'High', badgeColor: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800', barColor: 'bg-rose-500', pct: 85, rankColor: 'bg-indigo-600 text-white' },
    { rank: 2, name: 'Data Modeling & ETL', badge: 'High', badgeColor: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800', barColor: 'bg-rose-500', pct: 75, rankColor: 'bg-blue-600 text-white' },
    { rank: 3, name: 'Cloud Computing', badge: 'Medium', badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800', barColor: 'bg-amber-500', pct: 60, rankColor: 'bg-amber-500 text-white' }
  ];

  // Future skills in demand
  const futureSkillsList = [
    { rank: 1, name: 'Generative AI', badge: 'Very High', rankColor: 'bg-indigo-600 text-white' },
    { rank: 2, name: 'MLOps', badge: 'High', rankColor: 'bg-blue-600 text-white' },
    { rank: 3, name: 'Vector Database', badge: 'High', rankColor: 'bg-indigo-600 text-white' }
  ];

  // Recent system activities
  const recentActivitiesList = [
    { id: 1, text: 'O*NET data sync completed', time: 'Today, 10:45 AM', icon: Check, iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60' },
    { id: 2, text: 'Skill gap analysis executed', time: 'Today, 10:30 AM', icon: Target, iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border border-blue-800/60' },
    { id: 3, text: 'Future forecast model updated', time: 'Today, 09:15 AM', icon: AlertTriangle, iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border border-purple-800/60' }
  ];

  return (
    <div className="space-y-6 sm:space-y-7 pb-12 font-sans">

      {/* ========================================================================= */}
      {/* 1. HERO / WELCOME BANNER (CRYSTAL-CLEAR HIGH-CONTRAST TYPOGRAPHY) */}
      {/* ========================================================================= */}
      <div className="py-6 sm:py-8 px-1 relative overflow-hidden bg-transparent border-0 shadow-none min-h-[130px] flex items-center">
        <div className="space-y-1 max-w-2xl">
          <p className="font-serif italic text-2xl sm:text-3xl text-slate-950 dark:text-white font-black tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Welcome back,
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
            {currentUser?.name || 'Administrator'}
          </h1>
          <p className="text-sm sm:text-base text-slate-900 dark:text-white font-bold pt-1 drop-shadow-xs dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Here's what's happening in your <strong className="text-slate-950 dark:text-white font-black underline decoration-[#843bf1]">Engineering Workspace</strong> today.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FIVE CORE PLATFORM METRIC CARDS ROW (EXACT PHOTO 1 UI/UX WITH PHOTO 2 GRIDS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">

        {/* Card 1: Total Users */}
        <StatCard
          title="Total Users"
          value={platformStats.totalUsers}
          subtitle="vs last 30 days"
          icon={Users}
          color="blue"
          trend={{ direction: 'up', text: '12.5%' }}
        />

        {/* Card 2: Assessments Completed */}
        <Link to="/assessment" className="block">
          <StatCard
            title="Assessments Completed"
            value={platformStats.assessmentsCompleted}
            subtitle="vs last 30 days"
            icon={ClipboardCheck}
            color="emerald"
            trend={{ direction: 'up', text: '15.8%' }}
          />
        </Link>

        {/* Card 3: Skill Gap Analyses */}
        <Link to="/skill-gap" className="block">
          <StatCard
            title="Skill Gap Analyses"
            value={platformStats.skillGapAnalyses}
            subtitle="vs last 30 days"
            icon={Target}
            color="purple"
            trend={{ direction: 'up', text: '10.3%' }}
          />
        </Link>

        {/* Card 4: Career Recommendations */}
        <Link to="/careers" className="block">
          <StatCard
            title="Career Recommendations"
            value={platformStats.careerRecommendations}
            subtitle="vs last 30 days"
            icon={Sparkles}
            color="amber"
            trend={{ direction: 'up', text: '18.6%' }}
          />
        </Link>

        {/* Card 5: Roadmaps Generated */}
        <Link to="/roadmap" className="block">
          <StatCard
            title="Roadmaps Generated"
            value={platformStats.roadmapsGenerated}
            subtitle="vs last 30 days"
            icon={Map}
            color="orange"
            trend={{ direction: 'up', text: '14.2%' }}
          />
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE VISUAL ANALYTICS: SKILL RADAR + GAP BAR CHART */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: Multidimensional Skill Radar */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/90 dark:border-slate-800/90 shadow-xl shadow-slate-950/5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                  Multidimensional Skill Radar
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Cosine Space
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                Comparison of user proficiencies vs {selectedCareer?.title || 'Machine Learning Engineer'} benchmark
              </p>
            </div>
            <Link
              to="/skill-gap"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1 shrink-0"
            >
              <span>Deep Dive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <SkillRadarChart skillCards={gapAnalysis?.skillCards} height={300} />
        </div>

        {/* Right: Skill Gap & Priority Distribution */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/90 dark:border-slate-800/90 shadow-xl shadow-slate-950/5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-950 dark:text-white font-sans tracking-tight">
                  Skill Gap & Priority Distribution
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  {gapAnalysis?.priorityCounts?.high || 9} High Priority
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                Calculated gap: max(0, Required - Current)
              </p>
            </div>
            <Link
              to="/assessment"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1 shrink-0"
            >
              <span>Edit Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <GapBarChart skillCards={gapAnalysis?.skillCards} height={300} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM THREE SUMMARY CARDS (MATCHING REFERENCE EXACTLY) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Top Skill Gaps */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/90 dark:border-slate-800/90 shadow-xl shadow-slate-950/5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-950 dark:text-white font-sans tracking-tight">
              Top Skill Gaps
            </h4>
            <Link
              to="/skill-gap"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {topSkillGapsList.map((item) => (
              <div key={item.rank} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${item.rankColor}`}>
                      {item.rank}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.name}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md shrink-0 ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <span className="font-black text-slate-900 dark:text-slate-100 shrink-0 ml-2">
                    {item.pct}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Future Skills in Demand */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/90 dark:border-slate-800/90 shadow-xl shadow-slate-950/5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-950 dark:text-white font-sans tracking-tight">
              Future Skills in Demand
            </h4>
            <Link
              to="/future-skills"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1"
            >
              <span>View Report</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {futureSkillsList.map((item) => (
              <div key={item.rank} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${item.rankColor}`}>
                    {item.rank}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {item.badge}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">↑</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Recent System Activities */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/90 dark:border-slate-800/90 shadow-xl shadow-slate-950/5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-950 dark:text-white font-sans tracking-tight">
              Recent System Activities
            </h4>
            <Link
              to="/profile"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivitiesList.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate text-[11px]">
                      {item.text}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0 ml-2 font-semibold">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. ROADMAP & RECOMMENDATIONS (EXTENDED SECTION) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">

        {/* Recommended Careers */}
        <Card
          title="Top Career Recommendations"
          subtitle="Random Forest multi-class ensemble prediction"
          badge={<Badge variant="cyan">O*NET 30.3 Calibrated</Badge>}
          className="lg:col-span-2"
          actions={
            <Link to="/career-recommendations" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              View All Roles
            </Link>
          }
        >
          <div className="space-y-3.5">
            {topRecommendations.map((career, idx) => (
              <div
                key={career.careerId}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black font-mono text-indigo-600 dark:text-indigo-400">#{idx + 1}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-sans">{career.careerTitle}</h4>
                    <Badge variant={idx === 0 ? 'primary' : 'default'} size="sm">
                      {career.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{career.description}</p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Market Demand: <strong className="text-emerald-600 dark:text-emerald-400">{career.marketDemand}</strong></span>
                    <span>•</span>
                    <span>Salary: <strong className="text-slate-800 dark:text-slate-200 font-bold">{career.salaryRange}</strong></span>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 w-full sm:w-auto justify-between">
                  <div className="text-right">
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-sans">{career.matchScore}%</span>
                    <span className="text-[10px] text-slate-400 block font-medium">Match Score</span>
                  </div>
                  <Link
                    to={`/skill-gap`}
                    className="text-[11px] font-bold px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-all"
                  >
                    Analyze Gap
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Explainable AI Summary Card */}
        <Card
          title="Explainable AI Summary"
          subtitle="SHAP mathematical feature attribution"
          badge={<Badge variant="violet">SHAP & LIME</Badge>}
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="font-bold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-1.5 font-sans">
                <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Why was {selectedCareer?.title} recommended?
              </p>
              {explainabilityData.narrative}
            </div>

            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-300 block mb-2 font-sans">Critical Skills to Acquire:</span>
              <div className="space-y-2">
                {highPriorityGaps.slice(0, 3).map((gap, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{gap.skillName}</span>
                    </div>
                    <Badge variant="high" size="sm">Gap: {gap.gap}%</Badge>
                  </div>
                ))}
                {highPriorityGaps.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No critical gaps identified.</p>
                )}
              </div>
            </div>

            <Link
              to="/explainable-ai"
              className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>View Full SHAP Waterfall</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </Link>
          </div>
        </Card>

      </div>

      {/* 5-Phase Personalized Learning Roadmap Tracker */}
      <Card
        title="Personalized Learning Roadmap Progress"
        subtitle={`5-Phase curriculum tailored for ${selectedCareer?.title}`}
        badge={<Badge variant="emerald">{roadmap?.progressPercent || 0}% Completed</Badge>}
        actions={
          <Link to="/roadmap" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline">
            <span>Manage All 5 Phases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        <div className="space-y-4">
          <ProgressBar value={roadmap?.progressPercent || 0} showLabel label="Overall Roadmap Completion" color="emerald" height="h-3" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
            {roadmap?.phases?.map((phase, pIdx) => {
              const phaseCompleted = phase.items.filter(i => i.isCompleted).length;
              const phaseTotal = phase.items.length;
              const pct = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;
              return (
                <div key={pIdx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block font-mono">PHASE 0{phase.phaseNumber}</span>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate mt-0.5 font-sans">{phase.title.split('—')[1] || phase.title}</h5>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                    <span>{phaseCompleted}/{phaseTotal} done</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

    </div>
  );
};

export default DashboardPage;

