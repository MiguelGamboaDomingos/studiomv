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

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  client: string;
  year: string;
  duration: string;
  featured: boolean;
  published: boolean;
  order: number;
  
  // Media assets
  thumbnail: MediaAsset;
  video?: MediaAsset;
  gallery: MediaAsset[];
  
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
  
  // Pricing
  priceFrom?: number;
  priceType: 'fixed' | 'from' | 'quote';
  
  // Details
  deliverables: string[];
  process: string[];
  
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
  logo: MediaAsset;
  favicon: MediaAsset;
  
  // Contact
  email: string;
  phone: string;
  address: string;
  
  // Social Media
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    vimeo?: string;
    behance?: string;
  };
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: MediaAsset;
  
  // Analytics
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  
  // Maintenance
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  
  // Timestamps
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
