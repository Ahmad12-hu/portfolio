import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Code2, Database, Wrench, HeartHandshake, CheckCircle2, Award } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

interface SkillsProps {
  darkMode: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Tous');

  const filterOptions = ['Tous', 'Langages', 'Frameworks', 'Outils', 'Soft Skills'];

  const getLevelBadge = (level: number, name: string) => {
    if (name.toLowerCase().includes('react')) {
      return { label: 'Notions de base', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
    }
    if (name.toLowerCase().includes('javascript') && !name.toLowerCase().includes('html')) {
      return { label: 'En apprentissage', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    }
    if (level >= 85) return { label: 'Avancé / Maîtrisé', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (level >= 70) return { label: 'En apprentissage', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
    return { label: 'Pratique', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' };
  };

  const domainProgress = [
    { domain: 'HTML5 & Structuration Web', level: 90, color: 'from-orange-400 to-amber-600' },
    { domain: 'CSS3 & Design Réponsif', level: 88, color: 'from-blue-400 to-cyan-600' },
    { domain: 'Tailwind CSS (Styling & Design Utility)', level: 90, color: 'from-teal-400 to-cyan-500' },
    { domain: 'JavaScript (Logique Dynamique)', level: 60, color: 'from-yellow-400 to-amber-500' },
    { domain: 'React (Notions & Composants)', level: 35, color: 'from-cyan-400 to-blue-500' },
    { domain: 'Git & GitHub (Contrôle de Version)', level: 91, color: 'from-emerald-400 to-teal-600' },
  ];

  const matchesCategory = (catName: string, filter: string) => {
    if (filter === 'Tous') return true;
    if (filter === 'Langages') return catName.includes('Frontend') || catName.includes('Backend');
    if (filter === 'Frameworks') return catName.includes('Frontend') || catName.includes('Backend');
    if (filter === 'Outils') return catName.includes('Outils');
    if (filter === 'Soft Skills') return catName.includes('Soft');
    return true;
  };

  const filteredCategories = skillCategories.filter((cat) => matchesCategory(cat.name, selectedFilter));

  return (
    <motion.section
      id="skills"
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
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono backdrop-blur-md shadow-inner">
            <Cpu className="w-3.5 h-3.5" />
            <span>Compétences & Stack Technique</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mon Écosystème <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              de Développement
            </span>
          </h2>
          <p className={`text-base ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>
            Maîtrise des fondamentaux du Web et pratique des frameworks modernes orientés performance, maintenabilité et expérience utilisateur.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className={`flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-2xl border backdrop-blur-md max-w-xl mx-auto ${
          darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
        }`}>
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : darkMode
                  ? 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-100/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredCategories.map((category, catIndex) => (
            <div
              key={category.name}
              className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-md space-y-6 transition-all shadow-xl ${
                darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200 shadow-slate-200/50'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
                    {catIndex % 4 === 0 && <Code2 className="w-5 h-5" />}
                    {catIndex % 4 === 1 && <Database className="w-5 h-5" />}
                    {catIndex % 4 === 2 && <Wrench className="w-5 h-5" />}
                    {catIndex % 4 === 3 && <HeartHandshake className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{category.name}</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400/60">{category.skills.length} compétences</span>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => {
                  const badge = getLevelBadge(skill.level, skill.name);
                  return (
                    <div key={skill.name} className={`space-y-2 p-3.5 rounded-2xl border transition-all ${
                      darkMode ? 'bg-[#02100a]/60 border-emerald-500/15 hover:border-emerald-500/30' : 'bg-emerald-50/50 border-emerald-100'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-medium">{skill.name}</span>
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold ${badge.color}`}>
                            {badge.label}
                          </span>
                          <span className="font-mono text-emerald-400 text-xs font-bold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-950/40 overflow-hidden border border-emerald-500/20">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <p className="text-[11px] opacity-75 leading-tight">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Domain Progress Bars Section */}
        <div className={`p-8 rounded-3xl border backdrop-blur-md space-y-6 ${
          darkMode ? 'bg-[#041a12]/40 border-emerald-500/30' : 'bg-white/90 border-emerald-200 shadow-xl'
        }`}>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Progression Globale par Domaine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domainProgress.map((item) => (
              <div key={item.domain} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{item.domain}</span>
                  <span className="font-mono text-emerald-400">{item.level}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-950/40 overflow-hidden border border-emerald-500/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills Summary */}
        <div className="mt-8 p-6 rounded-2xl border bg-[#041a12]/40 border-emerald-500/20 backdrop-blur-md text-center space-y-4">
          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
            Badges Techniques Clés
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'HTML5', status: 'Maîtrisé' },
              { label: 'CSS3', status: 'Maîtrisé' },
              { label: 'Tailwind CSS', status: 'Maîtrisé' },
              { label: 'JavaScript', status: 'En apprentissage' },
              { label: 'React', status: 'Notions de base' },
              { label: 'Git', status: 'Maîtrisé' },
              { label: 'GitHub', status: 'Maîtrisé' }
            ].map((tech) => (
              <span
                key={tech.label}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-mono font-medium shadow-sm hover:border-cyan-400 transition-colors flex items-center gap-2"
              >
                <span>{tech.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                  tech.status === 'En apprentissage'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : tech.status === 'Notions de base'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {tech.status}
                </span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
};

