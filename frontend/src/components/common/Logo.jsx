import React from 'react';
import { Link } from 'react-router-dom';
import brandLogoLight from '../../assets/skillgaplogo-removebg-preview-CQm3OAth.png';
import brandLogoDark from '../../assets/dark-latest.png';
import { useTheme } from '../../context/ThemeContext';

export const Logo = ({ size = 'lg', className = '', imgClassName = '' }) => {
  const { isDark } = useTheme();

  const sizeMap = {
    xs: 'w-24 sm:w-36 md:w-40 h-auto max-h-7 sm:max-h-8',
    sm: 'w-28 sm:w-44 md:w-48 h-auto max-h-7 sm:max-h-10',
    md: 'w-32 sm:w-52 md:w-56 h-auto max-h-8 sm:max-h-11',
    lg: 'w-36 sm:w-60 md:w-64 h-auto max-h-8 sm:max-h-12',
    xl: 'w-36 sm:w-64 md:w-80 h-auto max-h-9 sm:max-h-11 md:max-h-13',
    '2xl': 'w-48 sm:w-80 md:w-96 h-auto max-h-10 sm:max-h-16'
  };

  const imgClass = sizeMap[size] || sizeMap.lg;
  const currentLogo = isDark ? brandLogoDark : brandLogoLight;

  return (
    <Link to="/" className={`flex items-center group select-none shrink-0 ${className}`}>
      <img
        src={currentLogo}
        alt="SkillPath Finder"
        className={`${imgClass} ${imgClassName} object-contain object-left transition-all duration-200 group-hover:scale-105 ${isDark
            ? 'drop-shadow-[0_0_15px_rgba(200,190,250,0.35)]'
            : 'drop-shadow-[0_2px_8px_rgba(21,17,48,0.12)]'
          }`}
      />
    </Link>
  );
};

export default Logo;

