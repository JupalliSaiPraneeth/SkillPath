import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.png';
import logoDark from '../../assets/logo-dark.png';
import { useTheme } from '../../context/ThemeContext';

export const Logo = ({ size = 'lg', className = '', imgClassName = '' }) => {
  const { isDark } = useTheme();

  const sizeMap = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-10 sm:h-11 md:h-12 w-auto max-h-12',
    lg: 'h-12 sm:h-14 md:h-16 w-auto max-h-16',
    xl: 'h-16 sm:h-20 md:h-22 w-auto max-h-24',
    '2xl': 'h-20 sm:h-24 md:h-28 w-auto max-h-28'
  };

  const imgClass = sizeMap[size] || sizeMap.lg;
  const currentLogo = isDark ? logoDark : logoWhite;
  const fallbackSrc = isDark ? '/logo-dark.png' : '/logo-white.png';

  return (
    <Link to="/" className={`flex items-center group select-none ${className}`}>
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
