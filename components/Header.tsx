import React from 'react';
import { Terminal, Zap, Globe } from 'lucide-react';
import { Language, UI_TEXT } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  const text = UI_TEXT[language];

  return (
    <header className="border-b border-[#333] bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00a4e8] blur-sm opacity-50 animate-pulse"></div>
            <div className="relative bg-black border border-[#00a4e8] p-2 rounded-sm">
              <span className="text-2xl font-bold text-white tracking-tighter">
                Opin<span className="text-[#00a4e8]">i</span>ty
              </span>
            </div>
          </div>
          <span className="text-[#599229] text-xs font-bold border border-[#599229] px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:block">
            Proposal Generator v1.1
          </span>
        </div>

        {/* Right Side: Tagline & Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <Zap className="w-4 h-4 text-[#9b51e0]" />
            <span className="italic tracking-wide">
              {text.tagline}
            </span>
          </div>

          <div className="flex items-center border border-[#333] rounded-full p-1 bg-[#111]">
            <button
              onClick={() => onToggleLanguage('nl')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'nl' 
                  ? 'bg-[#00a4e8] text-white shadow-[0_0_10px_rgba(0,164,232,0.4)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              NL
            </button>
            <button
              onClick={() => onToggleLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'en' 
                  ? 'bg-[#00a4e8] text-white shadow-[0_0_10px_rgba(0,164,232,0.4)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              EN
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;