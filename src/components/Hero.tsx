import React, { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useParallax';
import { ParallaxElement, ParallaxLayers } from './HomeParallax';
import DramaticTransitions, { TypewriterEffect } from './DramaticTransitions';

// Spline Scene Component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        ref?: React.RefObject<any>;
        style?: React.CSSProperties;
        className?: string;
        'events-target'?: string;
      };
    }
  }
}

// Hook para detectar scroll e trigger click automático no Spline
const useSplineAutoClick = (splineRef: React.RefObject<any>) => {
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.15; // 15% da altura da tela

      if (scrollY > triggerPoint && !hasTriggered && splineRef.current) {
        // Simula um clique no centro do Spline
        const splineElement = splineRef.current;
        const rect = splineElement.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Dispara evento de clique
        const clickEvent = new MouseEvent('click', {
          clientX: rect.left + centerX,
          clientY: rect.top + centerY,
          bubbles: true
        });

        splineElement.dispatchEvent(clickEvent);
        setHasTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered, splineRef]);

  return { hasTriggered };
};


const Hero: React.FC = () => {
  const splineRef = useRef<any>(null);
  const { elementRef: heroRef } = useScrollAnimation(0.1);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);

  // Hook para trigger automático no Spline quando faz scroll
  useSplineAutoClick(splineRef);

  // Função para scroll suave para showreel
  const scrollToShowreel = () => {
    const showreelSection = document.querySelector('#showreel');
    if (showreelSection) {
      showreelSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para detectar se o usuário fez scroll após chegar ao showreel
  const hasUserScrolledAfterShowreel = () => {
    const showreelSection = document.querySelector('#showreel');
    if (!showreelSection) return false;

    const rect = showreelSection.getBoundingClientRect();
    const showreelTop = rect.top + window.scrollY;
    const currentScroll = window.scrollY;

    // Se o usuário scrollou mais de 100px após o showreel, considera que fez scroll manual
    return currentScroll > showreelTop + 100;
  };

  // Adicionar event listener para cliques no Spline
  useEffect(() => {
    const handleSplineClick = () => {
      console.log('Spline clicked! Scrolling to showreel...');
      scrollToShowreel();
    };

    if (splineRef.current) {
      splineRef.current.addEventListener('click', handleSplineClick);
    }

    return () => {
      if (splineRef.current) {
        splineRef.current.removeEventListener('click', handleSplineClick);
      }
    };
  }, []);

  // Função para scroll suave para o Showreel
  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToShowreel();
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-between overflow-hidden bg-black"
    >
      {/* Background with Parallax Layers */}
      <ParallaxLayers className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
      </ParallaxLayers>

      {/* Grid Vertical Animada com Parallax - castanho escuro - Atrás do Spline */}
      <ParallaxElement speed={0.3} className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-amber-900/30 to-transparent"
            style={{
              left: `${(i + 1) * 5}%`,
              animation: `verticalGrid ${3 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </ParallaxElement>

      {/* Spline 3D maior com sobreposição e Parallax - Na frente da grid */}
      <ParallaxElement speed={0.6} className="absolute top-1/2 sm:top-1/4 right-1/2 sm:right-8 lg:right-12 w-4/5 sm:w-3/5 lg:w-3/5 h-2/5 sm:h-3/5 z-10 transform translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0">
        <div className="w-full h-full relative">
          <spline-viewer
            ref={splineRef}
            url="https://prod.spline.design/jTMyGBieAUQfvg0X/scene.splinecode"
            className="w-full h-full opacity-60"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent'
            }}
            events-target="global"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-yellow-900/5 to-amber-950/15 blur-xl pointer-events-none"></div>
        </div>
      </ParallaxElement>

      {/* Elementos 3D adicionais com Parallax - Atrás do texto mas na frente do Spline */}
      <ParallaxElement speed={0.8} className="absolute inset-0 z-15 pointer-events-none">
        {/* Partículas flutuantes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `simpleFloat ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Formas geométricas */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-amber-900/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-8 h-8 bg-amber-800/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-1 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent animate-pulse"></div>
      </ParallaxElement>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start sm:items-center min-h-screen pt-16 sm:pt-0">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-5xl relative z-30 pr-8 lg:pr-16">
          <DramaticTransitions type="fadeIn" delay={300} duration={1000}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-white leading-[0.9] tracking-tight mb-6 cursor-pointer transition-all duration-300 relative"
              style={{
                transform: isHoveringTitle ? 'scale(1.02)' : 'scale(0.9)', // Reduzido 10%
              }}
              onMouseEnter={() => setIsHoveringTitle(true)}
              onMouseLeave={() => setIsHoveringTitle(false)}
            >
              <span className={isHoveringTitle ? 'animate-glitch-text' : ''}>
                Filmes que carregam
                <br />
                emoções, frames que
                <br />
                guardam histórias.
              </span>

              {/* Efeito de matriz elétrica - Grid organizado */}
              {isHoveringTitle && (
                <>
                  {/* Linhas verticais - Grid de 6 colunas - Castanhas */}
                  <div className="absolute inset-0 animate-electric-1 opacity-40">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className={`absolute top-0 h-full bg-gradient-to-b from-transparent via-amber-600 to-transparent animate-pulse`}
                        style={{
                          left: `${(i + 1) * 14.28}%`,
                          width: '0.5px',
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Linhas horizontais - Grid de 6 linhas - Castanhas */}
                  <div className="absolute inset-0 animate-electric-2 opacity-30">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className={`absolute left-0 w-full bg-gradient-to-r from-transparent via-amber-600 to-transparent animate-pulse`}
                        style={{
                          top: `${(i + 1) * 16.66}%`,
                          height: '0.5px',
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Pontos de intersecção brilhantes - Castanhos */}
                  <div className="absolute inset-0 animate-electric-1 opacity-50">
                    {[...Array(6)].map((_, col) =>
                      [...Array(6)].map((_, row) => (
                        <div
                          key={`point-${col}-${row}`}
                          className="absolute bg-amber-500 rounded-full animate-pulse"
                          style={{
                            left: `${(col + 1) * 14.28}%`,
                            top: `${(row + 1) * 16.66}%`,
                            width: '2px',
                            height: '2px',
                            animationDelay: `${(col + row) * 0.05}s`
                          }}
                        />
                      ))
                    )}
                  </div>
                </>
              )}
            </h1>
          </DramaticTransitions>

          <DramaticTransitions type="slideUp" delay={2000} duration={1000}>
            <p className="text-base sm:text-lg text-gray-300 font-light mb-8 max-w-2xl">
              <TypewriterEffect
                text="O vídeo que a sua marca precisa, nós criamos com paixão."
                speed={80}
                delay={500}
              />
            </p>
          </DramaticTransitions>


        </div>
      </div>

      {/* Scroll Indicator Centralizado e Clicável com Transição Dramática */}
      <DramaticTransitions type="fadeIn" delay={3000} duration={1000} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={handleScrollClick}
          className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-900 rounded-lg p-2 bg-amber-950/20 backdrop-blur-sm hover:bg-amber-950/40 transition-all duration-300"
          aria-label="Scroll para showreel e ativar Spline"
        >
          <div className="w-6 h-10 border-2 border-amber-900/50 rounded-full flex justify-center animate-bounce group-hover:border-amber-800 group-hover:shadow-lg group-hover:shadow-amber-900/30 transition-all duration-300">
            <div className="w-1 h-3 bg-amber-900 rounded-full mt-2 animate-pulse group-hover:bg-amber-800"></div>
          </div>
          <span className="text-amber-900 text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Clique para continuar
          </span>
        </button>
      </DramaticTransitions>

      {/* Estilos CSS para efeitos glitch e elétricos */}
      <style>{`
        @keyframes glitch-text {
          0% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(-2px, -2px); }
          30% { transform: translate(2px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          70% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, -2px); }
          90% { transform: translate(2px, 2px); }
          100% { transform: translate(0); }
        }

        @keyframes electric-1 {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          25% { opacity: 1; transform: scaleY(1.1); }
          50% { opacity: 0.3; transform: scaleY(0.9); }
          75% { opacity: 0.8; transform: scaleY(1.05); }
        }

        @keyframes electric-2 {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          20% { opacity: 0.8; transform: scaleX(1.1); }
          40% { opacity: 0.2; transform: scaleX(0.9); }
          60% { opacity: 0.9; transform: scaleX(1.05); }
          80% { opacity: 0.3; transform: scaleX(0.95); }
        }

        @keyframes verticalGrid {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          25% { opacity: 0.6; transform: scaleY(1.05); }
          50% { opacity: 0.2; transform: scaleY(0.95); }
          75% { opacity: 0.5; transform: scaleY(1.02); }
        }

        @keyframes parallaxFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-10px) rotate(90deg); opacity: 0.6; }
          50% { transform: translateY(-5px) rotate(180deg); opacity: 0.4; }
          75% { transform: translateY(-15px) rotate(270deg); opacity: 0.5; }
        }

        .animate-glitch-text {
          animation: glitch-text 0.3s infinite;
        }

        .animate-electric-1 {
          animation: electric-1 0.8s ease-in-out infinite;
        }

        .animate-electric-2 {
          animation: electric-2 1.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;