import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Search, ExternalLink, Github, Sparkles, ArrowRight, Eye, Layers } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

interface ProjectsProps {
  darkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ darkMode, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = ['Tous', 'Agri-tech', 'Fullstack', 'Frontend', 'Mini-jeux', 'Web'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
    const matchesQuery =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono backdrop-blur-md shadow-inner">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Réalisations & Projets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mes Projets <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Concrets & Déployés
            </span>
          </h2>
          <p className={`text-base ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>
            Découvrez mon projet principal KA-Farm, une application web & PWA développée pour répondre à des besoins concrets du secteur agricole au Sénégal.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="space-y-6 mb-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className={`flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl border backdrop-blur-md ${
              darkMode ? 'bg-[#041a12]/40 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
            }`}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : darkMode
                      ? 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-100/50'
                  }`}
                  id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-emerald-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher une techno, un nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs transition-all backdrop-blur-md ${
                  darkMode
                    ? 'bg-[#041a12]/40 border-emerald-500/30 text-emerald-100 placeholder-emerald-400/50 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                    : 'bg-white/90 border-emerald-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
                }`}
                id="projects-search-input"
              />
            </div>
          </div>

        </div>

        {/* Project Showcase Grid */}
        <div className="space-y-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-3xl border transition-all duration-300 overflow-hidden relative backdrop-blur-md ${
                darkMode
                  ? 'bg-[#041a12]/40 border-emerald-500/25 hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-950/40'
                  : 'bg-white/85 border-emerald-200 shadow-xl shadow-slate-200/50'
              }`}
              id={`project-card-${project.id}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image Showcase Column with Browser Mockup Frame */}
                <div className="lg:col-span-6 relative flex flex-col justify-between min-h-[300px] lg:min-h-[420px] bg-[#02100a]/70 backdrop-blur-md overflow-hidden border-b lg:border-b-0 lg:border-r border-emerald-500/20">
                  
                  {/* Browser Window Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#031810]/80 border-b border-emerald-500/20 z-10 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/40" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#010b07]/80 border border-emerald-500/20 text-[11px] font-mono text-emerald-300/80 max-w-[200px] truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="truncate">{project.demoUrl ? project.demoUrl.replace('https://', '') : 'ka-farm.app'}</span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400/50 uppercase font-bold tracking-wider">
                      LIVE PREVIEW
                    </div>
                  </div>

                  {/* Screenshot Container with Overlay & Smooth Zoom */}
                  <div className="relative flex-1 overflow-hidden group/img">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03140d] via-transparent to-transparent opacity-80" />

                    {project.featured && (
                      <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 text-xs font-black uppercase font-mono shadow-lg flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Projet Principal SaaS</span>
                      </div>
                    )}
                  </div>

                  {/* Image Bottom Info Badges */}
                  <div className="p-3 bg-[#03140d]/90 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 z-10 backdrop-blur-md">
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono text-xs font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      En cours de développement
                    </span>
                  </div>
                </div>

                {/* Information Column */}
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-emerald-400/60">01 / 01</span>
                    </div>

                    <p className="text-xs font-mono text-emerald-400 font-semibold leading-snug">
                      {project.tagline}
                    </p>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      darkMode ? 'text-emerald-100/90' : 'text-slate-700'
                    }`}>
                      {project.fullDescription || project.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                        Points Clés du Projet :
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {project.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-emerald-100/80">
                            <span className="text-emerald-400 font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>


                  </div>

                  {/* Actions & Links */}
                  <div className="pt-6 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 font-mono text-xs font-bold transition-all"
                      id={`project-details-btn-${project.id}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Vue détaillée & Démo</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#03140d]/80 border border-emerald-500/30 text-emerald-200 hover:text-white hover:border-emerald-400 text-xs font-semibold font-mono transition-all backdrop-blur-md"
                        id={`project-github-link-${project.id}`}
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs font-mono shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-105"
                          id={`project-demo-link-${project.id}`}
                        >
                          <span>Visiter KA-Farm</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Placeholder card for future projects */}
          <div className={`p-8 rounded-3xl border border-dashed text-center space-y-4 transition-all backdrop-blur-md ${
            darkMode ? 'bg-[#041a12]/40 border-emerald-500/30 text-emerald-200/80' : 'bg-white/60 border-emerald-300 text-slate-600'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Layers className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-emerald-200">Prochains Projets en Développement</h4>
              <p className="text-xs text-emerald-200/70 max-w-lg mx-auto">
                De nouveaux outils web et mobiles sont actuellement en phase de conception. La grille accueillera directement mes futures réalisations au fur et à mesure de leur déploiement.
              </p>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Layers className="w-12 h-12 text-slate-500 mx-auto" />
            <p className="text-slate-400 text-sm font-mono">
              Aucun projet ne correspond à votre recherche "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-xs font-bold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>
    </motion.section>
  );
};
