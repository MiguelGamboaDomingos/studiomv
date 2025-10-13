import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setLogoVisible(true), 300);
    const timer2 = setTimeout(() => setTextVisible(true), 800);
    const timer3 = setTimeout(() => setFadeOut(true), 2500);
    const timer4 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,97,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,97,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className={`flex items-center justify-center mb-8 transition-all duration-1000 ease-out ${
          logoVisible
            ? 'opacity-100 transform translate-y-0 scale-100'
            : 'opacity-0 transform translate-y-8 scale-90'
        }`}>
          <div className="relative">
            {/* MV Studio Logo - Maior e mais livre */}
            <div className="w-32 h-32 flex items-center justify-center">
              <img
                src="/img/logo/MV_logo Branco.png"
                alt="MV Studio"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Glow effect sutil */}
            <div className="absolute inset-0 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Company Description */}
        <div className={`transition-all duration-1000 ease-out delay-300 ${
          textVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-4'
        }`}>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent mx-auto mb-6"></div>

          <p className="text-amber-800/90 text-xl font-light tracking-wider">
            Produção Audiovisual
          </p>
        </div>

        {/* Loading Animation */}
        <div className={`mt-12 transition-all duration-500 ease-out ${
          textVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-amber-800 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SplashScreen;
