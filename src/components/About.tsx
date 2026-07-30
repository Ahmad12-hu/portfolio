import React from 'react';
import { motion } from 'motion/react';
import { User, MapPin, Heart, BookOpen, Users, Sparkles, CheckCircle2, Globe2, Award } from 'lucide-react';
import { userProfile } from '../data/portfolioData';

interface AboutProps {
  darkMode: boolean;
}

export const About: React.FC<AboutProps> = ({ darkMode }) => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`py-20 relative transition-colors duration-300 ${
        darkMode ? 'bg-transparent text-emerald-50' : 'bg-[#f0f7f4]/40 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono backdrop-blur-md shadow-inner">
            <User className="w-3.5 h-3.5" />
            <span>À propos de moi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Passionné par le code, guidé par <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              l'impact social et communautaire
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>
            Basé à Dakar (Sénégal), je mets la technologie au service de solutions concrètes pour mon entourage et la communauté des jeunes développeurs.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Dakar Card & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-8 rounded-3xl border backdrop-blur-md relative overflow-hidden transition-all shadow-xl ${
              darkMode
                ? 'bg-[#041a12]/40 border-emerald-500/20 shadow-emerald-950/20'
                : 'bg-white/80 border-emerald-200 shadow-slate-200/50'
            }`}>
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Globe2 className="w-40 h-40 text-emerald-400" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇸🇳</span>
                  <div>
                    <h3 className="text-xl font-bold">{userProfile.name}</h3>
                    <p className="text-xs font-mono text-emerald-400 font-semibold">{userProfile.title} @ Dakar</p>
                  </div>
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                  {userProfile.detailedBio}
                </p>

                <div className="pt-4 border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mt-1 border border-emerald-500/20">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Auto-formation</h4>
                      <p className="text-xs font-medium opacity-90">Parcours structuré sur freeCodeCamp, documentation officielle et projets concrets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 mt-1 border border-teal-500/20">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Engagé</h4>
                      <p className="text-xs font-medium opacity-90">Animation active de la communauté WhatsApp de partage dev au Sénégal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Values / Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border text-center space-y-2 backdrop-blur-md transition-all ${
                darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold">Code Propre & Utile</h4>
                <p className="text-[11px] opacity-80">Composants réutilisables, lisibles et optimisés.</p>
              </div>

              <div className={`p-4 rounded-2xl border text-center space-y-2 backdrop-blur-md transition-all ${
                darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold">Projets Utiles</h4>
                <p className="text-[11px] opacity-80">Agri-Tech Intelligente avec KA-Farm.</p>
              </div>

              <div className={`p-4 rounded-2xl border text-center space-y-2 backdrop-blur-md transition-all ${
                darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold">Esprit d'Équipe</h4>
                <p className="text-[11px] opacity-80">Co-développement familial et partage open source.</p>
              </div>
            </div>

          </div>

          {/* Right Column: WhatsApp Community Impact Focus */}
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-3xl border relative overflow-hidden backdrop-blur-md shadow-2xl transition-all ${
              darkMode ? 'bg-[#041a12]/50 border-emerald-500/30' : 'bg-white/90 border-emerald-200'
            }`}>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl" />

              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                    💬
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">WhatsApp Teaching Hub</h3>
                    <p className="text-xs opacity-75">Initiative communautaire bénévole</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                  EN DIRECT
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-xs opacity-90 leading-relaxed">
                  Afin de rendre le développement web accessible à d'autres jeunes sénégalais sans ordinateur puissant ni connexion permanente, je crée et partage des modules de cours simplifiés directement sur WhatsApp.
                </p>

                <div className={`space-y-2 p-4 rounded-2xl border text-xs font-mono backdrop-blur-md ${
                  darkMode ? 'bg-[#02100a]/80 border-emerald-500/20' : 'bg-emerald-50/70 border-emerald-200'
                }`}>
                  <div className="text-emerald-400 font-bold"># Impact mesurable :</div>
                  <div className="flex items-center justify-between">
                    <span>• Apprenants actifs :</span>
                    <span className="text-emerald-400 font-bold">120+ membres</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Projets tuteurs créés :</span>
                    <span className="text-emerald-400 font-bold">Quiz CSS & Exercices</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Fréquence des cours :</span>
                    <span className="text-emerald-400 font-bold">Hebdomadaire</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-xs text-emerald-300 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>"Transmettre ce que l'on apprend est la meilleure façon de maîtriser le code."</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.section>
  );
};
