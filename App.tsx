import React, { useState } from 'react';
import Header from './components/Header';
import ProposalForm from './components/ProposalForm';
import GeneratedProposal from './components/GeneratedProposal';
import { ProposalData, AppState, Language, UI_TEXT, GenerationConfig } from './types';
import { generateProposal } from './services/geminiService';
import { Terminal, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const handleGenerate = async (notes: string, config: GenerationConfig) => {
    setAppState(AppState.GENERATING);
    setErrorMsg(null);
    try {
      const data = await generateProposal(notes, language, config);
      setProposalData(data);
      setAppState(AppState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setProposalData(null);
  };

  const text = UI_TEXT[language];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00a4e8] selection:text-white pb-20">
      <Header language={language} onToggleLanguage={setLanguage} />

      <main className="max-w-5xl mx-auto px-6 pt-12">
        
        {/* Intro Section */}
        {appState === AppState.IDLE && (
          <div className="mb-12 text-center space-y-4">
            <div className="inline-block p-3 rounded-full bg-[#111] border border-[#333] mb-2">
              <Terminal className="w-8 h-8 text-[#599229]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              {language === 'en' ? (
                 <>Sales Workflow <span className="text-[#00a4e8]">Optimized</span>.</>
              ) : (
                 <>Sales Workflow <span className="text-[#00a4e8]">Geoptimaliseerd</span>.</>
              )}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {text.subtitle}
            </p>
          </div>
        )}

        {/* State Management */}
        {appState === AppState.ERROR && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500 rounded flex items-center gap-3 text-red-200">
            <AlertCircle className="w-5 h-5" />
            <span>{errorMsg}</span>
            <button onClick={() => setAppState(AppState.IDLE)} className="ml-auto underline text-sm hover:text-white">Try Again</button>
          </div>
        )}

        {(appState === AppState.IDLE || appState === AppState.GENERATING || appState === AppState.ERROR) && (
          <ProposalForm 
            onGenerate={handleGenerate} 
            isGenerating={appState === AppState.GENERATING} 
            language={language}
          />
        )}

        {appState === AppState.COMPLETE && proposalData && (
          <GeneratedProposal 
            data={proposalData} 
            onReset={handleReset} 
            language={language}
          />
        )}

      </main>

      {/* Background Ambient Effects */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-[#00a4e8] opacity-[0.03] blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#9b51e0] opacity-[0.03] blur-[100px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
};

export default App;