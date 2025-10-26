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
  Image as ImageIcon,
  X,
  Save
} from 'lucide-react';
import { Project } from '../../types';
import { useProjects } from '../../hooks/useFirebase';
import VideoUploader, { VideoData } from './VideoUploader';

const ProjectsManagerFirebase: React.FC = () => {
  const { 
    projects, 
    loading, 
    error, 
    createProject, 
    updateProject, 
    deleteProject 
  } = useProjects();
  
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    client: '',
    year: new Date().getFullYear(),
    duration: '',
    thumbnail: '',
    videoUrl: '',
    featured: false,
    published: true,
  });

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'corporate', label: 'Corporativo' },
    { value: 'wedding', label: 'Casamentos' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'documentary', label: 'Documentário' },
    { value: 'music', label: 'Música' },
    { value: 'event', label: 'Eventos' },
  ];

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

  const handleTogglePublished = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      try {
        await updateProject(id, { published: !project.published });
      } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
      }
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      try {
        await updateProject(id, { featured: !project.featured });
      } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este projeto?')) {
      try {
        await deleteProject(id);
      } catch (error) {
        console.error('Erro ao eliminar projeto:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
      } else {
        await createProject(formData);
      }
      
      setShowCreateModal(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        client: '',
        year: new Date().getFullYear(),
        duration: '',
        thumbnail: '',
        videoUrl: '',
        featured: false,
        published: true,
      });
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      client: project.client,
      year: project.year,
      duration: project.duration,
      thumbnail: project.thumbnail,
      videoUrl: project.videoUrl || '',
      featured: project.featured,
      published: project.published,
    });
    setShowCreateModal(true);
  };

  const handleVideoAdded = (videoData: VideoData) => {
    setFormData(prev => ({
      ...prev,
      videoUrl: videoData.url,
      duration: videoData.duration ? `${Math.floor(videoData.duration / 60)}:${(videoData.duration % 60).toString().padStart(2, '0')}` : prev.duration
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
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
          onClick={() => setShowCreateModal(true)}
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
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-stone-400" />
                </div>
              )}
              
              {/* Status Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {project.featured && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Destaque
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.published 
                    ? 'bg-green-500 text-white' 
                    : 'bg-stone-500 text-white'
                }`}>
                  {project.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>

              {/* Video Play Button */}
              {project.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-900 mb-1">{project.title}</h3>
                  <p className="text-stone-600 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-stone-600 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.year}</span>
                </div>
                {project.duration && (
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTogglePublished(project.id)}
                    className={`p-2 rounded-lg transition-colors ${
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
                    className={`p-2 rounded-lg transition-colors ${
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
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
              onClick={() => setShowCreateModal(true)}
              className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
            >
              Criar Primeiro Projeto
            </button>
          )}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-stone-900">
                  {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingProject(null);
                  }}
                  className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">
                    Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">
                    Categoria *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.filter(cat => cat.value !== 'all').map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">
                    Ano *
                  </label>
                  <input
                    type="number"
                    required
                    min="2000"
                    max="2030"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">
                    Duração
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 3:45"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">
                    URL da Thumbnail
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Vídeo
                </label>
                <VideoUploader
                  onVideoAdded={handleVideoAdded}
                  existingVideo={formData.videoUrl ? {
                    type: 'link',
                    url: formData.videoUrl,
                    title: formData.title || 'Vídeo do projeto'
                  } : undefined}
                  onRemove={() => setFormData(prev => ({ ...prev, videoUrl: '' }))}
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded border-stone-300 text-stone-600 focus:ring-stone-500"
                  />
                  <span className="text-sm text-stone-700">Projeto em destaque</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded border-stone-300 text-stone-600 focus:ring-stone-500"
                  />
                  <span className="text-sm text-stone-700">Publicar projeto</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {editingProject ? 'Atualizar' : 'Criar'} Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagerFirebase;
