import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter, Facebook, MapPin, Heart } from 'lucide-react';
import { userProfile } from '../data/portfolioData';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-8 sm:py-12 transition-colors duration-300 ${
      darkMode ? 'bg-transparent border-emerald-500/20 text-emerald-200/70' : 'bg-[#041a12]/80 border-emerald-900 text-emerald-100/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-emerald-500/20">

          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full rounded-[10px] bg-[#03140d] flex items-center justify-center font-mono font-bold text-sm text-emerald-400">
                AM
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-sm sm:text-base">{userProfile.name}</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={userProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-[#041a12]/80 border border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
              title="LinkedIn"
              id="footer-linkedin-link"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={userProfile.twitter || 'https://twitter.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-[#041a12]/80 border border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
              title="Twitter / X"
              id="footer-twitter-link"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={userProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-[#041a12]/80 border border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
              title="GitHub"
              id="footer-github-link"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={userProfile.facebook || 'https://facebook.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-[#041a12]/80 border border-emerald-500/20 text-emerald-200 hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
              title="Facebook"
              id="footer-facebook-link"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#041a12]/80 border border-emerald-500/20 hover:border-emerald-400/50 text-xs font-mono text-emerald-200 hover:text-white transition-all"
            id="back-to-top-btn"
          >
            <span className="hidden sm:inline">Haut de page</span>
            <span className="sm:hidden">Haut</span>
            <ArrowUp className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-slate-500">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} {userProfile.name}. Tous droits réservés.
          </div>
          <div className="flex items-center gap-1 text-center sm:text-right">
            <span>Conçu avec passion à Dakar, Sénégal 🇸🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
