export type Language = 'en' | 'nl';

export interface ProposalData {
  challenge: string;
  approach: string;
  solution: string;
  trinityFocus: string;
  investment: string;
}

export interface GenerationConfig {
  linkedInUrl: string;
  engineers: number;
  hours: number;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export const OPINITY_COLORS = {
  BLACK: '#000000',
  BLUE: '#00a4e8',
  GREEN: '#599229',
  PURPLE: '#9b51e0',
};

export const UI_TEXT = {
  en: {
    tagline: '"Taking the lead. IT professionals who step up."',
    title: 'Sales Workflow Optimized.',
    subtitle: 'Transform unstructured intake notes into engineer-first proposals. Zero admin waste. Maximum flow.',
    inputTitle: 'Input Raw Intake Notes',
    inputDesc: 'Paste your rough meeting notes, brain dumps, or transcript snippets here. The AI Architect will identify the waste, structure the solution, and apply the Opinity DNA.',
    placeholder: '// Paste notes here...\ne.g. Client is struggling with deployments. Takes 3 days to release. Team is frustrated. They use Azure DevOps but mostly manual. Need help ASAP.',
    btnGenerate: 'Generate Proposal',
    btnArchitecting: 'Architecting...',
    demoBtn: 'Insert Demo Data',
    headers: {
      challenge: 'The Challenge',
      approach: 'Pragmatic Approach',
      solution: 'The Solution',
      trinity: 'Opinity Trinity',
      investment: 'Investment'
    },
    pdf: {
      title: 'TECHNICAL PROPOSAL',
      date: 'Date'
    },
    footer: {
      address: 'Opinity B.V. | Rietbaan 8, Capelle aan den IJssel',
      edit: 'Edit / New',
      export: 'Export PDF'
    },
    audio: {
      record: 'Record Voice Note',
      stop: 'Stop & Transcribe',
      processing: 'Transcribing Audio...',
      error: 'Microphone access denied or error.'
    },
    calculator: {
      title: 'Budget Estimator',
      engineers: 'Engineers',
      hours: 'Hours',
      total: 'Total Estimate',
      rate: '€140/hr'
    },
    linkedin: {
      title: 'LinkedIn Intelligence',
      placeholder: 'Paste Client LinkedIn URL...',
      desc: 'AI adapts tone (Technical vs Business) based on profile.'
    }
  },
  nl: {
    tagline: '"Het voortouw nemen. IT-professionals die opstaan."',
    title: 'Sales Workflow Geoptimaliseerd.',
    subtitle: 'Zet ongestructureerde notities om in engineer-first voorstellen. Geen administratieve rompslomp. Maximale flow.',
    inputTitle: 'Invoer Ruwe Intake Notities',
    inputDesc: 'Plak hier je ruwe gespreksnotities. De AI Architect identificeert de verspilling, structureert de oplossing en past het Opinity DNA toe.',
    placeholder: '// Plak notities hier...\nbv. Klant worstelt met deployments. Duurt 3 dagen voor release. Team is gefrustreerd. Ze gebruiken Azure DevOps maar vooral handmatig. Hulp nodig zsm.',
    btnGenerate: 'Genereer Voorstel',
    btnArchitecting: 'Architectuur bepalen...',
    demoBtn: 'Demo Data Invoegen',
    headers: {
      challenge: 'De Uitdaging',
      approach: 'Pragmatische Aanpak',
      solution: 'De Oplossing',
      trinity: 'Opinity Drie-eenheid',
      investment: 'Investering'
    },
    pdf: {
      title: 'TECHNISCH VOORSTEL',
      date: 'Datum'
    },
    footer: {
      address: 'Opinity B.V. | Rietbaan 8, Capelle aan den IJssel',
      edit: 'Bewerken / Nieuw',
      export: 'Exporteer PDF'
    },
    audio: {
      record: 'Spreek Notitie In',
      stop: 'Stop & Transcribeer',
      processing: 'Audio verwerken...',
      error: 'Microfoon toegang geweigerd of fout.'
    },
    calculator: {
      title: 'Budget Schatting',
      engineers: 'Engineers',
      hours: 'Uren',
      total: 'Totaal Schatting',
      rate: '€140/u'
    },
    linkedin: {
      title: 'LinkedIn Intelligence',
      placeholder: 'Plak LinkedIn URL van klant...',
      desc: 'AI past toon aan (Technisch vs Zakelijk) op basis van profiel.'
    }
  }
};