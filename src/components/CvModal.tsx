import React from 'react';
import { X, Download, Printer, Mail, MapPin, Github, Linkedin, ExternalLink, Globe, CheckCircle2 } from 'lucide-react';
import { userProfile, projectsData, skillCategories, timelineData } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/80 animate-fadeIn">
      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto ${
          darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900 text-white sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">CV PDF</span>
            <span className="text-sm font-bold">Curriculum Vitae — {userProfile.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              title="Imprimer / Enregistrer en PDF"
              id="print-cv-btn"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              id="close-cv-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Printable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 print:space-y-6 font-sans text-xs sm:text-sm">
          
          {/* Header Info */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-cyan-400">
                {userProfile.name}
              </h1>
              <p className="text-sm font-bold text-slate-300 font-mono mt-1">
                {userProfile.title} — Dakar, Sénégal 🇸🇳
              </p>
              <p className="text-xs text-slate-400 max-w-xl mt-2 leading-relaxed">
                {userProfile.bio}
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 font-mono bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>github.com/Ahmad12-hu</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{userProfile.linkedin.replace('https://', '')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>

          {/* Section: Compétences Clés */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono border-b border-slate-800 pb-1">
              Compétences Techniques & Outils
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-white text-xs mb-1">Développement Web Frontend</h3>
                <p className="text-slate-300 text-xs">
                  <strong>HTML5</strong> (Maîtrisé), <strong>CSS3</strong> (Maîtrisé), <strong>JavaScript</strong> (En apprentissage actif).
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white text-xs mb-1">Gestion de Code & Outils</h3>
                <p className="text-slate-300 text-xs">
                  <strong>Git</strong> (Maîtrisé), <strong>GitHub</strong> (Maîtrisé), Workflow de commits et dépôts distants.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Projets Réalisés */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono border-b border-slate-800 pb-1">
              Projets Majeurs
            </h2>

            <div className="space-y-3">
              {projectsData.map((project) => (
                <div key={project.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{project.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{project.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Parcours & Engagement */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono border-b border-slate-800 pb-1">
              Parcours & Engagement Communautaire
            </h2>

            <div className="space-y-3">
              {timelineData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{item.role} — <span className="text-cyan-400">{item.institution}</span></span>
                    <span className="font-mono text-slate-400">{item.year}</span>
                  </div>
                  <p className="text-xs text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Langues */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono border-b border-slate-800 pb-1">
              Langues
            </h2>
            <div className="flex gap-6 text-xs text-slate-300">
              <div>• <strong>Français :</strong> Courant (langue de travail)</div>
              <div>• <strong>Wolof :</strong> Langue maternelle</div>
              <div>• <strong>Anglais :</strong> Technique (Lecture doc & code)</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 text-center print:hidden">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500 hover:text-white transition-all"
          >
            Fermer le CV
          </button>
        </div>

      </div>
    </div>
  );
};
