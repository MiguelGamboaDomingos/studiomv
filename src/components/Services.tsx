import React, { useState, useEffect } from 'react';
import { Camera, Image, Scissors, Monitor } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const Services: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const animationFrame = () => {
      setTime(Date.now() * 0.001);
      requestAnimationFrame(animationFrame);
    };
    requestAnimationFrame(animationFrame);
    return () => {};
  }, []);

  const services: Service[] = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Filmmaking",
      items: [
        "Produção cinematográfica completa",
        "Direção criativa e técnica",
        "Coordenação de equipas especializadas"
      ]
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Fotografia",
      items: [
        "Sessões corporativas e eventos",
        "Fotografia de produto e lifestyle",
        "Retratos profissionais e criativos"
      ]
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Edição Criativa",
      items: [
        "Montagem cinematográfica",
        "Color grading profissional",
        "Sound design e mixagem"
      ]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Pós-produção & Motion",
      items: [
        "Efeitos visuais e compositing",
        "Motion graphics e animação",
        "Finalização em 4K e formatos especiais"
      ]
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden" id="services">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,69,19,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,69,19,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Film Grain */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
             backgroundSize: '3px 3px',
             animation: 'grain 6s steps(10) infinite'
           }} />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-amber-900/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/10 transform rotate-45 animate-bounce"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
            Nossos <span className="text-amber-900">Serviços</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções completas de audiovisual, desde a conceção até à entrega final.
          </p>
        </div>

        {/* Film Strip Container */}
        <div className="relative">
          {/* Main Film Strip */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8 rounded-lg shadow-2xl overflow-hidden">
            {/* Film Perforations Top */}
            <div className="flex justify-between mb-6">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black/80 rounded-full"></div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {services.map((service, index) => {
                const floatY = Math.sin(time * 0.5 + index * 1.5) * 3;
                const floatX = Math.cos(time * 0.3 + index * 2) * 2;
                const rotate = Math.sin(time * 0.4 + index) * 1;

                return (
                  <div
                    key={index}
                    className="group relative cursor-pointer"
                    style={{
                      transform: `translateY(${floatY}px) translateX(${floatX}px) rotate(${rotate}deg)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    {/* Film Frame */}
                    <div className="relative bg-white/5 backdrop-blur-md p-6 rounded-lg overflow-hidden border border-white/20 hover:border-amber-800/50 hover:bg-white/10 transition-all duration-500">

                      {/* Icon */}
                      <div className="text-amber-800 mb-6 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {service.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-amber-800 transition-colors duration-300 relative z-10">
                        {service.title}
                      </h3>

                      {/* Service Items */}
                      <ul className="space-y-3 relative z-10">
                        {service.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-300 text-sm leading-relaxed flex items-start">
                            <span className="w-1.5 h-1.5 bg-amber-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                           style={{
                             background: 'linear-gradient(45deg, transparent, rgba(180, 83, 9, 0.1), transparent)',
                             filter: 'blur(20px)'
                           }} />

                      {/* Border Glow */}
                      <div className="absolute inset-0 rounded-lg border border-amber-800/0 group-hover:border-amber-800/30 transition-all duration-500 pointer-events-none" />
                    </div>

                    {/* Film Frame Number */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded text-amber-800 text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Film Perforations Bottom */}
            <div className="flex justify-between mt-6">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black/80 rounded-full"></div>
              ))}
            </div>

            {/* Film Info */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-4 text-white/60 text-sm font-bold">
                <span>MV STUDIO</span>
                <span>•</span>
                <span>SERVICES</span>
                <span>•</span>
                <span>2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-8 text-lg">
            Pronto para dar vida ao seu projeto?
          </p>
          <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 hover:border-amber-800/40 hover:scale-105 transition-all duration-300 shadow-lg">
            Solicitar Orçamento
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          50% { transform: translate(-2px, 2px) }
        }
      `}</style>
    </section>
  );
};

export default Services;