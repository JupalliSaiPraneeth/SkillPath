import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.png';
import logoDark from '../../assets/logo-dark.png';
import { useTheme } from '../../context/ThemeContext';

export const Logo = ({ size = 'lg', className = '', imgClassName = '' }) => {
  const { isDark } = useTheme();

  const sizeMap = {
    sm: 'h-8 sm:h-9 md:h-10 w-auto max-h-10',
    md: 'h-10 sm:h-11 md:h-13 w-auto max-h-14',
    lg: 'h-11 sm:h-13 md:h-15 w-auto max-h-16',
    xl: 'h-12 sm:h-15 md:h-18 w-auto max-h-20',
    '2xl': 'h-16 sm:h-20 md:h-24 w-auto max-h-28'
  };

  const imgClass = sizeMap[size] || sizeMap.lg;
  const currentLogo = isDark ? logoDark : logoWhite;
  const fallbackSrc = isDark ? '/logo-dark.png' : '/logo-white.png';

  return (
    <Link to="/" className={`flex items-center group select-none shrink-0 ${className}`}>
      <img
        key={isDark ? 'dark-logo' : 'white-logo'}
        src={currentLogo}
        alt="SkillPath Finder"
        className={`${imgClass} ${imgClassName} object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-sm`}
        onError={(e) => {
          e.currentTarget.src = fallbackSrc;
        }}
      />
    </Link>
  );
};

export default Logo;
