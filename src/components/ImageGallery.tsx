import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useParallax';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
}

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { elementRef: sectionRef } = useScrollAnimation(0.1);
  const { visibleItems, containerRef } = useStaggeredAnimation(100);

  // Mock data - será substituído por dados do back office
  const images: GalleryImage[] = [
    {
      id: '1',
      src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Behind the scenes corporativo',
      category: 'Behind the Scenes',
      title: 'Produção Corporativa'
    },
    {
      id: '2',
      src: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Casamento cinematográfico',
      category: 'Wedding',
      title: 'Momento Especial'
    },
    {
      id: '3',
      src: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Editorial de moda',
      category: 'Fashion',
      title: 'Editorial Fashion'
    },
    {
      id: '4',
      src: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Evento corporativo',
      category: 'Events',
      title: 'Cobertura de Evento'
    },
    {
      id: '5',
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Produção de marca',
      category: 'Brand',
      title: 'Identidade Visual'
    },
    {
      id: '6',
      src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Documentário',
      category: 'Documentary',
      title: 'Narrativa Documental'
    },
    {
      id: '7',
      src: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Retrato profissional',
      category: 'Portrait',
      title: 'Retrato Executivo'
    },
    {
      id: '8',
      src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Produção musical',
      category: 'Music',
      title: 'Videoclipe'
    },
    {
      id: '9',
      src: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Evento social',
      category: 'Social',
      title: 'Festa Corporativa'
    },
    {
      id: '10',
      src: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Arquitetura',
      category: 'Architecture',
      title: 'Espaços Comerciais'
    },
    {
      id: '11',
      src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Lifestyle',
      category: 'Lifestyle',
      title: 'Dia a Dia'
    },
    {
      id: '12',
      src: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Produto',
      category: 'Product',
      title: 'Fotografia de Produto'
    }
  ];

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative py-20 lg:py-32 bg-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Grid - maior como no design */}
          <div
            ref={containerRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`group relative aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-700 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms` 
                }}
                onClick={() => openLightbox(image)}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <ZoomIn className="w-8 h-8 text-white mb-2 mx-auto" />
                    <span className="text-amber-400 text-sm font-medium uppercase tracking-wide block">
                      {image.category}
                    </span>
                    <span className="text-white font-semibold">
                      {image.title}
                    </span>
                  </div>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-0 border-2 border-amber-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10"
              aria-label="Fechar galeria"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6 rounded-b-lg">
              <span className="text-amber-400 text-sm font-medium uppercase tracking-wide block mb-1">
                {selectedImage.category}
              </span>
              <h3 className="text-white font-semibold text-xl">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
