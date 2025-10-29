import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';

interface VideoRendererProps {
  url: string;
  title?: string;
  thumbnail?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: () => void;
}

// Função para detectar o tipo de vídeo
const getVideoType = (url: string) => {
  if (!url) return 'unknown';
  
  // YouTube
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    return 'youtube';
  }
  
  // Vimeo
  if (url.includes('vimeo.com/')) {
    return 'vimeo';
  }
  
  // Google Drive
  if (url.includes('drive.google.com/')) {
    return 'drive';
  }
  
  // Dropbox
  if (url.includes('dropbox.com/')) {
    return 'dropbox';
  }
  
  // OneDrive
  if (url.includes('onedrive.live.com/')) {
    return 'onedrive';
  }
  
  // Vídeo direto (MP4, WebM, etc.)
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv'];
  if (videoExtensions.some(ext => url.toLowerCase().includes(ext))) {
    return 'direct';
  }
  
  return 'unknown';
};

// Função para converter URL do YouTube para embed
const getYouTubeEmbedUrl = (url: string) => {
  let videoId = '';
  
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v') || '';
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=1` : '';
};

// Função para converter URL do Vimeo para embed
const getVimeoEmbedUrl = (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  const videoId = match ? match[1] : '';
  return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=0&muted=1` : '';
};

// Função para converter Google Drive para visualização direta
const getDriveDirectUrl = (url: string) => {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const fileId = match ? match[1] : '';
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
};

const VideoRenderer: React.FC<VideoRendererProps> = ({
  url,
  title = 'Vídeo',
  thumbnail,
  className = '',
  autoPlay = false,
  muted = true,
  controls = true,
  loop = false,
  onPlay,
  onPause,
  onError
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(!!thumbnail);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoType = getVideoType(url);

  useEffect(() => {
    if (hasError) {
      onError?.();
    }
  }, [hasError, onError]);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowThumbnail(false);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause?.();
  };

  const handleError = () => {
    setHasError(true);
    setShowThumbnail(true);
    onError?.();
  };

  const handleThumbnailClick = () => {
    if (videoType === 'direct' && videoRef.current) {
      videoRef.current.play().catch(handleError);
    } else {
      setShowThumbnail(false);
    }
  };

  // Renderizar vídeo direto (MP4, WebM, etc.)
  if (videoType === 'direct') {
    return (
      <div className={`relative bg-black rounded overflow-hidden ${className}`}>
        {showThumbnail && thumbnail && (
          <div 
            className="absolute inset-0 z-10 cursor-pointer group"
            onClick={handleThumbnailClick}
          >
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-black ml-1" />
              </div>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls={controls}
          muted={muted}
          loop={loop}
          playsInline
          preload="metadata"
          onPlay={handlePlay}
          onPause={handlePause}
          onError={handleError}
        >
          <source src={url} type="video/mp4" />
          <source src={url.replace('.mp4', '.webm')} type="video/webm" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
    );
  }

  // Renderizar YouTube
  if (videoType === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(url);
    
    if (!embedUrl) {
      return (
        <div className={`relative bg-gray-900 rounded overflow-hidden flex items-center justify-center ${className}`}>
          <div className="text-center text-white p-8">
            <ExternalLink className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-sm">Erro ao carregar vídeo do YouTube</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 text-xs mt-2 inline-block"
            >
              Abrir no YouTube
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className={`relative bg-black rounded overflow-hidden ${className}`}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={handleError}
        />
      </div>
    );
  }

  // Renderizar Vimeo
  if (videoType === 'vimeo') {
    const embedUrl = getVimeoEmbedUrl(url);
    
    if (!embedUrl) {
      return (
        <div className={`relative bg-gray-900 rounded overflow-hidden flex items-center justify-center ${className}`}>
          <div className="text-center text-white p-8">
            <ExternalLink className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <p className="text-sm">Erro ao carregar vídeo do Vimeo</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-xs mt-2 inline-block"
            >
              Abrir no Vimeo
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className={`relative bg-black rounded overflow-hidden ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onError={handleError}
        />
      </div>
    );
  }

  // Renderizar Google Drive
  if (videoType === 'drive') {
    const embedUrl = getDriveDirectUrl(url);
    
    if (!embedUrl) {
      return (
        <div className={`relative bg-gray-900 rounded overflow-hidden flex items-center justify-center ${className}`}>
          <div className="text-center text-white p-8">
            <ExternalLink className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-sm">Erro ao carregar vídeo do Google Drive</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-xs mt-2 inline-block"
            >
              Abrir no Google Drive
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className={`relative bg-black rounded overflow-hidden ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          onError={handleError}
        />
      </div>
    );
  }

  // Fallback para outros tipos ou erro
  return (
    <div className={`relative bg-gray-900 rounded overflow-hidden flex items-center justify-center ${className}`}>
      <div className="text-center text-white p-8">
        <ExternalLink className="w-12 h-12 mx-auto mb-4 text-stone-400" />
        <p className="text-sm mb-2">Tipo de vídeo não suportado</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-xs"
        >
          Abrir link externo
        </a>
      </div>
    </div>
  );
};

export default VideoRenderer;
