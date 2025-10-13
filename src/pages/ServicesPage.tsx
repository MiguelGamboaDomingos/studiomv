import React from 'react';
import { Camera, Video, Edit, Palette, Play, Star, Clock, Users, Film, Clapperboard, Mic, Lightbulb } from 'lucide-react';

interface CatalogItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  duration?: string;
  rating?: number;
  views?: string;
  tags: string[];
  featured?: boolean;
  icon?: React.ReactNode;
  price?: string;
}

const ServicesPage: React.FC = () => {
  const catalogItems: CatalogItem[] = [
    {
      id: 1,
      title: "Pré-Produção",
      category: "Desenvolvimento",
      description: "Planejamento detalhado do projeto audiovisual, incluindo roteiro, storyboard e cronograma de produção. Desenvolvemos a base criativa crucial onde lançamos as bases para um projeto bem-sucedido.",
      image: "/api/placeholder/400/250",
      duration: "2-4 semanas",
      rating: 5,
      views: "1.2k",
      tags: ["Roteiro", "Storyboard", "Planejamento"],
      featured: true,
      icon: <Lightbulb className="w-6 h-6" />,
      price: "A partir de €800"
    },
    {
      id: 2,
      title: "Filmagem Principal",
      category: "Produção",
      description: "Captura profissional com equipamentos 4K, iluminação cinematográfica e direção especializada. Nossa equipe experiente garante que cada frame conte sua história.",
      image: "/api/placeholder/400/250",
      duration: "1-3 dias",
      rating: 5,
      views: "2.1k",
      tags: ["4K", "Cinematografia", "Direção"],
      featured: true,
      icon: <Camera className="w-6 h-6" />,
      price: "A partir de €1.500"
    },
    {
      id: 3,
      title: "Pós-Produção",
      category: "Finalização",
      description: "Edição profissional, color grading, sound design e efeitos visuais para resultado cinematográfico. Transformamos material bruto em obras de arte visuais.",
      image: "/api/placeholder/400/250",
      duration: "1-2 semanas",
      rating: 5,
      views: "1.8k",
      tags: ["Edição", "Color Grading", "VFX"],
      icon: <Edit className="w-6 h-6" />,
      price: "A partir de €1.200"
    },
    {
      id: 4,
      title: "Motion Graphics",
      category: "Animação",
      description: "Criação de animações, títulos e elementos gráficos para enriquecer a narrativa visual. Damos vida às suas ideias com movimento e impacto visual.",
      image: "/api/placeholder/400/250",
      duration: "3-5 dias",
      rating: 4.8,
      views: "950",
      tags: ["Animação", "Gráficos", "Títulos"],
      icon: <Palette className="w-6 h-6" />,
      price: "A partir de €900"
    },
    {
      id: 5,
      title: "Fotografia Corporativa",
      category: "Fotografia",
      description: "Sessões fotográficas profissionais para empresas, produtos e eventos corporativos. Capturamos a essência da sua marca com estética cinematográfica.",
      image: "/api/placeholder/400/250",
      duration: "1 dia",
      rating: 4.9,
      views: "1.5k",
      tags: ["Corporativo", "Produtos", "Eventos"],
      icon: <Camera className="w-6 h-6" />,
      price: "A partir de €600"
    },
    {
      id: 6,
      title: "Documentários",
      category: "Produção",
      description: "Produção completa de documentários, desde a pesquisa até a entrega final. Contamos histórias reais com profundidade e impacto emocional.",
      image: "/api/placeholder/400/250",
      duration: "4-8 semanas",
      rating: 5,
      views: "800",
      tags: ["Documentário", "Narrativa", "Pesquisa"],
      icon: <Film className="w-6 h-6" />,
      price: "A partir de €2.500"
    },
    {
      id: 7,
      title: "Videoclipes Musicais",
      category: "Produção",
      description: "Criação de videoclipes com conceito artístico único, direção criativa e produção cinematográfica de alta qualidade.",
      image: "/api/placeholder/400/250",
      duration: "1-2 semanas",
      rating: 4.9,
      views: "1.3k",
      tags: ["Música", "Criativo", "Artístico"],
      icon: <Mic className="w-6 h-6" />,
      price: "A partir de €1.800"
    },
    {
      id: 8,
      title: "Publicidade & Comerciais",
      category: "Produção",
      description: "Produção de conteúdo publicitário impactante para marcas, com foco em storytelling e conversão.",
      image: "/api/placeholder/400/250",
      duration: "2-3 semanas",
      rating: 5,
      views: "2.5k",
      tags: ["Publicidade", "Branding", "Comercial"],
      featured: true,
      icon: <Clapperboard className="w-6 h-6" />,
      price: "A partir de €2.000"
    }
  ];

  const categories = ["Todos", "Desenvolvimento", "Produção", "Finalização", "Animação", "Fotografia"];
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const filteredItems = selectedCategory === "Todos"
    ? catalogItems
    : catalogItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,97,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,97,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Film Grain */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0"
           style={{
             backgroundImage: `radial-gradient(circle, transparent 1px, rgba(201,169,97,0.1) 1px)`,
             backgroundSize: '3px 3px',
             animation: 'grain 8s steps(10) infinite'
           }} />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="text-amber-600">Catálogo</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore nossos serviços de produção audiovisual e descubra como podemos transformar suas ideias em realidade.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-600 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-black/80 backdrop-blur-md border border-amber-600/20 rounded-2xl overflow-hidden hover:bg-black/90 hover:border-amber-600/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Destaque
                </div>
              )}

              {/* Video/Image Container */}
              <div className="relative h-40 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
                {/* Dark video-like background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/80 to-black/90"></div>

                {/* Animated icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Icon with animation */}
                    <div className="text-amber-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {item.icon}
                    </div>

                    {/* Pulsing ring effect */}
                    <div className="absolute inset-0 border-2 border-amber-600/30 rounded-full animate-ping group-hover:border-amber-600/60"></div>
                    <div className="absolute inset-0 border border-amber-600/20 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Play button overlay */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-amber-600/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-black ml-0.5" />
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category & Price */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-amber-600 text-xs font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.price && (
                    <span className="text-amber-600 text-xs font-bold">
                      {item.price}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-600 transition-colors duration-300 line-clamp-1">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-xs mb-3 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {item.views}
                  </div>
                </div>

                {/* Rating */}
                {item.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(item.rating!)
                            ? 'text-amber-600 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">{item.rating}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 bg-amber-600/20 text-amber-600 text-xs rounded-full border border-amber-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full px-3 py-2 bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-600/40 text-amber-600 font-medium text-sm rounded-lg hover:from-amber-600 hover:to-amber-500 hover:text-black hover:border-amber-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-600/30">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para começar o seu projeto?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Entre em contacto connosco e transformemos a sua visão em realidade.
          </p>
          <button className="group relative px-10 py-4 bg-amber-600/20 border border-amber-600/30 text-amber-600 font-bold rounded-full hover:bg-amber-600 hover:text-black hover:scale-105 transition-all duration-500 overflow-hidden">
            <span className="relative z-10">Vamos Criar Juntos</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          50% { transform: translate(-1px, 1px) }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Hover effects for cards */
        .group:hover .animate-ping {
          animation-duration: 1s;
        }

        .group:hover .animate-pulse {
          animation-duration: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;