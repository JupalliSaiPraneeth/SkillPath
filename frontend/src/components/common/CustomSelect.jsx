/**
 * CustomSelect — Universal themed dropdown component.
 *
 * Props:
 *   value        {string}   — current value
 *   onChange     {fn}       — called with the new value string: onChange(value)
 *   options      {Array}    — [{ value, label, desc?, badge?, group? }]
 *                            OR a flat string/number array (auto-converted)
 *   placeholder  {string}   — text shown when nothing is selected
 *   label        {string}   — optional label rendered above the trigger
 *   icon         {ReactNode} — optional Lucide icon node inside the trigger
 *   size         {'sm'|'md'} — 'sm' = compact filter chip, 'md' = full-width form input
 *   accentColor  {'indigo'|'blue'|'purple'|'slate'} — colour theme
 *   className    {string}   — extra classes on the wrapper div
 *   disabled     {boolean}
 *   id           {string}   — unique id for the trigger button
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const ACCENT = {
  indigo: {
    border:    'border-indigo-300 dark:border-indigo-700',
    borderOpen:'border-indigo-500 ring-2 ring-indigo-500/20',
    bg:        'bg-indigo-50/60 dark:bg-indigo-950/40',
    chevron:   'text-indigo-400',
    label:     'text-indigo-600 dark:text-indigo-400',
    value:     'text-indigo-700 dark:text-indigo-300',
    badge:     'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    hoverRow:  'hover:bg-indigo-50 dark:hover:bg-indigo-950/40',
    activeRow: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25',
    shadow:    'shadow-indigo-500/10',
    dot:       'bg-indigo-400 dark:bg-indigo-600',
  },
  blue: {
    border:    'border-blue-300 dark:border-blue-700',
    borderOpen:'border-blue-500 ring-2 ring-blue-500/20',
    bg:        'bg-blue-50/60 dark:bg-blue-950/40',
    chevron:   'text-blue-400',
    label:     'text-blue-600 dark:text-blue-400',
    value:     'text-blue-700 dark:text-blue-300',
    badge:     'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    hoverRow:  'hover:bg-blue-50 dark:hover:bg-blue-950/40',
    activeRow: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25',
    shadow:    'shadow-blue-500/10',
    dot:       'bg-blue-400 dark:bg-blue-600',
  },
  purple: {
    border:    'border-purple-300 dark:border-purple-700',
    borderOpen:'border-purple-500 ring-2 ring-purple-500/20',
    bg:        'bg-purple-50/60 dark:bg-purple-950/40',
    chevron:   'text-purple-400',
    label:     'text-purple-600 dark:text-purple-400',
    value:     'text-purple-700 dark:text-purple-300',
    badge:     'bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    hoverRow:  'hover:bg-purple-50 dark:hover:bg-purple-950/40',
    activeRow: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25',
    shadow:    'shadow-purple-500/10',
    dot:       'bg-purple-400 dark:bg-purple-600',
  },
  ultramarine: {
    border:    'border-[#0F129A]/30 dark:border-[#FFEDDF]/30',
    borderOpen:'border-[#0F129A] ring-2 ring-[#0F129A]/20 dark:border-[#FFEDDF] dark:ring-[#FFEDDF]/20',
    bg:        'bg-[#FFEDDF]/40 dark:bg-[#0a0d42]/60',
    chevron:   'text-[#0F129A] dark:text-[#FFEDDF]',
    label:     'text-[#0F129A] dark:text-[#FFEDDF]',
    value:     'text-[#0F129A] dark:text-[#FFEDDF]',
    badge:     'bg-[#FFEDDF] dark:bg-[#0F129A]/60 text-[#0F129A] dark:text-[#FFEDDF] border-[#0F129A]/30 dark:border-[#FFEDDF]/30 font-bold',
    hoverRow:  'hover:bg-[#FFEDDF]/50 dark:hover:bg-[#0F129A]/40 text-[#0F129A] dark:text-[#FFEDDF]',
    activeRow: 'bg-[#0F129A] text-[#FFEDDF] shadow-md shadow-[#0F129A]/30 font-bold',
    shadow:    'shadow-[0_10px_35px_rgba(15,18,154,0.18)]',
    dot:       'bg-[#0F129A] dark:bg-[#FFEDDF]',
  },
  slate: {
    border:    'border-slate-300 dark:border-slate-700',
    borderOpen:'border-slate-500 ring-2 ring-slate-500/20',
    bg:        'bg-slate-100/60 dark:bg-slate-800/60',
    chevron:   'text-slate-400',
    label:     'text-slate-600 dark:text-slate-400',
    value:     'text-slate-800 dark:text-slate-200',
    badge:     'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    hoverRow:  'hover:bg-slate-50 dark:hover:bg-slate-800/60',
    activeRow: 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-md shadow-slate-500/25',
    shadow:    'shadow-slate-500/10',
    dot:       'bg-slate-400 dark:bg-slate-600',
  },
};

function normaliseOptions(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
      return { value: String(item), label: String(item) };
    }
    return {
      value: String(item.value ?? item.id ?? item.label ?? ''),
      label: String(item.label ?? item.title ?? item.name ?? item.value ?? ''),
      desc:  item.desc  ?? item.description ?? undefined,
      badge: item.badge ?? item.category    ?? undefined,
      group: item.group ?? item.category    ?? undefined,
    };
  });
}

function OptionRow({ opt, isSelected, onSelect, palette, textSize, isSmall }) {
  return (
    <button
      role="option"
      type="button"
      aria-selected={isSelected}
      onClick={() => onSelect(opt.value)}
      className={[
        'w-full flex items-center justify-between gap-2 rounded-xl text-left transition-all duration-150',
        isSmall ? 'px-2.5 py-1.5' : 'px-3 py-2.5',
        isSelected
          ? palette.activeRow
          : `${palette.hoverRow} text-slate-700 dark:text-slate-300`,
      ].join(' ')}
    >
      <div className="flex items-start gap-2 min-w-0">
        {!opt.desc ? (
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isSelected ? 'bg-white' : palette.dot}`} />
        ) : (
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${isSelected ? 'border-white bg-white/20' : 'border-slate-300 dark:border-slate-600'}`}>
            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </div>
        )}
        <div className="min-w-0">
          <p className={`${textSize} font-semibold leading-snug truncate ${isSelected ? 'text-white' : ''}`}>
            {opt.label}
          </p>
          {opt.desc && (
            <p className={`text-[10px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
              {opt.desc}
            </p>
          )}
        </div>
      </div>
      {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
    </button>
  );
}

const CustomSelect = ({
  value,
  onChange,
  options     = [],
  placeholder = 'Select…',
  label,
  icon,
  size        = 'md',
  accentColor = 'indigo',
  className   = '',
  disabled    = false,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef         = useRef(null);
  const palette         = ACCENT[accentColor] ?? ACCENT.indigo;
  const normalised      = normaliseOptions(options);
  const selected        = normalised.find((o) => o.value === String(value ?? ''));
  const isSmall         = size === 'sm';
  const triggerPad      = isSmall ? 'px-2.5 py-1.5' : 'px-3.5 py-2.5';
  const textSize        = isSmall ? 'text-[11px]'   : 'text-xs';

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const handleSelect = useCallback((val) => { onChange(val); setOpen(false); }, [onChange]);

  const grouped = normalised.reduce((acc, opt) => {
    const g = opt.group || '__none__';
    if (!acc[g]) acc[g] = [];
    acc[g].push(opt);
    return acc;
  }, {});
  const groupKeys  = Object.keys(grouped);
  const hasGroups  = groupKeys.length > 1 || (groupKeys[0] && groupKeys[0] !== '__none__');

  return (
    <div ref={wrapRef} className={`relative overflow-visible ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
          {icon && <span className={palette.label}>{icon}</span>}
          {label}
        </label>
      )}

      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          'w-full flex items-center justify-between gap-2 rounded-2xl text-left transition-all duration-200 border-2 shadow-sm',
          triggerPad,
          open
            ? `${palette.borderOpen} ${palette.bg}`
            : `${palette.border} bg-white dark:bg-slate-900`,
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon && !label && <span className={`shrink-0 ${palette.label}`}>{icon}</span>}
          <span className={`${textSize} font-bold truncate ${selected ? palette.value : 'text-slate-400'}`}>
            {selected ? selected.label : placeholder}
          </span>
          {selected?.badge && (
            <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${palette.badge}`}>
              {selected.badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 ${palette.chevron} transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={[
            'absolute z-[9999] top-full mt-2 left-0 min-w-full rounded-2xl border border-slate-200 dark:border-slate-700',
            'bg-white dark:bg-slate-900 shadow-2xl overflow-hidden',
            palette.shadow,
          ].join(' ')}
          style={{ animation: 'csDropIn 0.15s cubic-bezier(0.16,1,0.3,1) both', width: 'max-content', maxWidth: '360px' }}
        >
          <style>{`@keyframes csDropIn{from{opacity:0;transform:translateY(-6px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
          <div className={`overflow-y-auto p-1.5 space-y-0.5 ${isSmall ? 'max-h-52' : 'max-h-64'}`}>
            {hasGroups
              ? groupKeys.map((g) => (
                <div key={g}>
                  {g !== '__none__' && (
                    <div className="px-3 pt-2 pb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{g}</span>
                    </div>
                  )}
                  {grouped[g].map((opt) => (
                    <OptionRow key={opt.value} opt={opt} isSelected={opt.value === String(value ?? '')} onSelect={handleSelect} palette={palette} textSize={textSize} isSmall={isSmall} />
                  ))}
                </div>
              ))
              : normalised.map((opt) => (
                <OptionRow key={opt.value} opt={opt} isSelected={opt.value === String(value ?? '')} onSelect={handleSelect} palette={palette} textSize={textSize} isSmall={isSmall} />
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
