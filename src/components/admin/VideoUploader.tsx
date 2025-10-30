import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Link, 
  X, 
  Play, 
  FileVideo, 
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import { FirebaseService, UploadProgress } from '../../services/firebaseService';

interface VideoUploaderProps {
  onVideoAdded: (videoData: VideoData) => void;
  onRemove?: () => void;
  existingVideo?: VideoData;
  maxSizeMB?: number;
}

export interface VideoData {
  id?: string;
  type: 'upload' | 'link';
  url: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  size?: number;
  filename?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  onVideoAdded,
  onRemove,
  existingVideo,
  maxSizeMB = 100
}) => {
  const [mode, setMode] = useState<'upload' | 'link'>('link');
  const [videoLink, setVideoLink] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatos de vídeo suportados
  const supportedFormats = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/avi',
    'video/mov',
    'video/wmv'
  ];

  const validateVideoFile = (file: File): string | null => {
    if (!supportedFormats.includes(file.type)) {
      return 'Formato de vídeo não suportado. Use MP4, WebM, OGG, AVI, MOV ou WMV.';
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `O ficheiro é muito grande. Tamanho máximo: ${maxSizeMB}MB.`;
    }
    
    return null;
  };

  const validateVideoLink = (url: string): string | null => {
    try {
      new URL(url);
      
      // Verificar se é um link de vídeo válido
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv'];
      const isDirectVideo = videoExtensions.some(ext => url.toLowerCase().includes(ext));
      
      // Verificar se é YouTube, Vimeo, etc.
      const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
      const isVimeo = url.includes('vimeo.com');
      const isOtherPlatform = isYouTube || isVimeo;
      
      if (!isDirectVideo && !isOtherPlatform) {
        return 'Por favor, forneça um link direto para o vídeo ou um link do YouTube/Vimeo.';
      }
      
      return null;
    } catch {
      return 'Por favor, forneça um URL válido.';
    }
  };

  const handleFileSelect = async (file: File) => {
    setError(null);
    
    const validationError = validateVideoFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const timestamp = Date.now();
      const filename = `videos/${timestamp}_${file.name}`;
      
      setUploadProgress({ progress: 0, status: 'uploading' });
      
      const downloadURL = await FirebaseService.uploadFile(
        file,
        filename,
        (progress) => setUploadProgress(progress)
      );

      // Criar thumbnail (opcional - pode ser implementado depois)
      const videoData: VideoData = {
        type: 'upload',
        url: downloadURL,
        title: videoTitle || file.name.replace(/\.[^/.]+$/, ''),
        filename: file.name,
        size: file.size,
      };

      // Salvar no Firestore
      const assetId = await FirebaseService.createMediaAsset({
        name: videoData.title,
        type: 'video',
        url: downloadURL,
        size: file.size,
        filename: file.name,
        path: filename,
      });

      videoData.id = assetId;
      onVideoAdded(videoData);
      
      setUploadProgress({ progress: 100, status: 'completed', url: downloadURL });
      setVideoTitle('');
      
    } catch (error) {
      console.error('Erro no upload:', error);
      setError('Erro ao fazer upload do vídeo. Tente novamente.');
      setUploadProgress(null);
    }
  };

  const handleLinkSubmit = () => {
    setError(null);
    
    if (!videoLink.trim()) {
      setError('Por favor, forneça um link para o vídeo.');
      return;
    }
    
    if (!videoTitle.trim()) {
      setError('Por favor, forneça um título para o vídeo.');
      return;
    }
    
    const validationError = validateVideoLink(videoLink);
    if (validationError) {
      setError(validationError);
      return;
    }

    const videoData: VideoData = {
      type: 'link',
      url: videoLink,
      title: videoTitle,
    };

    onVideoAdded(videoData);
    setVideoLink('');
    setVideoTitle('');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (existingVideo) {
    return (
      <div className="bg-white rounded-lg border border-stone-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileVideo className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-stone-900">{existingVideo.title}</h4>
              <p className="text-sm text-stone-500">
                {existingVideo.type === 'upload' ? 'Ficheiro carregado' : 'Link externo'}
                {existingVideo.size && ` • ${formatFileSize(existingVideo.size)}`}
              </p>
            </div>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-1 text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <a
            href={existingVideo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
          >
            <Play className="w-4 h-4" />
            Ver vídeo
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Aviso sobre links externos */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> Use apenas links externos de plataformas como YouTube, Vimeo, Google Drive, Dropbox ou OneDrive. Não é possível fazer upload direto de arquivos.
        </p>
      </div>

      {/* Upload Mode - Desabilitado */}
      {false && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-900 mb-2">
              Título do Vídeo
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Digite o título do vídeo..."
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            />
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver
                ? 'border-stone-400 bg-stone-50'
                : 'border-stone-300 hover:border-stone-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mx-auto">
                <FileVideo className="w-6 h-6 text-stone-600" />
              </div>
              
              <div>
                <p className="text-stone-900 font-medium mb-1">
                  Arraste um vídeo aqui ou clique para selecionar
                </p>
                <p className="text-stone-500 text-sm">
                  Formatos suportados: MP4, WebM, OGG, AVI, MOV, WMV
                </p>
                <p className="text-stone-500 text-sm">
                  Tamanho máximo: {maxSizeMB}MB
                </p>
              </div>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
              >
                Selecionar Ficheiro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Mode - Sempre ativo */}
      <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-900 mb-2">
              Título do Vídeo
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Digite o título do vídeo..."
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-900 mb-2">
              Link do Vídeo
            </label>
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://youtube.com/watch?v=... ou link direto"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            />
            <p className="text-xs text-stone-500 mt-1">
              Suporta YouTube, Vimeo ou links diretos para ficheiros de vídeo
            </p>
          </div>

          <button
            onClick={handleLinkSubmit}
            disabled={!videoLink.trim() || !videoTitle.trim()}
            className="w-full bg-stone-800 text-white py-2 px-4 rounded-lg hover:bg-stone-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
          >
            Adicionar Vídeo
          </button>
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            {uploadProgress.status === 'uploading' && (
              <Loader className="w-5 h-5 text-blue-600 animate-spin" />
            )}
            {uploadProgress.status === 'completed' && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {uploadProgress.status === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-900">
                {uploadProgress.status === 'uploading' && 'A carregar vídeo...'}
                {uploadProgress.status === 'completed' && 'Upload concluído!'}
                {uploadProgress.status === 'error' && 'Erro no upload'}
              </p>
              
              {uploadProgress.status === 'uploading' && (
                <div className="mt-2">
                  <div className="bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    {Math.round(uploadProgress.progress)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
