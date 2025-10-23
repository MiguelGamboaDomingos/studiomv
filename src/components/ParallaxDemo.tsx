import React from 'react';
import {
  ParallaxSection,
  ParallaxElement,
  ParallaxBackground,
  ParallaxContent,
  ParallaxForeground,
  ParallaxHorizontal,
  ParallaxFloating,
  ParallaxList,
} from './ParallaxElement';

// Componente de demonstração do sistema de parallax
const ParallaxDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Seção 1: Parallax Section com Grid Background */}
      <ParallaxSection
        backgroundPattern="grid"
        backgroundSpeed={0.2}
        contentSpeed={0.4}
        className="min-h-screen flex items-center justify-center"
        patternColor="rgba(201,169,97,0.1)"
        patternSize={80}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8">Sistema Parallax</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Sistema unificado e reutilizável de efeitos parallax para todas as páginas do site.
          </p>
        </div>
      </ParallaxSection>

      {/* Seção 2: Diferentes Velocidades de Parallax */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <ParallaxBackground speed={0.1}>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(201,169,97,0.2) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </ParallaxBackground>

        <div className="container mx-auto px-6 relative z-10">
          {/* Título com parallax médio */}
          <ParallaxContent speed={0.3}>
            <h2 className="text-4xl font-bold text-center mb-16">Diferentes Velocidades</h2>
          </ParallaxContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card com parallax lento */}
            <ParallaxElement preset="subtle" className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-amber-600">Parallax Sutil</h3>
              <p className="text-gray-300">
                Movimento muito suave, ideal para textos e elementos delicados.
              </p>
            </ParallaxElement>

            {/* Card com parallax médio */}
            <ParallaxContent className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-amber-600">Parallax Médio</h3>
              <p className="text-gray-300">
                Velocidade equilibrada, perfeita para conteúdo principal.
              </p>
            </ParallaxContent>

            {/* Card com parallax rápido */}
            <ParallaxForeground className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-amber-600">Parallax Rápido</h3>
              <p className="text-gray-300">
                Movimento mais pronunciado para elementos em destaque.
              </p>
            </ParallaxForeground>
          </div>
        </div>
      </section>

      {/* Seção 3: Parallax Horizontal */}
      <section className="relative py-32 bg-black overflow-hidden">
        <ParallaxContent>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Parallax Horizontal</h2>
            
            <div className="flex items-center justify-center space-x-8">
              {/* Elementos que se movem horizontalmente */}
              <ParallaxHorizontal speed={0.3} className="w-32 h-32 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">←</span>
              </ParallaxHorizontal>
              
              <ParallaxContent className="text-center">
                <h3 className="text-2xl font-bold">Movimento Lateral</h3>
                <p className="text-gray-300">Elementos se movem horizontalmente</p>
              </ParallaxContent>
              
              <ParallaxHorizontal speed={-0.3} className="w-32 h-32 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">→</span>
              </ParallaxHorizontal>
            </div>
          </div>
        </ParallaxContent>
      </section>

      {/* Seção 4: Parallax Flutuante */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <ParallaxContent>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Parallax Flutuante</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Elementos flutuantes */}
              {[1, 2, 3, 4].map((item) => (
                <ParallaxFloating
                  key={item}
                  speed={0.2 + (item * 0.1)}
                  className="aspect-square bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-black">{item}</span>
                </ParallaxFloating>
              ))}
            </div>
          </div>
        </ParallaxContent>
      </section>

      {/* Seção 5: Lista com Parallax Escalonado */}
      <section className="relative py-32 bg-black overflow-hidden">
        <ParallaxSection
          backgroundPattern="lines"
          backgroundSpeed={0.1}
          contentSpeed={0.3}
          patternSize={50}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Lista Escalonada</h2>
            
            <ParallaxList
              staggerDelay={0.1}
              preset="content"
              className="space-y-8"
              itemClassName="bg-gray-800 p-6 rounded-lg"
            >
              {[
                'Primeiro item com parallax base',
                'Segundo item com velocidade ligeiramente maior',
                'Terceiro item com velocidade ainda maior',
                'Quarto item com a maior velocidade',
                'Quinto item criando efeito cascata',
              ].map((text, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-black font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg">{text}</p>
                </div>
              ))}
            </ParallaxList>
          </div>
        </ParallaxSection>
      </section>

      {/* Seção 6: Configurações Customizadas */}
      <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <ParallaxContent>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Configurações Customizadas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Parallax com easing customizado */}
              <ParallaxElement
                speed={0.6}
                easing="ease-in-out"
                offset={50}
                className="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold mb-4">Easing Customizado</h3>
                <p className="text-gray-300">
                  Este elemento usa easing ease-in-out com offset personalizado.
                </p>
              </ParallaxElement>

              {/* Parallax com threshold customizado */}
              <ParallaxElement
                speed={0.4}
                threshold={300}
                className="bg-gradient-to-r from-green-900 to-teal-900 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold mb-4">Threshold Customizado</h3>
                <p className="text-gray-300">
                  Este elemento tem um threshold maior para ativação.
                </p>
              </ParallaxElement>
            </div>
          </div>
        </ParallaxContent>
      </section>

      {/* Seção Final */}
      <ParallaxSection
        backgroundPattern="dots"
        backgroundSpeed={0.2}
        contentSpeed={0.5}
        className="py-32"
        patternSize={40}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Sistema Completo</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sistema de parallax modular, performático e reutilizável, 
            pronto para ser usado em qualquer página do site com configurações flexíveis.
          </p>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default ParallaxDemo;
