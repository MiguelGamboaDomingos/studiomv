import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload,
  Link,
  Eye,
  EyeOff,
  Star,
  StarOff
} from 'lucide-react';
import { Brand } from '../../types';
import { useBrands } from '../../hooks/useFirebase';

const BrandsManager: React.FC = () => {
  const { brands, loading, error, createBrand, updateBrand, deleteBrand } = useBrands();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: '',
    featured: false,
    published: true,
    order: 0,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
      website: '',
      description: '',
      featured: false,
      published: true,
      order: 0,
    });
    setEditingBrand(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingBrand) {
        await updateBrand(editingBrand.id, formData);
      } else {
        await createBrand(formData);
      }
      
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar marca:', error);
    }
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      logo: brand.logo,
      website: brand.website || '',
      description: brand.description || '',
      featured: brand.featured,
      published: brand.published,
      order: brand.order,
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar esta marca?')) {
      try {
        await deleteBrand(id);
      } catch (error) {
        console.error('Erro ao deletar marca:', error);
      }
    }
  };

  const toggleFeatured = async (brand: Brand) => {
    try {
      await updateBrand(brand.id, { featured: !brand.featured });
    } catch (error) {
      console.error('Erro ao atualizar marca:', error);
    }
  };

  const togglePublished = async (brand: Brand) => {
    try {
      await updateBrand(brand.id, { published: !brand.published });
    } catch (error) {
      console.error('Erro ao atualizar marca:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Marcas</h1>
          <p className="text-gray-600">Gerencie as marcas e clientes exibidos no carrossel</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Marca
        </button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Logo */}
            <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm">Sem logo</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 truncate">{brand.name}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleFeatured(brand)}
                    className={`p-1 rounded ${
                      brand.featured 
                        ? 'text-yellow-600 hover:text-yellow-700' 
                        : 'text-gray-400 hover:text-yellow-600'
                    }`}
                    title={brand.featured ? 'Remover destaque' : 'Destacar'}
                  >
                    {brand.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => togglePublished(brand)}
                    className={`p-1 rounded ${
                      brand.published 
                        ? 'text-green-600 hover:text-green-700' 
                        : 'text-gray-400 hover:text-green-600'
                    }`}
                    title={brand.published ? 'Despublicar' : 'Publicar'}
                  >
                    {brand.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {brand.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{brand.description}</p>
              )}

              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-800 text-sm mb-3"
                >
                  <Link className="w-3 h-3" />
                  Website
                </a>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(brand)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Edit className="w-3 h-3" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                >
                  <Trash2 className="w-3 h-3" />
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {brands.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma marca cadastrada</h3>
          <p className="text-gray-600 mb-4">Comece adicionando sua primeira marca ou cliente</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
          >
            Adicionar Marca
          </button>
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingBrand ? 'Editar Marca' : 'Nova Marca'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Marca *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL do Logo *
                  </label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                    placeholder="https://exemplo.com/logo.png"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                    placeholder="https://exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descrição da marca ou cliente..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordem de Exibição
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300 text-stone-600 focus:ring-stone-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Destacar</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="rounded border-gray-300 text-stone-600 focus:ring-stone-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Publicado</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-800 text-white py-2 px-4 rounded-lg hover:bg-stone-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {editingBrand ? 'Atualizar' : 'Criar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsManager;
