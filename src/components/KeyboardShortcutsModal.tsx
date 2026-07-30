import React from 'react';
import { Keyboard, X, ArrowUp, FileText, Send, Code, User, Sparkles } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'H', label: 'Scroll to Home / Hero', icon: ArrowUp },
    { key: 'A', label: 'Scroll to À propos / About', icon: User },
    { key: 'P', label: 'Scroll to Projets / Projects', icon: Code },
    { key: 'S', label: 'Scroll to Compétences / Skills', icon: Sparkles },
    { key: 'C', label: 'Scroll to Contact', icon: Send },
    { key: 'V', label: 'Ouvrir / View CV', icon: FileText },
    { key: 'K / ?', label: 'Toggle Shortcuts Modal', icon: Keyboard },
    { key: 'ESC', label: 'Fermer les modales', icon: X },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-colors ${
          darkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-emerald-950/30'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Raccourcis Clavier</h3>
              <p className="text-xs text-slate-400 font-mono">Keyboard Navigation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-3">
          {shortcuts.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className={`flex items-center justify-between p-3 rounded-2xl border ${
                darkMode
                  ? 'bg-slate-950/50 border-slate-800/80'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <kbd className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
                {key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-700/40 text-center">
          <p className="text-xs text-slate-400">
            Appuyez sur n'importe quelle touche depuis n'importe où pour naviguer instantanément.
          </p>
        </div>
      </div>
    </div>
  );
};
