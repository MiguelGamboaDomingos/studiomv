import { useState, useEffect, useCallback } from 'react';
import { 
  Project, 
  Service, 
  TeamMember, 
  ContactForm, 
  SiteSettings, 
  Testimonial, 
  BlogPost,
  ProjectFilters,
  ServiceFilters,
  PaginationParams,
  PaginatedResponse
} from '../types';
import { 
  projectsApi, 
  servicesApi, 
  teamApi, 
  contactApi, 
  settingsApi, 
  testimonialsApi, 
  blogApi,
  isDevelopmentMode
} from '../services/api';

// Generic hook for API calls
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useApi = <T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

// Projects hooks
export const useProjects = (
  filters?: ProjectFilters,
  pagination?: PaginationParams
) => {
  return useApi(
    () => projectsApi.getAll(filters, pagination),
    [filters, pagination]
  );
};

export const useProject = (id: string) => {
  return useApi(
    () => projectsApi.getById(id),
    [id]
  );
};

export const useFeaturedProjects = () => {
  return useApi(
    () => projectsApi.getFeatured(),
    []
  );
};

// Services hooks
export const useServices = (filters?: ServiceFilters) => {
  return useApi(
    () => servicesApi.getAll(filters),
    [filters]
  );
};

export const useService = (id: string) => {
  return useApi(
    () => servicesApi.getById(id),
    [id]
  );
};

// Team hooks
export const useTeam = () => {
  return useApi(
    () => teamApi.getAll(),
    []
  );
};

export const useTeamMember = (id: string) => {
  return useApi(
    () => teamApi.getById(id),
    [id]
  );
};

// Settings hooks
export const useSettings = () => {
  return useApi(
    () => settingsApi.get(),
    []
  );
};

// Testimonials hooks
export const useTestimonials = () => {
  return useApi(
    () => testimonialsApi.getAll(),
    []
  );
};

export const useFeaturedTestimonials = () => {
  return useApi(
    () => testimonialsApi.getFeatured(),
    []
  );
};

// Blog hooks
export const useBlogPosts = (pagination?: PaginationParams) => {
  return useApi(
    () => blogApi.getAll(pagination),
    [pagination]
  );
};

export const useBlogPost = (slug: string) => {
  return useApi(
    () => blogApi.getBySlug(slug),
    [slug]
  );
};

export const useFeaturedBlogPosts = () => {
  return useApi(
    () => blogApi.getFeatured(),
    []
  );
};

// Contact submissions hook (admin only)
export const useContactSubmissions = (pagination?: PaginationParams) => {
  return useApi(
    () => contactApi.getAll(pagination),
    [pagination]
  );
};

// Mutation hooks for create/update/delete operations
interface UseMutationState<T> {
  loading: boolean;
  error: string | null;
  execute: (data?: any) => Promise<T | void>;
}

const useMutation = <T>(
  mutationFn: (data?: any) => Promise<T>
): UseMutationState<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (data?: any): Promise<T | void> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(data);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  return {
    loading,
    error,
    execute,
  };
};

// Project mutations
export const useCreateProject = () => {
  return useMutation((project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
    projectsApi.create(project)
  );
};

export const useUpdateProject = () => {
  return useMutation(({ id, data }: { id: string; data: Partial<Project> }) =>
    projectsApi.update(id, data)
  );
};

export const useDeleteProject = () => {
  return useMutation((id: string) => projectsApi.delete(id));
};

// Service mutations
export const useCreateService = () => {
  return useMutation((service: Omit<Service, 'id'>) =>
    servicesApi.create(service)
  );
};

export const useUpdateService = () => {
  return useMutation(({ id, data }: { id: string; data: Partial<Service> }) =>
    servicesApi.update(id, data)
  );
};

export const useDeleteService = () => {
  return useMutation((id: string) => servicesApi.delete(id));
};

// Team mutations
export const useCreateTeamMember = () => {
  return useMutation((member: Omit<TeamMember, 'id'>) =>
    teamApi.create(member)
  );
};

export const useUpdateTeamMember = () => {
  return useMutation(({ id, data }: { id: string; data: Partial<TeamMember> }) =>
    teamApi.update(id, data)
  );
};

export const useDeleteTeamMember = () => {
  return useMutation((id: string) => teamApi.delete(id));
};

// Contact form submission
export const useSubmitContact = () => {
  return useMutation((formData: ContactForm) => contactApi.submit(formData));
};

// Settings mutations
export const useUpdateSettings = () => {
  return useMutation((settings: Partial<SiteSettings>) =>
    settingsApi.update(settings)
  );
};

// Testimonial mutations
export const useCreateTestimonial = () => {
  return useMutation((testimonial: Omit<Testimonial, 'id' | 'createdAt'>) =>
    testimonialsApi.create(testimonial)
  );
};

export const useUpdateTestimonial = () => {
  return useMutation(({ id, data }: { id: string; data: Partial<Testimonial> }) =>
    testimonialsApi.update(id, data)
  );
};

export const useDeleteTestimonial = () => {
  return useMutation((id: string) => testimonialsApi.delete(id));
};

// Blog mutations
export const useCreateBlogPost = () => {
  return useMutation((post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) =>
    blogApi.create(post)
  );
};

export const useUpdateBlogPost = () => {
  return useMutation(({ id, data }: { id: string; data: Partial<BlogPost> }) =>
    blogApi.update(id, data)
  );
};

export const useDeleteBlogPost = () => {
  return useMutation((id: string) => blogApi.delete(id));
};

// Custom hook for handling offline/online state
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Custom hook for caching API responses
export const useApiCache = <T>(
  key: string,
  apiCall: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCachedData = useCallback(() => {
    const cached = localStorage.getItem(`api_cache_${key}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl) {
        return data;
      }
    }
    return null;
  }, [key, ttl]);

  const setCachedData = useCallback((data: T) => {
    localStorage.setItem(`api_cache_${key}`, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  }, [key]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get cached data first
      const cachedData = getCachedData();
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      // Fetch fresh data
      const result = await apiCall();
      setData(result);
      setCachedData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, getCachedData, setCachedData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
