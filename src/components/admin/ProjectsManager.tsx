import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Calendar,
  User,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import { Project } from '../../types';
import { useProjects } from '../../hooks/useFirebase';
import VideoUploader, { VideoData } from './VideoUploader';

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'corporate', label: 'Corporativo' },
    { value: 'wedding', label: 'Casamentos' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'documentary', label: 'Documentário' },
    { value: 'music', label: 'Música' },
  ];

  // Simular carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      const mockProjects: Project[] = [
        {
          id: '1',
          title: 'Corporate Dynamics',
          description: 'Vídeo corporativo dinâmico para empresa de tecnologia',
          category: 'corporate',
          client: 'TechCorp Solutions',
          year: 2024,
          duration: '2:30',
          thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
          videoUrl: 'https://example.com/video1.mp4',
          featured: true,
          published: true,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          title: 'Wedding Dreams',
          description: 'Documentário de casamento cinematográfico',
          category: 'wedding',
          client: 'Maria & João Silva',
          year: 2024,
          duration: '8:45',
          thumbnail: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
          featured: true,
          published: true,
          createdAt: '2024-02-10T14:30:00Z',
          updatedAt: '2024-02-10T14:30:00Z',
        },
        {
          id: '3',
          title: 'Product Showcase',
          description: 'Vídeo promocional de produto inovador',
          category: 'commercial',
          client: 'InnovateTech',
          year: 2024,
          duration: '1:20',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
          featured: false,
          published: false,
          createdAt: '2024-03-05T09:15:00Z',
          updatedAt: '2024-03-05T09:15:00Z',
        },
      ];
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar projetos
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  const handleTogglePublished = (id: string) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, published: !project.published } : project
    ));
  };

  const handleToggleFeatured = (id: string) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, featured: !project.featured } : project
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este projeto?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Gestão de Projetos</h1>
          <p className="text-stone-600">Gerencie todos os projetos do portfolio</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Pesquisar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Thumbnail */}
            <div className="relative h-48 bg-stone-100">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                {project.videoUrl && (
                  <Play className="w-8 h-8 text-white" />
                )}
              </div>
              
              {/* Status Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                {project.featured && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Destaque
                  </span>
                )}
                <span className={`text-white text-xs px-2 py-1 rounded-full ${
                  project.published ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {project.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-stone-900 mb-2">{project.title}</h3>
              <p className="text-stone-600 text-sm mb-3 line-clamp-2">{project.description}</p>
              
              <div className="space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{project.year} • {project.duration}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTogglePublished(project.id)}
                    className={`p-1 rounded ${
                      project.published 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-stone-400 hover:bg-stone-50'
                    }`}
                    title={project.published ? 'Despublicar' : 'Publicar'}
                  >
                    {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleToggleFeatured(project.id)}
                    className={`p-1 rounded ${
                      project.featured 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-stone-400 hover:bg-stone-50'
                    }`}
                    title={project.featured ? 'Remover destaque' : 'Destacar'}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">Nenhum projeto encontrado</h3>
          <p className="text-stone-600 mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Tente ajustar os filtros de pesquisa'
              : 'Comece criando o seu primeiro projeto'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
            >
              Criar Primeiro Projeto
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
