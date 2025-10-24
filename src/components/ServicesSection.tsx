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

        {/* Services Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Service Card Elegante */}
              <div className="relative bg-gradient-to-br from-amber-950/20 via-stone-900/30 to-amber-900/10 backdrop-blur-xl rounded-3xl p-8 border border-amber-800/20 hover:border-amber-600/40 transition-all duration-700 ease-out overflow-hidden min-h-[360px] group-hover:shadow-2xl group-hover:shadow-amber-500/20 group-hover:scale-[1.03] group-hover:bg-gradient-to-br group-hover:from-amber-950/30 group-hover:via-stone-800/40 group-hover:to-amber-900/20">

                {/* Ícone Elegante Acastanhado */}
                <div className="relative mb-8">
                  <div className={`w-18 h-18 rounded-3xl bg-gradient-to-br from-amber-800/30 via-stone-700/20 to-amber-900/40 flex items-center justify-center transition-all duration-700 ${hoveredService === service.id ? 'scale-115 rotate-3 shadow-xl shadow-amber-700/30' : 'shadow-lg shadow-stone-900/20'}`}>
                    <div className={`transition-all duration-700 ${hoveredService === service.id ? 'scale-125 text-amber-300' : 'text-amber-600/80'}`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Efeito de Brilho Sutil */}
                  {hoveredService === service.id && (
                    <div className="absolute inset-0 w-18 h-18 rounded-3xl bg-gradient-to-br from-amber-600/20 to-stone-600/10 animate-pulse"></div>
                  )}
                </div>

                {/* Efeito de Vidro Elegante */}
                <div className={`absolute inset-0 bg-gradient-to-br from-amber-800/8 via-stone-700/5 to-amber-900/12 transition-opacity duration-700 ${
                  hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Padrão Sutil de Textura */}
                {hoveredService === service.id && (
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(180, 83, 9, 0.1) 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, rgba(120, 53, 15, 0.1) 1px, transparent 1px),
                        linear-gradient(45deg, rgba(160, 82, 45, 0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px, 20px 20px, 15px 15px',
                      backgroundPosition: '0 0, 10px 10px, 5px 5px'
                    }} />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Title */}
                  <h3 className={`text-2xl font-light mb-5 transition-all duration-700 ease-out ${
                    hoveredService === service.id
                      ? 'text-amber-200 transform translate-y-0'
                      : 'text-stone-200 transform translate-y-0'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm font-light leading-relaxed mb-7 transition-all duration-700 ease-out ${
                    hoveredService === service.id
                      ? 'text-stone-300'
                      : 'text-stone-400'
                  }`}>
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className={`flex items-center text-xs transition-all duration-700 delay-${idx * 150} ${
                        hoveredService === service.id
                          ? 'text-stone-300 opacity-100 transform translate-x-0'
                          : 'text-stone-500 opacity-80 transform translate-x-1'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-4 transition-colors duration-700 ${
                          hoveredService === service.id ? 'bg-amber-400' : 'bg-amber-700'
                        }`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button Elegante */}
                  <button
                    className={`relative flex items-center px-5 py-3 rounded-2xl border transition-all duration-700 ease-out delay-200 group/btn overflow-hidden ${
                      hoveredService === service.id
                        ? 'text-amber-200 border-amber-600/40 transform -translate-y-1 shadow-lg shadow-amber-900/20'
                        : 'text-amber-300 border-amber-800/30 transform translate-y-0'
                    } ${
                      hoveredButton === service.id
                        ? 'w-48 bg-gradient-to-r from-amber-900/20 to-stone-800/20 border-amber-500/50'
                        : 'w-40 bg-gradient-to-r from-amber-950/10 to-stone-900/10'
                    }`}
                    onClick={() => navigate('/catalogo')}
                    onMouseEnter={() => setHoveredButton(service.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <span className={`font-light text-sm tracking-wider transition-all duration-500 ${
                      hoveredButton === service.id ? 'transform -translate-y-0.5 text-amber-100' : 'transform translate-y-0'
                    }`}>
                      SABER MAIS
                    </span>

                    {/* Seta elegante */}
                    <div className={`flex items-center justify-center transition-all duration-700 ease-out ${
                      hoveredButton === service.id ? 'ml-4 opacity-100' : 'ml-3 opacity-80'
                    }`}>
                      <ArrowRight className={`w-4 h-4 transition-all duration-700 ease-out ${
                        hoveredButton === service.id
                          ? 'transform translate-x-2 text-amber-200'
                          : 'transform translate-x-0 text-amber-400'
                      }`} />
                    </div>

                    {/* Efeito de brilho sutil */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-amber-800/0 via-amber-700/15 to-stone-700/0 transition-opacity duration-700 ease-out ${
                      hoveredButton === service.id ? 'opacity-100' : 'opacity-0'
                    }`}></div>

                    {/* Efeito de vidro elegante */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      hoveredButton === service.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent animate-pulse"></div>
                        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-stone-400 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Linhas de Elegância */}
                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/60 to-transparent transform origin-left transition-transform duration-1000 ease-out ${
                  hoveredService === service.id ? 'scale-x-100' : 'scale-x-0'
                }`} />
                <div className={`absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-stone-500/40 to-transparent transform origin-right transition-transform duration-1000 ease-out delay-200 ${
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
