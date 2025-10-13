import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  title,
  description,
  duration,
  category,
  autoPlay = false,
  showControls = true,
  className = "",
  onPlay,
  onPause,
  onEnded
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowThumbnail(false);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowThumbnail(true);
      setCurrentTime(0);
      onEnded?.();
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      setShowThumbnail(true);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [onPlay, onPause, onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {
        setHasError(true);
        setShowThumbnail(true);
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * videoDuration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        togglePlay();
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        toggleMute();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, currentTime - 10);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(videoDuration, currentTime + 10);
        }
        break;
    }
  };

  return (
    <div 
      className={`relative bg-black rounded overflow-hidden group ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label={`Video player: ${title}`}
    >
      {/* Video Element */}
      {videoUrl && !hasError && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          preload="metadata"
          poster={thumbnailUrl}
          aria-label={`${title} - ${description}`}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
          <track kind="captions" src="" srcLang="pt" label="Português" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      )}

      {/* Thumbnail Overlay */}
      {(showThumbnail || hasError || !videoUrl) && (
        <div className="absolute inset-0">
          <img
            src={thumbnailUrl}
            alt={`Miniatura do vídeo: ${title} - ${description}. Categoria: ${category}, Duração: ${duration}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-lg font-medium mb-2">Erro ao carregar vídeo</p>
            <p className="text-sm text-gray-300">A mostrar imagem de pré-visualização</p>
          </div>
        </div>
      )}

      {/* Play Button Overlay */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" aria-hidden="true" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Video Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Progress Bar */}
          {videoDuration > 0 && (
            <div 
              ref={progressRef}
              className="w-full h-2 bg-white/20 rounded-full mb-3 cursor-pointer"
              onClick={handleProgressClick}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={videoDuration}
              aria-valuenow={currentTime}
              aria-label="Progresso do vídeo"
            >
              <div 
                className="h-full bg-white rounded-full transition-all duration-150"
                style={{ width: `${(currentTime / videoDuration) * 100}%` }}
              />
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4 text-white" aria-hidden="true" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" aria-hidden="true" />
                )}
              </button>

              {videoDuration > 0 && (
                <span className="text-white text-sm ml-2">
                  {formatTime(currentTime)} / {formatTime(videoDuration)}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.requestFullscreen?.();
                }
              }}
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Ecrã completo"
            >
              <Maximize2 className="w-4 h-4 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Duration Badge */}
      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
        {duration}
      </div>
    </div>
  );
};

export default VideoPlayer;
