import React from 'react';
import { useScrollAnimation } from '../hooks/useParallax';
import ImmersiveTransitions from './ImmersiveTransitions';
import { ParallaxElement } from './HomeParallax';
import DramaticTransitions, { SectionTransition } from './DramaticTransitions';
import { usePublicSettings } from '../hooks/usePublicData';

const AboutSection: React.FC = () => {
  const { settings } = usePublicSettings();
  const { elementRef: sectionRef } = useScrollAnimation(0.1);

  // Títulos da seção (do Firebase ou padrão)
  const aboutTitle = settings?.sectionTitles?.about || 'Sobre Nós';
  const aboutDescription = settings?.sectionDescriptions?.about || 'Conheça nossa paixão pela arte cinematográfica';

  // Dados da empresa (do Firebase ou padrão)
  const companyTitle = settings?.companyInfo?.aboutTitle || 'MV Studio';
  const companyDescription = settings?.companyInfo?.aboutDescription || 'Estúdio de produção audiovisual especializado em conteúdo cinematográfico de alta qualidade';
  const yearsOfExperience = settings?.companyInfo?.yearsOfExperience || 8;
  const foundedYear = settings?.companyInfo?.foundedYear || 2016;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-black overflow-hidden"
    >
      {/* Background Pattern com Parallax */}
      <ParallaxElement
        speed={0.3}
        className="absolute inset-0 opacity-5"
      >
        <div
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(201,169,97,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            width: '100%',
            height: '100%',
          }}
        />
      </ParallaxElement>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centralizado */}
        <div className="text-center mb-16">
          <ImmersiveTransitions direction="up" delay={300} duration={1000}>
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
                {aboutTitle}
              </h2>
              <p className="text-lg text-stone-400 max-w-3xl mx-auto">
                {aboutDescription}
              </p>
            </div>
          </ImmersiveTransitions>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">

            <ImmersiveTransitions direction="up" delay={600} duration={1000}>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  {companyDescription}
                </p>

                <p>
                  {settings?.companyInfo?.missionStatement || 'Desde vídeos corporativos que elevam marcas a documentários de casamento que capturam momentos únicos, nossa equipa dedica-se a criar conteúdo que ressoa com audiências e deixa uma impressão duradoura.'}
                </p>

                <p>
                  {settings?.companyInfo?.visionStatement || `Com ${yearsOfExperience} anos de experiência em produção audiovisual, desenvolvemos uma metodologia que combina planeamento estratégico, execução técnica impecável e uma visão artística que distingue cada projeto.`}
                </p>
              </div>
            </ImmersiveTransitions>
          </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-stone-400 mb-2">150+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-stone-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-stone-400 mb-2">{yearsOfExperience}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Anos</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-full relative overflow-hidden">
              {/* Animated Elements */}
              <div className="absolute inset-0 border border-amber-400/30 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 border border-amber-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-8 border border-amber-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-light text-white mb-4">MV</div>
                  <div className="text-amber-400 text-xl tracking-widest">STUDIO</div>
                </div>
              </div>

              {/* Floating Dots */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full animate-ping"
                  style={{
                    top: `${20 + Math.sin(i * Math.PI / 4) * 30}%`,
                    left: `${50 + Math.cos(i * Math.PI / 4) * 30}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
