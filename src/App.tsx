import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';

// Modales chargées à la demande (hors bundle initial) pour un premier rendu plus rapide.
const ProjectModal = React.lazy(() =>
  import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);
const CvModal = React.lazy(() =>
  import('./components/CvModal').then((m) => ({ default: m.CvModal }))
);
const EditProfileModal = React.lazy(() =>
  import('./components/EditProfileModal').then((m) => ({ default: m.EditProfileModal }))
);
const KeyboardShortcutsModal = React.lazy(() =>
  import('./components/KeyboardShortcutsModal').then((m) => ({ default: m.KeyboardShortcutsModal }))
);
import { Project, UserProfile } from './types';
import { userProfile as initialUserProfile } from './data/portfolioData';
import { useTheme } from './contexts/ThemeContext';

const KEYBOARD_SHORTCUTS = {
  c: 'contact',
  s: 'skills', 
  p: 'projects',
  a: 'about',
  h: 'hero',
} as const;

export default function App() {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);

  const closeAllModals = useCallback(() => {
    setSelectedProject(null);
    setCvModalOpen(false);
    setEditProfileModalOpen(false);
    setShortcutsModalOpen(false);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Préchargement des chunks de modales après le premier rendu :
    // le bundle initial reste léger, mais les modales s'ouvrent instantanément.
    const prefetchId = window.setTimeout(() => {
      void import('./components/ProjectModal');
      void import('./components/CvModal');
      void import('./components/EditProfileModal');
      void import('./components/KeyboardShortcutsModal');
    }, 1500);
    return () => window.clearTimeout(prefetchId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || 
                     (document.activeElement as HTMLElement)?.isContentEditable;
      if (isInput) return;

      if (e.key === 'Escape') {
        closeAllModals();
        return;
      }

      const key = e.key.toLowerCase();
      
      if (key in KEYBOARD_SHORTCUTS) {
        e.preventDefault();
        scrollToSection(KEYBOARD_SHORTCUTS[key as keyof typeof KEYBOARD_SHORTCUTS]);
      } else if (key === 'v') {
        e.preventDefault();
        setCvModalOpen(true);
      } else if (key === 'k' || key === '?') {
        e.preventDefault();
        setShortcutsModalOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAllModals, scrollToSection]);

  return (
    <div className={`min-h-screen relative transition-colors duration-300 font-sans selection:bg-emerald-500 selection:text-slate-950 ${
      darkMode ? 'bg-[#03140d] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      <AnimatedBackground />

      <Navbar
        onOpenCv={() => setCvModalOpen(true)}
        onOpenEditProfile={() => setEditProfileModalOpen(true)}
      />

      <main className="relative z-10">
        <Hero
          onOpenCv={() => setCvModalOpen(true)}
          profile={profile}
        />

        <About />

        <Projects
          onSelectProject={setSelectedProject}
        />

        <Skills />

        <Contact />
      </main>

      <Footer />

      {/* Modales : montées uniquement quand ouvertes → chunks chargés à la demande */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}

      {cvModalOpen && (
        <Suspense fallback={null}>
          <CvModal
            isOpen={cvModalOpen}
            onClose={() => setCvModalOpen(false)}
          />
        </Suspense>
      )}

      {editProfileModalOpen && (
        <Suspense fallback={null}>
          <EditProfileModal
            isOpen={editProfileModalOpen}
            onClose={() => setEditProfileModalOpen(false)}
            userProfile={profile}
            onSave={setProfile}
          />
        </Suspense>
      )}

      {shortcutsModalOpen && (
        <Suspense fallback={null}>
          <KeyboardShortcutsModal
            isOpen={shortcutsModalOpen}
            onClose={() => setShortcutsModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}



