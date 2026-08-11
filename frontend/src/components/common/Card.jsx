import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  badge,
  icon: Icon,
  actions,
  className = '',
  hoverEffect = false,
  glow = false,
  bodyClassName = 'p-5 sm:p-6'
}) => {
  return (
    <div className={`glass-panel rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 border border-slate-200/90 dark:border-slate-800/80 shadow-sm dark:shadow-glass ${hoverEffect ? 'glass-panel-hover' : ''} ${glow ? 'shadow-md dark:shadow-glow' : ''} ${className}`}>
      {(title || Icon || actions) && (
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-sans tracking-tight">{title}</h3>
                {badge}
              </div>
              {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={bodyClassName}>
        {children}
      </div>
    </div>
  );
};

export default Card;
