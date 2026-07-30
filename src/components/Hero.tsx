import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter, Facebook, Sparkles, MapPin, Briefcase, Award } from 'lucide-react';
import { userProfile } from '../data/portfolioData';
import { UserProfile } from '../types';

const getAvatarSrc = (profile: UserProfile) => {
  if (profile.avatar) return profile.avatar;
  return 'https://i.pravatar.cc/150?img=11';
};

interface HeroProps {
  darkMode: boolean;
  onOpenCv: () => void;
  profile?: UserProfile;
}

const TYPEWRITER_TITLES = [
  'Autodidact Web Developer',
  'Agricultural Tech Enthusiast',
  'Problem Solver',
  'Développeur Web Autodidacte',
  'Passionné AgriTech (KA-Farm)'
];

export const Hero: React.FC<HeroProps> = ({ darkMode, onOpenCv, profile }) => {
  const currentProfile = profile || userProfile;

  // Typewriter effect state
  const [titleIndex, setTitleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typewriter typing logic
  useEffect(() => {
    const currentText = TYPEWRITER_TITLES[titleIndex];

    if (!isDeleting && subIndex === currentText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TYPEWRITER_TITLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 70);

    return () => clearTimeout(timeout);
  }, [subIndex, titleIndex, isDeleting]);

  const displayedTypewriterText = TYPEWRITER_TITLES[titleIndex].substring(0, subIndex);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="space-y-8 text-left">
          
          {/* Subtitle Pill & Status Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-bold uppercase tracking-wider">
                {currentProfile.subtitle || 'Jeune polyvalent'}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              <span>Autodidacte ({currentProfile.stats.experienceYears})</span>
            </div>


            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-bold backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-cyan-300" />
              <span>{currentProfile.location}, {currentProfile.country}</span>
            </div>
          </div>

          {/* Avatar + Name + Title */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={getAvatarSrc(currentProfile)}
                alt={currentProfile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-emerald-400/60 shadow-xl shadow-emerald-900/20 bg-slate-900/40"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#03140d] dark:border-slate-950" />
            </div>
            <div>
              <h2 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{currentProfile.name}</h2>
              <p className={`text-xs font-mono font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {currentProfile.title}
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className={`text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {currentProfile.title}
            </h1>

            {/* Typewriter Tagline */}
            <div className="flex items-center gap-2.5 py-1 text-base sm:text-xl lg:text-3xl font-bold font-mono tracking-tight min-h-[2.5rem] sm:min-h-[3rem]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {displayedTypewriterText}
              </span>
              <span
                className={`w-0.5 h-5 sm:h-7 bg-emerald-400 inline-block transition-opacity duration-100 ${
                  blink ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            <p className={`text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-3xl ${
              darkMode ? 'text-emerald-100/80' : 'text-slate-700'
            }`}>
              {currentProfile.bio}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2" id="hero-actions">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
              id="hero-contact-btn"
            >
              <span>Me contacter</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCv}
              className={`flex items-center gap-2.5 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl border font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105 backdrop-blur-md ${
                darkMode
                  ? 'bg-[#041a12]/80 border-emerald-500/30 text-emerald-200 hover:text-white hover:bg-emerald-900/40'
                  : 'bg-white/90 border-emerald-200 text-slate-800 hover:bg-emerald-50'
              }`}
              id="hero-cv-btn"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Télécharger le CV</span>
            </button>
          </div>

          {/* Social Icons */}
          <div className="pt-6 border-t border-emerald-500/20 flex items-center gap-4 text-xs sm:text-sm text-emerald-200/70">
            <span className="font-mono font-medium">Réseaux :</span>
            <div className="flex items-center gap-2.5">
              <a
                href={currentProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all shadow-sm backdrop-blur-md ${
                  darkMode ? 'bg-[#041a12]/80 border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50' : 'bg-white border-emerald-200 text-slate-700 hover:text-emerald-600'
                }`}
                title="LinkedIn"
                id="linkedin-social-link"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href={currentProfile.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all shadow-sm backdrop-blur-md ${
                  darkMode ? 'bg-[#041a12]/80 border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50' : 'bg-white border-emerald-200 text-slate-700 hover:text-emerald-600'
                }`}
                title="Twitter / X"
                id="twitter-social-link"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a
                href={currentProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all shadow-sm backdrop-blur-md ${
                  darkMode ? 'bg-[#041a12]/80 border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50' : 'bg-white border-emerald-200 text-slate-700 hover:text-emerald-600'
                }`}
                title="GitHub"
                id="github-social-link"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={currentProfile.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all shadow-sm backdrop-blur-md ${
                  darkMode ? 'bg-[#041a12]/80 border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50' : 'bg-white border-emerald-200 text-slate-700 hover:text-emerald-600'
                }`}
                title="Facebook"
                id="facebook-social-link"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
