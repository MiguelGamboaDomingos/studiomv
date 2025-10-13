import React from 'react';

const BrandsCarousel: React.FC = () => {
  // Logos de marcas/clientes (usando placeholders por agora)
  const brands = [
    { id: 1, name: 'Netflix', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png' },
    { id: 2, name: 'Apple', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png' },
    { id: 3, name: 'Google', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Google-Logo.png' },
    { id: 4, name: 'Microsoft', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Microsoft-Logo.png' },
    { id: 5, name: 'Amazon', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png' },
    { id: 6, name: 'Meta', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Facebook-Logo.png' },
    { id: 7, name: 'Tesla', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Tesla-Logo.png' },
    { id: 8, name: 'Nike', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png' },
    { id: 9, name: 'Coca-Cola', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Coca-Cola-Logo.png' },
    { id: 10, name: 'Samsung', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png' },
  ];

  // Duplicar os logos para criar efeito infinito
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="relative py-16 lg:py-24 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,69,19,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,69,19,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Grid Vertical Animada - igual à Hero */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-amber-900/30 to-transparent"
            style={{
              left: `${(i + 1) * 5}%`,
              animation: `verticalGrid ${3 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
            Clientes & Parceiros
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Orgulhamo-nos de trabalhar com marcas que confiam na nossa visão criativa
          </p>
        </div>

        {/* Carrossel de duas linhas */}
        <div className="space-y-8">
          {/* Primeira linha - movimento para a esquerda */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left">
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`left-${brand.id}-${index}`}
                  className="flex-shrink-0 w-48 h-24 mx-6 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-amber-800/50 transition-all duration-300 group"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-32 max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    onError={(e) => {
                      // Fallback para texto se a imagem não carregar
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.brand-text')) {
                        const textDiv = document.createElement('div');
                        textDiv.className = 'brand-text text-white font-light text-lg';
                        textDiv.textContent = brand.name;
                        parent.appendChild(textDiv);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Segunda linha - movimento para a direita */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right">
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`right-${brand.id}-${index}`}
                  className="flex-shrink-0 w-48 h-24 mx-6 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-amber-800/50 transition-all duration-300 group"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-32 max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    onError={(e) => {
                      // Fallback para texto se a imagem não carregar
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.brand-text')) {
                        const textDiv = document.createElement('div');
                        textDiv.className = 'brand-text text-white font-light text-lg';
                        textDiv.textContent = brand.name;
                        parent.appendChild(textDiv);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradientes nas bordas para efeito fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes verticalGrid {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        /* Pausar animação no hover */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandsCarousel;
