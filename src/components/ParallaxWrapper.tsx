import React, { useEffect, useRef, useState } from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  cinematicTransition?: 'fadeIn' | 'slideUp' | 'float' | 'none';
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  speed = 0.5,
  className = '',
  cinematicTransition = 'fadeIn'
}) => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport for visibility
      const isInViewport = rect.bottom >= 0 && rect.top <= windowHeight;

      if (isInViewport && !isVisible) {
        setIsVisible(true);
      }

      // Apply parallax when element is near viewport
      if (rect.bottom >= -200 && rect.top <= windowHeight + 200) {
        setOffset(rate);
      }
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
  }, [speed, isVisible]);

  const getTransitionClass = () => {
    switch (cinematicTransition) {
      case 'fadeIn':
        return isVisible ? 'animate-[sectionFadeIn_1.5s_ease-out]' : 'opacity-0';
      case 'slideUp':
        return isVisible ? 'animate-[sectionSlideUp_1.2s_ease-out]' : 'opacity-0 translate-y-32';
      case 'float':
        return isVisible ? 'animate-[parallaxFloat_3s_ease-in-out_infinite]' : 'opacity-0';
      default:
        return '';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`parallax-element ${className} ${getTransitionClass()} transition-all duration-1000`}
      style={{
        transform: `translateY(${offset}px)`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxWrapper;
