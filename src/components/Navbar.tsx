import React, { useState, useEffect } from 'react';
import { Code2, Menu, X, Download, Sun, Moon, Sparkles, MapPin } from 'lucide-react';
import { userProfile } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onOpenCv: () => void;
  onOpenEditProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenCv, onOpenEditProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const [lang, setLang] = useState<'FR' | 'EN'>('FR');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: lang === 'FR' ? 'Accueil' : 'Home', href: '#hero' },
    { name: lang === 'FR' ? 'À propos' : 'About', href: '#about' },
    { name: lang === 'FR' ? 'Projets' : 'Projects', href: '#projects' },
    { name: lang === 'FR' ? 'Compétences' : 'Skills', href: '#skills' },
    { name: lang === 'FR' ? 'Contact' : 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/20'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 group focus:outline-none"
          id="logo-link"
        >
          <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-mono">
            LAY_PORTFOLIO<span className="text-emerald-400">.</span>
          </span>
        </a>

        {/* Desktop Nav Pills */}
        <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md shadow-lg ${
          darkMode ? 'bg-[#041a12]/80 border-emerald-500/20' : 'bg-white/80 border-emerald-200'
        }`}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : darkMode
                    ? 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-100/50'
                }`}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language indicator */}
          <button
            onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              darkMode ? 'bg-[#041a12]/80 border border-emerald-500/20 text-emerald-200 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            title="Changer de langue / Switch language"
            id="lang-toggle-btn"
          >
            <span className="text-[11px]">🌐</span>
            <span>{lang}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all duration-200 ${
              darkMode
                ? 'bg-slate-900 border-slate-700/80 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            id="theme-toggle-btn"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {onOpenEditProfile && (
            <button
              onClick={onOpenEditProfile}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                darkMode ? 'bg-[#041a12]/80 border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/40' : 'bg-slate-100 border-slate-200 text-emerald-600 hover:bg-slate-200'
              }`}
              title="Personnaliser mon profil"
              id="edit-profile-nav-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Profil</span>
            </button>
          )}

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-5 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105"
            id="nav-contact-btn"
          >
            Me contacter
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border text-sm ${
              darkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            id="mobile-theme-toggle"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border transition-all ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300 ${
          darkMode ? 'bg-slate-950/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'hover:bg-slate-800/40'
                }`}
                id={`mobile-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20"
              id="mobile-cv-btn"
            >
              <Download className="w-4 h-4" />
              <span>Voir & Télécharger mon CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
