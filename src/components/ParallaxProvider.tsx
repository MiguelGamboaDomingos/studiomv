import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useAdaptivePerformance, useScrollPerformance } from '../hooks/usePerformance';

// Tipos para configuração do parallax
export interface ParallaxConfig {
  speed: number;
  direction: 'vertical' | 'horizontal' | 'both';
  easing: 'linear' | 'ease-out' | 'ease-in-out';
  offset: number;
  threshold: number;
  disabled?: boolean;
}

export interface ParallaxElement {
  id: string;
  element: HTMLElement;
  config: ParallaxConfig;
  isVisible: boolean;
  transform: string;
}

interface ParallaxContextType {
  registerElement: (id: string, element: HTMLElement, config: ParallaxConfig) => void;
  unregisterElement: (id: string) => void;
  updateConfig: (id: string, config: Partial<ParallaxConfig>) => void;
  globalConfig: {
    enabled: boolean;
    performanceMode: 'high' | 'medium' | 'low';
    reducedMotion: boolean;
  };
}

const ParallaxContext = createContext<ParallaxContextType | null>(null);

export const useParallaxContext = () => {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error('useParallaxContext must be used within a ParallaxProvider');
  }
  return context;
};

interface ParallaxProviderProps {
  children: React.ReactNode;
  globalSpeed?: number;
  enabled?: boolean;
}

export const ParallaxProvider: React.FC<ParallaxProviderProps> = ({
  children,
  globalSpeed = 1,
  enabled = true,
}) => {
  const [elements, setElements] = useState<Map<string, ParallaxElement>>(new Map());
  const { performanceLevel, shouldReduceAnimations } = useAdaptivePerformance();
  const elementsRef = useRef(elements);
  
  // Atualizar ref quando elements mudar
  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);

  // Função para calcular transform baseado no tipo de easing
  const calculateTransform = (scrollY: number, config: ParallaxConfig, elementRect: DOMRect): string => {
    const { speed, direction, easing, offset } = config;
    
    // Calcular posição relativa do elemento
    const elementTop = elementRect.top + scrollY;
    const elementCenter = elementTop + elementRect.height / 2;
    const viewportCenter = scrollY + window.innerHeight / 2;
    const distance = viewportCenter - elementCenter;
    
    // Aplicar speed global
    const adjustedSpeed = speed * globalSpeed;
    
    // Calcular movimento base
    let movement = distance * adjustedSpeed + offset;
    
    // Aplicar easing
    switch (easing) {
      case 'ease-out':
        movement = movement * (1 - Math.pow(1 - Math.abs(movement) / 1000, 3));
        break;
      case 'ease-in-out':
        const t = Math.abs(movement) / 1000;
        movement = movement * (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        break;
      // 'linear' não precisa de modificação
    }
    
    // Gerar transform baseado na direção
    switch (direction) {
      case 'horizontal':
        return `translateX(${movement}px)`;
      case 'both':
        return `translate(${movement * 0.5}px, ${movement}px)`;
      default: // 'vertical'
        return `translateY(${movement}px)`;
    }
  };

  // Função principal de update do parallax
  const updateParallax = (scrollY: number) => {
    if (!enabled || shouldReduceAnimations) return;

    const currentElements = elementsRef.current;
    const windowHeight = window.innerHeight;
    const updatedElements = new Map(currentElements);

    currentElements.forEach((parallaxElement, id) => {
      const { element, config } = parallaxElement;
      
      if (config.disabled) return;

      const rect = element.getBoundingClientRect();
      const isVisible = rect.bottom >= -config.threshold && rect.top <= windowHeight + config.threshold;
      
      if (isVisible) {
        const transform = calculateTransform(scrollY, config, rect);
        
        // Aplicar transform com otimização
        element.style.transform = transform;
        element.style.willChange = 'transform';
        
        updatedElements.set(id, {
          ...parallaxElement,
          isVisible: true,
          transform,
        });
      } else {
        // Limpar will-change quando não visível para performance
        element.style.willChange = 'auto';
        
        updatedElements.set(id, {
          ...parallaxElement,
          isVisible: false,
        });
      }
    });

    setElements(updatedElements);
  };

  // Hook para scroll com performance otimizada
  useScrollPerformance(updateParallax, performanceLevel === 'low' ? 32 : 16);

  // Funções do contexto
  const registerElement = (id: string, element: HTMLElement, config: ParallaxConfig) => {
    const parallaxElement: ParallaxElement = {
      id,
      element,
      config,
      isVisible: false,
      transform: '',
    };
    
    setElements(prev => new Map(prev.set(id, parallaxElement)));
  };

  const unregisterElement = (id: string) => {
    setElements(prev => {
      const newElements = new Map(prev);
      newElements.delete(id);
      return newElements;
    });
  };

  const updateConfig = (id: string, newConfig: Partial<ParallaxConfig>) => {
    setElements(prev => {
      const element = prev.get(id);
      if (!element) return prev;
      
      const updatedElement = {
        ...element,
        config: { ...element.config, ...newConfig },
      };
      
      return new Map(prev.set(id, updatedElement));
    });
  };

  const contextValue: ParallaxContextType = {
    registerElement,
    unregisterElement,
    updateConfig,
    globalConfig: {
      enabled: enabled && !shouldReduceAnimations,
      performanceMode: performanceLevel,
      reducedMotion: shouldReduceAnimations,
    },
  };

  return (
    <ParallaxContext.Provider value={contextValue}>
      {children}
    </ParallaxContext.Provider>
  );
};

export default ParallaxProvider;
