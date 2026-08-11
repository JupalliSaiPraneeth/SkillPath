import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const variantStyles = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    primary: 'bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-500/30',
    success: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
    warning: 'bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
    danger: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30',
    cyan: 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30',
    violet: 'bg-violet-50 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30',
    high: 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/40 font-bold',
    medium: 'bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40 font-bold',
    low: 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40 font-bold',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const selectedVariant = variantStyles[variant.toLowerCase()] || variantStyles.default;
  const selectedSize = sizeStyles[size] || sizeStyles.md;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-all ${selectedVariant} ${selectedSize} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
