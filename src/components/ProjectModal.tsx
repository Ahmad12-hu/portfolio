import React from 'react';
import { X, Github, ExternalLink, Sparkles, CheckCircle2, Code2, Play } from 'lucide-react';
import { Project } from '../types';
import { KaFarmCalculator, SunuJobSimulator, PlayableCssQuiz, FitPulsePreview } from './InteractiveDemos';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  darkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/75 animate-fadeIn">
      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto ${
          darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800/80 sticky top-0 bg-inherit z-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{project.title}</h3>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            id="close-project-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Banner Image / Cover */}
          <div className="relative rounded-xl overflow-hidden h-56 sm:h-72 group border border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
              <div>
                <p className="text-sm sm:text-base font-semibold text-cyan-300 drop-shadow">
                  {project.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Key Stats Bar */}
          {project.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.stats.map((st, i) => (
                <div key={i} className={`p-3 rounded-xl border text-center ${
                  darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">{st.label}</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">{st.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">Présentation détaillée</h4>
            <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {project.fullDescription}
            </p>
          </div>

          {/* Highlights List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">Fonctionnalités clés</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                  darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Live Interactive Widget Demo */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Démonstration Intégrée Interactive
            </h4>

            {project.interactiveType === 'ka-farm' && <KaFarmCalculator darkMode={darkMode} />}
            {project.interactiveType === 'sunujob' && <SunuJobSimulator darkMode={darkMode} />}
            {project.interactiveType === 'quiz-css' && <PlayableCssQuiz darkMode={darkMode} />}
            {project.interactiveType === 'fitpulse' && <FitPulsePreview darkMode={darkMode} />}
            {project.interactiveType === 'digital-hub' && (
              <div className="p-4 rounded-xl border bg-slate-900 border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Aperçu Digital Learning Hub</span>
                </div>
                <p>Site d'école complet hébergé sur GitHub Pages avec emplois du temps interactifs et bibliothèque de devoirs.</p>
              </div>
            )}
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Technologies utilisées</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-slate-800/80 text-cyan-300 border border-slate-700/60 text-xs font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 sticky bottom-0 bg-inherit z-10">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-white text-xs font-semibold transition-all"
              id="modal-github-link"
            >
              <Github className="w-4 h-4" />
              <span>Voir le Code (GitHub)</span>
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:opacity-90"
                id="modal-live-demo-link"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Démo en ligne</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white underline font-mono"
          >
            Fermer l'aperçu
          </button>
        </div>

      </div>
    </div>
  );
};
