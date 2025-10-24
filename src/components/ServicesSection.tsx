import React, { useState, useEffect } from 'react';
import { Camera, Scissors, Monitor, Lightbulb, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ParallaxElement } from './HomeParallax';
import DramaticTransitions from './DramaticTransitions';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  hoverImage: string;
}

const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const navigate = useNavigate();

  const services: Service[] = [
    {
      id: 1,
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Pré-Produção",
      description: "Na MV Studio, a pré-produção é o momento onde planeamos cada passo, refinamos conceitos e organizamos todos os detalhes necessários para dar vida ao seu projecto criativo.",
      features: [
        "Desenvolvimento de conceito criativo",
        "Planeamento de cronogramas",
        "Scouting de localizações",
        "Casting e seleção de talentos"
      ],
      hoverImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    },
    {
      id: 2,
      icon: <Camera className="w-8 h-8" />,
      title: "Produção",
      description: "Na MV Studio, a produção é a fase dinâmica de cada projecto criativo, onde os planos da pré-produção ganham vida com as câmeras a rodar e a visão criativa a tomar-se realidade.",
      features: [
        "Filmagem com equipamento 4K",
        "Direção criativa e técnica",
        "Coordenação de equipas especializadas",
        "Captação de áudio profissional"
      ],
      hoverImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    },
    {
      id: 3,
      icon: <Scissors className="w-8 h-8" />,
      title: "Pós-Produção",
      description: "A pós-produção é onde a magia acontece. Transformamos o material bruto em narrativas envolventes através de edição criativa, color grading e sound design profissional.",
      features: [
        "Montagem cinematográfica",
        "Color grading profissional",
        "Sound design e mixagem",
        "Efeitos visuais e motion graphics"
      ],
      hoverImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    },
    {
      id: 4,
      icon: <Monitor className="w-8 h-8" />,
      title: "Finalização",
      description: "A etapa final onde garantimos que o seu projeto está pronto para qualquer plataforma, com a mais alta qualidade técnica e criativa para impressionar o seu público.",
      features: [
        "Masterização em múltiplos formatos",
        "Otimização para diferentes plataformas",
        "Controlo de qualidade rigoroso",
        "Entrega em formatos especiais"
      ],
      hoverImage: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,69,19,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,69,19,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Film Grain Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
             backgroundSize: '3px 3px',
             animation: 'grain 8s steps(10) infinite'
           }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
            Do conceito até à conclusão,<br />
            estamos aqui para te apoiar<br />
            em cada etapa
          </h2>
        </div>

        {/* Services List */}
        <div className="space-y-8 max-w-5xl">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Service Card com Efeitos Eletrizantes */}
              <div className="relative bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800/50 hover:border-amber-600/70 hover:bg-gray-900/50 transition-all duration-700 ease-out overflow-visible min-h-[200px] group-hover:shadow-2xl group-hover:shadow-amber-600/20">

                {/* Efeito Elétrico - Linhas Animadas */}
                {hoveredService === service.id && (
                  <>
                    {/* Linhas Elétricas Verticais */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={`electric-v-${i}`}
                          className="absolute top-0 h-full bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60 animate-pulse"
                          style={{
                            left: `${20 + i * 20}%`,
                            width: '1px',
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '1.5s'
                          }}
                        />
                      ))}
                    </div>

                    {/* Linhas Elétricas Horizontais */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`electric-h-${i}`}
                          className="absolute left-0 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-40 animate-pulse"
                          style={{
                            top: `${25 + i * 25}%`,
                            height: '1px',
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>

                    {/* Pontos de Energia */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={`energy-point-${i}`}
                          className="absolute bg-amber-400 rounded-full animate-ping"
                          style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 20}%`,
                            width: '3px',
                            height: '3px',
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>

                    {/* Borda Elétrica */}
                    <div className="absolute inset-0 rounded-xl border-2 border-amber-500/50 animate-pulse pointer-events-none"
                         style={{ animationDuration: '1s' }} />
                  </>
                )}

                {/* Hover Image - Sobrepondo completamente o card */}
                <div className={`absolute top-0 right-0 w-72 h-48 rounded-xl overflow-hidden transition-all duration-500 ease-out z-40 shadow-2xl ${
                  hoveredService === service.id
                    ? 'opacity-100 transform translate-x-8 -translate-y-4 scale-100'
                    : 'opacity-0 transform translate-x-20 -translate-y-12 scale-85'
                }`}>
                  <img
                    src={service.hoverImage}
                    alt={`${service.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-800/40"></div>



                  {/* Enhanced glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-800/40 to-amber-600/40 rounded-xl blur-lg -z-10 animate-pulse"></div>
                </div>

                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-amber-800/5 transition-opacity duration-700 ease-out ${
                  hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Content */}
                <div className="relative z-10 max-w-2xl">
                  {/* Title */}
                  <h3 className={`text-3xl font-light mb-4 transition-all duration-500 ease-out ${
                    hoveredService === service.id
                      ? 'text-amber-800 transform -translate-y-1'
                      : 'text-white transform translate-y-0'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-base font-light leading-relaxed mb-6 transition-all duration-500 ease-out delay-100 ${
                    hoveredService === service.id
                      ? 'text-gray-200 transform -translate-y-1'
                      : 'text-gray-300 transform translate-y-0'
                  }`}>
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    className={`relative flex items-center px-4 py-2 rounded-full border transition-all duration-500 ease-out delay-200 group/btn overflow-hidden ${
                      hoveredService === service.id
                        ? 'text-amber-700 border-amber-700/30 transform -translate-y-1'
                        : 'text-amber-800 border-amber-800/30 transform translate-y-0'
                    } ${
                      hoveredButton === service.id
                        ? 'w-44 bg-amber-800/10 border-amber-600'
                        : 'w-36 bg-transparent'
                    }`}
                    onClick={() => navigate('/catalogo')}
                    onMouseEnter={() => setHoveredButton(service.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <span className={`font-light text-sm tracking-wide transition-all duration-300 ${
                      hoveredButton === service.id ? 'transform -translate-y-0.5' : 'transform translate-y-0'
                    }`}>
                      SABER MAIS
                    </span>

                    {/* Seta animada */}
                    <div className={`flex items-center justify-center transition-all duration-500 ease-out ${
                      hoveredButton === service.id ? 'ml-3 opacity-100' : 'ml-2 opacity-70'
                    }`}>
                      <ArrowRight className={`w-4 h-4 transition-all duration-500 ease-out ${
                        hoveredButton === service.id
                          ? 'transform translate-x-2 text-amber-600'
                          : 'transform translate-x-0 text-amber-800'
                      }`} />
                    </div>

                    {/* Efeito de brilho no fundo */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/10 to-amber-600/0 transition-opacity duration-500 ease-out ${
                      hoveredButton === service.id ? 'opacity-100' : 'opacity-0'
                    }`}></div>

                    {/* Efeito de raios elétricos sutis */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                      hoveredButton === service.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Hover Effect Lines */}
                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent transform origin-left transition-transform duration-700 ease-out ${
                  hoveredService === service.id ? 'scale-x-100' : 'scale-x-0'
                }`} />
                <div className={`absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent transform origin-right transition-transform duration-700 ease-out delay-100 ${
                  hoveredService === service.id ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-8 leading-tight">
            Somos profissionais de vídeo em várias indústrias!
          </h3>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          50% { transform: translate(-1px, 1px) }
        }

        @keyframes electric-spark {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes electric-flow {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          50% {
            opacity: 1;
            transform: translateX(0%);
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }

        @keyframes electric-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(245, 158, 11, 0.3), 0 0 10px rgba(245, 158, 11, 0.2);
          }
          50% {
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.6), 0 0 25px rgba(245, 158, 11, 0.4), 0 0 35px rgba(245, 158, 11, 0.2);
          }
        }

        .animate-electric-spark {
          animation: electric-spark 1.5s ease-in-out infinite;
        }

        .animate-electric-flow {
          animation: electric-flow 2s ease-in-out infinite;
        }

        .animate-electric-glow {
          animation: electric-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
