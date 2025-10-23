import React, { useRef, useEffect, useState } from 'react';
import { useParallax } from '../hooks/useParallax';

interface HomeParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  backgroundPattern?: 'grid' | 'dots' | 'lines' | 'none';
  patternOpacity?: number;
  patternSize?: number;
  patternColor?: string;
}

const HomeParallax: React.FC<HomeParallaxProps> = ({
  children,
  speed = 0.5,
  className = '',
  backgroundPattern = 'none',
  patternOpacity = 0.05,
  patternSize = 80,
  patternColor = 'rgba(201,169,97,0.2)'
}) => {
  const { transform, elementRef } = useParallax(speed, 0, true); // enabledOnHome = true

  const getPatternStyle = () => {
    const baseStyle = {
      transform,
      opacity: patternOpacity,
    };

    switch (backgroundPattern) {
      case 'grid':
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(${patternColor} 1px, transparent 1px),
            linear-gradient(90deg, ${patternColor} 1px, transparent 1px)
          `,
          backgroundSize: `${patternSize}px ${patternSize}px`,
        };
      case 'dots':
        return {
          ...baseStyle,
          backgroundImage: `radial-gradient(circle, ${patternColor} 1px, transparent 1px)`,
          backgroundSize: `${patternSize}px ${patternSize}px`,
        };
      case 'lines':
        return {
          ...baseStyle,
          backgroundImage: `linear-gradient(${patternColor} 1px, transparent 1px)`,
          backgroundSize: `${patternSize}px ${patternSize}px`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {/* Background Pattern with Parallax */}
      {backgroundPattern !== 'none' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={getPatternStyle()}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Componente para elementos individuais com parallax
interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  offset?: number;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  className = '',
  offset = 0
}) => {
  const { transform, elementRef } = useParallax(speed, offset, true);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

// Componente para múltiplas camadas de parallax
interface ParallaxLayersProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxLayers: React.FC<ParallaxLayersProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Layer - Slow */}
      <ParallaxElement speed={0.2} className="absolute inset-0">
        <div
          className="w-full h-full opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(201,169,97,0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(201,169,97,0.2) 0%, transparent 50%)
            `,
          }}
        />
      </ParallaxElement>

      {/* Middle Layer - Medium */}
      <ParallaxElement speed={0.4} className="absolute inset-0">
        <div
          className="w-full h-full opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(201,169,97,0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(201,169,97,0.1) 50%, transparent 60%)
            `,
            backgroundSize: '200px 200px',
          }}
        />
      </ParallaxElement>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default HomeParallax;
