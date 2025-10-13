import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useParallax, useScrollAnimation } from '../hooks/useParallax';
import ImmersiveTransitions from './ImmersiveTransitions';

const ShowreelSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Iniciar mutado para permitir autoplay
  const [volume, setVolume] = useState(0.5); // Volume médio por padrão
  const [isInView, setIsInView] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { elementRef: sectionRef } = useScrollAnimation(0.1);
  const { transform: parallaxTransform } = useParallax(0.4);
  const { transform: videoParallaxTransform } = useParallax(0.8); // Parallax mais rápido para o vídeo

  // Intersection Observer para detectar quando o vídeo está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        if (videoRef.current) {
          if (entry.isIntersecting) {
            // Vídeo entrou na viewport - reproduzir automaticamente mutado
            videoRef.current.volume = volume;
            videoRef.current.muted = true; // Sempre iniciar mutado para permitir autoplay
            videoRef.current.play().catch((error) => {
              console.log('Erro ao reproduzir vídeo:', error);
            });
            setIsPlaying(true);
          } else {
            // Vídeo saiu da viewport - pausar
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.3 } // 30% do vídeo deve estar visível para começar
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [volume]);

  // Configurar volume inicial e quando mudanças ocorrem
  useEffect(() => {
    if (videoRef.current) {
      // Aplicar configurações com um pequeno delay para garantir que sejam aplicadas
      const applySettings = () => {
        if (videoRef.current) {
          videoRef.current.volume = volume;
          videoRef.current.muted = isMuted;
          console.log('Volume configurado:', volume, 'Mutado:', isMuted);

          // Verificar se as configurações foram aplicadas corretamente
          setTimeout(() => {
            if (videoRef.current) {
              console.log('Verificação - Volume atual:', videoRef.current.volume, 'Mutado atual:', videoRef.current.muted);
            }
          }, 100);
        }
      };

      applySettings();
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      setHasUserInteracted(true);

      // Aplicar mudanças imediatamente no elemento de vídeo
      videoRef.current.muted = newMutedState;

      // Se estiver desmutando, garantir que o volume esteja configurado
      if (!newMutedState) {
        videoRef.current.volume = volume;
      }

      console.log('Som toggled:', newMutedState ? 'Mutado' : 'Ativo', 'Volume:', volume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setHasUserInteracted(true);

    if (videoRef.current) {
      // Aplicar volume imediatamente
      videoRef.current.volume = newVolume;

      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else {
        // Se o volume for maior que 0, desmutar sem forçar pausa/play
        setIsMuted(false);
        videoRef.current.muted = false;
      }

      console.log('Volume alterado para:', newVolume, 'Mutado:', newVolume === 0);
    }
  };

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-black overflow-hidden"
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
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* SHOWREEL Title */}
        <div className="relative py-32 lg:py-48 w-full flex items-center justify-center">
          <ImmersiveTransitions direction="up" delay={300} duration={1200}>
            <h2
              className="text-[6rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black text-white tracking-tighter leading-none cursor-pointer transition-all duration-500"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 900,
                lineHeight: 0.7,
                letterSpacing: '-0.05em',
                transform: isHovering ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span>
                SHOWREEL
              </span>

              {/* Efeito de raios elétricos */}
              {isHovering && (
                <>
                  <div className="absolute inset-0 animate-electric-1 opacity-60">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                    <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>

                  <div className="absolute inset-0 animate-electric-2 opacity-40">
                    <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="absolute left-0 bottom-1/3 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  </div>
                </>
              )}
            </h2>
          </ImmersiveTransitions>
        </div>

        {/* Video Container */}
        <div
          className="relative flex justify-center w-full mx-auto py-16 px-8 lg:px-16"
          style={{ transform: videoParallaxTransform }}
        >
          <div className="relative w-full max-w-6xl aspect-video bg-transparent overflow-hidden rounded-3xl group transition-all duration-700">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-3xl"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onLoadedData={() => {
                // Configurar volume e mute quando o vídeo carregar
                if (videoRef.current) {
                  videoRef.current.volume = volume;
                  videoRef.current.muted = isMuted;
                  console.log('Vídeo carregado - Volume:', volume, 'Mutado:', isMuted);
                }
              }}
              onVolumeChange={() => {
                // Log quando o volume do vídeo mudar
                if (videoRef.current) {
                  console.log('Volume do vídeo mudou para:', videoRef.current.volume, 'Mutado:', videoRef.current.muted);
                }
              }}
              loop
              playsInline
              muted={isMuted}
              preload="metadata"
            >
              <source src="/video/showreel/showreel.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>

            {/* Controles de vídeo */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 ml-0" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>
            </div>

            {/* Indicador de som mutado - clicável */}
            {isMuted && !hasUserInteracted && (
              <button
                onClick={handleMuteToggle}
                className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm animate-pulse hover:bg-black/80 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <VolumeX className="w-4 h-4" />
                <span>Clique para ativar o som</span>
              </button>
            )}

            {/* Controles de volume */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Botão Mute/Unmute */}
              <button
                onClick={handleMuteToggle}
                className="text-white hover:text-amber-600 transition-colors duration-300"
                aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              {/* Slider de volume */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
                }}
              />
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Estilos CSS para efeitos glitch e elétricos */}
      <style>{`
        @keyframes glitch-text {
          0% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(-2px, -2px); }
          30% { transform: translate(2px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          70% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, -2px); }
          90% { transform: translate(2px, 2px); }
          100% { transform: translate(0); }
        }

        @keyframes electric-1 {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          25% { opacity: 1; transform: scaleY(1.1); }
          50% { opacity: 0.3; transform: scaleY(0.9); }
          75% { opacity: 0.8; transform: scaleY(1.05); }
        }

        @keyframes electric-2 {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          20% { opacity: 0.8; transform: scaleX(1.1); }
          40% { opacity: 0.2; transform: scaleX(0.9); }
          60% { opacity: 0.9; transform: scaleX(1.05); }
          80% { opacity: 0.3; transform: scaleX(0.95); }
        }

        .animate-glitch-text {
          animation: glitch-text 0.3s infinite;
        }

        .animate-electric-1 {
          animation: electric-1 0.8s ease-in-out infinite;
        }

        .animate-electric-2 {
          animation: electric-2 1.2s ease-in-out infinite;
        }

        /* Estilo personalizado para o slider de volume */
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }
      `}</style>
    </section>
  );
};

export default ShowreelSection;
