import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useParallax';

interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
}

const ProjectsGrid: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { elementRef: sectionRef } = useScrollAnimation(0.1);
  const { visibleItems, containerRef } = useStaggeredAnimation(150);

  // Mock data - será substituído por dados do back office
  const projects: Project[] = [
    {
      id: '1',
      title: 'Corporate Vision',
      category: 'Corporativo',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Vídeo corporativo inovador'
    },
    {
      id: '2',
      title: 'Wedding Dreams',
      category: 'Casamento',
      thumbnail: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Documentário de casamento cinematográfico'
    },
    {
      id: '3',
      title: 'Fashion Story',
      category: 'Moda',
      thumbnail: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Editorial de moda contemporâneo'
    },
    {
      id: '4',
      title: 'Event Capture',
      category: 'Evento',
      thumbnail: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Cobertura completa de evento'
    },
    {
      id: '5',
      title: 'Brand Identity',
      category: 'Marca',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Identidade visual em movimento'
    },
    {
      id: '6',
      title: 'Documentary',
      category: 'Documentário',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Narrativa documental envolvente'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 lg:py-16 bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Projects Grid - thumbnails menores */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative aspect-square bg-gray-900 rounded-md overflow-hidden cursor-pointer transform transition-all duration-700 ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms` 
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay simples */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.videoUrl ? (
                    <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-black ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 border border-amber-400 rounded-md transition-opacity duration-300 ${
                hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
