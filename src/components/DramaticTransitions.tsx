import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useParallax';

interface DramaticTransitionsProps {
  children: React.ReactNode;
  type?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn' | 'blurIn' | 'cinematic';
  duration?: number;
  delay?: number;
  className?: string;
  threshold?: number;
}

const DramaticTransitions: React.FC<DramaticTransitionsProps> = ({
  children,
  type = 'cinematic',
  duration = 1200,
  delay = 0,
  className = '',
  threshold = 0.2
}) => {
  const { isVisible, elementRef } = useScrollAnimation(threshold);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, delay]);

  const getTransitionClass = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-[${duration}ms]`;
    
    if (!hasAnimated) {
      switch (type) {
        case 'fadeIn':
          return `${baseClasses} ${durationClass} opacity-0`;
        case 'slideUp':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-20`;
        case 'slideDown':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-20`;
        case 'slideLeft':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-20`;
        case 'slideRight':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-20`;
        case 'scaleIn':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        case 'rotateIn':
          return `${baseClasses} ${durationClass} opacity-0 rotate-6 scale-95`;
        case 'blurIn':
          return `${baseClasses} ${durationClass} opacity-0 blur-sm scale-105`;
        case 'cinematic':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-32 scale-95 blur-sm`;
        default:
          return `${baseClasses} ${durationClass} opacity-0`;
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0 blur-0`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getTransitionClass()} ${className}`}
      style={{
        willChange: hasAnimated ? 'auto' : 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
};

// Componente para transições escalonadas
interface StaggeredTransitionsProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  type?: DramaticTransitionsProps['type'];
  className?: string;
}

export const StaggeredTransitions: React.FC<StaggeredTransitionsProps> = ({
  children,
  staggerDelay = 150,
  type = 'slideUp',
  className = ''
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <DramaticTransitions
          key={index}
          type={type}
          delay={index * staggerDelay}
          duration={800}
        >
          {child}
        </DramaticTransitions>
      ))}
    </div>
  );
};

// Componente para transição de seção completa
interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  backgroundEffect?: boolean;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = '',
  backgroundEffect = true
}) => {
  const { isVisible, elementRef } = useScrollAnimation(0.1);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isVisible && !hasEntered) {
      setHasEntered(true);
    }
  }, [isVisible, hasEntered]);

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Reveal Effect */}
      {backgroundEffect && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-600/20 transition-all duration-1500 ease-out ${
            hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        />
      )}
      
      {/* Content with Cinematic Entry */}
      <DramaticTransitions type="cinematic" duration={1500} delay={200}>
        {children}
      </DramaticTransitions>
    </div>
  );
};

// Componente para texto com efeito de máquina de escrever
interface TypewriterEffectProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 50,
  className = '',
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { isVisible } = useScrollAnimation(0.3);

  useEffect(() => {
    if (isVisible && !isTyping) {
      setIsTyping(true);
      
      const startTimer = setTimeout(() => {
        let index = 0;
        const timer = setInterval(() => {
          if (index < text.length) {
            setDisplayText(text.slice(0, index + 1));
            index++;
          } else {
            clearInterval(timer);
          }
        }, speed);

        return () => clearInterval(timer);
      }, delay);

      return () => clearTimeout(startTimer);
    }
  }, [isVisible, text, speed, delay, isTyping]);

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-0.5 h-6 bg-amber-600 ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`} />
    </span>
  );
};

// Componente para revelar texto palavra por palavra
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  delay = 0,
  wordDelay = 100
}) => {
  const words = text.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const { isVisible } = useScrollAnimation(0.3);

  useEffect(() => {
    if (isVisible) {
      const startTimer = setTimeout(() => {
        const timer = setInterval(() => {
          setVisibleWords(prev => {
            if (prev < words.length) {
              return prev + 1;
            } else {
              clearInterval(timer);
              return prev;
            }
          });
        }, wordDelay);

        return () => clearInterval(timer);
      }, delay);

      return () => clearTimeout(startTimer);
    }
  }, [isVisible, words.length, wordDelay, delay]);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out ${
            index < visibleWords
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {word}
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
};

export default DramaticTransitions;
