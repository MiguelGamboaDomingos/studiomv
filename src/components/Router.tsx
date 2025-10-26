import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import main layout components
import Cursor from './Cursor';
import Navbar from './Navbar';
import SocialSidebar from './SocialSidebar';
import Hero from './Hero';
import ProjectCarousel from './ProjectCarousel';
import ServicesSection from './ServicesSection';
import CategoriesSection from './CategoriesSection';
import BrandsCarousel from './BrandsCarousel';
import NewFooter from './NewFooter';
import Loading from './Loading';
import SplashScreen from './SplashScreen';

// Import lazy-loaded components
import {
  LazyShowreel,
  LazyAbout,
  LazyContact,
  LazyPortfolio,
  LazyServicesPage,
  LazyAboutPage,
  LazyContactPage,
} from './LazyComponent';

// Import admin page
import AdminPage from '../pages/AdminPage';

// Import SEO component
import SEO, { usePageSEO } from './SEO';

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-white/20 border-t-amber-800 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/60 text-sm">Carregando página...</p>
    </div>
  </div>
);

// Layout wrapper component
const Layout: React.FC<{ children: React.ReactNode; isAdmin?: boolean }> = ({ children, isAdmin = false }) => {
  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Cursor />
      <Navbar />
      <SocialSidebar />

      {/* Apply custom cursor only to main content areas */}
      <div className="custom-cursor-area">
        <main>{children}</main>
      </div>

      <NewFooter />
    </div>
  );
};

// Home page component
const HomePage: React.FC = () => {
  const seoData = usePageSEO('home');

  return (
    <>
      <SEO {...seoData} />
      <Hero />
      <LazyShowreel />
      <ProjectCarousel />
      <ServicesSection />
      <CategoriesSection />
      <BrandsCarousel />
      <LazyAbout />
      <LazyContact />
    </>
  );
};

// Portfolio page component
const PortfolioPage: React.FC = () => {
  const seoData = usePageSEO('portfolio');

  return (
    <>
      <SEO {...seoData} />
      <LazyPortfolio />
    </>
  );
};

// Services page component
const ServicesPageComponent: React.FC = () => {
  const seoData = usePageSEO('services');

  return (
    <>
      <SEO {...seoData} />
      <LazyServicesPage />
    </>
  );
};

// About page component
const AboutPageComponent: React.FC = () => {
  const seoData = usePageSEO('about');

  return (
    <>
      <SEO {...seoData} />
      <LazyAboutPage />
    </>
  );
};

// Contact page component
const ContactPageComponent: React.FC = () => {
  const seoData = usePageSEO('contact');

  return (
    <>
      <SEO {...seoData} />
      <LazyContactPage />
    </>
  );
};



// 404 Not Found page
const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Página Não Encontrada"
        description="A página que procura não foi encontrada. Volte à página inicial do MV Studio."
        noIndex={true}
      />
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">
              Página Não Encontrada
            </h2>
            <p className="text-gray-300 mb-8">
              A página que procura não existe ou foi movida. Volte à página inicial
              para explorar nossos serviços de produção audiovisual.
            </p>
          </div>
          
          <div className="space-y-4">
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-900 transition-all duration-300 transform hover:scale-105"
            >
              Voltar ao Início
            </a>
            
            <div className="flex justify-center space-x-4 text-sm">
              <a href="/#portfolio" className="text-amber-800 hover:text-amber-600 transition-colors">
                Portfolio
              </a>
              <span className="text-gray-500">•</span>
              <a href="/#services" className="text-amber-800 hover:text-amber-600 transition-colors">
                Serviços
              </a>
              <span className="text-gray-500">•</span>
              <a href="/#contact" className="text-amber-800 hover:text-amber-600 transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Router component
const AppRouter: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simula carregamento de recursos
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(loadTimer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash && isLoaded) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!isLoaded) {
    return <PageLoader />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin route - no layout */}
          <Route
            path="/admin"
            element={
              <Layout isAdmin={true}>
                <AdminPage />
              </Layout>
            }
          />

          {/* Main routes with layout */}
          <Route path="/*" element={
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Main routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/services" element={<ServicesPageComponent />} />
                  <Route path="/catalogo" element={<ServicesPageComponent />} />
                  <Route path="/about" element={<AboutPageComponent />} />
                  <Route path="/contact" element={<ContactPageComponent />} />

                  {/* Legacy hash routes - redirect to proper URLs */}
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="/services-page" element={<Navigate to="/services" replace />} />
                  <Route path="/about-page" element={<Navigate to="/about" replace />} />
                  <Route path="/contact-page" element={<Navigate to="/contact" replace />} />

                  {/* 404 page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default AppRouter;
