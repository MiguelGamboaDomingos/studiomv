import React, { useRef, useEffect, useState } from 'react';
import { useMousePosition, useAdaptivePerformance } from '../hooks/usePerformance';
import { use3DTilt, useMorphingShape, useFloatingAnimation } from '../hooks/useParallax';

// 3D Floating Camera Component
export const FloatingCamera: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { transform, elementRef } = use3DTilt(15);
  const floatingTransform = useFloatingAnimation(10, 4000);
  const { shouldReduceEffects } = useAdaptivePerformance();

  if (shouldReduceEffects) return null;

  return (
    <div 
      ref={elementRef}
      className={`relative ${className}`}
      style={{ 
        transform: `${transform} ${floatingTransform}`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Camera Body */}
      <div className="relative w-32 h-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl">
        {/* Lens */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shadow-inner">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-900 to-purple-900 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
        
        {/* Camera Details */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-8 h-1 bg-amber-600 rounded"></div>
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Morphing Logo Component
export const MorphingLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shapes = [
    'M 50 10 L 90 90 L 10 90 Z', // Triangle
    'M 10 50 Q 50 10 90 50 Q 50 90 10 50', // Circle-like
    'M 10 10 L 90 10 L 90 90 L 10 90 Z', // Square
    'M 50 10 L 70 30 L 90 50 L 70 70 L 50 90 L 30 70 L 10 50 L 30 30 Z' // Octagon
  ];
  
  const currentShape = useMorphingShape(shapes, 2000);
  const floatingTransform = useFloatingAnimation(15, 3000);
  const { shouldReduceEffects } = useAdaptivePerformance();

  if (shouldReduceEffects) return null;

  return (
    <div 
      className={`relative ${className}`}
      style={{ transform: floatingTransform }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d={currentShape}
          fill="url(#morphGradient)"
          filter="url(#glow)"
          style={{
            transition: 'd 1s ease-in-out',
          }}
        />
      </svg>
    </div>
  );
};

// Interactive Particles System
export const InteractiveParticles: React.FC<{ count?: number }> = ({ count = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition(50);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }>>([]);
  const { shouldReduceEffects } = useAdaptivePerformance();

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, [count]);

  useEffect(() => {
    if (shouldReduceEffects) return;

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        // Mouse attraction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(100 / distance, 2);
        
        let newVx = particle.vx + (dx / distance) * force * 0.01;
        let newVy = particle.vy + (dy / distance) * force * 0.01;
        
        // Damping
        newVx *= 0.99;
        newVy *= 0.99;
        
        let newX = particle.x + newVx;
        let newY = particle.y + newVy;
        
        // Boundary bounce
        if (newX < 0 || newX > window.innerWidth) newVx *= -0.8;
        if (newY < 0 || newY > window.innerHeight) newVy *= -0.8;
        
        newX = Math.max(0, Math.min(window.innerWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight, newY));
        
        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      }));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition, shouldReduceEffects]);

  if (shouldReduceEffects) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bg-amber-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(245, 158, 11, 0.5)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

// 3D Film Strip
export const FilmStrip3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { transform, elementRef } = use3DTilt(20);
  const floatingTransform = useFloatingAnimation(8, 5000);
  const { shouldReduceEffects } = useAdaptivePerformance();

  if (shouldReduceEffects) return null;

  return (
    <div 
      ref={elementRef}
      className={`relative ${className}`}
      style={{ 
        transform: `${transform} ${floatingTransform}`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="relative w-64 h-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Film perforations */}
        <div className="absolute top-0 left-0 right-0 h-full flex justify-between items-center px-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-black rounded-full"></div>
          ))}
        </div>
        
        {/* Film frames */}
        <div className="absolute top-1 bottom-1 left-4 right-4 flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-br from-amber-600 to-orange-700 rounded-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div 
                className="absolute inset-0 bg-white/10"
                style={{
                  animation: `shimmer 2s ease-in-out infinite ${i * 0.5}s`,
                }}
              ></div>
            </div>
          ))}
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

// Holographic Display
export const HolographicDisplay: React.FC<{ text: string; className?: string }> = ({ 
  text, 
  className = '' 
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const { shouldReduceEffects } = useAdaptivePerformance();

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (shouldReduceEffects) {
    return <div className={`text-amber-400 ${className}`}>{text}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`relative text-amber-400 font-light tracking-wider ${
          glitchActive ? 'animate-pulse' : ''
        }`}
        style={{
          textShadow: glitchActive 
            ? '0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 30px #f59e0b'
            : '0 0 10px rgba(245, 158, 11, 0.5)',
          filter: glitchActive ? 'hue-rotate(90deg)' : 'none',
        }}
      >
        {text}
        
        {/* Holographic scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
              style={{
                top: `${(i + 1) * 25}%`,
                animation: `scanline 2s ease-in-out infinite ${i * 0.7}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
