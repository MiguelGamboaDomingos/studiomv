import React, { Suspense, lazy, ComponentType } from 'react';

interface LazyComponentProps {
  fallback?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
}

interface LazyWrapperProps extends LazyComponentProps {
  children: React.ReactNode;
}

// Loading component for lazy-loaded components
const DefaultFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[200px] bg-black/20 backdrop-blur-sm rounded-lg">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-white/20 border-t-amber-800 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/60 text-sm">Carregando...</p>
    </div>
  </div>
);

// Error boundary for lazy-loaded components
class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-[200px] bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="text-center text-red-400 p-4">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm">Erro ao carregar componente</p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Wrapper component for lazy loading with error boundary and suspense
export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = <DefaultFallback />,
  error,
  className = '',
}) => {
  return (
    <div className={className}>
      <LazyErrorBoundary fallback={error}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </LazyErrorBoundary>
    </div>
  );
};

// Higher-order component for creating lazy-loaded components
export const createLazyComponent = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options: LazyComponentProps = {}
) => {
  const LazyComponent = lazy(importFunc);

  return React.forwardRef<any, P & LazyComponentProps>((props, ref) => {
    const { fallback, error, className, ...componentProps } = props;

    return (
      <LazyWrapper
        fallback={fallback || options.fallback}
        error={error || options.error}
        className={className || options.className}
      >
        <LazyComponent {...(componentProps as P)} ref={ref} />
      </LazyWrapper>
    );
  });
};

// Preload function for critical components
export const preloadComponent = (importFunc: () => Promise<any>) => {
  // Start loading the component
  importFunc().catch(error => {
    console.warn('Failed to preload component:', error);
  });
};

// Hook for conditional lazy loading based on viewport
export const useConditionalLazyLoad = (condition: boolean = true) => {
  const [shouldLoad, setShouldLoad] = React.useState(condition);

  React.useEffect(() => {
    if (!condition) return;

    // Load component when it becomes visible or after a delay
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [condition]);

  return shouldLoad;
};

// Lazy-loaded components for the application
export const LazyPortfolio = createLazyComponent(
  () => import('../pages/Portfolio'),
  {
    fallback: (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

export const LazyServicesPage = createLazyComponent(
  () => import('../pages/ServicesPage'),
  {
    fallback: (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

export const LazyAboutPage = createLazyComponent(
  () => import('../pages/AboutPage'),
  {
    fallback: (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

export const LazyContactPage = createLazyComponent(
  () => import('../pages/ContactPage'),
  {
    fallback: (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

// Lazy-loaded components for sections
export const LazyShowreel = createLazyComponent(
  () => import('./ShowreelSection'),
  {
    fallback: (
      <div className="py-16 bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

export const LazyVideoSuggestions = createLazyComponent(
  () => import('./VideoSuggestions'),
  {
    fallback: (
      <div className="py-32 bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

export const LazyServices = createLazyComponent(
  () => import('./Services'),
  {
    fallback: (
      <div className="py-20 bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

export const LazyAbout = createLazyComponent(
  () => import('./About'),
  {
    fallback: (
      <div className="py-20 bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

export const LazyContact = createLazyComponent(
  () => import('./Contact'),
  {
    fallback: (
      <div className="py-20 bg-black flex items-center justify-center">
        <DefaultFallback />
      </div>
    ),
  }
);

// Utility for progressive loading
export const useProgressiveLoading = (components: (() => Promise<any>)[], delay = 500) => {
  const [loadedCount, setLoadedCount] = React.useState(0);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadNext = () => {
      if (loadedCount < components.length) {
        preloadComponent(components[loadedCount]);
        setLoadedCount(prev => prev + 1);
        
        if (loadedCount + 1 < components.length) {
          timeoutId = setTimeout(loadNext, delay);
        }
      }
    };

    timeoutId = setTimeout(loadNext, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [components, delay, loadedCount]);

  return loadedCount;
};

export default LazyWrapper;
