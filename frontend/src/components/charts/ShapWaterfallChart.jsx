import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export const ShapWaterfallChart = ({ shapFeatures = [], baseValue = 48, height = 340 }) => {
  const { isDark } = useTheme();

  const data = (shapFeatures.length > 0 ? shapFeatures : [
    { feature: 'Python', shapValue: 24.5 },
    { feature: 'Machine Learning', shapValue: 21.0 },
    { feature: 'Scikit-Learn', shapValue: 16.5 },
    { feature: 'Data Structures', shapValue: 12.0 },
    { feature: 'PyTorch (Gap)', shapValue: -7.5 },
    { feature: 'MLOps (Gap)', shapValue: -11.0 },
  ]).map(f => ({
    name: f.feature,
    value: f.shapValue,
    isPositive: f.shapValue >= 0,
    impactText: f.shapValue >= 0 ? `+${f.shapValue}%` : `${f.shapValue}%`
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/90 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="font-bold text-slate-900 dark:text-slate-100">{item?.name}</p>
          <p className={item?.isPositive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
            SHAP Attribution: {item?.impactText}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            {item?.isPositive ? 'Increased recommendation probability' : 'Lowered match score due to skill gap'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 15, right: 30, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#f1f5f9"} />
          <XAxis
            type="number"
            domain={[-20, 30]}
            tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 11 }}
            unit="%"
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: isDark ? '#cbd5e1' : '#334155', fontSize: 11, fontWeight: 600 }}
            width={130}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={0} stroke={isDark ? "#64748b" : "#94a3b8"} strokeWidth={1.5} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isPositive ? '#10b981' : '#f43f5e'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShapWaterfallChart;
