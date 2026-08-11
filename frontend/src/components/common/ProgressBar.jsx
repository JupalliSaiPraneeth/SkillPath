import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  height = 'h-2.5',
  color = 'brand',
  showLabel = false,
  label = '',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorVariants = {
    brand: 'bg-gradient-to-r from-brand-600 to-cyan-500 dark:from-brand-500 dark:to-cyan-400',
    emerald: 'bg-gradient-to-r from-emerald-600 to-teal-400 dark:from-emerald-500 dark:to-teal-300',
    cyan: 'bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-500 dark:to-blue-400',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-400',
    rose: 'bg-gradient-to-r from-rose-500 to-pink-400',
    violet: 'bg-gradient-to-r from-violet-600 to-brand-500 dark:from-violet-500 dark:to-brand-400',
  };

  const selectedColor = colorVariants[color] || colorVariants.brand;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
          <span>{label}</span>
          <span className="text-slate-900 dark:text-slate-100 font-bold">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden border border-slate-300/60 dark:border-slate-700/50 ${height}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${selectedColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
