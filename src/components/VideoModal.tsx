import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import VideoRenderer from './VideoRenderer';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  description
}) => {
  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl mx-4 bg-stone-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {description && (
              <p className="text-stone-400 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Container */}
        <div className="aspect-video bg-black">
          <VideoRenderer
            url={videoUrl}
            title={title}
            className="w-full h-full"
            autoPlay={true}
            muted={false}
            controls={true}
            showPlayButton={false}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
