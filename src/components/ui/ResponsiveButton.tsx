import React, { useState } from 'react';
import { Circle } from 'lucide-react';

interface ResponsiveButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary';
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  children,
  href,
  onClick,
  target,
  rel,
  size = 'md',
  variant = 'primary',
  className = '',
  icon,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Tamanhos responsivos
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base',
    md: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
    lg: 'px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl',
    xl: 'px-10 py-5 text-xl sm:px-12 sm:py-6 sm:text-2xl'
  };

  // Variantes de cor
  const variantClasses = {
    primary: isHovered
      ? 'bg-gray-800 border-2 border-red-500 shadow-red-500/25'
      : 'bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 shadow-stone-500/25',
    secondary: isHovered
      ? 'bg-gray-800 border-2 border-red-500 shadow-red-500/25'
      : 'bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 shadow-stone-600/25'
  };

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2 
    rounded-full text-white font-bold shadow-lg overflow-hidden 
    group transform transition-all duration-500 ease-out
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${isHovered ? 'scale-105' : 'scale-100 hover:scale-105'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const content = (
    <>
      <span className={`relative z-10 flex items-center gap-2 transition-all duration-300 ease-out ${
        isHovered ? 'transform -translate-y-0.5' : 'transform translate-y-0'
      }`}>
        <Circle className={`w-2 h-2 fill-red-500 text-red-500 transition-all duration-300 ease-out ${
          isHovered
            ? 'opacity-100 scale-100 animate-pulse'
            : 'opacity-0 scale-0'
        }`} />
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </span>

      {/* Background transition overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 transition-opacity duration-500 ease-out ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>

      {/* Electric flow animations */}
      <div className={`absolute inset-0 transition-opacity duration-300 ease-out ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 animate-electric-flow opacity-60">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '0.2s'}}></div>
        </div>

        <div className="absolute inset-0 animate-electric-flow-2 opacity-40">
          <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{animationDelay: '0.1s'}}></div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes electric-flow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes electric-flow-2 {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        
        .animate-electric-flow {
          animation: electric-flow 1.5s ease-in-out infinite;
        }
        
        .animate-electric-flow-2 {
          animation: electric-flow-2 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );

  const handleMouseEnter = () => !disabled && setIsHovered(true);
  const handleMouseLeave = () => !disabled && setIsHovered(false);
  const handleClick = () => !disabled && onClick?.();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default ResponsiveButton;
