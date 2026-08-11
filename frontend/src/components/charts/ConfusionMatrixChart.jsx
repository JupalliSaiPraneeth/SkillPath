import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ConfusionMatrixChart = ({
  matrix = [
    [200, 0, 0, 0, 0],
    [0, 200, 0, 0, 0],
    [0, 0, 200, 0, 0],
    [0, 0, 0, 200, 0],
    [0, 0, 0, 0, 200]
  ],
  classes = ['ML Eng', 'Data Sci', 'Cloud Arch', 'Full Stack', 'DevOps/SRE']
}) => {
  const { isDark } = useTheme();
  const maxVal = Math.max(...matrix.flat(), 1);
  const totalSamples = matrix.flat().reduce((a, b) => a + b, 0);
  const diagonalSum = matrix.reduce((acc, row, i) => acc + (row[i] || 0), 0);
  const diagonalAccuracy = ((diagonalSum / Math.max(1, totalSamples)) * 100).toFixed(1);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[420px] p-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-bold">
          <span>Actual \ Predicted</span>
          <span className="text-[11px] text-brand-600 dark:text-brand-400 font-bold">Total Samples: {totalSamples.toLocaleString()}</span>
        </div>

        <div className="grid grid-cols-6 gap-1.5 text-center text-xs">
          {/* Header Row */}
          <div className="p-2 font-bold text-slate-400"></div>
          {classes.map((cls, i) => (
            <div key={i} className="p-2 font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/60 rounded-xl text-[11px] truncate border border-slate-200 dark:border-slate-800" title={cls}>
              {cls}
            </div>
          ))}

          {/* Matrix Rows */}
          {matrix.map((row, rIdx) => {
            const rowTotal = row.reduce((a, b) => a + b, 0) || 200;
            return (
              <React.Fragment key={rIdx}>
                {/* Row Label (Actual) */}
                <div className="p-2 font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/60 rounded-xl flex items-center justify-end text-[11px] truncate pr-2 border border-slate-200 dark:border-slate-800" title={classes[rIdx]}>
                  {classes[rIdx]}
                </div>

                {/* Cells */}
                {row.map((val, cIdx) => {
                  const isDiagonal = rIdx === cIdx;
                  const ratio = val / maxVal;

                  const bgStyle = isDiagonal
                    ? isDark
                      ? `rgba(99, 102, 241, ${0.4 + ratio * 0.5})`
                      : `rgba(99, 102, 241, ${0.2 + ratio * 0.45})`
                    : val === 0
                      ? isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.6)'
                      : isDark ? `rgba(244, 63, 94, ${0.15 + ratio * 0.35})` : `rgba(244, 63, 94, ${0.1 + ratio * 0.25})`;

                  return (
                    <div
                      key={cIdx}
                      style={{ backgroundColor: bgStyle }}
                      className={`p-3 rounded-xl flex flex-col items-center justify-center font-mono font-bold transition-all hover:scale-105 border ${isDiagonal
                          ? 'text-indigo-950 dark:text-white border-brand-500/50 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-transparent'
                        }`}
                    >
                      <span className="text-sm font-black">{val}</span>
                      <span className="text-[9px] opacity-80">{((val / rowTotal) * 100).toFixed(1)}%</span>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-2 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-brand-500 inline-block"></span> True Positives (Diagonal: {diagonalSum}/{totalSamples})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/40 inline-block"></span> Misclassifications ({totalSamples - diagonalSum})
            </span>
          </div>
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Diagonal Accuracy: {diagonalAccuracy}%</span>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrixChart;
