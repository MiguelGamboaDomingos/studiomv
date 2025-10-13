import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  blurDataURL,
  onLoad,
  onError,
  priority = false,
  sizes,
  quality = 75,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Generate optimized image URL
  const getOptimizedSrc = (originalSrc: string, width?: number) => {
    // For external URLs (like Pexels), we can add query parameters for optimization
    if (originalSrc.includes('pexels.com')) {
      const url = new URL(originalSrc);
      if (width) url.searchParams.set('w', width.toString());
      if (quality !== 75) url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'compress');
      url.searchParams.set('cs', 'tinysrgb');
      return url.toString();
    }
    
    // For local images, return as-is (in production, you'd use a service like Cloudinary)
    return originalSrc;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (originalSrc: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map(width => `${getOptimizedSrc(originalSrc, width)} ${width}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder component
  const PlaceholderComponent = () => (
    <div 
      className={`bg-gray-800 animate-pulse flex items-center justify-center ${className}`}
      aria-label="Carregando imagem..."
    >
      {blurDataURL ? (
        <img
          src={blurDataURL}
          alt=""
          className="w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div 
      className={`bg-red-900/20 border border-red-500/30 flex items-center justify-center ${className}`}
      role="img"
      aria-label="Erro ao carregar imagem"
    >
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
        <p className="text-xs">Erro ao carregar</p>
      </div>
    </div>
  );

  if (hasError) {
    return <ErrorComponent />;
  }

  if (!isInView) {
    return (
      <div ref={imgRef} className={className}>
        <PlaceholderComponent />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={imgRef}>
      {/* Placeholder shown while loading */}
      {!isLoaded && <PlaceholderComponent />}
      
      {/* Actual image */}
      <img
        src={getOptimizedSrc(src)}
        srcSet={generateSrcSet(src)}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
};

// Hook for preloading critical images
export const useImagePreload = (src: string) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);
};

// Higher-order component for image optimization
export const withImageOptimization = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.forwardRef<any, P>((props, ref) => {
    return <Component {...props} ref={ref} />;
  });
};

export default LazyImage;
