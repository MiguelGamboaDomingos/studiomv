import React, { useEffect, useState } from 'react';
import { Camera, Home, ArrowLeft, Film } from 'lucide-react';
import ImmersiveTransitions from '../components/ImmersiveTransitions';

const NotFound: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    window.location.hash = '';
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Film grain effect */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
          backgroundSize: '4px 4px',
          animation: 'grain 8s steps(10) infinite'
        }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,97,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,97,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80"></div>
        
        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-600/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* 404 Number */}
        <ImmersiveTransitions direction="scale" delay={200} duration={1000}>
          <div className="mb-8">
            <h1 
              className={`text-[12rem] sm:text-[16rem] md:text-[20rem] font-light text-transparent bg-clip-text bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 leading-none tracking-tighter ${
                glitchActive ? 'animate-pulse' : ''
              }`}
              style={{
                fontFamily: 'Poppins, sans-serif',
                textShadow: glitchActive 
                  ? '0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)'
                  : '0 0 40px rgba(245, 158, 11, 0.1)',
                filter: glitchActive ? 'hue-rotate(30deg)' : 'none',
              }}
            >
              404
            </h1>
          </div>
        </ImmersiveTransitions>

        {/* Film strip decoration */}
        <ImmersiveTransitions direction="left" delay={600} duration={800}>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-3 h-8 bg-amber-800/20 border border-amber-800/40 rounded-sm"></div>
              ))}
            </div>
          </div>
        </ImmersiveTransitions>

        {/* Message */}
        <ImmersiveTransitions direction="up" delay={800} duration={1000}>
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
              Página não encontrada
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-800"></div>
              <Film className="w-6 h-6 text-amber-800" />
              <div className="w-12 h-px bg-amber-800"></div>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A página que procura não existe ou foi movida. 
              Mas não se preocupe, ainda temos muito conteúdo incrível para mostrar.
            </p>
          </div>
        </ImmersiveTransitions>

        {/* Action Buttons */}
        <ImmersiveTransitions direction="up" delay={1200} duration={800}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGoHome}
              className="group flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Voltar ao Início</span>
            </button>
            
            <button
              onClick={handleGoBack}
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Página Anterior</span>
            </button>
          </div>
        </ImmersiveTransitions>

        {/* Brand */}
        <ImmersiveTransitions direction="fade" delay={1600} duration={600}>
          <div className="mt-16 flex items-center justify-center gap-3 text-amber-800/60">
            <Camera className="w-5 h-5" />
            <span className="text-sm tracking-wider font-light">MV STUDIO</span>
          </div>
        </ImmersiveTransitions>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -10%) }
          30% { transform: translate(3%, -15%) }
          50% { transform: translate(12%, 9%) }
          70% { transform: translate(9%, 4%) }
          90% { transform: translate(-1%, 7%) }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default NotFound;
