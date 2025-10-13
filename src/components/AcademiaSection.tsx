import React from 'react';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { useParallax, useScrollAnimation } from '../hooks/useParallax';

const AcademiaSection: React.FC = () => {
  const { elementRef: sectionRef } = useScrollAnimation(0.1);
  const { transform: parallaxTransform } = useParallax(0.2);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      {/* Background Parallax */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          transform: parallaxTransform,
          backgroundImage: `
            linear-gradient(rgba(201,169,97,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,97,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white mb-8 leading-tight tracking-tight">
                ACADEMIA
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8"></div>
            </div>

            {/* Description */}
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Não nos limitamos a vídeos, somos seus companheiros criativos. 
                Na MV Studio Academia, partilhamos conhecimento e técnicas que 
                elevam a produção audiovisual a um novo patamar.
              </p>
              
              <p>
                Desde workshops práticos a masterclasses com profissionais da indústria, 
                oferecemos formação completa para quem quer dominar a arte da narrativa visual.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Workshops</h3>
                <p className="text-gray-400 text-sm">Formação prática intensiva</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Mentoria</h3>
                <p className="text-gray-400 text-sm">Acompanhamento personalizado</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Certificação</h3>
                <p className="text-gray-400 text-sm">Reconhecimento profissional</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-full font-semibold text-lg tracking-wide overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/50">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                {/* Button Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <span>Saber Mais</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-600/10 to-amber-800/10 rounded-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(201,169,97,0.3) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(201,169,97,0.2) 0%, transparent 50%)
                  `
                }} />
              </div>

              {/* Floating Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Central Logo */}
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                    MV
                  </div>

                  {/* Orbiting Elements */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-amber-400 rounded-full animate-pulse"
                      style={{
                        top: `${50 + Math.sin(i * Math.PI / 3) * 40}%`,
                        left: `${50 + Math.cos(i * Math.PI / 3) * 40}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border border-amber-400/30 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademiaSection;
