import React, { useState } from 'react';
import { Play, Check, X, Sparkles, Send, PhoneCall, RefreshCw, Calculator, HelpCircle, Activity, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const KaFarmCalculator: React.FC = () => {
  const { darkMode } = useTheme();
  const [crop, setCrop] = useState('Oignons');
  const [hectares, setHectares] = useState(2);

  const cropsData: Record<string, { yieldPerHa: number; pricePerKg: number; unit: string }> = {
    Oignons: { yieldPerHa: 25, pricePerKg: 350, unit: "tonnes" },
    Mangues: { yieldPerHa: 18, pricePerKg: 400, unit: "tonnes" },
    "Riz de la Vallée": { yieldPerHa: 6, pricePerKg: 250, unit: "tonnes" },
    Maïs: { yieldPerHa: 4, pricePerKg: 220, unit: "tonnes" },
    Arachides: { yieldPerHa: 2.5, pricePerKg: 300, unit: "tonnes" },
  };

  const current = cropsData[crop] || cropsData.Oignons;
  const totalYieldTonnes = current.yieldPerHa * hectares;
  const totalRevenueFcfa = totalYieldTonnes * 1000 * current.pricePerKg;

  return (
    <div className={`p-5 rounded-xl border space-y-4 text-xs ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
          <Calculator className="w-4 h-4" />
          <span>Simulateur d'agriculteur KA-Farm</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
          Interactive Demo
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Culture sélectionnée :</label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className={`w-full p-2 rounded-lg border font-medium ${
              darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300'
            }`}
          >
            {Object.keys(cropsData).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">
            Superficie : <span className="text-cyan-400 font-bold">{hectares} Hectares</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={hectares}
            onChange={(e) => setHectares(parseFloat(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 grid grid-cols-2 gap-3 font-mono">
        <div>
          <div className="text-[10px] text-emerald-400/80">Récolte estimée :</div>
          <div className="text-base font-bold text-white">{totalYieldTonnes} Tonnes</div>
        </div>
        <div>
          <div className="text-[10px] text-emerald-400/80">Revenu estimé (FCFA) :</div>
          <div className="text-base font-bold text-emerald-300">{totalRevenueFcfa.toLocaleString()} FCFA</div>
        </div>
      </div>
    </div>
  );
};

export const SunuJobSimulator: React.FC = () => {
  const { darkMode } = useTheme();
  const [district, setDistrict] = useState('Pikine');
  const [service, setService] = useState('Plombier');
  const [booked, setBooked] = useState(false);

  const handleSimulateWhatsApp = () => {
    setBooked(true);
    setTimeout(() => {
      const msg = encodeURIComponent(`Bonjour SunuJob Marché, je cherche un ${service} disponible à ${district} (Sénégal).`);
      window.open(`https://wa.me/221770000000?text=${msg}`, '_blank');
    }, 600);
  };

  return (
    <div className={`p-5 rounded-xl border space-y-4 text-xs ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-sm text-cyan-400">
          <PhoneCall className="w-4 h-4" />
          <span>Simulateur SunuJob Marché (WhatsApp)</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
          Dakar & Régions
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] text-slate-400 mb-1">Service recherché :</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`w-full p-2 rounded-lg border ${
              darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300'
            }`}
          >
            <option value="Plombier">Plombier sanitaire</option>
            <option value="Électricien">Électricien bâtiment</option>
            <option value="Mécanicien Auto">Mécanicien auto/moto</option>
            <option value="Menuisier">Menuisier bois/alu</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] text-slate-400 mb-1">Quartier à Dakar :</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className={`w-full p-2 rounded-lg border ${
              darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300'
            }`}
          >
            <option value="Pikine">Pikine / Guédiawaye</option>
            <option value="Point E">Point E / Fann</option>
            <option value="Médina">Médina / Plateau</option>
            <option value="Rufisque">Rufisque / Bargny</option>
            <option value="Parcelles">Parcelles Assainies</option>
          </select>
        </div>
      </div>

      <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-between">
        <div>
          <div className="font-bold text-white">{service} certifié à {district}</div>
          <div className="text-[11px] text-emerald-400 font-mono">★ 4.9 (24 avis) • Disponible immédiatement</div>
        </div>
        <button
          onClick={handleSimulateWhatsApp}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>
      </div>

      {booked && (
        <div className="text-emerald-400 text-[11px] font-mono flex items-center gap-1 animate-fadeIn">
          <Check className="w-3.5 h-3.5" />
          Redirection vers la discussion WhatsApp configurée...
        </div>
      )}
    </div>
  );
};

export const PlayableCssQuiz: React.FC = () => {
  const { darkMode } = useTheme();
  const questions = [
    {
      question: "Comment centrer parfaitement un élément avec CSS Flexbox ?",
      options: [
        "display: flex; align-items: center; justify-content: center;",
        "display: flex; margin: auto center;",
        "display: block; text-align: middle;",
        "position: center; float: center;"
      ],
      answer: 0,
      explanation: "Flexbox utilise 'justify-content: center' pour l'axe principal et 'align-items: center' pour l'axe secondaire."
    },
    {
      question: "Quelle propriété CSS permet de créer une grille réactive ?",
      options: [
        "display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));",
        "grid: responsive 250px;",
        "display: inline-grid; flex-wrap: wrap;",
        "grid-layout: auto 250px;"
      ],
      answer: 0,
      explanation: "L'association 'repeat(auto-fit, minmax(...))' crée une grille automatique sans requêtes média lourdes."
    },
    {
      question: "Quelle est la particularité de Tailwind CSS ?",
      options: [
        "C'est un framework Utility-First basé sur des classes composables.",
        "Il remplace entièrement JavaScript.",
        "Il ne fonctionne que sur Google Chrome.",
        "Il impose des fichiers .css séparés pour chaque bouton."
      ],
      answer: 0,
      explanation: "Tailwind CSS permet de construire rapidement des interfaces personnalisées directement dans le balisage HTML/JSX."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === questions[currentIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className={`p-5 rounded-xl border space-y-4 text-xs ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-sm text-violet-400">
          <HelpCircle className="w-4 h-4" />
          <span>Quiz CSS Interactive - Mini-Jeu</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[10px] font-mono">
          Question {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {!isFinished ? (
        <div className="space-y-3">
          <p className="font-semibold text-sm text-white">{currentQ.question}</p>

          <div className="space-y-2">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = darkMode
                ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 hover:border-slate-400 text-slate-800';

              if (selectedOption !== null) {
                if (idx === currentQ.answer) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && idx === currentQ.answer && (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.answer && (
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg text-[11px] text-violet-200">
                <span className="font-bold">Explication : </span>
                {currentQ.explanation}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs hover:from-violet-500 hover:to-indigo-500 transition-all"
              >
                {currentIndex < questions.length - 1 ? 'Question suivante →' : 'Voir mon score final 🎉'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="inline-block p-4 rounded-full bg-violet-500/20 text-violet-400 font-extrabold text-2xl font-mono">
            {score} / {questions.length}
          </div>
          <h4 className="font-bold text-base text-white">
            {score === questions.length ? 'Bravo ! Score parfait 🏆' : 'Bien joué ! Continue de réviser !'}
          </h4>
          <p className="text-xs text-slate-400">
            Ce mini-jeu est un aperçu des exercices créés pour la communauté WhatsApp d'apprentissage dev web.
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs mx-auto transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recommencer le quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const FitPulsePreview: React.FC = () => {
  const { darkMode } = useTheme();
  const [steps, setSteps] = useState(8420);
  const [calories, setCalories] = useState(490);

  return (
    <div className={`p-5 rounded-xl border space-y-4 text-xs ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-sm text-cyan-400">
          <Activity className="w-4 h-4" />
          <span>FitPulse Live Dashboard Widget</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
          Interactive Tracker
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400">Pas aujourd'hui</div>
          <div className="text-lg font-bold text-cyan-400 font-mono">{steps.toLocaleString()} / 10,000</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full transition-all duration-300" style={{ width: `${(steps / 10000) * 100}%` }} />
          </div>
          <button
            onClick={() => setSteps(s => Math.min(10000, s + 500))}
            className="mt-2 text-[10px] text-cyan-400 hover:underline flex items-center gap-1 font-mono"
          >
            + 500 pas (simuler)
          </button>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400">Calories brûlées</div>
          <div className="text-lg font-bold text-amber-400 font-mono">{calories} kcal</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full transition-all duration-300" style={{ width: `${(calories / 600) * 100}%` }} />
          </div>
          <button
            onClick={() => setCalories(c => Math.min(800, c + 35))}
            className="mt-2 text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
          >
            + Session Cardio (+35 kcal)
          </button>
        </div>
      </div>
    </div>
  );
};
