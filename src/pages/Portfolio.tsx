import React, { useState } from 'react';
import { Play, Filter, Calendar, User } from 'lucide-react';

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
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,69,19,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,69,19,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Film Grain */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0"
           style={{
             backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
             backgroundSize: '3px 3px',
             animation: 'grain 8s steps(10) infinite'
           }} />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Nosso <span className="text-amber-900">Portfólio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Uma coleção dos nossos trabalhos mais impactantes, onde cada projeto conta uma história única.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-900 border-amber-900 text-white'
                  : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-amber-900/40'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative cursor-pointer"
            >
              {/* Film Frame */}
              <div className="relative bg-gradient-to-r from-amber-900 to-amber-800 p-3 rounded-lg shadow-2xl">
                {/* Film Perforations */}
                <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between py-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-black rounded-sm mx-auto"></div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-between py-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-black rounded-sm mx-auto"></div>
                  ))}
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