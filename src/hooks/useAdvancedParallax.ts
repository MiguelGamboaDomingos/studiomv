import { useEffect, useRef, useState } from 'react';
import { useParallaxContext, ParallaxConfig } from '../components/ParallaxProvider';
import { useIntersectionObserver } from './usePerformance';

// Presets de configuração para diferentes tipos de parallax
export const PARALLAX_PRESETS = {
  // Parallax básico - movimento suave para backgrounds
  background: {
    speed: 0.3,
    direction: 'vertical' as const,
    easing: 'linear' as const,
    offset: 0,
    threshold: 200,
  },
  
  // Parallax médio - para elementos de conteúdo
  content: {
    speed: 0.5,
    direction: 'vertical' as const,
    easing: 'ease-out' as const,
    offset: 0,
    threshold: 100,
  },
  
  // Parallax rápido - para elementos em primeiro plano
  foreground: {
    speed: 0.8,
    direction: 'vertical' as const,
    easing: 'ease-in-out' as const,
    offset: 0,
    threshold: 50,
  },
  
  // Parallax horizontal - para elementos laterais
  horizontal: {
    speed: 0.4,
    direction: 'horizontal' as const,
    easing: 'ease-out' as const,
    offset: 0,
    threshold: 100,
  },
  
  // Parallax flutuante - movimento em ambas direções
  floating: {
    speed: 0.2,
    direction: 'both' as const,
    easing: 'ease-in-out' as const,
    offset: 0,
    threshold: 150,
  },
  
  // Parallax sutil - para textos e elementos delicados
  subtle: {
    speed: 0.1,
    direction: 'vertical' as const,
    easing: 'linear' as const,
    offset: 0,
    threshold: 300,
  },
} as const;

export type ParallaxPreset = keyof typeof PARALLAX_PRESETS;

interface UseAdvancedParallaxOptions {
  preset?: ParallaxPreset;
  config?: Partial<ParallaxConfig>;
  autoRegister?: boolean;
  dependencies?: any[];
}

export const useAdvancedParallax = (options: UseAdvancedParallaxOptions = {}) => {
  const {
    preset = 'content',
    config = {},
    autoRegister = true,
    dependencies = [],
  } = options;

  const { registerElement, unregisterElement, updateConfig, globalConfig } = useParallaxContext();
  const elementRef = useRef<HTMLElement>(null);
  const [elementId] = useState(() => `parallax-${Math.random().toString(36).substr(2, 9)}`);
  const [isRegistered, setIsRegistered] = useState(false);

  // Combinar preset com config customizado
  const finalConfig: ParallaxConfig = {
    ...PARALLAX_PRESETS[preset],
    ...config,
  };

  // Registrar elemento quando disponível
  useEffect(() => {
    if (autoRegister && elementRef.current && !isRegistered && globalConfig.enabled) {
      registerElement(elementId, elementRef.current, finalConfig);
      setIsRegistered(true);
    }

    return () => {
      if (isRegistered) {
        unregisterElement(elementId);
        setIsRegistered(false);
      }
    };
  }, [autoRegister, isRegistered, globalConfig.enabled, ...dependencies]);

  // Atualizar configuração quando mudanças ocorrerem
  useEffect(() => {
    if (isRegistered) {
      updateConfig(elementId, finalConfig);
    }
  }, [preset, JSON.stringify(config), isRegistered]);

  // Funções de controle manual
  const register = () => {
    if (elementRef.current && !isRegistered) {
      registerElement(elementId, elementRef.current, finalConfig);
      setIsRegistered(true);
    }
  };

  const unregister = () => {
    if (isRegistered) {
      unregisterElement(elementId);
      setIsRegistered(false);
    }
  };

  const updateSettings = (newConfig: Partial<ParallaxConfig>) => {
    if (isRegistered) {
      updateConfig(elementId, newConfig);
    }
  };

  return {
    elementRef,
    isRegistered,
    register,
    unregister,
    updateSettings,
    globalConfig,
  };
};

// Hook especializado para parallax de background
export const useBackgroundParallax = (speed: number = 0.3, customConfig?: Partial<ParallaxConfig>) => {
  return useAdvancedParallax({
    preset: 'background',
    config: { speed, ...customConfig },
  });
};

// Hook especializado para parallax de conteúdo
export const useContentParallax = (speed: number = 0.5, customConfig?: Partial<ParallaxConfig>) => {
  return useAdvancedParallax({
    preset: 'content',
    config: { speed, ...customConfig },
  });
};

// Hook especializado para parallax horizontal
export const useHorizontalParallax = (speed: number = 0.4, customConfig?: Partial<ParallaxConfig>) => {
  return useAdvancedParallax({
    preset: 'horizontal',
    config: { speed, ...customConfig },
  });
};

// Hook especializado para parallax flutuante
export const useFloatingParallax = (speed: number = 0.2, customConfig?: Partial<ParallaxConfig>) => {
  return useAdvancedParallax({
    preset: 'floating',
    config: { speed, ...customConfig },
  });
};

// Hook para parallax com trigger de visibilidade
export const useTriggeredParallax = (
  preset: ParallaxPreset = 'content',
  triggerOptions?: IntersectionObserverInit
) => {
  const { isIntersecting, elementRef: observerRef } = useIntersectionObserver(triggerOptions);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const parallax = useAdvancedParallax({
    preset,
    config: { disabled: !shouldAnimate },
    autoRegister: false,
  });

  // Sincronizar refs
  useEffect(() => {
    if (observerRef.current && parallax.elementRef.current !== observerRef.current) {
      (parallax.elementRef as any).current = observerRef.current;
    }
  }, [observerRef.current]);

  // Controlar animação baseado na visibilidade
  useEffect(() => {
    if (isIntersecting && !shouldAnimate) {
      setShouldAnimate(true);
      parallax.register();
    } else if (!isIntersecting && shouldAnimate) {
      setShouldAnimate(false);
      parallax.unregister();
    }
  }, [isIntersecting, shouldAnimate]);

  return {
    elementRef: observerRef,
    isVisible: isIntersecting,
    isAnimating: shouldAnimate,
    ...parallax,
  };
};

// Hook para múltiplos elementos parallax (útil para listas)
export const useMultiParallax = (
  count: number,
  preset: ParallaxPreset = 'content',
  staggerDelay: number = 0.1
) => {
  const elements = Array.from({ length: count }, (_, index) => {
    const speed = PARALLAX_PRESETS[preset].speed + (index * staggerDelay);
    return useAdvancedParallax({
      preset,
      config: { speed },
    });
  });

  return elements;
};

export default useAdvancedParallax;
