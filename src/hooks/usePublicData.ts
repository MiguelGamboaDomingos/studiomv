import { useState, useEffect } from 'react';
import { Project, Service, TeamMember, Testimonial, Brand, SiteSettings } from '../types';
import { FirebaseService } from '../services/firebaseService';

// Hook para dados públicos do site (apenas dados publicados)
export const usePublicProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const allProjects = await FirebaseService.getProjects();
        // Filtrar apenas projetos publicados
        const publishedProjects = allProjects.filter(project => project.published);
        setProjects(publishedProjects);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setError('Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export const usePublicFeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        const allProjects = await FirebaseService.getProjects();
        // Filtrar apenas projetos publicados e em destaque
        const featuredProjects = allProjects.filter(project => 
          project.published && project.featured
        );
        setProjects(featuredProjects);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar projetos em destaque:', err);
        setError('Erro ao carregar projetos em destaque');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error };
};

export const usePublicProjectsByCategory = (category?: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsByCategory = async () => {
      try {
        setLoading(true);
        const allProjects = await FirebaseService.getProjects();
        
        let filteredProjects = allProjects.filter(project => project.published);
        
        if (category && category !== 'all') {
          filteredProjects = filteredProjects.filter(project => 
            project.category === category
          );
        }
        
        setProjects(filteredProjects);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar projetos por categoria:', err);
        setError('Erro ao carregar projetos por categoria');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsByCategory();
  }, [category]);

  return { projects, loading, error };
};

export const usePublicProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await FirebaseService.getProject(id);
        
        // Verificar se o projeto existe e está publicado
        if (projectData && projectData.published) {
          setProject(projectData);
        } else {
          setProject(null);
          setError('Projeto não encontrado ou não publicado');
        }
        
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar projeto:', err);
        setError('Erro ao carregar projeto');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
};

export const usePublicServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const allServices = await FirebaseService.getServices();
        // Filtrar apenas serviços publicados
        const publishedServices = allServices.filter(service => service.published);
        setServices(publishedServices);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar serviços:', err);
        setError('Erro ao carregar serviços');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

export const usePublicTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const allTeam = await FirebaseService.getTeam();
        // Ordenar por ordem e filtrar se necessário
        const sortedTeam = allTeam.sort((a, b) => a.order - b.order);
        setTeam(sortedTeam);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar equipa:', err);
        setError('Erro ao carregar equipa');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return { team, loading, error };
};

export const usePublicTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const allTestimonials = await FirebaseService.getTestimonials();
        // Filtrar apenas testemunhos publicados
        const publishedTestimonials = allTestimonials.filter(testimonial => 
          testimonial.published
        );
        setTestimonials(publishedTestimonials);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar testemunhos:', err);
        setError('Erro ao carregar testemunhos');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};

export const usePublicFeaturedTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedTestimonials = async () => {
      try {
        setLoading(true);
        const allTestimonials = await FirebaseService.getTestimonials();
        // Filtrar apenas testemunhos publicados e em destaque
        const featuredTestimonials = allTestimonials.filter(testimonial => 
          testimonial.published && testimonial.featured
        );
        setTestimonials(featuredTestimonials);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar testemunhos em destaque:', err);
        setError('Erro ao carregar testemunhos em destaque');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTestimonials();
  }, []);

  return { testimonials, loading, error };
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const allSettings = await FirebaseService.getSettings();
        // Pegar as primeiras configurações (deve haver apenas uma)
        const siteSettings = allSettings[0] || null;
        setSettings(siteSettings);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar configurações:', err);
        setError('Erro ao carregar configurações');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};

// Hook para categorias únicas dos projetos
export const useProjectCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const allProjects = await FirebaseService.getProjects();
        const publishedProjects = allProjects.filter(project => project.published);
        
        // Extrair categorias únicas
        const uniqueCategories = Array.from(
          new Set(publishedProjects.map(project => project.category))
        ).filter(Boolean);
        
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
        setError('Erro ao carregar categorias');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook para estatísticas do site
export const useSiteStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalServices: 0,
    totalTeamMembers: 0,
    totalTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const [projects, services, team, testimonials] = await Promise.all([
          FirebaseService.getProjects(),
          FirebaseService.getServices(),
          FirebaseService.getTeam(),
          FirebaseService.getTestimonials(),
        ]);

        setStats({
          totalProjects: projects.filter(p => p.published).length,
          totalServices: services.filter(s => s.published).length,
          totalTeamMembers: team.length,
          totalTestimonials: testimonials.filter(t => t.published).length,
        });
        
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
        setError('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

// Hook para configurações do site (público)
export const usePublicSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const allSettings = await FirebaseService.getSettings();

        // Pegar as primeiras configurações (deve haver apenas uma)
        const siteSettings = allSettings.length > 0 ? allSettings[0] : null;

        setSettings(siteSettings);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar configurações do site:', err);
        setError('Erro ao carregar configurações do site');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};

// Hook para marcas públicas (apenas publicadas)
export const usePublicBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const publishedBrands = await FirebaseService.getPublishedBrands();
        setBrands(publishedBrands);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar marcas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};
