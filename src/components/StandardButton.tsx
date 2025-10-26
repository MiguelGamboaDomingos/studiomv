import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface StandardButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  showArrow?: boolean;
  target?: string;
  rel?: string;
}

const StandardButton: React.FC<StandardButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  showArrow = true,
  target,
  rel
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    relative inline-flex items-center justify-center gap-3 
    font-light tracking-wider transition-all duration-500 ease-out 
    overflow-hidden group transform focus:outline-none focus:ring-2 
    focus:ring-amber-600/50 focus:ring-offset-2 focus:ring-offset-black
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-sm rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-full'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 
      text-white border-2 border-transparent
      hover:from-amber-600 hover:via-amber-500 hover:to-amber-700
      hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25
      ${isHovered ? 'shadow-2xl shadow-amber-500/30' : 'shadow-lg shadow-amber-500/20'}
    `,
    secondary: `
      bg-gradient-to-r from-stone-800/80 via-amber-900/60 to-stone-800/80 
      text-amber-200 border-2 border-amber-700/30 backdrop-blur-xl
      hover:from-amber-900/60 hover:via-stone-800/70 hover:to-amber-900/60 
      hover:border-amber-600/50 hover:text-amber-100
      hover:scale-105 hover:shadow-xl hover:shadow-amber-900/20
    `,
    outline: `
      bg-transparent text-amber-300 border-2 border-amber-800/30
      hover:bg-gradient-to-r hover:from-amber-950/20 hover:to-stone-900/20 
      hover:border-amber-600/50 hover:text-amber-200
      hover:scale-105 hover:shadow-lg hover:shadow-amber-900/20
    `
  };

  const buttonClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${className}
  `;

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!disabled) setIsHovered(false);
  };

  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  const content = (
    <>
      {/* Background Effects */}
      <div className={`absolute inset-0 bg-gradient-to-r from-amber-800/0 via-amber-700/15 to-stone-700/0 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Electric Lines Effect */}
      {isHovered && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-stone-400 to-transparent animate-pulse" style={{animationDelay: '0.3s'}} />
        </div>
      )}

      {/* Content */}
      <span className={`relative z-10 flex items-center gap-3 transition-all duration-300 ${
        isHovered ? 'transform -translate-y-0.5' : 'transform translate-y-0'
      }`}>
        {children}
        
        {showArrow && (
          <ArrowRight className={`w-4 h-4 transition-all duration-500 ${
            isHovered 
              ? 'transform translate-x-2 text-amber-200' 
              : 'transform translate-x-0 text-amber-400'
          }`} />
        )}
      </span>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-amber-500/20 to-amber-600/10 animate-pulse" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default StandardButton;
