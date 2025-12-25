import React from 'react';
import { ProposalData, Language, UI_TEXT } from '../types';
import { Download, Share2, CheckCircle2, AlertTriangle, Layers, Users, TrendingUp } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface GeneratedProposalProps {
  data: ProposalData;
  onReset: () => void;
  language: Language;
}

const GeneratedProposal: React.FC<GeneratedProposalProps> = ({ data, onReset, language }) => {
  const text = UI_TEXT[language];
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;
    let yPos = 20;

    // Helper to add text and advance Y
    const addText = (textStr: string, size: number, style: 'normal' | 'bold' = 'normal', color: [number, number, number] = [0, 0, 0]) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", style);
      doc.setTextColor(color[0], color[1], color[2]);
      
      const lines = doc.splitTextToSize(textStr, maxLineWidth);
      doc.text(lines, margin, yPos);
      yPos += (lines.length * size * 0.4) + 6; // Line height + spacing
    };

    // Header
    doc.setFillColor(0, 0, 0); // Black header
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setFontSize(22);
    doc.setTextColor(0, 164, 232); // Opinity Blue
    doc.text("Opinity", margin, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(text.pdf.title, pageWidth - margin - 50, 25);

    yPos = 60;

    // Content
    addText(`1. ${text.headers.challenge.toUpperCase()}`, 12, 'bold', [0, 0, 0]);
    addText(data.challenge, 10, 'normal', [60, 60, 60]);
    yPos += 5;

    addText(`2. ${text.headers.approach.toUpperCase()}`, 12, 'bold', [0, 0, 0]);
    addText(data.approach, 10, 'normal', [60, 60, 60]);
    yPos += 5;

    addText(`3. ${text.headers.solution.toUpperCase()}`, 12, 'bold', [0, 0, 0]);
    addText(data.solution, 10, 'normal', [60, 60, 60]);
    yPos += 5;

    addText(`4. ${text.headers.trinity.toUpperCase()}`, 12, 'bold', [0, 0, 0]);
    addText(data.trinityFocus, 10, 'normal', [60, 60, 60]);
    yPos += 5;

    addText(`5. ${text.headers.investment.toUpperCase()}`, 12, 'bold', [0, 0, 0]);
    addText(data.investment, 10, 'normal', [60, 60, 60]);

    // Footer
    yPos = 270;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Opinity B.V. | Rietbaan 8, Capelle aan den IJssel | www.opinity.nl", margin, yPos);
    doc.text(text.tagline, margin, yPos + 5);

    doc.save("opinity-proposal.pdf");
  };

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white text-black rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,164,232,0.15)] relative">
        
        {/* Header Strip */}
        <div className="bg-black h-2 flex w-full">
            <div className="w-1/4 bg-[#00a4e8]"></div>
            <div className="w-1/4 bg-[#599229]"></div>
            <div className="w-1/4 bg-[#9b51e0]"></div>
            <div className="w-1/4 bg-white"></div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-bold tracking-tight">{text.pdf.title}</h2>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{text.pdf.date}</div>
              <div className="font-mono">{new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div className="space-y-10 font-mono text-sm md:text-base">
            
            {/* Challenge */}
            <section className="group">
              <h3 className="flex items-center gap-3 text-lg font-bold mb-3 uppercase tracking-wider text-[#9b51e0]">
                <AlertTriangle className="w-5 h-5" />
                1. {text.headers.challenge}
              </h3>
              <p className="pl-8 border-l-2 border-[#9b51e0] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.challenge}
              </p>
            </section>

             {/* Approach */}
             <section className="group">
              <h3 className="flex items-center gap-3 text-lg font-bold mb-3 uppercase tracking-wider text-[#00a4e8]">
                <Users className="w-5 h-5" />
                2. {text.headers.approach}
              </h3>
              <p className="pl-8 border-l-2 border-[#00a4e8] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.approach}
              </p>
            </section>

            {/* Solution */}
            <section className="group">
              <h3 className="flex items-center gap-3 text-lg font-bold mb-3 uppercase tracking-wider text-[#599229]">
                <Layers className="w-5 h-5" />
                3. {text.headers.solution}
              </h3>
              <p className="pl-8 border-l-2 border-[#599229] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.solution}
              </p>
            </section>

             {/* Trinity */}
             <section className="group">
              <h3 className="flex items-center gap-3 text-lg font-bold mb-3 uppercase tracking-wider text-black">
                <CheckCircle2 className="w-5 h-5" />
                4. {text.headers.trinity}
              </h3>
              <div className="pl-8 border-l-2 border-black bg-gray-50 p-4 rounded-r-md">
                 <p className="text-gray-700 leading-relaxed italic">
                  "{data.trinityFocus}"
                </p>
              </div>
            </section>

            {/* Investment */}
            <section className="group">
              <h3 className="flex items-center gap-3 text-lg font-bold mb-3 uppercase tracking-wider text-black">
                <TrendingUp className="w-5 h-5" />
                5. {text.headers.investment}
              </h3>
              <p className="pl-8 text-gray-900 font-bold leading-relaxed">
                {data.investment}
              </p>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-xs text-gray-500 font-mono">
                {text.footer.address.split('|').map((line, i) => (
                  <span key={i} className="block md:inline md:mr-2">{line}</span>
                ))}
             </div>
             
             <div className="flex gap-4">
                <button 
                  onClick={onReset}
                  className="px-6 py-2 text-gray-500 hover:text-black font-mono text-sm underline transition-colors"
                >
                  {text.footer.edit}
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="bg-[#00a4e8] text-white px-8 py-3 rounded-sm font-bold shadow-lg hover:bg-[#008ec9] transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {text.footer.export}
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GeneratedProposal;