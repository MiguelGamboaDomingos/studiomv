import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Eye,
  Search,
  Palette,
  Shield,
  Bell,
  Video,
  Type,
  Image as ImageIcon,
  Play,
  Link,
  MessageSquare,
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { useSettings } from '../../hooks/useFirebase';
import VideoUploader, { VideoData } from './VideoUploader';

const SettingsManagerNew: React.FC = () => {
  const { 
    settings: currentSettings, 
    loading, 
    error, 
    updateSettings 
  } = useSettings();
  
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});

  // Carregar configurações atuais
  useEffect(() => {
    if (currentSettings && currentSettings.length > 0) {
      setSettings(currentSettings[0]);
    } else {
      // Configurações padrão
      setSettings({
        siteName: 'MV Studio',
        tagline: 'Criatividade em Movimento',
        description: 'Estúdio de produção audiovisual especializado em conteúdo cinematográfico de alta qualidade',
        
        heroTitle: 'Criamos Histórias',
        heroSubtitle: 'que Inspiram',
        heroDescription: 'Produção audiovisual de excelência que transforma ideias em experiências cinematográficas inesquecíveis',
        showreelVideoUrl: '',
        showreelThumbnail: '',
        
        sectionTitles: {
          about: 'Sobre Nós',
          services: 'Nossos Serviços',
          portfolio: 'Nosso Portfólio',
          testimonials: 'Testemunhos',
          contact: 'Contacto',
          team: 'Nossa Equipa',
          process: 'Nosso Processo',
          stats: 'Números que Falam'
        },
        
        sectionDescriptions: {
          about: 'Conheça nossa paixão pela arte cinematográfica',
          services: 'Soluções completas em produção audiovisual',
          portfolio: 'Projetos que definem nossa excelência criativa',
          testimonials: 'O que nossos clientes dizem sobre nós',
          contact: 'Vamos criar algo incrível juntos',
          team: 'Os talentos por trás de cada projeto',
          process: 'Como transformamos ideias em realidade',
          stats: 'Resultados que comprovam nossa qualidade'
        },
        
        email: 'info@mvstudio.pt',
        phone: '+244 949 838 924',
        whatsapp: '+244949838924',
        address: 'Luanda, Angola',
        
        socialLinks: {
          instagram: 'https://instagram.com/mvstudio',
          facebook: 'https://facebook.com/mvstudio',
          linkedin: 'https://linkedin.com/company/mvstudio',
          youtube: 'https://youtube.com/@mvstudio',
          vimeo: 'https://vimeo.com/mvstudio',
          behance: 'https://behance.net/mvstudio'
        },
        
        metaTitle: 'MV Studio - Produção Audiovisual Premium',
        metaDescription: 'Estúdio de produção audiovisual em Luanda, Angola. Especializados em vídeos corporativos, casamentos, eventos e conteúdo cinematográfico.',
        metaKeywords: ['produção audiovisual', 'vídeo', 'cinema', 'Luanda', 'Angola', 'casamentos', 'corporativo'],
        
        googleAnalyticsId: '',
        facebookPixelId: '',
        maintenanceMode: false,
        maintenanceMessage: ''
      });
    }
  }, [currentSettings]);

  const tabs = [
    { id: 'general', label: 'Geral', icon: Globe },
    { id: 'hero', label: 'Hero & Showreel', icon: Video },
    { id: 'sections', label: 'Títulos das Seções', icon: Type },
    { id: 'contact', label: 'Contacto', icon: Mail },
    { id: 'social', label: 'Redes Sociais', icon: Instagram },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: Eye },
    { id: 'maintenance', label: 'Manutenção', icon: Shield }
  ];

  const handleSave = async () => {
    try {
      setSaving(true);
      
      if (currentSettings && currentSettings.length > 0) {
        await updateSettings(currentSettings[0].id, settings);
      } else {
        // Criar novas configurações
        const newSettings = {
          ...settings,
          id: 'site-settings',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as SiteSettings;
        
        // Aqui você precisaria de um método createSettings
        console.log('Criar novas configurações:', newSettings);
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleVideoAdded = (videoData: VideoData) => {
    setSettings(prev => ({
      ...prev,
      showreelVideoUrl: videoData.url,
      showreelThumbnail: videoData.thumbnailUrl || ''
    }));
  };

  const updateSectionTitle = (section: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      sectionTitles: {
        ...prev.sectionTitles,
        [section]: value
      }
    }));
  };

  const updateSectionDescription = (section: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      sectionDescriptions: {
        ...prev.sectionDescriptions,
        [section]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-stone-600">
          <Loader className="w-6 h-6 animate-spin" />
          <span>A carregar configurações...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Configurações do Site</h1>
          <p className="text-stone-600">Gerencie todas as configurações e conteúdo do site</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'A guardar...' : saved ? 'Guardado!' : 'Guardar Alterações'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-stone-500 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Informações Gerais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Nome do Site
                </label>
                <input
                  type="text"
                  value={settings.siteName || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Descrição
              </label>
              <textarea
                rows={3}
                value={settings.description || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Hero & Showreel Tab */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Hero Section & Showreel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={settings.heroTitle || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, heroTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={settings.heroSubtitle || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Descrição do Hero
              </label>
              <textarea
                rows={3}
                value={settings.heroDescription || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, heroDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Vídeo Showreel
              </label>
              <p className="text-sm text-stone-600 mb-4">
                Carregue o vídeo showreel principal ou forneça um link externo (YouTube, Vimeo, etc.)
              </p>
              <VideoUploader
                onVideoAdded={handleVideoAdded}
                existingVideo={settings.showreelVideoUrl ? {
                  type: 'link',
                  url: settings.showreelVideoUrl,
                  title: 'Showreel MV Studio'
                } : undefined}
                onRemove={() => setSettings(prev => ({ 
                  ...prev, 
                  showreelVideoUrl: '', 
                  showreelThumbnail: '' 
                }))}
              />
            </div>
          </div>
        )}

        {/* Sections Tab */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Títulos e Descrições das Seções</h2>
            
            {settings.sectionTitles && Object.entries(settings.sectionTitles).map(([key, title]) => (
              <div key={key} className="border border-stone-200 rounded-lg p-4">
                <h3 className="font-medium text-stone-900 mb-3 capitalize">{key}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => updateSectionTitle(key, e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Descrição
                    </label>
                    <input
                      type="text"
                      value={settings.sectionDescriptions?.[key as keyof typeof settings.sectionDescriptions] || ''}
                      onChange={(e) => updateSectionDescription(key, e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Informações de Contacto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={settings.whatsapp || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={settings.address || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Redes Sociais</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  <Instagram className="w-4 h-4 inline mr-2" />
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.instagram || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  <Facebook className="w-4 h-4 inline mr-2" />
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.facebook || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  <Youtube className="w-4 h-4 inline mr-2" />
                  YouTube
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.youtube || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  <Linkedin className="w-4 h-4 inline mr-2" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Vimeo
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.vimeo || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, vimeo: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Behance
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.behance || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, behance: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">SEO & Meta Tags</h2>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={settings.metaTitle || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.metaDescription || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Keywords (separadas por vírgula)
              </label>
              <input
                type="text"
                value={Array.isArray(settings.metaKeywords) ? settings.metaKeywords.join(', ') : ''}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  metaKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Analytics & Tracking</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={settings.googleAnalyticsId || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.facebookPixelId || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, facebookPixelId: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Modo de Manutenção</h2>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={settings.maintenanceMode || false}
                onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                className="rounded border-stone-300 text-stone-600 focus:ring-stone-500"
              />
              <label htmlFor="maintenanceMode" className="text-sm font-medium text-stone-900">
                Ativar modo de manutenção
              </label>
            </div>

            {settings.maintenanceMode && (
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Mensagem de Manutenção
                </label>
                <textarea
                  rows={3}
                  value={settings.maintenanceMessage || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMessage: e.target.value }))}
                  placeholder="O site está temporariamente em manutenção. Voltamos em breve!"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsManagerNew;
