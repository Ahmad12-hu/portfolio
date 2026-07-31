import React from 'react';
import { motion } from 'motion/react';
import { User, MapPin, Heart, BookOpen, Users, Sparkles, CheckCircle2, Globe2, Award } from 'lucide-react';
import { userProfile } from '../data/portfolioData';
import { useTheme } from '../contexts/ThemeContext';

export const About = React.memo(() => {
  const { darkMode } = useTheme();
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
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono backdrop-blur-md shadow-inner">
            <User className="w-3.5 h-3.5" />
            <span>À propos de moi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Passionné par le code, guidé par <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              l'impact social et communautaire
            </span>
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>
            Basé à Dakar (Sénégal), je mets la technologie au service de solutions concrètes pour mon entourage et la communauté des jeunes développeurs.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="flex justify-center">
          {/* Centered Profile Card */}
          <div className="w-full max-w-3xl space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-md relative overflow-hidden transition-all shadow-xl ${
              darkMode
                ? 'bg-[#041a12]/40 border-emerald-500/20 shadow-emerald-950/20'
                : 'bg-white/80 border-emerald-200 shadow-slate-200/50'
            }`}>
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Globe2 className="w-24 sm:w-40 h-24 sm:h-40 text-emerald-400" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">🇸🇳</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">{userProfile.name}</h3>
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
                      <p className={`text-xs font-medium ${darkMode ? 'text-emerald-100/85' : 'text-slate-600'}`}>Parcours structuré sur freeCodeCamp, documentation officielle et projets concrets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 mt-1 border border-teal-500/20">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Engagé</h4>
                      <p className={`text-xs font-medium ${darkMode ? 'text-emerald-100/85' : 'text-slate-600'}`}>Animation active de la communauté WhatsApp de partage dev au Sénégal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Values / Pillars */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                <div className={`p-4 rounded-2xl border text-center space-y-2 backdrop-blur-md transition-all ${
                  darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold">Code Propre & Utile</h4>
                  <p className={`text-[11px] ${darkMode ? 'text-emerald-100/80' : 'text-slate-600'}`}>Composants réutilisables, lisibles et optimisés.</p>
                </div>

                <div className={`p-4 rounded-2xl border text-center space-y-2 backdrop-blur-md transition-all ${
                  darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold">Projets Utiles</h4>
                  <p className={`text-[11px] ${darkMode ? 'text-emerald-100/80' : 'text-slate-600'}`}>Agri-Tech Intelligente avec KA-Farm.</p>
                </div>

                <div className={`p-4 rounded-2xl border text-center space-y-2 backdrop-blur-md transition-all ${
                  darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold">Esprit d'Équipe</h4>
                  <p className={`text-[11px] ${darkMode ? 'text-emerald-100/80' : 'text-slate-600'}`}>Co-développement familial et partage open source.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.section>
  );
});