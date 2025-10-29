import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  DollarSign,
  Clock,
  Settings,
  Camera,
  Video,
  Palette,
  Lightbulb,
  Scissors,
  Monitor,
  Zap
} from 'lucide-react';
import { Service } from '../../types';
import { useServices } from '../../hooks/useFirebase';

const ServicesManager: React.FC = () => {
  const { services, loading, error, createService, updateService, deleteService } = useServices();
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const iconMap: { [key: string]: React.ReactNode } = {
    'lightbulb': <Lightbulb className="w-5 h-5" />,
    'camera': <Camera className="w-5 h-5" />,
    'scissors': <Scissors className="w-5 h-5" />,
    'monitor': <Monitor className="w-5 h-5" />,
    'zap': <Zap className="w-5 h-5" />,
    'video': <Video className="w-5 h-5" />,
    'palette': <Palette className="w-5 h-5" />,
    'settings': <Settings className="w-5 h-5" />,
  };

  // Simular carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      const mockServices: Service[] = [
        {
          id: '1',
          title: 'Pré-Produção',
          description: 'Desenvolvimento completo do conceito criativo, roteiro e planeamento detalhado do projeto.',
          detailedDescription: 'A pré-produção é a fase mais crucial de qualquer projeto audiovisual. Desenvolvemos o conceito criativo, criamos roteiros detalhados, storyboards e planeamos cada aspecto da produção.',
          icon: 'settings',
          category: 'Desenvolvimento',
          price: 'A partir de €800',
          duration: '2-4 semanas',
          features: [
            'Desenvolvimento de conceito criativo',
            'Roteiro e storyboard detalhado',
            'Planeamento de produção',
            'Casting e seleção de locais',
            'Cronograma detalhado'
          ],
          process: [
            'Briefing inicial e análise de objetivos',
            'Desenvolvimento do conceito criativo',
            'Criação do roteiro e storyboard',
            'Planeamento logístico',
            'Aprovação final do projeto'
          ],
          deliverables: [
            'Roteiro completo',
            'Storyboard ilustrado',
            'Plano de produção',
            'Cronograma detalhado',
            'Lista de equipamentos'
          ],
          featured: true,
          published: true,
          order: 1,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          title: 'Filmagem Principal',
          description: 'Captura profissional com equipamentos 4K, iluminação cinematográfica e direção especializada.',
          detailedDescription: 'A filmagem principal é onde a magia acontece. Com equipamentos de última geração e uma equipe técnica altamente qualificada, capturamos cada momento com precisão cinematográfica.',
          icon: 'video',
          category: 'Produção',
          price: 'A partir de €1.500',
          duration: '1-3 dias',
          features: [
            'Filmagem em 4K Ultra HD',
            'Equipamento cinematográfico profissional',
            'Direção especializada',
            'Iluminação cinematográfica',
            'Captação de áudio profissional'
          ],
          process: [
            'Setup e preparação do equipamento',
            'Briefing da equipe e ensaios',
            'Filmagem das sequências principais',
            'Captação de B-roll e detalhes',
            'Backup e organização do material'
          ],
          deliverables: [
            'Material filmado em 4K',
            'Áudio sincronizado',
            'B-roll e material adicional',
            'Backup seguro dos ficheiros',
            'Relatório de filmagem'
          ],
          featured: true,
          published: true,
          order: 2,
          createdAt: '2024-01-20T10:00:00Z',
          updatedAt: '2024-01-20T10:00:00Z',
        },
        {
          id: '3',
          title: 'Pós-Produção',
          description: 'Edição profissional, color grading, sound design e efeitos visuais para resultado cinematográfico.',
          detailedDescription: 'A pós-produção é onde damos vida ao material filmado. Utilizando software profissional, criamos uma narrativa coesa e visualmente impactante.',
          icon: 'palette',
          category: 'Finalização',
          price: 'A partir de €1.200',
          duration: '1-2 semanas',
          features: [
            'Edição cinematográfica profissional',
            'Color grading avançado',
            'Sound design e mixagem',
            'Efeitos visuais e motion graphics',
            'Correção e estabilização'
          ],
          process: [
            'Organização e sincronização do material',
            'Montagem e estruturação narrativa',
            'Color grading e correção de cor',
            'Sound design e mixagem de áudio',
            'Renderização e entrega final'
          ],
          deliverables: [
            'Vídeo final em alta resolução',
            'Versões para diferentes plataformas',
            'Ficheiros de áudio separados',
            'Projeto editável',
            'Backup do projeto completo'
          ],
          featured: true,
          published: true,
          order: 3,
          createdAt: '2024-01-25T10:00:00Z',
          updatedAt: '2024-01-25T10:00:00Z',
        },
      ];
      setServices(mockServices);
      setFilteredServices(mockServices);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar serviços
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [services, searchTerm]);

  const handleTogglePublished = async (id: string) => {
    try {
      const service = services.find(s => s.id === id);
      if (service) {
        await updateService(id, { ...service, published: !service.published });
      }
    } catch (error) {
      console.error('Erro ao atualizar status de publicação:', error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const service = services.find(s => s.id === id);
      if (service) {
        await updateService(id, { ...service, featured: !service.featured });
      }
    } catch (error) {
      console.error('Erro ao atualizar status de destaque:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este serviço?')) {
      try {
        await deleteService(id);
      } catch (error) {
        console.error('Erro ao eliminar serviço:', error);
      }
    }
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
          <h1 className="text-2xl font-bold text-stone-900">Gestão de Serviços</h1>
          <p className="text-stone-600">Gerencie todos os serviços oferecidos</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Serviço
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Pesquisar serviços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-stone-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div className="p-3 bg-stone-100 rounded-lg">
                  {iconMap[service.icon] || <Settings className="w-5 h-5" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-stone-900">{service.title}</h3>
                    <span className="text-sm text-stone-500 bg-stone-100 px-2 py-1 rounded">
                      {service.category}
                    </span>
                    
                    {/* Status Badges */}
                    {service.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Destaque
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>

                  <p className="text-stone-600 mb-3">{service.description}</p>

                  <div className="flex items-center gap-6 text-sm text-stone-500">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{service.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div>
                      <span>{service.features.length} características</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublished(service.id)}
                  className={`p-2 rounded ${
                    service.published 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-stone-400 hover:bg-stone-50'
                  }`}
                  title={service.published ? 'Despublicar' : 'Publicar'}
                >
                  {service.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => handleToggleFeatured(service.id)}
                  className={`p-2 rounded ${
                    service.featured 
                      ? 'text-yellow-600 hover:bg-yellow-50' 
                      : 'text-stone-400 hover:bg-stone-50'
                  }`}
                  title={service.featured ? 'Remover destaque' : 'Destacar'}
                >
                  <Star className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setEditingService(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title="Editar"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expandable Details */}
            <div className="mt-4 pt-4 border-t border-stone-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">Características</h4>
                  <ul className="text-stone-600 space-y-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-stone-500">+ {service.features.length - 3} mais...</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">Processo</h4>
                  <ul className="text-stone-600 space-y-1">
                    {service.process.slice(0, 3).map((step, index) => (
                      <li key={index}>{index + 1}. {step}</li>
                    ))}
                    {service.process.length > 3 && (
                      <li className="text-stone-500">+ {service.process.length - 3} mais...</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">Entregáveis</h4>
                  <ul className="text-stone-600 space-y-1">
                    {service.deliverables.slice(0, 3).map((deliverable, index) => (
                      <li key={index}>• {deliverable}</li>
                    ))}
                    {service.deliverables.length > 3 && (
                      <li className="text-stone-500">+ {service.deliverables.length - 3} mais...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Settings className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">Nenhum serviço encontrado</h3>
          <p className="text-stone-600 mb-4">
            {searchTerm 
              ? 'Tente ajustar o termo de pesquisa'
              : 'Comece criando o seu primeiro serviço'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
            >
              Criar Primeiro Serviço
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
