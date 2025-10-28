import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Zap, Circle } from 'lucide-react';
import StandardButton from '../components/StandardButton';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "mvstudiointermov@gmail.com",
      description: "Resposta em até 24h"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefone",
      info: "+244 949 838 924",
      description: "Seg-Sex: 8h-17h"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      info: "Luanda, 21 de Janeiro, de frente à Clínica Multiperfil",
      description: "Reuniões presenciais"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horário",
      info: "Segunda a Sexta",
      description: "8:00 - 17:00"
    }
  ];

  const faqs = [
    {
      question: "Qual é o prazo médio para um projeto?",
      answer: "Depende da complexidade, mas geralmente entre 2-6 semanas desde o briefing até à entrega final."
    },
    {
      question: "Trabalham com que tipo de orçamentos?",
      answer: "Temos soluções para diferentes orçamentos, desde projetos mais simples a produções de grande escala."
    },
    {
      question: "Fazem deslocações para filmagens?",
      answer: "Sim, trabalhamos em todo o território nacional e internacional mediante orçamento específico."
    },
    {
      question: "Que equipamento utilizam?",
      answer: "Equipamento profissional 4K, drones, estabilizadores e iluminação cinematográfica de última geração."
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(120,113,108,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,113,108,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header Eletrificado */}
        <div className="text-center mb-20 relative">
          {/* Electric Effect Behind Title */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-96 h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent animate-pulse"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 relative">
            Vamos <span className="text-stone-400 font-normal">Conversar</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent"></div>
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Conte-nos sobre o seu projeto e transformaremos a sua visão em realidade cinematográfica.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Form Eletrificado */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-stone-950/40 via-stone-950/20 to-stone-900/60 backdrop-blur-xl border border-stone-800/30 rounded-3xl p-8 relative overflow-hidden group">
              {/* Electric Border Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-3xl border border-stone-600/50 animate-pulse"></div>
              </div>

              <h2 className="text-3xl font-light text-white mb-8 relative">
                Solicitar <span className="text-stone-400">Orçamento</span>
                <Zap className="inline-block w-6 h-6 ml-2 text-stone-500" />
              </h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-900/40 rounded-lg text-green-400">
                  Mensagem enviada com sucesso! Entraremos em contacto em breve.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-stone-300 text-sm font-light mb-3">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-950/10 backdrop-blur-sm border border-stone-800/30 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-stone-600/60 focus:bg-stone-950/20 transition-all duration-500"
                      placeholder="O seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 text-sm font-light mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-950/10 backdrop-blur-sm border border-stone-800/30 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-stone-600/60 focus:bg-stone-950/20 transition-all duration-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Empresa/Organização
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-950/10 backdrop-blur-sm border border-stone-800/30 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-stone-600/60 focus:bg-stone-950/20 transition-all duration-500"
                      placeholder="Nome da empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Tipo de Projeto *
                    </label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-950/10 backdrop-blur-sm border border-stone-800/30 rounded-xl text-white focus:outline-none focus:border-stone-600/60 focus:bg-stone-950/20 transition-all duration-500"
                    >
                      <option value="">Selecione o tipo de projeto</option>
                      <option value="filmmaking">Filmmaking</option>
                      <option value="fotografia">Fotografia</option>
                      <option value="edicao">Edição Criativa</option>
                      <option value="motion">Motion Graphics</option>
                      <option value="completo">Projeto Completo</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Orçamento Estimado
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-950/10 backdrop-blur-sm border border-stone-800/30 rounded-xl text-white focus:outline-none focus:border-stone-600/60 focus:bg-stone-950/20 transition-all duration-500"
                    >
                      <option value="">Selecione o orçamento</option>
                      <option value="1000-2500">€1.000 - €2.500</option>
                      <option value="2500-5000">€2.500 - €5.000</option>
                      <option value="5000-10000">€5.000 - €10.000</option>
                      <option value="10000+">€10.000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Prazo Desejado
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-950/10 backdrop-blur-sm border border-stone-800/30 rounded-xl text-white focus:outline-none focus:border-stone-600/60 focus:bg-stone-950/20 transition-all duration-500"
                    >
                      <option value="">Selecione o prazo</option>
                      <option value="urgente">Urgente (1-2 semanas)</option>
                      <option value="normal">Normal (3-4 semanas)</option>
                      <option value="flexivel">Flexível (1-2 meses)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Descrição do Projeto *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-stone-950/10 backdrop-blur-sm border border-stone-800/30 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-stone-600/60 focus:bg-stone-950/20 transition-all duration-500 resize-none"
                    placeholder="Conte-nos sobre o seu projeto, objetivos, público-alvo e qualquer informação relevante..."
                  />
                </div>

                <StandardButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Pedido de Orçamento
                </StandardButton>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-stone-800/30 rounded-lg flex items-center justify-center group-hover:bg-stone-700/40 transition-colors">
                      <div className="text-stone-400">{info.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{info.title}</h3>
                      <p className="text-gray-300 font-medium mb-1">{info.info}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-stone-400" />
                Siga-nos
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['Instagram', 'YouTube', 'Vimeo', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 bg-stone-950/10 border border-stone-800/30 rounded-lg text-stone-300 hover:text-white hover:border-stone-600/40 transition-all duration-300 text-center text-sm"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4">Localização</h3>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Luanda, Angola</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Perguntas <span className="text-stone-400">Frequentes</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Respostas às dúvidas mais comuns dos nossos clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-white font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center bg-stone-900/20 border border-stone-800/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Projeto Urgente?
          </h2>
          <p className="text-stone-300 mb-6">
            Para projetos com prazos apertados, contacte-nos diretamente.
          </p>
          <a
            href="tel:+244949838924"
            className={`relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold shadow-lg overflow-hidden group transform transition-all duration-500 ease-out ${
              isButtonHovered
                ? 'bg-gray-800 border-2 border-red-500 shadow-red-500/25 scale-105'
                : 'bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 shadow-stone-500/25 scale-100 hover:scale-105'
            }`}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span className={`relative z-10 flex items-center gap-2 transition-all duration-300 ease-out ${
              isButtonHovered ? 'transform -translate-y-0.5' : 'transform translate-y-0'
            }`}>
              <Circle className={`w-2 h-2 fill-red-500 text-red-500 transition-all duration-300 ease-out ${
                isButtonHovered
                  ? 'opacity-100 scale-100 animate-pulse'
                  : 'opacity-0 scale-0'
              }`} />
              <Phone className="w-5 h-5" />
              Ligar Agora
            </span>

            {/* Background transition overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 transition-opacity duration-500 ease-out ${
              isButtonHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>

            {/* Efeito de raios elétricos quando hover */}
            <div className={`absolute inset-0 transition-opacity duration-300 ease-out ${
              isButtonHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 animate-electric-flow opacity-60">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '0.2s'}}></div>
              </div>

              <div className="absolute inset-0 animate-electric-flow-2 opacity-40">
                <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{animationDelay: '0.1s'}}></div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          50% { transform: translate(-1px, 1px) }
        }

        @keyframes electric-flow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes electric-flow-2 {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        .animate-electric-flow {
          animation: electric-flow 1.5s ease-in-out infinite;
        }

        .animate-electric-flow-2 {
          animation: electric-flow-2 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;