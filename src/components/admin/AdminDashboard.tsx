import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  Star, 
  Mail, 
  TrendingUp, 
  Eye,
  Calendar,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalServices: number;
  activeServices: number;
  totalTeamMembers: number;
  totalTestimonials: number;
  unreadContacts: number;
  totalContacts: number;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'contact' | 'testimonial' | 'service';
  title: string;
  description: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    publishedProjects: 0,
    totalServices: 0,
    activeServices: 0,
    totalTeamMembers: 0,
    totalTestimonials: 0,
    unreadContacts: 0,
    totalContacts: 0,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Simular carregamento de dados
    setStats({
      totalProjects: 24,
      publishedProjects: 20,
      totalServices: 8,
      activeServices: 6,
      totalTeamMembers: 5,
      totalTestimonials: 12,
      unreadContacts: 3,
      totalContacts: 45,
    });

    setRecentActivity([
      {
        id: '1',
        type: 'contact',
        title: 'Nova mensagem de contacto',
        description: 'João Silva enviou uma mensagem sobre vídeo corporativo',
        timestamp: '2024-03-15T10:30:00Z',
      },
      {
        id: '2',
        type: 'project',
        title: 'Projeto publicado',
        description: 'Wedding Dreams foi publicado no portfolio',
        timestamp: '2024-03-14T16:45:00Z',
      },
      {
        id: '3',
        type: 'testimonial',
        title: 'Novo testemunho',
        description: 'Maria Costa deixou um testemunho 5 estrelas',
        timestamp: '2024-03-14T14:20:00Z',
      },
    ]);
  }, []);

  const statCards = [
    {
      title: 'Projetos',
      value: stats.totalProjects,
      subtitle: `${stats.publishedProjects} publicados`,
      icon: Briefcase,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      title: 'Serviços',
      value: stats.totalServices,
      subtitle: `${stats.activeServices} ativos`,
      icon: Activity,
      color: 'bg-green-500',
      trend: '+5%',
    },
    {
      title: 'Equipa',
      value: stats.totalTeamMembers,
      subtitle: 'membros ativos',
      icon: Users,
      color: 'bg-purple-500',
      trend: '0%',
    },
    {
      title: 'Contactos',
      value: stats.totalContacts,
      subtitle: `${stats.unreadContacts} não lidos`,
      icon: Mail,
      color: 'bg-orange-500',
      trend: '+8%',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Briefcase className="w-4 h-4" />;
      case 'contact':
        return <Mail className="w-4 h-4" />;
      case 'testimonial':
        return <Star className="w-4 h-4" />;
      case 'service':
        return <Activity className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bem-vindo ao Painel Administrativo</h1>
        <p className="text-stone-200">
          Gerencie todo o conteúdo do seu site MV Studio a partir daqui.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {card.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-1">{card.value}</h3>
              <p className="text-stone-600 text-sm">{card.title}</p>
              <p className="text-stone-500 text-xs mt-1">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-stone-600" />
            <h2 className="text-lg font-semibold text-stone-900">Atividade Recente</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-stone-900 text-sm">{activity.title}</h4>
                  <p className="text-stone-600 text-xs mt-1">{activity.description}</p>
                  <p className="text-stone-500 text-xs mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-stone-600" />
            <h2 className="text-lg font-semibold text-stone-900">Ações Rápidas</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
              <Briefcase className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-medium text-stone-900 text-sm">Novo Projeto</h4>
              <p className="text-stone-600 text-xs">Adicionar projeto</p>
            </button>
            
            <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left">
              <Activity className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-medium text-stone-900 text-sm">Novo Serviço</h4>
              <p className="text-stone-600 text-xs">Adicionar serviço</p>
            </button>
            
            <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <Users className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-medium text-stone-900 text-sm">Novo Membro</h4>
              <p className="text-stone-600 text-xs">Adicionar à equipa</p>
            </button>
            
            <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left">
              <Eye className="w-6 h-6 text-orange-600 mb-2" />
              <h4 className="font-medium text-stone-900 text-sm">Ver Site</h4>
              <p className="text-stone-600 text-xs">Abrir em nova aba</p>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-stone-600" />
          <h2 className="text-lg font-semibold text-stone-900">Resumo de Performance</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
            <p className="text-stone-600 text-sm">Projetos Publicados</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
            <p className="text-stone-600 text-sm">Taxa de Satisfação</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">7%</div>
            <p className="text-stone-600 text-sm">Contactos Pendentes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
