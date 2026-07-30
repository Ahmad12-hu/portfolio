import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside form inputs, textareas, or contenteditables
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || (document.activeElement as HTMLElement)?.isContentEditable;
      if (isInput) return;

      const key = e.key.toLowerCase();

      // Close open modals on Escape
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setCvModalOpen(false);
        setEditProfileModalOpen(false);
        setShortcutsModalOpen(false);
        return;
      }

      // Keyboard shortcuts
      if (key === 'c') {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 's') {
        e.preventDefault();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 'p') {
        e.preventDefault();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 'a') {
        e.preventDefault();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 'h') {
        e.preventDefault();
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 'v') {
        e.preventDefault();
        setCvModalOpen(true);
      } else if (key === 'k' || key === '?') {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen relative transition-colors duration-300 font-sans selection:bg-emerald-500 selection:text-slate-950 ${
      darkMode ? 'bg-[#03140d] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Animated Interactive Background */}
      <AnimatedBackground darkMode={darkMode} />

      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCv={() => setCvModalOpen(true)}
        onOpenEditProfile={() => setEditProfileModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero
          darkMode={darkMode}
          onOpenCv={() => setCvModalOpen(true)}
          profile={profile}
        />

        <About darkMode={darkMode} />

        <Projects
          darkMode={darkMode}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        <Skills darkMode={darkMode} />

        <Contact darkMode={darkMode} />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
      />

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        darkMode={darkMode}
      />

      <EditProfileModal
        isOpen={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        userProfile={profile}
        onSave={(updated) => setProfile(updated)}
        darkMode={darkMode}
      />

      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}



