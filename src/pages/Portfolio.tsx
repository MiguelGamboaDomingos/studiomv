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
    <div className="min-h-screen bg-black pt-20">
      {/* Background igual à home */}
      <div className="absolute inset-0 z-0 bg-black"></div>

      {/* Grid Vertical igual à Hero - castanho escuro */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-amber-900/40 to-transparent"
            style={{
              left: `${(i + 1) * 8.33}%`,
            }}
          />
        ))}
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

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-light text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 text-sm font-medium">{project.category}</span>
                    <span className="text-gray-500 text-xs">{project.year}</span>
                  </div>

                  {/* Duration */}
                  <div className="mt-3 text-gray-500 text-xs">
                    Duração: {project.duration}
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