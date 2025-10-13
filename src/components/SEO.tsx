import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'video' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  canonical?: string;
  alternateLanguages?: { lang: string; url: string }[];
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noIndex = false,
  canonical,
  alternateLanguages = [],
  structuredData,
}) => {
  // Default values
  const defaultTitle = 'MV Studio - Produção Audiovisual em Lisboa';
  const defaultDescription = 'Estúdio de produção audiovisual em Lisboa especializado em filmmaking, fotografia e edição criativa. Transformamos ideias em realidade cinematográfica.';
  const defaultImage = `${window.location.origin}/og-image.jpg`;
  const defaultUrl = window.location.href;
  const siteName = 'MV Studio';

  // Computed values
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  const finalKeywords = [...keywords, 'produção audiovisual', 'filmmaking', 'fotografia', 'Lisboa', 'Portugal'].join(', ');

  // Generate structured data for organization
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    description: finalDescription,
    url: 'https://mvstudio.pt',
    logo: `${window.location.origin}/logo.svg`,
    image: finalImage,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisboa',
      addressCountry: 'PT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+351-912-345-678',
      contactType: 'customer service',
      email: 'contato@mvstudio.pt',
    },
    sameAs: [
      'https://instagram.com/mvstudio',
      'https://facebook.com/mvstudio',
      'https://linkedin.com/company/mvstudio',
      'https://youtube.com/mvstudio',
    ],
    foundingDate: '2020',
    numberOfEmployees: '2-10',
    industry: 'Media Production',
    serviceArea: {
      '@type': 'Country',
      name: 'Portugal',
    },
  };

  // Generate structured data for services
  const servicesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Video Production',
    provider: {
      '@type': 'Organization',
      name: siteName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Portugal',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Produção Audiovisual',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Filmmaking',
            description: 'Produção cinematográfica completa desde o conceito até a pós-produção',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fotografia',
            description: 'Fotografia profissional para eventos, produtos e retratos corporativos',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Edição Criativa',
            description: 'Edição e pós-produção de vídeo com foco na narrativa visual',
          },
        },
      ],
    },
  };

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mvstudio.pt',
      },
    ],
  };

  // Combine all structured data
  const allStructuredData = [
    organizationStructuredData,
    servicesStructuredData,
    breadcrumbStructuredData,
    ...(structuredData ? [structuredData] : []),
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      {author && <meta name="author" content={author} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Alternate Languages */}
      {alternateLanguages.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_PT" />
      
      {/* Article specific Open Graph */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@mvstudio" />
      <meta name="twitter:creator" content="@mvstudio" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#d97706" />
      <meta name="msapplication-TileColor" content="#d97706" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    </Helmet>
  );
};

// Hook for generating page-specific SEO data
export const usePageSEO = (pageType: string, data?: any) => {
  const generateSEO = (): SEOProps => {
    switch (pageType) {
      case 'home':
        return {
          title: 'MV Studio - Produção Audiovisual em Lisboa',
          description: 'Estúdio de produção audiovisual em Lisboa especializado em filmmaking, fotografia e edição criativa. Transformamos ideias em realidade cinematográfica.',
          keywords: ['produção audiovisual', 'filmmaking', 'fotografia', 'edição criativa', 'Lisboa', 'Portugal'],
          type: 'website',
        };
      
      case 'portfolio':
        return {
          title: 'Portfolio - Nossos Trabalhos',
          description: 'Explore nosso portfolio de projetos audiovisuais, incluindo vídeos corporativos, documentários de casamento e campanhas publicitárias.',
          keywords: ['portfolio', 'trabalhos', 'projetos', 'vídeos', 'filmmaking'],
          type: 'website',
        };
      
      case 'services':
        return {
          title: 'Serviços - Filmmaking, Fotografia e Edição',
          description: 'Conheça nossos serviços de produção audiovisual: filmmaking profissional, fotografia criativa e edição cinematográfica.',
          keywords: ['serviços', 'filmmaking', 'fotografia', 'edição', 'produção audiovisual'],
          type: 'website',
        };
      
      case 'about':
        return {
          title: 'Sobre Nós - A Nossa História',
          description: 'Conheça a história do MV Studio, nossa equipe e nossa paixão por criar conteúdo audiovisual de alta qualidade.',
          keywords: ['sobre', 'equipe', 'história', 'MV Studio', 'produção audiovisual'],
          type: 'website',
        };
      
      case 'contact':
        return {
          title: 'Contacto - Vamos Criar Juntos',
          description: 'Entre em contacto connosco para discutir o seu próximo projeto audiovisual. Estamos prontos para transformar a sua visão em realidade.',
          keywords: ['contacto', 'orçamento', 'projeto', 'filmmaking', 'Lisboa'],
          type: 'website',
        };
      
      case 'project':
        if (data) {
          return {
            title: data.title,
            description: data.description,
            keywords: data.tags || [],
            image: data.thumbnail,
            type: 'article',
            section: 'Portfolio',
            tags: data.tags || [],
            publishedTime: data.createdAt,
            modifiedTime: data.updatedAt,
            structuredData: {
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              name: data.title,
              description: data.description,
              image: data.thumbnail,
              creator: {
                '@type': 'Organization',
                name: 'MV Studio',
              },
              dateCreated: data.createdAt,
              dateModified: data.updatedAt,
              genre: data.category,
              duration: data.duration,
            },
          };
        }
        break;
      
      case 'blog':
        if (data) {
          return {
            title: data.title,
            description: data.excerpt,
            keywords: data.tags || [],
            image: data.featuredImage,
            type: 'article',
            author: data.author,
            section: data.category,
            tags: data.tags || [],
            publishedTime: data.createdAt,
            modifiedTime: data.updatedAt,
            structuredData: {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: data.title,
              description: data.excerpt,
              image: data.featuredImage,
              author: {
                '@type': 'Person',
                name: data.author,
              },
              publisher: {
                '@type': 'Organization',
                name: 'MV Studio',
                logo: {
                  '@type': 'ImageObject',
                  url: `${window.location.origin}/logo.svg`,
                },
              },
              datePublished: data.createdAt,
              dateModified: data.updatedAt,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': window.location.href,
              },
            },
          };
        }
        break;
      
      default:
        return {};
    }
    
    return {};
  };

  return generateSEO();
};

export default SEO;
