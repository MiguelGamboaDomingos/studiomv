import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Circle } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

const ProjectCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Casamento Civil',
      subtitle: 'Casamento',
      image:
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1',
      category: 'Wedding',
    },
    {
      id: 2,
      title: 'Pixel Fusion',
      subtitle: 'Evento',
      image:
        'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1',
      category: 'Event',
    },
    {
      id: 3,
      title: 'EcoEV',
      subtitle: 'Corporate',
      image:
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1',
      category: 'Corporate',
    },
    {
      id: 4,
      title: 'Fashion Story',
      subtitle: 'Moda',
      image:
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1',
      category: 'Fashion',
    },
    {
      id: 5,
      title: 'Brand Identity',
      subtitle: 'Branding',
      image:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1',
      category: 'Brand',
    },
  ];

  const goToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    setCurrentIndex(clamped);
  };

  const goToPrevious = () => goToSlide(currentIndex - 1);
  const goToNext = () => goToSlide(currentIndex + 1);

  /**
   * Scroll vertical -> navegação horizontal suave (slide a slide).
   * - Usa IntersectionObserver para só capturar quando a secção está visível
   * - Acumula deltaY até um threshold (melhor em trackpads)
   * - Cooldown entre transições para evitar jitter
   * - Liberta o Y quando chega ao início/fim do carrossel
   */
  useEffect(() => {
    if (!sectionRef.current || !carouselRef.current) return;

    const sectionEl = sectionRef.current;
    const container = carouselRef.current;

    let active = false; // só captura se a secção estiver visível
    let animating = false; // lock anti-jitter
    let cooldownTO: number | null = null;
    let deltaBuffer = 0;

    const WHEEL_THRESHOLD = 140; // ↑ se quiseres menos sensível (ex.: 180–220)
    const TOUCH_THRESHOLD = 42;  // ↑ se quiseres gesto mais firme (ex.: 56–64)
    const TRANSITION_MS = 750;   // deve casar com a duration do track

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        // Ativa quando a seção está visível e próxima do centro
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;

        // Considera ativo quando a seção está entre 30% e 70% da viewport
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const viewportTop30 = viewportHeight * 0.3;
        const viewportBottom70 = viewportHeight * 0.7;

        const isInActiveZone = (
          (sectionTop <= viewportTop30 && sectionBottom >= viewportTop30) ||
          (sectionTop <= viewportBottom70 && sectionBottom >= viewportBottom70) ||
          (sectionTop >= viewportTop30 && sectionBottom <= viewportBottom70)
        );

        active = entry.isIntersecting && isInActiveZone;
      },
      { root: null, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(sectionEl);

    const triggerTo = (next: number) => {
      animating = true;
      goToSlide(next);
      if (cooldownTO) window.clearTimeout(cooldownTO);
      cooldownTO = window.setTimeout(() => {
        animating = false;
        deltaBuffer = 0;
      }, TRANSITION_MS);
    };

    const onWheel = (e: WheelEvent) => {
      if (!active) return;

      const atStart = currentIndex === 0;
      const atEnd = currentIndex === projects.length - 1;

      // acumula delta e só previne quando vamos consumir
      deltaBuffer += e.deltaY;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      const shouldCapture =
        (!atEnd && goingDown) || (!atStart && goingUp);

      if (shouldCapture) {
        e.preventDefault();
        e.stopPropagation();

        if (animating) return;

        if (deltaBuffer >= WHEEL_THRESHOLD && currentIndex < projects.length - 1) {
          triggerTo(currentIndex + 1);
        } else if (deltaBuffer <= -WHEEL_THRESHOLD && currentIndex > 0) {
          triggerTo(currentIndex - 1);
        }
      } else {
        // limites: deixa o Y passar
        deltaBuffer = 0;
      }
    };

    // Touch: converte gesto vertical em navegação
    let startY: number | null = null;
    let startX: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (!active) return;
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!active || startY == null || startX == null) return;
      const dy = e.touches[0].clientY - startY;
      const dx = e.touches[0].clientX - startX;

      // só intercepta se gesto for predominantemente vertical
      if (Math.abs(dy) > Math.abs(dx)) {
        const atStart = currentIndex === 0;
        const atEnd = currentIndex === projects.length - 1;
        const goingDown = dy < -TOUCH_THRESHOLD;
        const goingUp = dy > TOUCH_THRESHOLD;

        const shouldCapture =
          (!atEnd && goingDown) || (!atStart && goingUp);

        if (shouldCapture) {
          e.preventDefault();
          if (animating) return;
          if (goingDown && currentIndex < projects.length - 1) triggerTo(currentIndex + 1);
          else if (goingUp && currentIndex > 0) triggerTo(currentIndex - 1);
        }
      }
    };

    // Teclado (coeso com o ritmo suave)
    const onKeyDown = (e: KeyboardEvent) => {
      if (!active || animating) return;
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentIndex < projects.length - 1) {
        e.preventDefault();
        triggerTo(currentIndex + 1);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentIndex > 0) {
        e.preventDefault();
        triggerTo(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < projects.length - 1) {
        e.preventDefault();
        triggerTo(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        triggerTo(currentIndex - 1);
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      io.disconnect();
      container.removeEventListener('wheel', onWheel as any);
      container.removeEventListener('touchstart', onTouchStart as any);
      container.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('keydown', onKeyDown as any);
      if (cooldownTO) window.clearTimeout(cooldownTO);
    };
  }, [currentIndex, projects.length]);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,69,19,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,69,19,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Elegante */}
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            O nosso <span className="text-stone-300">portfólio</span> em destaque
          </h2>
          <button
            className={`relative px-8 py-4 rounded-2xl text-sm font-medium shadow-xl overflow-hidden group transform transition-all duration-700 ease-out backdrop-blur-xl ${
              isButtonHovered
                ? 'bg-gradient-to-r from-stone-800/80 via-amber-900/60 to-stone-800/80 border-2 border-amber-600/50 shadow-amber-700/30 scale-105'
                : 'bg-gradient-to-r from-amber-800/40 via-stone-700/30 to-amber-900/40 shadow-amber-800/25 scale-100 hover:scale-105 border border-amber-700/30'
            }`}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span className={`relative z-10 text-white flex items-center gap-3 transition-all duration-500 ease-out ${
              isButtonHovered ? 'transform -translate-y-0.5 text-stone-200' : 'transform translate-y-0'
            }`}>
              <Circle className={`w-2 h-2 fill-amber-400 text-amber-400 transition-all duration-500 ease-out ${
                isButtonHovered
                  ? 'opacity-100 scale-110 animate-pulse'
                  : 'opacity-0 scale-0'
              }`} />
              Ver todos os projetos
            </span>

            {/* Efeito de vidro elegante */}
            <div className={`absolute inset-0 bg-gradient-to-r from-stone-800/60 via-amber-900/40 to-stone-800/60 transition-opacity duration-700 ease-out ${
              isButtonHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>

            {/* Efeito de brilho sutil */}
            <div className={`absolute inset-0 bg-gradient-to-r from-amber-700/30 via-amber-600/20 to-amber-800/30 transition-opacity duration-700 ease-out ${
              !isButtonHovered ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
            }`}></div>

            {/* Efeito de textura quando hover */}
            <div className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              isButtonHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent animate-pulse"></div>
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-stone-400 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}></div>
              </div>

              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" style={{animationDelay: '0.15s'}}></div>
              </div>
            </div>
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons Elegantes */}
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-br from-stone-900/80 via-amber-900/60 to-stone-900/80 backdrop-blur-xl border border-amber-700/30 rounded-2xl flex items-center justify-center text-amber-300 hover:bg-gradient-to-br hover:from-amber-900/60 hover:via-stone-800/70 hover:to-amber-900/60 hover:border-amber-600/50 hover:text-amber-200 transition-all duration-500 shadow-lg shadow-amber-900/20"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-br from-stone-900/80 via-amber-900/60 to-stone-900/80 backdrop-blur-xl border border-amber-700/30 rounded-2xl flex items-center justify-center text-amber-300 hover:bg-gradient-to-br hover:from-amber-900/60 hover:via-stone-800/70 hover:to-amber-900/60 hover:border-amber-600/50 hover:text-amber-200 transition-all duration-500 shadow-lg shadow-amber-900/20"
            aria-label="Seguinte"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 🔁 Track Horizontal com easing cinematográfico */}
          <div ref={carouselRef} className="relative overflow-hidden" aria-roledescription="carrossel horizontal">
            <div
              className="flex gap-8 will-change-transform transition-transform duration-[750ms]"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                // translateX = -(index * (cardWidth + gap)) — gap = 2rem (Tailwind gap-8)
                transform: `translateX(calc(${currentIndex} * -1 * (300px + 2rem)))`,
                padding: '0 12vw',
              }}
            >
              {projects.map((project, idx) => {
                const isCenter = idx === currentIndex;
                return (
                  <div
                    key={project.id}
                    className="relative group shrink-0 cursor-pointer transition-all duration-[750ms]"
                    style={{
                      width: '360px',
                      transform: `scale(${isCenter ? 1.05 : 0.95})`,
                      opacity: isCenter ? 1 : 0.7,
                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl h-[520px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[750ms] group-hover:scale-110"
                        draggable={false}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                      />

                      {/* Efeito de Vidro Elegante (realce no cartão central) */}
                      <div
                        className={`pointer-events-none absolute inset-0 ${
                          isCenter ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-500`}
                      >
                        {/* Brilho sutil */}
                        <div className="absolute inset-0 mix-blend-soft-light animate-elegant-glow" />

                        {/* Feixes verticais elegantes */}
                        <div className="absolute inset-0 opacity-40">
                          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-300/60 to-transparent animate-elegant-beam-1" />
                          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-stone-300/40 to-transparent animate-elegant-beam-2" />
                        </div>

                        {/* Varredura horizontal sutil */}
                        <div className="absolute left-0 right-0 h-px top-1/2 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent animate-elegant-scanline" />

                        {/* Pontos de luz */}
                        <div className="absolute -top-2 left-4 w-6 h-6 rounded-full blur-[4px] bg-amber-400/30 animate-elegant-spark-1" />
                        <div className="absolute -bottom-2 right-6 w-6 h-6 rounded-full blur-[4px] bg-stone-400/20 animate-elegant-spark-2" />
                      </div>

                      {/* Overlay CTA Elegante */}
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-900/40 via-amber-900/30 to-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-700/90 via-stone-600/80 to-amber-800/90 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-md shadow-xl shadow-amber-900/40 border border-amber-600/30">
                              <Play className="w-8 h-8 text-amber-100 ml-1" />
                            </div>
                            <div className="text-stone-200 text-xs font-light mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                              ASSISTIR
                            </div>
                            <div className="text-stone-300 text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                              VÍDEO COMPLETO
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="absolute bottom-6 left-6 right-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-light text-white mb-0.5">{project.title}</h3>
                        <p className="text-gray-300 text-xs font-light">{project.subtitle}</p>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Esconde scrollbar horizontal (se aparecer) + keyframes dos efeitos */}
            <style>{`
              [aria-roledescription="carrossel horizontal"]::-webkit-scrollbar { height: 0; width: 0; }

              /* ====== ELEGANT GLASS EFFECTS ====== */
              @keyframes elegantGlow {
                0%, 100% { box-shadow: inset 0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0); }
                50%      { box-shadow: inset 0 0 40px rgba(180, 83, 9, .12), 0 0 60px rgba(120, 53, 15, .08); }
              }
              .animate-elegant-glow { animation: elegantGlow 2.2s ease-in-out infinite; }

              @keyframes elegantBeam1 {
                0%, 100% { opacity: .2; transform: scaleY(1); }
                50%      { opacity: .6;  transform: scaleY(1.03); }
              }
              @keyframes elegantBeam2 {
                0%, 100% { opacity: .15; transform: scaleY(1); }
                50%      { opacity: .5;  transform: scaleY(0.97); }
              }
              .animate-elegant-beam-1 { animation: elegantBeam1 1.8s ease-in-out infinite; }
              .animate-elegant-beam-2 { animation: elegantBeam2 2.4s ease-in-out infinite; }

              @keyframes elegantScanline {
                0%   { transform: translateY(-80%); opacity: 0; }
                40%  { opacity: .3; }
                60%  { opacity: .3; }
                100% { transform: translateY(80%); opacity: 0; }
              }
              .animate-elegant-scanline { animation: elegantScanline 3s ease-in-out infinite; }

              @keyframes elegantSpark {
                0%, 100% { transform: scale(.8); opacity: .2; }
                50%      { transform: scale(1.1); opacity: .4; }
              }
              .animate-elegant-spark-1 { animation: elegantSpark 2s ease-in-out infinite; }
              .animate-elegant-spark-2 { animation: elegantSpark 2.8s ease-in-out infinite; }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
