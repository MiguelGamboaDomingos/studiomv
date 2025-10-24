import React, { useState } from 'react';
import { Play, Filter, Calendar, User } from 'lucide-react';
import { ParallaxElement } from '../components/HomeParallax';
import DramaticTransitions from '../components/DramaticTransitions';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  client: string;
  thumbnail: string;
  duration: string;
  description: string;
}

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: "Corporate Vision 2024",
      category: "corporate",
      year: "2024",
      client: "Tech Solutions Ltd",
      thumbnail: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "2:30",
      description: "Vídeo corporativo que apresenta a visão futurista da empresa"
    },
    {
      id: 2,
      title: "Wedding Dreams",
      category: "wedding",
      year: "2024",
      client: "Maria & João",
      thumbnail: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "8:45",
      description: "Documentário cinematográfico de casamento"
    },
    {
      id: 3,
      title: "Fashion Forward",
      category: "fashion",
      year: "2023",
      client: "Style Magazine",
      thumbnail: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "1:20",
      description: "Editorial de moda com estética contemporânea"
    },
    {
      id: 4,
      title: "Event Highlights",
      category: "event",
      year: "2024",
      client: "Innovation Summit",
      thumbnail: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "3:15",
      description: "Cobertura completa de evento corporativo"
    },
    {
      id: 5,
      title: "Brand Identity",
      category: "brand",
      year: "2023",
      client: "StartUp Co",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "1:45",
      description: "Vídeo de apresentação da identidade da marca"
    },
    {
      id: 6,
      title: "Documentary Series",
      category: "documentary",
      year: "2024",
      client: "Cultural Foundation",
      thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "12:30",
      description: "Série documental sobre património cultural"
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os Projetos' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'wedding', name: 'Casamentos' },
    { id: 'fashion', name: 'Moda' },
    { id: 'event', name: 'Eventos' },
    { id: 'brand', name: 'Branding' },
    { id: 'documentary', name: 'Documentário' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      {/* Background Moderno */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Padrão Geométrico Sutil */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header Moderno */}
        <div className="text-center mb-20">
          <DramaticTransitions type="fadeIn" delay={200} duration={800}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 mb-8">
              <div className="w-8 h-8 rounded-lg bg-amber-500/30"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extralight text-white mb-6 leading-tight tracking-tight">
              Nosso <span className="text-amber-400 font-light">Portfólio</span>
            </h1>
          </DramaticTransitions>
          <DramaticTransitions type="slideUp" delay={400} duration={800}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Projetos que definem nossa excelência criativa
            </p>
          </DramaticTransitions>
        </div>

        {/* Filters Modernos */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-3 rounded-2xl border transition-all duration-500 backdrop-blur-sm ${
                selectedCategory === category.id
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/20'
                  : 'bg-gray-800/30 border-gray-700/30 text-gray-400 hover:bg-gray-700/40 hover:border-amber-500/30 hover:text-amber-400'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid Moderno */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative cursor-pointer"
            >
              {/* Card Moderno */}
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-700/30 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10">
                {/* Imagem do Projeto */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 flex items-center justify-center">
                      <Play className="w-6 h-6 text-amber-400 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="mx-6 relative">
                  <div className="aspect-video bg-black rounded overflow-hidden relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Glitch Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-black animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 20%)', animationDuration: '0.1s' }}></div>
                      <div className="absolute inset-0 bg-white animate-pulse" style={{ clipPath: 'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)', animationDelay: '0.05s', animationDuration: '0.1s' }}></div>
                      <div className="absolute inset-0 bg-black animate-pulse" style={{ clipPath: 'polygon(0 80%, 100% 80%, 100% 100%, 0 100%)', animationDelay: '0.1s', animationDuration: '0.1s' }}></div>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-12 h-12 text-white" />
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                      {project.duration}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-300 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {project.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-10 py-4 bg-gradient-to-r from-amber-900 to-amber-800 text-white font-bold rounded-full hover:from-amber-800 hover:to-amber-700 transition-all duration-300 transform hover:scale-105">
            Quero um Projeto Como Este
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          50% { transform: translate(-1px, 1px) }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;