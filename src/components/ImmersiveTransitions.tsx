'use client';

import React, { useEffect, useState } from 'react';

interface ImmersiveTransitionsProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  duration?: number;
}

const ImmersiveTransitions: React.FC<ImmersiveTransitionsProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 1000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(elementRef);

    return () => observer.disconnect();
  }, [elementRef, delay]);

  const getTransitionClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-20 blur-sm scale-95`;
        case 'down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-20 blur-sm scale-95`;
        case 'left':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-20 blur-sm scale-95`;
        case 'right':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-20 blur-sm scale-95`;
        case 'scale':
          return `${baseClasses} ${durationClass} opacity-0 scale-75 blur-sm`;
        case 'fade':
        default:
          return `${baseClasses} ${durationClass} opacity-0 blur-sm`;
      }
    }
    
    return `${baseClasses} ${durationClass} opacity-100 translate-x-0 translate-y-0 blur-0 scale-100`;
  };

  return (
    <div
      ref={setElementRef}
      className={`${getTransitionClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ImmersiveTransitions;
