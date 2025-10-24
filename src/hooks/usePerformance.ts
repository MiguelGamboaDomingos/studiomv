import { useEffect, useRef, useCallback, useState } from 'react';

// Hook for managing intervals with automatic cleanup
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      savedCallback.current?.();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

// Hook for managing animation frames with automatic cleanup
export const useAnimationFrame = (callback: (time: number) => void, enabled = true) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      callback(time);
    }
    previousTimeRef.current = time;
    if (enabled) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [callback, enabled]);

  useEffect(() => {
    if (enabled) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, enabled]);
};

// Hook for debouncing values to improve performance
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttling function calls
export const useThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  const lastRan = useRef<number>(Date.now());

  return useCallback(
    ((...args: any[]) => {
      if (Date.now() - lastRan.current >= delay) {
        func(...args);
        lastRan.current = Date.now();
      }
    }) as T,
    [func, delay]
  );
};

// Hook for detecting reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook for managing scroll performance
export const useScrollPerformance = (callback: (scrollY: number) => void, throttleMs = 32) => {
  const throttledCallback = useThrottle(callback, throttleMs);

  useEffect(() => {
    const handleScroll = () => {
      throttledCallback(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttledCallback]);
};

// Hook for intersection observer with performance optimizations
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { isIntersecting, entry, elementRef };
};

// Hook for managing resize events with performance optimizations
export const useResizeObserver = (callback: (entry: ResizeObserverEntry) => void) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        callbackRef.current(entry);
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return elementRef;
};

// Hook for managing mouse position with performance optimizations
export const useMousePosition = (throttleMs = 16) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = useThrottle((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, throttleMs);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  return mousePosition;
};

// Hook for managing window size with performance optimizations
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const updateSize = useThrottle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return windowSize;
};

// Hook for managing idle state to pause animations when not needed
export const useIdleDetection = (timeout = 5000) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsIdle(false);
    timeoutRef.current = setTimeout(() => setIsIdle(true), timeout);
  }, [timeout]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimeout, { passive: true });
    });

    resetTimeout();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimeout]);

  return isIdle;
};

// Hook for managing performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        }));
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Measure initial load time
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return metrics;
};

// Utility function to check if device has limited resources
export const isLowEndDevice = () => {
  // Check for various indicators of low-end devices
  const connection = (navigator as any).connection;
  const hardwareConcurrency = navigator.hardwareConcurrency || 1;
  const memory = (navigator as any).deviceMemory || 1;
  
  return (
    hardwareConcurrency <= 2 ||
    memory <= 2 ||
    (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'))
  );
};

// Hook for adaptive performance based on device capabilities
export const useAdaptivePerformance = () => {
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('high');
  const { fps } = usePerformanceMonitor();
  const isIdle = useIdleDetection();

  useEffect(() => {
    if (isLowEndDevice()) {
      setPerformanceLevel('low');
    } else if (fps < 30 && fps > 0) {
      setPerformanceLevel('medium');
    } else if (fps >= 30 || fps === 0) {
      setPerformanceLevel('high');
    }
  }, [fps]);

  return {
    performanceLevel,
    shouldReduceAnimations: performanceLevel === 'low' || isIdle,
    shouldReduceEffects: performanceLevel !== 'high',
    isIdle,
  };
};
