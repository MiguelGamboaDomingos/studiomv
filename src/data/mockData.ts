import { Project, Service, TeamMember, SiteSettings, Testimonial, BlogPost } from '../types';

// Mock Projects Data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Corporate Dynamics',
    description: 'Vídeo corporativo dinâmico para empresa de tecnologia, destacando inovação e crescimento.',
    longDescription: 'Este projeto envolveu a criação de um vídeo corporativo completo para uma empresa líder em tecnologia. O objetivo era transmitir a cultura de inovação e o crescimento exponencial da empresa através de uma narrativa visual envolvente.',
    category: 'corporate',
    tags: ['corporate', 'technology', 'innovation'],
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    images: [
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    duration: '2:30',
    client: 'TechCorp Solutions',
    year: 2024,
    featured: true,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Wedding Dreams',
    description: 'Documentário de casamento cinematográfico capturando momentos únicos e emocionantes.',
    longDescription: 'Um documentário de casamento que captura a essência e emoção do dia mais importante na vida do casal. Utilizamos técnicas cinematográficas avançadas para criar uma narrativa visual emocionante.',
    category: 'wedding',
    tags: ['wedding', 'documentary', 'cinematic'],
    thumbnail: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    duration: '8:45',
    client: 'Maria & João Silva',
    year: 2024,
    featured: true,
    status: 'published',
    createdAt: '2024-02-10T14:30:00Z',
    updatedAt: '2024-02-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'Product Showcase',
    description: 'Vídeo promocional de produto com foco em detalhes e funcionalidades inovadoras.',
    longDescription: 'Criação de um vídeo promocional que destaca as características únicas e inovadoras de um novo produto tecnológico, utilizando técnicas de macro fotografia e motion graphics.',
    category: 'commercial',
    tags: ['product', 'commercial', 'technology'],
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    images: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    duration: '1:20',
    client: 'InnovateTech',
    year: 2024,
    featured: false,
    status: 'published',
    createdAt: '2024-03-05T09:15:00Z',
    updatedAt: '2024-03-05T09:15:00Z',
  },
];

// Mock Services Data
export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Filmmaking',
    description: 'Produção cinematográfica completa desde o conceito até a pós-produção.',
    longDescription: 'Oferecemos serviços completos de produção cinematográfica, incluindo desenvolvimento de conceito, pré-produção, filmagem e pós-produção. Nossa equipe experiente trabalha com equipamentos de última geração para garantir a mais alta qualidade visual.',
    icon: 'video',
    features: [
      'Desenvolvimento de conceito e roteiro',
      'Pré-produção completa',
      'Filmagem com equipamentos 4K/8K',
      'Pós-produção e edição avançada',
      'Color grading profissional',
      'Entrega em múltiplos formatos'
    ],
    pricing: {
      starting: 2500,
      currency: 'EUR',
      unit: 'projeto'
    },
    duration: '2-8 semanas',
    category: 'video',
    featured: true,
    active: true,
  },
  {
    id: '2',
    name: 'Fotografia',
    description: 'Fotografia profissional para eventos, produtos e retratos corporativos.',
    longDescription: 'Serviços de fotografia profissional cobrindo uma ampla gama de necessidades, desde eventos corporativos até sessões de produto e retratos executivos. Utilizamos técnicas avançadas de iluminação e composição.',
    icon: 'camera',
    features: [
      'Fotografia de eventos',
      'Retratos corporativos',
      'Fotografia de produto',
      'Sessões em estúdio',
      'Edição e retoque profissional',
      'Entrega digital e impressa'
    ],
    pricing: {
      starting: 500,
      currency: 'EUR',
      unit: 'sessão'
    },
    duration: '1-3 dias',
    category: 'photography',
    featured: true,
    active: true,
  },
  {
    id: '3',
    name: 'Edição Criativa',
    description: 'Edição e pós-produção de vídeo com foco na narrativa visual.',
    longDescription: 'Serviços especializados de edição e pós-produção, transformando material bruto em narrativas visuais envolventes. Incluímos color grading, motion graphics e efeitos visuais.',
    icon: 'edit',
    features: [
      'Edição narrativa avançada',
      'Color grading cinematográfico',
      'Motion graphics',
      'Efeitos visuais',
      'Sincronização de áudio',
      'Masterização final'
    ],
    pricing: {
      starting: 800,
      currency: 'EUR',
      unit: 'projeto'
    },
    duration: '1-4 semanas',
    category: 'post-production',
    featured: true,
    active: true,
  },
];

// Mock Team Data
export const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Miguel Vieira',
    role: 'Director & Founder',
    bio: 'Com mais de 10 anos de experiência em produção audiovisual, Miguel fundou o MV Studio com a visão de criar conteúdo cinematográfico de alta qualidade.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Direção', 'Cinematografia', 'Produção'],
    social: {
      linkedin: 'https://linkedin.com/in/miguelvieira',
      instagram: 'https://instagram.com/miguelvieira',
    },
    featured: true,
    active: true,
  },
  {
    id: '2',
    name: 'Ana Costa',
    role: 'Creative Director',
    bio: 'Especialista em narrativa visual e design, Ana traz uma perspectiva única para cada projeto, garantindo que cada história seja contada de forma impactante.',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Design', 'Storytelling', 'Art Direction'],
    social: {
      linkedin: 'https://linkedin.com/in/anacosta',
      behance: 'https://behance.net/anacosta',
    },
    featured: true,
    active: true,
  },
];

// Mock Site Settings
export const mockSettings: SiteSettings = {
  siteName: 'MV Studio',
  tagline: 'Não é como começa, É como termina',
  description: 'Estúdio de produção audiovisual especializado em filmmaking, fotografia e edição criativa.',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  primaryColor: '#d97706',
  secondaryColor: '#92400e',
  contactEmail: 'contato@mvstudio.pt',
  contactPhone: '+351 912 345 678',
  address: 'Lisboa, Portugal',
  socialMedia: {
    instagram: 'https://instagram.com/mvstudio',
    facebook: 'https://facebook.com/mvstudio',
    linkedin: 'https://linkedin.com/company/mvstudio',
    youtube: 'https://youtube.com/mvstudio',
  },
  seo: {
    metaTitle: 'MV Studio - Produção Audiovisual em Lisboa',
    metaDescription: 'Estúdio de produção audiovisual em Lisboa especializado em filmmaking, fotografia e edição criativa. Transformamos ideias em realidade cinematográfica.',
    keywords: ['produção audiovisual', 'filmmaking', 'fotografia', 'Lisboa', 'Portugal'],
    ogImage: '/og-image.jpg',
  },
  analytics: {
    googleAnalyticsId: 'GA_MEASUREMENT_ID',
    facebookPixelId: 'FB_PIXEL_ID',
  },
  features: {
    blog: true,
    testimonials: true,
    newsletter: true,
    darkMode: true,
  },
};

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    role: 'CEO, TechCorp',
    content: 'O MV Studio superou todas as nossas expectativas. O vídeo corporativo que criaram capturou perfeitamente a essência da nossa empresa.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    company: 'TechCorp Solutions',
    featured: true,
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    name: 'Maria Silva',
    role: 'Noiva',
    content: 'O nosso vídeo de casamento ficou absolutamente perfeito! Cada momento foi capturado com uma sensibilidade e qualidade cinematográfica incrível.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    company: null,
    featured: true,
    createdAt: '2024-02-15T14:30:00Z',
  },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'O Futuro da Produção Audiovisual',
    slug: 'futuro-producao-audiovisual',
    excerpt: 'Exploramos as tendências emergentes na produção audiovisual e como a tecnologia está moldando o futuro da indústria.',
    content: 'Conteúdo completo do artigo sobre o futuro da produção audiovisual...',
    featuredImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Miguel Vieira',
    tags: ['tecnologia', 'futuro', 'produção'],
    category: 'insights',
    published: true,
    featured: true,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Dicas para um Vídeo Corporativo de Sucesso',
    slug: 'dicas-video-corporativo-sucesso',
    excerpt: 'Guia completo com as melhores práticas para criar vídeos corporativos que realmente engajam e convertem.',
    content: 'Conteúdo completo do artigo sobre vídeos corporativos...',
    featuredImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Ana Costa',
    tags: ['corporativo', 'dicas', 'marketing'],
    category: 'tutoriais',
    published: true,
    featured: false,
    createdAt: '2024-02-20T15:30:00Z',
    updatedAt: '2024-02-20T15:30:00Z',
  },
];

// Export all mock data
export const mockData = {
  projects: mockProjects,
  services: mockServices,
  team: mockTeam,
  settings: mockSettings,
  testimonials: mockTestimonials,
  blogPosts: mockBlogPosts,
};
