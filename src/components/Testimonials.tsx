import React from 'react';
import { Quote, Star } from 'lucide-react';
import { testimonialsData } from '../data/portfolioData';

interface TestimonialsProps {
  darkMode: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ darkMode }) => {
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <Quote className="w-3.5 h-3.5" />
            <span>Recommandations & Retours</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Ce que disent mes collaborateurs
          </h2>
          <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Témoignages de partenaires et professionnels ayant collaboré avec moi sur la gestion de projets et le développement digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 shadow-xl'
                  : 'bg-white border-slate-200 hover:border-cyan-400 shadow-md'
              }`}
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className={`text-sm leading-relaxed italic ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/60"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {item.name}
                  </h4>
                  <p className={`text-xs font-medium ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    {item.role}
                  </p>
                  <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
