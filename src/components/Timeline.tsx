import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, Code, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { timelineData } from '../data/portfolioData';

interface TimelineProps {
  darkMode: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ darkMode }) => {
  return (
    <motion.section
      id="timeline"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Formation & Parcours</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mon Cheminement <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              et mes Engagements
            </span>
          </h2>
          <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            De mes premières lignes de code en autodidacte au développement de projets réels et au partage de compétences à Dakar.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-600 -translate-x-1/2 opacity-30" />

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 z-10 w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/30">
                    {item.icon === 'Users' && <Users className="w-4 h-4" />}
                    {item.icon === 'Code' && <Code className="w-4 h-4" />}
                    {item.icon === 'GraduationCap' && <GraduationCap className="w-4 h-4" />}
                  </div>

                  {/* Content Box */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div
                      className={`p-6 rounded-2xl border backdrop-blur-sm space-y-3 ${
                        darkMode
                          ? 'bg-slate-950/80 border-slate-800'
                          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold">
                          {item.year}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {item.location}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.role}</h3>
                        <p className={`text-xs font-medium font-mono mt-0.5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{item.institution}</p>
                      </div>

                      <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {item.description}
                      </p>

                      <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                        {item.highlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.section>
  );
};
