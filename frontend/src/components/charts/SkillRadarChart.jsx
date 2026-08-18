import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export const SkillRadarChart = ({ skillCards = [], height = 300 }) => {
  const { isDark } = useTheme();

  const defaultSkills = [
    { skill: 'Python', yourProficiency: 85, benchmark: 90 },
    { skill: 'Machine Learning Fundamentals', yourProficiency: 30, benchmark: 80 },
    { skill: 'Data Modeling & ETL', yourProficiency: 35, benchmark: 85 },
    { skill: 'Data Visualization', yourProficiency: 65, benchmark: 75 },
    { skill: 'Cloud & MLOps', yourProficiency: 20, benchmark: 70 },
    { skill: 'Data Structures & Algorithms', yourProficiency: 75, benchmark: 80 }
  ];

  const data = (skillCards.length >= 4 ? skillCards.slice(0, 6) : defaultSkills).map(s => {
    const rawName = s.skillName || s.skill || s.name || '';
    let short = rawName;
    if (short.length > 13) short = short.substring(0, 11) + '..';
    return {
      skill: short,
      fullSkill: rawName,
      yourProficiency: s.currentLevel !== undefined ? s.currentLevel : (s.yourProficiency || 0),
      benchmark: s.requiredLevel || s.benchmark || 80
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-slate-900 dark:text-slate-100 pb-1 border-b border-slate-100 dark:border-slate-800">{item?.fullSkill || item?.skill}</p>
          <p className="text-purple-600 dark:text-purple-400 font-semibold flex items-center justify-between gap-3">
            <span>Your Proficiency:</span>
            <span className="font-bold">{item?.yourProficiency}%</span>
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-between gap-3">
            <span>O*NET Benchmark:</span>
            <span className="font-bold">{item?.benchmark}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="68%" data={data}>
            <PolarGrid stroke={isDark ? "#475569" : "#cbd5e1"} />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: isDark ? '#f8fafc' : '#0f172a', fontSize: 10, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 700 }}
              stroke={isDark ? "#475569" : "#cbd5e1"}
            />
            <Radar
              name="Your Proficiency"
              dataKey="yourProficiency"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{ r: 3.5, fill: '#8b5cf6', stroke: '#ffffff', strokeWidth: 1.5 }}
            />
            <Radar
              name="O*NET Benchmark"
              dataKey="benchmark"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.08}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={{ r: 3.5, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 1.5 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend below matching reference photo */}
      <div className="flex items-center justify-center gap-6 mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex items-center">
            <span className="w-3 h-0.5 bg-purple-500 inline-block" />
            <span className="w-2 h-2 rounded-full bg-purple-500 -ml-1 border border-white inline-block" />
            <span className="w-3 h-0.5 bg-purple-500 -ml-1 inline-block" />
          </span>
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Your Proficiency</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center">
            <span className="w-3 h-0.5 border-t border-dashed border-blue-600 inline-block" />
            <span className="w-2 h-2 rounded-full bg-blue-600 -ml-1 border border-white inline-block" />
            <span className="w-3 h-0.5 border-t border-dashed border-blue-600 -ml-1 inline-block" />
          </span>
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">O*NET Benchmark</span>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
