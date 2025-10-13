import React, { useState, useEffect } from 'react';
import { Play, Eye } from 'lucide-react';
import { useInterval, useAdaptivePerformance } from '../hooks/usePerformance';
import LazyImage from './LazyImage';

interface VideoSuggestion {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
}

const VideoSuggestions: React.FC = () => {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { shouldReduceAnimations } = useAdaptivePerformance();

  const videos: VideoSuggestion[] = [
    {
      id: 1,
      title: "Corporate Dynamics",
      thumbnail: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "1:45",
      category: "Corporate"
    },
    {
      id: 2,
      title: "Wedding Dreams",
      thumbnail: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "3:20",
      category: "Wedding"
    },
    {
      id: 3,
      title: "Fashion Forward",
      thumbnail: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "2:10",
      category: "Fashion"
    },
    {
      id: 4,
      title: "Event Highlights",
      thumbnail: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "2:55",
      category: "Event"
    },
    {
      id: 5,
      title: "Brand Story",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "1:30",
      category: "Brand"
    }
  ];

  // Use optimized interval hook with performance awareness - pause on hover
  useInterval(() => {
    if (!isHovered) {
      setCurrentOffset(prev => {
        const maxOffset = (videos.length - 1) * 320; // 320px per video
        const newOffset = prev + 1;
        return newOffset > maxOffset ? 0 : newOffset;
      });
    }
  }, shouldReduceAnimations ? null : 30); // Slower, smoother animation

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0 animate-grid-move" style={{
          backgroundImage: `
            linear-gradient(rgba(92,51,23,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(92,51,23,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '35px 35px'
        }} />
      </div>

      {/* Film Grain */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
             backgroundSize: '3px 3px',
             animation: 'grain 7s steps(10) infinite'
           }} />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-1 bg-amber-900 transform -rotate-12"></div>
        <div className="absolute bottom-32 right-20 w-48 h-1 bg-white transform rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
            Nossos <span className="text-amber-900">Projetos</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore uma seleção dos nossos trabalhos mais recentes em diferentes categorias.
          </p>
        </div>

        {/* Film Strip Container */}
        <div className="relative">
          {/* Film Strip Background */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-4 sm:p-6 rounded-lg shadow-2xl overflow-hidden">
            {/* Film Perforations Top */}
            <div className="flex justify-between mb-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black/80 rounded-full"></div>
              ))}
            </div>

            {/* Video Frames */}
            <div
              className="flex gap-6 pb-4 transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentOffset}px)`,
                width: `${videos.length * 320}px`
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 relative group cursor-pointer"
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {/* Frame Border */}
                  <div className="bg-black p-2 rounded relative overflow-hidden">
                    
                    {/* Glitch Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <div className="absolute inset-0 bg-black animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0 25%)', animationDuration: '0.1s' }}></div>
                      <div className="absolute inset-0 bg-white animate-pulse" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 75%, 0 75%)', animationDelay: '0.05s', animationDuration: '0.1s' }}></div>
                      <div className="absolute inset-0 bg-black animate-pulse" style={{ clipPath: 'polygon(0 85%, 100% 85%, 100% 100%, 0 100%)', animationDelay: '0.1s', animationDuration: '0.1s' }}></div>
                    </div>

                    <div className="w-80 h-48 relative overflow-hidden rounded">
                      <LazyImage
                        src={video.thumbnail}
                        alt={`Miniatura do vídeo ${video.title} - Categoria: ${video.category}, Duração: ${video.duration}`}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          hoveredVideo === video.id ? 'scale-110 brightness-110' : 'scale-100'
                        }`}
                        sizes="320px"
                        quality={80}
                      />
                      
                      {/* Glitch Effect on Video Thumbnail */}
                      <div className={`absolute inset-0 bg-black/40 transition-all duration-300 ${
                        hoveredVideo === video.id ? 'bg-black/20' : ''
                      } flex items-center justify-center`}>
                        
                        {/* Play Button */}
                        <div className={`transition-all duration-300 ${
                          hoveredVideo === video.id ? 'scale-100 opacity-100' : 'scale-75 opacity-70'
                        }`}>
                          <button className="w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </button>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                          {video.duration}
                        </div>

                        {/* Views Count */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 rounded text-white text-xs">
                          <Eye className="w-3 h-3" />
                          <span className="font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      {hoveredVideo === video.id && (
                        <div className="absolute inset-0 border-2 border-amber-900/50 rounded animate-pulse pointer-events-none"></div>
                      )}
                    </div>
                    
                    {/* Video Info */}
                    <div className="mt-2 text-white text-center">
                      <h3 className="font-bold text-sm">{video.title}</h3>
                      <p className="text-xs text-gray-300 mt-1">{video.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Film Perforations Bottom */}
            <div className="flex justify-between mt-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black/80 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 lg:mt-12">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 font-medium text-sm sm:text-base">
            Ver Todo o Portfólio
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          50% { transform: translate(-1px, 1px) }
        }
      `}</style>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default VideoSuggestions;