import React, { useEffect, useState } from 'react';
import { Film } from 'lucide-react';

const Loading: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Film grain effect */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
          backgroundSize: '4px 4px',
          animation: 'grain 8s steps(10) infinite'
        }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,97,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,97,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo Animation */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            {/* Main logo */}
            <div className="relative">
              <Film className="w-32 h-32 text-amber-800 animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 bg-amber-800/10 blur-3xl animate-pulse"></div>
            </div>

            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-amber-600 rounded-full transform -translate-x-1/2 -translate-y-4"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-amber-600 rounded-full transform -translate-x-1/2 translate-y-4"></div>
              <div className="absolute left-0 top-1/2 w-2 h-2 bg-amber-600 rounded-full transform -translate-x-4 -translate-y-1/2"></div>
              <div className="absolute right-0 top-1/2 w-2 h-2 bg-amber-600 rounded-full transform translate-x-4 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="mb-10">
          <h1 className="text-5xl font-light text-white mb-3 tracking-wider">MV STUDIO</h1>
          <div className="flex items-center justify-center gap-3 text-amber-800">
            <div className="w-8 h-px bg-amber-800"></div>
            <p className="text-sm tracking-[0.3em] font-light uppercase">Carregando</p>
            <div className="w-8 h-px bg-amber-800"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-1 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
            <div
              className="h-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 transition-all duration-500 ease-out relative rounded-full"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="mt-3 text-amber-700 text-sm font-light tracking-wider">
            {progress}%
          </div>
        </div>

        {/* Cinematic Elements */}
        <div className="flex justify-center gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-amber-800/60 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -10%) }
          30% { transform: translate(3%, -15%) }
          50% { transform: translate(12%, 9%) }
          70% { transform: translate(9%, 4%) }
          90% { transform: translate(-1%, 7%) }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Loading;
