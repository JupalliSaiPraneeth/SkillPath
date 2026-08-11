import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export const TrendLineChart = ({ height = 340 }) => {
  const { isDark } = useTheme();

  const data = [
    { year: '2022', 'GenAI & LLMs': 35, 'Cloud / DevOps': 72, 'Cybersecurity': 68, 'Full Stack': 82, 'Legacy Monoliths': 65 },
    { year: '2023', 'GenAI & LLMs': 58, 'Cloud / DevOps': 79, 'Cybersecurity': 74, 'Full Stack': 84, 'Legacy Monoliths': 55 },
    { year: '2024 (Now)', 'GenAI & LLMs': 88, 'Cloud / DevOps': 86, 'Cybersecurity': 82, 'Full Stack': 85, 'Legacy Monoliths': 42 },
    { year: '2025 (Proj)', 'GenAI & LLMs': 95, 'Cloud / DevOps': 91, 'Cybersecurity': 89, 'Full Stack': 87, 'Legacy Monoliths': 30 },
    { year: '2026 (Proj)', 'GenAI & LLMs': 98, 'Cloud / DevOps': 94, 'Cybersecurity': 94, 'Full Stack': 88, 'Legacy Monoliths': 22 },
    { year: '2027 (Proj)', 'GenAI & LLMs': 99, 'Cloud / DevOps': 97, 'Cybersecurity': 96, 'Full Stack': 89, 'Legacy Monoliths': 16 },
  ];

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#f1f5f9"} />
          <XAxis dataKey="year" tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 11, fontWeight: 500 }} />
          <YAxis domain={[0, 100]} tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }} unit="%" />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              borderRadius: '12px',
              color: isDark ? '#f8fafc' : '#0f172a',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
            }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '12px', fontSize: '11px' }}
            formatter={(value) => <span className="text-slate-800 dark:text-slate-200 font-bold">{value}</span>}
          />
          <Line type="monotone" dataKey="GenAI & LLMs" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
          <Line type="monotone" dataKey="Cloud / DevOps" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Cybersecurity" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Full Stack" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" />
          <Line type="monotone" dataKey="Legacy Monoliths" stroke="#f43f5e" strokeWidth={2} strokeDasharray="2 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;
