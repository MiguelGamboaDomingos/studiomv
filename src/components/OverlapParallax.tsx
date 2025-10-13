import React, { useEffect, useRef, useState } from 'react';

interface OverlapParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  zIndex?: number;
  overlapOffset?: number;
  cinematicTransition?: 'fadeIn' | 'slideUp' | 'float' | 'none';
}

const OverlapParallax: React.FC<OverlapParallaxProps> = ({ 
  children, 
  speed = 0.5, 
  className = '',
  zIndex = 10,
  overlapOffset = -100,
  cinematicTransition = 'fadeIn'
}) => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Parallax calculation
      const rate = scrolled * -speed;
      
      // Visibility detection for animations
      const isInViewport = rect.top <= windowHeight * 0.8;
      
      if (isInViewport && !hasEntered) {
        setIsVisible(true);
        setHasEntered(true);
      }

      // Apply parallax transform
      setOffset(rate);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [speed, hasEntered]);

  const getTransitionClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-32';
    
    switch (cinematicTransition) {
      case 'fadeIn':
        return 'animate-[sectionFadeIn_1.5s_ease-out] opacity-100';
      case 'slideUp':
        return 'animate-[sectionSlideUp_1.2s_ease-out] opacity-100';
      case 'float':
        return 'animate-[parallaxFloat_3s_ease-in-out_infinite] opacity-100';
      default:
        return 'opacity-100';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`relative ${className} ${getTransitionClass()}`}
      style={{
        transform: `translateY(${offset + overlapOffset}px)`,
        zIndex: zIndex,
        marginTop: `${overlapOffset}px`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default OverlapParallax;
