import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react';

const SocialSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", name: "YouTube" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:mvstudiointermov@gmail.com", name: "Email" },
    { icon: <Phone className="w-5 h-5" />, href: "https://wa.me/244949838924?text=Olá! Gostaria de saber mais sobre os serviços da MV Studio.", name: "WhatsApp" }
  ];

  return (
    <>
      {/* Online Button - Positioned at bottom right corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <div
          className="relative"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Main Online Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 flex items-center gap-3 text-white hover:bg-black/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </button>

          {/* Expanded Contact Options */}
          <div
            className={`absolute right-0 bottom-full mb-4 transition-all duration-500 ease-out ${
              isExpanded
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl">
              <div className="flex flex-col gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    title={social.name}
                    className="w-12 h-12 bg-white/10 hover:bg-amber-900/20 border border-white/20 hover:border-amber-900/40 rounded-full flex items-center justify-center text-white hover:text-amber-900 transition-all duration-300 group transform hover:scale-110"
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Arrow pointing to main button */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/10"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialSidebar;