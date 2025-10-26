import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Search, 
  Filter, 
  Trash2, 
  Download,
  Eye,
  Image as ImageIcon,
  Video,
  File,
  Grid,
  List
} from 'lucide-react';

interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl: string;
  type: 'image' | 'video' | 'document';
  alt: string;
  title: string;
  description: string;
  fileSize: number;
  mimeType: string;
  width?: number;
  height?: number;
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

const MediaManager: React.FC = () => {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<MediaAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const mediaTypes = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'image', label: 'Imagens' },
    { value: 'video', label: 'Vídeos' },
    { value: 'document', label: 'Documentos' },
  ];

  // Simular carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      const mockAssets: MediaAsset[] = [
        {
          id: '1',
          url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
          thumbnailUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
          type: 'image',
          alt: 'Corporate video production',
          title: 'Corporate Dynamics Thumbnail',
          description: 'Thumbnail do projeto Corporate Dynamics',
          fileSize: 2048000,
          mimeType: 'image/jpeg',
          width: 1920,
          height: 1080,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          url: 'https://example.com/video1.mp4',
          thumbnailUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
          type: 'video',
          alt: 'Corporate video',
          title: 'Corporate Dynamics Video',
          description: 'Vídeo final do projeto Corporate Dynamics',
          fileSize: 104857600,
          mimeType: 'video/mp4',
          width: 1920,
          height: 1080,
          duration: '2:30',
          createdAt: '2024-01-15T12:00:00Z',
          updatedAt: '2024-01-15T12:00:00Z',
        },
        {
          id: '3',
          url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
          thumbnailUrl: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
          type: 'image',
          alt: 'Wedding photography',
          title: 'Wedding Dreams Photo',
          description: 'Fotografia do projeto Wedding Dreams',
          fileSize: 3072000,
          mimeType: 'image/jpeg',
          width: 1920,
          height: 1280,
          createdAt: '2024-02-10T14:30:00Z',
          updatedAt: '2024-02-10T14:30:00Z',
        },
      ];
      setMediaAssets(mockAssets);
      setFilteredAssets(mockAssets);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar assets
  useEffect(() => {
    let filtered = mediaAssets;

    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.alt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(asset => asset.type === selectedType);
    }

    setFilteredAssets(filtered);
  }, [mediaAssets, searchTerm, selectedType]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const handleSelectAsset = (id: string) => {
    setSelectedAssets(prev =>
      prev.includes(id)
        ? prev.filter(assetId => assetId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map(asset => asset.id));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Tem certeza que deseja eliminar ${selectedAssets.length} ficheiro(s)?`)) {
      setMediaAssets(mediaAssets.filter(asset => !selectedAssets.includes(asset.id)));
      setSelectedAssets([]);
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
          <h1 className="text-2xl font-bold text-stone-900">Gestão de Media</h1>
          <p className="text-stone-600">Gerencie todas as imagens, vídeos e documentos</p>
        </div>
        <button className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Ficheiros
        </button>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Pesquisar ficheiros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            >
              {mediaTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <div className="flex border border-stone-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedAssets.length > 0 && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-600">
                {selectedAssets.length} ficheiro(s) selecionado(s)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className="relative h-48 bg-stone-100">
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    {getTypeIcon(asset.type)}
                    {asset.type}
                  </span>
                </div>

                {/* Selection Checkbox */}
                <div className="absolute top-2 right-2">
                  <input
                    type="checkbox"
                    checked={selectedAssets.includes(asset.id)}
                    onChange={() => handleSelectAsset(asset.id)}
                    className="w-4 h-4 text-stone-600 bg-white border-stone-300 rounded focus:ring-stone-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-stone-900 mb-1 truncate">{asset.title}</h3>
                <p className="text-stone-600 text-sm mb-2 line-clamp-2">{asset.description}</p>
                
                <div className="text-xs text-stone-500 space-y-1">
                  <div>{formatFileSize(asset.fileSize)}</div>
                  {asset.width && asset.height && (
                    <div>{asset.width} × {asset.height}</div>
                  )}
                  {asset.duration && (
                    <div>Duração: {asset.duration}</div>
                  )}
                  <div>{formatDate(asset.createdAt)}</div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
                  <button
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Ver"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  
                  <button
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="p-4 border-b border-stone-200">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-stone-600 bg-white border-stone-300 rounded focus:ring-stone-500"
              />
              <span className="font-medium text-stone-900">Selecionar Todos</span>
            </div>
          </div>
          
          <div className="divide-y divide-stone-200">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="p-4 hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedAssets.includes(asset.id)}
                    onChange={() => handleSelectAsset(asset.id)}
                    className="w-4 h-4 text-stone-600 bg-white border-stone-300 rounded focus:ring-stone-500"
                  />
                  
                  <img
                    src={asset.thumbnailUrl}
                    alt={asset.alt}
                    className="w-12 h-12 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-stone-900">{asset.title}</h3>
                    <p className="text-stone-600 text-sm">{asset.description}</p>
                  </div>
                  
                  <div className="text-sm text-stone-500 text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {getTypeIcon(asset.type)}
                      <span>{asset.type}</span>
                    </div>
                    <div>{formatFileSize(asset.fileSize)}</div>
                    <div>{formatDate(asset.createdAt)}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">Nenhum ficheiro encontrado</h3>
          <p className="text-stone-600 mb-4">
            {searchTerm || selectedType !== 'all'
              ? 'Tente ajustar os filtros de pesquisa'
              : 'Comece fazendo upload dos seus primeiros ficheiros'
            }
          </p>
          {!searchTerm && selectedType === 'all' && (
            <button className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">
              Upload Primeiro Ficheiro
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaManager;
