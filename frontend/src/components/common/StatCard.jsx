import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = null,
  color = 'brand',
  sparklineColor = null,
  onClick = null
}) => {
  const colorMap = {
    brand: {
      circle: 'bg-gradient-to-tr from-[#151130] to-[#3a2e82] text-[#C8BEFA] shadow-md shadow-[#151130]/30 ring-1 ring-[#C8BEFA]/30',
      stroke: '#5c4fb8',
      path: 'M0,18 C30,26 60,12 90,22 C120,10 150,24 180,14 C210,24 240,16 260,18'
    },
    midnight: {
      circle: 'bg-gradient-to-tr from-[#151130] via-[#241c52] to-[#3a2e82] text-[#C8BEFA] shadow-md shadow-[#151130]/30 ring-1 ring-[#C8BEFA]/40',
      stroke: '#C8BEFA',
      path: 'M0,18 C30,26 60,12 90,22 C120,10 150,24 180,14 C210,24 240,16 260,18'
    },
    blue: {
      circle: 'bg-gradient-to-tr from-[#151130] to-[#241c52] text-[#C8BEFA] shadow-md shadow-[#151130]/30 ring-1 ring-[#C8BEFA]/30',
      stroke: '#5c4fb8',
      path: 'M0,20 C30,28 60,12 90,24 C120,8 150,22 180,14 C210,26 240,16 260,18'
    },
    cyan: {
      circle: 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30',
      stroke: '#06b6d4',
      path: 'M0,20 C30,28 60,12 90,24 C120,8 150,22 180,14 C210,26 240,16 260,18'
    },
    purple: {
      circle: 'bg-gradient-to-tr from-[#5c4fb8] to-[#843bf1] text-[#C8BEFA] shadow-md shadow-purple-500/30 ring-1 ring-[#C8BEFA]/30',
      stroke: '#843bf1',
      path: 'M0,22 C30,12 60,26 90,16 C120,24 150,10 180,22 C210,14 240,24 260,18'
    },
    violet: {
      circle: 'bg-gradient-to-tr from-[#241c52] to-[#5c4fb8] text-[#C8BEFA] shadow-md shadow-purple-500/30 ring-1 ring-[#C8BEFA]/30',
      stroke: '#a855f7',
      path: 'M0,24 C30,14 60,26 90,18 C120,26 150,12 180,24 C210,14 240,22 260,16'
    },
    orange: {
      circle: 'bg-amber-600 text-white shadow-md shadow-amber-500/30',
      stroke: '#d97706',
      path: 'M0,22 C30,15 60,28 90,14 C120,26 150,10 180,22 C210,12 240,26 260,16'
    },
    rose: {
      circle: 'bg-rose-600 text-white shadow-md shadow-rose-500/30',
      stroke: '#f43f5e',
      path: 'M0,22 C30,15 60,28 90,14 C120,26 150,10 180,22 C210,12 240,26 260,16'
    },
    emerald: {
      circle: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30',
      stroke: '#10b981',
      path: 'M0,24 C30,16 60,26 90,12 C120,22 150,12 180,26 C210,14 240,18 260,12'
    },
    amber: {
      circle: 'bg-amber-600 text-white shadow-md shadow-amber-500/30',
      stroke: '#f59e0b',
      path: 'M0,18 C30,24 60,12 90,26 C120,10 150,24 180,8 C210,20 240,12 260,18'
    },
  };

  const scheme = colorMap[color] || colorMap.brand;
  const strokeColor = sparklineColor || scheme.stroke;
  const cardId = (title || 'stat').replace(/[^a-zA-Z0-9]/g, '');

  return (
    <div
      onClick={onClick}
      className={`p-3.5 sm:p-5 rounded-3xl bg-white/95 dark:bg-[#151130]/90 backdrop-blur-xl border border-[#151130]/10 dark:border-[#C8BEFA]/20 transition-all duration-300 shadow-xl shadow-slate-950/5 hover:shadow-2xl hover:border-[#5c4fb8]/50 dark:hover:border-[#C8BEFA]/50 ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''} flex flex-col justify-between overflow-hidden relative group`}
    >
      <div>
        {/* Top: Circular Icon + Title & Value */}
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          {Icon && (
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${scheme.circle} group-hover:scale-105 transition-transform duration-200`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          )}
          <div className="min-w-0">
            <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 block truncate">
              {title}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 dark:text-white font-sans tracking-tight leading-none block mt-0.5 sm:mt-1">
              {value}
            </span>
          </div>
        </div>
      </div>

      {/* Subtitle & Trend */}
      <div className="mt-2 sm:mt-3 flex items-center justify-between gap-1 text-[10px] sm:text-xs font-bold">
        {subtitle && (
          <span className="text-slate-600 dark:text-slate-400 truncate">
            {subtitle}
          </span>
        )}
        {trend && (
          <span className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-md shrink-0 text-[9px] sm:text-[11px] ${
            trend.direction === 'up' 
              ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50' 
              : trend.direction === 'down' 
              ? 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/50' 
              : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
          }`}>
            {trend.direction === 'up' && <span>↑</span>}
            {trend.direction === 'down' && <span>↓</span>}
            <span>{trend.text}</span>
          </span>
        )}
      </div>

      {/* Bottom Sparkline SVG curve */}
      <div className="w-full h-7 overflow-hidden mt-1.5 -mb-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 260 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${cardId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25"/>
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0"/>
            </linearGradient>
          </defs>
          <path
            d={scheme.path}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`${scheme.path} L 260 30 L 0 30 Z`}
            fill={`url(#grad-${cardId})`}
          />
        </svg>
      </div>
    </div>
  );
};

export default StatCard;
