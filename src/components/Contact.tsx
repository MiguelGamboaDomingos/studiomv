import React from 'react';
import { Mail, Phone, MapPin, Send, MousePointerClick, Loader2 } from 'lucide-react';
import { useContactForm, getFieldError, hasFieldError, PROJECT_TYPES, BUDGET_OPTIONS } from '../hooks/useContactForm';
import { useNotifications, NotificationManager } from './Notification';

const Contact: React.FC = () => {
  const { formState, updateField, submitForm, resetForm } = useContactForm();
  const { notifications, removeNotification, showSuccess, showError } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await submitForm();

    if (success) {
      showSuccess(
        'Mensagem Enviada!',
        'Obrigado pelo seu contacto. Responderemos em breve.',
        { duration: 6000 }
      );
    } else {
      showError(
        'Erro no Envio',
        'Não foi possível enviar a mensagem. Verifique os dados e tente novamente.',
        { duration: 8000 }
      );
    }
  };

  const handleChange = (field: string, value: string) => {
    updateField(field as any, value);
  };

  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,69,19,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,69,19,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Film Grain */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(circle, transparent 1px, rgba(139,69,19,0.1) 1px)`,
             backgroundSize: '3px 3px',
             animation: 'grain 6s steps(10) infinite'
           }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Vamos criar algo
            <span className="text-amber-900 block">extraordinário juntos</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Conte-nos sobre o seu projeto e transformaremos a sua visão em realidade cinematográfica.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Spline 3D Scene - Left Side */}
            <div className="relative hidden lg:block">
              <div className="w-full h-[500px] lg:h-[600px] relative transition-all duration-500 hover:scale-105 animate-float-slow">
                <spline-viewer url="https://prod.spline.design/jTMyGBieAUQfvg0X/scene.splinecode"></spline-viewer>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-800/20 via-orange-600/20 to-amber-900/20 blur-3xl animate-pulse pointer-events-none"></div>
              </div>

              {/* Click Hint */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-amber-800/30 px-4 py-2 rounded-full animate-bounce">
                <MousePointerClick className="w-5 h-5 text-amber-800" />
                <span className="text-white text-sm font-medium">Clique aqui para interagir</span>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div>
              {/* Film Strip Contact Form */}
              <div className="relative">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-lg shadow-2xl">
              {/* Film Perforations */}
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-black/80 rounded-full mx-auto"></div>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-between py-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-black/80 rounded-full mx-auto"></div>
                ))}
              </div>

              {/* Form Container */}
              <div className="mx-8 sm:mx-12 bg-white/5 backdrop-blur-md rounded-lg p-4 sm:p-8 relative overflow-hidden border border-white/10">
                {/* Interactive Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-amber-800/30 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-amber-800/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-4 right-4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {/* General Error Message */}
                  {getFieldError(formState.errors, 'general') && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm">{getFieldError(formState.errors, 'general')}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.data.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30 ${
                          hasFieldError(formState.errors, 'name')
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-white/20 focus:border-amber-800 focus:ring-amber-800/20'
                        }`}
                        placeholder="O seu nome"
                        aria-invalid={hasFieldError(formState.errors, 'name')}
                        aria-describedby={hasFieldError(formState.errors, 'name') ? 'name-error' : undefined}
                      />
                      {hasFieldError(formState.errors, 'name') && (
                        <p id="name-error" className="mt-1 text-red-400 text-xs">
                          {getFieldError(formState.errors, 'name')}
                        </p>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.data.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30 ${
                          hasFieldError(formState.errors, 'email')
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-white/20 focus:border-amber-800 focus:ring-amber-800/20'
                        }`}
                        placeholder="seu@email.com"
                        aria-invalid={hasFieldError(formState.errors, 'email')}
                        aria-describedby={hasFieldError(formState.errors, 'email') ? 'email-error' : undefined}
                      />
                      {hasFieldError(formState.errors, 'email') && (
                        <p id="email-error" className="mt-1 text-red-400 text-xs">
                          {getFieldError(formState.errors, 'email')}
                        </p>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    

                    <div className="relative group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formState.data.company || ''}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30"
                        placeholder="Nome da empresa"
                      />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Tipo de Projeto *
                      </label>
                      <select
                        name="projectType"
                        value={formState.data.projectType}
                        onChange={(e) => handleChange('projectType', e.target.value)}
                        required
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white focus:outline-none focus:ring-2 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30 ${
                          hasFieldError(formState.errors, 'projectType')
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-white/20 focus:border-amber-800 focus:ring-amber-800/20'
                        }`}
                        aria-invalid={hasFieldError(formState.errors, 'projectType')}
                        aria-describedby={hasFieldError(formState.errors, 'projectType') ? 'projectType-error' : undefined}
                      >
                        <option value="" className="bg-black">Selecione o tipo de projeto</option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type.value} value={type.value} className="bg-black">
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {hasFieldError(formState.errors, 'projectType') && (
                        <p id="projectType-error" className="mt-1 text-red-400 text-xs">
                          {getFieldError(formState.errors, 'projectType')}
                        </p>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Orçamento
                      </label>
                      <select
                        name="budget"
                        value={formState.data.budget || ''}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30"
                      >
                        <option value="" className="bg-black">Selecione o orçamento</option>
                        {BUDGET_OPTIONS.map((budget) => (
                          <option key={budget.value} value={budget.value} className="bg-black">
                            {budget.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      value={formState.data.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white/10 transition-all duration-300 resize-none group-hover:border-white/30 ${
                        hasFieldError(formState.errors, 'message')
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-white/20 focus:border-amber-800 focus:ring-amber-800/20'
                      }`}
                      placeholder="Conte-nos sobre o seu projeto..."
                      aria-invalid={hasFieldError(formState.errors, 'message')}
                      aria-describedby={hasFieldError(formState.errors, 'message') ? 'message-error' : undefined}
                    />
                    {hasFieldError(formState.errors, 'message') && (
                      <p id="message-error" className="mt-1 text-red-400 text-xs">
                        {getFieldError(formState.errors, 'message')}
                      </p>
                    )}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <button
                    type="submit"
                    disabled={formState.isSubmitting || !formState.isValid}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-emerald-600/20 via-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 text-white font-bold rounded-lg hover:from-emerald-500/30 hover:via-teal-400/30 hover:to-cyan-400/30 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-300/10 to-cyan-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {formState.isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
                          Enviar Mensagem
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-700" />
                  </button>
                </form>
              </div>

                {/* Film Info */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-4 text-white/60 text-sm font-bold">
                    <span>CONTACT</span>
                    <span>•</span>
                    <span>MV STUDIO</span>
                    <span>•</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 lg:mt-12 max-w-4xl mx-auto">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:border-amber-800/40 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                <Mail className="w-8 h-8 text-amber-800" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-white font-medium mb-1">Email</h3>
              <p className="text-gray-300">mvstudiointermov@gmail.com</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:border-amber-800/40 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                <Phone className="w-8 h-8 text-amber-800" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-white font-medium mb-1">Telefone</h3>
              <p className="text-gray-300">+244 949 838 924</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:border-amber-800/40 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                <MapPin className="w-8 h-8 text-amber-800" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-white font-medium mb-1">Localização</h3>
              <p className="text-gray-300">Luanda, 21 de Janeiro, de frente à Clínica Multiperfil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Manager */}
      <NotificationManager
        notifications={notifications}
        onRemove={removeNotification}
      />
    </section>
  );
};

export default Contact;