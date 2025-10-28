import React, { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return { elementRef, isVisible };
};

// Hook para múltiplos elementos com delays escalonados
export const useStaggeredAnimation = (count: number, baseDelay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          
          // Animar itens com delay escalonado
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * baseDelay);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [count, baseDelay, hasTriggered]);

  return { containerRef, visibleItems };
};

// Classes de animação predefinidas
export const animationClasses = {
  // Fade In
  fadeIn: {
    initial: 'opacity-0',
    animate: 'opacity-100 transition-opacity duration-1000 ease-out'
  },
  
  // Slide Up
  slideUp: {
    initial: 'opacity-0 translate-y-8',
    animate: 'opacity-100 translate-y-0 transition-all duration-800 ease-out'
  },
  
  // Slide Down
  slideDown: {
    initial: 'opacity-0 -translate-y-8',
    animate: 'opacity-100 translate-y-0 transition-all duration-800 ease-out'
  },
  
  // Slide Left
  slideLeft: {
    initial: 'opacity-0 translate-x-8',
    animate: 'opacity-100 translate-x-0 transition-all duration-800 ease-out'
  },
  
  // Slide Right
  slideRight: {
    initial: 'opacity-0 -translate-x-8',
    animate: 'opacity-100 translate-x-0 transition-all duration-800 ease-out'
  },
  
  // Scale In
  scaleIn: {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100 transition-all duration-800 ease-out'
  },
  
  // Zoom In
  zoomIn: {
    initial: 'opacity-0 scale-50',
    animate: 'opacity-100 scale-100 transition-all duration-1000 ease-out'
  },
  
  // Rotate In
  rotateIn: {
    initial: 'opacity-0 rotate-12 scale-95',
    animate: 'opacity-100 rotate-0 scale-100 transition-all duration-1000 ease-out'
  }
};

// Componente wrapper para animações
interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: keyof typeof animationClasses;
  delay?: number;
  className?: string;
  threshold?: number;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = 'slideUp',
  delay = 0,
  className = '',
  threshold = 0.1
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ delay, threshold });
  const animClass = animationClasses[animation];

  return (
    <div
      ref={elementRef as any}
      className={`${isVisible ? animClass.animate : animClass.initial} ${className}`}
    >
      {children}
    </div>
  );
};
