import React from 'react';
import { Camera, Mail, Phone, MapPin } from 'lucide-react';
import ImmersiveTransitions from './ImmersiveTransitions';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    "Empresa": [
      { name: "Sobre Nós", href: "/sobre" },
      { name: "Portfólio", href: "/portfolio" },
      { name: "Serviços", href: "/catalogo" },
      { name: "Contacto", href: "/contacto" }
    ],
    "Serviços": [
      { name: "Pré-Produção", href: "/catalogo" },
      { name: "Produção", href: "/catalogo" },
      { name: "Pós-Produção", href: "/catalogo" },
      { name: "Motion Graphics", href: "/catalogo" }
    ],
    "Contacto": [
      { name: "hello@mvstudio.pt", href: "mailto:hello@mvstudio.pt", icon: <Mail className="w-4 h-4" /> },
      { name: "+351 123 456 789", href: "tel:+351123456789", icon: <Phone className="w-4 h-4" /> },
      { name: "Porto, Portugal", href: "#", icon: <MapPin className="w-4 h-4" /> }
    ]
  };

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,69,19,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,69,19,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Film Grain */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
             backgroundSize: '4px 4px',
             animation: 'grain 8s steps(10) infinite'
           }} />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <ImmersiveTransitions direction="up" delay={200} duration={800}>
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Camera className="w-8 h-8 text-amber-900" />
                <span className="text-2xl font-bold text-white tracking-wider">MV Studio</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Transformamos ideias em experiências visuais impactantes,
                criando histórias que inspiram e conectam pessoas através do audiovisual.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-amber-900 rounded-full animate-pulse"></span>
                <span>Disponível para projetos</span>
              </div>
            </div>
          </ImmersiveTransitions>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                    >
                      {link.icon && (
                        <span className="text-amber-900 group-hover:scale-110 transition-transform duration-300">
                          {link.icon}
                        </span>
                      )}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} MV Studio. Todos os direitos reservados.</p>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a href="/privacidade" className="text-gray-400 hover:text-white transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-gray-400 hover:text-white transition-colors duration-300">
                Termos de Serviço
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-900 to-transparent opacity-30"></div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-2%, -5%) }
          50% { transform: translate(2%, 3%) }
        }
      `}</style>
    </footer>
  );
};

export default Footer;