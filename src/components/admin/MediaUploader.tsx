import React, { useState, useCallback } from 'react';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  Link, 
  Star,
  Move,
  Eye,
  Download,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { ProjectMedia } from '../../types';
import { FirebaseService } from '../../services/firebaseService';

interface MediaUploaderProps {
  projectId?: string;
  images: ProjectMedia[];
  videos: ProjectMedia[];
  onImagesChange: (images: ProjectMedia[]) => void;
  onVideosChange: (videos: ProjectMedia[]) => void;
  maxImages?: number;
  maxVideos?: number;
  maxImageSizeMB?: number;
  maxVideoSizeMB?: number;
}

interface UploadProgress {
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  projectId,
  images = [],
  videos = [],
  onImagesChange,
  onVideosChange,
  maxImages = 6,
  maxVideos = 2,
  maxImageSizeMB = 10,
  maxVideoSizeMB = 100
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [showLinkModal, setShowLinkModal] = useState<'image' | 'video' | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');

  // Validação de ficheiros
  const validateFile = (file: File, type: 'image' | 'video'): string | null => {
    const maxSize = type === 'image' ? maxImageSizeMB : maxVideoSizeMB;
    const maxSizeBytes = maxSize * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      return `Ficheiro muito grande. Máximo: ${maxSize}MB`;
    }

    if (type === 'image') {
      if (!file.type.startsWith('image/')) {
        return 'Formato inválido. Use JPG, PNG, WebP ou GIF';
      }
    } else {
      const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/wmv'];
      if (!validVideoTypes.includes(file.type)) {
        return 'Formato inválido. Use MP4, WebM, OGG, AVI, MOV ou WMV';
      }
    }

    return null;
  };

  // Upload de ficheiro
  const uploadFile = async (file: File, type: 'image' | 'video'): Promise<ProjectMedia | null> => {
    const uploadId = `${Date.now()}-${Math.random()}`;
    
    try {
      // Validar ficheiro
      const validationError = validateFile(file, type);
      if (validationError) {
        throw new Error(validationError);
      }

      // Verificar limites
      if (type === 'image' && images.length >= maxImages) {
        throw new Error(`Máximo de ${maxImages} imagens permitidas`);
      }
      if (type === 'video' && videos.length >= maxVideos) {
        throw new Error(`Máximo de ${maxVideos} vídeos permitidos`);
      }

      // Iniciar progress
      setUploadProgress(prev => [...prev, {
        id: uploadId,
        progress: 0,
        status: 'uploading'
      }]);

      // Upload para Firebase
      const timestamp = Date.now();
      const filename = `projects/${projectId || 'temp'}/${type}s/${timestamp}_${file.name}`;
      
      const downloadURL = await FirebaseService.uploadFile(
        file,
        filename,
        (progress) => {
          setUploadProgress(prev => prev.map(p => 
            p.id === uploadId 
              ? { ...p, progress: progress.progress }
              : p
          ));
        }
      );

      // Criar objeto ProjectMedia
      const mediaItem: ProjectMedia = {
        id: `${type}_${timestamp}`,
        type,
        url: downloadURL,
        title: linkTitle || file.name.split('.')[0],
        order: type === 'image' ? images.length : videos.length,
        filename: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString(),
        source: 'upload'
      };

      // Se for imagem, gerar thumbnail
      if (type === 'image') {
        mediaItem.thumbnailUrl = downloadURL; // Para imagens, thumbnail é a própria imagem
        mediaItem.alt = linkTitle || file.name.split('.')[0];
      }

      // Completar upload
      setUploadProgress(prev => prev.map(p => 
        p.id === uploadId 
          ? { ...p, progress: 100, status: 'completed' }
          : p
      ));

      // Remover progress após 2 segundos
      setTimeout(() => {
        setUploadProgress(prev => prev.filter(p => p.id !== uploadId));
      }, 2000);

      return mediaItem;

    } catch (error) {
      console.error('Erro no upload:', error);
      setUploadProgress(prev => prev.map(p => 
        p.id === uploadId 
          ? { ...p, status: 'error', error: error instanceof Error ? error.message : 'Erro no upload' }
          : p
      ));

      setTimeout(() => {
        setUploadProgress(prev => prev.filter(p => p.id !== uploadId));
      }, 5000);

      return null;
    }
  };

  // Handle file drop
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    
    for (const file of files) {
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      const mediaItem = await uploadFile(file, type);
      
      if (mediaItem) {
        if (type === 'image') {
          onImagesChange([...images, mediaItem]);
        } else {
          onVideosChange([...videos, mediaItem]);
        }
      }
    }
  }, [images, videos, onImagesChange, onVideosChange, projectId]);

  // Handle file input
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      const mediaItem = await uploadFile(file, type);
      
      if (mediaItem) {
        if (type === 'image') {
          onImagesChange([...images, mediaItem]);
        } else {
          onVideosChange([...videos, mediaItem]);
        }
      }
    }

    // Reset input
    e.target.value = '';
  };

  // Adicionar link externo
  const handleAddLink = () => {
    if (!linkUrl || !showLinkModal) return;

    const mediaItem: ProjectMedia = {
      id: `${showLinkModal}_${Date.now()}`,
      type: showLinkModal,
      url: linkUrl,
      title: linkTitle || 'Media externa',
      order: showLinkModal === 'image' ? images.length : videos.length,
      uploadedAt: new Date().toISOString(),
      source: 'link'
    };

    if (showLinkModal === 'image') {
      mediaItem.thumbnailUrl = linkUrl;
      mediaItem.alt = linkTitle || 'Imagem externa';
      onImagesChange([...images, mediaItem]);
    } else {
      onVideosChange([...videos, mediaItem]);
    }

    setLinkUrl('');
    setLinkTitle('');
    setShowLinkModal(null);
  };

  // Remover media
  const removeMedia = (id: string, type: 'image' | 'video') => {
    if (type === 'image') {
      onImagesChange(images.filter(img => img.id !== id));
    } else {
      onVideosChange(videos.filter(vid => vid.id !== id));
    }
  };

  // Definir como principal
  const setAsMain = (id: string, type: 'image' | 'video') => {
    if (type === 'image') {
      const updatedImages = images.map(img => ({
        ...img,
        isMain: img.id === id
      }));
      onImagesChange(updatedImages);
    }
  };

  // Reordenar media
  const moveMedia = (id: string, direction: 'up' | 'down', type: 'image' | 'video') => {
    const mediaArray = type === 'image' ? images : videos;
    const currentIndex = mediaArray.findIndex(item => item.id === id);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= mediaArray.length) return;
    
    const newArray = [...mediaArray];
    [newArray[currentIndex], newArray[newIndex]] = [newArray[newIndex], newArray[currentIndex]];
    
    // Atualizar ordem
    const updatedArray = newArray.map((item, index) => ({
      ...item,
      order: index
    }));
    
    if (type === 'image') {
      onImagesChange(updatedArray);
    } else {
      onVideosChange(updatedArray);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-stone-400 bg-stone-50'
            : 'border-stone-300 hover:border-stone-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-stone-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-stone-900 mb-2">
          Arraste ficheiros ou clique para selecionar
        </h3>
        <p className="text-stone-600 mb-4">
          Máximo: {maxImages} imagens ({maxImageSizeMB}MB cada) e {maxVideos} vídeos ({maxVideoSizeMB}MB cada)
        </p>
        
        <div className="flex justify-center gap-4">
          <label className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors cursor-pointer">
            <ImageIcon className="w-4 h-4 inline mr-2" />
            Selecionar Imagens
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileInput(e, 'image')}
            />
          </label>
          
          <label className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors cursor-pointer">
            <Video className="w-4 h-4 inline mr-2" />
            Selecionar Vídeos
            <input
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileInput(e, 'video')}
            />
          </label>
          
          <button
            onClick={() => setShowLinkModal('image')}
            className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-500 transition-colors"
          >
            <Link className="w-4 h-4 inline mr-2" />
            Link Imagem
          </button>
          
          <button
            onClick={() => setShowLinkModal('video')}
            className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-500 transition-colors"
          >
            <Link className="w-4 h-4 inline mr-2" />
            Link Vídeo
          </button>
        </div>
      </div>

      {/* Progress Indicators */}
      {uploadProgress.length > 0 && (
        <div className="space-y-2">
          {uploadProgress.map((progress) => (
            <div key={progress.id} className="bg-white border border-stone-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-stone-900">
                  {progress.status === 'uploading' && 'A carregar...'}
                  {progress.status === 'completed' && 'Concluído!'}
                  {progress.status === 'error' && 'Erro no upload'}
                </span>
                <div className="flex items-center gap-2">
                  {progress.status === 'uploading' && (
                    <span className="text-sm text-stone-600">{Math.round(progress.progress)}%</span>
                  )}
                  {progress.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {progress.status === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
              
              {progress.status === 'uploading' && (
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div
                    className="bg-stone-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>
              )}
              
              {progress.status === 'error' && progress.error && (
                <p className="text-sm text-red-600 mt-1">{progress.error}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-stone-900 mb-4">
            Imagens ({images.length}/{maxImages})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={image.id} className="relative group">
                <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden">
                  <img
                    src={image.thumbnailUrl || image.url}
                    alt={image.alt || image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay com ações */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    {!image.isMain && (
                      <button
                        onClick={() => setAsMain(image.id, 'image')}
                        className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                        title="Definir como principal"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => window.open(image.url, '_blank')}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      title="Ver imagem"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => removeMedia(image.id, 'image')}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Remover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Badge principal */}
                {image.isMain && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Principal
                  </div>
                )}
                
                {/* Badge fonte */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {image.source === 'upload' ? 'Upload' : 'Link'}
                </div>
                
                {/* Título */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 rounded-b-lg">
                  <p className="text-sm truncate">{image.title}</p>
                </div>
                
                {/* Controles de ordem */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col gap-1">
                    {index > 0 && (
                      <button
                        onClick={() => moveMedia(image.id, 'up', 'image')}
                        className="p-1 bg-stone-600 text-white rounded hover:bg-stone-700 transition-colors"
                        title="Mover para cima"
                      >
                        <Move className="w-3 h-3 rotate-180" />
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        onClick={() => moveMedia(image.id, 'down', 'image')}
                        className="p-1 bg-stone-600 text-white rounded hover:bg-stone-700 transition-colors"
                        title="Mover para baixo"
                      >
                        <Move className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {videos.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-stone-900 mb-4">
            Vídeos ({videos.length}/{maxVideos})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <div key={video.id} className="relative group">
                <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-stone-400" />
                    </div>
                  )}
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                      <Video className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Overlay com ações */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(video.url, '_blank')}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      title="Ver vídeo"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => removeMedia(video.id, 'video')}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Remover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Badge fonte */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {video.source === 'upload' ? 'Upload' : 'Link'}
                </div>
                
                {/* Duração */}
                {video.duration && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {video.duration}
                  </div>
                )}
                
                {/* Título */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 rounded-b-lg">
                  <p className="text-sm truncate">{video.title}</p>
                </div>
                
                {/* Controles de ordem */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col gap-1">
                    {index > 0 && (
                      <button
                        onClick={() => moveMedia(video.id, 'up', 'video')}
                        className="p-1 bg-stone-600 text-white rounded hover:bg-stone-700 transition-colors"
                        title="Mover para cima"
                      >
                        <Move className="w-3 h-3 rotate-180" />
                      </button>
                    )}
                    {index < videos.length - 1 && (
                      <button
                        onClick={() => moveMedia(video.id, 'down', 'video')}
                        className="p-1 bg-stone-600 text-white rounded hover:bg-stone-700 transition-colors"
                        title="Mover para baixo"
                      >
                        <Move className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">
                Adicionar Link {showLinkModal === 'image' ? 'de Imagem' : 'de Vídeo'}
              </h3>
              <button
                onClick={() => setShowLinkModal(null)}
                className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder={showLinkModal === 'image' 
                    ? 'https://exemplo.com/imagem.jpg' 
                    : 'https://youtube.com/watch?v=...'
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  placeholder="Título do media"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLinkModal(null)}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddLink}
                disabled={!linkUrl}
                className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
