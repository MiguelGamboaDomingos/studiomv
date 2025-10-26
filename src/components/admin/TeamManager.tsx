import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Star,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Globe,
  User
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email?: string;
  phone?: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    behance?: string;
    website?: string;
  };
  skills: string[];
  featured: boolean;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const TeamManager: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  // Simular carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      const mockTeamMembers: TeamMember[] = [
        {
          id: '1',
          name: 'Miguel Vieira',
          role: 'Director & Founder',
          bio: 'Com mais de 10 anos de experiência em produção audiovisual, Miguel fundou o MV Studio com a visão de criar conteúdo cinematográfico de alta qualidade.',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
          email: 'miguel@mvstudio.pt',
          phone: '+351 912 345 678',
          socialLinks: {
            linkedin: 'https://linkedin.com/in/miguelvieira',
            instagram: 'https://instagram.com/miguelvieira',
            website: 'https://miguelvieira.pt'
          },
          skills: ['Direção', 'Cinematografia', 'Produção', 'Storytelling'],
          featured: true,
          active: true,
          order: 1,
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-01-01T10:00:00Z',
        },
        {
          id: '2',
          name: 'Ana Costa',
          role: 'Creative Director',
          bio: 'Especialista em narrativa visual e design, Ana traz uma perspectiva única para cada projeto, garantindo que cada história seja contada de forma impactante.',
          avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
          email: 'ana@mvstudio.pt',
          socialLinks: {
            linkedin: 'https://linkedin.com/in/anacosta',
            behance: 'https://behance.net/anacosta',
            instagram: 'https://instagram.com/anacosta'
          },
          skills: ['Design', 'Storytelling', 'Art Direction', 'Motion Graphics'],
          featured: true,
          active: true,
          order: 2,
          createdAt: '2024-01-05T10:00:00Z',
          updatedAt: '2024-01-05T10:00:00Z',
        },
        {
          id: '3',
          name: 'João Silva',
          role: 'Editor & Colorist',
          bio: 'Especialista em pós-produção com foco em color grading e edição narrativa. João transforma material bruto em obras cinematográficas.',
          avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
          email: 'joao@mvstudio.pt',
          socialLinks: {
            linkedin: 'https://linkedin.com/in/joaosilva',
            instagram: 'https://instagram.com/joaosilva'
          },
          skills: ['Edição', 'Color Grading', 'Sound Design', 'VFX'],
          featured: false,
          active: true,
          order: 3,
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-10T10:00:00Z',
        },
      ];
      setTeamMembers(mockTeamMembers);
      setFilteredMembers(mockTeamMembers);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar membros
  useEffect(() => {
    let filtered = teamMembers;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredMembers(filtered);
  }, [teamMembers, searchTerm]);

  const handleToggleActive = (id: string) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id ? { ...member, active: !member.active } : member
    ));
  };

  const handleToggleFeatured = (id: string) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id ? { ...member, featured: !member.featured } : member
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este membro da equipa?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'website':
        return <Globe className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
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
          <h1 className="text-2xl font-bold text-stone-900">Gestão de Equipa</h1>
          <p className="text-stone-600">Gerencie todos os membros da equipa</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Membro
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Pesquisar membros da equipa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header with Avatar */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {/* Status Badges */}
                  <div className="absolute -top-2 -right-2 flex flex-col gap-1">
                    {member.featured && (
                      <span className="bg-yellow-500 text-white text-xs p-1 rounded-full">
                        <Star className="w-3 h-3" />
                      </span>
                    )}
                    <span className={`text-white text-xs p-1 rounded-full ${
                      member.active ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {member.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleToggleActive(member.id)}
                    className={`p-1 rounded ${
                      member.active 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-stone-400 hover:bg-stone-50'
                    }`}
                    title={member.active ? 'Desativar' : 'Ativar'}
                  >
                    {member.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleToggleFeatured(member.id)}
                    className={`p-1 rounded ${
                      member.featured 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-stone-400 hover:bg-stone-50'
                    }`}
                    title={member.featured ? 'Remover destaque' : 'Destacar'}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 text-lg">{member.name}</h3>
                <p className="text-stone-600 text-sm mb-3">{member.role}</p>
                <p className="text-stone-600 text-sm line-clamp-3">{member.bio}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="px-6 pb-4">
              <div className="space-y-2">
                {member.email && (
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="px-6 pb-4">
              <h4 className="text-sm font-medium text-stone-900 mb-2">Competências</h4>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-stone-100 text-stone-700 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            {Object.keys(member.socialLinks).length > 0 && (
              <div className="px-6 pb-4">
                <h4 className="text-sm font-medium text-stone-900 mb-2">Redes Sociais</h4>
                <div className="flex gap-2">
                  {Object.entries(member.socialLinks).map(([platform, url]) => (
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                        title={platform}
                      >
                        {getSocialIcon(platform)}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-stone-500">
                  Ordem: {member.order}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingMember(member)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(member.id)}
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
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">Nenhum membro encontrado</h3>
          <p className="text-stone-600 mb-4">
            {searchTerm 
              ? 'Tente ajustar o termo de pesquisa'
              : 'Comece adicionando o primeiro membro da equipa'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
            >
              Adicionar Primeiro Membro
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamManager;
