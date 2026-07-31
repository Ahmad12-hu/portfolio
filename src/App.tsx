import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { EditProfileModal } from './components/EditProfileModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { AnimatedBackground } from './components/AnimatedBackground';
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
      darkMode ? 'bg-[#03140d] text-slate-100' : 'bg-slate-50 text-slate-900'
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

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      <EditProfileModal
        isOpen={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        userProfile={profile}
        onSave={setProfile}
      />

      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
      />
    </div>
  );
}



