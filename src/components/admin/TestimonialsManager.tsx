import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  User,
  Building,
  Quote
} from 'lucide-react';
import { Testimonial } from '../../types';
import { useTestimonials } from '../../hooks/useFirebase';

const TestimonialsManager: React.FC = () => {
  const { testimonials, loading, error, createTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);



  // Filtrar testemunhos
  useEffect(() => {
    let filtered = testimonials;

    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTestimonials(filtered);
  }, [testimonials, searchTerm]);

  const handleTogglePublished = async (id: string) => {
    try {
      const testimonial = testimonials.find(t => t.id === id);
      if (testimonial) {
        await updateTestimonial(id, { ...testimonial, published: !testimonial.published });
      }
    } catch (error) {
      console.error('Erro ao atualizar status de publicação:', error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const testimonial = testimonials.find(t => t.id === id);
      if (testimonial) {
        await updateTestimonial(id, { ...testimonial, featured: !testimonial.featured });
      }
    } catch (error) {
      console.error('Erro ao atualizar status de destaque:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este testemunho?')) {
      try {
        await deleteTestimonial(id);
      } catch (error) {
        console.error('Erro ao eliminar testemunho:', error);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-stone-300'
        }`}
      />
    ));
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
          <h1 className="text-2xl font-bold text-stone-900">Gestão de Testemunhos</h1>
          <p className="text-stone-600">Gerencie todos os testemunhos de clientes</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Testemunho
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Pesquisar testemunhos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl border border-stone-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {testimonial.clientAvatar ? (
                    <img
                      src={testimonial.clientAvatar}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-stone-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-stone-900">{testimonial.clientName}</h3>
                    
                    {/* Status Badges */}
                    {testimonial.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Destaque
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      testimonial.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {testimonial.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{testimonial.clientRole}</span>
                    </div>
                    {testimonial.clientCompany && (
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{testimonial.clientCompany}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-stone-300" />
                    <p className="text-stone-700 pl-4 italic">"{testimonial.content}"</p>
                  </div>

                  <div className="mt-3 text-xs text-stone-500">
                    Criado em {formatDate(testimonial.createdAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublished(testimonial.id)}
                  className={`p-2 rounded ${
                    testimonial.published 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-stone-400 hover:bg-stone-50'
                  }`}
                  title={testimonial.published ? 'Despublicar' : 'Publicar'}
                >
                  {testimonial.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => handleToggleFeatured(testimonial.id)}
                  className={`p-2 rounded ${
                    testimonial.featured 
                      ? 'text-yellow-600 hover:bg-yellow-50' 
                      : 'text-stone-400 hover:bg-stone-50'
                  }`}
                  title={testimonial.featured ? 'Remover destaque' : 'Destacar'}
                >
                  <Star className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setEditingTestimonial(testimonial)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title="Editar"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <Quote className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">Nenhum testemunho encontrado</h3>
          <p className="text-stone-600 mb-4">
            {searchTerm 
              ? 'Tente ajustar o termo de pesquisa'
              : 'Comece adicionando o primeiro testemunho'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
            >
              Adicionar Primeiro Testemunho
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
