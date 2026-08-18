import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export const GapBarChart = ({ skillCards = [], height = 300 }) => {
  const { isDark } = useTheme();

  const defaultSkills = [
    { name: 'Python', current: 28, gap: 65, required: 93 },
    { name: 'ML Fundamentals', current: 15, gap: 64, required: 79 },
    { name: 'Data Modeling', current: 15, gap: 70, required: 85 },
    { name: 'Algorithms', current: 12, gap: 56, required: 68 },
    { name: 'SQL', current: 12, gap: 49, required: 61 },
    { name: 'Cloud Computing', current: 12, gap: 56, required: 68 },
    { name: 'Data Visualization', current: 12, gap: 48, required: 60 }
  ];

  const data = skillCards.length >= 4 
    ? skillCards.slice(0, 7).map(s => {
        const current = s.currentLevel !== undefined ? s.currentLevel : 0;
        const required = s.requiredLevel || 80;
        const gap = Math.max(0, required - current);
        let shortName = s.skillName || s.name || '';
        if (shortName.length > 15) shortName = shortName.substring(0, 13) + '..';
        return {
          name: shortName,
          fullName: s.skillName || s.name,
          current: current,
          gap: gap,
          required: required
        };
      })
    : defaultSkills;

  const chartData = data.map(d => ({
    name: d.name,
    fullName: d.fullName || d.name,
    'Current Proficiency': d.current,
    'Gap (Required - Current)': d.gap,
    required: d.required
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl text-xs space-y-1.5 min-w-[170px]">
          <p className="font-bold text-slate-900 dark:text-slate-100 pb-1 border-b border-slate-100 dark:border-slate-800">
            {item?.fullName}
          </p>
          <div className="flex justify-between items-center text-blue-600 dark:text-blue-400 font-semibold">
            <span>Current Proficiency:</span>
            <span className="font-bold">{item?.['Current Proficiency']}%</span>
          </div>
          <div className="flex justify-between items-center text-rose-500 font-semibold">
            <span>Gap (Required):</span>
            <span className="font-bold">+{item?.['Gap (Required - Current)']}%</span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[11px] pt-0.5 border-t border-slate-100 dark:border-slate-800">
            <span>Target Level:</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{item?.required}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 15, right: 10, left: -20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
            <XAxis
              dataKey="name"
              tick={({ x, y, payload }) => {
                const name = String(payload?.value || '');
                const display = name.length > 10 ? name.substring(0, 8) + '…' : name;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={8}
                      dx={-2}
                      textAnchor="end"
                      fill={isDark ? '#f8fafc' : '#0f172a'}
                      transform="rotate(-35)"
                      fontSize={10}
                      fontWeight={700}
                      fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
                    >
                      {display}
                    </text>
                  </g>
                );
              }}
              interval={0}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#475569' : '#cbd5e1' }}
              height={45}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10, fontWeight: 700 }}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#475569' : '#cbd5e1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Current Proficiency" stackId="gapStack" fill="#2563eb" barSize={16} />
            <Bar dataKey="Gap (Required - Current)" stackId="gapStack" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with mobile wrapping */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#ef4444] inline-block shrink-0" />
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Gap (Required - Current)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#2563eb] inline-block shrink-0" />
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Current Proficiency</span>
        </div>
      </div>
    </div>
  );
};

export default GapBarChart;
