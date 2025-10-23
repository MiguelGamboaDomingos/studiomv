import React, { forwardRef } from 'react';
import { useAdvancedParallax, ParallaxPreset, PARALLAX_PRESETS } from '../hooks/useAdvancedParallax';
import { ParallaxConfig } from './ParallaxProvider';

interface ParallaxElementProps {
  children: React.ReactNode;
  preset?: ParallaxPreset;
  speed?: number;
  direction?: 'vertical' | 'horizontal' | 'both';
  easing?: 'linear' | 'ease-out' | 'ease-in-out';
  offset?: number;
  threshold?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  onRegister?: () => void;
  onUnregister?: () => void;
}

export const ParallaxElement = forwardRef<HTMLElement, ParallaxElementProps>(({
  children,
  preset = 'content',
  speed,
  direction,
  easing,
  offset,
  threshold,
  disabled,
  className = '',
  style = {},
  as: Component = 'div',
  onRegister,
  onUnregister,
  ...props
}, ref) => {
  // Construir config customizado
  const customConfig: Partial<ParallaxConfig> = {};
  if (speed !== undefined) customConfig.speed = speed;
  if (direction !== undefined) customConfig.direction = direction;
  if (easing !== undefined) customConfig.easing = easing;
  if (offset !== undefined) customConfig.offset = offset;
  if (threshold !== undefined) customConfig.threshold = threshold;
  if (disabled !== undefined) customConfig.disabled = disabled;

  const { elementRef, isRegistered } = useAdvancedParallax({
    preset,
    config: customConfig,
  });

  // Callbacks para registro
  React.useEffect(() => {
    if (isRegistered && onRegister) {
      onRegister();
    } else if (!isRegistered && onUnregister) {
      onUnregister();
    }
  }, [isRegistered, onRegister, onUnregister]);

  // Combinar refs se fornecido
  React.useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(elementRef.current);
      } else {
        ref.current = elementRef.current;
      }
    }
  }, [ref, elementRef.current]);

  const combinedStyle: React.CSSProperties = {
    ...style,
    // Otimizações de performance
    willChange: isRegistered ? 'transform' : 'auto',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  };

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className,
      style: combinedStyle,
      ...props,
    },
    children
  );
});

ParallaxElement.displayName = 'ParallaxElement';

// Componentes especializados para casos comuns
export const ParallaxBackground: React.FC<Omit<ParallaxElementProps, 'preset'>> = (props) => (
  <ParallaxElement preset="background" {...props} />
);

export const ParallaxContent: React.FC<Omit<ParallaxElementProps, 'preset'>> = (props) => (
  <ParallaxElement preset="content" {...props} />
);

export const ParallaxForeground: React.FC<Omit<ParallaxElementProps, 'preset'>> = (props) => (
  <ParallaxElement preset="foreground" {...props} />
);

export const ParallaxHorizontal: React.FC<Omit<ParallaxElementProps, 'preset'>> = (props) => (
  <ParallaxElement preset="horizontal" {...props} />
);

export const ParallaxFloating: React.FC<Omit<ParallaxElementProps, 'preset'>> = (props) => (
  <ParallaxElement preset="floating" {...props} />
);

export const ParallaxSubtle: React.FC<Omit<ParallaxElementProps, 'preset'>> = (props) => (
  <ParallaxElement preset="subtle" {...props} />
);

// Componente para seções com parallax automático
interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundPattern?: 'grid' | 'dots' | 'lines' | 'none';
  backgroundSpeed?: number;
  contentSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
  patternColor?: string;
  patternOpacity?: number;
  patternSize?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundPattern = 'none',
  backgroundSpeed = 0.3,
  contentSpeed = 0.5,
  className = '',
  style = {},
  patternColor = 'rgba(201,169,97,0.1)',
  patternOpacity = 0.05,
  patternSize = 100,
}) => {
  const getPatternStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      opacity: patternOpacity,
      pointerEvents: 'none',
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
          backgroundSize: `100% ${patternSize}px`,
        };
      
      default:
        return { display: 'none' };
    }
  };

  return (
    <section className={`relative overflow-hidden ${className}`} style={style}>
      {/* Background Pattern com Parallax */}
      {backgroundPattern !== 'none' && (
        <ParallaxBackground
          speed={backgroundSpeed}
          className="absolute inset-0"
          style={getPatternStyle()}
        />
      )}
      
      {/* Conteúdo com Parallax */}
      <ParallaxContent speed={contentSpeed} className="relative z-10">
        {children}
      </ParallaxContent>
    </section>
  );
};

// Componente para listas com parallax escalonado
interface ParallaxListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  preset?: ParallaxPreset;
  className?: string;
  itemClassName?: string;
}

export const ParallaxList: React.FC<ParallaxListProps> = ({
  children,
  staggerDelay = 0.1,
  preset = 'content',
  className = '',
  itemClassName = '',
}) => {
  const baseSpeed = PARALLAX_PRESETS[preset].speed;

  return (
    <div className={className}>
      {children.map((child, index) => (
        <ParallaxElement
          key={index}
          preset={preset}
          speed={baseSpeed + (index * staggerDelay)}
          className={itemClassName}
        >
          {child}
        </ParallaxElement>
      ))}
    </div>
  );
};

export default ParallaxElement;
