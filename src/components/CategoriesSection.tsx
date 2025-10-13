import React, { useState } from 'react';

interface Category {
  id: number;
  title: string;
  image: string;
  description: string;
}

const CategoriesSection: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const categories: Category[] = [
    {
      id: 1,
      title: "Produção de Casamentos",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
      description: "Momentos únicos capturados com elegância"
    },
    {
      id: 2,
      title: "Documentários",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
      description: "Histórias reais contadas com profundidade"
    },
    {
      id: 3,
      title: "Shorts e Reels",
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop",
      description: "Conteúdo dinâmico para redes sociais"
    },
    {
      id: 4,
      title: "Vídeo Clipes",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      description: "Produção musical com criatividade"
    },
    {
      id: 5,
      title: "Vídeos Corporativos",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      description: "Comunicação empresarial profissional"
    },
    {
      id: 6,
      title: "Eventos e Transmissões em Directo",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
      description: "Cobertura completa de eventos ao vivo"
    },
    {
      id: 7,
      title: "Animação (Efeitos Visuais)",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      description: "Efeitos visuais e motion graphics"
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,69,19,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,69,19,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight" style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 300
          }}>
            Somos profissionais de vídeo em várias indústrias!
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative cursor-pointer transition-all duration-500 ease-out ${
                index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              } ${
                index === 6 ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`relative overflow-hidden rounded-xl transition-all duration-500 ease-out ${
                index === 2 || index === 6 ? 'h-64' : 'h-48'
              } ${
                hoveredCategory === category.id ? 'scale-105' : 'scale-100'
              }`}>
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.title}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    hoveredCategory === category.id 
                      ? 'scale-110 brightness-110' 
                      : 'scale-100 brightness-75'
                  }`}
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
                  hoveredCategory === category.id ? 'opacity-90' : 'opacity-70'
                }`} />

                {/* Electric border effect */}
                {hoveredCategory === category.id && (
                  <div className="absolute inset-0 rounded-xl">
                    <div className="absolute inset-0 border-2 border-amber-400 rounded-xl animate-pulse"></div>
                    <div className="absolute -inset-1 border border-amber-600/50 rounded-xl animate-electric-glow"></div>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className={`text-xl md:text-2xl font-light text-white mb-2 transition-all duration-500 ease-out ${
                    hoveredCategory === category.id 
                      ? 'transform -translate-y-1 text-amber-300' 
                      : 'transform translate-y-0'
                  }`} style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 300
                  }}>
                    {category.title}
                  </h3>
                  
                  <p className={`text-sm text-gray-300 transition-all duration-500 ease-out delay-100 ${
                    hoveredCategory === category.id 
                      ? 'opacity-100 transform -translate-y-1' 
                      : 'opacity-80 transform translate-y-0'
                  }`}>
                    {category.description}
                  </p>

                  {/* Hover indicator */}
                  <div className={`mt-4 flex items-center text-amber-400 transition-all duration-500 ease-out delay-200 ${
                    hoveredCategory === category.id 
                      ? 'opacity-100 transform translate-x-2' 
                      : 'opacity-0 transform translate-x-0'
                  }`}>
                    <span className="text-xs font-light tracking-wide">VER PROJETOS</span>
                    <div className="w-4 h-4 ml-2 border border-amber-400 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                {hoveredCategory === category.id && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-800/20 to-amber-600/20 rounded-xl blur-lg -z-10"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-full text-white font-light tracking-wide transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25">
            <span className="relative z-10 flex items-center">
              Veja Todas as Categorias
              <div className="w-6 h-6 ml-3 border border-white/50 rounded-full flex items-center justify-center group-hover:border-white transition-colors duration-300">
                <div className="w-2 h-2 bg-white rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              </div>
            </span>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes electric-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(251, 191, 36, 0.3), 0 0 10px rgba(251, 191, 36, 0.2);
          }
          50% { 
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 191, 36, 0.4);
          }
        }
        
        .animate-electric-glow {
          animation: electric-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;
