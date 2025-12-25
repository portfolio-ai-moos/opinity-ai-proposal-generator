import React, { useState } from 'react';
import { ArrowRight, Wand2, FileText, Sparkles, Linkedin, Calculator, Coins } from 'lucide-react';
import { Language, UI_TEXT, GenerationConfig } from '../types';
import AudioInput from './AudioInput';

interface ProposalFormProps {
  onGenerate: (notes: string, config: GenerationConfig) => void;
  isGenerating: boolean;
  language: Language;
}

const DEMO_DATA = {
  en: {
    manual: `Client: TechCorp Logistics. 
Problem: Deployments are a nightmare. It takes 3 days to get code to production.
Process: Developers copy DLLs manually to servers. 
Team State: Frustrated, burnout risk. Blaming each other.
Current Stack: Legacy .NET 4.8, On-prem IIS, SQL Server.
Goal: They want "DevOps" but don't know where to start. Need faster time-to-market.`,
    cloud: `Client: FinService Bank.
Context: Migrating to Azure.
Issues: "Lift and shift" went wrong. Costs are exploding. No Infrastructure as Code (IaC).
Developers have no access to logs, so they call Ops for everything. 
Waste: Waiting times are huge. 
Requirement: Need a roadmap to Cloud Native and a culture change.`
  },
  nl: {
    manual: `Klant: TechCorp Logistics.
Probleem: Deployments zijn een nachtmerrie. Het duurt 3 dagen om code naar productie te krijgen.
Proces: Ontwikkelaars kopiëren DLL's handmatig naar servers.
Team status: Gefrustreerd, risico op burn-out. Geven elkaar de schuld.
Huidige Stack: Legacy .NET 4.8, On-prem IIS, SQL Server.
Doel: Ze willen "DevOps" maar weten niet waar te beginnen. Snellere time-to-market nodig.`,
    cloud: `Klant: FinService Bank.
Context: Migratie naar Azure.
Problemen: "Lift and shift" is mislukt. Kosten rijzen de pan uit. Geen Infrastructure as Code (IaC).
Ontwikkelaars hebben geen toegang tot logs, dus bellen ze Ops voor alles.
Verspilling: Enorme wachttijden.
Vraag: Roadmap nodig naar Cloud Native en een cultuuromslag.`
  }
};

const HOURLY_RATE = 140;

const ProposalForm: React.FC<ProposalFormProps> = ({ onGenerate, isGenerating, language }) => {
  const [notes, setNotes] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [engineers, setEngineers] = useState(2);
  const [hours, setHours] = useState(80);
  
  const text = UI_TEXT[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim()) {
      onGenerate(notes, { linkedInUrl, engineers, hours });
    }
  };

  const insertDemo = (type: 'manual' | 'cloud') => {
    setNotes(DEMO_DATA[language][type]);
  };

  const handleTranscription = (transcribedText: string) => {
    setNotes(prev => prev ? `${prev}\n\n[Voice Note]: ${transcribedText}` : transcribedText);
  };

  const totalCost = engineers * hours * HOURLY_RATE;

  return (
    <div className="bg-[#0a0a0a] border border-[#333] p-8 rounded-lg shadow-2xl relative overflow-hidden group">
      
      {/* Decorative Cyberpunk corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#00a4e8] opacity-50 rounded-tl-lg"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#9b51e0] opacity-50 rounded-br-lg"></div>

      <div className="relative z-10">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center mb-4 gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-[#00a4e8]" />
            {text.inputTitle}
          </h2>
          
          <div className="flex flex-wrap gap-2 items-center">
            {/* Audio Recorder */}
            <AudioInput onTranscription={handleTranscription} language={language} />

            <div className="h-6 w-px bg-[#333] mx-2 hidden md:block"></div>

            <button 
              type="button"
              onClick={() => insertDemo('manual')}
              disabled={isGenerating}
              className="text-xs flex items-center gap-1 bg-[#111] hover:bg-[#222] border border-[#333] px-3 py-1.5 rounded-md text-gray-300 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#599229]" />
              Demo 1: Manual
            </button>
            <button 
              type="button"
              onClick={() => insertDemo('cloud')}
              disabled={isGenerating}
              className="text-xs flex items-center gap-1 bg-[#111] hover:bg-[#222] border border-[#333] px-3 py-1.5 rounded-md text-gray-300 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#9b51e0]" />
              Demo 2: Cloud
            </button>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-6 whitespace-pre-wrap">
          {text.inputDesc}
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-48 bg-[#111] border border-[#333] rounded-md p-4 text-gray-200 focus:outline-none focus:border-[#599229] focus:ring-1 focus:ring-[#599229] transition-all resize-none font-mono text-sm leading-relaxed mb-6"
            placeholder={text.placeholder}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isGenerating}
          />

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-[#222] pt-6">
            
            {/* LinkedIn Intelligence */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                {text.linkedin.title}
              </label>
              <input 
                type="text" 
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder={text.linkedin.placeholder}
                className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-[#0077b5] focus:outline-none"
              />
              <p className="text-[10px] text-gray-500">{text.linkedin.desc}</p>
            </div>

            {/* Price Calculator */}
            <div className="space-y-4 bg-[#111] p-4 rounded border border-[#222]">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-300 border-b border-[#333] pb-2 mb-2">
                <Calculator className="w-4 h-4 text-[#9b51e0]" />
                {text.calculator.title}
                <span className="ml-auto text-xs text-gray-500 font-normal">{text.calculator.rate}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 w-16">{text.calculator.engineers}</span>
                <input 
                  type="range" min="1" max="10" step="1" 
                  value={engineers} 
                  onChange={(e) => setEngineers(parseInt(e.target.value))}
                  className="flex-1 accent-[#00a4e8] h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-mono w-8 text-right">{engineers}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 w-16">{text.calculator.hours}</span>
                <input 
                  type="range" min="10" max="500" step="10" 
                  value={hours} 
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="flex-1 accent-[#599229] h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-mono w-8 text-right">{hours}</span>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#333]">
                <span className="text-xs text-gray-400">{text.calculator.total}</span>
                <span className="text-lg font-bold text-white flex items-center gap-1">
                  <Coins className="w-4 h-4 text-[#ffd700]" />
                  €{totalCost.toLocaleString(language === 'nl' ? 'nl-NL' : 'en-US')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isGenerating || !notes.trim()}
              className={`
                relative px-8 py-3 bg-black border border-[#00a4e8] text-[#00a4e8] font-bold uppercase tracking-widest text-sm
                hover:bg-[#00a4e8] hover:text-black transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center gap-3 group-hover:shadow-[0_0_20px_rgba(0,164,232,0.3)]
              `}
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                  {text.btnArchitecting}
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  {text.btnGenerate}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposalForm;