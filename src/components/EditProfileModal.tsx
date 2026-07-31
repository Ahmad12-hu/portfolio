import React, { useState } from 'react';
import { X, Save, User, Mail, MapPin, Briefcase, Link, Phone } from 'lucide-react';
import { UserProfile } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSave: (updated: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSave
}) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState<UserProfile>({ ...userProfile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md bg-black/80 animate-fadeIn">
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
          darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-base">Personnaliser mes informations de profil</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Nom complet</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Titre professionnel</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Localisation</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Présentation courte (Bio)</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Lien GitHub</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Lien LinkedIn</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
