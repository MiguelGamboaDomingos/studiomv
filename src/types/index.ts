// Base interfaces for back office integration

export interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl: string;
  type: 'image' | 'video';
  alt: string;
  title: string;
  description: string;
  fileSize: number;
  mimeType: string;
  width?: number;
  height?: number;
  duration?: string; // For videos
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
  order: number;
  isMain?: boolean; // Para thumbnail principal
  // Para vídeos
  duration?: string;
  // Para imagens
  alt?: string;
  // Metadados do ficheiro
  filename?: string;
  fileSize?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  // Upload info
  uploadedAt: string;
  source: 'upload' | 'link'; // Se foi carregado ou é link externo
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string; // Simplificado para string
  client: string;
  year: number;
  duration: string;
  featured: boolean;
  published: boolean;
  order: number;

  // Media assets - até 6 fotos e 2 vídeos
  images: ProjectMedia[]; // Máximo 6 imagens
  videos: ProjectMedia[]; // Máximo 2 vídeos
  thumbnail: string; // URL da imagem principal

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string; // Icon name or SVG
  featured: boolean;
  published: boolean;
  order: number;

  // Pricing in Kwanzas
  priceFromKz?: number; // Preço em Kwanzas Angolanos
  priceType: 'fixed' | 'from' | 'quote';
  priceDisplay?: string; // Texto personalizado para exibição (ex: "A partir de 50.000 Kz")

  // Details
  deliverables: string[];
  process: string[];
  features: string[]; // Características do serviço

  // Media
  thumbnail?: MediaAsset;
  gallery: MediaAsset[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: MediaAsset;
  email?: string;
  phone?: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    behance?: string;
    website?: string;
  };
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id: string;

  // General
  siteName: string;
  tagline: string;
  description: string;
  logo?: string; // URL da logo
  favicon?: string; // URL do favicon

  // Company Info
  companyInfo: {
    yearsOfExperience: number; // Anos de trabalho
    foundedYear: number; // Ano de fundação
    aboutTitle: string; // Título da seção sobre
    aboutDescription: string; // Descrição da empresa
    missionStatement?: string; // Declaração de missão
    visionStatement?: string; // Declaração de visão
  };

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  showreelVideoUrl: string; // URL do vídeo showreel
  showreelThumbnail?: string; // Thumbnail do showreel

  // Section Titles
  sectionTitles: {
    about: string; // "Sobre Nós"
    services: string; // "Nossos Serviços"
    portfolio: string; // "Nosso Portfólio"
    testimonials: string; // "Testemunhos"
    contact: string; // "Contacto"
    team: string; // "Nossa Equipa"
    process: string; // "Nosso Processo"
    stats: string; // "Números que Falam"
    brands: string; // "Clientes & Parceiros"
  };

  // Section Descriptions
  sectionDescriptions: {
    about: string;
    services: string;
    portfolio: string;
    testimonials: string;
    contact: string;
    team: string;
    process: string;
    stats: string;
    brands: string;
  };

  // Contact
  email: string;
  phone: string;
  whatsapp: string;
  address: string;

  // Social Media
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    vimeo?: string;
    behance?: string;
    tiktok?: string;
  };

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage?: string; // URL da imagem OG

  // Analytics
  googleAnalyticsId?: string;
  facebookPixelId?: string;

  // Maintenance
  maintenanceMode: boolean;
  maintenanceMessage?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string; // URL do logo
  website?: string; // Site da marca
  description?: string; // Descrição da marca
  featured: boolean; // Se aparece em destaque
  published: boolean;
  order: number; // Ordem de exibição
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientAvatar?: MediaAsset;
  content: string;
  rating: number;
  featured: boolean;
  published: boolean;
  order: number;
  projectId?: string; // Link to related project
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: TeamMember;
  category: BlogCategory;
  tags: string[];
  featured: boolean;
  published: boolean;
  
  // Media
  featuredImage: MediaAsset;
  gallery: MediaAsset[];
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

// Filter and query types
export interface ProjectFilters {
  category?: string;
  year?: string;
  featured?: boolean;
  published?: boolean;
  search?: string;
}

export interface ServiceFilters {
  featured?: boolean;
  published?: boolean;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// Component prop types for reusability
export interface VideoPlayerData {
  videoUrl?: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  duration: string;
  category: string;
}

export interface ProjectCardData {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  thumbnail: string;
  duration: string;
  description: string;
  videoUrl?: string;
}

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
  priceFrom?: number;
  priceType: 'fixed' | 'from' | 'quote';
}
