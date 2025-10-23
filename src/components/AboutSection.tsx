import React from 'react';
import { useParallax, useScrollAnimation } from '../hooks/useParallax';
import { ParallaxSection, ParallaxContent } from './ParallaxElement';
import ImmersiveTransitions from './ImmersiveTransitions';

const AboutSection: React.FC = () => {
  // Manter compatibilidade com sistema antigo como fallback
  const { elementRef: sectionRef } = useScrollAnimation(0.1);
  const { transform: parallaxTransform } = useParallax(0.3);

  // Usar novo sistema de parallax
  const useNewParallax = true; // Feature flag para migração gradual

  if (useNewParallax) {
    return (
      <ParallaxSection
        backgroundPattern="dots"
        backgroundSpeed={0.3}
        contentSpeed={0.5}
        className="py-20 lg:py-32 bg-black"
        patternColor="rgba(201,169,97,0.2)"
        patternSize={80}
        patternOpacity={0.05}
      >
        <ParallaxContent className="container mx-auto px-6">
          <ImmersiveTransitions>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Conteúdo da seção About */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                      Sobre o <span className="text-amber-600">MV Studio</span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Somos uma produtora audiovisual especializada em criar conteúdo
                      cinematográfico de alta qualidade que conta histórias únicas e memoráveis.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Experiência</h3>
                        <p className="text-gray-300">
                          Anos de experiência em produção audiovisual, desde conceito até entrega final.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Qualidade</h3>
                        <p className="text-gray-300">
                          Equipamentos profissionais e técnicas avançadas para resultados excepcionais.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Criatividade</h3>
                        <p className="text-gray-300">
                          Abordagem criativa e inovadora para cada projeto único.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-900 transition-all duration-300 transform hover:scale-105"
                    >
                      Fale Connosco
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Imagem/Visual */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-amber-900/20 to-amber-600/20 rounded-2xl p-8 backdrop-blur-sm border border-amber-800/30">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-amber-600 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">MV Studio</h3>
                        <p className="text-gray-300">Produção Audiovisual</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ImmersiveTransitions>
        </ParallaxContent>
      </ParallaxSection>
    );
  }

  // Sistema antigo como fallback
  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Parallax */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          transform: parallaxTransform,
          backgroundImage: `
            radial-gradient(circle, rgba(201,169,97,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <ImmersiveTransitions direction="up" delay={300} duration={1000}>
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
                  Criamos narrativas que
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    {" "}conectam
                  </span>
                </h2>
              </div>
            </ImmersiveTransitions>

            <ImmersiveTransitions direction="up" delay={600} duration={1000}>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  No MV Studio, acreditamos que cada projeto é uma oportunidade única de contar uma história.
                  Combinamos técnica cinematográfica avançada com uma abordagem criativa personalizada para
                  transformar ideias em experiências visuais memoráveis.
                </p>

                <p>
                  Desde vídeos corporativos que elevam marcas a documentários de casamento que capturam
                  momentos únicos, nossa equipa dedica-se a criar conteúdo que ressoa com audiências e
                  deixa uma impressão duradoura.
                </p>
              </div>
            </ImmersiveTransitions>

              <p>
                Com anos de experiência em produção audiovisual, desenvolvemos uma metodologia que 
                combina planeamento estratégico, execução técnica impecável e uma visão artística 
                que distingue cada projeto.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">150+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">5</div>
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
