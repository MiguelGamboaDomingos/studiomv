import React, { useEffect, useState, useRef } from 'react';
import { Users, Award, Clock } from 'lucide-react';

const About: React.FC = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [yearCount, setYearCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter(setProjectCount, 50, 2000);
          animateCounter(setClientCount, 30, 2000);
          animateCounter(setYearCount, 5, 2000);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOutQuad * target);
      setter(current);

      if (progress === 1) {
        clearInterval(interval);
        setter(target);
      }
    }, 16);
  };

  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden" ref={sectionRef}>
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(180, 83, 9, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180, 83, 9, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Film Grain */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-amber-900/5 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                Criamos histórias que
                <span className="text-amber-700 block">conectam marcas</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 lg:mb-8">
                No MV Studio, cada projeto é uma oportunidade de contar uma história única.
                Combinamos técnica cinematográfica com visão comercial para criar conteúdo
                que não apenas impressiona, mas converte.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-900/20 rounded-full flex items-center justify-center group-hover:bg-amber-900/30 transition-colors">
                  <Award className="w-8 h-8 text-amber-700" />
                </div>
                <div className="text-2xl font-bold text-white">{projectCount}+</div>
                <div className="text-gray-400 text-sm">Projetos</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-900/20 rounded-full flex items-center justify-center group-hover:bg-amber-900/30 transition-colors">
                  <Users className="w-8 h-8 text-amber-700" />
                </div>
                <div className="text-2xl font-bold text-white">{clientCount}+</div>
                <div className="text-gray-400 text-sm">Clientes</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-900/20 rounded-full flex items-center justify-center group-hover:bg-amber-900/30 transition-colors">
                  <Clock className="w-8 h-8 text-amber-700" />
                </div>
                <div className="text-2xl font-bold text-white">{yearCount}+</div>
                <div className="text-gray-400 text-sm">Anos</div>
              </div>
            </div>

          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-amber-900/20 to-black rounded-lg overflow-hidden relative group">
              <img 
                src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="MV Studio Team"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Film Strip Effect */}
              <div className="absolute left-0 top-0 w-6 h-full bg-black opacity-80">
                <div className="flex flex-col justify-between h-full py-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-black/90 rounded-full mx-auto" />
                  ))}
                </div>
              </div>
              <div className="absolute right-0 top-0 w-6 h-full bg-black opacity-80">
                <div className="flex flex-col justify-between h-full py-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-black/90 rounded-full mx-auto" />
                  ))}
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;