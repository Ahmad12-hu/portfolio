import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, Check, Copy, MessageSquare, PhoneCall, GraduationCap } from 'lucide-react';
import { userProfile } from '../data/portfolioData';

interface ContactProps {
  darkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Opportunité / Collaboration',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userProfile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Opportunité / Collaboration', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className={`py-20 relative transition-colors duration-300 ${
      darkMode ? 'bg-transparent text-emerald-50' : 'bg-[#f0f7f4]/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono backdrop-blur-md shadow-inner">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Me Contacter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Discutons de votre <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Prochain Projet
            </span>
          </h2>
          <p className={`text-base ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>
            Que ce soit pour une opportunité professionnelle, un projet de stage, une mission en freelance ou une collaboration sur un projet à Dakar, contactez-moi !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 backdrop-blur-md transition-all shadow-xl ${
              darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200 shadow-slate-200/50'
            }`}>
              <h3 className="text-xl font-bold tracking-tight">Coordonnées</h3>

              <div className="space-y-4">
                {/* Email Box with copy button */}
                <div className={`p-4 rounded-2xl border space-y-2 backdrop-blur-md ${
                  darkMode ? 'bg-[#02100a]/80 border-emerald-500/20' : 'bg-emerald-50/70 border-emerald-200'
                }`}>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Email direct</div>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`mailto:${userProfile.email}`}
                      className="text-xs sm:text-sm font-bold text-emerald-400 hover:underline truncate"
                    >
                      {userProfile.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors flex-shrink-0 border border-emerald-500/30"
                      title="Copier l'adresse email"
                      id="copy-email-btn"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copiedEmail && (
                    <span className="text-[10px] text-emerald-400 font-mono inline-block">✓ Email copié dans le presse-papier !</span>
                  )}
                </div>

                {/* Location */}
                <div className={`p-4 rounded-2xl border flex items-center gap-3 backdrop-blur-md ${
                  darkMode ? 'bg-[#02100a]/80 border-emerald-500/20' : 'bg-emerald-50/70 border-emerald-200'
                }`}>
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Localisation</div>
                    <div className="text-xs font-bold">{userProfile.location}, {userProfile.country}</div>
                  </div>
                </div>

                {/* GitHub */}
                <a
                  href={userProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl border flex items-center justify-between group hover:border-emerald-400/50 transition-all backdrop-blur-md ${
                    darkMode ? 'bg-[#02100a]/80 border-emerald-500/20' : 'bg-emerald-50/70 border-emerald-200'
                  }`}
                  id="contact-github-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:text-emerald-300 border border-emerald-500/20">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">GitHub</div>
                      <div className="text-xs font-bold">Ahmad12-hu</div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={userProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl border flex items-center justify-between group hover:border-emerald-400/50 transition-all backdrop-blur-md ${
                    darkMode ? 'bg-[#02100a]/80 border-emerald-500/20' : 'bg-emerald-50/70 border-emerald-200'
                  }`}
                  id="contact-linkedin-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">LinkedIn</div>
                      <div className="text-xs font-bold">Laye</div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2 backdrop-blur-md">
                <GraduationCap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Actuellement concentré sur mes études et mes travaux de recherche.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-md transition-all shadow-xl ${
              darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200 shadow-slate-200/50'
            }`}>
              <h3 className="text-xl font-bold tracking-tight mb-6">M'envoyer un message</h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-lg text-white">Message envoyé avec succès !</h4>
                  <p className="text-xs text-slate-300">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais sur <span className="text-emerald-400 font-mono">{userProfile.email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 mb-1">Votre Nom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Babacar Diop"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full p-3 rounded-2xl border text-xs transition-all backdrop-blur-md ${
                          darkMode ? 'bg-[#02100a]/80 border-emerald-500/30 text-emerald-100 placeholder-emerald-400/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400' : 'bg-white border-emerald-200 text-slate-900'
                        }`}
                        id="contact-name-input"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 mb-1">Votre Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: babacar@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full p-3 rounded-2xl border text-xs transition-all backdrop-blur-md ${
                          darkMode ? 'bg-[#02100a]/80 border-emerald-500/30 text-emerald-100 placeholder-emerald-400/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400' : 'bg-white border-emerald-200 text-slate-900'
                        }`}
                        id="contact-email-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1">Sujet</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full p-3 rounded-2xl border text-xs transition-all backdrop-blur-md ${
                        darkMode ? 'bg-[#02100a]/80 border-emerald-500/30 text-emerald-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400' : 'bg-white border-emerald-200 text-slate-900'
                      }`}
                      id="contact-subject-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1">Votre Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Décrivez votre projet ou votre demande..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full p-3 rounded-2xl border text-xs transition-all backdrop-blur-md ${
                        darkMode ? 'bg-[#02100a]/80 border-emerald-500/30 text-emerald-100 placeholder-emerald-400/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400' : 'bg-white border-emerald-200 text-slate-900'
                      }`}
                      id="contact-message-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs font-mono shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer le Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
